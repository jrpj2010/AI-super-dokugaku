import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import AudioVisualizer from '@/components/audio-visualizer'

// Mock canvas context
const mockGetContext = jest.fn()
const mockClearRect = jest.fn()
const mockFillRect = jest.fn()
const mockCreateLinearGradient = jest.fn()
const mockAddColorStop = jest.fn()

describe('AudioVisualizer', () => {
  beforeEach(() => {
    // Setup canvas mock
    mockGetContext.mockReturnValue({
      clearRect: mockClearRect,
      fillRect: mockFillRect,
      createLinearGradient: mockCreateLinearGradient,
    })
    
    mockCreateLinearGradient.mockReturnValue({
      addColorStop: mockAddColorStop,
    })
    
    HTMLCanvasElement.prototype.getContext = mockGetContext
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render canvas element', () => {
    const { container } = render(<AudioVisualizer isActive={false} />)
    const canvas = container.querySelector('canvas')
    
    expect(canvas).toBeInTheDocument()
    expect(canvas).toHaveAttribute('width', '400')
    expect(canvas).toHaveAttribute('height', '48')
  })

  it('should initialize canvas context on mount', () => {
    render(<AudioVisualizer isActive={false} />)
    
    expect(mockGetContext).toHaveBeenCalledWith('2d')
  })

  it('should display low amplitude bars when inactive', async () => {
    render(<AudioVisualizer isActive={false} />)
    
    await waitFor(() => {
      expect(mockClearRect).toHaveBeenCalled()
      expect(mockFillRect).toHaveBeenCalled()
    })
  })

  it('should display animated bars when active', async () => {
    render(<AudioVisualizer isActive={true} />)
    
    await waitFor(() => {
      expect(mockClearRect).toHaveBeenCalled()
      expect(mockCreateLinearGradient).toHaveBeenCalled()
      expect(mockAddColorStop).toHaveBeenCalledWith(0, 'rgba(59, 130, 246, 0.8)')
      expect(mockAddColorStop).toHaveBeenCalledWith(1, 'rgba(59, 130, 246, 0.2)')
      expect(mockFillRect).toHaveBeenCalled()
    })
  })

  it('should have correct wrapper styles', () => {
    const { container } = render(<AudioVisualizer isActive={true} />)
    const wrapper = container.firstChild as HTMLElement
    
    expect(wrapper).toHaveClass('w-full', 'h-16', 'bg-black/20', 'rounded-lg', 'p-2')
  })

  it('should clean up animation on unmount', () => {
    const mockCancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame')
    const { unmount } = render(<AudioVisualizer isActive={true} />)
    
    unmount()
    
    expect(mockCancelAnimationFrame).toHaveBeenCalled()
  })
})