import React from 'react'
import { render, screen } from '@testing-library/react'
import { AnalysisReport } from '@/components/analysis-report'
import { SessionProvider, useSessionContext } from '@/contexts/session-context'
import { useSessionRecording } from '@/hooks/use-session-recording'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

// Mock the hooks
jest.mock('@/hooks/use-session-recording')
jest.mock('@/contexts/session-context', () => ({
  ...jest.requireActual('@/contexts/session-context'),
  useSessionContext: jest.fn()
}))

const mockUseSessionRecording = useSessionRecording as jest.MockedFunction<typeof useSessionRecording>
const mockUseSessionContext = useSessionContext as jest.MockedFunction<typeof useSessionContext>

describe('AnalysisReport with SessionContext', () => {
  const mockSessionData = {
    id: 'session_123456789',
    startTime: new Date('2025-05-29T10:30:00'),
    endTime: new Date('2025-05-29T10:31:58'),
    duration: 118, // 1分58秒
    transcript: 'これはテストセッションの転写内容です。',
    emotions: [
      {
        timestamp: Date.now(),
        emotions: {
          joy: 75,
          anger: 5,
          sadness: 10,
          surprise: 20,
          fear: 5,
          confidence: 80,
          confusion: 15,
          interest: 85
        },
        facialExpression: '笑顔で自信に満ちた表情',
        insight: '話者は非常にポジティブで自信に満ちています'
      },
      {
        timestamp: Date.now() + 5000,
        emotions: {
          joy: 70,
          anger: 8,
          sadness: 12,
          surprise: 25,
          fear: 8,
          confidence: 75,
          confusion: 20,
          interest: 80
        },
        facialExpression: '集中した真剣な表情',
        insight: '話者は集中して真剣に話しています'
      }
    ],
    insights: [
      '全体的にポジティブな感情が優勢です',
      '高い自信と興味を示しています'
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()
    
    // デフォルトのモック実装
    mockUseSessionRecording.mockReturnValue({
      isRecording: false,
      recordingDuration: 0,
      currentSession: null,
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
      addEmotionData: jest.fn(),
      updateTranscript: jest.fn(),
      getVideoUrl: jest.fn(),
      downloadVideo: jest.fn(),
      exportSessionData: jest.fn(),
      resetSession: jest.fn(),
      saveSession: jest.fn(),
      loadSessions: jest.fn(),
      exportAsCSV: jest.fn(),
      exportAsPDF: jest.fn()
    })
  })

  test('実セッションデータから正しいヘッダー情報を表示する', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // ヘッダーの日時表示を確認
    expect(screen.getByText('2025年5月29日 10:30 のあなたの状態')).toBeInTheDocument()
    
    // 録画時間の表示を確認
    expect(screen.getByText('録画時間: 1分58秒')).toBeInTheDocument()
  })

  test('セッションIDと詳細情報が正しく表示される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // セッションID
    expect(screen.getByText('session_123456789')).toBeInTheDocument()
    
    // 日付
    expect(screen.getByText('2025年5月29日')).toBeInTheDocument()
  })

  test('感情データが正しく集計・表示される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // 感情統計のセクションが存在することを確認
    expect(screen.getByText('感情統計')).toBeInTheDocument()
    
    // 平均値が表示されていることを確認（joy の平均は (75+70)/2 = 72.5 ≈ 73）
    expect(screen.getByText('73%')).toBeInTheDocument()
  })

  test('転写内容が表示される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // 転写内容
    expect(screen.getByText('これはテストセッションの転写内容です。')).toBeInTheDocument()
  })

  test('洞察が表示される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // 洞察
    expect(screen.getByText('全体的にポジティブな感情が優勢です')).toBeInTheDocument()
    expect(screen.getByText('高い自信と興味を示しています')).toBeInTheDocument()
  })

  test('データが存在しない場合の処理', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: null,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // エラーメッセージ
    expect(screen.getByText('セッションデータがありません')).toBeInTheDocument()
    expect(screen.getByText('録画を開始して分析レポートを生成してください')).toBeInTheDocument()
  })

  test('録画中の状態表示', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    mockUseSessionRecording.mockReturnValue({
      isRecording: true,
      recordingDuration: 30,
      currentSession: null,
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
      addEmotionData: jest.fn(),
      updateTranscript: jest.fn(),
      getVideoUrl: jest.fn(),
      downloadVideo: jest.fn(),
      exportSessionData: jest.fn(),
      resetSession: jest.fn(),
      saveSession: jest.fn(),
      loadSessions: jest.fn(),
      exportAsCSV: jest.fn(),
      exportAsPDF: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // 録画中メッセージ
    expect(screen.getByText('録画中...')).toBeInTheDocument()
    expect(screen.getByText('録画を停止すると分析レポートが表示されます')).toBeInTheDocument()
  })

  test('感情のピーク値が正しく計算される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // ピーク値のセクション
    expect(screen.getByText('感情のピーク')).toBeInTheDocument()
    
    // 最高値が表示される（joy のピークは 75）
    expect(screen.getByText('最高の喜び')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
    
    // confidence のピークは 80
    expect(screen.getByText('最高の自信')).toBeInTheDocument()
    expect(screen.getByText('80%')).toBeInTheDocument()
    
    // interest のピークは 85
    expect(screen.getByText('最高の興味')).toBeInTheDocument()
    expect(screen.getByText('85%')).toBeInTheDocument()
  })

  test('感情タイムラインが表示される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // タイムラインセクション
    expect(screen.getByText('感情タイムライン')).toBeInTheDocument()
    
    // タイムラインアイテム
    const timelineItems = screen.getAllByTestId('timeline-item')
    expect(timelineItems).toHaveLength(2)
    
    // 表情とインサイト
    expect(screen.getByText('笑顔で自信に満ちた表情')).toBeInTheDocument()
    expect(screen.getByText('話者は非常にポジティブで自信に満ちています')).toBeInTheDocument()
  })

  test('推奨事項が感情統計に基づいて生成される', () => {
    mockUseSessionContext.mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      selectedSessionId: null,
      setSelectedSessionId: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // 推奨事項セクション
    expect(screen.getByText('推奨事項')).toBeInTheDocument()
    
    // 高い自信と喜びの場合の推奨事項
    expect(screen.getByText(/素晴らしいパフォーマンスです/)).toBeInTheDocument()
  })
})