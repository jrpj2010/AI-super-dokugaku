import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SessionProvider } from '@/contexts/session-context';
import Home from '@/app/page';

// Mock MediaStream and MediaRecorder
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
  getAudioTracks: jest.fn(() => [{ stop: jest.fn() }]),
  getVideoTracks: jest.fn(() => [{ stop: jest.fn() }]),
}));

global.MediaRecorder = jest.fn().mockImplementation(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  state: 'inactive',
  ondataavailable: null,
  onstop: null,
}));

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue(new MediaStream()),
  },
  writable: true,
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => null),
  }),
}));

// Mock fetch for API calls
global.fetch = jest.fn();

describe('E2E Integration Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        emotions: {
          joy: 75,
          sadness: 10,
          anger: 5,
          surprise: 15,
          fear: 5,
          confidence: 80,
          interest: 70
        },
        facialExpression: '明るく前向きな表情です',
        insights: 'ユーザーは積極的で楽観的な状態にあります'
      })
    });
  });

  const renderApp = () => {
    return render(
      <SessionProvider>
        <Home />
      </SessionProvider>
    );
  };

  it('should complete full recording and analysis flow', async () => {
    const user = userEvent.setup();
    renderApp();

    // 1. Initial state - all modules should show empty state
    expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument();
    expect(screen.getByText('セッション開始時に感情分析が表示されます')).toBeInTheDocument();
    
    // 2. Click start button
    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    // 3. Verify recording has started
    await waitFor(() => {
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled();
    });

    // 4. Simulate some recording time
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ストップ/i })).toBeInTheDocument();
    }, { timeout: 2000 });

    // 5. Click stop button
    const stopButton = screen.getByRole('button', { name: /ストップ/i });
    await user.click(stopButton);

    // 6. Verify session ended state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /新しいセッション/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /分析処理を開始/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should handle camera permission denial gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock getUserMedia to reject
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValueOnce(
      new Error('Permission denied')
    );
    
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderApp();
    
    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('録画の開始に失敗しました')
      );
    });

    alertSpy.mockRestore();
  });

  it('should display real-time emotion analysis during recording', async () => {
    const user = userEvent.setup();
    renderApp();

    // Start recording
    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    // Wait for API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/analyze-emotion'),
        expect.any(Object)
      );
    }, { timeout: 3000 });

    // Check if emotion data is displayed
    await waitFor(() => {
      expect(screen.queryByText('セッション開始時に感情分析が表示されます')).not.toBeInTheDocument();
    });
  });

  it('should handle network errors during emotion analysis', async () => {
    const user = userEvent.setup();
    
    // Mock fetch to fail
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
    
    renderApp();

    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    // Should continue recording even if analysis fails
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ストップ/i })).toBeInTheDocument();
    });
  });

  it('should navigate between tabs correctly', async () => {
    const user = userEvent.setup();
    renderApp();

    // Check initial tab
    expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument();

    // Click on report tab
    const reportTab = screen.getByRole('tab', { name: /分析レポート/i });
    await user.click(reportTab);

    // Should show report content
    await waitFor(() => {
      expect(screen.getByText(/セッションを選択してください/i)).toBeInTheDocument();
    });

    // Go back to diagnosis tab
    const diagnosisTab = screen.getByRole('tab', { name: /感情ロールプレイ診断/i });
    await user.click(diagnosisTab);

    await waitFor(() => {
      expect(screen.getByText('今日の調子はいかがですか？')).toBeInTheDocument();
    });
  });

  it('should persist session data after recording', async () => {
    const user = userEvent.setup();
    renderApp();

    // Complete a recording session
    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    // Wait a bit for recording
    await new Promise(resolve => setTimeout(resolve, 1000));

    const stopButton = screen.getByRole('button', { name: /ストップ/i });
    await user.click(stopButton);

    // Click on analysis report
    await waitFor(() => {
      const analyzeButton = screen.getByRole('button', { name: /分析処理を開始/i });
      expect(analyzeButton).toBeInTheDocument();
    });

    const analyzeButton = screen.getByRole('button', { name: /分析処理を開始/i });
    await user.click(analyzeButton);

    // Should navigate to report tab
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /分析レポート/i })).toHaveAttribute('aria-selected', 'true');
    }, { timeout: 3000 });
  });

  it('should handle multiple recording sessions', async () => {
    const user = userEvent.setup();
    renderApp();

    // First session
    let startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ストップ/i })).toBeInTheDocument();
    });
    
    let stopButton = screen.getByRole('button', { name: /ストップ/i });
    await user.click(stopButton);

    // Start new session
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /新しいセッション/i })).toBeInTheDocument();
    });
    
    const newSessionButton = screen.getByRole('button', { name: /新しいセッション/i });
    await user.click(newSessionButton);

    // Should be able to start recording again
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /開始/i })).toBeInTheDocument();
    });
  });

  it('should display video playback after recording', async () => {
    const user = userEvent.setup();
    renderApp();

    // Complete a recording
    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stopButton = screen.getByRole('button', { name: /ストップ/i });
    await user.click(stopButton);

    // Click play button
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /再生/i })).toBeInTheDocument();
    });
    
    const playButton = screen.getByRole('button', { name: /再生/i });
    await user.click(playButton);

    // Should show video playback modal
    await waitFor(() => {
      expect(screen.getByText(/セッション再生/i)).toBeInTheDocument();
    });
  });

  it('should update emotion metrics in real-time during recording', async () => {
    const user = userEvent.setup();
    renderApp();

    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    // Mock multiple API responses to simulate real-time updates
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          emotions: { joy: 60, sadness: 20, anger: 10, surprise: 5, fear: 5, confidence: 70, interest: 65 },
          facialExpression: '少し緊張した表情',
          insights: '初期の緊張が見られます'
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          emotions: { joy: 75, sadness: 10, anger: 5, surprise: 8, fear: 2, confidence: 85, interest: 80 },
          facialExpression: 'リラックスした表情',
          insights: '緊張が解けてきました'
        })
      });

    // Wait for multiple updates
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    }, { timeout: 5000 });
  });

  it('should handle long recording sessions properly', async () => {
    const user = userEvent.setup();
    renderApp();

    const startButton = screen.getByRole('button', { name: /開始/i });
    await user.click(startButton);

    // Check recording timer is displayed
    await waitFor(() => {
      expect(screen.getByText(/録画中/i)).toBeInTheDocument();
    });

    // Wait for recording duration display
    await waitFor(() => {
      expect(screen.getByText(/0:0[0-9]/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});