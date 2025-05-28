import type { Metadata } from 'next'
import { SessionProvider } from '@/contexts/session-context'
import Footer from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'TANREN 感情分析システム',
  description: 'リアルタイム感情分析とロールプレイ診断',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
