import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from '@google/generative-ai'
import { parseSRT } from '@/lib/srt-parser'
import { geminiRateLimiter } from '@/lib/rate-limiter'

interface ChapterData {
  sho: number
  chapter: number
  title: string
  start: string
  end: string
}


// Gemini APIプロンプト
const GEMINI_PROMPT = `あなたはセミナー動画の字幕から章（sho）とチャプター（chapter）を抽出する専門家です。

以下の字幕テキストを分析し、内容に基づいて章・チャプターに分割してください。

## ルール：
1. 章（sho）は大きなテーマの区切り（1, 2, 3...）
2. チャプター（chapter）は全体通しの連番（1, 2, 3...）
3. 各チャプターは30秒〜120秒程度を目安に
4. タイトルは内容を簡潔に表現（20文字以内）
5. 時間形式は HH:MM:SS

## 出力形式：
必ず以下のJSON配列形式で出力してください：
[
  {
    "sho": 1,
    "chapter": 1,
    "title": "イントロダクション",
    "start": "00:00:00",
    "end": "00:02:30"
  }
]

字幕テキスト：
`

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file || !file.name.endsWith('.srt')) {
      return NextResponse.json({ error: "SRTファイルを選択してください" }, { status: 400 })
    }

    // SRTファイルの内容を読み取り
    const content = await file.text()
    const { text: subtitleText, timestamps } = parseSRT(content)
    
    if (!subtitleText || subtitleText.length < 10) {
      return NextResponse.json({ error: "SRTファイルの内容が不正です" }, { status: 400 })
    }

    // Gemini API初期化
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set')
      return NextResponse.json({ error: "サーバー設定エラー" }, { status: 500 })
    }
    
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    try {
      // レート制限を考慮してGeminiに分析を依頼
      const prompt = GEMINI_PROMPT + subtitleText
      
      const result = await geminiRateLimiter.execute(async () => {
        return await model.generateContent(prompt)
      })
      
      const response = await result.response
      const text = response.text()
      
      // JSONを抽出してパース
      let chapters: ChapterData[] = []
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        chapters = JSON.parse(jsonMatch[0])
        
        // タイムスタンプの補正（実際のSRTの時間を使用）
        if (timestamps.length > 0) {
          chapters = chapters.map((ch, index) => {
            const startIdx = Math.floor((index / chapters.length) * timestamps.length)
            const endIdx = Math.min(startIdx + Math.ceil(timestamps.length / chapters.length), timestamps.length - 1)
            
            return {
              ...ch,
              start: timestamps[startIdx]?.start.split('.')[0] || ch.start,
              end: timestamps[endIdx]?.end.split('.')[0] || ch.end
            }
          })
        }
      } else {
        throw new Error('JSON形式が見つかりません')
      }
      
      return NextResponse.json({
        chapters,
        message: "章・チャプターの抽出が完了しました",
      })
      
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError)
      
      // フォールバック：簡単な分割
      const fallbackChapters = createFallbackChapters(subtitleText, timestamps)
      
      return NextResponse.json({
        chapters: fallbackChapters,
        message: "章・チャプターの抽出が完了しました（簡易モード）",
      })
    }
    
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "ファイルの処理中にエラーが発生しました" }, { status: 500 })
  }
}

// フォールバック用の章分割
function createFallbackChapters(text: string, timestamps: Array<{ start: string; end: string }>): ChapterData[] {
  const lines = text.split('\n').filter(line => line.trim())
  const chapterCount = Math.min(Math.max(3, Math.ceil(lines.length / 10)), 10)
  const chapters: ChapterData[] = []
  
  for (let i = 0; i < chapterCount; i++) {
    const startIdx = Math.floor((i / chapterCount) * timestamps.length)
    const endIdx = Math.min(startIdx + Math.ceil(timestamps.length / chapterCount), timestamps.length - 1)
    
    chapters.push({
      sho: Math.floor(i / 3) + 1,
      chapter: i + 1,
      title: `セクション${i + 1}`,
      start: timestamps[startIdx]?.start.split('.')[0] || `00:${String(i * 3).padStart(2, '0')}:00`,
      end: timestamps[endIdx]?.end.split('.')[0] || `00:${String((i + 1) * 3).padStart(2, '0')}:00`
    })
  }
  
  return chapters
}
