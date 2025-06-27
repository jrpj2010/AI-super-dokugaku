'use client'

import { useState } from 'react'

interface CitationProps {
  number: number
  title: string
  url: string
  snippet?: string
}

export function Citation({ number, title, url, snippet }: CitationProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="relative inline-block">
      <sup
        className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        [{number}]
      </sup>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          {snippet && (
            <p className="text-xs text-gray-600 mb-2">{snippet}</p>
          )}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline break-all"
          >
            {url}
          </a>
        </div>
      )}
    </span>
  )
}