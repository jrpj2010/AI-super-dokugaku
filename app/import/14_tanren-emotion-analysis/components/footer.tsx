"use client"

import { VERSION_DISPLAY } from '@/lib/version'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center p-4 text-xs text-gray-600 bg-white/80 backdrop-blur-sm border-t border-gray-100 z-50" data-testid="app-footer">
      <span data-testid="version-display" className="font-medium">{VERSION_DISPLAY}</span>
    </footer>
  )
}