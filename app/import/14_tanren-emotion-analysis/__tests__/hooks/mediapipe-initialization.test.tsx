import { renderHook, act, waitFor } from '@testing-library/react'
import { useFaceDetection } from '@/hooks/use-face-detection'

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

describe('MediaPipe Initialization', () => {
  let mockStream: MediaStream

  beforeEach(() => {
    // Create mock MediaStream
    mockStream = {
      getTracks: jest.fn().mockReturnValue([]),
      addTrack: jest.fn(),
      removeTrack: jest.fn(),
    } as unknown as MediaStream

    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn((cb) => {
      cb(0)
      return 0
    }) as any
    global.cancelAnimationFrame = jest.fn()

    // Mock performance.now
    global.performance.now = jest.fn().mockReturnValue(0)

    // Mock document.createElement for video element
    const mockVideo = {
      srcObject: null,
      autoplay: false,
      muted: false,
      playsInline: false,
      onloadedmetadata: null,
      play: jest.fn(),
      pause: jest.fn(),
      readyState: 4, // HAVE_ENOUGH_DATA
      HAVE_ENOUGH_DATA: 4,
    }

    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'video') {
        return mockVideo as any
      }
      return document.createElement(tagName)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize MediaPipe FaceLandmarker when enabled', async () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockStream, enabled: true })
    )

    // Initially should be loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
    expect(result.current.landmarks).toBe(null)

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Should not have errors
    expect(result.current.error).toBe(null)
  })

  it('should not initialize when disabled', async () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: null, enabled: false })
    )

    // Should not be loading when disabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)
    expect(result.current.landmarks).toBe(null)
    expect(result.current.isDetecting).toBe(false)
  })

  it('should detect faces when stream is available', async () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockStream, enabled: true })
    )

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Trigger video onloadedmetadata
    const mockVideo = document.createElement('video') as any
    act(() => {
      if (mockVideo.onloadedmetadata) {
        mockVideo.onloadedmetadata()
      }
    })

    // Should have landmarks
    await waitFor(() => {
      expect(result.current.landmarks).toBeTruthy()
    })

    expect(result.current.landmarks).toHaveLength(2)
    expect(result.current.landmarks[0]).toHaveProperty('x', 0.5)
    expect(result.current.landmarks[0]).toHaveProperty('y', 0.5)
  })

  it('should handle initialization errors gracefully', async () => {
    // Mock error
    const FilesetResolver = require('@mediapipe/tasks-vision').FilesetResolver
    FilesetResolver.forVisionTasks.mockRejectedValueOnce(new Error('Failed to load'))

    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockStream, enabled: true })
    )

    // Wait for error
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toBe('Failed to load')
    expect(result.current.landmarks).toBe(null)
  })

  it('should cleanup resources on unmount', async () => {
    const FaceLandmarker = require('@mediapipe/tasks-vision').FaceLandmarker
    const mockClose = jest.fn()
    const mockFaceLandmarker = {
      detectForVideo: jest.fn(),
      close: mockClose
    }
    FaceLandmarker.createFromOptions.mockResolvedValueOnce(mockFaceLandmarker)

    const { unmount } = renderHook(() => 
      useFaceDetection({ stream: mockStream, enabled: true })
    )

    // Wait for initialization
    await waitFor(() => {
      expect(FaceLandmarker.createFromOptions).toHaveBeenCalled()
    })

    // Unmount hook
    unmount()

    // Should cleanup
    expect(mockClose).toHaveBeenCalled()
    expect(global.cancelAnimationFrame).toHaveBeenCalled()
  })
})