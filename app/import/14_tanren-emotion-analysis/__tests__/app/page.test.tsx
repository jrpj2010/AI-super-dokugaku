import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AISuite from '@/app/page'

// Mock components
jest.mock('@/components/realtime-dashboard', () => ({
  __esModule: true,
  default: () => <div data-testid="realtime-dashboard">Realtime Dashboard</div>,
}))

jest.mock('@/components/analysis-report', () => ({
  __esModule: true,
  default: () => <div data-testid="analysis-report">Analysis Report</div>,
}))

describe('AISuite Main Page', () => {
  it('should render the main layout', () => {
    render(<AISuite />)
    
    // Check title
    expect(screen.getByText('TANREN')).toBeInTheDocument()
    expect(screen.getByText('マルチモーダルAIを活用したロールプレイング診断・感情分析プラットフォーム')).toBeInTheDocument()
  })

  it('should render tab navigation', () => {
    render(<AISuite />)
    
    const realtimeTab = screen.getByRole('tab', { name: /リアルタイム分析/i })
    const reportTab = screen.getByRole('tab', { name: /分析結果レポート/i })
    
    expect(realtimeTab).toBeInTheDocument()
    expect(reportTab).toBeInTheDocument()
  })

  it('should show realtime dashboard by default', () => {
    render(<AISuite />)
    
    expect(screen.getByTestId('realtime-dashboard')).toBeInTheDocument()
    expect(screen.queryByTestId('analysis-report')).not.toBeInTheDocument()
  })

  it('should switch to analysis report when tab is clicked', async () => {
    const user = userEvent.setup()
    render(<AISuite />)
    
    const reportTab = screen.getByRole('tab', { name: /分析結果レポート/i })
    await user.click(reportTab)
    
    await waitFor(() => {
      expect(screen.queryByTestId('realtime-dashboard')).not.toBeInTheDocument()
      expect(screen.getByTestId('analysis-report')).toBeInTheDocument()
    })
  })

  it('should switch back to realtime dashboard', async () => {
    const user = userEvent.setup()
    render(<AISuite />)
    
    // First switch to report
    const reportTab = screen.getByRole('tab', { name: /分析結果レポート/i })
    await user.click(reportTab)
    
    // Then switch back to dashboard
    const realtimeTab = screen.getByRole('tab', { name: /リアルタイム分析/i })
    await user.click(realtimeTab)
    
    await waitFor(() => {
      expect(screen.getByTestId('realtime-dashboard')).toBeInTheDocument()
      expect(screen.queryByTestId('analysis-report')).not.toBeInTheDocument()
    })
  })

  it('should maintain active tab state', async () => {
    const user = userEvent.setup()
    render(<AISuite />)
    
    const reportTab = screen.getByRole('tab', { name: /分析結果レポート/i })
    await user.click(reportTab)
    
    // Check aria-selected attribute
    expect(reportTab).toHaveAttribute('aria-selected', 'true')
    
    const realtimeTab = screen.getByRole('tab', { name: /リアルタイム分析/i })
    expect(realtimeTab).toHaveAttribute('aria-selected', 'false')
  })

  it('should have correct background gradient', () => {
    const { container } = render(<AISuite />)
    const wrapper = container.firstChild as HTMLElement
    
    expect(wrapper).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-slate-50', 'via-blue-50', 'to-green-50')
  })

  it('should have responsive grid for tabs', () => {
    render(<AISuite />)
    
    const tabsList = screen.getByRole('tablist')
    expect(tabsList).toHaveClass('grid', 'w-full', 'grid-cols-2')
  })
})