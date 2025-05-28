import { renderHook, act } from '@testing-library/react';
import { useSessionRecording } from '@/hooks/use-session-recording';

// Mock MediaStream
class MockMediaStream {
  active = true;
  id = 'mock-stream-id';
  
  getTracks() {
    return [];
  }
  
  addTrack() {}
  removeTrack() {}
  getAudioTracks() { return []; }
  getVideoTracks() { return []; }
}

// Mock MediaRecorder
class MockMediaRecorder {
  state = 'inactive';
  ondataavailable: ((event: any) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  
  static isTypeSupported = jest.fn(() => true);
  
  constructor(public stream: MediaStream, public options?: any) {}
  
  start() {
    this.state = 'recording';
    // Simulate data available events
    setTimeout(() => {
      if (this.ondataavailable && this.state === 'recording') {
        this.ondataavailable({ data: new Blob(['mock video data'], { type: 'video/webm' }) });
      }
    }, 100);
  }
  
  stop() {
    this.state = 'inactive';
    // Trigger ondataavailable and onstop in the correct order
    setTimeout(() => {
      if (this.ondataavailable) {
        this.ondataavailable({ data: new Blob(['final chunk'], { type: 'video/webm' }) });
      }
      if (this.onstop) {
        this.onstop();
      }
    }, 0);
  }
  
  pause() {
    this.state = 'paused';
  }
  
  resume() {
    this.state = 'recording';
  }
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

// Mock IndexedDB
const mockIDB = {
  open: jest.fn().mockResolvedValue({
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    getAll: jest.fn(),
  }),
};

// Mock URL methods
const createObjectURLMock = jest.fn(() => 'blob:mock-url');
const revokeObjectURLMock = jest.fn();

// Apply mocks
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  Object.defineProperty(window, 'MediaStream', { value: MockMediaStream });
  Object.defineProperty(window, 'MediaRecorder', { value: MockMediaRecorder });
  Object.defineProperty(window.URL, 'createObjectURL', { value: createObjectURLMock });
  Object.defineProperty(window.URL, 'revokeObjectURL', { value: revokeObjectURLMock });
  (global as any).indexedDB = { open: mockIDB.open };
});

