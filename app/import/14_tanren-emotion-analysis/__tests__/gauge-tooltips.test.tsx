import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FaceMetricsGauge from '@/components/face-metrics-gauge';

describe('Gauge Tooltips', () => {
  const mockData = {
    faceMovement: 75,
    sightMovement: 60
  };

  it('should render gauge component', () => {
    render(<FaceMetricsGauge data={mockData} />);
    
    // Check that the gauge container exists
    const gaugeContainer = screen.getByTestId('face-metrics-gauge');
    expect(gaugeContainer).toBeInTheDocument();
  });

  it('should show tooltip on hover over face movement gauge', async () => {
    render(<FaceMetricsGauge data={mockData} />);
    
    // Find the face movement gauge element
    const faceMovementGauge = screen.getByTestId('face-movement-gauge');
    
    // Hover over the gauge
    fireEvent.mouseEnter(faceMovementGauge);
    
    // Wait for tooltip to appear
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('顔の動き: 75%');
    });
  });

  it('should show tooltip on hover over sight movement gauge', async () => {
    render(<FaceMetricsGauge data={mockData} />);
    
    // Find the sight movement gauge element
    const sightMovementGauge = screen.getByTestId('sight-movement-gauge');
    
    // Hover over the gauge
    fireEvent.mouseEnter(sightMovementGauge);
    
    // Wait for tooltip to appear
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('視線の動き: 60%');
    });
  });

  it('should hide tooltip when mouse leaves gauge', async () => {
    render(<FaceMetricsGauge data={mockData} />);
    
    const faceMovementGauge = screen.getByTestId('face-movement-gauge');
    
    // Hover to show tooltip
    fireEvent.mouseEnter(faceMovementGauge);
    
    // Wait for tooltip
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    // Leave hover
    fireEvent.mouseLeave(faceMovementGauge);
    
    // Tooltip should disappear
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should display descriptive text in tooltip based on value', async () => {
    const testCases = [
      { value: 20, expected: '少ない' },
      { value: 50, expected: '適度' },
      { value: 80, expected: '多い' }
    ];

    for (const testCase of testCases) {
      const { unmount } = render(
        <FaceMetricsGauge data={{ faceMovement: testCase.value, sightMovement: 50 }} />
      );
      
      const faceMovementGauge = screen.getByTestId('face-movement-gauge');
      fireEvent.mouseEnter(faceMovementGauge);
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveTextContent(`${testCase.value}%`);
        expect(tooltip).toHaveTextContent(testCase.expected);
      });
      
      unmount();
    }
  });

  it('should show tooltip with keyboard navigation', async () => {
    render(<FaceMetricsGauge data={mockData} />);
    
    const faceMovementGauge = screen.getByTestId('face-movement-gauge');
    
    // Focus on the gauge
    faceMovementGauge.focus();
    
    // Tooltip should appear on focus
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('should position tooltip correctly', async () => {
    render(<FaceMetricsGauge data={mockData} />);
    
    const faceMovementGauge = screen.getByTestId('face-movement-gauge');
    fireEvent.mouseEnter(faceMovementGauge);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      const tooltipStyle = window.getComputedStyle(tooltip);
      
      // Check that tooltip has positioning styles
      expect(tooltipStyle.position).toBe('absolute');
      expect(tooltip).toHaveClass('tooltip');
    });
  });

  it('should update tooltip content when data changes', async () => {
    const { rerender } = render(<FaceMetricsGauge data={mockData} />);
    
    const faceMovementGauge = screen.getByTestId('face-movement-gauge');
    fireEvent.mouseEnter(faceMovementGauge);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('75%');
    });
    
    // Mouse leave to hide tooltip
    fireEvent.mouseLeave(faceMovementGauge);
    
    // Update data
    rerender(<FaceMetricsGauge data={{ faceMovement: 90, sightMovement: 60 }} />);
    
    // Mouse enter again to show updated tooltip
    fireEvent.mouseEnter(faceMovementGauge);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('90%');
    });
  });

  it('should handle null data gracefully', () => {
    render(<FaceMetricsGauge data={null} />);
    
    // Should show empty state
    expect(screen.getByText('データを待機中...')).toBeInTheDocument();
    
    // No gauges should be rendered
    expect(screen.queryByTestId('face-movement-gauge')).not.toBeInTheDocument();
  });

  it('should apply correct color based on value ranges', async () => {
    const colorTestCases = [
      { value: 25, expectedColor: 'text-red-500' },    // Low
      { value: 50, expectedColor: 'text-yellow-500' }, // Medium
      { value: 75, expectedColor: 'text-green-500' }   // High
    ];

    for (const testCase of colorTestCases) {
      const { unmount } = render(
        <FaceMetricsGauge data={{ faceMovement: testCase.value, sightMovement: 50 }} />
      );
      
      const faceMovementGauge = screen.getByTestId('face-movement-gauge');
      fireEvent.mouseEnter(faceMovementGauge);
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass(testCase.expectedColor);
      });
      
      unmount();
    }
  });
});