"use client"

import { useState, useRef, useEffect } from "react"
import { useImageStore } from "@/lib/store"
import { useApiDebugStore } from "@/lib/debug-store"
import { useHistoryStore } from "@/lib/history-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserInputItem } from "@/components/user-input-item"
import { Plus, Download, AlertCircle, WifiOff, CheckCircle, Zap, Loader2, Activity, FileSpreadsheet } from "lucide-react"
import { generateImages } from "@/lib/api"
import { downloadImagesAsZip } from "@/lib/download-utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { v4 as uuidv4 } from "uuid"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CSVImporter } from "@/components/csv-importer"

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
    bulkAddUserInputs,
    setUserInputStatus, 
    updateUserInput,
    concurrentLimit,
    setConcurrentLimit,
    dynamicConcurrency,
    performanceMode,
    masterPrompt,
    imageQuality,
    imageSize,
    imagesPerPrompt 
  } = useImageStore()
  const { addMessage } = useApiDebugStore()
  const { addHistory, updateHistory } = useHistoryStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCSVImporter, setShowCSVImporter] = useState(false)
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
  
  // バッチ生成用の新しい状態
  const [batchCount, setBatchCount] = useState(10)
  const [isPreparingBatch, setIsPreparingBatch] = useState(false)
  const [realtimeStats, setRealtimeStats] = useState({
    startTime: null as Date | null,
    elapsedTime: 0,
    averageTimePerImage: 0,
    estimatedTimeRemaining: 0,
    imagesPerSecond: 0,
    errorRate: 0,
    currentConcurrency: concurrentLimit,
    adjustmentHistory: [] as Array<{time: Date, from: number, to: number, reason: string}>
  })
  const [activePrompts, setActivePrompts] = useState<Map<string, string>>(new Map())
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const errorWindowRef = useRef<Array<{timestamp: Date, isError: boolean}>>([])
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number } | null>(null)
  
  useEffect(() => {
    // currentSessionIdForFallback (state) が変更されたら ref も更新
    currentSessionIdForFallbackRef.current = currentSessionIdForFallback
  }, [currentSessionIdForFallback])
  
  // エラー率を計算する関数
  const calculateErrorRate = () => {
    const now = new Date()
    const windowSize = 30000 // 30秒のウィンドウ
    const recentEvents = errorWindowRef.current.filter(
      event => now.getTime() - event.timestamp.getTime() < windowSize
    )
    
    if (recentEvents.length === 0) return 0
    const errors = recentEvents.filter(event => event.isError).length
    return (errors / recentEvents.length) * 100
  }
  
  // 動的並列数調整関数
  const adjustConcurrency = (errorRate: number) => {
    if (!dynamicConcurrency) return
    
    const currentLimit = realtimeStats.currentConcurrency
    let newLimit = currentLimit
    let reason = ""
    
    if (errorRate > 20) {
      // エラー率が高い場合は並列数を減らす（Tier 5向けに閾値を調整）
      newLimit = Math.max(3, Math.floor(currentLimit * 0.7))
      reason = `エラー率が高い (${errorRate.toFixed(1)}%)`
    } else if (errorRate < 5 && currentLimit < concurrentLimit) {
      // エラー率が低い場合は並列数を増やす（慎重に）
      newLimit = Math.min(concurrentLimit, currentLimit + 1)
      reason = `エラー率が低い (${errorRate.toFixed(1)}%)`
    }
    
    if (newLimit !== currentLimit) {
      setConcurrentLimit(newLimit)
      setRealtimeStats(prev => ({
        ...prev,
        currentConcurrency: newLimit,
        adjustmentHistory: [...prev.adjustmentHistory, {
          time: new Date(),
          from: currentLimit,
          to: newLimit,
          reason
        }]
      }))
      addMessage(`🎯 並列数を自動調整: ${currentLimit} → ${newLimit} (${reason})`)
    }
  }
  
  // リアルタイム統計を更新する
  useEffect(() => {
    if (isGenerating && realtimeStats.startTime) {
      statsIntervalRef.current = setInterval(() => {
        const now = new Date()
        const elapsed = (now.getTime() - realtimeStats.startTime!.getTime()) / 1000
        const completed = completedCount + errorCount
        const remaining = userInputs.filter(input => input.prompt.trim() !== "").length - completed
        const avgTime = completed > 0 ? elapsed / completed : 0
        const estRemaining = avgTime * remaining
        const imagesPerSec = completed > 0 ? completed / elapsed : 0
        
        const currentErrorRate = calculateErrorRate()
        
        setRealtimeStats(prev => ({
          ...prev,
          elapsedTime: elapsed,
          averageTimePerImage: avgTime,
          estimatedTimeRemaining: estRemaining,
          imagesPerSecond: imagesPerSec,
          errorRate: currentErrorRate
        }))
        
        // エラー率に基づいて動的調整（5秒ごと）
        if (Math.floor(elapsed) % 5 === 0) {
          adjustConcurrency(currentErrorRate)
        }
      }, 100) // 100msごとに更新
    } else {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current)
        statsIntervalRef.current = null
      }
    }
    
    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current)
      }
    }
  }, [isGenerating, completedCount, errorCount, userInputs, realtimeStats.startTime])

  // バッチでプロンプトを追加
  const handleBatchAdd = () => {
    setIsPreparingBatch(true)
    const basePrompt = userInputs.length > 0 && userInputs[userInputs.length - 1].prompt 
      ? userInputs[userInputs.length - 1].prompt 
      : "beautiful landscape"
    
    // バッチでプロンプトを追加
    for (let i = 0; i < batchCount; i++) {
      const variation = `${basePrompt} variation ${i + 1}`
      addUserInput(variation)
    }
    
    setTimeout(() => setIsPreparingBatch(false), 500)
    addMessage(`${batchCount}個のプロンプトを追加しました`)
  }

  const handleCSVImport = (prompts: string[]) => {
    // 既存の空のプロンプトをフィルタリング
    const nonEmptyInputs = userInputs.filter(input => input.prompt.trim() !== '')
    
    // 空でないプロンプトがある場合は確認
    if (nonEmptyInputs.length > 0) {
      if (!confirm(`既存の${nonEmptyInputs.length}個のプロンプトがあります。CSVインポートで置き換えますか？`)) {
        return
      }
    }
    
    // すべてクリアしてから新しいプロンプトを追加
    const { clearUserInputs } = useImageStore.getState()
    clearUserInputs()
    bulkAddUserInputs(prompts)
    addMessage(`📊 CSVから${prompts.length}個のプロンプトをインポートしました`)
    setShowCSVImporter(false)
  }
  
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
    setRealtimeStats({
      startTime: new Date(),
      elapsedTime: 0,
      averageTimePerImage: 0,
      estimatedTimeRemaining: 0,
      imagesPerSecond: 0,
      errorRate: 0,
      currentConcurrency: concurrentLimit,
      adjustmentHistory: []
    })
    setActivePrompts(new Map())
    
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
      const overallTimeoutDuration = 1800000; // 30分（GPT Image API は時間がかかるため）
      
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
              const prompt = userInputs.find(u => u.id === data.id)?.prompt || "Unknown"
              setActivePrompts(prev => {
                const newMap = new Map(prev)
                newMap.set(data.id, prompt)
                return newMap
              })
              // 進捗メッセージも設定
              if (data.message) {
                updateUserInput(data.id, {
                  progressMessage: data.message
                })
              }
              addMessage(`🎨 画像生成開始 [${data.id.substring(0, 8)}...]: ${prompt.substring(0, 50)}...`)
            } else if (data.status === "completed") {
              console.log('Image completed:', data.id, data.imageUrl)
              // imageUrlが既にData URL形式で送られてくる
              const imageUrl = data.imageUrl
              if (!imageUrl) {
                console.error('No imageUrl in completion data:', data)
                return
              }
              setUserInputStatus(data.id, "completed", imageUrl)
              let newCompletedCount = 0
              setCompletedCount(prev => {
                newCompletedCount = prev + 1
                console.log(`[FRONTEND] Completed count updated: ${newCompletedCount}`)
                return newCompletedCount
              })
              setActivePrompts(prev => {
                const newMap = new Map(prev)
                newMap.delete(data.id)
                return newMap
              })
              const prompt = userInputs.find(u => u.id === data.id)?.prompt || "Unknown"
              // setStateの更新が非同期なので、newCompletedCountを使用
              setTimeout(() => {
                addMessage(`✅ 画像生成完了 [${data.id.substring(0, 8)}...]: ${prompt.substring(0, 30)}... (${newCompletedCount}/${validInputs.length})`)
              }, 0)
              
              // 成功イベントを記録
              errorWindowRef.current.push({ timestamp: new Date(), isError: false })
              
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
              setActivePrompts(prev => {
                const newMap = new Map(prev)
                newMap.delete(data.id)
                return newMap
              })
              addMessage(`❌ エラー [${data.id.substring(0, 8)}...]: ${data.message || "不明なエラー"}`)
              
              // エラーイベントを記録
              errorWindowRef.current.push({ timestamp: new Date(), isError: true })
              
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
      const eventTypes = ['update', 'progress', 'info', 'done', 'connect', 'ping', 'error']
      console.log('[FRONTEND SSE] Setting up custom event listeners for:', eventTypes)
      eventTypes.forEach(eventType => {
        eventSource.addEventListener(eventType, (event: MessageEvent) => {
          console.log(`[FRONTEND SSE] ===== CUSTOM EVENT '${eventType}' RECEIVED =====`)
          console.log(`[FRONTEND SSE] Timestamp: ${new Date().toISOString()}`)
          console.log(`[FRONTEND SSE] Event object:`, event)
          console.log(`[FRONTEND SSE] Raw data:`, event.data)
          console.log(`[FRONTEND SSE] Data length:`, event.data.length)
          console.log(`[FRONTEND SSE] EventSource state:`, eventSource.readyState)
          
          // すべてのイベントをデバッグコンソールに表示
          addMessage(`🔔 [SSE ${eventType}] ${event.data.substring(0, 100)}${event.data.length > 100 ? '...' : ''}`)
          
          try {
            // 'connect'イベントのデータはJSONでない可能性がある
            if (eventType === 'connect' && typeof event.data === 'string' && event.data.includes("Connected to SSE")) {
              console.log(`[FRONTEND SSE] Custom event '${eventType}' data is connect confirmation.`)
            } else if (event.data) {
              const data = JSON.parse(event.data)
              console.log(`[FRONTEND SSE] Custom event '${eventType}' parsed data:`, data)
              
              // 'progress' イベントの処理
              if (eventType === 'progress' && data.id) {
                // 進捗メッセージをユーザーインプットに設定
                updateUserInput(data.id, {
                  progressMessage: data.message || ""
                })
                if (data.message) {
                  addMessage(`📊 [${data.id.substring(0, 8)}...] ${data.message}`)
                }
              }
              
              // 'update' イベントの処理
              if (eventType === 'update') {
                if (data.message) {
                  addMessage(data.message)
                }
                
                if (data.id && data.status === "processing") {
                  // processingステータスの場合
                  setUserInputStatus(data.id, "processing")
                  if (data.message) {
                    updateUserInput(data.id, {
                      progressMessage: data.message
                    })
                  }
                  const prompt = userInputs.find(u => u.id === data.id)?.prompt || "Unknown"
                  setActivePrompts(prev => {
                    const newMap = new Map(prev)
                    newMap.set(data.id, prompt)
                    return newMap
                  })
                  console.log(`[FRONTEND SSE] Set status to processing for ID: ${data.id}`)
                } else if (data.id && data.status === "completed") {
                  console.log(`[FRONTEND SSE] Processed 'update' event for ID: ${data.id} with imageUrl: ${data.imageUrl}`)
                  if (!data.imageUrl) {
                    console.error('No imageUrl in update completion data:', data)
                    return
                  }
                  setUserInputStatus(data.id, "completed", data.imageUrl)
                  let newCompletedCount = 0
                  setCompletedCount(prev => {
                    newCompletedCount = prev + 1
                    console.log(`[FRONTEND] Completed count updated: ${newCompletedCount}`)
                    return newCompletedCount
                  })
                  setActivePrompts(prev => {
                    const newMap = new Map(prev)
                    newMap.delete(data.id)
                    return newMap
                  })
                  const prompt = userInputs.find(u => u.id === data.id)?.prompt || "Unknown"
                  addMessage(`✅ 画像生成完了 [${data.id.substring(0, 8)}...]: ${prompt.substring(0, 30)}...`)
                  
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
                const finalStats = realtimeStats
                
                // 完了したアイテムの数を正確にカウント
                const completedItems = userInputs.filter(input => input.status === 'completed').length
                const errorItems = userInputs.filter(input => input.status === 'error').length
                
                addMessage(`🎉 処理完了: ${completedItems}件成功, ${errorItems}件エラー (総時間: ${Math.round(finalStats.elapsedTime)}秒, 平均: ${finalStats.averageTimePerImage.toFixed(1)}秒/枚)`)
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
      addMessage(`📦 ${completedImages.length}枚の画像をZIPファイルにまとめています...`)
      const result = await downloadImagesAsZip(
        completedImages, 
        masterPrompt,
        (current, total) => {
          setDownloadProgress({ current, total })
          if (current % 10 === 0 || current === total) {
            addMessage(`📥 ダウンロード進捗: ${current}/${total}枚`)
          }
        }
      )
      setDownloadProgress(null)
      
      if (result.errorCount > 0) {
        addMessage(`⚠️ ${result.successCount}枚の画像をダウンロード完了（${result.errorCount}枚失敗）`)
      } else {
        addMessage(`✅ ${result.successCount}枚の画像をダウンロードしました`)
      }
    } catch (error) {
      setDownloadProgress(null)
      addMessage("❌ 画像のダウンロードに失敗しました")
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
          {/* Generate Button at the top */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || userInputs.filter(u => u.prompt.trim() !== "").length === 0}
                size="lg"
                className="min-w-[150px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    生成中... ({completedCount}/{userInputs.filter(u => u.prompt.trim() !== "").length})
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5 mr-2" />
                    生成 ({userInputs.filter(u => u.prompt.trim() !== "").length}枚)
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowCSVImporter(true)}
                title="CSVインポート"
                size="sm"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                CSVインポート
              </Button>
              
              {completedCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleDownloadAll}
                  disabled={downloadProgress !== null}
                  title="全画像をダウンロード"
                  size="sm"
                >
                  {downloadProgress ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ダウンロード中 ({downloadProgress.current}/{downloadProgress.total})
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      一括DL ({completedCount}枚)
                    </>
                  )}
                </Button>
              )}
            </div>
            
            <Button variant="outline" size="icon" onClick={addUserInput} title="インプット追加">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

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
            <div className="space-y-4">
              {/* リアルタイム統計 */}
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
                  <h3 className="font-semibold">リアルタイム処理状況</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">経過時間</p>
                    <p className="font-mono font-semibold">{Math.floor(realtimeStats.elapsedTime / 60)}:{String(Math.floor(realtimeStats.elapsedTime % 60)).padStart(2, '0')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">平均生成時間</p>
                    <p className="font-mono font-semibold">{realtimeStats.averageTimePerImage.toFixed(1)}秒/枚</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">推定残り時間</p>
                    <p className="font-mono font-semibold">{Math.floor(realtimeStats.estimatedTimeRemaining / 60)}:{String(Math.floor(realtimeStats.estimatedTimeRemaining % 60)).padStart(2, '0')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">処理速度</p>
                    <p className="font-mono font-semibold">{realtimeStats.imagesPerSecond.toFixed(2)}枚/秒</p>
                  </div>
                </div>
                
                {/* パフォーマンスメトリクス */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-3 pt-3 border-t">
                  <div>
                    <p className="text-muted-foreground">現在の並列数</p>
                    <p className="font-mono font-semibold flex items-center gap-1">
                      {realtimeStats.currentConcurrency}
                      {dynamicConcurrency && <Badge variant="secondary" className="text-xs">自動</Badge>}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">エラー率</p>
                    <p className={`font-mono font-semibold ${realtimeStats.errorRate > 20 ? 'text-red-500' : realtimeStats.errorRate > 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {realtimeStats.errorRate.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">モード</p>
                    <p className="font-mono font-semibold capitalize">{performanceMode}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">調整回数</p>
                    <p className="font-mono font-semibold">{realtimeStats.adjustmentHistory.length}回</p>
                  </div>
                </div>
                
                {/* 進捗バー */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>進捗: {completedCount + errorCount} / {userInputs.filter((input) => input.prompt.trim() !== "").length}</span>
                    <span className="font-semibold">{Math.round(progressValue)}%</span>
                  </div>
                  <Progress value={progressValue} className="h-3" />
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600">✓ 完了: {completedCount}</span>
                    <span className="text-yellow-600">⚡ 処理中: {processingCount}</span>
                    {errorCount > 0 && <span className="text-red-600">✗ エラー: {errorCount}</span>}
                  </div>
                </div>
                
                {/* アクティブなプロンプト */}
                {activePrompts.size > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-1">現在処理中のプロンプト:</p>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {Array.from(activePrompts.entries()).map(([id, prompt]) => (
                        <div key={id} className="flex items-center gap-2 text-xs">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span className="truncate">{prompt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
            <div className="font-medium">ユーザーインプット</div>
            <div className="font-medium">プレビュー</div>
          </div>

          {userInputs.map((input) => (
            <UserInputItem key={input.id} input={input} />
          ))}

          {/* バッチ追加コントロール */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="batch-count">バッチ数:</Label>
              <Input
                id="batch-count"
                type="number"
                min="1"
                max="100"
                value={batchCount}
                onChange={(e) => setBatchCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-20"
              />
            </div>
            <Button 
              variant="outline" 
              onClick={handleBatchAdd}
              disabled={isPreparingBatch}
            >
              {isPreparingBatch ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Zap className="h-4 w-4 mr-2" />
              )}
              {batchCount}個のプロンプトを追加
            </Button>
            <Badge variant="secondary">
              現在のプロンプト数: {userInputs.length}
            </Badge>
          </div>
          
          {/* 開発環境用: 強制フォールバックボタン */}
          {process.env.NODE_ENV === 'development' && currentSessionIdForFallback && (
            <div className="flex justify-end pt-4">
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
            </div>
          )}
        </div>
      </CardContent>
      
      {/* CSV Importer Dialog */}
      <CSVImporter 
        open={showCSVImporter}
        onClose={() => setShowCSVImporter(false)}
        onImport={handleCSVImport}
      />
    </Card>
  )
}
