import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()
  
  try {
    const body = await request.json()
    const topic = body.topic || body.prompt
    
    console.log('API Route (Google SDK) - Request received:', { body, topic })

    if (!topic || typeof topic !== 'string') {
      console.error('API Route - Invalid topic:', topic)
      return new Response(
        JSON.stringify({ error: 'テーマを入力してください。' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('API Route - No API key found')
      return new Response(
        JSON.stringify({ error: 'APIキーが設定されていません。' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    
    console.log('API Route - Initializing Google Generative AI')
    
    // Google Generative AI クライアントを初期化
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 64000, // 64Kトークンに拡張（Gemini 2.5 Flashの最大値）
      }
    })

    const prompt = `
あなたは経営コンサルタントとして、以下のテーマについて詳細な分析レポートを作成してください。

重要な指示：
1. 情報源を引用する際は、文末に [1]、[2] のような番号を付けてください
2. 各引用番号は、実際のウェブサイト、報告書、統計データなどに対応させてください
3. 推測や一般的な知識の場合は引用番号を付けないでください
4. セクションごとに明確に区切り、以下の構造に従ってください

テーマ: ${topic}

以下の構成で、マークダウン形式のレポートを作成してください：

# ${topic}に関する分析レポート

## エグゼクティブサマリー
（主要な発見事項と推奨事項を3-5項目で簡潔にまとめる）

## 1. 市場環境分析

### 1.1 市場規模と成長性
（現在の市場規模、成長率、将来予測を数値を交えて分析）

### 1.2 主要プレイヤー
（主要企業とその市場シェア、特徴を表形式で整理）

### 1.3 技術トレンド
（関連する技術革新や業界トレンドを箇条書きで）

## 2. PEST分析

### 2.1 政治的要因 (Political)
### 2.2 経済的要因 (Economic)
### 2.3 社会的要因 (Social)
### 2.4 技術的要因 (Technological)

## 3. SWOT分析

### 3.1 強み (Strengths)
### 3.2 弱み (Weaknesses)
### 3.3 機会 (Opportunities)
### 3.4 脅威 (Threats)

## 4. 競争環境分析（ポーターの5つの力）

### 4.1 新規参入の脅威
### 4.2 代替品の脅威
### 4.3 買い手の交渉力
### 4.4 売り手の交渉力
### 4.5 競合他社との競争

## 5. 戦略的推奨事項

### 5.1 短期的施策（1年以内）
### 5.2 中期的施策（1-3年）
### 5.3 長期的施策（3年以上）

## 6. リスクと対策

### 6.1 主要リスク
### 6.2 リスク軽減策

## 7. 結論

---

*このレポートは ${new Date().toLocaleDateString('ja-JP')} に作成されました。*

注意事項：
- 具体的な数値やデータを可能な限り含め、その出典（企業名、調査機関、発表年など）を併記する
- 表やリストを活用して読みやすくする
- 専門用語には簡潔な説明を付ける
- 実践的で実行可能な推奨事項を提示する
- 各セクションで使用した参考情報の出典を明記する
- 推測や一般論の場合は「推定」「一般的に」などの表現を使って明確化する

## 参考文献
（各引用番号に対応する出典を以下の形式で記載）
[番号] タイトル - 出典元（URL）
`

    console.log('API Route - Starting stream generation')
    
    // ストリーミングレスポンスを生成
    const result = await model.generateContentStream(prompt)
    
    console.log('API Route - Stream created, starting response')
    
    // ReadableStreamを作成（pullメソッドを使用）
    let reader: AsyncIterator<any> | null = null
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('API Route - Starting stream processing')
          reader = result.stream[Symbol.asyncIterator]()
        } catch (error) {
          console.error('API Route - Stream start error:', error)
          controller.error(error)
        }
      },
      
      async pull(controller) {
        try {
          if (!reader) {
            controller.close()
            return
          }
          
          const { done, value } = await reader.next()
          
          if (done) {
            console.log('API Route - Stream completed')
            controller.close()
            return
          }
          
          const text = value.text()
          if (text) {
            console.log(`API Route - Chunk: ${text.length} characters`)
            controller.enqueue(encoder.encode(text))
          }
        } catch (error) {
          console.error('API Route - Stream pull error:', error)
          controller.error(error)
        }
      },
      
      cancel() {
        console.log('API Route - Stream cancelled')
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    })
    
  } catch (error) {
    console.error('API Route - Generation error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'レポート生成中にエラーが発生しました。',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}