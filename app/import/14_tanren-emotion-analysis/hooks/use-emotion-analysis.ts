import { useCallback, useEffect, useRef, useState } from 'react'
import type { CapturedFrame } from './use-video-frame-capture'
import { getOptimizedConfig } from '@/lib/performance-config'
import { emotionCache, EmotionCache } from '@/lib/cache/emotion-cache'
import { translateEmotionAnalysis } from '@/lib/translation'

interface EmotionData {
  joy: number
  anger: number
  sadness: number
  surprise: number
  fear: number
  confidence: number
  confusion: number
  interest: number
  timestamp: number
}

interface EmotionAnalysisResult {
  emotions: EmotionData
  insights: string
  facialExpression: string
}

interface UseEmotionAnalysisOptions {
  analysisInterval?: number // milliseconds between analyses
  enableAnalysis?: boolean
}

export function useEmotionAnalysis({
  analysisInterval,
  enableAnalysis = true
}: UseEmotionAnalysisOptions = {}) {
  const config = getOptimizedConfig()
  const effectiveInterval = analysisInterval ?? config.emotionAnalysis.analysisInterval
  const [latestEmotions, setLatestEmotions] = useState<EmotionData | null>(null)
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([])
  const [insights, setInsights] = useState<string>('')
  const [facialExpression, setFacialExpression] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const analysisQueueRef = useRef<CapturedFrame[]>([])
  const isProcessingRef = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Analyze a single frame
  const analyzeFrame = useCallback(async (frame: CapturedFrame): Promise<EmotionAnalysisResult | null> => {
    if (!enableAnalysis) {
      return null
    }

    try {
      const base64Data = frame.dataUrl.split(',')[1]
      
      // キャッシュキーを生成
      const cacheKey = EmotionCache.generateFrameHash(base64Data)
      
      // キャッシュをチェック
      const cachedResult = emotionCache.get<EmotionAnalysisResult>(cacheKey)
      if (cachedResult) {
        console.log('Using cached emotion analysis result')
        return {
          ...cachedResult,
          emotions: {
            ...cachedResult.emotions,
            timestamp: frame.timestamp
          }
        }
      }
      
      const response = await fetch('/api/analyze-emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Data,
          mimeType: 'image/jpeg'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze emotion')
      }

      const result = await response.json()
      
      // 英語のレスポンスを日本語に翻訳
      const translated = translateEmotionAnalysis(
        result.facialExpression || '',
        result.insights || ''
      )
      
      const analysisResult: EmotionAnalysisResult = {
        emotions: {
          ...result.emotions,
          timestamp: frame.timestamp
        },
        insights: translated.insights,
        facialExpression: translated.facialExpression
      }
      
      // 結果をキャッシュに保存
      emotionCache.set(cacheKey, analysisResult)
      
      return analysisResult
    } catch (error) {
      console.error('Error analyzing frame:', error)
      setError(error instanceof Error ? error.message : 'Failed to analyze emotions')
      return null
    }
  }, [enableAnalysis])

  // Process analysis queue
  const processAnalysisQueue = useCallback(async () => {
    if (isProcessingRef.current || analysisQueueRef.current.length === 0) {
      return
    }

    isProcessingRef.current = true
    setIsAnalyzing(true)

    try {
      // Get the latest frame from queue
      const frame = analysisQueueRef.current.shift()
      if (!frame) {
        return
      }

      // Clear any older frames to avoid backlog
      if (analysisQueueRef.current.length > config.emotionAnalysis.maxQueueSize) {
        // Keep only the most recent frames
        analysisQueueRef.current = analysisQueueRef.current.slice(-config.emotionAnalysis.maxQueueSize)
      }

      const result = await analyzeFrame(frame)
      
      if (result) {
        setLatestEmotions(result.emotions)
        setInsights(result.insights)
        setFacialExpression(result.facialExpression)
        setError(null)
        
        // Update history (keep last 30 data points)
        setEmotionHistory(prev => {
          const updated = [...prev, result.emotions]
          return updated.slice(-30)
        })
      }
    } finally {
      isProcessingRef.current = false
      setIsAnalyzing(false)
    }
  }, [analyzeFrame])

  // Add frame to analysis queue
  const queueFrameForAnalysis = useCallback((frame: CapturedFrame) => {
    if (!enableAnalysis) {
      return
    }

    analysisQueueRef.current.push(frame)
  }, [enableAnalysis])

  // Start periodic processing of analysis queue
  useEffect(() => {
    if (enableAnalysis) {
      intervalRef.current = setInterval(() => {
        processAnalysisQueue()
      }, effectiveInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [enableAnalysis, effectiveInterval, processAnalysisQueue])

  // Reset state
  const reset = useCallback(() => {
    setLatestEmotions(null)
    setEmotionHistory([])
    setInsights('')
    setFacialExpression('')
    setError(null)
    analysisQueueRef.current = []
    isProcessingRef.current = false
  }, [])

  return {
    latestEmotions,
    emotionHistory,
    insights,
    facialExpression,
    isAnalyzing,
    error,
    queueFrameForAnalysis,
    reset
  }
}