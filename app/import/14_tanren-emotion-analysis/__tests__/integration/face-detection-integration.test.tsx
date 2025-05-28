import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import RealtimeDashboard from '@/components/realtime-dashboard'
import { SessionProvider } from '@/contexts/session-context'

// Mock all the hooks
jest.mock('@/hooks/use-media-stream')
jest.mock('@/hooks/use-speech-recognition')
jest.mock('@/hooks/use-video-frame-capture')
jest.mock('@/hooks/use-emotion-analysis')
jest.mock('@/hooks/use-session-recording')
jest.mock('@/hooks/use-face-detection')
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock MediaPipe modules
jest.mock('@mediapipe/tasks-vision', () => ({
  FaceLandmarker: {
    createFromOptions: jest.fn().mockResolvedValue({
      detectForVideo: jest.fn().mockReturnValue({
        faceLandmarks: [[
          { x: 0.5, y: 0.5, z: 0 },
          { x: 0.6, y: 0.6, z: 0 },
        ]]
      }),
      close: jest.fn()
    })
  },
  FilesetResolver: {
    forVisionTasks: jest.fn().mockResolvedValue({})
  }
}))

jest.mock('@mediapipe/face_mesh', () => ({
  FACEMESH_TESSELATION: [[0, 1]],
  FACEMESH_LIPS: [[13, 14]],
  FACEMESH_LEFT_EYE: [[33, 133]],
  FACEMESH_RIGHT_EYE: [[362, 398]],
  FACEMESH_FACE_OVAL: [[10, 338]],
}))

