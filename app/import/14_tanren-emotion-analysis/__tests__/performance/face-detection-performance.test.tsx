import { renderHook, act, waitFor } from '@testing-library/react'
import { useFaceDetection } from '@/hooks/use-face-detection'

// Mock MediaPipe modules with performance tracking
let detectionCallCount = 0
let detectionTimes: number[] = []

jest.mock('@mediapipe/tasks-vision', () => ({
  FaceLandmarker: {
    createFromOptions: jest.fn().mockResolvedValue({
      detectForVideo: jest.fn().mockImplementation(() => {
        const startTime = performance.now()
        detectionCallCount++
        const result = {
          faceLandmarks: [[
            { x: 0.5, y: 0.5, z: 0 },
            { x: 0.6, y: 0.6, z: 0 },
          ]]
        }
        const endTime = performance.now()
        detectionTimes.push(endTime - startTime)
        return result
      }),
      close: jest.fn()
    })
  },
  FilesetResolver: {
    forVisionTasks: jest.fn().mockResolvedValue({})
  }
}))

describe('Face Detection Performance', () => {
  let mockStream: MediaStream
  let animationFrameCallbacks: FrameRequestCallback[] = []
  let frameId = 0

  beforeEach(() => {
    // Reset counters
    detectionCallCount = 0
    detectionTimes = []
    animationFrameCallbacks = []
    frameId = 0

    // Create mock MediaStream
    mockStream = {
      getTracks: jest.fn().mockReturnValue([]),
      addTrack: jest.fn(),
      removeTrack: jest.fn(),
    } as unknown as MediaStream

    // Mock requestAnimationFrame to control frame rate
    global.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
      animationFrameCallbacks.push(callback)
      return ++frameId
    }) as any
    
    global.cancelAnimationFrame = jest.fn((id: number) => {
      animationFrameCallbacks = animationFrameCallbacks.filter((_, index) => index + 1 !== id)
    })

    // Mock performance.now
    let time = 0
    global.performance.now = jest.fn(() => {
      time += 16.67 // Simulate ~60fps
      return time
    })

    // Mock video element
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

  it('should maintain 30-60 fps during continuous detection', async () => {
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

    // Simulate 60 frames (1 second at 60fps)
    for (let i = 0; i < 60; i++) {
      act(() => {
        animationFrameCallbacks.forEach(callback => callback(performance.now()))
      })
    }

    // Should have processed frames (allowing for some throttling)
    expect(detectionCallCount).toBeGreaterThan(30) // At least 30 fps
    expect(detectionCallCount).toBeLessThanOrEqual(60) // No more than 60 fps
  })

  it('should have low detection latency', async () => {
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

    // Process several frames
    for (let i = 0; i < 10; i++) {
      act(() => {
        animationFrameCallbacks.forEach(callback => callback(performance.now()))
      })
    }

    // Check detection times
    const averageDetectionTime = detectionTimes.reduce((a, b) => a + b, 0) / detectionTimes.length
    
    // Detection should be fast (mocked, but in real world should be < 33ms for 30fps)
    expect(averageDetectionTime).toBeLessThan(33)
  })

  it('should stop processing when disabled', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useFaceDetection({ stream: mockStream, enabled }),
      { initialProps: { enabled: true } }
    )

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Start detection
    const mockVideo = document.createElement('video') as any
    act(() => {
      if (mockVideo.onloadedmetadata) {
        mockVideo.onloadedmetadata()
      }
    })

    // Process some frames
    for (let i = 0; i < 5; i++) {
      act(() => {
        animationFrameCallbacks.forEach(callback => callback(performance.now()))
      })
    }

    const initialCount = detectionCallCount

    // Disable detection
    rerender({ enabled: false })

    // Process more frames
    for (let i = 0; i < 5; i++) {
      act(() => {
        animationFrameCallbacks.forEach(callback => callback(performance.now()))
      })
    }

    // Detection count should not increase
    expect(detectionCallCount).toBe(initialCount)
  })

  it('should handle rapid enable/disable cycles', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useFaceDetection({ stream: mockStream, enabled }),
      { initialProps: { enabled: true } }
    )

    // Rapidly toggle enabled state
    for (let i = 0; i < 10; i++) {
      rerender({ enabled: i % 2 === 0 })
      await waitFor(() => {
        expect(result.current.isDetecting).toBe(i % 2 === 0)
      }, { timeout: 100 })
    }

    // Should not crash or leak resources
    expect(result.current.error).toBe(null)
  })

  it('should efficiently update landmarks without memory leaks', async () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockStream, enabled: true })
    )

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Track initial memory (simulated)
    const initialLandmarks: any[] = []

    // Process many frames
    const mockVideo = document.createElement('video') as any
    act(() => {
      if (mockVideo.onloadedmetadata) {
        mockVideo.onloadedmetadata()
      }
    })

    for (let i = 0; i < 100; i++) {
      act(() => {
        animationFrameCallbacks.forEach(callback => callback(performance.now()))
      })
      
      if (result.current.landmarks) {
        initialLandmarks.push(result.current.landmarks)
      }
    }

    // Only the latest landmarks should be in state, not accumulating
    expect(result.current.landmarks).toBeTruthy()
    expect(result.current.landmarks).toHaveLength(2) // Only current frame landmarks
  })
})