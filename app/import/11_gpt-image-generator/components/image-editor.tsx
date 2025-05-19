"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { encodeImageToBase64 } from "@/lib/image-utils"
import { editImage } from "@/lib/api"
import { Loader2, Upload, Eraser } from "lucide-react"

export function ImageEditor() {
  const [sourceImage, setSourceImage] = useState<string | null>(null)
  const [maskImage, setMaskImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sourceInputRef = useRef<HTMLInputElement>(null)
  const maskInputRef = useRef<HTMLInputElement>(null)

  const handleSourceImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      try {
        const base64Data = await encodeImageToBase64(file)
        setSourceImage(`data:${file.type};base64,${base64Data}`)
        setResultImage(null)
        setError(null)
      } catch (err) {
        setError("画像の読み込みに失敗しました")
      }
    }
  }

  const handleMaskImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      try {
        const base64Data = await encodeImageToBase64(file)
        setMaskImage(`data:${file.type};base64,${base64Data}`)
      } catch (err) {
        setError("マスク画像の読み込みに失敗しました")
      }
    }
  }

  const handleEditImage = async () => {
    if (!sourceImage) {
      setError("元画像を選択してください")
      return
    }

    if (!prompt.trim()) {
      setError("編集内容を入力してください")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Base64データ部分のみを抽出
      const sourceBase64 = sourceImage.split(",")[1]
      const maskBase64 = maskImage ? maskImage.split(",")[1] : null

      const result = await editImage(sourceBase64, maskBase64, prompt)
      setResultImage(result.imageUrl)
    } catch (err: any) {
      setError(err.message || "画像編集に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  const clearMask = () => {
    setMaskImage(null)
    if (maskInputRef.current) {
      maskInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>画像編集</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium">元画像</div>
              <div className="h-[200px] relative border rounded-md overflow-hidden bg-muted/20">
                {sourceImage ? (
                  <img src={sourceImage || "/placeholder.svg"} alt="元画像" className="w-full h-full object-contain" />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    画像を選択してください
                  </div>
                )}
              </div>
              <Input
                ref={sourceInputRef}
                type="file"
                accept="image/*"
                onChange={handleSourceImageChange}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="font-medium flex justify-between items-center">
                <span>マスク画像 (オプション)</span>
                {maskImage && (
                  <Button variant="ghost" size="sm" onClick={clearMask}>
                    <Eraser className="h-4 w-4 mr-1" /> クリア
                  </Button>
                )}
              </div>
              <div className="h-[200px] relative border rounded-md overflow-hidden bg-muted/20">
                {maskImage ? (
                  <img
                    src={maskImage || "/placeholder.svg"}
                    alt="マスク画像"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    マスク画像を選択（オプション）
                  </div>
                )}
              </div>
              <Input
                ref={maskInputRef}
                type="file"
                accept="image/*"
                onChange={handleMaskImageChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">編集内容</div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例: 背景を夜空に変更して、星を追加してください"
              className="min-h-[80px] resize-y"
            />
          </div>

          <Button onClick={handleEditImage} disabled={isLoading || !sourceImage || !prompt.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 処理中...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> 画像を編集
              </>
            )}
          </Button>

          {error && <div className="text-destructive text-sm">{error}</div>}

          {resultImage && (
            <div className="space-y-2">
              <div className="font-medium">編集結果</div>
              <div className="border rounded-md overflow-hidden">
                <img src={resultImage || "/placeholder.svg"} alt="編集結果" className="w-full h-auto" />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => window.open(resultImage, "_blank")}>
                  新しいタブで開く
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
