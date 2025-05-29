"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts"
import { EmotionData } from "@/lib/mock-data"

interface EmotionChangeData {
  utterance: string
  幸せ: number
  哀しみ: number
  怒り: number
  嫌悪: number
  恐れ: number
  驚き: number
  [key: string]: string | number // For dynamic access
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
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-sm mb-2">発話 {label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600">{entry.name}:</span>
                <span className="font-medium">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  // Custom legend component
  const CustomLegend = (props: any) => {
    const { payload } = props
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-80 bg-gray-50 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="utterance" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: '発話番号', position: 'insideBottom', offset: -5, style: { fill: '#6b7280' } }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: '感情スコア (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="幸せ" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} />
          <Bar dataKey="哀しみ" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} />
          <Bar dataKey="怒り" stackId="a" fill="#f87171" radius={[0, 0, 0, 0]} />
          <Bar dataKey="嫌悪" stackId="a" fill="#fb923c" radius={[0, 0, 0, 0]} />
          <Bar dataKey="恐れ" stackId="a" fill="#c084fc" radius={[0, 0, 0, 0]} />
          <Bar dataKey="驚き" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
