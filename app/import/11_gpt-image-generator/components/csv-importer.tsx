"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { parseCSV, extractFullDataFromCSV, validateCSVFormat, type ParsedCSV, type ExtractedData } from "@/lib/csv-utils"
import { FileSpreadsheet, AlertCircle } from "lucide-react"

interface CSVImporterProps {
  open: boolean
  onClose: () => void
  onImport: (data: ExtractedData[]) => void
}

export function CSVImporter({ open, onClose, onImport }: CSVImporterProps) {
  const [csvText, setCsvText] = useState("")
  const [parsedCSV, setParsedCSV] = useState<ParsedCSV | null>(null)
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")
  const [previewData, setPreviewData] = useState<ExtractedData[]>([])

  const handleParse = () => {
    try {
      const parsed = parseCSV(csvText)
      
      // フォーマット検証
      const validation = validateCSVFormat(parsed)
      if (!validation.isValid) {
        setError(validation.message)
        return
      }
      
      if (validation.message) {
        setWarning(validation.message)
      } else {
        setWarning("")
      }
      
      setParsedCSV(parsed)
      setError("")
      
      // データを抽出
      const extractedData = extractFullDataFromCSV(parsed)
      setPreviewData(extractedData.slice(0, 5))
    } catch (e) {
      setError("CSVの解析に失敗しました")
      setParsedCSV(null)
    }
  }

  // 列選択機能は不要になったため削除

  const handleImport = () => {
    if (!parsedCSV) return
    
    const extractedData = extractFullDataFromCSV(parsedCSV)
    if (extractedData.length === 0) {
      setError("有効なデータがありません。各行には管理ナンバーまたはファイル名とプロンプトが必要です。")
      return
    }
    
    onImport(extractedData)
    handleClose()
  }

  const handleClose = () => {
    setCsvText("")
    setParsedCSV(null)
    setError("")
    setWarning("")
    setPreviewData([])
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
          {/* フォーマット説明 */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>CSVフォーマット（3列必須）:</strong>
              <div className="mt-2 font-mono text-sm">
                第1列: no (管理ナンバー)<br />
                第2列: ID (ファイル名)<br />
                第3列: Prompt_JP (プロンプト)
              </div>
            </AlertDescription>
          </Alert>

          {/* CSV入力エリア */}
          <div className="space-y-2">
            <Label>CSVデータを貼り付け</Label>
            <Textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="CSVデータをここに貼り付けてください...
例:
no,ID,Prompt_JP
01,beginner_organize-01,ミニマリスト・グラフィックレコーディングスタイル...
02,beginner_organize-02,友好的なAIロボットが毛糸玉をほどいている...
03,advanced_research-01,人物が複数の業界レポートに埋もれている..."
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

          {/* 警告表示 */}
          {warning && !error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          )}

          {/* プレビュー */}
          {parsedCSV && previewData.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>データプレビュー（最初の5件）</Label>
                <ScrollArea className="h-[200px] w-full rounded border p-3">
                  <div className="space-y-3">
                    {previewData.map((data, index) => (
                      <div key={index} className="border-b pb-2 last:border-0">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">管理No:</span>
                            <span className="ml-1 font-mono">{data.managementNo || '(なし)'}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ファイル名:</span>
                            <span className="ml-1 font-mono">{data.fileName || '(なし)'}</span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="text-muted-foreground">プロンプト:</span>
                          <span className="ml-1">{data.prompt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-sm text-muted-foreground">
                  合計 {extractFullDataFromCSV(parsedCSV).length} 件のデータをインポートします
                </p>
                
                {/* ヘッダー情報の表示 */}
                {parsedCSV.headers.length > 0 && (
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    <p className="font-medium">検出されたヘッダー:</p>
                    <p className="text-muted-foreground">{parsedCSV.headers.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            キャンセル
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!parsedCSV || previewData.length === 0}
          >
            インポート ({parsedCSV ? extractFullDataFromCSV(parsedCSV).length : 0}件)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}