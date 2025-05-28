"use client"

import { useEffect, useRef } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MediaStreamError } from '@/hooks/use-media-stream'

interface VideoStreamProps {
  stream: MediaStream | null
  error: MediaStreamError | null
  isLoading: boolean
}

export default function VideoStream({ stream, error, isLoading }: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  // スマホ画角のアスペクト比 (9:16)
  const videoContainerClass = "relative bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden"
  const videoAspectStyle = { aspectRatio: '9/16', maxHeight: '600px', width: '100%', maxWidth: '337.5px', margin: '0 auto' }

  if (error) {
    return (
      <div className={videoContainerClass} style={videoAspectStyle}>
        <Alert className="max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={videoContainerClass} style={videoAspectStyle}>
        <div className="text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>カメラを起動中...</p>
        </div>
      </div>
    )
  }

  if (!stream) {
    return (
      <div className={videoContainerClass} style={videoAspectStyle}>
        <div className="text-gray-400 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p>「開始」ボタンを押してください</p>
        </div>
      </div>
    )
  }

  return (
    <div className={videoContainerClass} style={videoAspectStyle}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }} // ミラー表示
      />
    </div>
  )
}