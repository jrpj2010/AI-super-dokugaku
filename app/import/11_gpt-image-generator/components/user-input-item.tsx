"use client"

import { useImageStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import type { UserInputItemType } from "@/lib/types"
import { Loader2, Download, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { downloadImage, generateFilename } from "@/lib/download-utils"
import { useRef, useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

interface UserInputItemProps {
  input: UserInputItemType
}

export function UserInputItem({ input }: UserInputItemProps) {
  const { updateUserInput, removeUserInput } = useImageStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [progress, setProgress] = useState(0)
  const [progressMessage, setProgressMessage] = useState("")

  // テキストエリアの高さを自動調整
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input.prompt])

  // 処理中の場合、進捗をアニメーション
  useEffect(() => {
    if (input.status === "processing") {
      setProgress(0)
      setProgressMessage("画像生成中...")
      
      // 進捗アニメーション
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return 90 // 90%で止める（完了は実際の画像取得時）
          return prev + Math.random() * 10
        })
      }, 500)

      // メッセージの更新
      const messages = [
        "画像生成中...",
        "プロンプトを処理中...",
        "OpenAI APIと通信中...",
        "画像を生成中...",
        "もうすぐ完了します..."
      ]
      let messageIndex = 0
      const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length
        setProgressMessage(messages[messageIndex])
      }, 2000)

      return () => {
        clearInterval(interval)
        clearInterval(messageInterval)
      }
    } else if (input.status === "completed") {
      setProgress(100)
      setProgressMessage("完了!")
    }
  }, [input.status])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr_1fr] gap-4 items-start">
      {/* 管理ナンバー入力欄 */}
      <div className="w-24">
        <Input
          value={input.managementNo || ''}
          onChange={(e) => updateUserInput(input.id, { ...input, managementNo: e.target.value })}
          placeholder="No."
          className="text-center font-mono"
        />
      </div>
      
      {/* ファイル名入力欄 */}
      <div className="w-48">
        <Input
          value={input.fileName || ''}
          onChange={(e) => updateUserInput(input.id, { ...input, fileName: e.target.value })}
          placeholder="ファイル名"
          className="font-mono"
        />
      </div>
      
      {/* プロンプト入力欄 */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={input.prompt}
          onChange={(e) => updateUserInput(input.id, e.target.value)}
          placeholder="ユーザーインプット"
          className="resize-none min-h-[40px] overflow-hidden pr-10"
          rows={1}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-8 w-8"
          onClick={() => removeUserInput(input.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-[150px] relative border rounded-md overflow-hidden">
        {input.status === "idle" && (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">待機中</div>
        )}

        {input.status === "pending" && (
          <div className="flex items-center justify-center h-full">
            <Skeleton className="h-full w-full" />
          </div>
        )}

        {input.status === "processing" && (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-full space-y-3">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{progressMessage}</span>
                  <span className="font-mono">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              {input.progressMessage && (
                <p className="text-xs text-center text-muted-foreground">
                  {input.progressMessage}
                </p>
              )}
            </div>
          </div>
        )}

        {input.status === "completed" && input.imageUrl && (
          <>
            <Image src={input.imageUrl || "/placeholder.svg"} alt={input.prompt} fill className="object-cover" />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 z-10"
              onClick={() => {
                // 管理ナンバーとファイル名がある場合はそれを使用
                const filename = input.managementNo && input.fileName 
                  ? `${input.managementNo}_${input.fileName}.png`
                  : generateFilename(`image_${input.id}`)
                downloadImage(input.imageUrl!, filename)
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </>
        )}

        {input.status === "error" && (
          <div className="flex items-center justify-center h-full text-sm text-destructive p-2 text-center">
            エラー: {input.errorMessage || "画像生成に失敗しました"}
          </div>
        )}
      </div>
    </div>
  )
}
