"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useImageStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Save, ChevronDown, Trash2, Clock } from "lucide-react"

export function MasterPromptInput() {
  const { masterPrompt, setMasterPrompt, savedPrompts, savePrompt, loadPrompt, deletePrompt } = useImageStore()
  const [isFocused, setIsFocused] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [promptName, setPromptName] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSavePrompt = () => {
    if (promptName.trim()) {
      savePrompt(promptName.trim())
      setPromptName("")
      setIsDialogOpen(false)
    }
  }

  const handleLoadPrompt = useCallback(
    (id: string) => {
      loadPrompt(id)
      setIsDropdownOpen(false)
    },
    [loadPrompt],
  )

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const [deletingPromptId, setDeletingPromptId] = useState<string | null>(null)

  const handleDeletePrompt = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation()
      e.preventDefault()
      setDeletingPromptId(id)
      setDeleteAlertOpen(true)
    },
    [],
  )

  const confirmDelete = useCallback(() => {
    if (deletingPromptId) {
      deletePrompt(deletingPromptId)
      setDeleteAlertOpen(false)
      setDeletingPromptId(null)
    }
  }, [deletePrompt, deletingPromptId])

  // 日付を相対時間に変換する関数（シンプルな実装）
  const formatRelativeTime = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()

      // ミリ秒を適切な単位に変換
      const diffSec = Math.floor(diffMs / 1000)
      const diffMin = Math.floor(diffSec / 60)
      const diffHour = Math.floor(diffMin / 60)
      const diffDay = Math.floor(diffHour / 24)
      const diffMonth = Math.floor(diffDay / 30)
      const diffYear = Math.floor(diffMonth / 12)

      if (diffYear > 0) return `${diffYear}年前`
      if (diffMonth > 0) return `${diffMonth}ヶ月前`
      if (diffDay > 0) return `${diffDay}日前`
      if (diffHour > 0) return `${diffHour}時間前`
      if (diffMin > 0) return `${diffMin}分前`
      return `${diffSec}秒前`
    } catch (error) {
      console.error("Date formatting error:", error)
      return "不明な日時"
    }
  }, [])

  // カスタムドロップダウンの実装
  const renderSavedPromptsDropdown = () => {
    if (!isDropdownOpen) return null

    return (
      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-popover z-50">
        <div className="rounded-md ring-1 ring-black ring-opacity-5 p-1">
          {Array.isArray(savedPrompts) && savedPrompts.length > 0 ? (
            <>
              {savedPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="flex justify-between items-center px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm"
                  onClick={() => handleLoadPrompt(prompt.id)}
                >
                  <div className="flex-1 truncate mr-2">{prompt.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {formatRelativeTime(prompt.updatedAt || new Date().toISOString())}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 ml-1"
                    onClick={(e) => handleDeletePrompt(e, prompt.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <hr className="my-1" />
            </>
          ) : (
            <div className="px-4 py-2 text-sm text-muted-foreground">保存されたプロンプトはありません</div>
          )}
          <div
            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm"
            onClick={() => {
              setIsDropdownOpen(false)
              setIsDialogOpen(true)
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            現在のプロンプトを保存
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>マスタープロンプト</CardTitle>
          <div className="flex space-x-2 relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 100)}
            >
              保存済み <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            {renderSavedPromptsDropdown()}

            <Button size="sm" onClick={() => setIsDialogOpen(true)}>
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>マスタープロンプトを保存</DialogTitle>
                  <DialogDescription>
                    このプロンプトに名前を付けて保存します。後で簡単に再利用できます。
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="プロンプト名"
                      value={promptName}
                      onChange={(e) => setPromptName(e.target.value)}
                    />
                    <div className="text-xs text-muted-foreground">
                      同じ名前のプロンプトが存在する場合は上書きされます。
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={handleSavePrompt} disabled={!promptName.trim()}>
                    保存
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>プロンプトの削除</AlertDialogTitle>
              <AlertDialogDescription>
                このプロンプトを削除してもよろしいですか？この操作は元に戻せません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>削除</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className={`relative rounded-md border ${isFocused ? "ring-2 ring-ring" : ""}`}>
          <Textarea
            value={masterPrompt}
            onChange={(e) => setMasterPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ここにシステムプロンプトを記述..."
            className="min-h-[120px] font-mono text-sm resize-y"
          />
        </div>
      </CardContent>
    </Card>
  )
}
