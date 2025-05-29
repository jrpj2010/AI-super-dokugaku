"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Mic, Square, Play, FileText, Download } from "lucide-react"
import EmotionRadarChart from "@/components/emotion-radar-chart"
import EmotionTrendChart from "@/components/emotion-trend-chart"
import FaceMetricsGauge from "@/components/face-metrics-gauge"
import FaceMapVisualization from "@/components/face-map-visualization"
import AudioVisualizer from "@/components/audio-visualizer"
import VideoStream from "@/components/video-stream"
import TranscriptArea from "@/components/transcript-area"
import VideoPlaybackModal from "@/components/video-playback-modal"
import { generateEmotionData, generateSentimentData, generateFaceMetrics, EmotionData, FaceMetrics } from "@/lib/mock-data"
import { useMediaStream } from "@/hooks/use-media-stream"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { useVideoFrameCapture } from "@/hooks/use-video-frame-capture"
import { useEmotionAnalysis } from "@/hooks/use-emotion-analysis"
import { useSessionRecording } from "@/hooks/use-session-recording"
import { useFaceDetection } from "@/hooks/use-face-detection"
import { useSimpleFaceDetection } from "@/hooks/use-simple-face-detection"
import { useSessionContext } from "@/contexts/session-context"
import { useRouter } from "next/navigation"
import { getMediaErrorMessage, getRecordingErrorMessage } from "@/lib/error-messages"
import { translateEmotionText } from "@/lib/translation"

interface RealtimeDashboardProps {
  onAnalysisComplete?: (data: any) => void
}

