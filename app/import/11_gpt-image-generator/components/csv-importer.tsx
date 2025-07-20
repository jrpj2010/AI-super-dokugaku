"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { parseCSV, extractPromptsFromCSV, type ParsedCSV } from "@/lib/csv-utils"
import { FileSpreadsheet, AlertCircle } from "lucide-react"

interface CSVImporterProps {
  open: boolean
  onClose: () => void
  onImport: (prompts: string[]) => void
}

export function CSVImporter({ open, onClose, onImport }: CSVImporterProps) {
  const [csvText, setCsvText] = useState("")
  const [parsedCSV, setParsedCSV] = useState<ParsedCSV | null>(null)
  const [selectedColumn, setSelectedColumn] = useState("0")
  const [error, setError] = useState("")
  const [previewPrompts, setPreviewPrompts] = useState<string[]>([])

  const handleParse = () => {
    try {
      const parsed = parseCSV(csvText)
      if (parsed.headers.length === 0) {
        setError("CSVデータが見つかりません")
        return
      }
      setParsedCSV(parsed)
      setError("")
      
      // 最初の列をデフォルト選択
      const prompts = extractPromptsFromCSV(parsed, 0)
      setPreviewPrompts(prompts.slice(0, 5))
    } catch (e) {
      setError("CSVの解析に失敗しました")
      setParsedCSV(null)
    }
  }

  const handleColumnSelect = (value: string) => {
    setSelectedColumn(value)
    if (parsedCSV) {
      const prompts = extractPromptsFromCSV(parsedCSV, parseInt(value))
      setPreviewPrompts(prompts.slice(0, 5))
    }
  }

  const handleImport = () => {
    if (!parsedCSV) return
    
    const prompts = extractPromptsFromCSV(parsedCSV, parseInt(selectedColumn))
    if (prompts.length === 0) {
      setError("選択した列にデータがありません")
      return
    }
    
    onImport(prompts)
    handleClose()
  }

  const handleClose = () => {
    setCsvText("")
    setParsedCSV(null)
    setSelectedColumn("0")
    setError("")
    setPreviewPrompts([])
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            CSV一括インポート
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* CSV入力エリア */}
          <div className="space-y-2">
            <Label>CSVデータを貼り付け</Label>
            <Textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="CSVデータをここに貼り付けてください...
例:
プロンプト,カテゴリ,説明
美しい夕焼け,風景,夕暮れ時の風景
かわいい猫,動物,猫の写真"
              className="min-h-[150px] font-mono text-sm"
            />
            <Button onClick={handleParse} disabled={!csvText.trim()}>
              CSVを解析
            </Button>
          </div>

          {/* エラー表示 */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* カラム選択 */}
          {parsedCSV && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>プロンプトとして使用する列を選択</Label>
                <RadioGroup value={selectedColumn} onValueChange={handleColumnSelect}>
                  {parsedCSV.headers.map((header, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value={index.toString()} id={`col-${index}`} />
                      <Label htmlFor={`col-${index}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">列 {index + 1}: {header || '(ヘッダーなし)'}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({parsedCSV.rows.filter(row => row[index]?.trim()).length}件のデータ)
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* プレビュー */}
              {previewPrompts.length > 0 && (
                <div className="space-y-2">
                  <Label>プレビュー（最初の5件）</Label>
                  <ScrollArea className="h-[120px] w-full rounded border p-3">
                    <div className="space-y-1">
                      {previewPrompts.map((prompt, index) => (
                        <div key={index} className="text-sm">
                          {index + 1}. {prompt}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <p className="text-sm text-muted-foreground">
                    合計 {extractPromptsFromCSV(parsedCSV, parseInt(selectedColumn)).length} 件のプロンプトをインポートします
                  </p>
                  
                  {/* ヘッダー情報の表示 */}
                  {parsedCSV.headers.length > 0 && (
                    <div className="mt-2 p-2 bg-muted rounded text-xs">
                      <p className="font-medium">検出されたカラム:</p>
                      <p className="text-muted-foreground">{parsedCSV.headers.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            キャンセル
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!parsedCSV || previewPrompts.length === 0}
          >
            インポート ({parsedCSV ? extractPromptsFromCSV(parsedCSV, parseInt(selectedColumn)).length : 0}件)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}