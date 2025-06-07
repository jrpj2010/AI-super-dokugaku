"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { PlusCircle, XCircle, Loader2, Wand2, HelpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast" // shadcn/uiのtoastを想定
import Link from "next/link"

interface InfoSource {
  id: string
  label: string
  content: string
}

type GeminiModel = "gemini-2.5-pro-preview-05-06" | "gemini-2.5-flash-preview-05-20"

export default function HomePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [customerInfo, setCustomerInfo] = useState("")
  const [contextInfo, setContextInfo] = useState("")
  const [infoSources, setInfoSources] = useState<InfoSource[]>([
    { id: "c1", label: "例: 打ち合わせ議事録", content: "" },
  ])
  const [presentationTitle, setPresentationTitle] = useState("サンプルプレゼンテーション")
  const [selectedModel, setSelectedModel] = useState<GeminiModel>("gemini-2.5-flash-preview-05-20")
  const [isLoading, setIsLoading] = useState(false)

  const addInfoSource = () => {
    setInfoSources([
      ...infoSources,
      { id: `c${infoSources.length + 1}`, label: `情報ソース ${infoSources.length + 1}`, content: "" },
    ])
  }

  const removeInfoSource = (id: string) => {
    setInfoSources(infoSources.filter((source) => source.id !== id))
  }

  const handleInfoSourceChange = (id: string, field: "label" | "content", value: string) => {
    setInfoSources(infoSources.map((source) => (source.id === id ? { ...source, [field]: value } : source)))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-presentation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo,
          contextInfo,
          infoSources,
          presentationTitle,
          model: selectedModel,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "プレゼンテーションの生成に失敗しました。")
      }

      const presentationData = await response.json()

      // 生成されたデータをlocalStorageに保存して、次のページで読み込む
      localStorage.setItem("presentationData", JSON.stringify(presentationData.data))
      localStorage.setItem("presentationTitle", presentationTitle) // タイトルも念のため
      router.push("/presentation?generated=true")
    } catch (error: any) {
      console.error("Error generating presentation:", error)
      toast({
        title: "生成エラー",
        description: error.message || "プレゼンテーションの生成中にエラーが発生しました。",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-light-canvas p-4 sm:p-8 text-slate-800">
      <header className="mb-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold font-noto-serif text-wine-red">高度情報入力型 プレゼンテーション生成</h1>
          <p className="text-slate-600 mt-2">
            顧客情報、コンテキスト、関連情報を入力し、AIモデルを選択して最適なプレゼンテーションを生成します。
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 text-sm">
          <span className="text-slate-500">Version 1.0.0</span>
          <Link href="/manual" className="text-wine-red hover:text-wine-red/80 underline flex items-center">
            <HelpCircle size={16} className="mr-1" />
            操作マニュアル
          </Link>
        </div>
      </header>

      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <Label
            htmlFor="presentationTitle"
            className="text-lg font-semibold text-wine-red/90 block mb-2 font-noto-serif"
          >
            プレゼンテーションタイトル
          </Label>
          <Input
            id="presentationTitle"
            value={presentationTitle}
            onChange={(e) => setPresentationTitle(e.target.value)}
            placeholder="例: 新規事業提案"
            className="bg-light-canvas border-slate-300 text-slate-800 placeholder-slate-500 focus:border-wine-red focus:ring-wine-red/50"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <Label htmlFor="selectedModel" className="text-lg font-semibold text-wine-red/90 block mb-2 font-noto-serif">
            AIモデル選択
          </Label>
          <Select value={selectedModel} onValueChange={(value: GeminiModel) => setSelectedModel(value)}>
            <SelectTrigger className="w-full bg-light-canvas border-slate-300 text-slate-800 focus:border-wine-red focus:ring-wine-red/50">
              <SelectValue placeholder="モデルを選択してください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-2.5-flash-preview-05-20">標準: Gemini 2.5 Flash Preview (高速・バランス)</SelectItem>
              <SelectItem value="gemini-2.5-pro-preview-05-06">高性能: Gemini 2.5 Pro Preview (高品質・詳細)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-500 mt-1">
            高性能モデルはより詳細な内容を生成できますが、時間がかかる場合があります。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <Label htmlFor="customerInfo" className="text-lg font-semibold text-wine-red/90 block mb-2 font-noto-serif">
            A: 対象顧客について教えてください
          </Label>
          <Textarea
            id="customerInfo"
            value={customerInfo}
            onChange={(e) => setCustomerInfo(e.target.value)}
            placeholder="例: 株式会社X様、担当: 山田太郎様 (部長)、企業の基本情報、名刺情報など..."
            className="min-h-[100px] bg-light-canvas border-slate-300 text-slate-800 placeholder-slate-500 focus:border-wine-red focus:ring-wine-red/50"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <Label htmlFor="contextInfo" className="text-lg font-semibold text-wine-red/90 block mb-2 font-noto-serif">
            B: 入力情報(C群)のコンテキスト解説
          </Label>
          <Textarea
            id="contextInfo"
            value={contextInfo}
            onChange={(e) => setContextInfo(e.target.value)}
            placeholder="例: C1はX社との初回打ち合わせ議事録、C2は競合Y社の公開IR情報です。これらを基にX社への改善提案を作成します..."
            className="min-h-[100px] bg-light-canvas border-slate-300 text-slate-800 placeholder-slate-500 focus:border-wine-red focus:ring-wine-red/50"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-subtle">
          <h2 className="text-lg font-semibold text-wine-red/90 mb-4 font-noto-serif">
            C: プレゼンテーションの元となる情報
          </h2>
          {infoSources.map((source, index) => (
            <div key={source.id} className="mb-4 p-4 border border-slate-200 rounded-md bg-light-canvas/50">
              <div className="flex justify-between items-center mb-2">
                <Input
                  value={source.label}
                  onChange={(e) => handleInfoSourceChange(source.id, "label", e.target.value)}
                  placeholder={`情報ソース ${index + 1} のラベル`}
                  className="bg-white border-slate-300 text-slate-800 placeholder-slate-500 flex-grow mr-2 focus:border-wine-red focus:ring-wine-red/50"
                />
                {infoSources.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInfoSource(source.id)}
                    className="text-wine-red/70 hover:text-wine-red"
                  >
                    <XCircle size={20} />
                  </Button>
                )}
              </div>
              <Textarea
                value={source.content}
                onChange={(e) => handleInfoSourceChange(source.id, "content", e.target.value)}
                placeholder={`情報ソース ${index + 1} の内容を入力...`}
                className="min-h-[120px] bg-white border-slate-300 text-slate-800 placeholder-slate-500 focus:border-wine-red focus:ring-wine-red/50"
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addInfoSource}
            className="text-wine-red border-wine-red/50 hover:bg-wine-red/5 hover:text-wine-red hover:border-wine-red"
          >
            <PlusCircle size={18} className="mr-2" />
            情報ソースを追加
          </Button>
        </div>

        <div className="text-center pt-4">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-wine-red hover:bg-wine-red/90 text-white font-bold shadow-lg px-8 py-3 rounded-md min-w-[200px]"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
            {isLoading ? "生成中..." : "プレゼンテーションを生成"}
          </Button>
        </div>
      </div>
    </div>
  )
}
