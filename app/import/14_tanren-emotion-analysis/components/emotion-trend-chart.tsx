"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

interface SentimentDataPoint {
  time: string
  ポジティブ: number
  ネガティブ: number
  ニュートラル: number
}

interface EmotionTrendChartProps {
  data?: SentimentDataPoint[]
}

export default function EmotionTrendChart({ data }: EmotionTrendChartProps) {
  // データがない場合は空の状態を表示
  const hasData = data && data.length > 0

  return (
    <div className="h-48 relative">
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-gray-400 text-sm">セッション開始時に感情推移が表示されます</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={hasData ? data : []}>
          <XAxis dataKey="time" className="text-xs" opacity={hasData ? 1 : 0.3} />
          <YAxis className="text-xs" opacity={hasData ? 1 : 0.3} domain={[0, 100]} />
          <Legend opacity={hasData ? 1 : 0.3} />
          {hasData && (
            <>
              <Line type="monotone" dataKey="ポジティブ" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ネガティブ" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ニュートラル" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
