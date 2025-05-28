import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionProvider } from '@/contexts/session-context';
import RealtimeDashboard from '@/components/realtime-dashboard';
import EmotionRadarChart from '@/components/emotion-radar-chart';
import EmotionTrendChart from '@/components/emotion-trend-chart';
import FaceMetricsGauge from '@/components/face-metrics-gauge';
import TranscriptArea from '@/components/transcript-area';

// Mock all hooks to prevent errors
jest.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: () => ({
    stream: null,
    error: null,
    isLoading: false,
    startStream: jest.fn(),
    stopStream: jest.fn(),
  }),
}));

jest.mock('@/hooks/use-speech-recognition', () => ({
  useSpeechRecognition: () => ({
    transcript: '',
    interimTranscript: '',
    isListening: false,
    error: null,
    startListening: jest.fn(),
    stopListening: jest.fn(),
  }),
}));

jest.mock('@/hooks/use-video-frame-capture', () => ({
  useVideoFrameCapture: () => ({
    latestFrame: null,
    isCapturing: false,
  }),
}));

jest.mock('@/hooks/use-emotion-analysis', () => ({
  useEmotionAnalysis: () => ({
    latestEmotions: null,
    emotionHistory: [],
    insights: null,
    facialExpression: null,
    isAnalyzing: false,
    error: null,
    queueFrameForAnalysis: jest.fn(),
    reset: jest.fn(),
  }),
}));

jest.mock('@/hooks/use-session-recording', () => ({
  useSessionRecording: () => ({
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
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock MediaStream
global.MediaStream = jest.fn().mockImplementation(() => ({
  getTracks: jest.fn(() => []),
}));

// Mock Recharts to prevent rendering issues
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  RadarChart: ({ children }: any) => <div>{children}</div>,
  PolarGrid: () => <div />,
  PolarAngleAxis: () => <div />,
  PolarRadiusAxis: () => <div />,
  Radar: () => <div />,
  LineChart: ({ children }: any) => <div>{children}</div>,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Legend: () => <div />,
  RadialBarChart: ({ children }: any) => <div>{children}</div>,
  RadialBar: () => <div />,
  Tooltip: () => <div />,
}));

describe('Console Error Elimination', () => {
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should not produce console errors when rendering RealtimeDashboard', () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should not produce console warnings when rendering RealtimeDashboard', () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    // Filter out expected Recharts warnings
    const unexpectedWarnings = consoleWarnSpy.mock.calls.filter(
      call => !call[0]?.toString().includes('width(0) and height(0)')
    );

    expect(unexpectedWarnings).toHaveLength(0);
  });

  it('should not produce errors when rendering EmotionRadarChart with no data', () => {
    render(<EmotionRadarChart data={undefined} />);
    
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should not produce errors when rendering EmotionTrendChart with empty data', () => {
    render(<EmotionTrendChart data={[]} />);
    
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should not produce errors when rendering FaceMetricsGauge with no data', () => {
    render(<FaceMetricsGauge data={null} />);
    
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should not produce errors when rendering TranscriptArea with empty transcript', () => {
    render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
    
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle missing props gracefully without errors', () => {
    // Test components with minimal or missing props
    const components = [
      () => render(<EmotionRadarChart />),
      () => render(<EmotionTrendChart />),
      () => render(<FaceMetricsGauge />),
    ];

    components.forEach(renderComponent => {
      renderComponent();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  it('should not produce errors during component unmount', () => {
    const { unmount } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    unmount();

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle rapid re-renders without errors', () => {
    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    // Simulate rapid re-renders
    for (let i = 0; i < 10; i++) {
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      );
    }

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should not produce React key warnings in lists', () => {
    const mockData = [
      { time: '0:00', ポジティブ: 60, ネガティブ: 20, ニュートラル: 20 },
      { time: '0:05', ポジティブ: 65, ネガティブ: 15, ニュートラル: 20 },
      { time: '0:10', ポジティブ: 70, ネガティブ: 10, ニュートラル: 20 },
    ];

    render(<EmotionTrendChart data={mockData} />);

    const keyWarnings = consoleErrorSpy.mock.calls.filter(
      call => call[0]?.toString().includes('unique "key" prop')
    );

    expect(keyWarnings).toHaveLength(0);
  });

  it('should not produce deprecation warnings', () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    const deprecationWarnings = consoleWarnSpy.mock.calls.filter(
      call => call[0]?.toString().toLowerCase().includes('deprecated')
    );

    expect(deprecationWarnings).toHaveLength(0);
  });

  it('should handle null refs without errors', () => {
    // Force refs to be null by mocking useRef
    const originalUseRef = React.useRef;
    React.useRef = jest.fn(() => ({ current: null }));

    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    // Restore original useRef
    React.useRef = originalUseRef;
  });
});