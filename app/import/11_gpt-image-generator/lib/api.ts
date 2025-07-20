"use client"

import { useImageStore } from "@/lib/store"
import { useApiDebugStore } from "@/lib/debug-store"
import { useAPILogStore } from "@/lib/api-log-store"

export async function generateImages(payload?: { sessionId?: string }) {
  const { masterPrompt, userInputs, concurrentLimit, imageQuality, imageSize, imagesPerPrompt, openaiApiKey } =
    useImageStore.getState()
  const { addMessage } = useApiDebugStore.getState()

  console.log(`[API CLIENT] generateImages called with payload:`, payload)
  console.log(`[API CLIENT] sessionId: ${payload?.sessionId}`)
  
  // デバッグメッセージ
  addMessage("🔌 APIサーバーへの接続を開始...")

  // リクエストURL
  const requestUrl = "/api/generate-stream"
  
  // EventSourceのログを登録するための関数を定義
  const { addLog } = useAPILogStore.getState()

  // Filter out empty prompts
  const validInputs = userInputs.filter((input) => input.prompt.trim() !== "")

  if (validInputs.length === 0) {
    addMessage("エラー: ユーザーインプットが入力されていません")
    throw new Error("少なくとも1つのユーザーインプットを入力してください")
  }

  if (!masterPrompt.trim()) {
    addMessage("エラー: マスタープロンプトが入力されていません")
    throw new Error("マスタープロンプトを入力してください")
  }

  if (!openaiApiKey) {
    addMessage("エラー: OpenAI APIキーが設定されていません")
    addLog({
      type: "error",
      method: "POST",
      url: requestUrl,
      error: "OpenAI API key not configured",
    })
    throw new Error("OpenAI APIキーを設定してください")
  }

  addMessage(`📤 APIリクエスト準備完了: ${validInputs.length}件の画像を生成します`)
  
  // SSEレスポンスを処理するためのEventSourceを作成
  const eventSource = new EventSource('data:text/plain,') // ダミーのEventSource
  let sseConnected = false

  // Send the data to the server
  const requestBody = {
    masterPrompt,
    userInputs: validInputs,
    concurrentLimit,
    quality: imageQuality,
    size: imageSize,
    n: imagesPerPrompt,
    apiKey: openaiApiKey,
    ...(payload?.sessionId && { sessionId: payload.sessionId }),
  }
  
  // リクエストログを記録
  addLog({
    type: "request",
    method: "POST",
    url: requestUrl,
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  })
  
  const startTime = Date.now()
  
  // Add timeout to fetch
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
    addLog({
      type: "error",
      method: "POST",
      url: requestUrl,
      error: "Request timeout after 60 seconds",
      duration: 60000,
    })
  }, 60000) // 60 seconds timeout for the initial request
  
  console.log(`[API CLIENT] Sending POST request to ${requestUrl} with body:`, requestBody)
  addMessage(`📡 POST リクエスト送信中... (並列数: ${concurrentLimit}, 画質: ${imageQuality}, サイズ: ${imageSize})`)
  
  // SSEストリームを受信するfetchリクエスト
  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/event-stream",
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const duration = Date.now() - startTime
      
      // レスポンスログを記録
      addLog({
        type: "response",
        method: "POST",
        url: requestUrl,
        status: response.status,
        duration,
      })
      
      if (!response.ok) {
        addMessage(`❌ APIエラー: ${response.status} ${response.statusText}`)
        
        if (response.status === 401) {
          addMessage("🔒 認証エラー: APIキーが無効か、権限がありません")
        } else if (response.status === 429) {
          addMessage("⏱️ レート制限: リクエストが多すぎます。しばらく待ってから再試行してください")
        } else if (response.status >= 500) {
          addMessage("⚠️ サーバーエラー: OpenAIサービスに問題が発生しています")
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      addMessage(`✅ APIレスポンス受信 (ステータス: ${response.status}) - SSEストリーム開始`)
      
      // SSEストリームを読み取る
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("レスポンスボディの読み取りに失敗しました")
      }
      
      const decoder = new TextDecoder()
      let buffer = ''
      
      let currentEventType = 'message'
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        
        for (const line of lines) {
          if (line.startsWith('event:')) {
            currentEventType = line.slice(6).trim()
            console.log(`[API CLIENT] SSE Event Type: ${currentEventType}`)
          } else if (line.startsWith('data:')) {
            const data = line.slice(5).trim()
            if (data) {
              console.log(`[API CLIENT] SSE Data for event '${currentEventType}': ${data}`)
              
              // EventSourceのカスタムイベントをエミュレート
              try {
                if (currentEventType === 'connect' && !sseConnected) {
                  sseConnected = true
                  eventSource.dispatchEvent(new Event('open'))
                }
                
                const messageEvent = new MessageEvent(currentEventType, {
                  data: data,
                  origin: window.location.origin,
                  lastEventId: '',
                  source: null,
                  ports: [],
                })
                eventSource.dispatchEvent(messageEvent)
                
                // デバッグメッセージの追加
                if (currentEventType === 'info' || currentEventType === 'update' || currentEventType === 'progress') {
                  try {
                    const parsedData = JSON.parse(data)
                    if (parsedData.message) {
                      addMessage(`📊 [${currentEventType}] ${parsedData.message}`)
                    }
                  } catch (e) {
                    // JSONパースエラーは無視
                  }
                }
              } catch (e) {
                console.error('[API CLIENT] Error dispatching event:', e)
              }
            }
          } else if (line === '') {
            // イベントの区切り
            currentEventType = 'message'
          }
        }
      }
      
      console.log('[API CLIENT] SSE stream ended')
      addMessage('✅ すべての処理が完了しました')
    })
    .catch((error) => {
      const duration = Date.now() - startTime
      
      // エラーログを記録
      addLog({
        type: "error",
        method: "POST",
        url: requestUrl,
        error: error.message,
        duration,
      })
      
      console.error("Error sending generation request:", error)
      addMessage(`エラー: ${error.message || "リクエスト送信に失敗しました"}`)
      eventSource.close()
      throw error
    })

  return eventSource
}

