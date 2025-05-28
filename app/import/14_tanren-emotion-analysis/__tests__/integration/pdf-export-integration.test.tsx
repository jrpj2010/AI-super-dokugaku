import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SessionProvider } from '@/contexts/session-context'
import { ExportButtons } from '@/components/export-buttons'
import { AnalysisReport } from '@/components/analysis-report'

// Mock jsPDF and html2canvas
jest.mock('jspdf', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    addPage: jest.fn(),
    output: jest.fn(() => new Blob(['mock pdf content'], { type: 'application/pdf' })),
    setFontSize: jest.fn(),
    setTextColor: jest.fn(),
    text: jest.fn(),
    getTextWidth: jest.fn(() => 50)
  }))
}))

jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({
    toDataURL: jest.fn(() => 'data:image/png;base64,mockImageData'),
    width: 800,
    height: 1200
  }))
}))

// Mock recharts to avoid rendering issues
jest.mock('recharts', () => ({
  LineChart: () => null,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
}))

describe('PDF Export Integration', () => {
  const mockSessionData = {
    id: 'session_123456789',
    startTime: new Date('2024-01-15T10:00:00'),
    endTime: new Date('2024-01-15T10:05:00'),
    duration: 300,
    transcript: 'これはテストセッションの転写です。',
    emotions: [
      {
        timestamp: Date.now(),
        emotions: {
          joy: 80,
          anger: 10,
          sadness: 5,
          surprise: 20,
          fear: 5,
          confidence: 75,
          confusion: 15,
          interest: 85
        },
        facialExpression: '笑顔で自信に満ちた表情',
        insight: '積極的で前向きな態度が見られます'
      },
      {
        timestamp: Date.now() + 60000,
        emotions: {
          joy: 70,
          anger: 15,
          sadness: 10,
          surprise: 15,
          fear: 10,
          confidence: 65,
          confusion: 20,
          interest: 75
        },
        facialExpression: '集中した表情',
        insight: '真剣に取り組んでいる様子です'
      }
    ],
    insights: ['積極的で前向きな態度が見られます', '真剣に取り組んでいる様子です'],
    videoBlob: new Blob(['mock video'], { type: 'video/mp4' })
  }

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock URL methods
    global.URL.createObjectURL = jest.fn(() => 'mock-url')
    global.URL.revokeObjectURL = jest.fn()
    
    // Mock document methods
    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()
    
    // Mock createElement to return a mock anchor element
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn()
    }
    document.createElement = jest.fn((tag) => {
      if (tag === 'a') return mockLink as any
      return document.createElement(tag)
    })
  })

  it('should export analysis report to PDF with all sections', async () => {
    const TestComponent = () => (
      <SessionProvider>
        <div>
          <AnalysisReport />
          <ExportButtons />
        </div>
      </SessionProvider>
    )

    // Mock the session context to return our test data
    jest.spyOn(require('@/contexts/session-context'), 'useSessionContext').mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      isRecording: false,
      setIsRecording: jest.fn(),
      recordingDuration: 300,
      setRecordingDuration: jest.fn()
    })

    // Mock the useSessionRecording hook
    jest.spyOn(require('@/hooks/use-session-recording'), 'useSessionRecording').mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsCSV: jest.fn(),
      exportAsPDF: jest.fn().mockResolvedValue(new Blob(['mock pdf'], { type: 'application/pdf' }))
    })

    render(<TestComponent />)

    // Verify report is rendered
    await waitFor(() => {
      expect(screen.getByText(/2024年1月15日.*のあなたの状態/)).toBeInTheDocument()
    })

    // Find and click PDF download button
    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i })
    expect(pdfButton).toBeInTheDocument()
    expect(pdfButton).not.toBeDisabled()

    fireEvent.click(pdfButton)

    // Verify PDF generation was triggered
    await waitFor(() => {
      const exportAsPDF = require('@/hooks/use-session-recording').useSessionRecording().exportAsPDF
      expect(exportAsPDF).toHaveBeenCalled()
    })
  })

  it('should include all report sections in the rendered HTML', async () => {
    jest.spyOn(require('@/contexts/session-context'), 'useSessionContext').mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      isRecording: false,
      setIsRecording: jest.fn(),
      recordingDuration: 300,
      setRecordingDuration: jest.fn()
    })

    render(
      <SessionProvider>
        <AnalysisReport />
      </SessionProvider>
    )

    // Verify all sections are present
    await waitFor(() => {
      // Header
      expect(screen.getByText(/2024年1月15日.*のあなたの状態/)).toBeInTheDocument()
      expect(screen.getByText(/録画時間: 5分0秒/)).toBeInTheDocument()
      
      // Session info
      expect(screen.getByText('セッション情報')).toBeInTheDocument()
      expect(screen.getByText(mockSessionData.id)).toBeInTheDocument()
      
      // Emotion statistics
      expect(screen.getByText('感情統計')).toBeInTheDocument()
      
      // Emotion peaks
      expect(screen.getByText('感情のピーク')).toBeInTheDocument()
      
      // Emotion trend chart
      expect(screen.getByText('感情の推移')).toBeInTheDocument()
      
      // Transcript
      expect(screen.getByText('セッション転写')).toBeInTheDocument()
      expect(screen.getByText(mockSessionData.transcript)).toBeInTheDocument()
      
      // Insights
      expect(screen.getByText('主要な洞察')).toBeInTheDocument()
      mockSessionData.insights.forEach(insight => {
        expect(screen.getByText(insight)).toBeInTheDocument()
      })
      
      // Timeline
      expect(screen.getByText('感情タイムライン')).toBeInTheDocument()
      
      // Recommendations
      expect(screen.getByText('推奨事項')).toBeInTheDocument()
    })

    // Check that the report has the correct ID for PDF generation
    const reportElement = document.getElementById('analysis-report')
    expect(reportElement).toBeInTheDocument()
  })

  it('should handle PDF export errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    
    jest.spyOn(require('@/contexts/session-context'), 'useSessionContext').mockReturnValue({
      currentSession: mockSessionData,
      setCurrentSession: jest.fn(),
      isRecording: false,
      setIsRecording: jest.fn(),
      recordingDuration: 300,
      setRecordingDuration: jest.fn()
    })

    jest.spyOn(require('@/hooks/use-session-recording'), 'useSessionRecording').mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsCSV: jest.fn(),
      exportAsPDF: jest.fn().mockRejectedValue(new Error('PDF generation failed'))
    })

    render(
      <SessionProvider>
        <ExportButtons />
      </SessionProvider>
    )

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i })
    fireEvent.click(pdfButton)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('PDF生成エラー:', expect.any(Error))
    })

    consoleErrorSpy.mockRestore()
  })
})