import { renderHook, act, waitFor } from '@testing-library/react'
import { useEmotionAnalysis } from '@/hooks/use-emotion-analysis'
import { getOptimizedConfig } from '@/lib/performance-config'

// Mock modules
jest.mock('@/lib/performance-config')
jest.mock('@/lib/translation', () => ({
  translateEmotionAnalysis: jest.fn((facial, insights) => ({
    facialExpression: `翻訳済み: ${facial}`,
    insights: `翻訳済み: ${insights}`
  }))
}))

// Mock fetch
global.fetch = jest.fn()

describe('Real-time Update Frequency', () => {
  const mockFrame = {
    dataUrl: 'data:image/jpeg;base64,test',
    timestamp: Date.now()
  }

  const mockApiResponse = {
    emotions: {
      joy: 80,
      anger: 10,
      sadness: 5,
      surprise: 15,
      fear: 5,
      confidence: 75,
      confusion: 10,
      interest: 85
    },
    facialExpression: 'Smiling with confidence',
    insights: 'The person appears engaged and happy'
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    
    // Mock performance config
    ;(getOptimizedConfig as jest.Mock).mockReturnValue({
      emotionAnalysis: {
        analysisInterval: 1000, // 1秒
        maxQueueSize: 5
      }
    })

    // Mock successful API response
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should process frames at the configured interval', async () => {
    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: true }))

    // フレームをキューに追加
    act(() => {
      result.current.queueFrameForAnalysis(mockFrame)
    })

    // 初回の処理を待つ
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    // 2つ目のフレームを追加
    act(() => {
      result.current.queueFrameForAnalysis({
        ...mockFrame,
        timestamp: Date.now() + 1000
      })
    })

    // 次の処理間隔を待つ
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  it('should update emotions with translated text', async () => {
    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: true }))

    act(() => {
      result.current.queueFrameForAnalysis(mockFrame)
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(result.current.latestEmotions).toBeTruthy()
      expect(result.current.facialExpression).toBe('翻訳済み: Smiling with confidence')
      expect(result.current.insights).toBe('翻訳済み: The person appears engaged and happy')
    })
  })

  it('should handle rapid frame updates without overwhelming the queue', async () => {
    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: true }))

    // 急速に10フレームを追加
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.queueFrameForAnalysis({
          ...mockFrame,
          timestamp: Date.now() + i * 100
        })
      }
    })

    // 処理間隔を進める
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      // キューサイズ制限により、API呼び出しは1回のみ
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    // さらに時間を進める
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    await waitFor(() => {
      // キューにあるフレームが順次処理される
      expect(global.fetch).toHaveBeenCalledTimes(6)
    })
  })

  it('should not process frames when analysis is disabled', async () => {
    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: false }))

    act(() => {
      result.current.queueFrameForAnalysis(mockFrame)
    })

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled()
      expect(result.current.latestEmotions).toBeNull()
    })
  })

  it('should maintain emotion history with proper size limit', async () => {
    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: true }))

    // 複数のフレームを処理
    for (let i = 0; i < 5; i++) {
      act(() => {
        result.current.queueFrameForAnalysis({
          ...mockFrame,
          timestamp: Date.now() + i * 1000
        })
      })

      act(() => {
        jest.advanceTimersByTime(1000)
      })

      await waitFor(() => {
        expect(result.current.emotionHistory).toHaveLength(Math.min(i + 1, 30))
      })
    }
  })

  it('should handle API errors gracefully', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: true }))

    act(() => {
      result.current.queueFrameForAnalysis(mockFrame)
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(result.current.error).toBe('Network error')
      expect(result.current.latestEmotions).toBeNull()
    })
  })

  it('should use custom analysis interval', async () => {
    const customInterval = 500 // 0.5秒
    const { result } = renderHook(() => 
      useEmotionAnalysis({ 
        enableAnalysis: true,
        analysisInterval: customInterval 
      })
    )

    act(() => {
      result.current.queueFrameForAnalysis(mockFrame)
    })

    // カスタム間隔の半分の時間では処理されない
    act(() => {
      jest.advanceTimersByTime(250)
    })

    expect(global.fetch).not.toHaveBeenCalled()

    // カスタム間隔まで進める
    act(() => {
      jest.advanceTimersByTime(250)
    })

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })

  it('should reset state correctly', async () => {
    const { result } = renderHook(() => useEmotionAnalysis({ enableAnalysis: true }))

    // いくつかの処理を実行
    act(() => {
      result.current.queueFrameForAnalysis(mockFrame)
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(result.current.latestEmotions).toBeTruthy()
    })

    // リセット
    act(() => {
      result.current.reset()
    })

    expect(result.current.latestEmotions).toBeNull()
    expect(result.current.emotionHistory).toHaveLength(0)
    expect(result.current.insights).toBe('')
    expect(result.current.facialExpression).toBe('')
    expect(result.current.error).toBeNull()
  })
})