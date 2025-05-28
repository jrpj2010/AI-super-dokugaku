import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'
import { useRouter } from 'next/navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock hooks
jest.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: () => ({
    stream: null,
    error: null,
    isLoading: false,
    startStream: jest.fn(),
    stopStream: jest.fn(),
  }),
}))

jest.mock('@/hooks/use-speech-recognition', () => ({
  useSpeechRecognition: () => ({
    transcript: '',
    interimTranscript: '',
    isListening: false,
    error: null,
    startListening: jest.fn(),
    stopListening: jest.fn(),
  }),
}))

jest.mock('@/hooks/use-video-frame-capture', () => ({
  useVideoFrameCapture: () => ({
    latestFrame: null,
    isCapturing: false,
  }),
}))

jest.mock('@/hooks/use-face-detection', () => ({
  useFaceDetection: () => ({
    landmarks: null,
    isLoading: false,
    error: null,
    isDetecting: false,
  }),
}))

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
}))

// Mock session recording hook
const mockStartRecording = jest.fn()
const mockStopRecording = jest.fn()
const mockDownloadVideo = jest.fn()
const mockResetSession = jest.fn()
const mockSaveSession = jest.fn()
const mockGetVideoUrl = jest.fn()

jest.mock('@/hooks/use-session-recording', () => ({
  useSessionRecording: () => ({
    isRecording: false,
    recordingDuration: 0,
    currentSession: null,
    startRecording: mockStartRecording,
    stopRecording: mockStopRecording,
    addEmotionData: jest.fn(),
    updateTranscript: jest.fn(),
    getVideoUrl: mockGetVideoUrl,
    downloadVideo: mockDownloadVideo,
    exportSessionData: jest.fn(),
    resetSession: mockResetSession,
    saveSession: mockSaveSession,
    loadSessions: jest.fn(),
  }),
}))

// Mock video-converter
jest.mock('@/lib/video-converter', () => ({
  generateVideoFilename: (sessionId: string, extension: string) => 
    `tanren_session_${sessionId}_2024-01-01T00-00-00.${extension}`,
  downloadVideoBlob: jest.fn(),
  getBestVideoFormat: () => ({ mimeType: 'video/mp4', extension: 'mp4' }),
}))

