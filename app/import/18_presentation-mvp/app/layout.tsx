import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP, Noto_Serif_JP, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" }) // Added display: "swap"
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"], // Consider 'japanese' subset for full Japanese character support
  weight: ["300", "400", "500", "700"], // Adjusted weights
  variable: "--font-noto-sans-jp",
  display: "swap",
})
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"], // Consider 'japanese' subset
  weight: ["400", "600", "700"], // Adjusted weights
  variable: "--font-noto-serif-jp",
  display: "swap",
})
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "モダンプレゼンテーション生成MVP - 明治スタイル",
  description: "AIを活用した「明治スタイル」のプレゼンテーション生成ツールMVP",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${robotoMono.variable} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
