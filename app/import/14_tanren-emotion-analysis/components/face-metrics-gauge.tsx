"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { FaceMetrics } from "@/lib/mock-data"

interface FaceMetricsGaugeProps {
  data?: FaceMetrics | null
}

export default function FaceMetricsGauge({ data }: FaceMetricsGaugeProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipType, setTooltipType] = useState<'face' | 'sight'>('face')

  const faceValue = data?.faceMovement ?? 0
  const sightValue = data?.sightMovement ?? 0
  const hasData = data !== undefined && data !== null

  const getValueDescription = (value: number): string => {
    if (value < 33) return "少ない"
    if (value < 66) return "適度"
    return "多い"
  }

  const getValueColor = (value: number): string => {
    if (value < 33) return "text-red-500"
    if (value < 66) return "text-yellow-500"
    return "text-green-500"
  }

  const handleMouseEnter = (type: 'face' | 'sight', event: React.MouseEvent) => {
    const value = type === 'face' ? faceValue : sightValue
    const label = type === 'face' ? '顔の動き' : '視線の動き'
    const description = type === 'face' 
      ? '顔全体の動きの大きさ (0-100)' 
      : 'カメラへの平均注視率 (%)'
    setTooltipContent(`${label}: ${value}% (${getValueDescription(value)})\n${description}`)
    setTooltipType(type)
    
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  const handleFocus = (type: 'face' | 'sight') => {
    const value = type === 'face' ? faceValue : sightValue
    const label = type === 'face' ? '顔の動き' : '視線の動き'
    const description = type === 'face' 
      ? '顔全体の動きの大きさ (0-100)' 
      : 'カメラへの平均注視率 (%)'
    setTooltipContent(`${label}: ${value}% (${getValueDescription(value)})\n${description}`)
    setTooltipType(type)
    setTooltipVisible(true)
  }

  if (!hasData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm">データを待機中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6" data-testid="face-metrics-gauge">
      {/* 指標の説明 */}
      <div className="text-xs text-gray-500 space-y-1 mb-4 px-2">
        <p>• 顔の動き: 表情変化の活発さ (0-100)</p>
        <p>• 視線の動き: カメラへの注視率 (%)</p>
      </div>
      <div className="text-center">
        <div 
          className="relative w-32 h-32 mx-auto mb-4 cursor-pointer"
          data-testid="face-movement-gauge"
          onMouseEnter={(e) => handleMouseEnter('face', e)}
          onMouseLeave={handleMouseLeave}
          onFocus={() => handleFocus('face')}
          onBlur={handleMouseLeave}
          tabIndex={0}
        >
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray={`${faceValue}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-gray-500">Face</div>
              <div className="text-lg font-bold">{faceValue}</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">顔全体の動きの大きさ (0-100)</p>
      </div>

      <div 
        className="space-y-2 cursor-pointer"
        data-testid="sight-movement-gauge"
        onMouseEnter={(e) => handleMouseEnter('sight', e)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => handleFocus('sight')}
        onBlur={handleMouseLeave}
        tabIndex={0}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Sight</span>
          <span className="text-sm font-semibold">{sightValue}</span>
        </div>
        <Progress value={sightValue} className="h-2" />
        <p className="text-xs text-gray-500 mt-1">カメラへの平均注視率 (%)</p>
      </div>

      {/* Tooltip */}
      {tooltipVisible && (
        <div
          role="tooltip"
          className={`tooltip fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg ${getValueColor(tooltipType === 'face' ? faceValue : sightValue)}`}
          style={{
            position: 'absolute',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="whitespace-pre-line">{tooltipContent}</div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  )
}