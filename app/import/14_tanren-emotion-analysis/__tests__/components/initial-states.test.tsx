import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmotionRadarChart from '@/components/emotion-radar-chart';
import EmotionTrendChart from '@/components/emotion-trend-chart';
import FaceMetricsGauge from '@/components/face-metrics-gauge';
import FaceMapVisualization from '@/components/face-map-visualization';
import TranscriptArea from '@/components/transcript-area';
import RealtimeDashboard from '@/components/realtime-dashboard';

// モックの設定
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/contexts/session-context', () => ({
  useSessionContext: () => ({
    setCurrentSession: jest.fn(),
  }),
}));

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

// VideoStreamコンポーネントのモック
jest.mock('@/components/video-stream', () => ({
  __esModule: true,
  default: () => <div data-testid="video-stream">Video Stream</div>,
}));

// AudioVisualizerコンポーネントのモック
jest.mock('@/components/audio-visualizer', () => ({
  __esModule: true,
  default: () => <div data-testid="audio-visualizer">Audio Visualizer</div>,
}));

// VideoPlaybackModalコンポーネントのモック
jest.mock('@/components/video-playback-modal', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Initial Empty States', () => {
  describe('EmotionRadarChart', () => {
    it('should display empty state message before session starts', () => {
      render(<EmotionRadarChart data={null} />);
      expect(screen.getByText('セッション開始時に感情分析が表示されます')).toBeInTheDocument();
    });

    it('should display chart with zero values when data is null', () => {
      const { container } = render(<EmotionRadarChart data={null} />);
      const chart = container.querySelector('.recharts-wrapper');
      expect(chart).toBeInTheDocument();
    });
  });

  describe('EmotionTrendChart', () => {
    it('should display empty state message before session starts', () => {
      render(<EmotionTrendChart data={[]} />);
      expect(screen.getByText('セッション開始時に感情推移が表示されます')).toBeInTheDocument();
    });

    it('should display empty chart when data is empty', () => {
      const { container } = render(<EmotionTrendChart data={[]} />);
      const chart = container.querySelector('.recharts-wrapper');
      expect(chart).toBeInTheDocument();
    });
  });

  describe('FaceMetricsGauge', () => {
    it('should display waiting message before data is available', () => {
      render(<FaceMetricsGauge data={null} />);
      expect(screen.getByText('データを待機中...')).toBeInTheDocument();
    });

    it('should display zero values when data is provided', () => {
      render(<FaceMetricsGauge data={{ faceMovement: 0, sightMovement: 0 }} />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('Face')).toBeInTheDocument();
      expect(screen.getByText('Sight')).toBeInTheDocument();
    });
  });

  describe('FaceMapVisualization', () => {
    it('should display waiting message when not active', () => {
      render(<FaceMapVisualization isActive={false} />);
      expect(screen.getByText('顔認識待機中...')).toBeInTheDocument();
      expect(screen.getByText('セッション開始時に表示されます')).toBeInTheDocument();
    });

    it('should display face map svg even when not active', () => {
      const { container } = render(<FaceMapVisualization isActive={false} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveStyle('opacity: 0.2');
    });
  });

  describe('TranscriptArea', () => {
    it('should display placeholder when no transcript exists', () => {
      render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
      expect(screen.getByText('音声認識による文字起こしがここに表示されます...')).toBeInTheDocument();
    });

    it('should display listening message when listening', () => {
      render(<TranscriptArea transcript="" interimTranscript="" isListening={true} />);
      expect(screen.getByText('音声を認識中...')).toBeInTheDocument();
    });

    it('should have proper scroll container styles', () => {
      const { container } = render(<TranscriptArea transcript="" interimTranscript="" isListening={false} />);
      const scrollContainer = container.querySelector('[data-testid="transcript-scroll-container"]');
      expect(scrollContainer).toHaveClass('overflow-y-auto');
    });
  });

  describe('RealtimeDashboard - Text Areas', () => {
    it('should display empty expression and insight areas before recording', () => {
      render(<RealtimeDashboard />);
      
      // 表情エリアの確認
      const expressionArea = screen.getByText('表情：').parentElement;
      expect(expressionArea).toBeInTheDocument();
      expect(expressionArea.textContent).toBe('表情：');
      
      // インサイトエリアの確認
      const insightArea = screen.getByText('インサイト：').parentElement;
      expect(insightArea).toBeInTheDocument();
      expect(insightArea.textContent).toBe('インサイト：');
    });

    it('should display all components in initial state', () => {
      render(<RealtimeDashboard />);
      
      // ヘッダーテキスト
      expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument();
      expect(screen.getByText('1分ほどお話をしてください')).toBeInTheDocument();
      
      // 開始ボタン
      expect(screen.getByRole('button', { name: '開始' })).toBeInTheDocument();
      
      // 各コンポーネントのタイトル
      expect(screen.getByText('感情の変化')).toBeInTheDocument();
      expect(screen.getByText('感情の変化をリアルタイムに推定')).toBeInTheDocument();
      expect(screen.getByText('視線 / 顔の動き')).toBeInTheDocument();
      expect(screen.getByText('フェイスマップ')).toBeInTheDocument();
      expect(screen.getByText('発話内容')).toBeInTheDocument();
    });
  });
});