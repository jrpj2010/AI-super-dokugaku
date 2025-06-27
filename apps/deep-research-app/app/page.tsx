'use client'

import { useState, useEffect, useCallback } from 'react'
import { FileDown, Loader2, Search } from 'lucide-react'
import { ReportStructureMap } from '@/components/ReportStructureMap'
import { MarkdownWithCitations } from '@/components/MarkdownWithCitations'
import { GenerationPhase, reportStructure } from '@/lib/report-structure'
import { motion, AnimatePresence } from 'framer-motion'
import { ParallelReportProcessor, SectionResult, ProcessingProgress } from '@/lib/parallel-processor'
import { sectionDefinitions } from '@/lib/section-definitions'

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
  const [showDebug, setShowDebug] = useState(true) // デバッグパネルは必須！
  const [completion, setCompletion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [showFullPreview, setShowFullPreview] = useState(false) // 下部プレビューの表示制御
  const [processingProgress, setProcessingProgress] = useState<ProcessingProgress | null>(null)
  const [sectionResults, setSectionResults] = useState<Map<string, SectionResult>>(new Map())

  // デバッグ情報を追加する関数
  const addDebugInfo = useCallback((info: string) => {
    const timestamp = new Date().toLocaleTimeString('ja-JP')
    setDebugInfo(prev => [...prev, `[${timestamp}] ${info}`])
  }, [])

  // 進捗コールバック
  const handleProgress = useCallback((progress: ProcessingProgress) => {
    setProcessingProgress(progress)
    addDebugInfo(`バッチ ${progress.currentBatch}/${progress.totalBatches} - 処理中: ${progress.sectionsInProgress.join(', ')}`)
    addDebugInfo(`完了: ${progress.completedSections}/${progress.totalSections} セクション`)
  }, [addDebugInfo])

  // セクション完了コールバック
  const handleSectionComplete = useCallback((result: SectionResult) => {
    setSectionResults(prev => {
      const newMap = new Map(prev)
      newMap.set(result.sectionId, result)
      return newMap
    })
    
    if (result.error) {
      addDebugInfo(`❌ ${result.title}: ${result.error}`)
    } else {
      addDebugInfo(`✅ ${result.title} 完了 (${result.content.length} 文字)`)
    }
    
    // セクションの内容を全体コンテンツに追加
    setCompletion(prev => {
      // 既存のコンテンツからセクションマーカーを探して置き換える
      const sectionDef = sectionDefinitions.find(s => s.id === result.sectionId)
      if (!sectionDef) return prev + '\n\n' + result.content
      
      // セクションタイトルを含めてコンテンツを追加
      const sectionContent = `## ${result.title}\n\n${result.content}`
      
      // 既にプレースホルダーがある場合は置き換え、なければ追加
      const placeholder = `## ${result.title}\n\n_生成中..._`
      if (prev.includes(placeholder)) {
        return prev.replace(placeholder, sectionContent)
      }
      
      return prev + '\n\n' + sectionContent
    })
  }, [addDebugInfo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    // 状態をリセット
    setCompletion('')
    setReferences([])
    setDebugInfo([])
    setStreamingStatus('idle')
    setError(null)
    setIsLoading(true)
    setSectionResults(new Map())
    setProcessingProgress(null)
    
    // フェーズを開始
    setPhase(GenerationPhase.ANALYZING)
    setShowContent(false)
    addDebugInfo('分析開始')

    // 並列処理の開始
    const startParallelProcessing = async () => {
      try {
        setStreamingStatus('connecting')
        addDebugInfo('並列処理を開始...')
        
        // 初期プレースホルダーを設定
        const initialContent = sectionDefinitions
          .map(section => `## ${section.title}\n\n_生成中..._`)
          .join('\n\n')
        setCompletion(initialContent)
        
        // ParallelReportProcessorを使用
        const processor = new ParallelReportProcessor(
          topic,
          handleProgress,
          handleSectionComplete
        )
        
        setStreamingStatus('streaming')
        
        // レポート生成を開始
        const results = await processor.processReport()
        
        // 品質検証
        const validation = await processor.validateResults()
        if (!validation.isValid) {
          addDebugInfo('⚠️ 品質検証の問題:')
          validation.issues.forEach(issue => addDebugInfo(`  - ${issue}`))
        }
        
        setStreamingStatus('completed')
        addDebugInfo('全セクションの生成が完了しました')
        
      } catch (err: any) {
        setStreamingStatus('error')
        setError(err)
        addDebugInfo(`エラー: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    // アニメーションと並行して並列処理を開始
    startParallelProcessing()

    // フェーズ遷移のタイミング（アニメーションのみ）
    setTimeout(() => {
      setPhase(GenerationPhase.STRUCTURE_BUILDING)
      addDebugInfo('構造構築フェーズ開始')
    }, 1000)
    
    setTimeout(() => {
      setPhase(GenerationPhase.SUBSECTION_EXPANDING)
      addDebugInfo('サブセクション展開フェーズ開始')
    }, 3000)
    
    setTimeout(() => {
      setPhase(GenerationPhase.CONTENT_STREAMING)
      setShowContent(true)
      addDebugInfo('コンテンツ表示開始')
    }, 4000)
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 bg-black text-green-400 rounded-lg font-mono text-xs overflow-hidden transition-all duration-300 ${
              showDebug ? 'p-4' : 'p-2'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                🔧 デバッグ情報
                {streamingStatus === 'streaming' && (
                  <span className="inline-flex items-center">
                    <span className="animate-pulse">⚡ ストリーミング中</span>
                  </span>
                )}
              </h3>
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="text-yellow-400 hover:text-yellow-300 transition-transform duration-200"
                style={{ transform: showDebug ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              >
                {showDebug ? '▼' : '◀'}
              </button>
            </div>
            
            <AnimatePresence>
              {showDebug && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-1"
                >
                <div className="grid grid-cols-2 gap-x-4">
                  <div>ステータス: <span className={
                    streamingStatus === 'error' ? 'text-red-400' :
                    streamingStatus === 'streaming' ? 'text-yellow-400' :
                    streamingStatus === 'completed' ? 'text-green-400' :
                    'text-gray-400'
                  }>{streamingStatus}</span></div>
                  <div>フェーズ: <span className="text-blue-400">{phase}</span></div>
                  <div>Loading: <span className={isLoading ? 'text-yellow-400' : 'text-gray-400'}>{isLoading ? 'true' : 'false'}</span></div>
                  <div>Completion長: <span className="text-cyan-400">{completion.length.toLocaleString()}</span> 文字</div>
                  <div>Error: <span className={error ? 'text-red-400' : 'text-gray-400'}>{error ? error.message : 'none'}</span></div>
                  <div>Topic: <span className="text-purple-400">{topic || 'not set'}</span></div>
                </div>
                {processingProgress && (
                  <div className="mt-2 grid grid-cols-2 gap-x-4">
                    <div>バッチ: <span className="text-yellow-400">{processingProgress.currentBatch}/{processingProgress.totalBatches}</span></div>
                    <div>完了セクション: <span className="text-green-400">{processingProgress.completedSections}/{processingProgress.totalSections}</span></div>
                    <div className="col-span-2">処理中: <span className="text-blue-400">{processingProgress.sectionsInProgress.join(', ')}</span></div>
                  </div>
                )}
                <div className="mt-2 border-t border-green-800 pt-2 max-h-24 overflow-y-auto">
                  {debugInfo.slice(-10).map((info, i) => (
                    <div key={i} className="text-xs opacity-80">{info}</div>
                  ))}
                </div>
              </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">TANREN Deep Research</h1>
            <p className="text-gray-600 mb-8">
              TANRENエージェントによる多角的な企業分析レポートを生成します
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
                  content={completion}
                  onSectionClick={(sectionId) => {
                    // セクションクリックでスクロール（将来実装）
                    console.log('Section clicked:', sectionId)
                  }}
                />

                {/* ダウンロードボタンとオプション */}
                {phase === GenerationPhase.COMPLETED && completion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                      >
                        <FileDown className="w-4 h-4" />
                        ダウンロード
                      </button>
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={showFullPreview}
                          onChange={(e) => setShowFullPreview(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        フルプレビューを表示
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* フルプレビュー（オプション） */}
                {showFullPreview && completion && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900">フルプレビュー</h2>
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