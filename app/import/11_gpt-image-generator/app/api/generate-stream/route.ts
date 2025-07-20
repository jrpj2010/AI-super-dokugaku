import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"
import pLimit from "p-limit"
import fs from "fs/promises"
import path from "path"
import os from "os"
import { v4 as uuidv4 } from "uuid"

// 一時ファイルディレクトリ
const TEMP_DIR = path.join(os.tmpdir(), "gpt-image-generator")

// グローバルスコープにキャッシュオブジェクトを定義
if (!(global as any)._sessionResultsCache) {
  (global as any)._sessionResultsCache = {}
}
const sessionResultsCache: { [sessionId: string]: Array<{ id: string; status: string; imageUrl?: string; message?: string }> } = (global as any)._sessionResultsCache

// OpenAI APIクライアントの初期化関数
const createOpenAIClient = (apiKey: string) => {
  if (!apiKey) {
    throw new Error("API key is required")
  }
  try {
    return new OpenAI({
      apiKey: apiKey,
    })
  } catch (error) {
    console.error("[SERVER] Error creating OpenAI client:", error)
    throw new Error("Failed to initialize OpenAI client")
  }
}

// SSEのヘッダー（最適化版 - Cloud Run対応）
const sseHeaders = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-store, must-revalidate, private",
  "Connection": "keep-alive",
  "Content-Encoding": "none",
  "X-Accel-Buffering": "no", // Nginxのバッファリングを無効化
  "X-Content-Type-Options": "nosniff",
  "Transfer-Encoding": "chunked",
}

