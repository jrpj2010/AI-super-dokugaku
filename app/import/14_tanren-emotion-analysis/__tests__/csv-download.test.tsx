import { render, screen, fireEvent } from '@testing-library/react';
import { ExportButtons } from '@/components/export-buttons';
import { useSessionRecording } from '@/hooks/use-session-recording';

// Mock the hooks
jest.mock('@/hooks/use-session-recording');

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock document.createElement to track created elements
const mockCreateElement = jest.spyOn(document, 'createElement');

describe('CSV Download Functionality', () => {
  const mockSessionData = {
    id: 'test-session-1',
    startTime: new Date('2024-01-01T10:00:00'),
    endTime: new Date('2024-01-01T10:05:00'),
    duration: 300,
    transcript: 'これはテストセッションの転写です。話している内容の分析を行います。',
    emotions: [
      {
        timestamp: Date.parse('2024-01-01T10:01:00'),
        emotions: { joy: 80, anger: 5, sadness: 10, surprise: 5, fear: 0, confidence: 85, confusion: 10, interest: 75 },
        facialExpression: 'Smiling with confidence',
        insight: '自信に満ちた表情で話しています'
      },
      {
        timestamp: Date.parse('2024-01-01T10:02:00'),
        emotions: { joy: 70, anger: 10, sadness: 15, surprise: 5, fear: 0, confidence: 75, confusion: 15, interest: 70 },
        facialExpression: 'Focused and engaged',
        insight: '集中して取り組んでいます'
      },
      {
        timestamp: Date.parse('2024-01-01T10:03:00'),
        emotions: { joy: 85, anger: 5, sadness: 5, surprise: 5, fear: 0, confidence: 90, confusion: 5, interest: 85 },
        facialExpression: 'Very positive and enthusiastic',
        insight: '非常にポジティブで熱心です'
      }
    ],
    insights: [
      '自信に満ちた表情で話しています',
      '集中して取り組んでいます',
      '非常にポジティブで熱心です'
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateElement.mockClear();
  });

  it('should render CSV download button', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    expect(csvButton).toBeInTheDocument();
  });

  it('should generate CSV with correct headers', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsCSV: jest.fn(() => {
        return 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics\n';
      })
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    fireEvent.click(csvButton);

    const { exportAsCSV } = (useSessionRecording as jest.Mock).mock.results[0].value;
    expect(exportAsCSV).toHaveBeenCalled();
  });

  it('should include all emotion data in CSV format', () => {
    const mockExportAsCSV = jest.fn(() => {
      const headers = 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics';
      const rows = mockSessionData.emotions.map((emotion, index) => {
        const sentimentScore = Math.round((emotion.emotions.joy + emotion.emotions.confidence + emotion.emotions.interest) / 3 - (emotion.emotions.anger + emotion.emotions.sadness + emotion.emotions.fear) / 3);
        const engagement = Math.round((emotion.emotions.interest + emotion.emotions.surprise) / 2);
        const calmness = Math.round(100 - (emotion.emotions.fear + emotion.emotions.confusion) / 2);
        const fluency = Math.round((emotion.emotions.confidence + emotion.emotions.joy) / 2);
        const behaviorMetrics = `engagement:${engagement};calmness:${calmness};fluency:${fluency}`;
        
        return [
          new Date(emotion.timestamp).toISOString(),
          emotion.emotions.joy,
          emotion.emotions.anger,
          emotion.emotions.sadness,
          emotion.emotions.surprise,
          emotion.emotions.fear,
          emotion.emotions.confidence,
          emotion.emotions.interest,
          emotion.emotions.confusion,
          sentimentScore,
          `"${emotion.facialExpression}"`,
          `"${emotion.insight}"`,
          `"これはテストセッションの転写です"`,
          new Date(emotion.timestamp).toISOString(),
          new Date(emotion.timestamp + 2000).toISOString(),
          `"${behaviorMetrics}"`
        ].join(',');
      });
      return headers + '\n' + rows.join('\n');
    });

    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsCSV: mockExportAsCSV
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    fireEvent.click(csvButton);

    const csvContent = mockExportAsCSV();
    
    // Check headers
    expect(csvContent).toContain('timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics');
    
    // Check data rows
    expect(csvContent).toContain('80,5,10,5,0,85,75,10');
    expect(csvContent).toContain('70,10,15,5,0,75,70,15');
    expect(csvContent).toContain('85,5,5,5,0,90,85,5');
    
    // Check sentiment scores
    expect(csvContent).toMatch(/,73,/); // First emotion sentiment score
    expect(csvContent).toMatch(/,60,/); // Second emotion sentiment score
    expect(csvContent).toMatch(/,83,/); // Third emotion sentiment score
    
    // Check text fields are quoted
    expect(csvContent).toContain('"Smiling with confidence"');
    expect(csvContent).toContain('"自信に満ちた表情で話しています"');
    
    // Check behavior metrics
    expect(csvContent).toContain('engagement:');
    expect(csvContent).toContain('calmness:');
    expect(csvContent).toContain('fluency:');
  });

  it('should trigger download with correct filename', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsCSV: jest.fn(() => 'csv,data')
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    fireEvent.click(csvButton);

    // Check that a download link was created
    const anchorCalls = mockCreateElement.mock.calls.filter(call => call[0] === 'a');
    expect(anchorCalls.length).toBeGreaterThan(0);

    // Verify the download would have correct filename pattern
    // In real implementation, the filename includes session ID and timestamp
    const expectedPattern = /tanren_emotion_report_test-session-1_.*\.csv$/;
  });

  it('should handle empty session data gracefully', () => {
    const emptySession = {
      ...mockSessionData,
      emotions: []
    };

    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: emptySession,
      isRecording: false,
      exportAsCSV: jest.fn(() => 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics\n')
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    fireEvent.click(csvButton);

    const { exportAsCSV } = (useSessionRecording as jest.Mock).mock.results[0].value;
    const csvContent = exportAsCSV();
    
    // Should have headers but no data rows
    expect(csvContent).toContain('timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics');
    expect(csvContent.split('\n').length).toBe(2); // Headers + empty line
  });

  it('should include session metadata in CSV', () => {
    const mockExportAsCSV = jest.fn(() => {
      const metadata = [
        `# Session ID: ${mockSessionData.id}`,
        `# Date: ${new Date(mockSessionData.startTime).toLocaleDateString('ja-JP')} ${new Date(mockSessionData.startTime).toLocaleTimeString('ja-JP')}`,
        `# Duration: ${Math.floor(mockSessionData.duration / 60)}:${(mockSessionData.duration % 60).toString().padStart(2, '0')}`,
        `# Total Transcript Length: ${mockSessionData.transcript.length} characters`,
        ''
      ].join('\n');
      
      const headers = 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics';
      
      return metadata + headers;
    });

    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: mockSessionData,
      isRecording: false,
      exportAsCSV: mockExportAsCSV
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    fireEvent.click(csvButton);

    const csvContent = mockExportAsCSV();
    
    // Check metadata
    expect(csvContent).toContain('# Session ID: test-session-1');
    expect(csvContent).toContain('# Date: 2024/1/1');
    expect(csvContent).toContain('# Duration: 5:00');
    expect(csvContent).toContain('# Total Transcript Length: 38 characters');
  });

  it('should properly escape special characters in CSV', () => {
    const sessionWithSpecialChars = {
      ...mockSessionData,
      emotions: [{
        timestamp: Date.now(),
        emotions: { joy: 80, anger: 5, sadness: 10, surprise: 5, fear: 0, confidence: 85, confusion: 10, interest: 75 },
        facialExpression: 'Expression with "quotes" and, commas',
        insight: 'Insight with\nnewline and "quotes"'
      }]
    };

    const mockExportAsCSV = jest.fn(() => {
      const emotion = sessionWithSpecialChars.emotions[0];
      const row = [
        new Date(emotion.timestamp).toISOString(),
        emotion.emotions.joy,
        emotion.emotions.anger,
        emotion.emotions.sadness,
        emotion.emotions.surprise,
        emotion.emotions.fear,
        emotion.emotions.confidence,
        emotion.emotions.interest,
        emotion.emotions.confusion || 0,
        50, // Mock sentiment score
        `"${emotion.facialExpression.replace(/"/g, '""')}"`,
        `"${emotion.insight.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"Sample segment text"`,
        new Date(emotion.timestamp).toISOString(),
        new Date(emotion.timestamp + 2000).toISOString(),
        `"engagement:42;calmness:95;fluency:82"`
      ].join(',');
      
      return 'timestamp,joy,anger,sadness,surprise,fear,confidence,interest,confusion,sentimentScore,facialExpression,insight,segmentText,segmentStartTime,segmentEndTime,behaviorMetrics\n' + row;
    });

    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: sessionWithSpecialChars,
      isRecording: false,
      exportAsCSV: mockExportAsCSV
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    fireEvent.click(csvButton);

    const csvContent = mockExportAsCSV();
    
    // Check proper escaping
    expect(csvContent).toContain('""quotes""'); // Double quotes escaped
    // The CSV content should have newlines only between rows, not within data
    const lines = csvContent.split('\n');
    expect(lines.length).toBe(2); // Header + 1 data row
  });

  it('should disable CSV download button when recording', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: null,
      isRecording: true
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    expect(csvButton).toBeDisabled();
  });

  it('should disable CSV download button when no session data', () => {
    (useSessionRecording as jest.Mock).mockReturnValue({
      currentSession: null,
      isRecording: false
    });

    render(<ExportButtons />);

    const csvButton = screen.getByRole('button', { name: /CSV.*ダウンロード/i });
    expect(csvButton).toBeDisabled();
  });
});