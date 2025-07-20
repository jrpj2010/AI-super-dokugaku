'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'

export default function TestStreaming() {
  const [manualStream, setManualStream] = useState('')
  
  // useCompletionでテスト
  const {
    completion,
    isLoading,
    complete,
    error
  } = useCompletion({
    api: '/api/test-stream',
  })

  // 手動ストリーミングテスト
  const testManualStream = async () => {
    setManualStream('')
    
    try {
      const response = await fetch('/api/test-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true })
      })

      if (!response.ok) throw new Error('Network response was not ok')
      
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      
      while (true) {
        const { done, value } = await reader!.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        setManualStream(prev => prev + chunk)
      }
    } catch (error) {
      console.error('Streaming error:', error)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">ストリーミングテスト</h1>
      
      <div className="space-y-8">
        {/* useCompletionテスト */}
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-4">useCompletionテスト</h2>
          <button
            onClick={() => complete('')}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'ストリーミング中...' : 'useCompletionでテスト'}
          </button>
          {error && <p className="text-red-500 mt-2">エラー: {error.message}</p>}
          <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
            {completion || 'まだデータがありません'}
          </pre>
        </div>

        {/* 手動ストリーミングテスト */}
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-4">手動ストリーミングテスト</h2>
          <button
            onClick={testManualStream}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            手動でストリーミングテスト
          </button>
          <pre className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap">
            {manualStream || 'まだデータがありません'}
          </pre>
        </div>
      </div>
    </div>
  )
}