import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import FaceMapCanvas from '@/components/face-map-canvas'

// Mock MediaPipe face mesh constants
jest.mock('@mediapipe/face_mesh', () => ({
  FACEMESH_TESSELATION: [[0, 1], [1, 2]],
  FACEMESH_LIPS: [[13, 14], [14, 269]],
  FACEMESH_LEFT_EYE: [[33, 133], [133, 157]],
  FACEMESH_RIGHT_EYE: [[362, 398], [398, 384]],
  FACEMESH_FACE_OVAL: [[10, 338], [338, 297]],
}))

describe('FaceMapCanvas', () => {
  let mockContext: CanvasRenderingContext2D

  beforeEach(() => {
    // Mock canvas context
    mockContext = {
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
    } as unknown as CanvasRenderingContext2D

    // Mock HTMLCanvasElement.getContext
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext)

    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn((cb) => {
      cb(0)
      return 0
    }) as any
    global.cancelAnimationFrame = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render canvas with correct dimensions', () => {
    render(<FaceMapCanvas landmarks={null} width={320} height={240} />)
    
    const canvas = screen.getByRole('img', { hidden: true }) as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()
    expect(canvas.width).toBe(320)
    expect(canvas.height).toBe(240)
  })

  it('should display placeholder when no landmarks are provided', async () => {
    render(<FaceMapCanvas landmarks={null} />)

    await waitFor(() => {
      expect(mockContext.clearRect).toHaveBeenCalled()
      expect(mockContext.fillText).toHaveBeenCalledWith('顔認識待機中...', 160, 120)
    })
  })

  it('should draw face wireframe when landmarks are provided', async () => {
    const mockLandmarks = [
      { x: 0.5, y: 0.5, z: 0 }, // Point 0
      { x: 0.6, y: 0.5, z: 0 }, // Point 1
      { x: 0.6, y: 0.6, z: 0 }, // Point 2
      // Add more points as needed for the test
    ]

    // Add enough landmarks to cover all the indices used in the component
    for (let i = 3; i < 500; i++) {
      mockLandmarks.push({ x: Math.random(), y: Math.random(), z: 0 })
    }

    render(<FaceMapCanvas landmarks={mockLandmarks} width={320} height={240} />)

    await waitFor(() => {
      // Should clear canvas
      expect(mockContext.clearRect).toHaveBeenCalledWith(0, 0, 320, 240)
      
      // Should draw connections
      expect(mockContext.beginPath).toHaveBeenCalled()
      expect(mockContext.moveTo).toHaveBeenCalled()
      expect(mockContext.lineTo).toHaveBeenCalled()
      expect(mockContext.stroke).toHaveBeenCalled()
      
      // Should draw landmark points
      expect(mockContext.arc).toHaveBeenCalled()
      expect(mockContext.fill).toHaveBeenCalled()
    })
  })

  it('should use different colors for different facial features', async () => {
    const mockLandmarks = Array(500).fill(null).map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: 0
    }))

    render(<FaceMapCanvas landmarks={mockLandmarks} />)

    await waitFor(() => {
      // Check that different colors are used
      expect(mockContext.fillStyle).toBe('#00ffff') // Last color set for eyebrows
      expect(mockContext.strokeStyle).toBe('#00ff00') // Green for wireframe
    })
  })

  it('should handle animation frame updates', async () => {
    const { rerender } = render(<FaceMapCanvas landmarks={null} />)
    
    // Update with landmarks
    const mockLandmarks = Array(500).fill(null).map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: 0
    }))
    
    rerender(<FaceMapCanvas landmarks={mockLandmarks} />)

    await waitFor(() => {
      expect(global.requestAnimationFrame).toHaveBeenCalled()
    })
  })

  it('should cleanup animation frame on unmount', () => {
    const { unmount } = render(<FaceMapCanvas landmarks={null} />)
    
    unmount()
    
    expect(global.cancelAnimationFrame).toHaveBeenCalled()
  })

  it('should handle empty landmarks array', async () => {
    render(<FaceMapCanvas landmarks={[]} />)

    await waitFor(() => {
      // Should show placeholder when landmarks array is empty
      expect(mockContext.fillText).toHaveBeenCalledWith('顔認識待機中...', 160, 120)
    })
  })

  it('should scale landmarks to canvas dimensions', async () => {
    const mockLandmarks = [
      { x: 0.5, y: 0.5, z: 0 }, // Should be drawn at (200, 150) on 400x300 canvas
    ]
    
    // Add enough landmarks
    for (let i = 1; i < 500; i++) {
      mockLandmarks.push({ x: 0.5, y: 0.5, z: 0 })
    }

    render(<FaceMapCanvas landmarks={mockLandmarks} width={400} height={300} />)

    await waitFor(() => {
      // Nose tip (index 1) should be drawn at scaled coordinates
      expect(mockContext.arc).toHaveBeenCalledWith(200, 150, 3, 0, 2 * Math.PI)
    })
  })
})