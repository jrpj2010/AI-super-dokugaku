import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExportButtons } from '@/components/export-buttons';
import { useSessionRecording } from '@/hooks/use-session-recording';

// Mock the hooks
jest.mock('@/hooks/use-session-recording');

// Mock URL APIs
global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-blob-url');
global.URL.revokeObjectURL = jest.fn();

// Mock document methods
const mockClick = jest.fn();
const mockAppendChild = jest.spyOn(document.body, 'appendChild');
const mockRemoveChild = jest.spyOn(document.body, 'removeChild');

// Override createElement to capture download link behavior
const originalCreateElement = document.createElement.bind(document);
jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
  const element = originalCreateElement(tagName);
  if (tagName === 'a') {
    Object.defineProperty(element, 'click', {
      value: mockClick,
      writable: true
    });
  }
  return element;
});

describe('Export Buttons Download Functionality', () => {
  const mockSessionData = {
    id: 'session_1704095400000',
    startTime: new Date('2024-01-01T10:00:00'),
    endTime: new Date('2024-01-01T10:05:00'),
    duration: 300,
    transcript: 'これはテストセッションの転写です。話している内容の分析を行います。感情の変化を記録します。',
    emotions: [
      {
        timestamp: Date.parse('2024-01-01T10:01:00'),
        emotions: { 
          joy: 80, anger: 5, sadness: 10, surprise: 5, 
          fear: 0, confidence: 85, confusion: 10, interest: 75 
        },
        facialExpression: 'Smiling with confidence',
        insight: '自信に満ちた表情で話しています'
      },
      {
        timestamp: Date.parse('2024-01-01T10:02:00'),
        emotions: { 
          joy: 70, anger: 10, sadness: 15, surprise: 5, 
          fear: 0, confidence: 75, confusion: 15, interest: 70 
        },
        facialExpression: 'Focused and engaged',
        insight: '集中して取り組んでいます'
      }
    ],
    insights: [
      '自信に満ちた表情で話しています',
      '集中して取り組んでいます'
    ]
  };

  const mockCSVContent = `# Session ID: session_1704095400000
# Date: 2024/1/1 19:00:00
# Duration: 5:00
# Total Transcript Length: 45 characters

timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics
2024-01-01T10:01:00.000Z,80,5,10,5,0,85,75,10,73,"Smiling with confidence","自信に満ちた表情で話しています","これはテストセッションの転写です",2024-01-01T10:01:00.000Z,2024-01-01T10:01:02.000Z,"engagement:40;calmness:95;fluency:82"
2024-01-01T10:02:00.000Z,70,10,15,5,0,75,70,15,60,"Focused and engaged","集中して取り組んでいます","話している内容の分析を行います",2024-01-01T10:02:00.000Z,2024-01-01T10:02:02.000Z,"engagement:37;calmness:92;fluency:72"`;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClick.mockClear();
    mockAppendChild.mockClear();
    mockRemoveChild.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('CSV Download', () => {
    it('should create download link with correct attributes', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsCSV: jest.fn(() => mockCSVContent)
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      fireEvent.click(csvButton);

      // Check that a link element was created
      const createElementCalls = (document.createElement as jest.Mock).mock.calls;
      const anchorCall = createElementCalls.find(call => call[0] === 'a');
      expect(anchorCall).toBeDefined();

      // Verify blob creation
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'text/csv;charset=utf-8;'
        })
      );

      // Verify download was triggered
      expect(mockClick).toHaveBeenCalled();
      expect(mockAppendChild).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalled();
    });

    it('should use correct filename format', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsCSV: jest.fn(() => mockCSVContent)
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      fireEvent.click(csvButton);

      // Find the created anchor element
      const appendChildCalls = mockAppendChild.mock.calls;
      const anchorElement = appendChildCalls.find(call => call[0].tagName === 'A')?.[0] as HTMLAnchorElement;
      
      expect(anchorElement).toBeDefined();
      expect(anchorElement.download).toMatch(/^tanren_emotion_report_1704095400000_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.csv$/);
    });

    it('should clean up resources after download', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsCSV: jest.fn(() => mockCSVContent)
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      fireEvent.click(csvButton);

      // Verify cleanup
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/mock-blob-url');
      expect(mockRemoveChild).toHaveBeenCalled();
    });

    it('should handle CSV export errors gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsCSV: jest.fn(() => {
          throw new Error('CSV generation failed');
        })
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      
      // Should not throw when clicked
      expect(() => fireEvent.click(csvButton)).not.toThrow();
      
      // Should log error
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('CSV generation failed')
      );

      consoleErrorSpy.mockRestore();
    });

    it('should not trigger download when session is null', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: null,
        isRecording: false,
        exportAsCSV: jest.fn()
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      fireEvent.click(csvButton);

      // Should not call export function
      expect((useSessionRecording as jest.Mock).mock.results[0].value.exportAsCSV).not.toHaveBeenCalled();
      expect(mockClick).not.toHaveBeenCalled();
    });

    it('should not trigger download when exportAsCSV is undefined', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsCSV: undefined
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      fireEvent.click(csvButton);

      // Should not create blob or trigger download
      expect(global.URL.createObjectURL).not.toHaveBeenCalled();
      expect(mockClick).not.toHaveBeenCalled();
    });
  });

  describe('PDF Download', () => {
    it('should handle PDF download with async operation', async () => {
      const mockPDFBlob = new Blob(['mock pdf content'], { type: 'application/pdf' });
      
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsPDF: jest.fn().mockResolvedValue(mockPDFBlob)
      });

      render(<ExportButtons />);

      const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
      fireEvent.click(pdfButton);

      // Wait for async operation
      await waitFor(() => {
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockPDFBlob);
      });

      expect(mockClick).toHaveBeenCalled();
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('should handle PDF export errors', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsPDF: jest.fn().mockRejectedValue(new Error('PDF generation failed'))
      });

      render(<ExportButtons />);

      const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });
      fireEvent.click(pdfButton);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('PDF生成エラー:', expect.any(Error));
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Button State Management', () => {
    it('should disable both buttons during recording', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: true,
        exportAsCSV: jest.fn(),
        exportAsPDF: jest.fn()
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });

      expect(csvButton).toBeDisabled();
      expect(pdfButton).toBeDisabled();
    });

    it('should enable buttons when session exists and not recording', () => {
      (useSessionRecording as jest.Mock).mockReturnValue({
        currentSession: mockSessionData,
        isRecording: false,
        exportAsCSV: jest.fn(),
        exportAsPDF: jest.fn()
      });

      render(<ExportButtons />);

      const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
      const pdfButton = screen.getByRole('button', { name: /PDF.*ダウンロード/i });

      expect(csvButton).not.toBeDisabled();
      expect(pdfButton).not.toBeDisabled();
    });
  });
});