import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import RealtimeDashboard from '../realtime-dashboard'
import { useRouter } from 'next/navigation'

// モックの設定
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: vi.fn()
}))

vi.mock('@/hooks/use-speech-recognition', () => ({
  useSpeechRecognition: vi.fn()
}))

vi.mock('@/hooks/use-video-frame-capture', () => ({
  useVideoFrameCapture: vi.fn()
}))

vi.mock('@/hooks/use-emotion-analysis', () => ({
  useEmotionAnalysis: vi.fn()
}))

vi.mock('@/hooks/use-session-recording', () => ({
  useSessionRecording: vi.fn()
}))

vi.mock('@/contexts/session-context', () => ({
  useSessionContext: vi.fn()
}))

// コンポーネントのモック
vi.mock('@/components/emotion-radar-chart', () => ({
  default: () => <div data-testid="emotion-radar-chart">EmotionRadarChart</div>
}))

vi.mock('@/components/emotion-trend-chart', () => ({
  default: () => <div data-testid="emotion-trend-chart">EmotionTrendChart</div>
}))

vi.mock('@/components/face-metrics-gauge', () => ({
  default: () => <div data-testid="face-metrics-gauge">FaceMetricsGauge</div>
}))

vi.mock('@/components/face-map-visualization', () => ({
  default: () => <div data-testid="face-map-visualization">FaceMapVisualization</div>
}))

vi.mock('@/components/audio-visualizer', () => ({
  default: () => <div data-testid="audio-visualizer">AudioVisualizer</div>
}))

vi.mock('@/components/video-stream', () => ({
  default: ({ error }: { error: any }) => (
    <div data-testid="video-stream">
      VideoStream
      {error && <div data-testid="video-stream-error">{error.message}</div>}
    </div>
  )
}))

vi.mock('@/components/transcript-area', () => ({
  default: () => <div data-testid="transcript-area">TranscriptArea</div>
}))

vi.mock('@/components/video-playback-modal', () => ({
  default: () => <div data-testid="video-playback-modal">VideoPlaybackModal</div>
}))

