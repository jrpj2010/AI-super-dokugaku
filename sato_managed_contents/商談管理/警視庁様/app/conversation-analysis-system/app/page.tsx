import { Settings, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">3D</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">思考3DXYZ分析</h1>
              <p className="text-sm text-slate-500">コミュニケーション戦略分析ツール</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">設定</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* サイドバー */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
              <h2 className="text-white font-bold text-lg">トーク分析ナビ</h2>
              <p className="text-blue-100 text-sm mt-1">会話の深層を可視化</p>
            </div>

            <div className="p-4 border-b border-slate-200">
              <h3 className="font-medium text-slate-700 mb-3 flex items-center">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center mr-2 text-xs">
                  1
                </span>
                会話テーマ一覧
              </h3>
              <div className="text-sm text-slate-500 pl-7 italic">スクリプト分析待ち...</div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-slate-700 mb-3">XYZタグ凡例</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-600 mb-2">X軸 (思考の型)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-500 hover:bg-teal-600">超具体化</Badge>
                      <span className="text-xs text-slate-600">具体的な事例</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500 hover:bg-purple-600">超抽象化</Badge>
                      <span className="text-xs text-slate-600">概念・全体像</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 hover:bg-green-700">超構造化</Badge>
                      <span className="text-xs text-slate-600">仕組み・体系</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-600 mb-2">Y軸 (時間軸)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-500 hover:bg-orange-600">過去</Badge>
                      <span className="text-xs text-slate-600">経験・歴史</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 hover:bg-green-700">現代</Badge>
                      <span className="text-xs text-slate-600">現状・課題</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600 hover:bg-blue-700">未来</Badge>
                      <span className="text-xs text-slate-600">予測・展望</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-600 mb-2">Z軸 (知識レベル)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-pink-500 hover:bg-pink-600">初級</Badge>
                      <span className="text-xs text-slate-600">基礎知識</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500 hover:bg-amber-600">中級</Badge>
                      <span className="text-xs text-slate-600">応用知識</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-600 hover:bg-slate-700">上級</Badge>
                      <span className="text-xs text-slate-600">専門知識</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-grow">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">会話分析＆フィードバック</h2>
              <p className="text-slate-500 mb-6">思考3DXYZメソッドによるコミュニケーション戦略分析</p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-700 flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 inline-flex items-center justify-center text-xs">
                        1
                      </span>
                      トークスクリプト入力
                    </h3>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <Textarea
                      className="min-h-[150px] bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="会話内容をタイムスタンプ付きで入力してください。例: [01:01:21.338] 話者A: こんにちは"
                    />
                    <div className="mt-4 flex justify-end">
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2">
                        <Search className="h-4 w-4" />
                        分析実行
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                <span>分析結果</span>
                <Badge variant="outline" className="text-slate-500 font-normal">
                  待機中
                </Badge>
              </h2>

              <div className="bg-slate-50 rounded-lg p-8 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <ChevronRight className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">分析を開始しましょう</h3>
                <p className="text-slate-500 max-w-md">
                  トークスクリプトを入力して「分析実行」ボタンをクリックすると、思考3DXYZメソッドによる分析結果が表示されます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 text-slate-300 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2024 AI Conversation Analysis Project</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs px-3 py-1 rounded-full bg-slate-700">API準備完了</div>
              <div className="text-xs px-3 py-1 rounded-full bg-slate-700">モデル: gemini-2.5-flash-preview-04-17</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
