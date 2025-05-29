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
    <div id="analysis-report" className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="text-center space-y-3 pb-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{sessionDate} のあなたの状態</h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg">録画時間: {formattedDuration}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <ExportButtons />
        </div>
      </div>

      {/* Session Metadata */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            セッション情報
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              セッションID
            </p>
            <p className="font-semibold text-gray-800">{currentSession.id}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              時間
            </p>
            <p className="font-semibold text-gray-800">{formattedDuration}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              日付
            </p>
            <p className="font-semibold text-gray-800">
              {format(currentSession.startTime, 'yyyy年M月d日', { locale: ja })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emotion Statistics */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            感情統計
          </CardTitle>
          <CardDescription className="text-base">セッション全体の平均感情スコア</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(emotionStats).map(([emotion, value]) => {
              const emotionColors: Record<string, string> = {
                joy: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                anger: 'bg-red-100 text-red-800 border-red-300',
                sadness: 'bg-blue-100 text-blue-800 border-blue-300',
                fear: 'bg-purple-100 text-purple-800 border-purple-300',
                surprise: 'bg-green-100 text-green-800 border-green-300',
                confidence: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                interest: 'bg-pink-100 text-pink-800 border-pink-300',
                confusion: 'bg-gray-100 text-gray-800 border-gray-300'
              }
              const colorClass = emotionColors[emotion] || 'bg-gray-100 text-gray-800 border-gray-300'
              
              return (
                <div key={emotion} className={`flex justify-between items-center p-3 rounded-lg border ${colorClass}`}>
                  <span className="font-medium">{getEmotionLabel(emotion)}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-current h-2 rounded-full transition-all"
                        style={{ width: `${Math.round(value)}%` }}
                      />
                    </div>
                    <Badge className={colorClass}>{Math.round(value)}%</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emotion Peaks */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            感情のピーク
          </CardTitle>
          <CardDescription className="text-base">セッション中の最高値</CardDescription>
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">最高の喜び</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-yellow-500 h-3 rounded-full transition-all"
                    style={{ width: `${emotionPeaks.joy}%` }}
                  />
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 font-bold">{emotionPeaks.joy}%</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="font-medium">最高の自信</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-indigo-500 h-3 rounded-full transition-all"
                    style={{ width: `${emotionPeaks.confidence}%` }}
                  />
                </div>
                <Badge className="bg-indigo-100 text-indigo-800 font-bold">{emotionPeaks.confidence}%</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="font-medium">最高の興味</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${emotionPeaks.interest}%` }}
                  />
                </div>
                <Badge className="bg-pink-100 text-pink-800 font-bold">{emotionPeaks.interest}%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emotion Trend Chart */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            感情の推移
          </CardTitle>
          <CardDescription className="text-base">時間経過による感情の変化</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div data-testid="emotion-trend-chart" className="h-[350px] bg-gray-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="joy" 
                  stroke="#fbbf24" 
                  strokeWidth={3}
                  name="喜び" 
                  dot={{ fill: '#fbbf24', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  name="自信" 
                  dot={{ fill: '#6366f1', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="interest" 
                  stroke="#ec4899" 
                  strokeWidth={3}
                  name="興味" 
                  dot={{ fill: '#ec4899', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            セッション転写
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gray-50 rounded-lg p-6 max-h-[300px] overflow-y-auto custom-scrollbar">
            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{currentSession.transcript}</p>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            主要な洞察
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {currentSession.insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:shadow-sm transition-all">
                <span className="text-indigo-600 font-bold text-lg mt-0.5">{index + 1}</span>
                <span className="text-sm text-gray-700 leading-relaxed flex-1">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            感情タイムライン
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {currentSession.emotions.map((emotion, index) => {
              const timeOffset = Math.floor((emotion.timestamp - currentSession.emotions[0].timestamp) / 1000)
              const minutes = Math.floor(timeOffset / 60)
              const seconds = timeOffset % 60
              const timeLabel = `${minutes}:${seconds.toString().padStart(2, '0')}`
              
              // Get dominant emotion for coloring
              const maxEmotion = Object.entries(emotion.emotions).reduce((max, [key, value]) => 
                value > max.value ? { key, value } : max, { key: 'joy', value: 0 })
              
              const emotionColors: Record<string, string> = {
                joy: 'border-yellow-400 bg-yellow-50',
                anger: 'border-red-400 bg-red-50',
                sadness: 'border-blue-400 bg-blue-50',
                fear: 'border-purple-400 bg-purple-50',
                surprise: 'border-green-400 bg-green-50',
                confidence: 'border-indigo-400 bg-indigo-50',
                interest: 'border-pink-400 bg-pink-50',
                confusion: 'border-gray-400 bg-gray-50'
              }
              const bgColorClass = emotionColors[maxEmotion.key] || 'border-gray-400 bg-gray-50'
              
              return (
                <div key={index} data-testid="timeline-item" className={`flex gap-4 items-start p-4 rounded-lg border-l-4 ${bgColorClass} transition-all hover:shadow-md`}>
                  <Badge className="bg-white shadow-sm font-mono">{timeLabel}</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{emotion.facialExpression}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{emotion.insight}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            推奨事項
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-base leading-relaxed text-gray-700">{recommendation}</p>
          </div>
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
      <div className="text-center space-y-4 pb-8 border-b border-gray-200">
        <Badge variant="secondary" className="text-sm px-4 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700">
          Result
        </Badge>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">感情分析結果</h2>
        <h3 className="text-2xl text-gray-700 font-medium">
          {currentSession ? 
            format(currentSession.startTime, 'yyyy年M月d日 HH:mm', { locale: ja }) + ' のあなたの状態' :
            '今日のあなたの状態'
          }
        </h3>
        {currentSession && (
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-lg">
              録画時間: {Math.floor(currentSession.duration / 60)}分{currentSession.duration % 60}秒
            </span>
          </div>
        )}
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          話している時の顔の表情、声の抑揚、発話内容から、あなたの感情と
          会話の特徴を分析します。TANRENはこれらの情報を基に、あなたの接客・営業スキル向上や 自己理解をサポートします。
        </p>
      </div>

      {/* サマリーメトリクス行 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              会話の状態
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ConversationStatusRadar data={conversationMetrics ? {
              blinkRate: Math.min(100, conversationMetrics.surprise || 50),
              calmness: Math.min(100, 100 - (conversationMetrics.fear || 0) - (conversationMetrics.confusion || 0)),
              speechSpeed: Math.min(100, conversationMetrics.confidence || 70),
              pauseDuration: Math.min(100, conversationMetrics.interest || 60),
              fluency: Math.min(100, (conversationMetrics.confidence || 0) + (conversationMetrics.joy || 0)) / 2
            } : undefined} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              顔/視線の動き
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
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