export const dynamic = 'force-dynamic' // route設定: 動的レンダリングを強制

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder()
  console.log(`[SERVER SSE] ====== NEW POST REQUEST ====== at ${new Date().toISOString()}`)

  try {
    const body = await req.json()
    console.log(`[SERVER SSE] Request body received:`, JSON.stringify(body, null, 2))
    
    const {
      masterPrompt,
      userInputs,
      concurrentLimit = 4,
      quality = "medium",
      size = "1536x1024",
      n = 1,
      apiKey = "",
      sessionId,
    } = body

    // 最初にAPIキーの検証
    const finalApiKey = apiKey || process.env.OPENAI_API_KEY
    if (!finalApiKey) {
      console.error('[SERVER] No API key provided')
      return NextResponse.json(
        { error: "APIキーが設定されていません。.envファイルにOPENAI_API_KEYを設定するか、設定画面でAPIキーを入力してください。" },
        { status: 400 }
      )
    }

    if (!sessionId) {
      console.error('[SERVER] Session ID is missing in POST request')
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    sessionResultsCache[sessionId] = []
    console.log(`[SERVER CACHE] Initialized cache for session ID: ${sessionId}`)

    // OpenAIクライアントの作成（エラーハンドリング付き）
    let openai
    try {
      openai = createOpenAIClient(finalApiKey)
      console.log(`[SERVER] OpenAI client created successfully`)
    } catch (error) {
      console.error('[SERVER] Failed to create OpenAI client:', error)
      return NextResponse.json(
        { error: "OpenAIクライアントの初期化に失敗しました。APIキーを確認してください。" },
        { status: 500 }
      )
    }

    // 並列処理の制限（Tier 5の実際の制限に基づき最大20まで）
    const limit = pLimit(Math.min(Math.max(concurrentLimit, 1), 20))

    // ストリームの作成
    console.log(`[SERVER SSE] Creating ReadableStream for session: ${sessionId}`)
    const stream = new ReadableStream({
      async start(controller) {
        console.log(`[SERVER SSE] Stream start() called for session: ${sessionId}`)
        
        // SSE接続確認メッセージ
        const connectMsg = `event: connect\ndata: Connected to SSE at ${new Date().toISOString()}\n\n`
        console.log(`[SERVER SSE] Sending connect message: ${connectMsg.replace(/\n/g, "\\n")}`)
        controller.enqueue(encoder.encode(connectMsg))
        
        // 処理開始メッセージ
        const infoPayload = {
          message: `${userInputs.length}件の画像生成を開始します (同時実行数: ${concurrentLimit})`,
          sessionId: sessionId,
          timestamp: new Date().toISOString()
        }
        const infoMsg = `event: info\ndata: ${JSON.stringify(infoPayload)}\n\n`
        console.log(`[SERVER SSE] Sending info message: ${infoMsg.replace(/\n/g, "\\n")}`)
        controller.enqueue(encoder.encode(infoMsg))
        
        // キープアライブインターバルを設定（5秒ごとにピンポンメッセージを送信）
        const keepAliveInterval = setInterval(() => {
          try {
            const pingMsg = `event: ping\ndata: ${JSON.stringify({ timestamp: new Date().toISOString() })}\n\n`
            console.log(`[SERVER SSE] Sending keepalive ping for session: ${sessionId}`)
            controller.enqueue(encoder.encode(pingMsg))
          } catch (e) {
            console.error(`[SERVER SSE] Keepalive failed for session ${sessionId}:`, e)
            clearInterval(keepAliveInterval)
          }
        }, 1000) // 1秒ごと（接続維持のため頻繁にping）

        // 全体のエラーハンドリング
        let totalProcessed = 0
        let totalErrors = 0
        
        try {
          // 各ユーザーインプットに対して画像生成を並列実行
          const promises = userInputs.map((input: any, index: number) => {
            return limit(async () => {
              try {
              // 処理中ステータスの送信
              const processingPayload = {
                id: input.id,
                status: "processing",
                message: `プロンプト ${index + 1}/${userInputs.length} の処理を開始`,
                timestamp: new Date().toISOString()
              }
              const processingMsg = `event: update\ndata: ${JSON.stringify(processingPayload)}\n\n`
              console.log(`[SERVER SSE] Sending processing update for ID ${input.id}: ${processingMsg.replace(/\n/g, "\\n")}`)
              controller.enqueue(encoder.encode(processingMsg))

              // OpenAI APIを呼び出して画像を生成
              controller.enqueue(
                encoder.encode(
                  `event: info\ndata: ${JSON.stringify({
                    message: `🎨 OpenAI APIにリクエスト送信中 (${index + 1}/${userInputs.length}): ${input.prompt.substring(0, 30)}...`,
                  })}\n\n`,
                ),
              )

              // 追加の進捗表示
              controller.enqueue(
                encoder.encode(
                  `event: progress\ndata: ${JSON.stringify({
                    id: input.id,
                    status: "api_request",
                    progress: "sending",
                    message: `APIリクエストを送信しています... (${index + 1}/${userInputs.length})`,
                  })}\n\n`,
                ),
              )

              console.log(`[SERVER] Generating image ${index + 1}/${userInputs.length}...`)
              console.log(`[SERVER] Master prompt: ${masterPrompt.substring(0, 50)}...`)
              console.log(`[SERVER] User prompt: ${input.prompt.substring(0, 50)}...`)
              console.log(`[SERVER] API Key exists: ${!!openai}`)

              // API呼び出し直前の進捗表示
              controller.enqueue(
                encoder.encode(
                  `event: progress\ndata: ${JSON.stringify({
                    id: input.id,
                    status: "api_calling",
                    progress: "calling",
                    message: `OpenAI APIを呼び出しています... (${index + 1}/${userInputs.length})`,
                  })}\n\n`,
                ),
              )

              // リトライロジックを追加
              let retries = 0
              const maxRetries = 3
              let response
              
              while (retries < maxRetries) {
                try {
                  console.log(`[SERVER] Calling OpenAI API for input ${index + 1}...`)
                  const apiStartTime = Date.now()
                  
                  response = await openai.images.generate({
                    model: "gpt-image-1", // GPT-Image-1モデルを使用
                    prompt: `${masterPrompt}\n\n${input.prompt}`,
                    n: Math.min(Math.max(n, 1), 10), // 1～10の範囲に制限
                    size: size === "auto" ? undefined : size, // "auto"の場合はundefinedに
                    quality: quality === "auto" ? undefined : quality, // "auto"の場合はundefinedに
                    // output_formatは使用しない（パラメータを確認）
                  })
                  
                  const apiDuration = Date.now() - apiStartTime
                  console.log(`[SERVER] OpenAI API response received for input ${index + 1} in ${apiDuration}ms`)
                  break // 成功したらループを抜ける
                } catch (retryError: any) {
                  retries++
                  if (retries >= maxRetries) {
                    throw retryError // 最大リトライ回数に達したらエラーを投げる
                  }
                  console.log(`[SERVER] Retry ${retries}/${maxRetries} for input ID ${input.id} after error:`, retryError.message)
                  
                  // リトライ前の待機時間（エクスポネンシャルバックオフ）
                  const waitTime = Math.min(1000 * Math.pow(2, retries - 1), 10000) // 最大10秒
                  await new Promise(resolve => setTimeout(resolve, waitTime))
                  
                  // リトライ状況を送信
                  controller.enqueue(
                    encoder.encode(
                      `event: info\ndata: ${JSON.stringify({
                        message: `リトライ ${retries}/${maxRetries} (${input.id.substring(0, 8)}...)`,
                      })}\n\n`,
                    ),
                  )
                }
              }

              // API呼び出し成功直後の進捗表示
              controller.enqueue(
                encoder.encode(
                  `event: progress\ndata: ${JSON.stringify({
                    id: input.id,
                    status: "api_response",
                    progress: "received",
                    message: `APIレスポンスを受信しました (${index + 1}/${userInputs.length})`,
                  })}\n\n`,
                ),
              )

              console.log(`Image generated successfully for ${index + 1}`)

              // 生成成功の場合
              if (response.data && response.data.length > 0) {
                // 画像データ処理中の進捗表示
                controller.enqueue(
                  encoder.encode(
                    `event: progress\ndata: ${JSON.stringify({
                      id: input.id,
                      status: "processing_image",
                      progress: "processing",
                      message: `画像データを処理しています... (${index + 1}/${userInputs.length})`,
                    })}\n\n`,
                  ),
                )

                // gpt-image-1は常にbase64エンコードされた画像を返す
                const imageData = response.data[0]?.b64_json
                if (imageData) {
                  try {
                    // 一時ディレクトリを作成
                    await fs.mkdir(TEMP_DIR, { recursive: true })
                    
                    // 一意のファイル名を生成
                    const imageId = uuidv4()
                    const imagePath = path.join(TEMP_DIR, `${imageId}.png`)
                    
                    // Base64デコードしてファイルに保存
                    const imageBuffer = Buffer.from(imageData, 'base64')
                    await fs.writeFile(imagePath, imageBuffer)
                    
                    console.log(`[SERVER SSE] Saved image to temporary file: ${imagePath} for input ID: ${input.id}`)
                    
                    const eventPayload = {
                      id: input.id,
                      status: "completed",
                      imageUrl: `/api/temp-image/${imageId}`,
                      message: `プロンプト ${index + 1}/${userInputs.length} の画像生成が完了`,
                    }
                    const sseMessageString = `event: update\ndata: ${JSON.stringify(eventPayload)}\n\n`
                    
                    console.log(`[SERVER SSE] PREPARING to send 'update' event for input ID: ${input.id}, imageId: ${imageId}`)
                    console.log(`[SERVER SSE] Message to enqueue: ${sseMessageString.replace(/\n/g, "\\n")}`)
                    
                    controller.enqueue(encoder.encode(sseMessageString))
                    
                    // フラッシュコメントを追加（Cloud Runのバッファリング対策）
                    const flushComment = `:${' '.repeat(2048)}\n\n`
                    controller.enqueue(encoder.encode(flushComment))
                    
                    console.log(`[SERVER SSE] 'update' event ENQUEUED with flush for input ID: ${input.id}, imageId: ${imageId}`)
                    
                    // キャッシュに結果を保存
                    const resultForItem = {
                      id: input.id,
                      status: "completed" as const,
                      imageUrl: `/api/temp-image/${imageId}`,
                    }
                    sessionResultsCache[sessionId].push(resultForItem)
                    console.log(`[SERVER CACHE] Added result for input ID ${input.id} to session ${sessionId}:`, resultForItem)
                  } catch (fileError) {
                    console.error(`[SERVER SSE] Failed to save temporary image file for input ID: ${input.id}:`, fileError)
                    const errorResult = {
                      id: input.id,
                      status: "error" as const,
                      message: "画像ファイル保存失敗: " + (fileError instanceof Error ? fileError.message : String(fileError)),
                    }
                    controller.enqueue(
                      encoder.encode(
                        `event: update\ndata: ${JSON.stringify(errorResult)}\n\n`
                      )
                    )
                    if (sessionResultsCache[sessionId]) {
                      sessionResultsCache[sessionId].push(errorResult)
                    }
                    throw new Error("画像ファイルの保存に失敗しました")
                  }
                } else {
                  throw new Error("画像データが取得できませんでした")
                }
              } else {
                throw new Error("画像URLが取得できませんでした")
              }
            } catch (error: any) {
              console.error(`[SERVER ERROR] Image generation error for input ID ${input.id} (session ${sessionId}):`, error)
              console.error("Error details:", JSON.stringify(error, null, 2))
              
              // エラーメッセージのカスタマイズ
              let errorMessage = "画像生成に失敗しました"
              
              // OpenAI APIエラーの詳細な処理
              if (error.response) {
                const errorData = error.response.data || error.response
                console.error("OpenAI API Error Response:", errorData)
                
                if (errorData.error?.code === 'invalid_api_key') {
                  errorMessage = "APIキーが無効です。設定画面から正しいAPIキーを入力してください"
                } else if (error.status === 401) {
                  errorMessage = "APIキーが認証されませんでした。APIキーを確認してください"
                } else if (error.status === 429) {
                  errorMessage = "APIの使用制限に達しました。しばらく待ってから再試行してください"
                } else if (errorData.error?.message) {
                  errorMessage = `OpenAI API エラー: ${errorData.error.message}`
                } else if (errorData.error) {
                  errorMessage = `OpenAI API エラー: ${JSON.stringify(errorData.error)}`
                }
              } else if (error.message) {
                errorMessage = error.message
              }
              
              // エラーの場合
              const errorResultForItem = {
                id: input.id,
                status: "error" as const,
                message: errorMessage,
              }
              if (sessionResultsCache[sessionId]) {
                sessionResultsCache[sessionId].push(errorResultForItem)
                console.log(`[SERVER CACHE] Added error for input ID ${input.id} to session ${sessionId}:`, errorResultForItem)
              }
              controller.enqueue(
                encoder.encode(
                  `event: update\ndata: ${JSON.stringify(errorResultForItem)}\n\n`,
                ),
              )
            }
          })
        })

          // 全ての処理が完了するのを待つ
          console.log(`[SERVER SSE] All promises started, waiting for completion...`)
          await Promise.all(promises)
          console.log(`[SERVER SSE] All promises completed for session ${sessionId}`)
        } catch (unexpectedError: any) {
          console.error(`[SERVER SSE] Unexpected error during processing:`, unexpectedError)
          
          // エラー情報をクライアントに送信
          const errorPayload = {
            message: `予期しないエラーが発生しました: ${unexpectedError.message || '不明なエラー'}`,
            type: 'critical_error',
            timestamp: new Date().toISOString()
          }
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify(errorPayload)}\n\n`))
        }

        // 全ての処理が完了したことを通知
        const donePayload = {
          message: "All tasks processed for session " + sessionId,
          timestamp: new Date().toISOString(),
          sessionId: sessionId,
          totalResults: sessionResultsCache[sessionId]?.length || 0
        }
        const doneMsg = `event: done\ndata: ${JSON.stringify(donePayload)}\n\n`
        console.log(`[SERVER SSE] SENDING DONE EVENT: ${doneMsg.replace(/\n/g, "\\n")}`)
        controller.enqueue(encoder.encode(doneMsg))
        console.log(`[SERVER SSE] Done event sent for session ${sessionId}`)
        
        // キープアライブインターバルをクリア
        clearInterval(keepAliveInterval)
        console.log(`[SERVER SSE] Cleared keepalive interval for session ${sessionId}`)
        
        // キャッシュのクリアタイマー
        setTimeout(() => {
          delete sessionResultsCache[sessionId]
          console.log(`[SERVER CACHE] Cleared cache for session ID: ${sessionId} after timeout`)
        }, 10 * 60 * 1000) // 10分後

        console.log(`[SERVER SSE] Closing controller for session ${sessionId}`)
        controller.close()
        console.log(`[SERVER SSE] Controller closed for session ${sessionId}`)
      },
    })

    return new NextResponse(stream, { headers: sseHeaders })
  } catch (error: any) {
    console.error("Request processing error:", error)
    return NextResponse.json({ error: error.message || "リクエスト処理中にエラーが発生しました" }, { status: 500 })
  }
}
