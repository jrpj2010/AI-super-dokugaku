"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Legend } from "recharts"
import { ConversationMetrics } from "@/lib/mock-data"

interface ConversationStatusRadarProps {
  data?: ConversationMetrics
}

export default function ConversationStatusRadar({ data }: ConversationStatusRadarProps) {
  const defaultData: ConversationMetrics = {
    blinkRate: 75,
    calmness: 65,
    speechSpeed: 80,
    pauseDuration: 45,
    fluency: 85,
  }

  const metrics = data || defaultData

  const chartData = [
    { metric: "まばたき回数", 平均: 60, 今日: metrics.blinkRate },
    { metric: "落ち着き", 平均: 70, 今日: metrics.calmness },
    { metric: "会話スピード", 平均: 65, 今日: metrics.speechSpeed },
    { metric: "会話の間", 平均: 55, 今日: metrics.pauseDuration },
    { metric: "会話の滑らかさ", 平均: 70, 今日: metrics.fluency },
  ]
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" className="text-xs" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
          <Radar name="平均" dataKey="平均" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} strokeWidth={2} />
          <Radar name="今日" dataKey="今日" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
