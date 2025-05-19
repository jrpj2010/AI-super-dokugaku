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
  addMessage("APIに接続しています...")

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

  addMessage("準備完了: 画像生成を開始します")

  // Create EventSource for SSE
  const eventSourceUrl = `${requestUrl}?concurrentLimit=${concurrentLimit}`
  console.log(`[API CLIENT] Creating EventSource with URL: ${eventSourceUrl}`)
  const eventSource = new EventSource(eventSourceUrl)
  console.log(`[API CLIENT] EventSource created`)
  
  // タイムアウト管理
  let connectionTimeout: NodeJS.Timeout | null = null
  const CONNECTION_TIMEOUT = 120000 // 120秒 (2分) に延長
  
  const clearConnectionTimeout = () => {
    if (connectionTimeout) {
      clearTimeout(connectionTimeout)
      connectionTimeout = null
    }
  }
  
  const resetConnectionTimeout = () => {
    clearConnectionTimeout()
    connectionTimeout = setTimeout(() => {
      addMessage("⚠️ エラー: API通信がタイムアウトしました（120秒）")
      addLog({
        type: "error",
        method: "EventSource",
        url: requestUrl,
        error: "Connection timeout after 120s - APIサーバーから応答がありません",
      })
      eventSource.close()
    }, CONNECTION_TIMEOUT)
  }

  // 接続イベント
  eventSource.onopen = () => {
    addMessage("✅ APIサーバーに接続しました")
    addLog({
      type: "info",
      method: "EventSource",
      url: requestUrl,
      body: { message: "EventSource connection opened" },
    })
    resetConnectionTimeout()
  }

  // エラーイベント
  eventSource.onerror = (error) => {
    clearConnectionTimeout()
    addMessage("❌ APIエラー: 接続が切断されました")
    addLog({
      type: "error",
      method: "EventSource",
      url: requestUrl,
      error: "EventSource connection error/closed",
    })
    eventSource.close()
  }
  
  // メッセージイベント
  eventSource.onmessage = (event) => {
    resetConnectionTimeout() // メッセージ受信時にタイムアウトをリセット
    console.log("EventSource onmessage:", event.type, event.data)
    addLog({
      type: "info",
      method: "EventSource",
      url: requestUrl,
      body: { event: event.type, data: event.data },
    })
  }

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
  
  fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    signal: controller.signal,
  })
    .then((response) => {
      clearTimeout(timeoutId)
      const duration = Date.now() - startTime
      
      // レスポンスログを記録
      addLog({
        type: "response",
        method: "POST",
        url: requestUrl,
        status: response.status,
        duration,
      })
      
      if (response.ok) {
        addMessage("✅ APIリクエストを送信しました - 生成開始を待っています...")
        resetConnectionTimeout()
      } else {
        addMessage(`❌ APIエラー: ${response.status} ${response.statusText}`)
        clearConnectionTimeout()
        
        if (response.status === 401) {
          addMessage("🔒 認証エラー: APIキーが無効か、権限がありません")
        } else if (response.status === 429) {
          addMessage("⏱️ レート制限: リクエストが多すぎます。しばらく待ってから再試行してください")
        } else if (response.status >= 500) {
          addMessage("⚠️ サーバーエラー: OpenAIサービスに問題が発生しています")
        }
        
        eventSource.close()
      }
    })
    .catch((error) => {
      clearTimeout(timeoutId)
      const duration = Date.now() - startTime
      
      // エラーログを記録
      addLog({
        type: "error",
        method: "POST",
        url: requestUrl,
        error: error.name === 'AbortError' ? 'Request timeout' : error.message,
        duration,
      })
      
      console.error("Error sending generation request:", error)
      if (error.name === 'AbortError') {
        addMessage("エラー: リクエストがタイムアウトしました")
      } else {
        addMessage(`エラー: ${error.message || "リクエスト送信に失敗しました"}`)
      }
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
