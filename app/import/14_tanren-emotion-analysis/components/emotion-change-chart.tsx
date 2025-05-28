"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import { EmotionData } from "@/lib/mock-data"

interface EmotionChangeData {
  utterance: string
  幸せ: number
  哀しみ: number
  怒り: number
  嫌悪: number
  恐れ: number
  驚き: number
}

interface EmotionChangeChartProps {
  data?: EmotionChangeData[]
  emotionHistory?: EmotionData[]
}

export default function EmotionChangeChart({ data, emotionHistory }: EmotionChangeChartProps) {
  const defaultData: EmotionChangeData[] = [
    { utterance: "1", 幸せ: 30, 哀しみ: 10, 怒り: 5, 嫌悪: 5, 恐れ: 10, 驚き: 40 },
    { utterance: "2", 幸せ: 15, 哀しみ: 20, 怒り: 25, 嫌悪: 15, 恐れ: 15, 驚き: 10 },
    { utterance: "3", 幸せ: 50, 哀しみ: 10, 怒り: 5, 嫌悪: 5, 恐れ: 10, 驚き: 20 },
    { utterance: "4", 幸せ: 40, 哀しみ: 15, 怒り: 10, 嫌悪: 10, 恐れ: 15, 驚き: 10 },
    { utterance: "5", 幸せ: 45, 哀しみ: 10, 怒り: 5, 嫌悪: 5, 恐れ: 15, 驚き: 20 },
    { utterance: "6", 幸せ: 20, 哀しみ: 25, 怒り: 20, 嫌悪: 15, 恐れ: 15, 驚き: 5 },
    { utterance: "7", 幸せ: 55, 哀しみ: 10, 怒り: 5, 嫌悪: 5, 恐れ: 10, 驚き: 15 },
    { utterance: "8", 幸せ: 60, 哀しみ: 5, 怒り: 5, 嫌悪: 5, 恐れ: 10, 驚き: 15 },
    { utterance: "9", 幸せ: 65, 哀しみ: 5, 怒り: 5, 嫌悪: 5, 恐れ: 10, 驚き: 10 },
    { utterance: "10", 幸せ: 70, 哀しみ: 5, 怒り: 5, 嫌悪: 5, 恐れ: 10, 驚き: 5 },
  ]

  let chartData: EmotionChangeData[]

  if (emotionHistory && emotionHistory.length > 0) {
    chartData = emotionHistory.map((emotion, index) => ({
      utterance: (index + 1).toString(),
      幸せ: emotion.happiness || emotion.joy || 0,
      哀しみ: emotion.sadness || 0,
      怒り: emotion.anger || 0,
      嫌悪: emotion.disgust || 0,
      恐れ: emotion.fear || 0,
      驚き: emotion.surprise || 0,
    }))
  } else {
    chartData = data || defaultData
  }
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="utterance" className="text-xs" />
          <YAxis className="text-xs" />
          <Legend />
          <Bar dataKey="幸せ" stackId="a" fill="#10b981" />
          <Bar dataKey="哀しみ" stackId="a" fill="#94a3b8" />
          <Bar dataKey="怒り" stackId="a" fill="#ef4444" />
          <Bar dataKey="嫌悪" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="恐れ" stackId="a" fill="#06b6d4" />
          <Bar dataKey="驚き" stackId="a" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