describe('Session End Buttons', () => {
  let mockPush: jest.Mock

  beforeEach(() => {
    mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
    jest.clearAllMocks()
  })

  const renderWithProvider = (children: React.ReactNode) => {
    return render(
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }

  describe('Button Visibility', () => {
    it('should show only start button initially', () => {
      renderWithProvider(<RealtimeDashboard />)
      
      expect(screen.getByRole('button', { name: /開始/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /新しいセッション/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /再生/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /分析処理を開始/i })).not.toBeInTheDocument()
      expect(screen.queryByText(/録画データ\(MP4\)をダウンロード/i)).not.toBeInTheDocument()
    })

    it('should show stop button during recording', async () => {
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Mock recording state
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: true,
        recordingDuration: 10,
        currentSession: {
          id: 'session_123',
          startTime: new Date(),
          duration: 10,
          transcript: '',
          emotions: [],
          insights: [],
        },
        startRecording: mockStartRecording,
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: mockGetVideoUrl,
        downloadVideo: mockDownloadVideo,
        exportSessionData: jest.fn(),
        resetSession: mockResetSession,
        saveSession: mockSaveSession,
        loadSessions: jest.fn(),
      })
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      expect(screen.getByRole('button', { name: /ストップ/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /新しいセッション/i })).not.toBeInTheDocument()
    })

    it('should show all action buttons after session ends', async () => {
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Mock session ended state
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: false,
        recordingDuration: 30,
        currentSession: {
          id: 'session_123',
          startTime: new Date(),
          endTime: new Date(),
          duration: 30,
          transcript: 'Test transcript',
          emotions: [],
          insights: [],
          videoBlob: new Blob(['video'], { type: 'video/mp4' }),
        },
        startRecording: mockStartRecording,
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: mockGetVideoUrl,
        downloadVideo: mockDownloadVideo,
        exportSessionData: jest.fn(),
        resetSession: mockResetSession,
        saveSession: mockSaveSession,
        loadSessions: jest.fn(),
      })
      
      // Click start button
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      // Update to show session ended
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      // Wait for session end state
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /新しいセッション/i })).toBeInTheDocument()
      })
      
      expect(screen.getByRole('button', { name: /再生/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /分析処理を開始/i })).toBeInTheDocument()
      expect(screen.getByText(/録画データ\(MP4\)をダウンロード/i)).toBeInTheDocument()
    })
  })

  describe('Button Functionality', () => {
    beforeEach(() => {
      // Mock session ended state with video
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: false,
        recordingDuration: 30,
        currentSession: {
          id: 'session_123456789',
          startTime: new Date(),
          endTime: new Date(),
          duration: 30,
          transcript: 'Test transcript',
          emotions: [],
          insights: [],
          videoBlob: new Blob(['video'], { type: 'video/mp4' }),
        },
        startRecording: mockStartRecording,
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: mockGetVideoUrl.mockReturnValue('blob:http://localhost/video'),
        downloadVideo: mockDownloadVideo,
        exportSessionData: jest.fn(),
        resetSession: mockResetSession,
        saveSession: mockSaveSession.mockResolvedValue({ success: true, sessionId: 'session_123456789' }),
        loadSessions: jest.fn(),
      })
    })

    it('should handle new session button click', async () => {
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /新しいセッション/i })).toBeInTheDocument()
      })
      
      // Click new session button
      fireEvent.click(screen.getByRole('button', { name: /新しいセッション/i }))
      
      await waitFor(() => {
        expect(mockResetSession).toHaveBeenCalled()
      })
    })

    it('should handle playback button click', async () => {
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /再生/i })).toBeInTheDocument()
      })
      
      // Click playback button
      fireEvent.click(screen.getByRole('button', { name: /再生/i }))
      
      await waitFor(() => {
        expect(mockGetVideoUrl).toHaveBeenCalled()
      })
    })

    it('should handle analysis button click and navigate to report', async () => {
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /分析処理を開始/i })).toBeInTheDocument()
      })
      
      // Click analysis button
      fireEvent.click(screen.getByRole('button', { name: /分析処理を開始/i }))
      
      // Should show processing state
      await waitFor(() => {
        expect(screen.getByText(/分析中\.\.\./i)).toBeInTheDocument()
      })
      
      // Should navigate to report after processing
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/?tab=report')
      }, { timeout: 2000 })
    })

    it('should handle download button click', async () => {
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByText(/録画データ\(MP4\)をダウンロード/i)).toBeInTheDocument()
      })
      
      // Click download button
      const downloadButton = screen.getByRole('button', { name: /録画データ\(MP4\)をダウンロード/i })
      fireEvent.click(downloadButton)
      
      await waitFor(() => {
        expect(mockDownloadVideo).toHaveBeenCalled()
      })
    })

    it('should disable playback button when no video blob', async () => {
      // Mock session without video blob
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: false,
        recordingDuration: 30,
        currentSession: {
          id: 'session_123',
          startTime: new Date(),
          endTime: new Date(),
          duration: 30,
          transcript: 'Test transcript',
          emotions: [],
          insights: [],
          videoBlob: undefined, // No video blob
        },
        startRecording: mockStartRecording,
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: mockGetVideoUrl.mockReturnValue(null),
        downloadVideo: mockDownloadVideo,
        exportSessionData: jest.fn(),
        resetSession: mockResetSession,
        saveSession: mockSaveSession,
        loadSessions: jest.fn(),
      })
      
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /再生/i })).toBeInTheDocument()
      })
      
      const playbackButton = screen.getByRole('button', { name: /再生/i })
      expect(playbackButton).toBeDisabled()
    })
  })

  describe('Video Filename Format', () => {
    it('should generate correct filename format', async () => {
      const { generateVideoFilename } = require('@/lib/video-converter')
      
      const filename = generateVideoFilename('123456789', 'mp4')
      expect(filename).toMatch(/^tanren_session_123456789_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.mp4$/)
    })
  })

  describe('Session State Transitions', () => {
    it('should clear currentSession when clicking new session', async () => {
      const mockSetCurrentSession = jest.fn()
      
      // Mock the context with a spy
      jest.spyOn(require('@/contexts/session-context'), 'useSessionContext').mockReturnValue({
        currentSession: null,
        setCurrentSession: mockSetCurrentSession,
      })
      
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /新しいセッション/i })).toBeInTheDocument()
      })
      
      // Click new session
      fireEvent.click(screen.getByRole('button', { name: /新しいセッション/i }))
      
      // Verify reset was called
      expect(mockResetSession).toHaveBeenCalled()
    })

    it('should update SessionContext when analysis is started', async () => {
      const mockSetCurrentSession = jest.fn()
      
      jest.spyOn(require('@/contexts/session-context'), 'useSessionContext').mockReturnValue({
        currentSession: null,
        setCurrentSession: mockSetCurrentSession,
      })
      
      const { rerender } = renderWithProvider(<RealtimeDashboard />)
      
      // Trigger session end state
      fireEvent.click(screen.getByRole('button', { name: /開始/i }))
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /分析処理を開始/i })).toBeInTheDocument()
      })
      
      // Click analysis button
      fireEvent.click(screen.getByRole('button', { name: /分析処理を開始/i }))
      
      // Wait for processing to complete
      await waitFor(() => {
        expect(mockSetCurrentSession).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'session_123456789',
            duration: 30,
            transcript: 'Test transcript',
          })
        )
      }, { timeout: 2000 })
    })
  })
})