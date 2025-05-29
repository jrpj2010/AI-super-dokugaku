"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { EmotionData } from "@/lib/mock-data"

interface EmotionRadarChartProps {
  data?: EmotionData
}

export default function EmotionRadarChart({ data }: EmotionRadarChartProps) {
  // データがない場合は空のチャートを表示
  const chartData = data ? [
    { emotion: "喜び", value: data.happiness || data.joy || 0 },
    { emotion: "悲しみ", value: data.sadness || 0 },
    { emotion: "怒り", value: data.anger || 0 },
    { emotion: "驚き", value: data.surprise || 0 },
    { emotion: "恐れ", value: data.fear || 0 },
    { emotion: "自信", value: data.confidence || data.trust || 0 },
    { emotion: "困惑", value: data.confusion || 0 },
    { emotion: "興味", value: data.interest || data.anticipation || 0 },
  ] : [
    { emotion: "喜び", value: 0 },
    { emotion: "悲しみ", value: 0 },
    { emotion: "怒り", value: 0 },
    { emotion: "驚き", value: 0 },
    { emotion: "恐れ", value: 0 },
    { emotion: "自信", value: 0 },
    { emotion: "困惑", value: 0 },
    { emotion: "興味", value: 0 },
  ]

  return (
    <div className="h-64 relative">
      {!data && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-gray-400 text-sm">セッション開始時に感情分析が表示されます</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid opacity={data ? 1 : 0.3} />
          <PolarAngleAxis dataKey="emotion" className="text-xs" opacity={data ? 1 : 0.5} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" opacity={data ? 1 : 0.5} />
          <Radar 
            name="感情" 
            dataKey="value" 
            stroke="#10b981" 
            fill="#10b981" 
            fillOpacity={data ? 0.3 : 0.1} 
            strokeWidth={2} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
