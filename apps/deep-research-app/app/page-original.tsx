'use client'

import { useState } from 'react'
import { FileDown, Loader2, Search } from 'lucide-react'
import { MarkdownWithCitations } from '@/components/MarkdownWithCitations'


interface Reference {
  number: number
  title: string
  source: string
  url: string
}

export default function Home() {
  const [topic, setTopic] = useState('')
  const [report, setReport] = useState('')
  const [references, setReferences] = useState<Reference[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'サーバーでエラーが発生しました。')
      }

      const data = await response.json()
      setReport(data.report)
      setReferences(data.references || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : '不明なエラーです。'
      setError(`レポート生成中にエラーが発生しました。もう一度お試しください。 (詳細: ${message})`)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `research-report-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Deep Research App</h1>
          <p className="text-gray-600 mb-8">
            AIエージェントによる多角的な企業分析レポートを生成します
          </p>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="分析したいテーマを入力してください（例：次世代エネルギー市場の展望）"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                required
              />
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    分析開始
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {report && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">分析結果</h2>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  ダウンロード
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <MarkdownWithCitations 
                  content={report} 
                  references={references.map(ref => ({
                    number: ref.number,
                    title: ref.title,
                    url: ref.url || ref.source,
                    snippet: ref.source
                  }))}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}