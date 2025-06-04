'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Sparkles, Zap, Target } from 'lucide-react'

export default function Home() {
  const [input, setInput] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhancedPrompt, setEnhancedPrompt] = useState('')

  const handleEnhance = async () => {
    if (!input.trim()) return
    
    setIsEnhancing(true)
    // TODO: 実際のAPI呼び出しに置き換える
    setTimeout(() => {
      setEnhancedPrompt(`【強化されたプロンプト】\n\n役割: あなたは経験豊富なビジネスコンサルタントです。\n\n背景: ${input}\n\n具体的な指示:\n1. 過去の類似事例を分析\n2. 現在の課題を3つ特定\n3. 今後1年間のアクションプランを提示\n\n出力形式:\n- 要約（3行）\n- 詳細分析\n- アクションプラン（優先順位付き）`)
      setIsEnhancing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* ヘッダー */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            思考OS X,Y,Z
          </h1>
          <Button variant="outline">ログイン</Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            AIと話すのが苦手でも大丈夫。
          </h2>
          <p className="text-xl text-muted-foreground">
            あなたの一言を、プロ級のプロンプトに。
          </p>
        </div>

        {/* メインカード */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>プロンプト強化</CardTitle>
            <CardDescription>
              思いついたことを入力するだけで、TANREN 3Dメソッドが自動的に強化します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 入力エリア */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                あなたの考えを入力してください
              </label>
              <Textarea
                placeholder="例：売上を上げたい、チームのモチベーションを高めたい..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] text-lg"
              />
              <div className="text-right text-sm text-muted-foreground">
                {input.length} / 200文字
              </div>
            </div>

            {/* 強化ボタン */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleEnhance}
                disabled={!input.trim() || isEnhancing}
                className="px-8"
                variant="gradient"
              >
                {isEnhancing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    3D強化中...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    3D強化する
                  </>
                )}
              </Button>
            </div>

            {/* 強化結果 */}
            {enhancedPrompt && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  強化されたプロンプト
                </h3>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {enhancedPrompt}
                  </pre>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    コピー
                  </Button>
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                  <Button size="sm">
                    AIで実行
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 3つのステップ */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <CardTitle className="text-lg">思いついたことを入力</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                難しく考える必要はありません。普段の言葉で大丈夫です。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <CardTitle className="text-lg">AIが自動で3D強化</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                X軸（深度）、Y軸（時間）、Z軸（レベル）で多角的に強化します。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <CardTitle className="text-lg">プロ級のプロンプト完成</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                ChatGPT、Claude、Geminiなど、どのAIでも使える高品質なプロンプトが完成。
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}