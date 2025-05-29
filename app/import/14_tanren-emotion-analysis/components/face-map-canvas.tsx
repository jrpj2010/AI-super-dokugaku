"use client"

import { useEffect, useRef } from 'react'
import { FACEMESH_TESSELATION, FACEMESH_LIPS, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE, FACEMESH_FACE_OVAL } from '@mediapipe/face_mesh'

interface FaceMapCanvasProps {
  landmarks: any[] | null
  width?: number
  height?: number
}

// MediaPipe Face Mesh connections
const connections = [
  ...FACEMESH_TESSELATION,
  ...FACEMESH_LIPS,
  ...FACEMESH_LEFT_EYE,
  ...FACEMESH_RIGHT_EYE,
  ...FACEMESH_FACE_OVAL,
]

export default function FaceMapCanvas({ landmarks, width = 320, height = 240 }: FaceMapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  
  // デバッグ: landmarksの状態を確認
  useEffect(() => {
    if (landmarks) {
      console.log('[FaceMapCanvas] Landmarks受信:', landmarks.length, 'ポイント');
    } else {
      console.log('[FaceMapCanvas] Landmarksが空またはnull');
    }
  }, [landmarks])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      if (landmarks && landmarks.length > 0) {
        console.log('[FaceMapCanvas] 描画中:', landmarks.length, 'ポイント');
        // Draw connections (wireframe)
        ctx.strokeStyle = '#00ff00'
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.6

        connections.forEach(([start, end]) => {
          if (landmarks[start] && landmarks[end]) {
            ctx.beginPath()
            ctx.moveTo(landmarks[start].x * width, landmarks[start].y * height)
            ctx.lineTo(landmarks[end].x * width, landmarks[end].y * height)
            ctx.stroke()
          }
        })

        // Draw key landmarks as points
        ctx.fillStyle = '#00ff00'
        ctx.globalAlpha = 1

        // Eyes
        const leftEyeIndices = [33, 133, 157, 158, 159, 160, 161, 246]
        const rightEyeIndices = [362, 398, 384, 385, 386, 387, 388, 466]
        
        // Draw eye points
        const eyeIndices = leftEyeIndices.concat(rightEyeIndices)
        eyeIndices.forEach(index => {
          if (landmarks[index]) {
            ctx.beginPath()
            ctx.arc(landmarks[index].x * width, landmarks[index].y * height, 2, 0, 2 * Math.PI)
            ctx.fill()
          }
        })

        // Mouth key points
        const mouthIndices = [13, 14, 269, 270, 267, 271, 272]
        mouthIndices.forEach(index => {
          if (landmarks[index]) {
            ctx.beginPath()
            ctx.arc(landmarks[index].x * width, landmarks[index].y * height, 2, 0, 2 * Math.PI)
            ctx.fill()
          }
        })

        // Nose tip
        if (landmarks[1]) {
          ctx.fillStyle = '#ffff00'
          ctx.beginPath()
          ctx.arc(landmarks[1].x * width, landmarks[1].y * height, 3, 0, 2 * Math.PI)
          ctx.fill()
        }

        // Eyebrows
        ctx.fillStyle = '#00ffff'
        const leftEyebrowIndices = [46, 53, 52, 65, 55]
        const rightEyebrowIndices = [276, 283, 282, 295, 285]
        
        const eyebrowIndices = leftEyebrowIndices.concat(rightEyebrowIndices)
        eyebrowIndices.forEach(index => {
          if (landmarks[index]) {
            ctx.beginPath()
            ctx.arc(landmarks[index].x * width, landmarks[index].y * height, 1.5, 0, 2 * Math.PI)
            ctx.fill()
          }
        })
      } else {
        // Draw placeholder when no face is detected
        console.log('[FaceMapCanvas] プレースホルダー描画');
        ctx.strokeStyle = '#666666'
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.3
        
        // Simple face outline
        ctx.beginPath()
        ctx.ellipse(width / 2, height / 2, width * 0.3, height * 0.4, 0, 0, 2 * Math.PI)
        ctx.stroke()
        
        // Placeholder text
        ctx.fillStyle = '#666666'
        ctx.font = '14px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.globalAlpha = 0.5
        ctx.fillText('顔認識待機中...', width / 2, height / 2)
      }

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [landmarks, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
      style={{ maxWidth: width, maxHeight: height }}
    />
  )
}