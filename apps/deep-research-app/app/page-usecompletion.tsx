'use client'

import { useState, useEffect } from 'react'
import { FileDown, Loader2, Search } from 'lucide-react'
import { useCompletion } from 'ai/react'
import { ReportStructureMap } from '@/components/ReportStructureMap'
import { MarkdownWithCitations } from '@/components/MarkdownWithCitations'
import { GenerationPhase, reportStructure } from '@/lib/report-structure'
import { motion, AnimatePresence } from 'framer-motion'

interface Reference {
  number: number
  title: string
  source: string
  url: string
}

export default function Home() {
  const [topic, setTopic] = useState('')
  const [phase, setPhase] = useState<GenerationPhase>(GenerationPhase.IDLE)
  const [currentSection, setCurrentSection] = useState<string>('')
  const [references, setReferences] = useState<Reference[]>([])
  const [showContent, setShowContent] = useState(false)
  const [streamingStatus, setStreamingStatus] = useState<'idle' | 'connecting' | 'streaming' | 'completed' | 'error'>('idle')
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [showDebug, setShowDebug] = useState(true) // 開発時はtrue
  const [submittedTopic, setSubmittedTopic] = useState('') // 送信されたトピックを保持

  const {
    completion,
    isLoading,
    complete,
    error,
    setCompletion
  } = useCompletion({
    api: '/api/generate-stream',
    onResponse: (response) => {
      addDebugInfo(`APIレスポンス受信: ${response.status}`)
      if (!response.ok) {
        setStreamingStatus('error')
      }
    },
    onFinish: () => {
      setStreamingStatus('completed')
      addDebugInfo('ストリーミング完了')
    },
    onError: (err) => {
      setStreamingStatus('error')
      addDebugInfo(`エラー発生: ${err.message}`)
    }
  })

  // デバッグ情報を追加する関数
  const addDebugInfo = (info: string) => {
    const timestamp = new Date().toLocaleTimeString('ja-JP')
    setDebugInfo(prev => [...prev, `[${timestamp}] ${info}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    // 状態をリセット
    setCompletion('')
    setReferences([])
    setDebugInfo([])
    setStreamingStatus('idle')
    
    // フェーズを開始
    setPhase(GenerationPhase.ANALYZING)
    setShowContent(false)
    addDebugInfo('分析開始')

    // トピックを保存
    setSubmittedTopic(topic)
    
    // 即座にAPIリクエストを開始（バックグラウンドで）
    const startStreaming = async () => {
      try {
        setStreamingStatus('connecting')
        addDebugInfo('APIに接続中...')
        
        // complete関数にプロンプトとオプションを渡す
        await complete(topic, {
          body: {
            topic: topic
          }
        })
        
      } catch (err) {
        setStreamingStatus('error')
        addDebugInfo(`接続エラー: ${err}`)
      }
    }

    // アニメーションと並行してAPIリクエスト
    startStreaming()

    // フェーズ遷移のタイミング（アニメーションのみ）
    setTimeout(() => {
      setPhase(GenerationPhase.STRUCTURE_BUILDING)
      addDebugInfo('構造構築フェーズ開始')
    }, 2000)
    
    setTimeout(() => {
      setPhase(GenerationPhase.SUBSECTION_EXPANDING)
      addDebugInfo('サブセクション展開フェーズ開始')
    }, 5000)
    
    setTimeout(() => {
      setPhase(GenerationPhase.CONTENT_STREAMING)
      setShowContent(true)
      addDebugInfo('コンテンツ表示開始')
    }, 8000)
  }

  // 現在のセクションを検出
  useEffect(() => {
    if (completion && phase === GenerationPhase.CONTENT_STREAMING) {
      // レポートの最後のセクションを検出
      const sections = reportStructure.map(s => s.title)
      let lastFoundSection = ''
      for (const section of sections) {
        if (completion.includes(`## ${section}`) || completion.includes(`### ${section}`)) {
          lastFoundSection = section
        }
      }
      if (lastFoundSection && lastFoundSection !== currentSection) {
        setCurrentSection(lastFoundSection)
      }
    }
  }, [completion, phase, currentSection])

  // ストリーミング状態の監視
  useEffect(() => {
    addDebugInfo(`状態変更: isLoading=${isLoading}, status=${streamingStatus}, completion長=${completion.length}`)
    
    if (isLoading && streamingStatus === 'connecting') {
      setStreamingStatus('streaming')
      addDebugInfo('データ受信中...')
    }
    // LoadingがfalseでCompletionが空の場合はエラー
    if (!isLoading && streamingStatus === 'connecting' && !completion) {
      setStreamingStatus('error')
      addDebugInfo('エラー: データを受信できませんでした')
    }
  }, [isLoading, streamingStatus, completion])

  // タイムアウト処理
  useEffect(() => {
    if (streamingStatus === 'connecting') {
      const timeout = setTimeout(() => {
        if (!completion && streamingStatus === 'connecting') {
          setStreamingStatus('error')
          addDebugInfo('タイムアウト: 30秒経過してもレスポンスがありません')
        }
      }, 30000) // 30秒のタイムアウト
      
      return () => clearTimeout(timeout)
    }
  }, [streamingStatus, completion])

  // ストリーミング完了時の処理
  useEffect(() => {
    if (!isLoading && completion && phase === GenerationPhase.CONTENT_STREAMING) {
      setPhase(GenerationPhase.COMPLETED)
      addDebugInfo('全フェーズ完了')
    }
  }, [isLoading, completion, phase])

  // 参考文献を抽出
  useEffect(() => {
    if (completion) {
      const refSection = completion.match(/## 参考文献[\s\S]*$/m)
      if (refSection) {
        const refs: Reference[] = []
        const refLines = refSection[0].split('\n').slice(1)
        for (const line of refLines) {
          const match = line.match(/\[(\d+)\]\s*(.+?)\s*-\s*(.+?)(?:\s*\((https?:\/\/[^\s)]+)\))?/)
          if (match) {
            refs.push({
              number: parseInt(match[1]),
              title: match[2].trim(),
              source: match[3].trim(),
              url: match[4] || ''
            })
          }
        }
        setReferences(refs)
      }
    }
  }, [completion])

  const handleDownload = () => {
    const blob = new Blob([completion], { type: 'text/markdown' })
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
          {/* デバッグパネル */}
          {showDebug && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-40"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">🔧 デバッグ情報</h3>
                <button
                  onClick={() => setShowDebug(false)}
                  className="text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1">
                <div>ステータス: {streamingStatus}</div>
                <div>フェーズ: {phase}</div>
                <div>Loading: {isLoading ? 'true' : 'false'}</div>
                <div>Completion長: {completion.length} 文字</div>
                <div>Error: {error ? error.message : 'none'}</div>
                <div>Topic: {submittedTopic || 'not set'}</div>
                <div className="mt-2 border-t border-green-800 pt-2">
                  {debugInfo.slice(-10).map((info, i) => (
                    <div key={i}>{info}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Deep Research App</h1>
            <p className="text-gray-600 mb-8">
              AIエージェントによる多角的な企業分析レポートを生成します
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
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
          </motion.form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600"
            >
              {error.message || 'エラーが発生しました'}
            </motion.div>
          )}

          {/* ストリーミング状態表示 */}
          {streamingStatus !== 'idle' && phase !== GenerationPhase.COMPLETED && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg border ${
                streamingStatus === 'error' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${
                  streamingStatus === 'error' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {streamingStatus === 'connecting' && '🔌 APIに接続中...'}
                  {streamingStatus === 'streaming' && '⚡ データを受信中...'}
                  {streamingStatus === 'error' && '❌ 接続エラー'}
                </h3>
                {streamingStatus === 'streaming' && completion.length > 0 && (
                  <span className="text-sm text-blue-600">
                    {completion.length} 文字受信済み
                  </span>
                )}
              </div>
              
              {streamingStatus === 'error' ? (
                <div className="space-y-3">
                  <p className="text-sm text-red-600">
                    レポートの生成に失敗しました。以下の原因が考えられます：
                  </p>
                  <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                    <li>APIキーが正しく設定されていない</li>
                    <li>APIの利用制限に達した</li>
                    <li>ネットワーク接続の問題</li>
                    <li>サーバー側のエラー</li>
                  </ul>
                  <button
                    onClick={() => {
                      setStreamingStatus('idle')
                      setPhase(GenerationPhase.IDLE)
                      addDebugInfo('リセット: 再度お試しください')
                    }}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    もう一度試す
                  </button>
                </div>
              ) : (
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: streamingStatus === 'streaming' ? '75%' : '25%'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {phase !== GenerationPhase.IDLE && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* レポート構造マップ */}
                <ReportStructureMap
                  phase={phase}
                  currentSection={currentSection}
                  onSectionClick={(sectionId) => {
                    // セクションクリックでスクロール（将来実装）
                    console.log('Section clicked:', sectionId)
                  }}
                />

                {/* コンテンツエリア */}
                {showContent && completion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
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
                        content={completion} 
                        references={references.map(ref => ({
                          number: ref.number,
                          title: ref.title,
                          url: ref.url || ref.source,
                          snippet: ref.source
                        }))}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}