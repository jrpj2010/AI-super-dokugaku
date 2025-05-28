"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { EmotionData } from "@/lib/mock-data"

interface EmotionRadarChartProps {
  data?: EmotionData
}

export default function EmotionRadarChart({ data }: EmotionRadarChartProps) {
  // データがない場合は空のチャートを表示
  const chartData = data ? [
    { emotion: "幸せ", value: data.happiness || data.joy || 0 },
    { emotion: "哀しみ", value: data.sadness || 0 },
    { emotion: "怒り", value: data.anger || 0 },
    { emotion: "嫌悪", value: data.disgust || 0 },
    { emotion: "恐れ", value: data.fear || 0 },
    { emotion: "驚き", value: data.surprise || 0 },
  ] : [
    { emotion: "幸せ", value: 0 },
    { emotion: "哀しみ", value: 0 },
    { emotion: "怒り", value: 0 },
    { emotion: "嫌悪", value: 0 },
    { emotion: "恐れ", value: 0 },
    { emotion: "驚き", value: 0 },
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
