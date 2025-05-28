import React from 'react'
import { render, screen } from '@testing-library/react'
import EmotionRadarChart from '@/components/emotion-radar-chart'
import { EmotionData } from '@/lib/mock-data'

// Mock Recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  RadarChart: ({ children }: any) => <div data-testid="radar-chart">{children}</div>,
  PolarGrid: () => <div data-testid="polar-grid" />,
  PolarAngleAxis: () => <div data-testid="polar-angle-axis" />,
  PolarRadiusAxis: () => <div data-testid="polar-radius-axis" />,
  Radar: () => <div data-testid="radar" />,
}))

describe('EmotionRadarChart', () => {
  it('should render without errors', () => {
    render(<EmotionRadarChart />)
    
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument()
  })

  it('should render with default data when no data is provided', () => {
    render(<EmotionRadarChart />)
    
    expect(screen.getByTestId('polar-grid')).toBeInTheDocument()
    expect(screen.getByTestId('polar-angle-axis')).toBeInTheDocument()
    expect(screen.getByTestId('polar-radius-axis')).toBeInTheDocument()
    expect(screen.getByTestId('radar')).toBeInTheDocument()
  })

  it('should render with custom emotion data', () => {
    const customData: EmotionData = {
      happiness: 80,
      surprise: 60,
      fear: 20,
      disgust: 10,
      anger: 15,
      sadness: 25,
    }
    
    render(<EmotionRadarChart data={customData} />)
    
    expect(screen.getByTestId('radar-chart')).toBeInTheDocument()
  })

  it('should have correct container dimensions', () => {
    const { container } = render(<EmotionRadarChart />)
    const wrapper = container.firstChild as HTMLElement
    
    expect(wrapper).toHaveClass('h-64')
  })
})