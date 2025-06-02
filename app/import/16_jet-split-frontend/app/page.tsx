"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Download, Loader2, CheckCircle, AlertCircle, Play, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChapterData {
  sho: number
  chapter: number
  title: string
  start: string
  end: string
}

type ProcessingState = "idle" | "uploading" | "processing" | "completed" | "error"

// サンプルSRTファイル内容
const SAMPLE_SRT_CONTENT = `1
00:00:00,000 --> 00:02:30,000
皆さん、こんにちは。今日はWebマーケティングの基礎について学んでいきましょう。

2
00:02:30,000 --> 00:05:15,000
まず最初に、デジタルマーケティングの基本概念について説明します。

3
00:05:15,000 --> 00:08:45,000
次に、実際の成功事例を見ながら、効果的な戦略について考えてみましょう。

4
00:08:45,000 --> 00:12:20,000
ここからは応用編として、SNSマーケティングの最新トレンドを解説します。

5
00:12:20,000 --> 00:15:30,000
実際のケーススタディを通じて、ROI向上の具体的な方法を学びます。

6
00:15:30,000 --> 00:18:00,000
最後に、今後のマーケティング戦略と展望についてまとめていきます。`

// より豊富なサンプルチャプターデータ
const SAMPLE_CHAPTERS: ChapterData[] = [
  {
    sho: 1,
    chapter: 1,
    title: "Webマーケティング入門",
    start: "00:00:00",
    end: "00:02:30",
  },
  {
    sho: 1,
    chapter: 2,
    title: "デジタルマーケティングの基本概念",
    start: "00:02:30",
    end: "00:05:15",
  },
  {
    sho: 1,
    chapter: 3,
    title: "成功事例から学ぶ効果的戦略",
    start: "00:05:15",
    end: "00:08:45",
  },
  {
    sho: 2,
    chapter: 4,
    title: "SNSマーケティングの最新トレンド",
    start: "00:08:45",
    end: "00:12:20",
  },
  {
    sho: 2,
    chapter: 5,
    title: "ROI向上のケーススタディ",
    start: "00:12:20",
    end: "00:15:30",
  },
  {
    sho: 2,
    chapter: 6,
    title: "データ分析による効果測定",
    start: "00:15:30",
    end: "00:18:45",
  },
  {
    sho: 3,
    chapter: 7,
    title: "コンテンツマーケティング戦略",
    start: "00:18:45",
    end: "00:22:10",
  },
  {
    sho: 3,
    chapter: 8,
    title: "SEO対策の実践テクニック",
    start: "00:22:10",
    end: "00:25:30",
  },
  {
    sho: 3,
    chapter: 9,
    title: "今後の展望とまとめ",
    start: "00:25:30",
    end: "00:28:00",
  },
]

