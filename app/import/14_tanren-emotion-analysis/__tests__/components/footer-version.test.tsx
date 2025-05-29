import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/footer'

describe('Footer Version Display', () => {
  it('displays version 1.1.4', () => {
    render(<Footer />)
    
    const versionDisplay = screen.getByTestId('version-display')
    expect(versionDisplay).toBeInTheDocument()
    expect(versionDisplay).toHaveTextContent('TANREN Ver 1.1.4')
  })

  it('has correct styling for visibility', () => {
    render(<Footer />)
    
    const footer = screen.getByTestId('app-footer')
    expect(footer).toHaveClass('fixed', 'bottom-0', 'z-50')
  })
})