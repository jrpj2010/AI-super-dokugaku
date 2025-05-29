"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ConversationStatusRadar from "@/components/conversation-status-radar"
import FaceMetricsGauge from "@/components/face-metrics-gauge"
import EmotionChangeChart from "@/components/emotion-change-chart"
import SentimentTrendChart from "@/components/sentiment-trend-chart"
import { ExportButtons } from "@/components/export-buttons"
import { useSessionContext } from "@/contexts/session-context"
import { useSessionRecording } from "@/hooks/use-session-recording"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface AnalysisReportProps {
  sessionData?: any
}

// Export named version for tests
export function AnalysisReport({ sessionData }: AnalysisReportProps = {}) {
  const { currentSession: contextSession } = useSessionContext()
  const { isRecording } = useSessionRecording()
  
  // sessionDataがpropsで渡された場合はそれを使用、そうでなければcontextから取得
  const currentSession = sessionData || contextSession

  if (isRecording) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <div className="text-2xl font-semibold mb-2">録画中...</div>
          <p className="text-muted-foreground">録画を停止すると分析レポートが表示されます</p>
        </CardContent>
      </Card>
    )
  }

  if (!currentSession || !currentSession.emotions || currentSession.emotions.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <div className="text-2xl font-semibold mb-2">セッションデータがありません</div>
          <p className="text-muted-foreground">録画を開始して分析レポートを生成してください</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate statistics
  const emotionStats = calculateEmotionStatistics(currentSession.emotions)
  const emotionPeaks = calculateEmotionPeaks(currentSession.emotions)
  const chartData = prepareChartData(currentSession.emotions)
  const recommendation = generateRecommendation(emotionStats)

  // Format duration
  const durationMinutes = Math.floor(currentSession.duration / 60)
  const durationSeconds = currentSession.duration % 60
  const formattedDuration = `${durationMinutes}分${durationSeconds}秒`

  // Format date and time
  const sessionDate = format(currentSession.startTime, 'yyyy年M月d日 HH:mm', { locale: ja })

  return (
    <div id="analysis-report" className="space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{sessionDate} のあなたの状態</h2>
          <p className="text-sm text-muted-foreground">録画時間: {formattedDuration}</p>
        </div>
        <div className="absolute top-0 right-0">
          <ExportButtons />
        </div>
      </div>

      {/* Session Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>セッション情報</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">セッションID:</p>
            <p className="font-medium">{currentSession.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">時間:</p>
            <p className="font-medium">{formattedDuration}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">日付:</p>
            <p className="font-medium">
              {format(currentSession.startTime, 'yyyy年M月d日', { locale: ja })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emotion Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>感情統計</CardTitle>
          <CardDescription>セッション全体の平均感情スコア</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(emotionStats).map(([emotion, value]) => (
              <div key={emotion} className="flex justify-between items-center">
                <span className="text-sm">{getEmotionLabel(emotion)}</span>
                <Badge variant="secondary">{Math.round(value)}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emotion Peaks */}
      <Card>
        <CardHeader>
          <CardTitle>感情のピーク</CardTitle>
          <CardDescription>セッション中の最高値</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>最高の喜び</span>
              <Badge>{emotionPeaks.joy}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>最高の自信</span>
              <Badge>{emotionPeaks.confidence}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>最高の興味</span>
              <Badge>{emotionPeaks.interest}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emotion Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>感情の推移</CardTitle>
          <CardDescription>時間経過による感情の変化</CardDescription>
        </CardHeader>
        <CardContent>
          <div data-testid="emotion-trend-chart" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="joy" stroke="#10b981" name="喜び" />
                <Line type="monotone" dataKey="confidence" stroke="#3b82f6" name="自信" />
                <Line type="monotone" dataKey="interest" stroke="#f59e0b" name="興味" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card>
        <CardHeader>
          <CardTitle>セッション転写</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{currentSession.transcript}</p>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>主要な洞察</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {currentSession.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>感情タイムライン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentSession.emotions.map((emotion, index) => {
              const timeOffset = Math.floor((emotion.timestamp - currentSession.emotions[0].timestamp) / 1000)
              const minutes = Math.floor(timeOffset / 60)
              const seconds = timeOffset % 60
              const timeLabel = `${minutes}:${seconds.toString().padStart(2, '0')}`
              
              return (
                <div key={index} data-testid="timeline-item" className="flex gap-4 items-start">
                  <Badge variant="outline">{timeLabel}</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{emotion.facialExpression}</p>
                    <p className="text-xs text-muted-foreground">{emotion.insight}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>推奨事項</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{recommendation}</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions
function calculateEmotionStatistics(emotions: any[]) {
  if (emotions.length === 0) return {}
  
  const totals = emotions.reduce((acc, record) => {
    Object.entries(record.emotions).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + (value as number)
    })
    return acc
  }, {})

  const averages: Record<string, number> = {}
  Object.entries(totals).forEach(([key, total]) => {
    averages[key] = (total as number) / emotions.length
  })

  return averages
}

function calculateEmotionPeaks(emotions: any[]) {
  if (emotions.length === 0) return { joy: 0, confidence: 0, interest: 0 }
  
  const peaks = {
    joy: 0,
    confidence: 0,
    interest: 0
  }

  emotions.forEach(record => {
    peaks.joy = Math.max(peaks.joy, record.emotions.joy || 0)
    peaks.confidence = Math.max(peaks.confidence, record.emotions.confidence || 0)
    peaks.interest = Math.max(peaks.interest, record.emotions.interest || 0)
  })

  return peaks
}

function prepareChartData(emotions: any[]) {
  if (emotions.length === 0) return []
  
  const startTime = emotions[0].timestamp
  
  return emotions.map(record => {
    const timeOffset = Math.floor((record.timestamp - startTime) / 1000)
    const minutes = Math.floor(timeOffset / 60)
    const seconds = timeOffset % 60
    
    return {
      time: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      joy: record.emotions.joy,
      confidence: record.emotions.confidence,
      interest: record.emotions.interest
    }
  })
}

function getEmotionLabel(emotion: string): string {
  const labels: Record<string, string> = {
    joy: '喜び',
    anger: '怒り',
    sadness: '悲しみ',
    surprise: '驚き',
    fear: '恐れ',
    confidence: '自信',
    interest: '興味',
    confusion: '混乱'
  }
  return labels[emotion] || emotion
}

function generateRecommendation(stats: Record<string, number>): string {
  const avgConfidence = stats.confidence || 0
  const avgJoy = stats.joy || 0
  const avgInterest = stats.interest || 0

  if (avgConfidence > 80 && avgJoy > 80) {
    return '素晴らしいパフォーマンスです！高い自信と喜びが見られ、非常にポジティブな印象を与えています。この調子を維持してください。'
  } else if (avgConfidence < 50) {
    return '自信をもう少し高めることをお勧めします。姿勢を正し、ゆっくりとはっきりと話すことで、より説得力のあるプレゼンテーションになります。'
  } else if (avgInterest < 50) {
    return '聴衆の興味を引くために、より情熱的に話すことを心がけてください。具体例や個人的な経験を共有することで、より魅力的なプレゼンテーションになります。'
  } else {
    return '全体的に良いパフォーマンスです。感情表現のバランスを保ちながら、自信を持って話し続けることで、さらに効果的なコミュニケーションが可能になります。'
  }
}

// Original component for backward compatibility
function AnalysisReportPage() {
  const { currentSession } = useSessionContext()
  const [utterances, setUtterances] = useState<string[]>([])
  const [emotionData, setEmotionData] = useState<any[]>([])
  const [conversationMetrics, setConversationMetrics] = useState<any>(null)
  const [sentimentData, setSentimentData] = useState<any[]>([])

  useEffect(() => {
    if (currentSession) {
      // 文字起こしを文章単位で分割
      const sentences = currentSession.transcript
        .split(/[。！？\n]/)
        .filter(s => s.trim().length > 0)
        .map(s => s.trim() + '。')
      setUtterances(sentences.slice(0, 10)) // 最初の10文を表示

      // 感情データを時系列で整形
      if (currentSession.emotions.length > 0) {
        const formattedEmotions = currentSession.emotions.map((e, index) => ({
          time: `${Math.floor(index * 2 / 60)}:${((index * 2) % 60).toString().padStart(2, '0')}`,
          joy: e.emotions.joy,
          anger: e.emotions.anger,
          sadness: e.emotions.sadness,
          surprise: e.emotions.surprise,
          fear: e.emotions.fear,
          confidence: e.emotions.confidence,
          confusion: e.emotions.confusion,
          interest: e.emotions.interest
        }))
        setEmotionData(formattedEmotions)

        // 会話メトリクスを計算
        const avgEmotions = currentSession.emotions.reduce((acc, e) => {
          Object.keys(e.emotions).forEach(key => {
            acc[key] = (acc[key] || 0) + e.emotions[key as keyof typeof e.emotions]
          })
          return acc
        }, {} as any)

        Object.keys(avgEmotions).forEach(key => {
          avgEmotions[key] = Math.round(avgEmotions[key] / currentSession.emotions.length)
        })

        setConversationMetrics(avgEmotions)

        // センチメントデータを計算
        const sentiments = currentSession.emotions.map((e, index) => {
          const positive = (e.emotions.joy + e.emotions.confidence + e.emotions.interest) / 3
          const negative = (e.emotions.anger + e.emotions.sadness + e.emotions.fear) / 3
          const neutral = 100 - positive - negative
          
          return {
            time: index + 1,
            ポジティブ: Math.round(positive),
            ネガティブ: Math.round(negative),
            ニュートラル: Math.max(0, Math.round(neutral))
          }
        })
        setSentimentData(sentiments)
      }
    } else {
      // デモデータ（セッションがない場合）
      setUtterances([
        "この間、オンラインライブイベントに参加しました。",
        "操作マニュアルが不親切でイライラしました。",
        "でも、最初の曲がはじまったら楽しくなって、",
        "そうですね。",
        "そう思うと他のイベントも気になってます。",
        "やはり、仕事ではストレスたまるし。",
        "リフレッシュは必要ですよね。",
        "週末は、彼女とキャンプに行くつもりです。",
        "バーベキューをして、",
        "帰りは温泉でのんびりします。",
      ])
    }
  }, [currentSession])

  return (
    <div className="space-y-8">
      {/* ヘッダータイトルグループ */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">
          Result
        </Badge>
        <h2 className="text-3xl font-bold text-gray-800">感情分析結果</h2>
        <h3 className="text-xl text-gray-600">
          {currentSession ? 
            format(currentSession.startTime, 'yyyy年M月d日 HH:mm', { locale: ja }) + ' のあなたの状態' :
            '今日のあなたの状態'
          }
        </h3>
        {currentSession && (
          <div className="text-sm text-gray-500">
            録画時間: {Math.floor(currentSession.duration / 60)}分{currentSession.duration % 60}秒
          </div>
        )}
        <p className="text-gray-600 max-w-2xl mx-auto">
          話している時の顔の表情、声の抑揚、発話内容から、あなたの感情と
          会話の特徴を分析します。TANRENはこれらの情報を基に、あなたの接客・営業スキル向上や 自己理解をサポートします。
        </p>
      </div>

      {/* サマリーメトリクス行 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle>会話の状態</CardTitle>
          </CardHeader>
          <CardContent>
            <ConversationStatusRadar data={conversationMetrics ? {
              blinkRate: Math.min(100, conversationMetrics.surprise || 50),
              calmness: Math.min(100, 100 - (conversationMetrics.fear || 0) - (conversationMetrics.confusion || 0)),
              speechSpeed: Math.min(100, conversationMetrics.confidence || 70),
              pauseDuration: Math.min(100, conversationMetrics.interest || 60),
              fluency: Math.min(100, (conversationMetrics.confidence || 0) + (conversationMetrics.joy || 0)) / 2
            } : undefined} />
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle>顔/視線の動き</CardTitle>
          </CardHeader>
          <CardContent>
            <FaceMetricsGauge data={conversationMetrics ? {
              faceMovement: Math.min(100, (conversationMetrics.surprise || 0) + (conversationMetrics.interest || 0)) / 2,
              sightMovement: Math.min(100, conversationMetrics.interest || 50)
            } : undefined} />
          </CardContent>
        </Card>
      </div>

      {/* 詳細分析セクション */}
      <div className="space-y-6">
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">質問1を回答している時の状態</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 発話内容 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>発話内容</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {utterances.map((utterance, index) => (
                    <div key={index} className="flex space-x-3">
                      <Badge variant="outline" className="min-w-[24px] h-6 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <p className="text-sm text-gray-700 leading-relaxed">{utterance}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 発話中の感情変化 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle>発話中の感情変化</CardTitle>
              </CardHeader>
              <CardContent>
                <EmotionChangeChart emotionHistory={emotionData} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* センチメントトレンド */}
        <div className="border-t pt-6">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>センチメント</CardTitle>
            </CardHeader>
            <CardContent>
              <SentimentTrendChart data={sentimentData.length > 0 ? sentimentData : undefined} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Default export
export default AnalysisReport
