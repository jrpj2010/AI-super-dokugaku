"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid, Tooltip } from "recharts"
import { useEffect } from "react"

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

  // デバッグログ
  useEffect(() => {
    console.log('[EmotionTrendChart] データ更新:', {
      hasData: !!data,
      dataLength: data?.length || 0,
      latestData: data && data.length > 0 ? data[data.length - 1] : null,
      allData: data
    })
  }, [data])

  return (
    <div className="h-48 relative">
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-gray-400 text-sm">セッション開始時に感情推移が表示されます</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={hasData ? data : []}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            className="text-xs" 
            opacity={hasData ? 1 : 0.3}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            className="text-xs" 
            opacity={hasData ? 1 : 0.3} 
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
          />
          <Tooltip 
            contentStyle={{ fontSize: 12 }}
            formatter={(value: number) => `${Math.round(value)}%`}
          />
          <Legend 
            opacity={hasData ? 1 : 0.3}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Line 
            type="monotone" 
            dataKey="ポジティブ" 
            stroke="#10b981" 
            strokeWidth={2} 
            dot={true}
            activeDot={{ r: 4 }}
            animationDuration={300}
            hide={!hasData}
          />
          <Line 
            type="monotone" 
            dataKey="ネガティブ" 
            stroke="#ef4444" 
            strokeWidth={2} 
            dot={true}
            activeDot={{ r: 4 }}
            animationDuration={300}
            hide={!hasData}
          />
          <Line 
            type="monotone" 
            dataKey="ニュートラル" 
            stroke="#f59e0b" 
            strokeWidth={2} 
            dot={true}
            activeDot={{ r: 4 }}
            animationDuration={300}
            hide={!hasData}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
