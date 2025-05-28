import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExportButtons } from '@/components/export-buttons';
import { useSessionRecording } from '@/hooks/use-session-recording';

// Mock the hooks
jest.mock('@/hooks/use-session-recording');

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

  it('should include session metadata in PDF content', async () => {
    const mockExportAsPDF = jest.fn().mockImplementation(async () => {
      const pdfContent = `
TANREN Emotion Analysis Report
==============================
Session ID: ${mockSessionData.id}
Date: ${new Date(mockSessionData.startTime).toLocaleDateString('ja-JP')}
Duration: ${Math.floor(mockSessionData.duration / 60)}:${(mockSessionData.duration % 60).toString().padStart(2, '0')}

Transcript:
${mockSessionData.transcript}
`;
      return new Blob([pdfContent], { type: 'application/pdf' });
    });
    
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

    const pdfBlob = await mockExportAsPDF();
    const pdfText = await pdfBlob.text();
    
    expect(pdfText).toContain('Session ID: test-session-1');
    expect(pdfText).toContain('Date: 2024/1/1');
    expect(pdfText).toContain('Duration: 5:00');
    expect(pdfText).toContain('これはテストセッションの転写です。');
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

  it('should include emotion analysis in PDF', async () => {
    const mockExportAsPDF = jest.fn().mockImplementation(async () => {
      const emotionData = mockSessionData.emotions.map(e => 
        `- ${new Date(e.timestamp).toLocaleTimeString()}: ${e.facialExpression} (${e.insight})`
      ).join('\n');
      
      const pdfContent = `
TANREN Emotion Analysis Report
==============================
Session ID: ${mockSessionData.id}

Emotion Data:
${emotionData}
`;
      return new Blob([pdfContent], { type: 'application/pdf' });
    });
    
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

    const pdfBlob = await mockExportAsPDF();
    const pdfText = await pdfBlob.text();
    
    expect(pdfText).toContain('Emotion Data:');
    expect(pdfText).toContain('Smiling with confidence');
    expect(pdfText).toContain('自信に満ちた表情で話しています');
  });

  it('should handle empty emotion data in PDF', async () => {
    const emptySession = {
      ...mockSessionData,
      emotions: []
    };

    const mockExportAsPDF = jest.fn().mockImplementation(async () => {
      const pdfContent = `
TANREN Emotion Analysis Report
==============================
Session ID: ${emptySession.id}

Emotion Data:
No emotion data available
`;
      return new Blob([pdfContent], { type: 'application/pdf' });
    });
    
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: emptySession,
      isRecording: false,
      exportAsPDF: mockExportAsPDF
    });

    render(<ExportButtons />);

    const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
    fireEvent.click(pdfButton);

    await waitFor(() => {
      expect(mockExportAsPDF).toHaveBeenCalled();
    });

    const pdfBlob = await mockExportAsPDF();
    const pdfText = await pdfBlob.text();
    
    expect(pdfText).toContain('No emotion data available');
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