describe('Session Data Persistence', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should save session data to storage', async () => {
    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    // Start recording
    const mockStream = new MockMediaStream() as unknown as MediaStream;
    act(() => {
      result.current.startRecording(mockStream);
    });

    // Wait for recording to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    // Add some emotion data
    act(() => {
      result.current.addEmotionData({
        timestamp: Date.now(),
        emotions: { joy: 75, sadness: 10, anger: 5, surprise: 10, fear: 5, confidence: 80, interest: 70, confusion: 20 },
        facialExpression: 'Positive expression',
        insight: 'User appears happy'
      });
    });

    // Update transcript
    act(() => {
      result.current.updateTranscript('Hello, this is a test recording.');
    });

    // Stop recording
    act(() => {
      result.current.stopRecording();
    });

    // Wait for stop callbacks to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    // Save session
    let saveResult;
    await act(async () => {
      saveResult = await result.current.saveSession();
    });

    expect(saveResult).toEqual({ success: true, sessionId: expect.any(String) });
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('should load saved sessions from storage', async () => {
    // Pre-populate storage with test data
    const testSessions = [
      {
        id: 'session-1',
        startTime: Date.now() - 3600000,
        duration: 60,
        emotions: [],
        transcript: 'Test session 1',
        insights: []
      },
      {
        id: 'session-2',
        startTime: Date.now() - 1800000,
        duration: 120,
        emotions: [],
        transcript: 'Test session 2',
        insights: []
      }
    ];

    localStorageMock.setItem('tanren_sessions', JSON.stringify(testSessions));

    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    let loadResult;
    await act(async () => {
      loadResult = await result.current.loadSessions();
    });

    // Check the success property and sessions array
    expect(loadResult.success).toBe(true);
    expect(loadResult.sessions).toHaveLength(2);
    expect(loadResult.sessions[0].id).toBe('session-1');
    expect(loadResult.sessions[1].id).toBe('session-2');
  });

  it('should handle storage quota exceeded error', async () => {
    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    // Start recording
    const mockStream = new MockMediaStream() as unknown as MediaStream;
    act(() => {
      result.current.startRecording(mockStream);
    });

    // Add some data to make the session valid
    act(() => {
      result.current.updateTranscript('Test transcript for quota error');
    });

    // Wait for recording to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    // Stop recording
    act(() => {
      result.current.stopRecording();
    });

    // Wait for stop to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    // Mock setItem to throw quota exceeded error AFTER the hook is set up
    const originalSetItem = localStorageMock.setItem;
    localStorageMock.setItem = jest.fn(() => {
      const error = Object.create(DOMException.prototype);
      Object.defineProperty(error, 'message', { value: 'QuotaExceededError' });
      Object.defineProperty(error, 'name', { value: 'QuotaExceededError' });
      throw error;
    });

    // Try to save session
    let saveResult;
    await act(async () => {
      saveResult = await result.current.saveSession();
    });

    expect(saveResult.success).toBe(false);
    expect(saveResult.error).toContain('Storage quota exceeded');

    // Restore original setItem
    localStorageMock.setItem = originalSetItem;
  });

  it('should persist session data across page reloads', async () => {
    const { result: result1 } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    // Create and save a session
    const mockStream = new MockMediaStream() as unknown as MediaStream;
    act(() => {
      result1.current.startRecording(mockStream);
    });

    // Wait for recording to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    act(() => {
      result1.current.updateTranscript('Persistent test data');
    });

    act(() => {
      result1.current.stopRecording();
    });

    // Wait for stop to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    let saveResult;
    await act(async () => {
      saveResult = await result1.current.saveSession();
    });
    
    expect(saveResult?.success).toBe(true);

    // Simulate page reload by creating new hook instance
    const { result: result2 } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    let loadedSessions;
    await act(async () => {
      const loadResult = await result2.current.loadSessions();
      loadedSessions = loadResult.sessions;
    });

    expect(loadedSessions).toHaveLength(1);
    expect(loadedSessions[0].transcript).toBe('Persistent test data');
  });

  it('should limit stored sessions to prevent overflow', async () => {
    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    // Create multiple sessions
    for (let i = 0; i < 15; i++) {
      const mockStream = new MockMediaStream() as unknown as MediaStream;
      
      act(() => {
        result.current.startRecording(mockStream);
      });

      // Wait for recording to initialize
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      act(() => {
        result.current.updateTranscript(`Session ${i + 1}`);
        result.current.stopRecording();
      });

      // Wait for stop to complete
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      await act(async () => {
        await result.current.saveSession();
      });

      // Reset for next session
      act(() => {
        result.current.resetSession();
      });
    }

    let sessions;
    await act(async () => {
      const loadResult = await result.current.loadSessions();
      sessions = loadResult.sessions;
    });

    // Should only keep the most recent 10 sessions
    expect(sessions.length).toBeLessThanOrEqual(10);
    expect(sessions.length).toBeGreaterThan(0);
    if (sessions.length > 0) {
      expect(sessions[0].transcript).toContain('Session');
    }
  });

  it('should handle corrupted storage data gracefully', async () => {
    // First create the hook
    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));
    
    // Then store corrupted data
    localStorageMock.setItem('tanren_sessions', 'not valid JSON');

    let loadResult;
    await act(async () => {
      loadResult = await result.current.loadSessions();
    });

    // Should return empty array on error
    expect(loadResult.success).toBe(false);
    expect(loadResult.sessions).toEqual([]);
  });

  it('should export session data for download', async () => {
    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    // Create a session with data
    const mockStream = new MockMediaStream() as unknown as MediaStream;
    act(() => {
      result.current.startRecording(mockStream);
    });

    // Wait for recording to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    act(() => {
      result.current.updateTranscript('Export test session');
      result.current.addEmotionData({
        timestamp: Date.now(),
        emotions: { joy: 80, sadness: 5, anger: 5, surprise: 5, fear: 5, confidence: 90, interest: 85, confusion: 5 },
        facialExpression: 'Very positive',
        insight: 'Excellent mood'
      });
    });

    act(() => {
      result.current.stopRecording();
    });

    // Wait for stop to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    let exportData;
    act(() => {
      exportData = result.current.exportSessionData();
    });

    expect(exportData).toHaveProperty('id');
    expect(exportData).toHaveProperty('transcript', 'Export test session');
    expect(exportData).toHaveProperty('emotions');
    expect(exportData.emotions).toHaveLength(1);
  });

  it('should store video blob data when available', async () => {
    const { result } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    const mockStream = new MockMediaStream() as unknown as MediaStream;
    act(() => {
      result.current.startRecording(mockStream);
    });

    // Wait for recording to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    act(() => {
      result.current.stopRecording();
    });

    // Wait for stop to complete and blob to be created
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    // Check if video URL is available
    const videoUrl = result.current.getVideoUrl();
    expect(videoUrl).toBeTruthy();
    expect(videoUrl).toContain('blob:');
  });

  it('should clean up old video blobs to prevent memory leaks', async () => {
    const { result, unmount } = renderHook(() => useSessionRecording({ maxDuration: 60 }));

    // Create session with video
    const mockStream = new MockMediaStream() as unknown as MediaStream;
    act(() => {
      result.current.startRecording(mockStream);
    });

    // Wait for recording
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    act(() => {
      result.current.stopRecording();
    });

    // Get video URL
    const videoUrl = result.current.getVideoUrl();

    // Unmount should clean up blob URLs
    unmount();

    if (videoUrl) {
      expect(revokeObjectURLMock).toHaveBeenCalledWith(videoUrl);
    }
  });
});