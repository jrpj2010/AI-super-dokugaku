import { render, screen } from '@testing-library/react'
import Footer from '@/components/footer'
import { VERSION_DISPLAY } from '@/lib/version'

describe('Footer', () => {
  it('バージョン情報が表示される', () => {
    render(<Footer />)
    
    const versionElement = screen.getByTestId('version-display')
    expect(versionElement).toBeInTheDocument()
    expect(versionElement).toHaveTextContent(VERSION_DISPLAY)
  })

  it('正しいバージョン形式で表示される', () => {
    render(<Footer />)
    
    const versionElement = screen.getByTestId('version-display')
    expect(versionElement).toHaveTextContent(/TANREN Ver \d+\.\d+\.\d+/)
  })

  it('フッターが正しいスタイルで表示される', () => {
    render(<Footer />)
    
    const footer = screen.getByTestId('app-footer')
    expect(footer).toHaveClass('fixed', 'bottom-0', 'right-0', 'p-4', 'text-xs', 'text-gray-500')
  })
})