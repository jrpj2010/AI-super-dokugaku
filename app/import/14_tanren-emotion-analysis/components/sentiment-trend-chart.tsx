"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

interface SentimentData {
  time: number | string
  ポジティブ: number
  ネガティブ: number
  ニュートラル: number
}

interface SentimentTrendChartProps {
  data?: SentimentData[]
}

export default function SentimentTrendChart({ data }: SentimentTrendChartProps) {
  const defaultData = [
    { time: 1, ポジティブ: 65, ネガティブ: 20, ニュートラル: 15 },
    { time: 2, ポジティブ: 40, ネガティブ: 45, ニュートラル: 15 },
    { time: 3, ポジティブ: 75, ネガティブ: 15, ニュートラル: 10 },
    { time: 4, ポジティブ: 70, ネガティブ: 20, ニュートラル: 10 },
    { time: 5, ポジティブ: 72, ネガティブ: 18, ニュートラル: 10 },
    { time: 6, ポジティブ: 45, ネガティブ: 40, ニュートラル: 15 },
    { time: 7, ポジティブ: 80, ネガティブ: 10, ニュートラル: 10 },
    { time: 8, ポジティブ: 85, ネガティブ: 8, ニュートラル: 7 },
    { time: 9, ポジティブ: 88, ネガティブ: 7, ニュートラル: 5 },
    { time: 10, ポジティブ: 90, ネガティブ: 5, ニュートラル: 5 },
  ]

  const chartData = data || defaultData
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="time" className="text-xs" />
          <YAxis className="text-xs" />
          <Legend />
          <Line type="monotone" dataKey="ポジティブ" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="ニュートラル" stroke="#f59e0b" strokeWidth={2} />
          <Line type="monotone" dataKey="ネガティブ" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
