import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RealtimeDashboard from '@/components/realtime-dashboard';
import { SessionProvider } from '@/contexts/session-context';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock the hooks
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
    saveSession: jest.fn().mockResolvedValue({ success: true, sessionId: 'test-session-id' }),
    loadSessions: jest.fn(),
  }),
}));

// Mock MediaStream
global.MediaStream = jest.fn().mockImplementation(() => ({
  id: 'mock-stream-id',
  active: true,
  getTracks: jest.fn(() => []),
  getAudioTracks: jest.fn(() => []),
  getVideoTracks: jest.fn(() => []),
  addTrack: jest.fn(),
  removeTrack: jest.fn(),
}));

// Mock MediaRecorder
global.MediaRecorder = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  ondataavailable: null,
  onstop: null,
  onerror: null,
  state: 'inactive',
}));

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue(new MediaStream()),
  },
  writable: true,
});

describe('Start Button Functionality', () => {
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <SessionProvider>
        {component}
      </SessionProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show start button when not recording', () => {
    renderWithProviders(<RealtimeDashboard />);
    
    const startButton = screen.getByRole('button', { name: /録画を開始|開始/i });
    expect(startButton).toBeInTheDocument();
    expect(startButton).toHaveTextContent('開始');
  });

  it('should acquire camera and microphone permission when start button is clicked', async () => {
    const mockStartStream = jest.fn().mockResolvedValue(new MediaStream());
    const mockStartListening = jest.fn();
    const mockStartRecording = jest.fn();
    
    jest.spyOn(require('@/hooks/use-media-stream'), 'useMediaStream').mockReturnValue({
      stream: null,
      error: null,
      isLoading: false,
      startStream: mockStartStream,
      stopStream: jest.fn(),
    });
    
    jest.spyOn(require('@/hooks/use-speech-recognition'), 'useSpeechRecognition').mockReturnValue({
      transcript: '',
      interimTranscript: '',
      isListening: false,
      error: null,
      startListening: mockStartListening,
      stopListening: jest.fn(),
    });
    
    jest.spyOn(require('@/hooks/use-session-recording'), 'useSessionRecording').mockReturnValue({
      isRecording: false,
      recordingDuration: 0,
      currentSession: null,
      startRecording: mockStartRecording,
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
    
    renderWithProviders(<RealtimeDashboard />);
    
    const startButton = screen.getByRole('button', { name: /録画を開始|開始/i });
    
    await userEvent.click(startButton);
    
    await waitFor(() => {
      expect(mockStartStream).toHaveBeenCalled();
      expect(mockStartListening).toHaveBeenCalled();
      expect(mockStartRecording).toHaveBeenCalled();
    });
  });

  it('should start MediaRecorder when stream is acquired', async () => {
    const mockStream = new MediaStream();
    const mockStartRecording = jest.fn();
    
    jest.spyOn(require('@/hooks/use-media-stream'), 'useMediaStream').mockReturnValue({
      stream: null,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    });
    
    jest.spyOn(require('@/hooks/use-session-recording'), 'useSessionRecording').mockReturnValue({
      isRecording: false,
      recordingDuration: 0,
      currentSession: null,
      startRecording: mockStartRecording,
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
    
    renderWithProviders(<RealtimeDashboard />);
    
    const startButton = screen.getByRole('button', { name: /録画を開始|開始/i });
    
    await userEvent.click(startButton);
    
    await waitFor(() => {
      expect(mockStartRecording).toHaveBeenCalledWith(mockStream);
    });
  });

  it('should change button to stop button after recording starts', async () => {
    const { rerender } = renderWithProviders(<RealtimeDashboard />);
    
    const startButton = screen.getByRole('button', { name: /録画を開始|開始/i });
    
    await userEvent.click(startButton);
    
    // Mock the recording state change
    jest.spyOn(require('@/hooks/use-session-recording'), 'useSessionRecording').mockReturnValue({
      isRecording: true,
      recordingDuration: 0,
      currentSession: { id: 'test-session', emotions: [], transcript: '', duration: 0 },
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
    
    rerender(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );
    
    await waitFor(() => {
      const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
      expect(stopButton).toBeInTheDocument();
      expect(stopButton).toHaveTextContent('ストップ');
    });
  });

  it('should show error message when camera/microphone access is denied', async () => {
    const mockError = new Error('Permission denied');
    
    jest.spyOn(require('@/hooks/use-media-stream'), 'useMediaStream').mockReturnValue({
      stream: null,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockRejectedValue(mockError),
      stopStream: jest.fn(),
    });
    
    // Mock window.alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithProviders(<RealtimeDashboard />);
    
    const startButton = screen.getByRole('button', { name: /録画を開始|開始/i });
    
    await userEvent.click(startButton);
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('録画の開始に失敗しました')
      );
    });
    
    alertSpy.mockRestore();
  });
});