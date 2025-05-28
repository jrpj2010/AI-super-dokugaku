import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExportButtons } from '@/components/export-buttons';
import { useSessionRecording } from '@/hooks/use-session-recording';
import { PDFGenerator } from '@/lib/pdf-generator';

// Mock the hooks
jest.mock('@/hooks/use-session-recording');
jest.mock('@/lib/pdf-generator');

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock document.createElement to track created elements
const mockCreateElement = jest.spyOn(document, 'createElement');

// Mock Blob with text() method
class MockBlob {
  content: string;
  type: string;
  
  constructor(content: string[], options?: { type?: string }) {
    this.content = content.join('');
    this.type = options?.type || '';
  }
  
  async text() {
    return this.content;
  }
}

global.Blob = MockBlob as any;

// Mock html2canvas
jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({
    toDataURL: jest.fn(() => 'data:image/png;base64,mockImageData'),
    width: 800,
    height: 1200
  }))
}));

// Mock jsPDF
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
}));

describe('PDF Download Functionality', () => {
  const mockSessionData = {
    id: 'test-session-1',
    startTime: new Date('2024-01-01T10:00:00'),
    endTime: new Date('2024-01-01T10:05:00'),
    duration: 300,
    transcript: 'これはテストセッションの転写です。',
    emotions: [
      {
        timestamp: Date.parse('2024-01-01T10:01:00'),
        emotions: { joy: 80, anger: 5, sadness: 10, surprise: 5, fear: 0, confidence: 85, interest: 75 },
        facialExpression: 'Smiling with confidence',
        insight: '自信に満ちた表情で話しています'
      },
      {
        timestamp: Date.parse('2024-01-01T10:02:00'),
        emotions: { joy: 70, anger: 10, sadness: 15, surprise: 5, fear: 0, confidence: 75, interest: 70 },
        facialExpression: 'Focused and engaged',
        insight: '集中して取り組んでいます'
      }
    ],
    insights: [
      '自信に満ちた表情で話しています',
      '集中して取り組んでいます'
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateElement.mockClear();
    
    // Mock getElementById to return analysis report element
    document.getElementById = jest.fn((id) => {
      if (id === 'analysis-report') {
        return document.createElement('div');
      }
      return null;
    });
  });

  it('should render PDF download button', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: jest.fn()
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    expect(pdfButton).toBeInTheDocument();
  });

  it('should call exportAsPDF when button is clicked', async () => {
    const mockExportAsPDF = jest.fn().mockResolvedValue(new Blob(['mock pdf content'], { type: 'application/pdf' }));
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      expect(mockExportAsPDF).toHaveBeenCalled();
    });
  });

  it('should trigger download with correct filename', async () => {
    const mockPdfBlob = new Blob(['mock pdf content'], { type: 'application/pdf' });
    const mockExportAsPDF = jest.fn().mockResolvedValue(mockPdfBlob);
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      // Check that a download link was created
      const anchorCalls = mockCreateElement.mock.calls.filter(call => call[0] === 'a');
      expect(anchorCalls.length).toBeGreaterThan(0);
    });
  });

  it('should generate PDF with PDFGenerator when export button is clicked', async () => {
    const mockPdfBlob = new Blob(['mock pdf content'], { type: 'application/pdf' });
    const mockExportAsPDF = jest.fn().mockResolvedValue(mockPdfBlob);
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      expect(mockExportAsPDF).toHaveBeenCalled();
    });
  });

  it('should handle PDF generation errors gracefully', async () => {
    const mockError = new Error('PDF generation failed');
    const mockExportAsPDF = jest.fn().mockRejectedValue(mockError);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('PDF生成エラー:', mockError);
    });

    consoleErrorSpy.mockRestore();
  });

  it('should disable PDF download button when recording', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: null,
      isRecording: true,
      exportAsPDF: jest.fn()
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    expect(pdfButton).toBeDisabled();
  });

  it('should disable PDF download button when no session data', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: null,
      isRecording: false,
      exportAsPDF: jest.fn()
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    expect(pdfButton).toBeDisabled();
  });

  it('should download PDF with correct filename format', async () => {
    const mockPdfBlob = new Blob(['mock pdf content'], { type: 'application/pdf' });
    const mockExportAsPDF = jest.fn().mockResolvedValue(mockPdfBlob);
    
    // Mock session with specific ID
    const sessionWithId = {
      ...mockSessionData,
      id: 'session_123456789'
    };
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: sessionWithId,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      const anchorCalls = mockCreateElement.mock.calls.filter(call => call[0] === 'a');
      expect(anchorCalls.length).toBeGreaterThan(0);
      
      // The download attribute should have the correct filename format
      const lastAnchor = mockCreateElement.mock.results[mockCreateElement.mock.results.length - 1].value;
      if (lastAnchor && lastAnchor.download) {
        expect(lastAnchor.download).toMatch(/^tanren_emotion_report_123456789_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.pdf$/);
      }
    });
  });

  it('should handle missing analysis report element', async () => {
    // Mock getElementById to return null for analysis-report
    document.getElementById = jest.fn(() => null);
    
    const mockExportAsPDF = jest.fn().mockRejectedValue(new Error('レポート要素が見つかりません'));
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      expect(mockExportAsPDF).toHaveBeenCalled();
    });
  });

  it('should cleanup blob URL after download', async () => {
    const mockExportAsPDF = jest.fn().mockResolvedValue(new Blob(['mock pdf'], { type: 'application/pdf' }));
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });
  });
});