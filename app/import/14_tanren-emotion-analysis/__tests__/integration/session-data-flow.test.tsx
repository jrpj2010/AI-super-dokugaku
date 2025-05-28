import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SessionProvider } from '@/contexts/session-context'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { AnalysisReport } from '@/components/analysis-report'
import { useRouter } from 'next/navigation'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

jest.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: () => ({
    stream: new MediaStream(),
    error: null,
    isLoading: false,
    startStream: jest.fn().mockResolvedValue(new MediaStream()),
    stopStream: jest.fn()
  })
}))

jest.mock('@/hooks/use-speech-recognition', () => ({
  useSpeechRecognition: () => ({
    transcript: 'テストの転写内容です。',
    interimTranscript: '',
    isListening: false,
    error: null,
    startListening: jest.fn(),
    stopListening: jest.fn()
  })
}))

jest.mock('@/hooks/use-video-frame-capture', () => ({
  useVideoFrameCapture: () => ({
    latestFrame: null,
    isCapturing: false
  })
}))

jest.mock('@/hooks/use-face-detection', () => ({
  useFaceDetection: () => ({
    landmarks: null,
    isLoading: false,
    error: null,
    isDetecting: false
  })
}))

jest.mock('@/hooks/use-emotion-analysis', () => ({
  useEmotionAnalysis: () => ({
    latestEmotions: {
      joy: 70,
      anger: 5,
      sadness: 10,
      surprise: 15,
      fear: 5,
      confidence: 75,
      confusion: 10,
      interest: 80
    },
    emotionHistory: [],
    insights: 'ポジティブな感情が優勢です',
    facialExpression: '笑顔',
    isAnalyzing: false,
    error: null,
    queueFrameForAnalysis: jest.fn(),
    reset: jest.fn()
  })
}))

describe('セッションデータフロー統合テスト', () => {
  const mockPush = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    })
    
    // localStorage のモック
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    })
  })

  test('録画からレポート表示までのデータフローが正しく動作する', async () => {
    const TestApp = () => {
      const [currentTab, setCurrentTab] = React.useState('dashboard')
      
      React.useEffect(() => {
        // mockPushが呼ばれたらタブを切り替える
        if (mockPush.mock.calls.length > 0) {
          const lastCall = mockPush.mock.calls[mockPush.mock.calls.length - 1][0]
          if (lastCall === '/?tab=report') {
            setCurrentTab('report')
          }
        }
      }, [mockPush.mock.calls.length])
      
      return (
        <SessionProvider>
          {currentTab === 'dashboard' ? <RealtimeDashboard /> : <AnalysisReport />}
        </SessionProvider>
      )
    }

    const { rerender } = render(<TestApp />)

    // 1. 開始ボタンをクリック
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)

    // 録画中の状態を確認
    await waitFor(() => {
      expect(screen.getByText('録画中')).toBeInTheDocument()
    })

    // 2. ストップボタンをクリック
    const stopButton = screen.getByRole('button', { name: /ストップ/i })
    await user.click(stopButton)

    // セッション終了後のボタンが表示されるまで待つ
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /分析処理を開始/i })).toBeInTheDocument()
    })

    // 3. 分析処理を開始ボタンをクリック
    const analyzeButton = screen.getByRole('button', { name: /分析処理を開始/i })
    await user.click(analyzeButton)

    // ルーターのpushが呼ばれたことを確認
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?tab=report')
    })

    // 4. レポート画面を再レンダリング
    rerender(<TestApp />)

    // レポート画面の要素が表示されることを確認
    await waitFor(() => {
      // ヘッダーが表示される
      expect(screen.getByText(/のあなたの状態/)).toBeInTheDocument()
      
      // セッション情報が表示される
      expect(screen.getByText('セッション情報')).toBeInTheDocument()
      
      // 感情統計が表示される
      expect(screen.getByText('感情統計')).toBeInTheDocument()
    })
  })

  test('セッションコンテキストを通じてデータが共有される', async () => {
    let sessionData: any = null
    
    const TestComponent = () => {
      const { currentSession } = React.useContext(require('@/contexts/session-context').SessionContext)
      
      React.useEffect(() => {
        sessionData = currentSession
      }, [currentSession])
      
      return (
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
    }

    render(<TestComponent />)

    // 開始ボタンをクリック
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)

    // 録画中の状態を確認
    await waitFor(() => {
      expect(screen.getByText('録画中')).toBeInTheDocument()
    })

    // ストップボタンをクリック
    const stopButton = screen.getByRole('button', { name: /ストップ/i })
    await user.click(stopButton)

    // セッションデータが設定されることを確認
    await waitFor(() => {
      expect(sessionData).toBeTruthy()
      expect(sessionData?.transcript).toBeDefined()
      expect(sessionData?.emotions).toBeDefined()
      expect(sessionData?.duration).toBeGreaterThan(0)
    })
  })
})