import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'
import AISuite from '@/app/page'

// Mockセッションプロバイダー
jest.mock('@/contexts/session-context', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('バージョン表示E2Eテスト', () => {
  it('アプリケーション全体でバージョンが表示される', () => {
    render(
      <RootLayout>
        <AISuite />
      </RootLayout>
    )
    
    // フッターが存在することを確認
    const footer = screen.getByTestId('app-footer')
    expect(footer).toBeInTheDocument()
    
    // バージョン表示が存在することを確認
    const versionDisplay = screen.getByTestId('version-display')
    expect(versionDisplay).toBeInTheDocument()
    expect(versionDisplay).toHaveTextContent('TANREN Ver 1.1.2')
  })

  it('バージョン表示が他のUIを邪魔しない位置にある', () => {
    render(
      <RootLayout>
        <AISuite />
      </RootLayout>
    )
    
    const footer = screen.getByTestId('app-footer')
    
    // 固定位置で右下に配置されていることを確認
    expect(footer).toHaveClass('fixed')
    expect(footer).toHaveClass('bottom-0')
    expect(footer).toHaveClass('right-0')
  })
})