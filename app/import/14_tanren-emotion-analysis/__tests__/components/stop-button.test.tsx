import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RealtimeDashboard from '@/components/realtime-dashboard';
import { SessionProvider } from '@/contexts/session-context';

// Mock MediaStream
global.MediaStream = jest.fn().mockImplementation(() => ({
  id: 'mock-stream-id',
  active: true,
  getTracks: jest.fn(() => [{
    stop: jest.fn(),
    kind: 'video'
  }, {
    stop: jest.fn(),
    kind: 'audio'
  }]),
  getAudioTracks: jest.fn(() => [{
    stop: jest.fn()
  }]),
  getVideoTracks: jest.fn(() => [{
    stop: jest.fn()
  }]),
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
  state: 'recording',
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock all hooks at module level
jest.mock('@/hooks/use-media-stream');
jest.mock('@/hooks/use-speech-recognition');
jest.mock('@/hooks/use-video-frame-capture');
jest.mock('@/hooks/use-emotion-analysis');
jest.mock('@/hooks/use-session-recording');
jest.mock('@/contexts/session-context');

// Create mock session data
const mockSessionData = {
  id: 'test-session-123',
  startTime: Date.now(),
  duration: 30,
  emotions: [
    {
      timestamp: Date.now(),
      emotions: { joy: 80, sadness: 10, anger: 5, fear: 2, surprise: 3, confidence: 85, interest: 75 },
      facialExpression: 'Confident and engaged expression',
      insight: 'The user appears highly engaged and positive'
    }
  ],
  transcript: 'こんにちは、今日は調子がいいです。新しいプロジェクトを始めようと思っています。',
  videoBlob: new Blob(['mock video data'], { type: 'video/webm' }),
  insights: [],
  averageEmotions: {
    joy: 80,
    sadness: 10,
    anger: 5,
    fear: 2,
    surprise: 3,
    confidence: 85,
    interest: 75
  }
};

describe('Stop Button Functionality', () => {
  let mockStopStream: jest.Mock;
  let mockStopListening: jest.Mock;
  let mockStopRecording: jest.Mock;
  let mockSaveSession: jest.Mock;
  let mockResetSession: jest.Mock;
  let mockSetGlobalSession: jest.Mock;

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <SessionProvider>
        {component}
      </SessionProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockStopStream = jest.fn();
    mockStopListening = jest.fn();
    mockStopRecording = jest.fn();
    mockSaveSession = jest.fn().mockResolvedValue({ success: true, sessionId: 'test-session-123' });
    mockResetSession = jest.fn();
    mockSetGlobalSession = jest.fn();

    // Mock hooks with recording state
    const useMediaStream = require('@/hooks/use-media-stream').useMediaStream as jest.Mock;
    useMediaStream.mockReturnValue({
      stream: new MediaStream(),
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(new MediaStream()),
      stopStream: mockStopStream,
    });
    
    const useSpeechRecognition = require('@/hooks/use-speech-recognition').useSpeechRecognition as jest.Mock;
    useSpeechRecognition.mockReturnValue({
      transcript: mockSessionData.transcript,
      interimTranscript: '',
      isListening: true,
      error: null,
      startListening: jest.fn(),
      stopListening: mockStopListening,
    });
    
    const useVideoFrameCapture = require('@/hooks/use-video-frame-capture').useVideoFrameCapture as jest.Mock;
    useVideoFrameCapture.mockReturnValue({
      latestFrame: 'mock-frame-data',
      isCapturing: true,
    });

    const useEmotionAnalysis = require('@/hooks/use-emotion-analysis').useEmotionAnalysis as jest.Mock;
    useEmotionAnalysis.mockReturnValue({
      latestEmotions: mockSessionData.emotions[0].emotions,
      emotionHistory: mockSessionData.emotions,
      insights: mockSessionData.emotions[0].insight,
      facialExpression: mockSessionData.emotions[0].facialExpression,
      isAnalyzing: true,
      error: null,
      queueFrameForAnalysis: jest.fn(),
      reset: jest.fn(),
    });

    const useSessionRecording = require('@/hooks/use-session-recording').useSessionRecording as jest.Mock;
    useSessionRecording.mockReturnValue({
      isRecording: true,
      recordingDuration: 30,
      currentSession: mockSessionData,
      startRecording: jest.fn(),
      stopRecording: mockStopRecording,
      addEmotionData: jest.fn(),
      updateTranscript: jest.fn(),
      getVideoUrl: jest.fn().mockReturnValue('blob:http://localhost/test-video'),
      downloadVideo: jest.fn(),
      exportSessionData: jest.fn(),
      resetSession: mockResetSession,
      saveSession: mockSaveSession,
      loadSessions: jest.fn(),
    });
    
    const useSessionContext = require('@/contexts/session-context').useSessionContext as jest.Mock;
    useSessionContext.mockReturnValue({
      currentSession: null,
      setCurrentSession: mockSetGlobalSession,
    });
  });

  it('should show stop button when recording is active', () => {
    // Mock the component to be in recording state
    const mockSetIsRecording = jest.fn();
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValue([false, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    expect(stopButton).toBeInTheDocument();
    expect(stopButton).toHaveTextContent('ストップ');
  });

  it('should stop all recording processes when stop button is clicked', async () => {
    // Mock the component to be in recording state
    const mockSetIsRecording = jest.fn();
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValue([0, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    
    await userEvent.click(stopButton);
    
    await waitFor(() => {
      expect(mockSetIsRecording).toHaveBeenCalledWith(false);
      expect(mockStopListening).toHaveBeenCalled();
      expect(mockStopRecording).toHaveBeenCalled();
    });
  });

  it('should stop media stream after recording stops', async () => {
    const mockSetIsRecording = jest.fn();
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValue([0, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    
    await userEvent.click(stopButton);
    
    await waitFor(() => {
      expect(mockStopStream).toHaveBeenCalled();
    }, { timeout: 1500 }); // Wait for the 500ms delays
  });

  it('should save session data automatically after stopping', async () => {
    const mockSetIsRecording = jest.fn();
    const mockSetSessionEnded = jest.fn();
    
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValueOnce([30, jest.fn()]) // recordingTime
      .mockReturnValueOnce([mockSessionData.emotions[0], jest.fn()]) // currentEmotion
      .mockReturnValueOnce([null, jest.fn()]) // currentFaceMetrics
      .mockReturnValueOnce([[{time: '0:30', ポジティブ: 80, ネガティブ: 10, ニュートラル: 10}], jest.fn()]) // sentimentHistory
      .mockReturnValueOnce([false, mockSetSessionEnded]) // sessionEnded
      .mockReturnValue([false, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    
    await userEvent.click(stopButton);
    
    await waitFor(() => {
      expect(mockSaveSession).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('should show success message when session is saved successfully', async () => {
    const mockSetIsRecording = jest.fn();
    
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValue([0, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    
    await userEvent.click(stopButton);
    
    await waitFor(() => {
      expect(mockSetGlobalSession).toHaveBeenCalledWith(mockSessionData);
    }, { timeout: 2000 });
  });

  it('should show error alert when session save fails', async () => {
    mockSaveSession.mockResolvedValueOnce({ success: false, error: 'Storage quota exceeded' });
    
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    const mockSetIsRecording = jest.fn();
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValue([0, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    
    await userEvent.click(stopButton);
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('セッションの保存に失敗しました: Storage quota exceeded');
    }, { timeout: 2000 });
    
    alertSpy.mockRestore();
  });

  it('should show new session and analysis buttons after stopping', async () => {
    const { rerender } = renderWithProviders(<RealtimeDashboard />);
    
    // Simulate recording state
    const useSessionRecording = require('@/hooks/use-session-recording').useSessionRecording as jest.Mock;
    useSessionRecording.mockReturnValue({
      isRecording: false,
      recordingDuration: 0,
      currentSession: mockSessionData,
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
      addEmotionData: jest.fn(),
      updateTranscript: jest.fn(),
      getVideoUrl: jest.fn().mockReturnValue('blob:http://localhost/test-video'),
      downloadVideo: jest.fn(),
      exportSessionData: jest.fn(),
      resetSession: jest.fn(),
      saveSession: jest.fn(),
      loadSessions: jest.fn(),
    });
    
    // Re-render to simulate state after stopping
    rerender(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /新しいセッション/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /再生/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /分析処理を開始/i })).toBeInTheDocument();
    });
  });

  it('should properly clean up all resources when stopping', async () => {
    const mockTracks = [
      { stop: jest.fn(), kind: 'video' },
      { stop: jest.fn(), kind: 'audio' }
    ];
    
    const mockStream = {
      getTracks: jest.fn(() => mockTracks),
      getAudioTracks: jest.fn(() => [mockTracks[1]]),
      getVideoTracks: jest.fn(() => [mockTracks[0]]),
    };
    
    const useMediaStream = require('@/hooks/use-media-stream').useMediaStream as jest.Mock;
    useMediaStream.mockReturnValue({
      stream: mockStream,
      error: null,
      isLoading: false,
      startStream: jest.fn(),
      stopStream: jest.fn(() => {
        mockTracks.forEach(track => track.stop());
      }),
    });
    
    const mockSetIsRecording = jest.fn();
    React.useState = jest.fn()
      .mockReturnValueOnce([true, mockSetIsRecording]) // isRecording
      .mockReturnValue([0, jest.fn()]); // other states
    
    renderWithProviders(<RealtimeDashboard />);
    
    const stopButton = screen.getByRole('button', { name: /録画を停止|ストップ/i });
    
    await userEvent.click(stopButton);
    
    await waitFor(() => {
      expect(mockTracks[0].stop).toHaveBeenCalled();
      expect(mockTracks[1].stop).toHaveBeenCalled();
    }, { timeout: 2000 });
  });
});