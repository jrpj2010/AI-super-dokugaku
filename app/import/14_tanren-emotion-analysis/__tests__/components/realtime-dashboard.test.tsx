import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock child components
jest.mock('@/components/emotion-radar-chart', () => ({
  __esModule: true,
  default: ({ data }: any) => <div data-testid="emotion-radar-chart" data-emotion={JSON.stringify(data)} />,
}))

jest.mock('@/components/emotion-trend-chart', () => ({
  __esModule: true,
  default: ({ data }: any) => <div data-testid="emotion-trend-chart" data-length={data?.length || 0} />,
}))

jest.mock('@/components/face-metrics-gauge', () => ({
  __esModule: true,
  default: ({ data }: any) => <div data-testid="face-metrics-gauge" data-metrics={JSON.stringify(data)} />,
}))

jest.mock('@/components/face-map-visualization', () => ({
  __esModule: true,
  default: () => <div data-testid="face-map-visualization" />,
}))

jest.mock('@/components/audio-visualizer', () => ({
  __esModule: true,
  default: ({ isActive }: any) => <div data-testid="audio-visualizer" data-active={isActive} />,
}))

// Test wrapper with SessionProvider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
)

describe('RealtimeDashboard', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('should render all main sections', () => {
    render(
      <TestWrapper>
        <RealtimeDashboard />
      </TestWrapper>
    )
    
    // Header
    expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument()
    expect(screen.getByText('1分ほどお話をしてください')).toBeInTheDocument()
    
    // Components
    expect(screen.getByTestId('emotion-radar-chart')).toBeInTheDocument()
    expect(screen.getByTestId('emotion-trend-chart')).toBeInTheDocument()
    expect(screen.getByTestId('face-metrics-gauge')).toBeInTheDocument()
    expect(screen.getByTestId('face-map-visualization')).toBeInTheDocument()
    expect(screen.getByTestId('audio-visualizer')).toBeInTheDocument()
    
    // Cards
    expect(screen.getByText('感情の変化')).toBeInTheDocument()
    expect(screen.getByText('感情の変化をリアルタイムに推定')).toBeInTheDocument()
    expect(screen.getByText('視線 / 顔の動き')).toBeInTheDocument()
    expect(screen.getByText('フェイスマップ')).toBeInTheDocument()
    expect(screen.getByText('発話内容')).toBeInTheDocument()
  })

  it('should show start button initially', () => {
    render(
      <TestWrapper>
        <RealtimeDashboard />
      </TestWrapper>
    )
    
    const startButton = screen.getByRole('button', { name: /開始/i })
    expect(startButton).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /ストップ/i })).not.toBeInTheDocument()
  })

  it('should start recording when start button is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    // Check if stop button appears
    expect(screen.getByRole('button', { name: /ストップ/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /開始/i })).not.toBeInTheDocument()
    
    // Check if audio visualizer is active
    const audioVisualizer = screen.getByTestId('audio-visualizer')
    expect(audioVisualizer).toHaveAttribute('data-active', 'true')
  })

  it('should update recording time during recording', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    // Fast-forward time
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      expect(screen.getByText('0:03')).toBeInTheDocument()
    })
  })

  it('should update emotion data during recording', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    jest.advanceTimersByTime(1000)
    
    await waitFor(() => {
      const emotionRadar = screen.getByTestId('emotion-radar-chart')
      const emotionData = emotionRadar.getAttribute('data-emotion')
      expect(emotionData).toBeTruthy()
      expect(emotionData).not.toBe('null')
    })
  })

  it('should update sentiment history during recording', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    jest.advanceTimersByTime(3000)
    
    await waitFor(() => {
      const trendChart = screen.getByTestId('emotion-trend-chart')
      const dataLength = trendChart.getAttribute('data-length')
      expect(Number(dataLength)).toBeGreaterThan(0)
    })
  })

  it('should generate transcription during recording', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    jest.advanceTimersByTime(5000)
    
    await waitFor(() => {
      const transcriptionText = screen.getByText((content, element) => {
        return element?.className === 'text-gray-700 leading-relaxed' && content.includes('こんにちは')
      })
      expect(transcriptionText).toBeInTheDocument()
    })
  })

  it('should stop recording when stop button is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    // Start recording
    const startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    // Stop recording
    const stopButton = screen.getByRole('button', { name: /ストップ/i })
    await user.click(stopButton)
    
    // Check if start button reappears
    expect(screen.getByRole('button', { name: /開始/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /ストップ/i })).not.toBeInTheDocument()
    
    // Check if audio visualizer is inactive
    const audioVisualizer = screen.getByTestId('audio-visualizer')
    expect(audioVisualizer).toHaveAttribute('data-active', 'false')
  })

  it('should reset data when starting a new recording', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TestWrapper><RealtimeDashboard /></TestWrapper>)
    
    // First recording
    let startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    jest.advanceTimersByTime(5000)
    
    // Stop recording
    const stopButton = screen.getByRole('button', { name: /ストップ/i })
    await user.click(stopButton)
    
    // Start new recording
    startButton = screen.getByRole('button', { name: /開始/i })
    await user.click(startButton)
    
    await waitFor(() => {
      expect(screen.getByText('0:00')).toBeInTheDocument()
      const trendChart = screen.getByTestId('emotion-trend-chart')
      expect(trendChart.getAttribute('data-length')).toBe('0')
    })
  })
})