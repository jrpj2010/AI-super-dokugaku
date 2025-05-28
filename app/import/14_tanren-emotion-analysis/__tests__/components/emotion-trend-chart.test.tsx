import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmotionTrendChart from '@/components/emotion-trend-chart';

// Mock Recharts to avoid rendering issues in tests
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ data, children }: any) => (
    <div data-testid="line-chart" data-points={data?.length || 0}>
      {children}
    </div>
  ),
  Line: ({ dataKey, stroke }: any) => (
    <div data-testid={`line-${dataKey}`} data-stroke={stroke} />
  ),
  XAxis: ({ opacity }: any) => <div data-testid="x-axis" data-opacity={opacity} />,
  YAxis: ({ opacity }: any) => <div data-testid="y-axis" data-opacity={opacity} />,
  Legend: ({ opacity }: any) => <div data-testid="legend" data-opacity={opacity} />,
}));

describe('EmotionTrendChart Real-time Plotting', () => {
  const mockEmotionData = [
    { time: '0:00', ポジティブ: 60, ネガティブ: 20, ニュートラル: 20 },
    { time: '0:05', ポジティブ: 65, ネガティブ: 15, ニュートラル: 20 },
    { time: '0:10', ポジティブ: 70, ネガティブ: 10, ニュートラル: 20 },
    { time: '0:15', ポジティブ: 75, ネガティブ: 10, ニュートラル: 15 },
    { time: '0:20', ポジティブ: 80, ネガティブ: 5, ニュートラル: 15 },
  ];

  it('should show empty state when no data is provided', () => {
    render(<EmotionTrendChart data={[]} />);
    
    expect(screen.getByText('セッション開始時に感情推移が表示されます')).toBeInTheDocument();
  });

  it('should hide empty state when data is provided', () => {
    render(<EmotionTrendChart data={mockEmotionData} />);
    
    expect(screen.queryByText('セッション開始時に感情推移が表示されます')).not.toBeInTheDocument();
  });

  it('should render all three emotion lines when data exists', () => {
    render(<EmotionTrendChart data={mockEmotionData} />);
    
    expect(screen.getByTestId('line-ポジティブ')).toBeInTheDocument();
    expect(screen.getByTestId('line-ネガティブ')).toBeInTheDocument();
    expect(screen.getByTestId('line-ニュートラル')).toBeInTheDocument();
  });

  it('should use correct colors for each emotion line', () => {
    render(<EmotionTrendChart data={mockEmotionData} />);
    
    expect(screen.getByTestId('line-ポジティブ')).toHaveAttribute('data-stroke', '#10b981');
    expect(screen.getByTestId('line-ネガティブ')).toHaveAttribute('data-stroke', '#ef4444');
    expect(screen.getByTestId('line-ニュートラル')).toHaveAttribute('data-stroke', '#f59e0b');
  });

  it('should update chart when new data points are added', async () => {
    const { rerender } = render(<EmotionTrendChart data={mockEmotionData} />);
    
    const chart = screen.getByTestId('line-chart');
    expect(chart).toHaveAttribute('data-points', '5');
    
    // Add new data point
    const updatedData = [
      ...mockEmotionData,
      { time: '0:25', ポジティブ: 85, ネガティブ: 5, ニュートラル: 10 }
    ];
    
    rerender(<EmotionTrendChart data={updatedData} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', '6');
    });
  });

  it('should handle real-time data updates smoothly', async () => {
    const { rerender } = render(<EmotionTrendChart data={[]} />);
    
    // Start with no data
    expect(screen.getByText('セッション開始時に感情推移が表示されます')).toBeInTheDocument();
    
    // Add first data point
    rerender(<EmotionTrendChart data={[mockEmotionData[0]]} />);
    expect(screen.queryByText('セッション開始時に感情推移が表示されます')).not.toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', '1');
    
    // Progressively add more data points
    for (let i = 1; i < mockEmotionData.length; i++) {
      rerender(<EmotionTrendChart data={mockEmotionData.slice(0, i + 1)} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', String(i + 1));
      });
    }
  });

  it('should show chart axes with reduced opacity when no data', () => {
    render(<EmotionTrendChart data={[]} />);
    
    expect(screen.getByTestId('x-axis')).toHaveAttribute('data-opacity', '0.3');
    expect(screen.getByTestId('y-axis')).toHaveAttribute('data-opacity', '0.3');
    expect(screen.getByTestId('legend')).toHaveAttribute('data-opacity', '0.3');
  });

  it('should show chart axes with full opacity when data exists', () => {
    render(<EmotionTrendChart data={mockEmotionData} />);
    
    expect(screen.getByTestId('x-axis')).toHaveAttribute('data-opacity', '1');
    expect(screen.getByTestId('y-axis')).toHaveAttribute('data-opacity', '1');
    expect(screen.getByTestId('legend')).toHaveAttribute('data-opacity', '1');
  });

  it('should handle data with extreme values correctly', () => {
    const extremeData = [
      { time: '0:00', ポジティブ: 100, ネガティブ: 0, ニュートラル: 0 },
      { time: '0:05', ポジティブ: 0, ネガティブ: 100, ニュートラル: 0 },
      { time: '0:10', ポジティブ: 0, ネガティブ: 0, ニュートラル: 100 },
    ];
    
    render(<EmotionTrendChart data={extremeData} />);
    
    expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', '3');
    expect(screen.getByTestId('line-ポジティブ')).toBeInTheDocument();
    expect(screen.getByTestId('line-ネガティブ')).toBeInTheDocument();
    expect(screen.getByTestId('line-ニュートラル')).toBeInTheDocument();
  });

  it('should maintain data order for proper time-series visualization', () => {
    const unorderedData = [
      { time: '0:20', ポジティブ: 80, ネガティブ: 10, ニュートラル: 10 },
      { time: '0:05', ポジティブ: 60, ネガティブ: 20, ニュートラル: 20 },
      { time: '0:15', ポジティブ: 75, ネガティブ: 15, ニュートラル: 10 },
      { time: '0:10', ポジティブ: 70, ネガティブ: 15, ニュートラル: 15 },
      { time: '0:00', ポジティブ: 50, ネガティブ: 25, ニュートラル: 25 },
    ];
    
    render(<EmotionTrendChart data={unorderedData} />);
    
    // Chart should still render with the data as provided
    expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', '5');
  });

  it('should handle rapid sequential updates', async () => {
    const { rerender } = render(<EmotionTrendChart data={[]} />);
    
    // Simulate rapid updates like in real-time recording
    const updates = [
      [{ time: '0:00', ポジティブ: 50, ネガティブ: 25, ニュートラル: 25 }],
      [
        { time: '0:00', ポジティブ: 50, ネガティブ: 25, ニュートラル: 25 },
        { time: '0:01', ポジティブ: 52, ネガティブ: 24, ニュートラル: 24 }
      ],
      [
        { time: '0:00', ポジティブ: 50, ネガティブ: 25, ニュートラル: 25 },
        { time: '0:01', ポジティブ: 52, ネガティブ: 24, ニュートラル: 24 },
        { time: '0:02', ポジティブ: 55, ネガティブ: 22, ニュートラル: 23 }
      ],
    ];
    
    for (const update of updates) {
      rerender(<EmotionTrendChart data={update} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', String(update.length));
      });
    }
  });

  it('should not render lines when data is empty array', () => {
    render(<EmotionTrendChart data={[]} />);
    
    expect(screen.queryByTestId('line-ポジティブ')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-ネガティブ')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-ニュートラル')).not.toBeInTheDocument();
  });

  it('should handle undefined data gracefully', () => {
    render(<EmotionTrendChart data={undefined} />);
    
    expect(screen.getByText('セッション開始時に感情推移が表示されます')).toBeInTheDocument();
    expect(screen.queryByTestId('line-ポジティブ')).not.toBeInTheDocument();
  });
});