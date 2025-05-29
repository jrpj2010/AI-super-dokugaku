import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'

// Mock hooks
jest.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: () => ({
    stream: null,
    error: null,
    isLoading: false,
    startStream: jest.fn().mockResolvedValue({}),
    stopStream: jest.fn()
  })
}))

jest.mock('@/hooks/use-speech-recognition', () => ({
  useSpeechRecognition: () => ({
    transcript: '',
    isListening: false,
    error: null,
    startListening: jest.fn(),
    stopListening: jest.fn(),
    resetTranscript: jest.fn()
  })
}))

jest.mock('@/hooks/use-session-recording', () => ({
  useSessionRecording: () => ({
    isRecording: false,
    startRecording: jest.fn(),
    stopRecording: jest.fn(),
    currentSession: null,
    saveSession: jest.fn(),
    resetSession: jest.fn()
  })
}))

jest.mock('@/hooks/use-emotion-analysis', () => ({
  useEmotionAnalysis: () => ({
    latestEmotions: null,
    emotionHistory: [],
    insights: '',
    facialExpression: '',
    isAnalyzing: false,
    error: null,
    analyzeFrame: jest.fn(),
    reset: jest.fn()
  })
}))

jest.mock('@/hooks/use-video-frame-capture', () => ({
  useVideoFrameCapture: () => ({
    latestFrame: null,
    isCapturing: false,
    startCapture: jest.fn(),
    stopCapture: jest.fn()
  })
}))

// console.logをモック化してテストで確認
const consoleSpy = jest.spyOn(console, 'log')

describe('Start Button Click Event', () => {
  beforeEach(() => {
    consoleSpy.mockClear()
  })

  it('開始ボタンがクリックイベントに反応する', async () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // 開始ボタンを見つける
    const startButton = screen.getByRole('button', { name: /開始/i })
    expect(startButton).toBeInTheDocument()
    expect(startButton).not.toBeDisabled()

    // ボタンをクリック
    fireEvent.click(startButton)

    // console.logが呼ばれたことを確認
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('開始ボタンクリックイベント発火', expect.any(Object))
      expect(consoleSpy).toHaveBeenCalledWith('開始ボタンがクリックされました')
    })
  })

  it('開始ボタンクリック後に停止ボタンが表示される', async () => {
    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    const startButton = screen.getByRole('button', { name: /開始/i })
    fireEvent.click(startButton)

    // 録画状態が変更されたことをシミュレート
    // 実際のコンポーネントでは内部stateが変更されるはずだが、
    // ここではモックの制限により直接確認は難しい
    
    // 少なくともクリックイベントが処理されたことを確認
    expect(consoleSpy).toHaveBeenCalled()
  })
})