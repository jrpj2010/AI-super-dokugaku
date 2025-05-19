"use client"

import { useState } from "react"
import { useApiDebugStore } from "@/lib/debug-store"

export function DebugConsole() {
  const { messages } = useApiDebugStore()
  const [visible, setVisible] = useState(false) // デフォルトで非表示にする

  // 最新の3つのメッセージだけを表示
  const latestMessages = messages.slice(-3)

  return (
    <div className="fixed bottom-4 left-4 z-40"> {/* 右側から左側に移動、z-indexを下げる */}
      <div className="flex justify-end mb-1">
        <button
          onClick={() => setVisible(!visible)}
          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded hover:bg-gray-600"
        >
          {visible ? "デバッグ情報を隠す" : "デバッグ情報を表示"}
        </button>
      </div>
      {visible && (
        <div className="w-80 h-24 bg-black rounded-md overflow-hidden shadow-lg border border-gray-700">
          <div className="p-2 h-full overflow-y-auto">
            {latestMessages.length === 0 ? (
              <div className="text-yellow-400 text-sm">APIの通信待機中...</div>
            ) : (
              latestMessages.map((msg, index) => (
                <div key={index} className="text-yellow-400 text-sm mb-1">
                  {msg.text}
                  {msg.count > 1 && <span className="ml-1 text-xs">({msg.count})</span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