export async function editImage(imageBase64: string, maskBase64: string | null, prompt: string) {
  const { imageQuality, imageSize, imagesPerPrompt, openaiApiKey } = useImageStore.getState()
  const { addMessage } = useApiDebugStore.getState()
  const { addLog } = useAPILogStore.getState()

  addMessage("画像編集: APIリクエストを準備中...")

  try {
    addMessage("画像編集: リクエストを送信中...")

    const requestUrl = "/api/edit-image"
    const requestBody = {
      image: imageBase64,
      mask: maskBase64,
      prompt,
      quality: imageQuality,
      size: imageSize,
      n: imagesPerPrompt,
      apiKey: openaiApiKey,
    }
    
    // リクエストログを記録
    addLog({
      type: "request",
      method: "POST",
      url: requestUrl,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...requestBody,
        image: `[BASE64_IMAGE_${imageBase64.length}_chars]`, // 長いデータは省略
        mask: maskBase64 ? `[BASE64_MASK_${maskBase64.length}_chars]` : null,
      },
    })
    
    const startTime = Date.now()

    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const duration = Date.now() - startTime
    
    if (!response.ok) {
      const errorData = await response.json()
      
      // エラーレスポンスログを記録
      addLog({
        type: "response",
        method: "POST",
        url: requestUrl,
        status: response.status,
        response: errorData,
        duration,
      })
      
      addMessage(`画像編集エラー: ${errorData.error || "不明なエラー"}`)
      throw new Error(errorData.error || "画像編集に失敗しました")
    }

    const responseData = await response.json()
    
    // 成功レスポンスログを記録
    addLog({
      type: "response",
      method: "POST",
      url: requestUrl,
      status: response.status,
      response: {
        ...responseData,
        imageUrl: responseData.imageUrl ? `[BASE64_IMAGE]` : undefined,
        allImageUrls: responseData.allImageUrls ? `[${responseData.allImageUrls.length} images]` : undefined,
      },
      duration,
    })

    addMessage("画像編集: 完了しました")
    return responseData
  } catch (err: any) {
    // キャッチされたエラーをログに記録
    addLog({
      type: "error",
      method: "POST",
      url: "/api/edit-image",
      error: err.message,
    })
    
    addMessage(`画像編集エラー: ${err.message || "不明なエラー"}`)
    throw err
  }
}
