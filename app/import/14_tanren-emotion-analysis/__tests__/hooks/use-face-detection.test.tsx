import { renderHook, act, waitFor } from '@testing-library/react';
import { useFaceDetection } from '@/hooks/use-face-detection';

// Mock MediaPipe
jest.mock('@mediapipe/tasks-vision', () => ({
  FaceLandmarker: {
    createFromOptions: jest.fn().mockResolvedValue({
      detectForVideo: jest.fn().mockReturnValue({
        faceLandmarks: [
          Array(478).fill(0).map((_, i) => ({
            x: Math.random(),
            y: Math.random(),
            z: Math.random(),
          }))
        ]
      }),
      close: jest.fn(),
    }),
  },
  FilesetResolver: {
    forVisionTasks: jest.fn().mockResolvedValue({}),
  },
}));

// Mock HTMLVideoElement
const mockVideoElement = {
  play: jest.fn(),
  pause: jest.fn(),
  HAVE_ENOUGH_DATA: 4,
  readyState: 4,
  srcObject: null,
  autoplay: false,
  muted: false,
  playsInline: false,
  onloadedmetadata: null,
};

// Mock document.createElement
const originalCreateElement = document.createElement;
document.createElement = jest.fn((tagName) => {
  if (tagName === 'video') {
    return mockVideoElement as any;
  }
  return originalCreateElement.call(document, tagName);
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 16); // Simulate 60fps
  return 1;
});

global.cancelAnimationFrame = jest.fn();

// Mock performance.now
global.performance.now = jest.fn(() => Date.now());

// Mock MediaStream
const mockMediaStream = {
  getTracks: jest.fn(() => []),
  getVideoTracks: jest.fn(() => [{ stop: jest.fn() }]),
  getAudioTracks: jest.fn(() => [{ stop: jest.fn() }]),
};

describe('useFaceDetection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with null landmarks', () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: null, enabled: true })
    );

    expect(result.current.landmarks).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isDetecting).toBe(false);
  });

  it('should initialize MediaPipe when enabled', async () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: true })
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const { FilesetResolver, FaceLandmarker } = require('@mediapipe/tasks-vision');
    expect(FilesetResolver.forVisionTasks).toHaveBeenCalled();
    expect(FaceLandmarker.createFromOptions).toHaveBeenCalled();
  });

  it('should not initialize when disabled', async () => {
    renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: false })
    );

    const { FilesetResolver } = require('@mediapipe/tasks-vision');
    expect(FilesetResolver.forVisionTasks).not.toHaveBeenCalled();
  });

  it('should detect faces when stream is provided', async () => {
    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: true })
    );

    // Wait for initialization
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Trigger video metadata loaded
    act(() => {
      if (mockVideoElement.onloadedmetadata) {
        mockVideoElement.onloadedmetadata({} as any);
      }
    });

    // Wait for face detection to run
    await waitFor(() => {
      expect(result.current.landmarks).not.toBeNull();
    });

    expect(result.current.landmarks).toHaveLength(478); // MediaPipe face landmarks count
  });

  it('should handle detection errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const { FaceLandmarker } = require('@mediapipe/tasks-vision');
    FaceLandmarker.createFromOptions.mockResolvedValueOnce({
      detectForVideo: jest.fn().mockImplementation(() => {
        throw new Error('Detection failed');
      }),
      close: jest.fn(),
    });

    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: true })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Trigger detection
    act(() => {
      if (mockVideoElement.onloadedmetadata) {
        mockVideoElement.onloadedmetadata({} as any);
      }
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Face detection error:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  it('should handle initialization errors', async () => {
    const { FilesetResolver } = require('@mediapipe/tasks-vision');
    FilesetResolver.forVisionTasks.mockRejectedValueOnce(new Error('Failed to load'));

    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: true })
    );

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load');
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should cleanup resources on unmount', async () => {
    const { FaceLandmarker } = require('@mediapipe/tasks-vision');
    const mockClose = jest.fn();
    FaceLandmarker.createFromOptions.mockResolvedValueOnce({
      detectForVideo: jest.fn(),
      close: mockClose,
    });

    const { unmount } = renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: true })
    );

    await waitFor(() => {
      expect(FaceLandmarker.createFromOptions).toHaveBeenCalled();
    });

    unmount();

    expect(mockClose).toHaveBeenCalled();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should stop detection when stream is removed', async () => {
    const { result, rerender } = renderHook(
      ({ stream, enabled }) => useFaceDetection({ stream, enabled }),
      {
        initialProps: { stream: mockMediaStream as any, enabled: true }
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Remove stream
    rerender({ stream: null, enabled: true });

    expect(mockVideoElement.pause).toHaveBeenCalled();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should handle no faces detected', async () => {
    const { FaceLandmarker } = require('@mediapipe/tasks-vision');
    FaceLandmarker.createFromOptions.mockResolvedValueOnce({
      detectForVideo: jest.fn().mockReturnValue({
        faceLandmarks: []
      }),
      close: jest.fn(),
    });

    const { result } = renderHook(() => 
      useFaceDetection({ stream: mockMediaStream as any, enabled: true })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Trigger detection
    act(() => {
      if (mockVideoElement.onloadedmetadata) {
        mockVideoElement.onloadedmetadata({} as any);
      }
    });

    // Should remain null when no faces detected
    await waitFor(() => {
      expect(mockVideoElement.play).toHaveBeenCalled();
    });

    expect(result.current.landmarks).toBeNull();
  });
});