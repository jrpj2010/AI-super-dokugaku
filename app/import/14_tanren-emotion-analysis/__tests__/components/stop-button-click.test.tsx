import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'

// Mock the hooks and dependencies
jest.mock('@/hooks/use-media-stream', () => ({
  useMediaStream: () => ({
    stream: new MediaStream(),
    error: null,
    isLoading: false,
    startStream: jest.fn().mockResolvedValue(new MediaStream()),
    stopStream: jest.fn()
  })
}))

jest.mock('@/hooks/use-speech-recognition', () => ({
  useSpeechRecognition: () => ({
    transcript: 'Test transcript',
    interimTranscript: '',
    isListening: false,
    error: null,
    startListening: jest.fn(),
    stopListening: jest.fn()
  })
}))

jest.mock('@/hooks/use-video-frame-capture', () => ({
  useVideoFrameCapture: () => ({
    latestFrame: null,
    isCapturing: false
  })
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
    reset: jest.fn()
  })
}))

const mockStopRecording = jest.fn()
jest.mock('@/hooks/use-session-recording', () => ({
  useSessionRecording: () => ({
    isRecording: false,
    recordingDuration: 0,
    currentSession: null,
    startRecording: jest.fn(),
    stopRecording: mockStopRecording,
    addEmotionData: jest.fn(),
    updateTranscript: jest.fn(),
    getVideoUrl: jest.fn(),
    downloadVideo: jest.fn(),
    exportSessionData: jest.fn(),
    resetSession: jest.fn(),
    saveSession: jest.fn().mockResolvedValue({ success: true, sessionId: 'test-123' }),
    loadSessions: jest.fn()
  })
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('Stop Button Click Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should have proper z-index styling on stop button', async () => {
    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // Start recording first
    const startButton = screen.getByRole('button', { name: /開始/ })
    fireEvent.click(startButton)

    // Wait for recording to start and update the component
    await waitFor(() => {
      // Re-render to simulate recording state
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: true,
        recordingDuration: 5,
        currentSession: { id: 'test-123' },
        startRecording: jest.fn(),
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: jest.fn(),
        downloadVideo: jest.fn(),
        exportSessionData: jest.fn(),
        resetSession: jest.fn(),
        saveSession: jest.fn().mockResolvedValue({ success: true, sessionId: 'test-123' }),
        loadSessions: jest.fn()
      })
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
    })

    // Check stop button exists and has proper styling
    const stopButton = screen.getByRole('button', { name: /ストップ/ })
    expect(stopButton).toBeInTheDocument()
    expect(stopButton).toHaveClass('relative', 'z-20')
    expect(stopButton).toHaveStyle({ position: 'relative', zIndex: '20' })
  })

  it('should be clickable and trigger stop recording', async () => {
    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // Start recording
    const startButton = screen.getByRole('button', { name: /開始/ })
    fireEvent.click(startButton)

    // Update to recording state
    await waitFor(() => {
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: true,
        recordingDuration: 5,
        currentSession: {
          id: 'test-123',
          startTime: new Date(),
          duration: 5,
          transcript: 'Test transcript',
          emotions: [],
          insights: [],
          videoBlob: new Blob(['test'], { type: 'video/mp4' })
        },
        startRecording: jest.fn(),
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: jest.fn(),
        downloadVideo: jest.fn(),
        exportSessionData: jest.fn(),
        resetSession: jest.fn(),
        saveSession: jest.fn().mockResolvedValue({ success: true, sessionId: 'test-123' }),
        loadSessions: jest.fn()
      })
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
    })

    // Find and click stop button
    const stopButton = screen.getByRole('button', { name: /ストップ/ })
    expect(stopButton).toBeInTheDocument()
    expect(stopButton).not.toBeDisabled()

    // Click the stop button
    fireEvent.click(stopButton)

    // Verify stop recording was called
    await waitFor(() => {
      expect(mockStopRecording).toHaveBeenCalled()
    })
  })

  it('should not be blocked by other UI elements', async () => {
    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // Start recording
    const startButton = screen.getByRole('button', { name: /開始/ })
    fireEvent.click(startButton)

    // Update to recording state
    await waitFor(() => {
      jest.mocked(require('@/hooks/use-session-recording').useSessionRecording).mockReturnValue({
        isRecording: true,
        recordingDuration: 10,
        currentSession: { id: 'test-123' },
        startRecording: jest.fn(),
        stopRecording: mockStopRecording,
        addEmotionData: jest.fn(),
        updateTranscript: jest.fn(),
        getVideoUrl: jest.fn(),
        downloadVideo: jest.fn(),
        exportSessionData: jest.fn(),
        resetSession: jest.fn(),
        saveSession: jest.fn().mockResolvedValue({ success: true, sessionId: 'test-123' }),
        loadSessions: jest.fn()
      })
      
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
    })

    const stopButton = screen.getByRole('button', { name: /ストップ/ })
    
    // Get computed style to check if button is visible and clickable
    const computedStyle = window.getComputedStyle(stopButton)
    expect(computedStyle.pointerEvents).not.toBe('none')
    expect(computedStyle.visibility).not.toBe('hidden')
    expect(computedStyle.display).not.toBe('none')
    
    // Check parent container also has proper z-index
    const buttonContainer = stopButton.parentElement
    expect(buttonContainer).toHaveClass('relative', 'z-10')
  })
})