import { useCallback, useEffect, useRef, useState } from 'react'
import { getOptimizedConfig } from '@/lib/performance-config'

interface UseVideoFrameCaptureOptions {
  stream: MediaStream | null
  captureInterval?: number // milliseconds between captures
  maxWidth?: number
  maxHeight?: number
}

const config = getOptimizedConfig()

export interface CapturedFrame {
  dataUrl: string
  timestamp: number
  width: number
  height: number
}

export function useVideoFrameCapture({
  stream,
  captureInterval = config.video.captureInterval,
  maxWidth = config.video.maxWidth,
  maxHeight = config.video.maxHeight
}: UseVideoFrameCaptureOptions) {
  const [latestFrame, setLatestFrame] = useState<CapturedFrame | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize video element and canvas
  useEffect(() => {
    if (!videoRef.current) {
      videoRef.current = document.createElement('video')
      videoRef.current.muted = true
      videoRef.current.playsInline = true
    }

    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas')
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [])

  // Capture a single frame
  const captureFrame = useCallback(async (): Promise<CapturedFrame | null> => {
    if (!videoRef.current || !canvasRef.current || !stream) {
      return null
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    try {
      // Calculate dimensions while maintaining aspect ratio
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
      
      if (videoWidth === 0 || videoHeight === 0) {
        return null
      }

      const aspectRatio = videoWidth / videoHeight
      let targetWidth = videoWidth
      let targetHeight = videoHeight

      // Scale down if necessary
      if (targetWidth > maxWidth) {
        targetWidth = maxWidth
        targetHeight = targetWidth / aspectRatio
      }

      if (targetHeight > maxHeight) {
        targetHeight = maxHeight
        targetWidth = targetHeight * aspectRatio
      }

      // Set canvas dimensions
      canvas.width = targetWidth
      canvas.height = targetHeight

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, targetWidth, targetHeight)

      // Convert to data URL with optimized quality
      const dataUrl = canvas.toDataURL('image/jpeg', config.video.jpegQuality)

      const frame: CapturedFrame = {
        dataUrl,
        timestamp: Date.now(),
        width: targetWidth,
        height: targetHeight
      }

      setLatestFrame(frame)
      return frame
    } catch (error) {
      console.error('Error capturing frame:', error)
      return null
    }
  }, [stream, maxWidth, maxHeight])

  // Start capturing frames
  const startCapture = useCallback(async () => {
    if (!stream || !videoRef.current || isCapturing) {
      return
    }

    const video = videoRef.current
    video.srcObject = stream

    try {
      await video.play()
      setIsCapturing(true)

      // Wait for video to be ready
      await new Promise<void>((resolve) => {
        const checkReady = () => {
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            resolve()
          } else {
            setTimeout(checkReady, 100)
          }
        }
        checkReady()
      })

      // Capture initial frame
      await captureFrame()

      // Set up interval for periodic capture
      intervalRef.current = setInterval(() => {
        captureFrame()
      }, captureInterval)
    } catch (error) {
      console.error('Error starting capture:', error)
      setIsCapturing(false)
    }
  }, [stream, captureInterval, captureFrame, isCapturing])

  // Stop capturing frames
  const stopCapture = useCallback(() => {
    setIsCapturing(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
    }

    setLatestFrame(null)
  }, [])

  // Auto-start/stop based on stream availability
  useEffect(() => {
    if (stream) {
      startCapture()
    } else {
      stopCapture()
    }

    return () => {
      stopCapture()
    }
  }, [stream, startCapture, stopCapture])

  return {
    latestFrame,
    isCapturing,
    captureFrame,
    startCapture,
    stopCapture
  }
}