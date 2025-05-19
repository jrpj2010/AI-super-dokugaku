"use client"

import { useState } from "react"
import { useHistoryStore } from "@/lib/history-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Trash2, Download, FileJson, Package } from "lucide-react"
import { downloadImagesAsZip } from "@/lib/download-utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export function HistoryViewer() {
  const { history, deleteHistory, clearHistory, exportHistory } = useHistoryStore()
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const [deletingHistoryId, setDeletingHistoryId] = useState<string | null>(null)

  const handleDownloadZip = async (historyItem: any) => {
    const images = historyItem.userInputs
      .filter((input: any) => input.status === "completed" && input.imageUrl)
      .map((input: any) => ({
        id: input.id,
        imageUrl: input.imageUrl,
        prompt: input.prompt,
      }))

    await downloadImagesAsZip(images, historyItem.masterPrompt)
  }

  const handleExportHistory = () => {
    const json = exportHistory()
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `generation_history_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>生成履歴</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportHistory}
            disabled={history.length === 0}
          >
            <FileJson className="h-4 w-4 mr-1" />
            履歴をエクスポート
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowClearDialog(true)}
            disabled={history.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            すべてクリア
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              履歴がありません
            </p>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => setSelectedHistoryId(item.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.totalImages}枚 ({item.successCount}成功 / {item.errorCount}エラー)
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{item.settings.quality}</Badge>
                        <Badge variant="outline">{item.settings.size}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.masterPrompt}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownloadZip(item)
                        }}
                        disabled={item.successCount === 0}
                      >
                        <Package className="h-4 w-4 mr-1" />
                        ZIPダウンロード
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeletingHistoryId(item.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        削除
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>

      {/* 詳細ダイアログ */}
      <Dialog open={!!selectedHistoryId} onOpenChange={() => setSelectedHistoryId(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>生成履歴の詳細</DialogTitle>
          </DialogHeader>
          {selectedHistoryId && (
            <ScrollArea className="h-[60vh]">
              {(() => {
                const item = history.find((h) => h.id === selectedHistoryId)
                if (!item) return null
                
                return (
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">マスタープロンプト:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {item.masterPrompt}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">生成画像:</p>
                      <div className="grid grid-cols-2 gap-4">
                        {item.userInputs
                          .filter((input) => input.status === "completed" && input.imageUrl)
                          .map((input) => (
                            <div key={input.id} className="space-y-2">
                              <img
                                src={input.imageUrl}
                                alt={input.prompt}
                                className="w-full h-40 object-cover rounded-md"
                              />
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {input.prompt}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>

      {/* クリア確認ダイアログ */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>履歴をクリアしますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。すべての履歴が削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clearHistory()
                setShowClearDialog(false)
              }}
            >
              クリア
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={!!deletingHistoryId} onOpenChange={() => setDeletingHistoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>この履歴を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingHistoryId) {
                  deleteHistory(deletingHistoryId)
                  setDeletingHistoryId(null)
                }
              }}
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}