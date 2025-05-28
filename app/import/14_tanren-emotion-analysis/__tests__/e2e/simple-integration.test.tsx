import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SessionProvider } from '@/contexts/session-context';
import RealtimeDashboard from '@/components/realtime-dashboard';

// Mock all hooks
jest.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: () => ({
    stream: null,
    error: null,
    isLoading: false,
    startStream: jest.fn().mockResolvedValue(new MediaStream()),
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
    saveSession: jest.fn().mockResolvedValue({ success: true }),
    loadSessions: jest.fn(),
  }),
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock MediaStream
global.MediaStream = jest.fn().mockImplementation(() => ({
  getTracks: jest.fn(() => []),
}));

describe('Simple E2E Integration', () => {
  it('should render dashboard with initial empty states', () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    // Check header
    expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument();
    
    // Check empty states
    expect(screen.getByText('セッション開始時に感情分析が表示されます')).toBeInTheDocument();
    expect(screen.getByText('セッション開始時に感情推移が表示されます')).toBeInTheDocument();
    
    // Check start button
    expect(screen.getByRole('button', { name: /開始/i })).toBeInTheDocument();
  });

  it('should show recording UI when recording starts', async () => {
    const user = userEvent.setup();
    
    // Mock hooks to simulate recording state
    const useSessionRecording = require('@/hooks/use-session-recording').useSessionRecording;
    useSessionRecording.mockReturnValue({
      isRecording: true,
      recordingDuration: 10,
      currentSession: { id: 'test-session' },
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
    });

    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    // Rerender to apply new hook state
    rerender(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );

    // Check recording indicators
    await waitFor(() => {
      expect(screen.getByText('録画中')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /ストップ/i })).toBeInTheDocument();
    });
  });
});