export default function JetSplitApp() {
  const [file, setFile] = useState<File | null>(null)
  const [chapters, setChapters] = useState<ChapterData[]>([])
  const [processingState, setProcessingState] = useState<ProcessingState>("idle")
  const [error, setError] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const { toast } = useToast()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.name.endsWith(".srt")) {
      setFile(droppedFile)
      setError("")
      setIsDemo(false)
    } else {
      setError("SRTファイルを選択してください")
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError("")
      setIsDemo(false)
    }
  }

  const loadSampleData = () => {
    // サンプルSRTファイルをシミュレート
    const sampleFile = new File([SAMPLE_SRT_CONTENT], "sample_webmarketing_seminar.srt", {
      type: "text/plain",
    })
    setFile(sampleFile)
    setError("")
    setIsDemo(true)

    toast({
      title: "サンプルデータを読み込みました",
      description: "Webマーケティングセミナーのサンプルファイルです",
    })
  }

  const processFile = async () => {
    if (!file) return

    setProcessingState("uploading")
    setError("")

    try {
      // アップロード段階のシミュレーション
      await new Promise((resolve) => setTimeout(resolve, 800))

      setProcessingState("processing")

      if (isDemo) {
        // デモモードの場合はサンプルデータを使用
        await new Promise((resolve) => setTimeout(resolve, 2000)) // Gemini処理のシミュレーション
        setChapters(SAMPLE_CHAPTERS)
      } else {
        // 実際のAPI呼び出し
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/generate-batch", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`サーバーエラー: ${response.status}`)
        }

        const result = await response.json()
        setChapters(result.chapters || [])
      }

      setProcessingState("completed")

      toast({
        title: "処理完了",
        description: `${chapters.length || SAMPLE_CHAPTERS.length}個のチャプターが抽出されました`,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "処理中にエラーが発生しました")
      setProcessingState("error")
      toast({
        title: "エラー",
        description: "ファイルの処理に失敗しました",
        variant: "destructive",
      })
    }
  }

  const downloadExcel = async () => {
    try {
      if (isDemo) {
        // デモモードの場合はクライアントサイドで生成
        const csvContent = [
          "sho,chapter,title,start,end",
          ...chapters.map((c) => `${c.sho},${c.chapter},"${c.title}",${c.start},${c.end}`),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "application/vnd.ms-excel" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "webmarketing_chapters.xlsx"
        a.click()
        window.URL.revokeObjectURL(url)

        toast({
          title: "ダウンロード完了",
          description: "Excelファイルをダウンロードしました",
        })
        return
      }

      const response = await fetch("/api/download/excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapters }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "chapters.xlsx"
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (err) {
      toast({
        title: "ダウンロードエラー",
        description: "Excelファイルのダウンロードに失敗しました",
        variant: "destructive",
      })
    }
  }

  const downloadCSV = async () => {
    try {
      const csvContent = [
        "sho,chapter,title,start,end",
        ...chapters.map((c) => `${c.sho},${c.chapter},"${c.title}",${c.start},${c.end}`),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = isDemo ? "webmarketing_chapters.csv" : "chapters.csv"
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "ダウンロード完了",
        description: "CSVファイルをダウンロードしました",
      })
    } catch (err) {
      toast({
        title: "ダウンロードエラー",
        description: "CSVファイルのダウンロードに失敗しました",
        variant: "destructive",
      })
    }
  }

  const downloadBatchZip = async () => {
    try {
      if (isDemo) {
        // デモ用のバッチファイル内容を生成
        const shellScript = generateDemoShellScript(chapters)
        const readmeContent = generateDemoReadme()

        // シンプルなZIP風のテキストファイルとしてダウンロード
        const zipContent = `=== ジェットスプリット バッチファイル ===

=== jet_split.sh ===
${shellScript}

=== README.md ===
${readmeContent}

=== chapters.csv ===
sho,chapter,title,start,end
${chapters.map((c) => `${c.sho},${c.chapter},"${c.title}",${c.start},${c.end}`).join("\n")}
`

        const blob = new Blob([zipContent], { type: "text/plain" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "jet_split_demo_batch.txt"
        a.click()
        window.URL.revokeObjectURL(url)

        toast({
          title: "デモバッチファイルをダウンロード",
          description: "実際の環境では.zipファイルが生成されます",
        })
        return
      }

      const response = await fetch("/api/download/batch-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapters }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "jet_split_batch.zip"
        a.click()
        window.URL.revokeObjectURL(url)

        toast({
          title: "ダウンロード完了",
          description:
            "バッチファイルをダウンロードしました。動画ファイルと同じフォルダに解凍してjet_split.shを実行してください。",
        })
      }
    } catch (err) {
      toast({
        title: "ダウンロードエラー",
        description: "バッチZIPファイルのダウンロードに失敗しました",
        variant: "destructive",
      })
    }
  }

  const resetDemo = () => {
    setFile(null)
    setChapters([])
    setProcessingState("idle")
    setError("")
    setIsDemo(false)

    toast({
      title: "リセット完了",
      description: "新しいファイルをアップロードできます",
    })
  }

  const getStatusIcon = () => {
    switch (processingState) {
      case "uploading":
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (processingState) {
      case "uploading":
        return "アップロード中..."
      case "processing":
        return "Gemini AIで章・チャプターを抽出中..."
      case "completed":
        return "処理完了"
      case "error":
        return "エラーが発生しました"
      default:
        return ""
    }
  }

  const generateDemoShellScript = (chapters: ChapterData[]) => {
    return `#!/bin/bash

# ジェットスプリット - 動画自動分割スクリプト (デモ版)
# 使用方法: ./jet_split.sh webmarketing_seminar.mp4

if [ $# -eq 0 ]; then
    echo "使用方法: ./jet_split.sh 動画ファイル名.mp4"
    exit 1
fi

IN="$1"

if [ ! -f "$IN" ]; then
    echo "エラー: ファイル '$IN' が見つかりません"
    exit 1
fi

echo "🚀 ジェットスプリット - 動画分割を開始します"
echo "📹 入力ファイル: $IN"
echo "📊 分割数: ${chapters.length}個のチャプター"
echo ""

${chapters
  .map((c, index) => {
    const filename = `${c.sho}_${String(c.chapter).padStart(3, "0")}_${slugify(c.title)}.mp4`
    return `echo "[${index + 1}/${chapters.length}] 📝 ${filename} を作成中..."
ffmpeg -y -i "$IN" -ss ${c.start} -to ${c.end} -c copy "${filename}"
echo "✅ ${filename} 完了"`
  })
  .join("\n\n")}

echo ""
echo "🎉 分割完了！${chapters.length}個のファイルが作成されました。"
echo ""
echo "📁 作成されたファイル:"
${chapters
  .map((c) => {
    const filename = `${c.sho}_${String(c.chapter).padStart(3, "0")}_${slugify(c.title)}.mp4`
    return `echo "   ${c.sho}章-${c.chapter}: ${filename}"`
  })
  .join("\n")}
echo ""
echo "🎬 動画分割が完了しました！各チャプターをご活用ください。"
`
  }

  const generateDemoReadme = () => {
    return `# 🚀 ジェットスプリット - Webマーケティングセミナー分割バッチ

このバッチファイルは、Webマーケティングセミナー動画を${chapters.length}個のチャプターに自動分割します。

## 📋 チャプター構成

### 第1章: マーケティング基礎
- チャプター1: Webマーケティング入門
- チャプター2: デジタルマーケティングの基本概念  
- チャプター3: 成功事例から学ぶ効果的戦略

### 第2章: 実践テクニック
- チャプター4: SNSマーケティングの最新トレンド
- チャプター5: ROI向上のケーススタディ
- チャプター6: データ分析による効果測定

### 第3章: 応用・展望
- チャプター7: コンテンツマーケティング戦略
- チャプター8: SEO対策の実践テクニック
- チャプター9: 今後の展望とまとめ

## 🛠 使用方法

1. 動画ファイル（webmarketing_seminar.mp4）と同じフォルダにこのバッチを配置
2. ターミナルを開き、以下を実行：

\`\`\`bash
chmod +x jet_split.sh
./jet_split.sh webmarketing_seminar.mp4
\`\`\`

## ⚡ 特徴

- **無劣化分割**: FFmpegの-c copyオプションで画質劣化なし
- **自動命名**: {章}_{チャプター番号}_{タイトル}.mp4 形式
- **高速処理**: 90分動画を1分以内で分割完了

## 📁 出力ファイル例

- 1_001_webmarketing-nyumon.mp4
- 1_002_digital-marketing-no-kihon-gainen.mp4
- 2_004_sns-marketing-no-saishin-trend.mp4
- ...

## 💡 Tips

- 元の動画ファイルは変更されません
- 分割されたファイルは同じフォルダに保存されます
- 処理時間は動画サイズに依存します

---
Generated by ジェットスプリット v1.0
`
  }

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">ジェットスプリット</h1>
          <p className="text-lg text-gray-600">セミナー動画の自動章・チャプター分割システム</p>
          {isDemo && (
            <Badge variant="secondary" className="text-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              デモモード
            </Badge>
          )}
        </div>

        {/* デモ用クイックスタート */}
        <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Play className="h-5 w-5" />
              クイックスタート - デモを体験
            </CardTitle>
            <CardDescription>
              サンプルデータで機能をすぐに体験できます（実際のファイルアップロード不要）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={loadSampleData} className="flex-1" variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                サンプルデータを読み込み
              </Button>
              {(file || chapters.length > 0) && (
                <Button onClick={resetDemo} variant="ghost" className="flex-1">
                  リセット
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ステップ1: ファイルアップロード */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              ステップ1: SRTファイルをアップロード
            </CardTitle>
            <CardDescription>
              Whisperで生成したSRTファイルをドラッグ&ドロップまたはクリックして選択してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? "border-blue-500 bg-blue-50"
                  : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-2">
                  <FileText className="h-12 w-12 mx-auto text-green-500" />
                  <p className="text-lg font-medium text-green-700">{file.name}</p>
                  <p className="text-sm text-gray-500">ファイルサイズ: {(file.size / 1024).toFixed(1)} KB</p>
                  {isDemo && (
                    <Badge variant="secondary" className="mt-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      サンプルファイル
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-gray-400" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">SRTファイルをここにドロップ</p>
                    <p className="text-sm text-gray-500">または</p>
                  </div>
                  <label className="inline-block">
                    <input type="file" accept=".srt" onChange={handleFileSelect} className="hidden" />
                    <Button variant="outline" className="cursor-pointer">
                      ファイルを選択
                    </Button>
                  </label>
                </div>
              )}
            </div>

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {file && processingState === "idle" && (
              <div className="mt-4 text-center">
                <Button onClick={processFile} size="lg">
                  {isDemo ? "サンプルデータで" : ""}章・チャプターを抽出
                </Button>
              </div>
            )}

            {processingState !== "idle" && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {getStatusIcon()}
                <span className="text-sm font-medium">{getStatusText()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ステップ2: プレビュー */}
        {chapters.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                ステップ2: 抽出結果プレビュー
              </CardTitle>
              <CardDescription>
                抽出された章・チャプター情報を確認してください
                {isDemo && " (サンプル: Webマーケティングセミナー)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  総チャプター数: {chapters.length}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  章数: {Math.max(...chapters.map((c) => c.sho))}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  総再生時間: {chapters[chapters.length - 1]?.end || "28:00"}
                </Badge>
                {isDemo && (
                  <Badge className="text-sm bg-blue-100 text-blue-700">
                    <Sparkles className="h-3 w-3 mr-1" />
                    デモデータ
                  </Badge>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">章</TableHead>
                      <TableHead className="w-20">チャプター</TableHead>
                      <TableHead>タイトル</TableHead>
                      <TableHead className="w-24">開始時間</TableHead>
                      <TableHead className="w-24">終了時間</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chapters.map((chapter, index) => (
                      <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50/50" : ""}>
                        <TableCell className="font-medium">
                          <Badge variant="outline">{chapter.sho}</Badge>
                        </TableCell>
                        <TableCell>{chapter.chapter}</TableCell>
                        <TableCell className="font-medium">{chapter.title}</TableCell>
                        <TableCell className="font-mono text-sm">{chapter.start}</TableCell>
                        <TableCell className="font-mono text-sm">{chapter.end}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ステップ3: ダウンロード */}
        {chapters.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                ステップ3: ファイルダウンロード
              </CardTitle>
              <CardDescription>
                必要なファイル形式を選択してダウンロードしてください
                {isDemo && " (デモ版では簡易ファイルが生成されます)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={downloadExcel} variant="outline" className="h-24 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="font-medium">Excel形式</span>
                  <span className="text-xs text-gray-500">Numbers/Excel対応</span>
                </Button>

                <Button onClick={downloadCSV} variant="outline" className="h-24 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="font-medium">CSV形式</span>
                  <span className="text-xs text-gray-500">汎用データ形式</span>
                </Button>

                <Button onClick={downloadBatchZip} className="h-24 flex-col gap-2">
                  <Download className="h-6 w-6" />
                  <span className="font-medium">バッチZIP</span>
                  <span className="text-xs text-white/80">分割実行用</span>
                </Button>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>バッチZIPの使用方法:</strong>
                  <br />
                  1. 動画ファイルと同じフォルダにZIPを解凍
                  <br />
                  2. ターミナルで <code className="bg-gray-100 px-1 rounded">./jet_split.sh 動画ファイル名.mp4</code>{" "}
                  を実行
                  <br />
                  3. 自動的に{chapters.length}個のチャプターに分割されます
                  {isDemo && (
                    <>
                      <br />
                      <br />
                      <Badge variant="secondary" className="text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        デモモードでは実際のZIPファイルの代わりにテキストファイルがダウンロードされます
                      </Badge>
                    </>
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
