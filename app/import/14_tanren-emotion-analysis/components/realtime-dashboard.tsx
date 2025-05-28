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
import { useSessionContext } from "@/contexts/session-context"
import { useRouter } from "next/navigation"

export default function RealtimeDashboard() {
  const router = useRouter()
  const { setCurrentSession: setGlobalSession } = useSessionContext()
  
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null)
  const [currentFaceMetrics, setCurrentFaceMetrics] = useState<FaceMetrics | null>(null)
  const [sentimentHistory, setSentimentHistory] = useState<any[]>([])
  const [faceLandmarks, setFaceLandmarks] = useState<any[] | null>(null)
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
    stream
  })
  
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
    }
  }, [latestEmotions, isRecording, facialExpression, insights, addEmotionData])
  
  // 文字起こしをセッションに記録
  useEffect(() => {
    if (transcript && isRecording) {
      updateTranscript(transcript)
    }
  }, [transcript, isRecording, updateTranscript])

  // 録画タイマーとデータ更新
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
        
        // リアルタイムの感情データがある場合は使用、なければモックデータを使用
        if (latestEmotions) {
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
          
          // センチメント計算
          const positive = (latestEmotions.joy + latestEmotions.confidence + latestEmotions.interest) / 3
          const negative = (latestEmotions.anger + latestEmotions.sadness + latestEmotions.fear) / 3
          const neutral = 100 - positive - negative
          
          setSentimentHistory((prev) => {
            const newHistory = [...prev, {
              time: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`,
              ポジティブ: positive,
              ネガティブ: negative,
              ニュートラル: Math.max(0, neutral),
            }]
            return newHistory.slice(-5)
          })
        } else {
          // フォールバック：モックデータを使用
          const emotion = generateEmotionData(recordingTime)
          const sentiment = generateSentimentData(emotion)
          setCurrentEmotion(emotion)
          
          setSentimentHistory((prev) => {
            const newHistory = [...prev, {
              time: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`,
              ポジティブ: sentiment.positive,
              ネガティブ: sentiment.negative,
              ニュートラル: sentiment.neutral,
            }]
            return newHistory.slice(-5)
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
    console.log("開始ボタンがクリックされました")
    setSessionEnded(false)
    resetEmotions()
    resetSession()
    
    try {
      // ストリームを開始して返されたストリームを使用
      const mediaStream = await startStream()
      
      if (mediaStream) {
        console.log("ストリームが確立されました", mediaStream)
        
        // セッション記録を開始
        startSessionRecording(mediaStream)
        
        // 音声認識を開始
        startListening()
        
        // 録画状態を設定
        setIsRecording(true)
        setRecordingTime(0)
        setSentimentHistory([])
        
        console.log("録画を開始しました")
      } else {
        console.error("ストリームの確立に失敗しました")
        alert("カメラとマイクの接続に失敗しました。もう一度お試しください。")
      }
    } catch (error) {
      console.error("録画開始エラー:", error)
      alert("録画の開始に失敗しました。カメラとマイクの権限を確認してください。")
    }
  }

  const handleStopRecording = async () => {
    console.log("ストップボタンがクリックされました")
    
    // 録画を停止
    setIsRecording(false)
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
      console.log('現在のセッションデータ:', {
        id: currentSession.id,
        duration: currentSession.duration,
        emotionsCount: currentSession.emotions.length,
        transcriptLength: currentSession.transcript.length,
        hasVideo: !!currentSession.videoBlob
      })
      
      const result = await saveSession()
      if (result.success) {
        console.log('セッションが正常に保存されました:', result.sessionId)
        // グローバルコンテキストにセッションを設定
        setGlobalSession(currentSession)
      } else {
        console.error('セッションの保存に失敗しました:', result.error)
        alert(`セッションの保存に失敗しました: ${result.error}`)
      }
    } else {
      console.error('保存するセッションデータがありません')
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
              {facialExpression && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">表情：</span>
                    {facialExpression}
                  </p>
                </div>
              )}
              {insights && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">インサイト：</span>
                    {insights}
                  </p>
                </div>
              )}
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
              <EmotionTrendChart data={isRecording ? sentimentHistory : []} />
            </CardContent>
          </Card>
        </div>

        {/* 中央: ビデオ操作パネル */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              {/* ビデオストリーム表示 */}
              <div className="mb-4">
                <VideoStream 
                  stream={stream} 
                  error={mediaError} 
                  isLoading={mediaLoading} 
                />
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

              <div className="flex justify-center space-x-4">
                {!isRecording && !sessionEnded ? (
                  <Button 
                    onClick={handleStartRecording} 
                    className="bg-blue-500 hover:bg-blue-600"
                    disabled={mediaLoading}
                    aria-label="録画を開始"
                    aria-live="polite"
                  >
                    <Mic className="w-4 h-4 mr-2" aria-hidden="true" />
                    開始
                  </Button>
                ) : isRecording ? (
                  <Button 
                    onClick={handleStopRecording} 
                    variant="destructive"
                    aria-label="録画を停止"
                    aria-live="polite"
                  >
                    <Square className="w-4 h-4 mr-2" aria-hidden="true" />
                    ストップ
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleStartRecording} 
                      className="bg-blue-500 hover:bg-blue-600"
                      aria-label="新しいセッションを開始"
                    >
                      <Mic className="w-4 h-4 mr-2" aria-hidden="true" />
                      新しいセッション
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handlePlayback}
                      disabled={!currentSession?.videoBlob}
                      aria-label="録画を再生"
                    >
                      <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                      再生
                    </Button>
                    <Button 
                      variant="default"
                      onClick={handleShowReport}
                      disabled={!currentSession || isProcessingAnalysis}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      {isProcessingAnalysis ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          分析中...
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          分析処理を開始
                        </>
                      )}
                    </Button>
                    {currentSession?.videoBlob && (
                      <Button 
                        variant="outline"
                        onClick={downloadVideo}
                        size="icon"
                        title="動画をダウンロード"
                      >
                        <Download className="w-4 h-4" />
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
              <FaceMapVisualization isActive={isRecording} landmarks={faceLandmarks} />
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
