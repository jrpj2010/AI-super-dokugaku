import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: '思考OS X,Y,Z - AIプロンプト強化アプリ',
  description: 'TANREN 3Dメソッドを活用して、誰でも簡単にプロ級のプロンプトを作成できるアプリ',
  keywords: ['AI', 'プロンプト', 'TANREN', '3Dメソッド', 'ChatGPT', 'Claude'],
  authors: [{ name: 'TANREN株式会社' }],
  openGraph: {
    title: '思考OS X,Y,Z - AIプロンプト強化アプリ',
    description: '一言二言の入力でプロ級のプロンプトを自動生成',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}