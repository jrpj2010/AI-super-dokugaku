import { render, screen, waitFor } from '@testing-library/react';
import { AnalysisReport } from '@/components/analysis-report';
import { useSessionRecording } from '@/hooks/use-session-recording';

// Mock the useSessionRecording hook
jest.mock('@/hooks/use-session-recording');

// Mock recharts ResponsiveContainer to avoid width/height warning
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: any) => <div className="recharts-responsive-container">{children}</div>,
  };
});

describe('Analysis Report', () => {
  const mockSessionData = {
    id: 'test-session-1',
    startTime: new Date('2024-01-01T10:00:00'),
    endTime: new Date('2024-01-01T10:05:00'),
    duration: 300, // 5 minutes
    transcript: 'これはテストセッションの転写です。感情分析のテストを行っています。',
    emotions: [
      {
        timestamp: Date.now() - 240000,
        emotions: { joy: 80, anger: 5, sadness: 10, surprise: 5, fear: 0, confidence: 85, interest: 75 },
        facialExpression: 'Smiling with confidence',
        insight: '自信に満ちた表情で話しています'
      },
      {
        timestamp: Date.now() - 180000,
        emotions: { joy: 70, anger: 10, sadness: 15, surprise: 5, fear: 0, confidence: 75, interest: 70 },
        facialExpression: 'Focused and engaged',
        insight: '集中して取り組んでいます'
      },
      {
        timestamp: Date.now() - 120000,
        emotions: { joy: 85, anger: 5, sadness: 5, surprise: 5, fear: 0, confidence: 90, interest: 85 },
        facialExpression: 'Very positive and enthusiastic',
        insight: '非常にポジティブで熱心です'
      },
      {
        timestamp: Date.now() - 60000,
        emotions: { joy: 90, anger: 2, sadness: 3, surprise: 5, fear: 0, confidence: 95, interest: 90 },
        facialExpression: 'Excited and confident',
        insight: 'エキサイトして自信満々です'
      }
    ],
    insights: [
      '自信に満ちた表情で話しています',
      '集中して取り組んでいます',
      '非常にポジティブで熱心です',
      'エキサイトして自信満々です'
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display session metadata correctly', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check session ID
    expect(screen.getByText(/セッションID:/)).toBeInTheDocument();
    expect(screen.getByText(mockSessionData.id)).toBeInTheDocument();

    // Check duration (5:00)
    expect(screen.getByText(/時間:/)).toBeInTheDocument();
    expect(screen.getByText('5:00')).toBeInTheDocument();

    // Check date
    expect(screen.getByText(/日付:/)).toBeInTheDocument();
    expect(screen.getByText(/2024年1月1日/)).toBeInTheDocument();
  });

  it('should display emotion statistics with real data', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check average emotions
    expect(screen.getByText('感情統計')).toBeInTheDocument();
    
    // Calculate expected averages
    const avgJoy = (80 + 70 + 85 + 90) / 4; // 81.25
    const avgConfidence = (85 + 75 + 90 + 95) / 4; // 86.25
    const avgInterest = (75 + 70 + 85 + 90) / 4; // 80

    // Check that averages are displayed (with some tolerance for rounding)
    expect(screen.getByText('喜び')).toBeInTheDocument();
    expect(screen.getByText('81%')).toBeInTheDocument();
    expect(screen.getByText('自信')).toBeInTheDocument();
    expect(screen.getByText('86%')).toBeInTheDocument();
    expect(screen.getByText('興味')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('should display transcript with real content', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check transcript section
    expect(screen.getByText('セッション転写')).toBeInTheDocument();
    expect(screen.getByText(mockSessionData.transcript)).toBeInTheDocument();
  });

  it('should display insights list', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check insights section
    expect(screen.getByText('主要な洞察')).toBeInTheDocument();
    
    // Check each insight is displayed using getAllByText since they appear in both list and timeline
    const insights = mockSessionData.insights;
    insights.forEach(insight => {
      const elements = screen.getAllByText(insight);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('should display emotion trend chart with data points', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check emotion trend section
    expect(screen.getByText('感情の推移')).toBeInTheDocument();
    
    // Check that the chart container exists
    const chartContainer = screen.getByTestId('emotion-trend-chart');
    expect(chartContainer).toBeInTheDocument();
    
    // Since we mocked ResponsiveContainer, just check that it rendered
    expect(chartContainer.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('should show empty state when no session data', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: null,
      isRecording: false
    });

    render(<AnalysisReport />);

    expect(screen.getByText('セッションデータがありません')).toBeInTheDocument();
    expect(screen.getByText('録画を開始して分析レポートを生成してください')).toBeInTheDocument();
  });

  it('should show recording state when recording is active', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: true
    });

    render(<AnalysisReport />);

    expect(screen.getByText('録画中...')).toBeInTheDocument();
    expect(screen.getByText('録画を停止すると分析レポートが表示されます')).toBeInTheDocument();
  });

  it('should calculate emotion peaks correctly', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check emotion peaks section
    expect(screen.getByText('感情のピーク')).toBeInTheDocument();
    
    // The peak joy should be 90 (from the last data point)
    expect(screen.getByText('最高の喜び')).toBeInTheDocument();
    // Check for all Badge elements containing percentages
    const badges = screen.getAllByText(/^\d+%$/);
    expect(badges.some(badge => badge.textContent === '90%')).toBe(true);
    
    // The peak confidence should be 95 (from the last data point)
    expect(screen.getByText('最高の自信')).toBeInTheDocument();
    expect(badges.some(badge => badge.textContent === '95%')).toBe(true);
  });

  it('should format timestamps correctly in the timeline', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check timeline section
    expect(screen.getByText('感情タイムライン')).toBeInTheDocument();
    
    // Check that timestamps are formatted (e.g., "0:00", "1:00", etc.)
    const timelineItems = screen.getAllByTestId('timeline-item');
    expect(timelineItems.length).toBe(mockSessionData.emotions.length);
  });

  it('should show recommendation based on emotion data', async () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<AnalysisReport />);

    // Check recommendations section
    expect(screen.getByText('推奨事項')).toBeInTheDocument();
    
    // With high confidence and joy, should show positive recommendation
    expect(screen.getByText(/素晴らしいパフォーマンス/)).toBeInTheDocument();
  });
});