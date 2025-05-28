"use client"

import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts'

interface VoiceMetricsProps {
  metrics: {
    pitch: number
    volume: number
    speed: number
  }
}

export function VoiceMetrics({ metrics }: VoiceMetricsProps) {
  const gaugeData = [
    {
      name: 'ピッチ',
      value: metrics.pitch,
      fill: '#8b5cf6',
    },
    {
      name: '音量',
      value: metrics.volume,
      fill: '#10b981',
    },
    {
      name: '話速',
      value: metrics.speed,
      fill: '#f59e0b',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {gaugeData.map((item) => (
        <div key={item.name} className="text-center">
          <h4 className="text-sm font-medium mb-2">{item.name}</h4>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="30%"
                outerRadius="90%"
                data={[item]}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  fill={item.fill}
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500">{item.value}%</p>
        </div>
      ))}
    </div>
  )
}