describe('RealtimeDashboard', () => {
  const mockPush = vi.fn()
  const mockStartStream = vi.fn()
  const mockStopStream = vi.fn()
  const mockStartListening = vi.fn()
  const mockStopListening = vi.fn()
  const mockStartSessionRecording = vi.fn()
  const mockStopSessionRecording = vi.fn()
  const mockSaveSession = vi.fn()
  const mockSetGlobalSession = vi.fn()
  const mockResetEmotions = vi.fn()
  const mockResetSession = vi.fn()
  
  // window.alert のモック
  const originalAlert = window.alert
  beforeAll(() => {
    window.alert = vi.fn()
  })
  
  afterAll(() => {
    window.alert = originalAlert
  })

  const defaultMocks = {
    useRouter: { push: mockPush },
    useMediaStream: {
      stream: null,
      error: null,
      isLoading: false,
      startStream: mockStartStream,
      stopStream: mockStopStream
    },
    useSpeechRecognition: {
      transcript: '',
      interimTranscript: '',
      isListening: false,
      error: null,
      startListening: mockStartListening,
      stopListening: mockStopListening
    },
    useVideoFrameCapture: {
      latestFrame: null,
      isCapturing: false
    },
    useEmotionAnalysis: {
      latestEmotions: null,
      emotionHistory: [],
      insights: null,
      facialExpression: null,
      isAnalyzing: false,
      error: null,
      queueFrameForAnalysis: vi.fn(),
      reset: mockResetEmotions
    },
    useSessionRecording: {
      isRecording: false,
      recordingDuration: 0,
      currentSession: null,
      startRecording: mockStartSessionRecording,
      stopRecording: mockStopSessionRecording,
      addEmotionData: vi.fn(),
      updateTranscript: vi.fn(),
      getVideoUrl: vi.fn(),
      downloadVideo: vi.fn(),
      exportSessionData: vi.fn(),
      resetSession: mockResetSession,
      saveSession: mockSaveSession,
      loadSessions: vi.fn()
    },
    useSessionContext: {
      setCurrentSession: mockSetGlobalSession
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as any).mockReturnValue(defaultMocks.useRouter)
    
    const { useMediaStream } = require('@/hooks/use-media-stream')
    const { useSpeechRecognition } = require('@/hooks/use-speech-recognition')
    const { useVideoFrameCapture } = require('@/hooks/use-video-frame-capture')
    const { useEmotionAnalysis } = require('@/hooks/use-emotion-analysis')
    const { useSessionRecording } = require('@/hooks/use-session-recording')
    const { useSessionContext } = require('@/contexts/session-context')
    
    useMediaStream.mockReturnValue(defaultMocks.useMediaStream)
    useSpeechRecognition.mockReturnValue(defaultMocks.useSpeechRecognition)
    useVideoFrameCapture.mockReturnValue(defaultMocks.useVideoFrameCapture)
    useEmotionAnalysis.mockReturnValue(defaultMocks.useEmotionAnalysis)
    useSessionRecording.mockReturnValue(defaultMocks.useSessionRecording)
    useSessionContext.mockReturnValue(defaultMocks.useSessionContext)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('初期状態で正しくレンダリングされる', () => {
    render(<RealtimeDashboard />)
    
    expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument()
    expect(screen.getByText('1分ほどお話をしてください')).toBeInTheDocument()
    expect(screen.getByText('開始')).toBeInTheDocument()
    expect(screen.getByText('開始').closest('button')).not.toBeDisabled()
  })

  describe('録画開始時のエラーハンドリング', () => {
    it('権限エラーが発生した場合、適切なメッセージを表示する', async () => {
      const { useMediaStream } = require('@/hooks/use-media-stream')
      useMediaStream.mockReturnValue({
        ...defaultMocks.useMediaStream,
        error: {
          type: 'permission',
          message: 'カメラとマイクへのアクセスが許可されていません。ブラウザの設定を確認してください。'
        }
      })
      
      mockStartStream.mockResolvedValue(null)
      
      render(<RealtimeDashboard />)
      
      const startButton = screen.getByText('開始')
      fireEvent.click(startButton)
      
      await waitFor(() => {
        expect(mockStartStream).toHaveBeenCalled()
      })
      
      // アラートが表示されることを確認
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('カメラとマイクへのアクセスが拒否されました'))
    })

    it('デバイスが見つからない場合、適切なメッセージを表示する', async () => {
      const { useMediaStream } = require('@/hooks/use-media-stream')
      useMediaStream.mockReturnValue({
        ...defaultMocks.useMediaStream,
        error: {
          type: 'notFound',
          message: 'カメラまたはマイクが見つかりません。デバイスが接続されているか確認してください。'
        }
      })
      
      mockStartStream.mockResolvedValue(null)
      
      render(<RealtimeDashboard />)
      
      const startButton = screen.getByText('開始')
      fireEvent.click(startButton)
      
      await waitFor(() => {
        expect(mockStartStream).toHaveBeenCalled()
      })
      
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('カメラまたはマイクが見つかりません'))
    })

    it('MediaRecorderの初期化エラーが発生した場合、適切に処理される', async () => {
      const mockStream = { id: 'test-stream' }
      mockStartStream.mockResolvedValue(mockStream)
      mockStartSessionRecording.mockImplementation(() => {
        throw new Error('MediaRecorder is not supported')
      })
      
      render(<RealtimeDashboard />)
      
      const startButton = screen.getByText('開始')
      fireEvent.click(startButton)
      
      await waitFor(() => {
        expect(mockStartStream).toHaveBeenCalled()
        expect(mockStartSessionRecording).toHaveBeenCalledWith(mockStream)
        expect(mockStopStream).toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('MediaRecorder is not supported'))
      })
    })

    it('録画開始が成功した場合、isRecordingがtrueになる', async () => {
      const mockStream = { id: 'test-stream' }
      mockStartStream.mockResolvedValue(mockStream)
      
      const { rerender } = render(<RealtimeDashboard />)
      
      const startButton = screen.getByText('開始')
      fireEvent.click(startButton)
      
      await waitFor(() => {
        expect(mockStartStream).toHaveBeenCalled()
        expect(mockStartSessionRecording).toHaveBeenCalledWith(mockStream)
        expect(mockStartListening).toHaveBeenCalled()
      })
      
      // 録画中の状態を確認するため、モックを更新して再レンダリング
      const { useSessionRecording } = require('@/hooks/use-session-recording')
      useSessionRecording.mockReturnValue({
        ...defaultMocks.useSessionRecording,
        isRecording: true,
        recordingDuration: 5
      })
      
      rerender(<RealtimeDashboard />)
      
      // ストップボタンが表示されることを確認
      expect(screen.getByText('ストップ')).toBeInTheDocument()
    })
  })

  describe('録画停止時のエラーハンドリング', () => {
    it('録画停止時にエラーが発生しても、状態が正しくリセットされる', async () => {
      mockStopSessionRecording.mockImplementation(() => {
        throw new Error('Stop recording failed')
      })
      
      // 録画中の状態を設定
      const { useSessionRecording } = require('@/hooks/use-session-recording')
      useSessionRecording.mockReturnValue({
        ...defaultMocks.useSessionRecording,
        isRecording: true,
        recordingDuration: 10,
        currentSession: { id: 'test-session' }
      })
      
      render(<RealtimeDashboard />)
      
      const stopButton = screen.getByText('ストップ')
      fireEvent.click(stopButton)
      
      await waitFor(() => {
        expect(mockStopListening).toHaveBeenCalled()
        expect(mockStopSessionRecording).toHaveBeenCalled()
        expect(mockStopStream).toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('録画の停止中にエラーが発生しました'))
      })
    })

    it('セッション保存が成功した場合、グローバルコンテキストに設定される', async () => {
      const mockSession = {
        id: 'test-session',
        duration: 30,
        emotions: [],
        transcript: 'Test transcript',
        videoBlob: new Blob()
      }
      
      mockSaveSession.mockResolvedValue({
        success: true,
        sessionId: 'test-session'
      })
      
      // 録画中の状態を設定
      const { useSessionRecording } = require('@/hooks/use-session-recording')
      useSessionRecording.mockReturnValue({
        ...defaultMocks.useSessionRecording,
        isRecording: true,
        recordingDuration: 30,
        currentSession: mockSession
      })
      
      render(<RealtimeDashboard />)
      
      const stopButton = screen.getByText('ストップ')
      fireEvent.click(stopButton)
      
      await waitFor(() => {
        expect(mockSaveSession).toHaveBeenCalled()
        expect(mockSetGlobalSession).toHaveBeenCalledWith(mockSession)
      })
    })
  })

  describe('UIフィードバック', () => {
    it('ローディング中は適切な表示がされる', () => {
      const { useMediaStream } = require('@/hooks/use-media-stream')
      useMediaStream.mockReturnValue({
        ...defaultMocks.useMediaStream,
        isLoading: true
      })
      
      render(<RealtimeDashboard />)
      
      const startButton = screen.getByText('準備中...')
      expect(startButton.closest('button')).toBeDisabled()
    })

    it('メディアエラーが発生した場合、ビデオストリーム上にエラーメッセージが表示される', () => {
      const { useMediaStream } = require('@/hooks/use-media-stream')
      useMediaStream.mockReturnValue({
        ...defaultMocks.useMediaStream,
        error: {
          type: 'permission',
          message: 'カメラとマイクへのアクセスが許可されていません。'
        }
      })
      
      render(<RealtimeDashboard />)
      
      expect(screen.getByText('📷 カメラとマイクの許可が必要です')).toBeInTheDocument()
      expect(screen.getByText('カメラとマイクへのアクセスが許可されていません。')).toBeInTheDocument()
    })

    it('感情分析中はインジケーターが表示される', () => {
      const { useEmotionAnalysis } = require('@/hooks/use-emotion-analysis')
      useEmotionAnalysis.mockReturnValue({
        ...defaultMocks.useEmotionAnalysis,
        isAnalyzing: true
      })
      
      render(<RealtimeDashboard />)
      
      expect(screen.getByText('分析中')).toBeInTheDocument()
    })
  })
})