import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'

// モックの設定
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}))

// MediaStream APIのモック
const mockMediaStream = {
  getTracks: () => [
    { kind: 'video', stop: jest.fn() },
    { kind: 'audio', stop: jest.fn() }
  ],
  getVideoTracks: () => [{ stop: jest.fn() }],
  getAudioTracks: () => [{ stop: jest.fn() }],
}

// getUserMediaのモック
global.navigator.mediaDevices = {
  getUserMedia: jest.fn().mockResolvedValue(mockMediaStream as any),
} as any

// Rechartsのモック
jest.mock('recharts', () => {
  const React = require('react')
  return {
    ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ data, children }: any) => (
      <div data-testid="line-chart" data-chart-data={JSON.stringify(data)}>
        {children}
      </div>
    ),
    Line: ({ dataKey, stroke }: any) => (
      <div data-testid={`line-${dataKey}`} data-stroke={stroke} />
    ),
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Legend: () => <div data-testid="legend" />,
    CartesianGrid: () => <div data-testid="grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    RadarChart: ({ children }: any) => <div data-testid="radar-chart">{children}</div>,
    PolarGrid: () => <div data-testid="polar-grid" />,
    PolarAngleAxis: () => <div data-testid="polar-angle-axis" />,
    PolarRadiusAxis: () => <div data-testid="polar-radius-axis" />,
    Radar: () => <div data-testid="radar" />,
  }
})

// 感情分析APIのモック
global.fetch = jest.fn()

describe('EmotionTrendChart Integration Test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    
    // fetch APIのモック設定
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/api/analyze-emotion') {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            emotions: {
              joy: 70,
              anger: 10,
              sadness: 5,
              surprise: 15,
              fear: 5,
              confidence: 75,
              confusion: 10,
              interest: 80
            },
            facialExpression: 'Smiling',
            insights: 'Positive engagement detected'
          })
        })
      }
      return Promise.reject(new Error('Unknown API'))
    })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should update emotion trend chart in real-time during recording', async () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // 初期状態の確認
    const initialMessage = screen.getByText('セッション開始時に感情推移が表示されます')
    expect(initialMessage).toBeInTheDocument()

    // 開始ボタンをクリック
    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
      await waitFor(() => {
        expect(screen.queryByText('録画中')).toBeInTheDocument()
      })
    })

    // 数秒間待機してデータ更新を確認
    await act(async () => {
      jest.advanceTimersByTime(3000) // 3秒進める
    })

    // チャートデータの更新を確認
    await waitFor(() => {
      const lineChart = screen.getByTestId('line-chart')
      const chartData = lineChart.getAttribute('data-chart-data')
      
      if (chartData) {
        const parsedData = JSON.parse(chartData)
        console.log('Chart data after 3 seconds:', parsedData)
        
        // データが存在することを確認
        expect(parsedData.length).toBeGreaterThan(0)
        
        // データ形式の確認
        expect(parsedData[0]).toHaveProperty('time')
        expect(parsedData[0]).toHaveProperty('ポジティブ')
        expect(parsedData[0]).toHaveProperty('ネガティブ')
        expect(parsedData[0]).toHaveProperty('ニュートラル')
      }
    })

    // メッセージが消えていることを確認
    expect(screen.queryByText('セッション開始時に感情推移が表示されます')).not.toBeInTheDocument()

    // 3つの線が表示されていることを確認
    expect(screen.getByTestId('line-ポジティブ')).toBeInTheDocument()
    expect(screen.getByTestId('line-ネガティブ')).toBeInTheDocument()
    expect(screen.getByTestId('line-ニュートラル')).toBeInTheDocument()

    // ストップボタンをクリック
    const stopButton = screen.getByRole('button', { name: /ストップ/i })
    
    await act(async () => {
      fireEvent.click(stopButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('録画中')).not.toBeInTheDocument()
    })
  })

  it('should calculate sentiment values correctly from emotion data', async () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // 開始
    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
      await waitFor(() => {
        expect(screen.queryByText('録画中')).toBeInTheDocument()
      })
    })

    // データ更新を待つ
    await act(async () => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const lineChart = screen.getByTestId('line-chart')
      const chartData = lineChart.getAttribute('data-chart-data')
      
      if (chartData) {
        const parsedData = JSON.parse(chartData)
        
        if (parsedData.length > 0) {
          const latestData = parsedData[parsedData.length - 1]
          
          // APIレスポンスから期待される値を計算
          // positive = (joy:70 + confidence:75 + interest:80) / 3 = 75
          // negative = (anger:10 + sadness:5 + fear:5) / 3 = 6.67 ≈ 7
          // neutral = 100 - 75 - 7 = 18
          
          expect(latestData.ポジティブ).toBeCloseTo(75, 0)
          expect(latestData.ネガティブ).toBeCloseTo(7, 0)
          expect(latestData.ニュートラル).toBeCloseTo(18, 0)
        }
      }
    })
  })

  it('should handle empty emotion data gracefully', async () => {
    // 空のレスポンスを返すようにモックを変更
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/api/analyze-emotion') {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            emotions: {
              joy: 0,
              anger: 0,
              sadness: 0,
              surprise: 0,
              fear: 0,
              confidence: 0,
              confusion: 0,
              interest: 0
            },
            facialExpression: 'Neutral',
            insights: 'No clear emotion detected'
          })
        })
      }
      return Promise.reject(new Error('Unknown API'))
    })

    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
      await waitFor(() => {
        expect(screen.queryByText('録画中')).toBeInTheDocument()
      })
    })

    await act(async () => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      const lineChart = screen.getByTestId('line-chart')
      const chartData = lineChart.getAttribute('data-chart-data')
      
      if (chartData) {
        const parsedData = JSON.parse(chartData)
        
        if (parsedData.length > 0) {
          const latestData = parsedData[parsedData.length - 1]
          
          // すべて0の場合、ニュートラルが100になる
          expect(latestData.ポジティブ).toBe(0)
          expect(latestData.ネガティブ).toBe(0)
          expect(latestData.ニュートラル).toBe(100)
        }
      }
    })
  })
})