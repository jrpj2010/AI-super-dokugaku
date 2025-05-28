"use client"

import { useEffect, useRef } from 'react'

interface FaceMapProps {
  landmarks: any[] | null
}

export function FaceMap({ landmarks }: FaceMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!landmarks || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw face landmarks
    ctx.fillStyle = '#10b981'
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 2

    landmarks.forEach((landmark) => {
      ctx.beginPath()
      ctx.arc(landmark.x * canvas.width, landmark.y * canvas.height, 2, 0, 2 * Math.PI)
      ctx.fill()
    })
  }, [landmarks])

  if (!landmarks) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>顔認識を待機中...</p>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full h-full"
    />
  )
}