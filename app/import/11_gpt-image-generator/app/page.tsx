"use client"

import { useEffect } from "react"
import { MasterPromptInput } from "@/components/master-prompt-input"
import { UserInputList } from "@/components/user-input-list"
import { SettingsButton } from "@/components/settings-button"
import { ImageEditor } from "@/components/image-editor"
import { APILogViewer } from "@/components/api-log-viewer"
import { HistoryViewer } from "@/components/history-viewer"
import { DebugConsole } from "@/components/debug-console"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { clearCorruptedStorage } from "@/lib/clear-storage"

export default function Home() {
  useEffect(() => {
    // 初回マウント時に壊れたストレージをクリア
    try {
      clearCorruptedStorage()
    } catch (e) {
      console.error('Failed to clear storage:', e)
      // 最終手段として全てのストレージをクリア
      try {
        if (typeof window !== 'undefined' && localStorage) {
          ['image-generator-store', 'api-log-storage'].forEach(key => {
            try {
              localStorage.removeItem(key)
            } catch {}
          })
        }
      } catch {}
    }
  }, [])
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">GPT Image 1 大量ジェネレーター Ver0.2.0</h1>
          <SettingsButton />
        </header>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList>
            <TabsTrigger value="generate">画像生成</TabsTrigger>
            <TabsTrigger value="edit">画像編集</TabsTrigger>
            <TabsTrigger value="history">履歴</TabsTrigger>
            <TabsTrigger value="logs">API ログ</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            <MasterPromptInput />
            <DebugConsole />
            <UserInputList />
          </TabsContent>

          <TabsContent value="edit">
            <ImageEditor />
          </TabsContent>

          <TabsContent value="history">
            <HistoryViewer />
          </TabsContent>

          <TabsContent value="logs">
            <APILogViewer />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