export default function RealtimeDashboard({ onAnalysisComplete }: RealtimeDashboardProps = {}) {
  const router = useRouter()
  const { setCurrentSession: setGlobalSession } = useSessionContext()
  
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null)
  const [currentFaceMetrics, setCurrentFaceMetrics] = useState<FaceMetrics | null>(null)
  const [sentimentHistory, setSentimentHistory] = useState<any[]>([])
  const [sessionEnded, setSessionEnded] = useState(false)
  const [showPlaybackModal, setShowPlaybackModal] = useState(false)
  const [isProcessingAnalysis, setIsProcessingAnalysis] = useState(false)
  
  // カメラ・マイクのストリーム管理
  const { stream, error: mediaError, isLoading: mediaLoading, startStream, stopStream } = useMediaStream()
  
  // 音声認識
  const { 
    transcript, 
    interimTranscript, 
    isListening, 
    error: speechError, 
    startListening, 
    stopListening 
  } = useSpeechRecognition()
  
  // ビデオフレームキャプチャ（最適化された設定を使用）
  const { latestFrame, isCapturing } = useVideoFrameCapture({
    stream,
    enabled: isRecording
  })
  
  // 顔検出
  const { 
    landmarks: mediaLandmarks, 
    isLoading: faceDetectionLoading, 
    error: faceDetectionError,
    isDetecting: mediaDetecting
  } = useFaceDetection({
    stream,
    enabled: isRecording
  })
  
  // MediaPipeが失敗した場合のフォールバック
  const {
    landmarks: simpleLandmarks,
    isDetecting: simpleDetecting
  } = useSimpleFaceDetection({
    stream,
    enabled: isRecording && !mediaLandmarks
  })
  
  // どちらかのランドマークを使用
  const landmarks = mediaLandmarks || simpleLandmarks
  const isDetecting = mediaDetecting || simpleDetecting
  
  // デバッグ: landmarks状態を監視
  useEffect(() => {
    if (faceDetectionError) {
      console.error('[RealtimeDashboard] フェイス検出エラー:', faceDetectionError);
    }
    if (isDetecting && process.env.NODE_ENV === 'development') {
      console.log('[RealtimeDashboard] フェイス検出実行中, landmarks:', landmarks ? '検出' : '未検出');
    }
  }, [landmarks, isDetecting, faceDetectionError]);
  
  // 感情分析（最適化された設定を使用）
  const {
    latestEmotions,
    emotionHistory,
    insights,
    facialExpression,
    isAnalyzing,
    error: emotionError,
    queueFrameForAnalysis,
    reset: resetEmotions
  } = useEmotionAnalysis({
    enableAnalysis: isRecording
  })
  
  // セッション記録
  const {
    isRecording: isSessionRecording,
    recordingDuration,
    currentSession,
    startRecording: startSessionRecording,
    stopRecording: stopSessionRecording,
    addEmotionData,
    updateTranscript,
    getVideoUrl,
    downloadVideo,
    exportSessionData,
    resetSession,
    saveSession,
    loadSessions
  } = useSessionRecording({
    maxDuration: 60 // 60秒まで
  })

  // フレームをキューに追加
  useEffect(() => {
    if (latestFrame && isRecording) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[RealtimeDashboard] フレームをキューに追加:', { 
          hasFrame: !!latestFrame, 
          isRecording,
          timestamp: latestFrame?.timestamp 
        })
      }
      queueFrameForAnalysis(latestFrame)
    }
  }, [latestFrame, isRecording, queueFrameForAnalysis])

  // 感情データをセッションに記録
  useEffect(() => {
    if (latestEmotions && isRecording && facialExpression && insights) {
      addEmotionData({
        timestamp: Date.now(),
        emotions: latestEmotions,
        facialExpression,
        insight: insights
      })
      
      // 感情データが更新されたときにセンチメントも更新
      if (process.env.NODE_ENV === 'development') {
        console.log('[RealtimeDashboard] 感情データ詳細:', latestEmotions);
      }
      
      // APIが返す感情に基づいて分類
      const positiveEmotions = ['joy', 'confidence', 'interest', 'surprise']; // surpriseは文脈によってポジティブ
      const negativeEmotions = ['anger', 'sadness', 'fear', 'confusion'];
      
      let positiveSum = 0;
      let negativeSum = 0;
      let totalSum = 0;
      
      // 各感情の値を集計
      Object.entries(latestEmotions).forEach(([emotion, value]) => {
        if (typeof value === 'number') {
          totalSum += value;
          if (positiveEmotions.includes(emotion)) {
            positiveSum += value;
          } else if (negativeEmotions.includes(emotion)) {
            negativeSum += value;
          }
        }
      });
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[RealtimeDashboard] 感情集計:', { positiveSum, negativeSum, totalSum });
      }
      
      // パーセンテージを計算
      const positive = totalSum > 0 ? Math.round((positiveSum / totalSum) * 100) : 0;
      const negative = totalSum > 0 ? Math.round((negativeSum / totalSum) * 100) : 0;
      const neutral = Math.max(0, 100 - positive - negative)
      
      setSentimentHistory((prev) => {
        const currentTime = recordingTime || 0
        const newDataPoint = {
          time: `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, "0")}`,
          ポジティブ: positive,
          ネガティブ: negative,
          ニュートラル: Math.max(0, neutral),
        }
        
        console.log('[RealtimeDashboard] 感情データ更新時のセンチメント:', newDataPoint)
        
        // 同じ時刻のデータがある場合は置き換え、なければ追加
        const existingIndex = prev.findIndex(item => item.time === newDataPoint.time)
        if (existingIndex >= 0) {
          const newHistory = [...prev]
          newHistory[existingIndex] = newDataPoint
          return newHistory
        } else {
          return [...prev, newDataPoint].slice(-10)
        }
      })
    }
  }, [latestEmotions, isRecording, facialExpression, insights, addEmotionData, recordingTime])
  
  // 文字起こしをセッションに記録
  useEffect(() => {
    if (transcript && isRecording) {
      updateTranscript(transcript)
    }
  }, [transcript, isRecording, updateTranscript])

  // 録画タイマーとデータ更新
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[RealtimeDashboard] 録画状態:', { isRecording, latestEmotions, sentimentHistory })
    }
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
        
        // リアルタイムの感情データがある場合は使用、なければモックデータを使用
        const hasEmotionData = latestEmotions && Object.values(latestEmotions).some(v => v > 0)
        
        if (hasEmotionData) {
          const emotionData: EmotionData = {
            joy: latestEmotions.joy,
            sadness: latestEmotions.sadness,
            anger: latestEmotions.anger,
            surprise: latestEmotions.surprise,
            fear: latestEmotions.fear,
            trust: latestEmotions.confidence,
            anticipation: latestEmotions.interest,
            disgust: 100 - latestEmotions.interest // プレースホルダー
          }
          setCurrentEmotion(emotionData)
          
          // センチメント計算（改善版：より敏感な反応）
          // ポジティブ感情に重み付け（joy=1.2, confidence=1.0, interest=0.8, surprise=0.6）
          const positiveSum = (latestEmotions.joy * 1.2) + 
                            (latestEmotions.confidence * 1.0) + 
                            (latestEmotions.interest * 0.8) + 
                            (latestEmotions.surprise * 0.6);
          
          // ネガティブ感情に重み付け（anger=1.2, sadness=1.2, fear=1.0, confusion=0.6）
          const negativeSum = (latestEmotions.anger * 1.2) + 
                            (latestEmotions.sadness * 1.2) + 
                            (latestEmotions.fear * 1.0) + 
                            (latestEmotions.confusion * 0.6);
          
          // 最大可能値で正規化（各感情の最大値100 × 重み）
          const maxPositive = 100 * (1.2 + 1.0 + 0.8 + 0.6);
          const maxNegative = 100 * (1.2 + 1.2 + 1.0 + 0.6);
          
          // パーセンテージに変換（感度を上げるために平方根を使用）
          let positive = Math.round(Math.sqrt(positiveSum / maxPositive) * 100);
          let negative = Math.round(Math.sqrt(negativeSum / maxNegative) * 100);
          
          // 正規化して合計が100%になるように調整
          const total = positive + negative;
          if (total > 100) {
            positive = Math.round((positive / total) * 100);
            negative = Math.round((negative / total) * 100);
          }
          
          let neutral = Math.max(0, 100 - positive - negative);
          
          if (process.env.NODE_ENV === 'development') {
            console.log('[RealtimeDashboard] センチメント計算:', { 
              latestEmotions,
              positiveSum, 
              negativeSum, 
              totalSum, 
              positive, 
              negative, 
              neutral 
            })
          }
          
          setSentimentHistory((prev) => {
            const newDataPoint = {
              time: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`,
              ポジティブ: positive,
              ネガティブ: negative,
              ニュートラル: Math.max(0, neutral),
            }
            
            if (process.env.NODE_ENV === 'development') {
              console.log('[RealtimeDashboard] 新しいセンチメントデータ:', newDataPoint)
            }
            
            const newHistory = [...prev, newDataPoint]
            // 最新の10データポイントを保持
            return newHistory.slice(-10)
          })
        } else {
          // フォールバック：モックデータを使用（グラフ表示確認用）
          const emotion = generateEmotionData(recordingTime)
          const sentiment = generateSentimentData(emotion)
          setCurrentEmotion(emotion)
          
          // グラフ描画確認用のデモデータ
          const demoPositive = 30 + Math.sin(recordingTime / 5) * 20 + Math.random() * 10
          const demoNegative = 20 + Math.cos(recordingTime / 7) * 15 + Math.random() * 10
          const demoNeutral = 100 - demoPositive - demoNegative
          
          setSentimentHistory((prev) => {
            const newDataPoint = {
              time: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`,
              ポジティブ: Math.max(0, Math.min(100, Math.round(demoPositive))),
              ネガティブ: Math.max(0, Math.min(100, Math.round(demoNegative))),
              ニュートラル: Math.max(0, Math.min(100, Math.round(demoNeutral))),
            }
            
            if (process.env.NODE_ENV === 'development') {
              console.log('[RealtimeDashboard] 新しいモックセンチメントデータ:', newDataPoint)
            }
            
            const newHistory = [...prev, newDataPoint]
            return newHistory.slice(-10)
          })
        }
        
        // 顔認識メトリクス（現在はモックデータ）
        const faceMetrics = generateFaceMetrics(recordingTime)
        setCurrentFaceMetrics(faceMetrics)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, recordingTime, latestEmotions])

  const handleStartRecording = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log("開始ボタンがクリックされました")
    }
    setSessionEnded(false)
    resetEmotions()
    resetSession()
    setIsRecording(false) // 確実にfalseに設定
    
    try {
      // ストリームを開始して返されたストリームを使用
      const mediaStream = await startStream()
      
      if (mediaStream) {
        if (process.env.NODE_ENV === 'development') {
          console.log("ストリームが確立されました", mediaStream)
        }
        
        try {
          // セッション記録を開始
          startSessionRecording(mediaStream)
          
          // 音声認識を開始
          startListening()
          
          // 録画状態を設定（すべての初期化が成功した後）
          setIsRecording(true)
          setRecordingTime(0)
          setSentimentHistory([])
          
          if (process.env.NODE_ENV === 'development') {
            console.log("録画を開始しました")
          }
        } catch (recordingError) {
          console.error("録画の初期化エラー:", recordingError)
          // ストリームを停止
          stopStream()
          
          // エラーメッセージを表示
          if (recordingError instanceof Error) {
            alert(getRecordingErrorMessage(recordingError))
          } else {
            alert('録画の開始に失敗しました。ブラウザの設定を確認してください。')
          }
          
          // 状態をリセット
          setIsRecording(false)
        }
      } else {
        console.error("ストリームの確立に失敗しました")
        
        // mediaErrorの内容に基づいて詳細なメッセージを表示
        if (mediaError) {
          alert(getMediaErrorMessage(mediaError.type, mediaError.message))
        } else {
          alert("カメラとマイクの接続に失敗しました。デバイスの接続とブラウザの権限を確認してください。")
        }
      }
    } catch (error) {
      console.error("録画開始エラー:", error)
      if (error instanceof Error) {
        alert(getRecordingErrorMessage(error))
      } else {
        alert('録画の開始中にエラーが発生しました。カメラとマイクの権限を確認し、もう一度お試しください。')
      }
      setIsRecording(false)
    }
  }

  const handleStopRecording = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log("ストップボタンがクリックされました")
    }
    
    // 二重クリック防止
    if (!isRecording) {
      if (process.env.NODE_ENV === 'development') {
        console.log("既に停止処理中です")
      }
      return
    }
    
    try {
      // 即座に録画状態をfalseに設定（UIの即座更新）
      setIsRecording(false)
      
      // 各種停止処理
      stopListening()
      stopSessionRecording()
      
      // ストリームを停止する前に少し待つ（録画データの確定のため）
      await new Promise(resolve => setTimeout(resolve, 500))
      
      stopStream()
      setSessionEnded(true)
      
      // セッションデータが確定するまで少し待つ
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // セッションデータを自動保存
      if (currentSession) {
        if (process.env.NODE_ENV === 'development') {
          console.log('現在のセッションデータ:', {
            id: currentSession.id,
            duration: currentSession.duration,
            emotionsCount: currentSession.emotions.length,
            transcriptLength: currentSession.transcript.length,
            hasVideo: !!currentSession.videoBlob
          })
        }
        
        const result = await saveSession()
        if (result.success) {
          if (process.env.NODE_ENV === 'development') {
            console.log('セッションが正常に保存されました:', result.sessionId)
          }
          // グローバルコンテキストにセッションを設定
          setGlobalSession(currentSession)
          
          // 分析完了コールバックを実行
          if (onAnalysisComplete) {
            if (process.env.NODE_ENV === 'development') {
              console.log('[RealtimeDashboard] 分析完了、レポート画面へ遷移します')
            }
            setTimeout(() => {
              onAnalysisComplete(currentSession)
            }, 1000)
          } else {
            // コールバックがない場合は従来の動作
            if (process.env.NODE_ENV === 'development') {
              console.log('[RealtimeDashboard] 3秒後にレポート画面に自動遷移します')
            }
          }
          setTimeout(() => {
            router.push('/?tab=report')
          }, 3000)
        } else {
          console.error('セッションの保存に失敗しました:', result.error)
          alert(`セッションの保存に失敗しました: ${result.error}`)
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.error('保存するセッションデータがありません')
        }
      }
    } catch (error) {
      console.error('録画停止中にエラーが発生しました:', error)
      // エラーが発生しても状態は確実にリセット
      setIsRecording(false)
      stopStream()
      setSessionEnded(true)
      
      const errorMessage = error instanceof Error ? error.message : "不明なエラー"
      alert(`録画の停止中にエラーが発生しました: ${errorMessage}`)
    }
  }
  
  const handlePlayback = () => {
    const videoUrl = getVideoUrl()
    if (videoUrl && currentSession) {
      setShowPlaybackModal(true)
    }
  }
  
  const handleShowReport = async () => {
    if (currentSession) {
      setIsProcessingAnalysis(true)
      
      // 分析処理のシミュレーション（実際の処理がある場合はここに追加）
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // グローバルコンテキストにセッションを設定
      setGlobalSession(currentSession)
      
      setIsProcessingAnalysis(false)
      
      // レポート画面に自動遷移
      if (onAnalysisComplete) {
        console.log('[RealtimeDashboard] 分析完了、レポート画面へ遷移')
        onAnalysisComplete(currentSession)
      }
      
      // レポート画面に遷移
      router.push('/?tab=report')
    }
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー指示エリア */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">今日の調子はいかがですか？</h2>
        <p className="text-lg text-gray-600">1分ほどお話をしてください</p>
      </div>

      {/* メインコンテンツグリッド */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側: 感情分析パネル */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Emotion Tracker
                {isAnalyzing && (
                  <span className="ml-2 inline-flex items-center text-xs text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-1"></div>
                    分析中
                  </span>
                )}
              </CardTitle>
              <h3 className="text-lg font-semibold">感情の変化</h3>
            </CardHeader>
            <CardContent>
              <EmotionRadarChart data={isRecording ? currentEmotion : null} />
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">表情：</span>
                  {isRecording ? (facialExpression || '分析中...') : 'セッション開始後に表示されます'}
                </p>
              </div>
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <span className="font-medium">インサイト：</span>
                  {isRecording ? (insights || '分析中...') : 'セッション開始後に表示されます'}
                </p>
              </div>
              {emotionError && (
                <div className="mt-2 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">
                    エラー: {emotionError}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">感情の変化をリアルタイムに推定</CardTitle>
            </CardHeader>
            <CardContent>
              <EmotionTrendChart data={sentimentHistory} />
            </CardContent>
          </Card>
        </div>

        {/* 中央: ビデオ操作パネル */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              {/* ビデオストリーム表示 */}
              <div className="mb-4 relative">
                <VideoStream 
                  stream={stream} 
                  error={mediaError} 
                  isLoading={mediaLoading} 
                />
                {/* エラーメッセージの表示 */}
                {mediaError && !isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="bg-white p-4 rounded-lg max-w-sm text-center">
                      <p className="text-red-600 font-medium mb-2">
                        {mediaError.type === 'permission' && "📷 カメラとマイクの許可が必要です"}
                        {mediaError.type === 'notFound' && "🔌 デバイスが見つかりません"}
                        {mediaError.type === 'other' && "⚠️ エラーが発生しました"}
                      </p>
                      <p className="text-sm text-gray-600">{mediaError.message}</p>
                    </div>
                  </div>
                )}
                {isRecording && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-black/50 rounded-lg p-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm">録画中</span>
                        <span className="text-white text-sm">
                          {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                      <Progress value={(recordingDuration / 60) * 100} className="h-1" max={100} />
                    </div>
                  </div>
                )}
              </div>

              {/* 音声ビジュアライザー */}
              <div className="mb-4">
                <AudioVisualizer isActive={isRecording} stream={stream} />
              </div>

              <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap relative z-10">
                {!isRecording && !sessionEnded ? (
                  <Button 
                    onClick={handleStartRecording} 
                    className="bg-blue-500 hover:bg-blue-600"
                    disabled={mediaLoading}
                    aria-label="録画を開始"
                    aria-live="polite"
                  >
                    {mediaLoading ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        準備中...
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" aria-hidden="true" />
                        開始
                      </>
                    )}
                  </Button>
                ) : isRecording ? (
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      handleStopRecording()
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation()
                    }}
                    variant="destructive"
                    aria-label="録画を停止"
                    aria-live="polite"
                    className="relative z-[9999] pointer-events-auto hover:bg-red-600 active:bg-red-700 transition-colors cursor-pointer"
                    style={{ position: 'relative', zIndex: 9999, pointerEvents: 'auto', cursor: 'pointer' }}
                  >
                    <Square className="w-4 h-4 mr-2" aria-hidden="true" />
                    ストップ
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleStartRecording} 
                      className="bg-blue-500 hover:bg-blue-600 text-sm md:text-base"
                      aria-label="新しいセッションを開始"
                    >
                      <Mic className="w-4 h-4 mr-1 md:mr-2" aria-hidden="true" />
                      <span className="hidden sm:inline">新しい</span>セッション
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handlePlayback}
                      disabled={!currentSession?.videoBlob}
                      aria-label="録画を再生"
                      className="text-sm md:text-base"
                    >
                      <Play className="w-4 h-4 mr-1 md:mr-2" aria-hidden="true" />
                      再生
                    </Button>
                    <Button 
                      variant="default"
                      onClick={handleShowReport}
                      disabled={!currentSession || isProcessingAnalysis}
                      className="bg-green-500 hover:bg-green-600 text-sm md:text-base"
                    >
                      {isProcessingAnalysis ? (
                        <>
                          <div className="w-4 h-4 mr-1 md:mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          分析中...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-1 md:mr-2" />
                          <span className="hidden sm:inline">分析処理を</span>開始
                        </>
                      )}
                    </Button>
                    {currentSession?.videoBlob && (
                      <Button 
                        variant="outline"
                        onClick={downloadVideo}
                        title="動画をダウンロード"
                        className="text-sm md:text-base"
                      >
                        <Download className="w-4 h-4 mr-1 md:mr-2" />
                        <span className="hidden md:inline">録画データ(MP4)を</span>ダウンロード
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右側: 行動メトリクスパネル */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Sight/Face movement</CardTitle>
              <h3 className="text-lg font-semibold">視線 / 顔の動き</h3>
            </CardHeader>
            <CardContent>
              <FaceMetricsGauge data={isRecording ? currentFaceMetrics : null} />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Landmark</CardTitle>
              <h3 className="text-lg font-semibold">フェイスマップ</h3>
            </CardHeader>
            <CardContent>
              <FaceMapVisualization isActive={isRecording} landmarks={landmarks} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* フッター: 文字起こしエリア */}
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">発話内容</CardTitle>
        </CardHeader>
        <CardContent>
          <TranscriptArea
            transcript={transcript}
            interimTranscript={interimTranscript}
            isListening={isListening}
            error={speechError}
          />
        </CardContent>
      </Card>
      
      {/* ビデオ再生モーダル */}
      <VideoPlaybackModal
        isOpen={showPlaybackModal}
        onClose={() => setShowPlaybackModal(false)}
        videoUrl={getVideoUrl()}
        sessionData={currentSession}
      />
    </div>
  )
}
