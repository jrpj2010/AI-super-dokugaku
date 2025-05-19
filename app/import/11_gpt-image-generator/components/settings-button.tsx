"use client"

import { useState } from "react"
import { useImageStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Settings } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsButton() {
  const {
    concurrentLimit,
    setConcurrentLimit,
    imageQuality,
    setImageQuality,
    imageSize,
    setImageSize,
    imagesPerPrompt,
    setImagesPerPrompt,
    openaiApiKey,
    setOpenaiApiKey,
  } = useImageStore()
  const [open, setOpen] = useState(false)
  const [tempLimit, setTempLimit] = useState(concurrentLimit || 4)
  const [tempQuality, setTempQuality] = useState<"auto" | "low" | "medium" | "high">(imageQuality || "auto")
  const [tempSize, setTempSize] = useState<"auto" | "1024x1024" | "1536x1024" | "1024x1536">(imageSize || "auto")
  const [tempImagesPerPrompt, setTempImagesPerPrompt] = useState(imagesPerPrompt || 1)
  const [tempApiKey, setTempApiKey] = useState(openaiApiKey || "")

  const handleSave = () => {
    setConcurrentLimit(tempLimit)
    setImageQuality(tempQuality)
    setImageSize(tempSize)
    setImagesPerPrompt(tempImagesPerPrompt)
    setOpenaiApiKey(tempApiKey)
    setOpen(false)
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)} className="relative z-50">
        <Settings className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] z-[100] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>設定</DialogTitle>
            <DialogDescription>アプリケーションの設定を変更します</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] overflow-y-auto px-1">
            <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenAI API キー</Label>
              <Input
                id="api-key"
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="sk-..."
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="concurrent-limit">同時実行数: {tempLimit}</Label>
              </div>
              <Slider
                id="concurrent-limit"
                min={1}
                max={10}
                step={1}
                value={[tempLimit]}
                onValueChange={(value) => setTempLimit(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="images-per-prompt">同時画像生成数: {tempImagesPerPrompt}</Label>
              </div>
              <Slider
                id="images-per-prompt"
                min={1}
                max={4}
                step={1}
                value={[tempImagesPerPrompt]}
                onValueChange={(value) => setTempImagesPerPrompt(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>4</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>画像品質</Label>
              <RadioGroup value={tempQuality} onValueChange={setTempQuality} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="quality-auto" />
                  <Label htmlFor="quality-auto">自動選択 (推奨)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="quality-low" />
                  <Label htmlFor="quality-low">低品質 (高速・低コスト)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="quality-medium" />
                  <Label htmlFor="quality-medium">中品質</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="quality-high" />
                  <Label htmlFor="quality-high">高品質 (高コスト)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="image-size">画像サイズ</Label>
              <div className="relative">
                <Select value={tempSize} onValueChange={setTempSize} modal={false}>
                  <SelectTrigger id="image-size">
                    <SelectValue placeholder="画像サイズを選択" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned" className="z-[10000]">
                    <SelectItem value="auto">auto (自動選択)</SelectItem>
                    <SelectItem value="1024x1024">1024x1024 (正方形)</SelectItem>
                    <SelectItem value="1536x1024">1536x1024 (横長)</SelectItem>
                    <SelectItem value="1024x1536">1024x1536 (縦長)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
