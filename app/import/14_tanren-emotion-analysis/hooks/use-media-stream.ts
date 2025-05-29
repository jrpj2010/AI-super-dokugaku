import { useState, useEffect, useRef, useCallback } from 'react'

export interface MediaStreamError {
  type: 'permission' | 'notFound' | 'other'
  message: string
}

export function useMediaStream() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<MediaStreamError | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)

  const startStream = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.mediaDevices) {
        throw new Error('Media devices not available')
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
          frameRate: { ideal: 30, min: 24 } // 30fpsを目指し、最低24fpsを保証
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      streamRef.current = mediaStream
      setStream(mediaStream)
      return mediaStream // ストリームを返す
    } catch (err: any) {
      let errorType: MediaStreamError['type'] = 'other'
      let message = 'メディアデバイスへのアクセスに失敗しました'

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorType = 'permission'
        message = 'カメラとマイクへのアクセスが許可されていません。ブラウザの設定を確認してください。'
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorType = 'notFound'
        message = 'カメラまたはマイクが見つかりません。デバイスが接続されているか確認してください。'
      }

      setError({ type: errorType, message })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setStream(null)
    }
  }, [])

  // クリーンアップ
  useEffect(() => {
    return () => {
      stopStream()
    }
  }, [stopStream])

  return {
    stream,
    error,
    isLoading,
    startStream,
    stopStream
  }
}