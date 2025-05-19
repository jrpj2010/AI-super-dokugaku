import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DebugConsole } from "@/components/debug-console"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GPT Image 1 大量ジェネレーター",
  description: "OpenAIの画像生成モデルを使用して大量の画像を効率的に生成するツール",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <DebugConsole />
        </ThemeProvider>
      </body>
    </html>
  )
}
