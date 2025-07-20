"use client"

import { useState, useEffect } from "react"
import { useApiDebugStore } from "@/lib/debug-store"
import { Activity, ChevronUp, ChevronDown, Circle } from "lucide-react"

export function DebugConsole() {
  const { messages } = useApiDebugStore()
  const [visible, setVisible] = useState(true) // デフォルトで表示に変更
  const [expanded, setExpanded] = useState(false) // 展開状態
  const [autoScroll, setAutoScroll] = useState(true)
  
  // 最新のメッセージを表示
  const displayMessages = expanded ? messages.slice(-50) : messages.slice(-5)
  
  // 自動スクロール
  useEffect(() => {
    if (autoScroll && visible) {
      const element = document.getElementById('debug-console-content')
      if (element) {
        element.scrollTop = element.scrollHeight
      }
    }
  }, [messages, visible, autoScroll])

  return (
    <div className="w-full mb-4"> {/* fixed位置からw-fullに変更 */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVisible(!visible)}
            className="flex items-center gap-1 text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            <Activity className="h-3 w-3" />
            {visible ? "デバッグコンソールを隠す" : "デバッグコンソール"}
          </button>
          {messages.length > 0 && (
            <div className="flex items-center gap-1">
              <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
              <span className="text-xs text-gray-400">{messages.length} メッセージ</span>
            </div>
          )}
        </div>
      </div>
      {visible && (
        <div className={`bg-black rounded-md overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 w-full ${expanded ? 'h-96' : 'h-48'}`}>
          <div className="bg-gray-800 px-3 py-1 flex items-center justify-between border-b border-gray-700">
            <span className="text-xs text-gray-400 font-mono">DEBUG CONSOLE</span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs text-gray-400">
                <input 
                  type="checkbox" 
                  checked={autoScroll} 
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="w-3 h-3"
                />
                Auto
              </label>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div 
            id="debug-console-content"
            className="p-3 h-full overflow-y-auto font-mono text-xs select-text cursor-text"
            style={{ userSelect: 'text' }}
          >
            {displayMessages.length === 0 ? (
              <div className="text-gray-500">APIの通信待機中...</div>
            ) : (
              displayMessages.map((msg, index) => {
                const timestamp = new Date(msg.timestamp).toLocaleTimeString('ja-JP', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  fractionalSecondDigits: 3
                })
                
                // メッセージタイプによって色を変える
                let textColor = 'text-gray-400'
                if (msg.text.includes('エラー') || msg.text.includes('❌')) {
                  textColor = 'text-red-400'
                } else if (msg.text.includes('完了') || msg.text.includes('✅')) {
                  textColor = 'text-green-400'
                } else if (msg.text.includes('API') || msg.text.includes('リクエスト') || msg.text.includes('レスポンス') || msg.text.includes('OpenAI')) {
                  textColor = 'text-yellow-400' // API通信関連を黄色に
                } else if (msg.text.includes('処理中') || msg.text.includes('🎨')) {
                  textColor = 'text-yellow-400'
                } else if (msg.text.includes('接続')) {
                  textColor = 'text-blue-400'
                }
                
                return (
                  <div key={index} className="mb-1 flex items-start gap-2">
                    <span className="text-gray-600">[{timestamp}]</span>
                    <span className={textColor}>
                      {msg.text}
                      {msg.count > 1 && <span className="ml-1 text-xs text-gray-500">(×{msg.count})</span>}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
