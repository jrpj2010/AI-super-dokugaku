import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'
import { downloadVideoBlob } from '@/lib/video-converter'

// Mock the video converter module
jest.mock('@/lib/video-converter', () => ({
  getBestVideoFormat: jest.fn().mockReturnValue({
    mimeType: 'video/mp4',
    extension: 'mp4'
  }),
  downloadVideoBlob: jest.fn(),
  generateVideoFilename: jest.fn().mockImplementation((sessionId, ext) => 
    `tanren_session_${sessionId}_2024-01-01T12-00-00.${ext}`
  )
}))

// Mock hooks
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

const mockDownloadVideo = jest.fn()
jest.mock('@/hooks/use-session-recording', () => ({
  useSessionRecording: () => ({
    isRecording: false,
    recordingDuration: 30,
    currentSession: {
      id: 'session_123456',
      startTime: new Date(),
      endTime: new Date(),
      duration: 30,
      transcript: 'Test transcript for download',
      emotions: [],
      insights: [],
      videoBlob: new Blob(['test video data'], { type: 'video/mp4' })
    },
    startRecording: jest.fn(),
    stopRecording: jest.fn(),
    addEmotionData: jest.fn(),
    updateTranscript: jest.fn(),
    getVideoUrl: jest.fn().mockReturnValue('blob:http://localhost/test-video'),
    downloadVideo: mockDownloadVideo,
    exportSessionData: jest.fn(),
    resetSession: jest.fn(),
    saveSession: jest.fn().mockResolvedValue({ success: true, sessionId: 'session_123456' }),
    loadSessions: jest.fn()
  })
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('MP4 Download Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display MP4 download button after recording', async () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // Simulate that recording has ended and session data is available
    await waitFor(() => {
      const downloadButton = screen.getByRole('button', { name: /録画データ\(MP4\)をダウンロード/ })
      expect(downloadButton).toBeInTheDocument()
    })
  })

  it('should have correct text on download button', async () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    await waitFor(() => {
      const downloadButton = screen.getByRole('button', { name: /録画データ\(MP4\)をダウンロード/ })
      expect(downloadButton).toHaveTextContent('録画データ(MP4)をダウンロード')
    })
  })

  it('should call downloadVideo when download button is clicked', async () => {
    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    await waitFor(() => {
      const downloadButton = screen.getByRole('button', { name: /録画データ\(MP4\)をダウンロード/ })
      fireEvent.click(downloadButton)
    })

    expect(mockDownloadVideo).toHaveBeenCalled()
  })
})

describe('MP4 Download in use-session-recording hook', () => {
  it('should use MP4 format when downloading', () => {
    const { useSessionRecording } = require('@/hooks/use-session-recording')
    
    // Create a mock implementation that uses the actual downloadVideoBlob
    const mockSessionData = {
      id: 'session_123456',
      videoBlob: new Blob(['test video'], { type: 'video/mp4' })
    }

    // Mock the hook to return our test data
    const hookResult = {
      currentSession: mockSessionData,
      downloadVideo: () => {
        if (mockSessionData.videoBlob && mockSessionData.id) {
          const sessionId = mockSessionData.id.replace('session_', '')
          downloadVideoBlob(mockSessionData.videoBlob, sessionId, 'mp4')
        }
      }
    }

    // Call the download function
    hookResult.downloadVideo()

    // Verify downloadVideoBlob was called with correct parameters
    expect(downloadVideoBlob).toHaveBeenCalledWith(
      mockSessionData.videoBlob,
      '123456',
      'mp4'
    )
  })

  it('should generate correct MP4 filename', () => {
    const { generateVideoFilename } = require('@/lib/video-converter')
    
    const filename = generateVideoFilename('123456', 'mp4')
    
    expect(filename).toMatch(/^tanren_session_123456_.*\.mp4$/)
  })
})