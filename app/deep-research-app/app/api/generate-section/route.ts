import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'
import { sectionDefinitions } from '@/lib/section-definitions'

export async function POST(request: NextRequest) {
  const encoder = new TextEncoder()
  
  try {
    const body = await request.json()
    const { topic, sectionId, previousSections = {} } = body
    
    console.log('Section API - Request:', { topic, sectionId })

    // セクション定義を取得
    const sectionDef = sectionDefinitions.find(s => s.id === sectionId)
    if (!sectionDef) {
      return new Response(
        JSON.stringify({ error: '無効なセクションIDです。' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'APIキーが設定されていません。' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Google Generative AI クライアントを初期化
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: sectionDef.maxTokens, // セクションごとの最大トークン数
      },
      // Grounding設定を追加（Web検索を有効化）
      systemInstruction: `
あなたは経営コンサルタントです。最新の情報（2025年6月時点）を基に分析を行ってください。
製品名や企業名は正確に記載し、存在しない製品番号は使用しないでください。
実際のデータや統計を引用する際は、出典を明記してください。
      `
    })

    // プロンプトを構築
    let prompt = sectionDef.promptTemplate
      .replace('{topic}', topic)
      .replace('{date}', new Date().toLocaleDateString('ja-JP'))

    // 依存セクションの情報を追加
    if (sectionDef.dependencies && Object.keys(previousSections).length > 0) {
      prompt += '\n\n以下は既に分析済みのセクションです。参考にしてください：\n'
      sectionDef.dependencies.forEach(depId => {
        if (previousSections[depId]) {
          prompt += `\n### ${previousSections[depId].title}\n${previousSections[depId].summary}\n`
        }
      })
    }

    console.log(`Section API - Generating ${sectionId} with max ${sectionDef.maxTokens} tokens`)
    
    // ストリーミングレスポンスを生成
    const result = await model.generateContentStream(prompt)
    
    // ReadableStreamを作成
    let reader: AsyncIterator<any> | null = null
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          reader = result.stream[Symbol.asyncIterator]()
          // セクションIDをヘッダーとして送信
          const header = `__SECTION_START__${sectionId}__\n`
          controller.enqueue(encoder.encode(header))
        } catch (error) {
          console.error('Section API - Stream start error:', error)
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
            // セクション終了マーカー
            const footer = `\n__SECTION_END__${sectionId}__`
            controller.enqueue(encoder.encode(footer))
            console.log(`Section API - ${sectionId} completed`)
            controller.close()
            return
          }
          
          const text = value.text()
          if (text) {
            controller.enqueue(encoder.encode(text))
          }
        } catch (error) {
          console.error('Section API - Stream pull error:', error)
          controller.error(error)
        }
      },
      
      cancel() {
        console.log(`Section API - ${sectionId} stream cancelled`)
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Section-Id': sectionId,
      }
    })
    
  } catch (error) {
    console.error('Section API - Generation error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'セクション生成中にエラーが発生しました。',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}