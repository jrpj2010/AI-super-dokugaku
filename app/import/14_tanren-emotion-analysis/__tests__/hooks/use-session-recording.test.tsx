import React from 'react'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useSessionRecording } from '@/hooks/use-session-recording'

// fetchのモック
global.fetch = jest.fn()

// MediaRecorderのモック
class MockMediaRecorder {
  state: string = 'inactive'
  ondataavailable: ((event: any) => void) | null = null
  onstop: (() => void) | null = null
  
  constructor(public stream: MediaStream, public options?: any) {}
  
  start(timeslice?: number) {
    this.state = 'recording'
    // データを定期的に発生させる
    setTimeout(() => {
      if (this.ondataavailable) {
        this.ondataavailable({ data: new Blob(['test data'], { type: 'video/webm' }) })
      }
    }, 100)
  }
  
  stop() {
    this.state = 'inactive'
    if (this.onstop) {
      this.onstop()
    }
  }
}

// @ts-ignore
global.MediaRecorder = MockMediaRecorder
// @ts-ignore
global.MediaRecorder.isTypeSupported = jest.fn(() => true)

// MediaStreamのモック
class MockMediaStream {
  constructor() {}
}

describe('useSessionRecording', () => {
  let mockStream: MediaStream

  beforeEach(() => {
    jest.clearAllMocks()
    mockStream = new MockMediaStream() as any
  })

  describe('録画機能', () => {
    it('録画を開始できる', async () => {
      const { result } = renderHook(() => useSessionRecording())

      expect(result.current.isRecording).toBe(false)
      expect(result.current.recordingDuration).toBe(0)

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      expect(result.current.isRecording).toBe(true)
      expect(result.current.currentSession).toBeTruthy()
      expect(result.current.currentSession?.id).toMatch(/^session_\d+$/)
    })

    it('録画を停止できる', async () => {
      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      expect(result.current.isRecording).toBe(true)

      await act(async () => {
        result.current.stopRecording()
      })

      expect(result.current.isRecording).toBe(false)
      
      // ビデオBlobが作成されるまで待つ
      await waitFor(() => {
        expect(result.current.currentSession?.videoBlob).toBeTruthy()
      })
    })

    it('録画時間が正しくカウントされる', async () => {
      const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }))

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      // 1秒待つ
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1100))
      })

      expect(result.current.recordingDuration).toBeGreaterThanOrEqual(1)
    })

    it('最大録画時間で自動停止する', async () => {
      const { result } = renderHook(() => useSessionRecording({ maxDuration: 2 }))

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      expect(result.current.isRecording).toBe(true)

      // 2秒以上待つ
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 2100))
      })

      expect(result.current.isRecording).toBe(false)
    })
  })

  describe('感情データ管理', () => {
    it('感情データを追加できる', async () => {
      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      const emotionData = {
        timestamp: Date.now(),
        emotions: {
          joy: 80,
          anger: 10,
          sadness: 5,
          surprise: 20,
          fear: 5,
          confidence: 75,
          confusion: 10,
          interest: 85
        },
        facialExpression: '笑顔',
        insight: 'ポジティブな感情が支配的'
      }

      act(() => {
        result.current.addEmotionData(emotionData)
      })

      expect(result.current.currentSession?.emotions).toHaveLength(1)
      expect(result.current.currentSession?.emotions[0]).toEqual(emotionData)
      expect(result.current.currentSession?.insights).toContain('ポジティブな感情が支配的')
    })

    it('文字起こしを更新できる', async () => {
      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      const transcript = 'これはテストの文字起こしです。'

      act(() => {
        result.current.updateTranscript(transcript)
      })

      expect(result.current.currentSession?.transcript).toBe(transcript)
    })
  })

  describe('セッション保存機能', () => {
    it('セッションをサーバーに保存できる', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, sessionId: 'session_123' })
      })

      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      act(() => {
        result.current.updateTranscript('テスト')
      })

      let saveResult: any
      await act(async () => {
        saveResult = await result.current.saveSession()
      })

      expect(saveResult.success).toBe(true)
      expect(saveResult.sessionId).toBe('session_123')
      expect(fetch).toHaveBeenCalledWith('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.current.currentSession)
      })
    })

    it('セッション保存エラーを処理できる', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      let saveResult: any
      await act(async () => {
        saveResult = await result.current.saveSession()
      })

      expect(saveResult.success).toBe(false)
      expect(saveResult.error).toBe('Network error')
    })

    it('セッションがない場合は保存できない', async () => {
      const { result } = renderHook(() => useSessionRecording())

      let saveResult: any
      await act(async () => {
        saveResult = await result.current.saveSession()
      })

      expect(saveResult.success).toBe(false)
      expect(saveResult.error).toBe('No session to save')
    })
  })

  describe('セッション一覧取得', () => {
    it('保存されたセッション一覧を取得できる', async () => {
      const mockSessions = [
        { id: 'session_001', startTime: new Date(), transcript: 'セッション1' },
        { id: 'session_002', startTime: new Date(), transcript: 'セッション2' }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ sessions: mockSessions })
      })

      const { result } = renderHook(() => useSessionRecording())

      let loadResult: any
      await act(async () => {
        loadResult = await result.current.loadSessions()
      })

      expect(loadResult.success).toBe(true)
      expect(loadResult.sessions).toEqual(mockSessions)
      expect(fetch).toHaveBeenCalledWith('/api/sessions')
    })
  })

  describe('ビデオ管理', () => {
    it('ビデオURLを取得できる', async () => {
      // URL.createObjectURLのモック
      global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/123')

      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      await act(async () => {
        result.current.stopRecording()
      })

      // ビデオBlobが作成されるまで待つ
      await waitFor(() => {
        expect(result.current.currentSession?.videoBlob).toBeTruthy()
      })

      const videoUrl = result.current.getVideoUrl()
      expect(videoUrl).toBe('blob:http://localhost/123')
    })

    it('セッションデータをJSONエクスポートできる', async () => {
      const { result } = renderHook(() => useSessionRecording())

      await act(async () => {
        result.current.startRecording(mockStream)
      })

      act(() => {
        result.current.updateTranscript('エクスポートテスト')
      })

      const exportedData = result.current.exportSessionData()
      expect(exportedData).toBeTruthy()

      const parsed = JSON.parse(exportedData!)
      expect(parsed.transcript).toBe('エクスポートテスト')
      expect(parsed.videoBlob).toBeUndefined() // videoBlobは除外される
    })
  })
})