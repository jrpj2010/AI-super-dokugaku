import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FaceMapVisualization from '@/components/face-map-visualization'

// Mock the FaceMapCanvas component
jest.mock('@/components/face-map-canvas', () => {
  return function MockFaceMapCanvas({ landmarks, width, height }: any) {
    return (
      <div 
        data-testid="face-map-canvas" 
        data-landmarks={landmarks ? 'true' : 'false'}
        data-width={width}
        data-height={height}
      >
        Face Map Canvas Mock
      </div>
    )
  }
})

describe('FaceMapVisualization', () => {
  it('should render container with correct styling', () => {
    render(<FaceMapVisualization />)
    
    const container = screen.getByTestId('face-map-canvas').parentElement
    expect(container).toHaveClass('h-48', 'flex', 'items-center', 'justify-center', 'relative')
  })

  it('should pass null landmarks when not active', () => {
    render(<FaceMapVisualization isActive={false} landmarks={[{ x: 0.5, y: 0.5 }]} />)
    
    const canvas = screen.getByTestId('face-map-canvas')
    expect(canvas).toHaveAttribute('data-landmarks', 'false')
  })

  it('should pass landmarks when active', () => {
    const mockLandmarks = [{ x: 0.5, y: 0.5, z: 0 }]
    render(<FaceMapVisualization isActive={true} landmarks={mockLandmarks} />)
    
    const canvas = screen.getByTestId('face-map-canvas')
    expect(canvas).toHaveAttribute('data-landmarks', 'true')
  })

  it('should render with default props', () => {
    render(<FaceMapVisualization />)
    
    const canvas = screen.getByTestId('face-map-canvas')
    expect(canvas).toHaveAttribute('data-landmarks', 'false')
    expect(canvas).toHaveAttribute('data-width', '320')
    expect(canvas).toHaveAttribute('data-height', '240')
  })

  it('should apply dark mode styling', () => {
    render(<FaceMapVisualization />)
    
    const container = screen.getByTestId('face-map-canvas').parentElement
    expect(container).toHaveClass('dark:bg-gray-900')
  })
})