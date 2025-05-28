"use client"

import { VERSION_DISPLAY } from '@/lib/version'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 p-4 text-xs text-gray-500" data-testid="app-footer">
      <span data-testid="version-display">{VERSION_DISPLAY}</span>
    </footer>
  )
}