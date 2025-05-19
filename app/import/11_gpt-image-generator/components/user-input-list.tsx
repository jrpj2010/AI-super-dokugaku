"use client"

import { useState, useRef, useEffect } from "react"
import { useImageStore } from "@/lib/store"
import { useApiDebugStore } from "@/lib/debug-store"
import { useHistoryStore } from "@/lib/history-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserInputItem } from "@/components/user-input-item"
import { Plus, Download, AlertCircle, WifiOff, CheckCircle } from "lucide-react"
import { generateImages } from "@/lib/api"
import { downloadImagesAsZip } from "@/lib/download-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { v4 as uuidv4 } from "uuid"

// Custom EventSource types
interface CustomEventSource extends EventSource {
  addEventListener(type: string, listener: (event: MessageEvent) => void, options?: boolean | AddEventListenerOptions): void
}

interface CustomEventData {
  id?: string
  status?: string
  imageUrl?: string
  message?: string
  data?: string
}

export function UserInputList() {
  const { 
    userInputs, 
    addUserInput, 
    setUserInputStatus, 
    updateUserInput,
    concurrentLimit,
    masterPrompt,
    imageQuality,
    imageSize,
    imagesPerPrompt 
  } = useImageStore()
  const { addMessage } = useApiDebugStore()
  const { addHistory, updateHistory } = useHistoryStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [processingCount, setProcessingCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected')
  const [apiKeyWarning, setApiKeyWarning] = useState(false)
  const [timeoutError, setTimeoutError] = useState(false)
  const [currentSessionIdForFallback, setCurrentSessionIdForFallback] = useState<string | null>(null)
  const currentSessionIdForFallbackRef = useRef<string | null>(null) // 最新セッションIDを保持
  const eventSourceRef = useRef<EventSource | null>(null)
  
  useEffect(() => {
    // currentSessionIdForFallback (state) が変更されたら ref も更新
    currentSessionIdForFallbackRef.current = currentSessionIdForFallback
  }, [currentSessionIdForFallback])

  const handleGenerate = async () => {
    if (isGenerating) return

    // Check for API key
    if (!useImageStore.getState().openaiApiKey) {
      setApiKeyWarning(true)
      setTimeout(() => setApiKeyWarning(false), 5000)
      return
    }

    setIsGenerating(true)
    setProcessingCount(0)
    setCompletedCount(0)
    setErrorCount(0)
    setConnectionStatus('disconnected')
    setTimeoutError(false)
    
    // セッションID生成
    const sessionIdForRequest = uuidv4()
    setCurrentSessionIdForFallback(sessionIdForRequest)
    console.log('[FRONTEND] Generated new session ID for this request (for fallback):', sessionIdForRequest)

    // Reset all statuses to pending
    const validInputs = userInputs.filter((input) => input.prompt.trim() !== "")
    validInputs.forEach((input) => {
      setUserInputStatus(input.id, "pending")
    })

    // 履歴エントリを作成
    const historyId = addHistory({
      masterPrompt,
      userInputs: validInputs.map(input => ({
        id: input.id,
        prompt: input.prompt,
        status: "pending",
      })),
      settings: {
        quality: imageQuality,
        size: imageSize,
        imagesPerPrompt,
        concurrentLimit,
      },
      totalImages: validInputs.length,
      successCount: 0,
      errorCount: 0,
    })
    setCurrentHistoryId(historyId)

    try {
      // Set a timeout for the entire operation
      const overallTimeoutDuration = 120000; // 2分
      
      const overallTimeoutId = setTimeout(async () => {
        console.warn('[FRONTEND] Overall operation timeout reached. Attempting to fetch results via session API.')
        setTimeoutError(true)
        if (eventSourceRef.current) {
          eventSourceRef.current.close()
          console.log('[FRONTEND] Closed existing EventSource due to timeout.')
          eventSourceRef.current = null
        }
        setIsGenerating(false)
        setConnectionStatus('error')
        addMessage(`エラー: 全体処理がタイムアウトしました (${overallTimeoutDuration / 1000}秒)。セッションAPIで結果取得を試みます...`)
        
        // タイムアウト時にセッションAPIでフォールバック
        const sessionId = currentSessionIdForFallbackRef.current
        if (sessionId) {
          console.log('[FRONTEND] Using sessionId from ref for timeout fallback:', sessionId)
          await fetchResultsViaSessionApi(sessionId)
        } else {
          console.error('[FRONTEND] Cannot fallback: currentSessionIdForFallbackRef.current is null.')
          addMessage('フォールバック試行失敗: セッションIDが不明です。')
        }
      }, overallTimeoutDuration)

      // GenerateイメージにセッションIDを渡す
      const payloadForGenerateImages = {
        sessionId: sessionIdForRequest,
      }
      const eventSource = await generateImages(payloadForGenerateImages)
      console.log(`[FRONTEND SSE] EventSource created for session: ${sessionIdForRequest}`)
      eventSourceRef.current = eventSource
      setConnectionStatus('connected')

      // EventSource opened
      eventSource.onopen = (event) => {
        console.log('[FRONTEND SSE] ===== EVENTSOURCE OPENED =====')
        console.log('[FRONTEND SSE] Event object:', event)
        console.log('[FRONTEND SSE] EventSource readyState:', eventSource.readyState)
        console.log('[FRONTEND SSE] EventSource url:', eventSource.url)
        console.log('[FRONTEND SSE] Current time:', new Date().toISOString())
        setConnectionStatus('connected')
        addMessage("サーバーに接続しました")
      }

      // 通常のメッセージ処理
      eventSource.onmessage = (event) => {
        console.log('[FRONTEND SSE] Generic MESSAGE received. Event object:', event)
        console.log('<<<<< !!!!! GENERIC MESSAGE EVENT RECEIVED !!!!! >>>>> Raw Data:', event.data)
        console.log('[FRONTEND SSE] Generic MESSAGE data length:', event.data.length)
        try {
          const data = JSON.parse(event.data)
          console.log('[FRONTEND SSE] Generic MESSAGE parsed data:', data)

          if (data.id) {
            if (data.status === "processing") {
              setUserInputStatus(data.id, "processing")
              setProcessingCount((prev) => prev + 1)
              addMessage(`画像生成中: ${processingCount + 1}/${validInputs.length}`)
            } else if (data.status === "completed") {
              console.log('Image completed:', data.id, data.imageUrl)
              // imageUrlが既にData URL形式で送られてくる
              const imageUrl = data.imageUrl
              if (!imageUrl) {
                console.error('No imageUrl in completion data:', data)
                return
              }
              setUserInputStatus(data.id, "completed", imageUrl)
              const newCompletedCount = completedCount + 1
              setCompletedCount(newCompletedCount)
              addMessage(`画像生成完了: ${newCompletedCount}/${validInputs.length}`)
              
              // 履歴を更新
              if (currentHistoryId) {
                updateHistory(currentHistoryId, {
                  userInputs: userInputs.map(input => ({
                    id: input.id,
                    prompt: input.prompt,
                    imageUrl: input.imageUrl,
                    status: input.status,
                    error: input.errorMessage,
                  })),
                  successCount: newCompletedCount,
                })
              }
            } else if (data.status === "error") {
              console.log('Image generation error:', data.id, data.message)
              setUserInputStatus(data.id, "error", undefined, data.message)
              const newErrorCount = errorCount + 1
              setErrorCount(newErrorCount)
              addMessage(`画像生成エラー: ${data.message || "不明なエラー"}`)
              
              // 履歴を更新
              if (currentHistoryId) {
                updateHistory(currentHistoryId, {
                  userInputs: userInputs.map(input => ({
                    id: input.id,
                    prompt: input.prompt,
                    imageUrl: input.imageUrl,
                    status: input.status,
                    error: input.errorMessage,
                  })),
                  errorCount: newErrorCount,
                })
              }
            }
          }

          if (data.message === "All tasks processed") {
            clearTimeout(overallTimeoutId)
            eventSource.close()
            setIsGenerating(false)
            setConnectionStatus('disconnected')

            if (errorCount > 0) {
              addMessage(`処理完了: ${completedCount}件成功, ${errorCount}件エラー`)
            } else {
              addMessage(`処理完了: 全${completedCount}件の画像生成に成功しました`)
            }
          }
        } catch (error) {
          console.error('Error parsing message:', error, event)
        }
      }

      // カスタムイベントリスナーを追加（pingイベントを追加）
      const eventTypes = ['update', 'progress', 'info', 'done', 'connect', 'ping']
      console.log('[FRONTEND SSE] Setting up custom event listeners for:', eventTypes)
      eventTypes.forEach(eventType => {
        eventSource.addEventListener(eventType, (event: MessageEvent) => {
          console.log(`[FRONTEND SSE] ===== CUSTOM EVENT '${eventType}' RECEIVED =====`)
          console.log(`[FRONTEND SSE] Timestamp: ${new Date().toISOString()}`)
          console.log(`[FRONTEND SSE] Event object:`, event)
          console.log(`[FRONTEND SSE] Raw data:`, event.data)
          console.log(`[FRONTEND SSE] Data length:`, event.data.length)
          console.log(`[FRONTEND SSE] EventSource state:`, eventSource.readyState)
          
          try {
            // 'connect'イベントのデータはJSONでない可能性がある
            if (eventType === 'connect' && typeof event.data === 'string' && event.data.includes("Connected to SSE")) {
              console.log(`[FRONTEND SSE] Custom event '${eventType}' data is connect confirmation.`)
            } else if (event.data) {
              const data = JSON.parse(event.data)
              console.log(`[FRONTEND SSE] Custom event '${eventType}' parsed data:`, data)
              
              // 'update' イベントの処理
              if (eventType === 'update') {
                if (data.message) {
                  addMessage(data.message)
                }
                
                if (data.id && data.status === "completed") {
                  console.log(`[FRONTEND SSE] Processed 'update' event for ID: ${data.id} with imageUrl: ${data.imageUrl}`)
                  if (!data.imageUrl) {
                    console.error('No imageUrl in update completion data:', data)
                    return
                  }
                  setUserInputStatus(data.id, "completed", data.imageUrl)
                  const newCompletedCount = completedCount + 1
                  setCompletedCount(newCompletedCount)
                  addMessage(`画像生成完了: ${data.id}`)
                  
                  // 成功したことをデバッグログに出力
                  console.log(`Successfully updated status for ${data.id} to completed with imageUrl`)
                  
                  // 全ての画像が処理完了したかチェック
                  const currentCompletedCount = newCompletedCount
                  const currentErrorCount = errorCount
                  const totalProcessed = currentCompletedCount + currentErrorCount
                  const totalInputs = validInputs.length
                  
                  if (totalProcessed >= totalInputs) {
                    console.log(`All images processed (${totalProcessed}/${totalInputs}), clearing timeout`)
                    clearTimeout(overallTimeoutId)
                  }
                } else if (data.id && data.status === "error") {
                  setUserInputStatus(data.id, "error", undefined, data.message)
                  const newErrorCount = errorCount + 1
                  setErrorCount(newErrorCount)
                  
                  // 全ての画像が処理完了したかチェック
                  const totalProcessed = completedCount + newErrorCount
                  const totalInputs = validInputs.length
                  
                  if (totalProcessed >= totalInputs) {
                    console.log(`All images processed (${totalProcessed}/${totalInputs}), clearing timeout`)
                    clearTimeout(overallTimeoutId)
                  }
                }
              }
              
              // 'done' イベントの処理
              if (eventType === 'done') {
                console.log('[FRONTEND SSE] "done" event received. Clearing overall timeout.')
                clearTimeout(overallTimeoutId)
                eventSource.close()
                setIsGenerating(false)
                setConnectionStatus('disconnected')
                addMessage(`処理完了: ${completedCount}件成功`)
              }
              
              // 'ping' イベントの処理（キープアライブ）
              if (eventType === 'ping') {
                console.log('[FRONTEND SSE] Received keepalive ping')
                // タイムアウトをリセット
                clearTimeout(overallTimeoutId)
                overallTimeoutId = setTimeout(async () => {
                  console.warn('[FRONTEND] Overall operation timeout reached after ping.')
                  setTimeoutError(true)
                  if (eventSourceRef.current) {
                    eventSourceRef.current.close()
                    eventSourceRef.current = null
                  }
                  setIsGenerating(false)
                  setConnectionStatus('error')
                  addMessage(`エラー: 処理がタイムアウトしました。セッションAPIで結果取得を試みます...`)
                  
                  const sessionId = currentSessionIdForFallbackRef.current
                  if (sessionId) {
                    await fetchResultsViaSessionApi(sessionId)
                  }
                }, overallTimeoutDuration)
              }
            }
          } catch (error) {
            console.error(`[FRONTEND SSE] Error parsing custom event '${eventType}' data:`, error, 'Raw data:', event.data)
          }
        })
      })

      // エラーハンドラー
      eventSource.onerror = (event) => {
        console.error('[FRONTEND SSE] EventSource ERROR. Event object:', event)
        console.error('<<<<< !!!!! EVENTSOURCE ERROR !!!!! >>>>> Details:', event)
        clearTimeout(overallTimeoutId)
        if (eventSourceRef.current) {
          eventSourceRef.current.close()
          eventSourceRef.current = null
        }
        setIsGenerating(false)
        setConnectionStatus('error')
        addMessage("エラー: サーバーとの接続が切断されました")
      }
    } catch (error: any) {
      console.error("[FRONTEND] Error in handleGenerate (before or during SSE setup):", error)
      setIsGenerating(false)
      setConnectionStatus('error')
      addMessage(`エラー: 画像生成処理の開始に失敗しました - ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  // セッションAPIで結果を取得しUIを更新する
  const fetchResultsViaSessionApi = async (sessionId: string) => {
    if (!sessionId) {
      console.warn('[FRONTEND FALLBACK] Attempted to fetch results but session ID is invalid.')
      addMessage('フォールバックエラー: セッションIDが不明です。')
      return
    }
    console.log(`[FRONTEND FALLBACK] Fetching results for session ID: ${sessionId} via session API.`)
    addMessage(`セッションAPI (${sessionId.substring(0,8)}...) で結果取得中...`)
    
    let response: Response
    try {
      console.log(`[FRONTEND FALLBACK] Making fetch request to /api/session-results/${sessionId}`)
      response = await fetch(`/api/session-results/${sessionId}`)
      console.log(`[FRONTEND FALLBACK] Response status: ${response.status}`)
    } catch (fetchError) {
      console.error('[FRONTEND FALLBACK] Network error during fetch:', fetchError)
      addMessage(`ネットワークエラー: セッションAPIへの接続に失敗しました。`)
      return
    }
    
    if (!response.ok) {
      console.error(`[FRONTEND FALLBACK] Session API request failed: ${response.status} ${response.statusText}`)
      addMessage(`セッションAPI HTTP エラー: ${response.status} ${response.statusText}`)
      return
    }
    
    let results: any
    try {
      results = await response.json()
      console.log('[FRONTEND FALLBACK] Successfully parsed JSON response:', results)
    } catch (parseError) {
      console.error('[FRONTEND FALLBACK] JSON parse error:', parseError)
      addMessage('セッションAPIレスポンスの解析に失敗しました。')
      return
    }

    if (results && results.images && Array.isArray(results.images)) {
      console.log(`[FRONTEND FALLBACK] Processing ${results.images.length} results`)
      let fetchedAndUpdatedCount = 0
      let errorCount = 0
      const currentInputStates = useImageStore.getState().userInputs

      results.images.forEach((item: { id: string; status: string; imageUrl?: string; message?: string }) => {
        console.log(`[FRONTEND FALLBACK] Processing result for ID ${item.id}: status=${item.status}`)
        const existingInput = currentInputStates.find(ui => ui.id === item.id)
        
        if (existingInput) {
          console.log(`[FRONTEND FALLBACK] Found matching input for ID ${item.id}, current status: ${existingInput.status}`)
          if (existingInput.status !== 'completed') {
            if (item.status === 'completed' && item.imageUrl) {
              console.log(`[FRONTEND FALLBACK] Updating ID ${item.id} to completed with imageUrl`)
              setUserInputStatus(item.id, 'completed', item.imageUrl)
              fetchedAndUpdatedCount++
            } else if (item.status === 'error') {
              console.log(`[FRONTEND FALLBACK] Updating ID ${item.id} to error`)
              setUserInputStatus(item.id, 'error', undefined, item.message || "セッションAPI経由でエラー確認")
              errorCount++
            }
          } else {
            console.log(`[FRONTEND FALLBACK] Skipping ID ${item.id} - already completed`)
          }
        } else {
          console.warn(`[FRONTEND FALLBACK] No matching input found for ID ${item.id}`)
        }
      })
      
      const message = `セッションAPIで ${fetchedAndUpdatedCount} 件の結果を更新${errorCount > 0 ? `、${errorCount} 件のエラー` : ''}。`
      console.log(`[FRONTEND FALLBACK] ${message}`)
      addMessage(message)
    } else {
      console.warn('[FRONTEND FALLBACK] Invalid or empty results structure:', results)
      addMessage(`セッションAPIから有効な結果が得られませんでした (Session ID: ${sessionId.substring(0,8)}...)`)
    }
    
    setIsGenerating(false)
  }

  const handleDownloadAll = async () => {
    const completedImages = userInputs.filter(
      (input) => input.status === "completed" && input.imageUrl
    ).map(input => ({
      id: input.id,
      imageUrl: input.imageUrl!,
      prompt: input.prompt,
    }))

    if (completedImages.length === 0) {
      addMessage("ダウンロードする画像がありません")
      return
    }

    try {
      await downloadImagesAsZip(completedImages, masterPrompt)
      addMessage(`${completedImages.length}枚の画像をダウンロードしました`)
    } catch (error) {
      addMessage("画像のダウンロードに失敗しました")
      console.error(error)
    }
  }

  const progressValue = userInputs.filter((input) => input.prompt.trim() !== "").length > 0 
    ? ((completedCount + errorCount) / userInputs.filter((input) => input.prompt.trim() !== "").length) * 100 
    : 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>ユーザーインプット</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Warnings and Status */}
          {apiKeyWarning && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                OpenAI APIキーが設定されていません。設定画面から追加してください。
              </AlertDescription>
            </Alert>
          )}
          
          {timeoutError && (
            <Alert variant="destructive">
              <WifiOff className="h-4 w-4" />
              <AlertDescription>
                処理がタイムアウトしました。接続を確認してやり直してください。
              </AlertDescription>
            </Alert>
          )}

          {connectionStatus === 'connected' && (
            <Alert className="border-green-300 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                サーバーに接続されています
              </AlertDescription>
            </Alert>
          )}

          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>進捗: {completedCount + errorCount} / {userInputs.filter((input) => input.prompt.trim() !== "").length}</span>
                <span>{Math.round(progressValue)}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              {errorCount > 0 && (
                <p className="text-sm text-red-600">
                  エラー: {errorCount}件
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
            <div className="font-medium">ユーザーインプット</div>
            <div className="font-medium">プレビュー</div>
          </div>

          {userInputs.map((input) => (
            <UserInputItem key={input.id} input={input} />
          ))}

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" size="icon" onClick={addUserInput} title="インプット追加">
              <Plus className="h-4 w-4" />
            </Button>

            {completedCount > 0 && (
              <Button 
                variant="outline" 
                onClick={handleDownloadAll}
                title="全画像をダウンロード"
              >
                <Download className="h-4 w-4 mr-2" />
                一括ダウンロード ({completedCount}枚)
              </Button>
            )}
            
            {/* 開発環境用: 強制フォールバックボタン */}
            {process.env.NODE_ENV === 'development' && currentSessionIdForFallback && (
              <Button 
                variant="outline"
                onClick={() => {
                  console.log('[DEV] Force fallback button clicked')
                  fetchResultsViaSessionApi(currentSessionIdForFallback)
                }}
                title="開発用: フォールバックを実行"
              >
                🔧 Force Fallback
              </Button>
            )}

            <Button onClick={handleGenerate} disabled={isGenerating || userInputs.length === 0}>
              {isGenerating ? "生成中..." : "Generate"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
