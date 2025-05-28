import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FaceMap } from '@/components/face-map';

describe('Face Detection Integration', () => {
  it('should display waiting state when no landmarks', () => {
    render(<FaceMap landmarks={null} />);
    
    expect(screen.getByText('顔認識を待機中...')).toBeInTheDocument();
  });

  it('should render canvas when landmarks are provided', () => {
    const mockLandmarks = Array(468).fill(0).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
    }));
    
    const { container } = render(<FaceMap landmarks={mockLandmarks} />);
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute('width', '300');
    expect(canvas).toHaveAttribute('height', '300');
  });

  it('should handle empty landmarks array', () => {
    render(<FaceMap landmarks={[]} />);
    
    const { container } = render(<FaceMap landmarks={[]} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should update canvas when landmarks change', () => {
    const initialLandmarks = Array(10).fill(0).map(() => ({
      x: 0.5,
      y: 0.5,
      z: 0,
    }));
    
    const { rerender } = render(<FaceMap landmarks={initialLandmarks} />);
    
    const updatedLandmarks = Array(10).fill(0).map(() => ({
      x: 0.8,
      y: 0.8,
      z: 0,
    }));
    
    rerender(<FaceMap landmarks={updatedLandmarks} />);
    
    // Canvas should still be present
    const { container } = render(<FaceMap landmarks={updatedLandmarks} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});