describe('Face Detection Integration', () => {
  let mockStream: MediaStream
  let mockUseMediaStream: any
  let mockUseFaceDetection: any

  beforeEach(() => {
    // Setup mock stream
    mockStream = {
      getTracks: jest.fn().mockReturnValue([
        { kind: 'video', stop: jest.fn() },
        { kind: 'audio', stop: jest.fn() }
      ]),
    } as unknown as MediaStream

    // Mock canvas context
    const mockContext = {
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      fillText: jest.fn(),
      ellipse: jest.fn(),
      strokeStyle: '',
      fillStyle: '',
      lineWidth: 1,
      globalAlpha: 1,
      font: '',
      textAlign: 'left' as CanvasTextAlign,
      textBaseline: 'alphabetic' as CanvasTextBaseline,
    }

    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext) as any

    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn((cb) => {
      cb(0)
      return 0
    }) as any
    global.cancelAnimationFrame = jest.fn()

    // Setup hook mocks
    mockUseMediaStream = require('@/hooks/use-media-stream').useMediaStream
    mockUseMediaStream.mockReturnValue({
      stream: null,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    })

    const mockUseSpeechRecognition = require('@/hooks/use-speech-recognition').useSpeechRecognition
    mockUseSpeechRecognition.mockReturnValue({
      transcript: '',
      interimTranscript: '',
      isListening: false,
      error: null,
      startListening: jest.fn(),
      stopListening: jest.fn(),
    })

    const mockUseVideoFrameCapture = require('@/hooks/use-video-frame-capture').useVideoFrameCapture
    mockUseVideoFrameCapture.mockReturnValue({
      latestFrame: null,
      isCapturing: false,
    })

    const mockUseEmotionAnalysis = require('@/hooks/use-emotion-analysis').useEmotionAnalysis
    mockUseEmotionAnalysis.mockReturnValue({
      latestEmotions: null,
      emotionHistory: [],
      insights: null,
      facialExpression: null,
      isAnalyzing: false,
      error: null,
      queueFrameForAnalysis: jest.fn(),
      reset: jest.fn(),
    })

    const mockUseSessionRecording = require('@/hooks/use-session-recording').useSessionRecording
    mockUseSessionRecording.mockReturnValue({
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
    })

    mockUseFaceDetection = require('@/hooks/use-face-detection').useFaceDetection
    mockUseFaceDetection.mockReturnValue({
      landmarks: null,
      isLoading: false,
      error: null,
      isDetecting: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize face detection when recording starts', async () => {
    mockUseMediaStream.mockReturnValue({
      stream: mockStream,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    })

    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
    })

    await waitFor(() => {
      expect(mockUseFaceDetection).toHaveBeenCalledWith({
        stream: mockStream,
        enabled: true
      })
    })
  })

  it('should display face landmarks in the visualization', async () => {
    const mockLandmarks = Array(500).fill(null).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0
    }))

    mockUseFaceDetection.mockReturnValue({
      landmarks: mockLandmarks,
      isLoading: false,
      error: null,
      isDetecting: true,
    })

    mockUseMediaStream.mockReturnValue({
      stream: mockStream,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    })

    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
    })

    // Check that the face map visualization is receiving landmarks
    await waitFor(() => {
      const canvas = document.querySelector('canvas')
      expect(canvas).toBeInTheDocument()
    })
  })

  it('should stop face detection when recording stops', async () => {
    mockUseMediaStream.mockReturnValue({
      stream: mockStream,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    })

    const mockStartRecording = jest.fn()
    const mockStopRecording = jest.fn()
    
    const mockUseSessionRecording = require('@/hooks/use-session-recording').useSessionRecording
    mockUseSessionRecording.mockReturnValue({
      isRecording: true,
      recordingDuration: 5,
      currentSession: { id: 'test-session' },
      startRecording: mockStartRecording,
      stopRecording: mockStopRecording,
      addEmotionData: jest.fn(),
      updateTranscript: jest.fn(),
      getVideoUrl: jest.fn(),
      downloadVideo: jest.fn(),
      exportSessionData: jest.fn(),
      resetSession: jest.fn(),
      saveSession: jest.fn(),
      loadSessions: jest.fn(),
    })

    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    // First start recording
    const startButton = screen.getByRole('button', { name: /開始/i })
    await act(async () => {
      fireEvent.click(startButton)
    })

    // Verify face detection is enabled
    await waitFor(() => {
      expect(mockUseFaceDetection).toHaveBeenLastCalledWith({
        stream: mockStream,
        enabled: true
      })
    })

    // Now stop recording
    const stopButton = screen.getByRole('button', { name: /停止/i })
    await act(async () => {
      fireEvent.click(stopButton)
    })

    // Verify face detection is disabled
    await waitFor(() => {
      expect(mockUseFaceDetection).toHaveBeenLastCalledWith({
        stream: mockStream,
        enabled: false
      })
    })
  })

  it('should handle face detection errors gracefully', async () => {
    mockUseFaceDetection.mockReturnValue({
      landmarks: null,
      isLoading: false,
      error: 'Failed to initialize face detection',
      isDetecting: false,
    })

    mockUseMediaStream.mockReturnValue({
      stream: mockStream,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    })

    render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
    })

    // Should still render without crashing
    expect(screen.getByText(/フェイスマップ/i)).toBeInTheDocument()
    
    // Canvas should show placeholder
    const canvas = document.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('should update face visualization in real-time', async () => {
    let landmarkUpdates = 0
    const mockLandmarks1 = Array(500).fill(null).map(() => ({
      x: 0.5,
      y: 0.5,
      z: 0
    }))
    
    const mockLandmarks2 = Array(500).fill(null).map(() => ({
      x: 0.6,
      y: 0.6,
      z: 0
    }))

    mockUseFaceDetection.mockImplementation(() => {
      landmarkUpdates++
      return {
        landmarks: landmarkUpdates % 2 === 0 ? mockLandmarks1 : mockLandmarks2,
        isLoading: false,
        error: null,
        isDetecting: true,
      }
    })

    mockUseMediaStream.mockReturnValue({
      stream: mockStream,
      error: null,
      isLoading: false,
      startStream: jest.fn().mockResolvedValue(mockStream),
      stopStream: jest.fn(),
    })

    const { rerender } = render(
      <SessionProvider>
        <RealtimeDashboard />
      </SessionProvider>
    )

    const startButton = screen.getByRole('button', { name: /開始/i })
    
    await act(async () => {
      fireEvent.click(startButton)
    })

    // Trigger re-renders to simulate real-time updates
    for (let i = 0; i < 5; i++) {
      rerender(
        <SessionProvider>
          <RealtimeDashboard />
        </SessionProvider>
      )
      await waitFor(() => {
        expect(mockUseFaceDetection).toHaveBeenCalled()
      })
    }

    // Should have updated multiple times
    expect(landmarkUpdates).toBeGreaterThan(1)
  })
})