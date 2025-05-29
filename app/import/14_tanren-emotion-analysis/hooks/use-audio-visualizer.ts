import { useEffect, useRef, useCallback } from 'react'

export function useAudioVisualizer(stream: MediaStream | null, isActive: boolean) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const initializeAudio = useCallback(() => {
    if (!stream || !isActive) return

    const audioTrack = stream.getAudioTracks()[0]
    if (!audioTrack) return

    try {
      // AudioContextの作成
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      
      // AnalyserNodeの作成と設定
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
      analyserRef.current.smoothingTimeConstant = 0.8
      
      const bufferLength = analyserRef.current.frequencyBinCount
      dataArrayRef.current = new Uint8Array(bufferLength)
      
      // 接続
      source.connect(analyserRef.current)
    } catch (error) {
      console.error('Audio initialization error:', error)
    }
  }, [stream, isActive])

  const draw = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const analyser = analyserRef.current
    const dataArray = dataArrayRef.current

    // 音声データを取得
    analyser.getByteFrequencyData(dataArray)

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const barWidth = canvas.width / dataArray.length * 2.5
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height * 0.8

      // グラデーション効果
      const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)')

      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight)

      x += barWidth
    }

    animationIdRef.current = requestAnimationFrame(draw)
  }, [])

  const setCanvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    canvasRef.current = canvas
    if (canvas && isActive) {
      draw()
    }
  }, [draw, isActive])

  useEffect(() => {
    initializeAudio()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(error => {
          console.warn('AudioContext close error (ignored):', error)
        })
      }
    }
  }, [initializeAudio])

  useEffect(() => {
    if (isActive && canvasRef.current) {
      draw()
    } else if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      // 非アクティブ時は静的な低い波形を表示
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          const bars = 32
          const barWidth = canvas.width / bars
          for (let i = 0; i < bars; i++) {
            const height = canvas.height * 0.05
            const x = i * barWidth
            const y = canvas.height - height
            ctx.fillStyle = 'rgba(156, 163, 175, 0.3)'
            ctx.fillRect(x + 2, y, barWidth - 4, height)
          }
        }
      }
    }
  }, [isActive, draw])

  return { setCanvasRef }
}