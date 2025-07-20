"use client"

import { useState, useRef } from "react"
import { useImageStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Settings, Zap, Shield, Gauge, Rocket, Download, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useApiDebugStore } from "@/lib/debug-store"

export function SettingsButton() {
  const {
    concurrentLimit,
    setConcurrentLimit,
    dynamicConcurrency,
    setDynamicConcurrency,
    performanceMode,
    setPerformanceMode,
    imageQuality,
    setImageQuality,
    imageSize,
    setImageSize,
    imagesPerPrompt,
    setImagesPerPrompt,
    openaiApiKey,
    setOpenaiApiKey,
    exportSettings,
    importSettings,
  } = useImageStore()
  const { addMessage } = useApiDebugStore()
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tempLimit, setTempLimit] = useState(concurrentLimit || 20)
  const [tempDynamicConcurrency, setTempDynamicConcurrency] = useState(dynamicConcurrency ?? true)
  const [tempPerformanceMode, setTempPerformanceMode] = useState<"stable" | "balanced" | "turbo" | "extreme">(performanceMode || "turbo")
  const [tempQuality, setTempQuality] = useState<"auto" | "low" | "medium" | "high">(imageQuality || "auto")
  const [tempSize, setTempSize] = useState<"auto" | "1024x1024" | "1536x1024" | "1024x1536">(imageSize || "auto")
  const [tempImagesPerPrompt, setTempImagesPerPrompt] = useState(imagesPerPrompt || 1)
  const [tempApiKey, setTempApiKey] = useState(openaiApiKey || "")

  const handleSave = () => {
    setConcurrentLimit(tempLimit)
    setDynamicConcurrency(tempDynamicConcurrency)
    setPerformanceMode(tempPerformanceMode)
    setImageQuality(tempQuality)
    setImageSize(tempSize)
    setImagesPerPrompt(tempImagesPerPrompt)
    setOpenaiApiKey(tempApiKey)
    setOpen(false)
  }

  const handleExport = () => {
    try {
      const settingsJson = exportSettings()
      const blob = new Blob([settingsJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19)
      a.href = url
      a.download = `gpt-image-generator-settings_${timestamp}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      addMessage('✅ 設定をエクスポートしました')
    } catch (error) {
      addMessage('❌ 設定のエクスポートに失敗しました')
      console.error('Export error:', error)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      importSettings(text)
      
      // インポート後に現在の値を更新
      const state = useImageStore.getState()
      setTempLimit(state.concurrentLimit)
      setTempDynamicConcurrency(state.dynamicConcurrency)
      setTempPerformanceMode(state.performanceMode)
      setTempQuality(state.imageQuality)
      setTempSize(state.imageSize)
      setTempImagesPerPrompt(state.imagesPerPrompt)
      setTempApiKey(state.openaiApiKey)
      
      addMessage('✅ 設定をインポートしました')
    } catch (error) {
      addMessage('❌ 設定のインポートに失敗しました')
      console.error('Import error:', error)
    }
    
    // ファイル入力をリセット
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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

          {/* Import/Export buttons */}
          <div className="flex gap-2 pb-4 border-b">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              設定をエクスポート
            </Button>
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              設定をインポート
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>

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

            {/* パフォーマンスモード選択 */}
            <div className="space-y-3">
              <Label>パフォーマンスモード</Label>
              <RadioGroup value={tempPerformanceMode} onValueChange={(value) => {
                setTempPerformanceMode(value as any)
                // パフォーマンスモードに応じて並列数を自動調整
                // Tier 5の実際の制限に基づいて最適化
                const concurrencyMap = {
                  stable: 5,     // 安定動作優先（推奨）
                  balanced: 8,   // バランス型（Tier 5で安全な範囲）
                  turbo: 12,     // 高速モード（リスクあり）
                  extreme: 15    // 最大速度（レート制限ギリギリ）
                }
                setTempLimit(concurrencyMap[value as keyof typeof concurrencyMap])
              }} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="stable" id="mode-stable" />
                  <Label htmlFor="mode-stable" className="cursor-pointer flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <div>
                      <div className="font-medium">安定モード</div>
                      <div className="text-xs text-muted-foreground">5並列・エラー最小</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="balanced" id="mode-balanced" />
                  <Label htmlFor="mode-balanced" className="cursor-pointer flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    <div>
                      <div className="font-medium">バランス</div>
                      <div className="text-xs text-muted-foreground">8並列・Tier5推奨</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="turbo" id="mode-turbo" />
                  <Label htmlFor="mode-turbo" className="cursor-pointer flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <div>
                      <div className="font-medium">ターボ</div>
                      <div className="text-xs text-muted-foreground">12並列・高速</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-accent">
                  <RadioGroupItem value="extreme" id="mode-extreme" />
                  <Label htmlFor="mode-extreme" className="cursor-pointer flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    <div>
                      <div className="font-medium">エクストリーム</div>
                      <div className="text-xs text-muted-foreground">15並列・限界速度</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* 動的並列数調整 */}
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="dynamic-concurrency">動的並列数調整</Label>
                <p className="text-xs text-muted-foreground">エラー率に応じて自動調整</p>
              </div>
              <Switch
                id="dynamic-concurrency"
                checked={tempDynamicConcurrency}
                onCheckedChange={setTempDynamicConcurrency}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="concurrent-limit">同時実行数: {tempLimit}</Label>
              </div>
              <Slider
                id="concurrent-limit"
                min={1}
                max={20}
                step={1}
                value={[tempLimit]}
                onValueChange={(value) => setTempLimit(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 (最小)</span>
                <span>20 (Tier5上限)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Tier 5では8-12が推奨です。15以上はレート制限エラーが
                発生する可能性が高くなります。
              </p>
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
