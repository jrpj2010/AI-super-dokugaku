"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Home, BookOpen, Wand2, FileText, HelpCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ManualPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "概要", icon: Home },
    { id: "setup", title: "初期設定", icon: BookOpen },
    { id: "usage", title: "使い方", icon: Wand2 },
    { id: "slides", title: "スライド説明", icon: FileText },
    { id: "troubleshooting", title: "トラブルシューティング", icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-light-canvas p-4 sm:p-8">
      {/* ヘッダー */}
      <header className="mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-noto-serif text-wine-red">操作マニュアル</h1>
            <p className="text-slate-600 mt-1">高度情報入力型 プレゼンテーション生成ツール v1.0.0</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="text-wine-red border-wine-red/50 hover:bg-wine-red/5">
              <Home className="mr-2" size={18} />
              ホームに戻る
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* サイドバー */}
        <nav className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-subtle p-4 sticky top-4">
            <h2 className="font-semibold text-wine-red mb-4">目次</h2>
            <ul className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                        activeSection === section.id
                          ? "bg-wine-red/10 text-wine-red font-semibold"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <Icon size={18} className="mr-2" />
                      {section.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* メインコンテンツ */}
        <main className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-subtle p-6">
            {/* 概要セクション */}
            {activeSection === "overview" && (
              <section>
                <h2 className="text-2xl font-bold text-wine-red mb-4">概要</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg mb-4">
                    本ツールは、AI（Google Gemini）を活用して、明治モダンスタイルの美しいプレゼンテーションを自動生成するWebアプリケーションです。
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">主な特徴</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>🎨 <strong>明治モダンスタイル</strong>: 格調高い文語調と現代的なデザインの融合</li>
                    <li>🤖 <strong>AI自動生成</strong>: Google Gemini 2.5による高度な内容生成</li>
                    <li>📊 <strong>グラフ自動生成</strong>: データに基づく視覚的な表現</li>
                    <li>🎯 <strong>4スライド構成</strong>: 表紙・アジェンダ・詳細・謝辞の完全パッケージ</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">対象ユーザー</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>営業担当者</li>
                    <li>コンサルタント</li>
                    <li>プロジェクトマネージャー</li>
                    <li>経営企画担当者</li>
                  </ul>
                </div>
              </section>
            )}

            {/* 初期設定セクション */}
            {activeSection === "setup" && (
              <section>
                <h2 className="text-2xl font-bold text-wine-red mb-4">初期設定</h2>
                <div className="prose prose-slate max-w-none">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="flex items-start">
                      <AlertTriangle className="text-yellow-600 mr-2 flex-shrink-0 mt-1" size={20} />
                      <span>
                        本ツールを使用するには、Google Gemini APIキーが必要です。
                        管理者にお問い合わせください。
                      </span>
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">推奨環境</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>ブラウザ: Chrome, Edge, Safari の最新版</li>
                    <li>画面解像度: 1280×720以上</li>
                    <li>インターネット接続: 必須</li>
                  </ul>
                </div>
              </section>
            )}

            {/* 使い方セクション */}
            {activeSection === "usage" && (
              <section>
                <h2 className="text-2xl font-bold text-wine-red mb-4">使い方</h2>
                
                <div className="space-y-8">
                  {/* ステップ1 */}
                  <div className="border-l-4 border-wine-red pl-4">
                    <h3 className="text-xl font-semibold mb-3">ステップ1: 基本情報の入力</h3>
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-2">プレゼンテーションタイトル</h4>
                      <p className="text-sm text-slate-600 mb-2">プレゼンテーションの主題を入力します。</p>
                      <div className="bg-white border rounded p-2 text-sm font-mono">
                        例: 新規システム導入提案、DX推進プロジェクト、業務改善提案
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">AIモデル選択</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>標準モデル（推奨）</strong>: 
                          <span className="text-slate-600"> 高速でバランスの取れた生成</span>
                        </li>
                        <li>
                          <strong>高性能モデル</strong>: 
                          <span className="text-slate-600"> より詳細で高品質な内容（時間がかかる）</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* ステップ2 */}
                  <div className="border-l-4 border-wine-red pl-4">
                    <h3 className="text-xl font-semibold mb-3">ステップ2: 詳細情報の入力</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">A: 対象顧客について</h4>
                        <p className="text-sm text-slate-600 mb-2">提案先の企業や担当者の情報を詳しく記入します。</p>
                        <div className="bg-white border rounded p-3 text-sm">
                          <pre className="whitespace-pre-wrap font-sans">株式会社山田商事様
担当: 山田太郎様（営業部長）
業界: 製造業（自動車部品）
従業員数: 500名
年商: 50億円</pre>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">B: コンテキスト解説</h4>
                        <p className="text-sm text-slate-600 mb-2">C欄の情報ソースの背景や関連性を説明します。</p>
                        <div className="bg-white border rounded p-3 text-sm">
                          <pre className="whitespace-pre-wrap font-sans">C1は現行システムの課題分析レポートです。
C2は競合他社の導入事例調査結果です。
これらを基に、貴社に最適なシステム導入案を提案します。</pre>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">C: 情報ソース</h4>
                        <p className="text-sm text-slate-600 mb-2">複数の情報ソースを追加できます。</p>
                        <div className="bg-white border rounded p-3 text-sm space-y-2">
                          <div>
                            <strong>ラベル:</strong> 現状分析レポート
                          </div>
                          <div>
                            <strong>内容:</strong>
                            <pre className="whitespace-pre-wrap font-sans mt-1">現行システムは10年前に構築されたオンプレミス環境。
年間運用コストは5000万円で、年々10%ずつ増加傾向。
可用性は99%に留まり、年間3.6日のダウンタイムが発生。</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ステップ3 */}
                  <div className="border-l-4 border-wine-red pl-4">
                    <h3 className="text-xl font-semibold mb-3">ステップ3: プレゼンテーション生成</h3>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>すべての必要事項を入力</li>
                      <li>「プレゼンテーションを生成」ボタンをクリック</li>
                      <li>5-15秒程度待機（生成中は「生成中...」と表示）</li>
                      <li>自動的にプレゼンテーション画面に遷移</li>
                    </ol>
                  </div>

                  {/* ステップ4 */}
                  <div className="border-l-4 border-wine-red pl-4">
                    <h3 className="text-xl font-semibold mb-3">ステップ4: プレゼンテーション操作</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">ナビゲーション</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• 前へ/次へボタンでスライド移動</li>
                          <li>• スライド番号で現在位置を確認</li>
                          <li>• スムーズなアニメーション</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">その他の機能</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• 印刷ボタンでPDF化</li>
                          <li>• ダウンロード（今後実装予定）</li>
                          <li>• 全画面表示（F11キー）</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* スライド説明セクション */}
            {activeSection === "slides" && (
              <section>
                <h2 className="text-2xl font-bold text-wine-red mb-4">スライド説明</h2>
                
                <div className="space-y-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-wine-red text-white p-3">
                      <h3 className="font-semibold">1. 表紙スライド</h3>
                    </div>
                    <div className="p-4">
                      <p className="mb-3">プレゼンテーションの第一印象を決める重要なスライドです。</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>メインタイトル・サブタイトル</li>
                        <li>3つの主要指標（KPI）</li>
                        <li>文書種別・機密レベル表示</li>
                        <li>作成者・日付情報</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-wine-red text-white p-3">
                      <h3 className="font-semibold">2. アジェンダスライド</h3>
                    </div>
                    <div className="p-4">
                      <p className="mb-3">プレゼンテーションの流れを示します。</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>議事次第（3項目）</li>
                        <li>重要な洞察（1項目）</li>
                        <li>番号付きの構造的な表示</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-wine-red text-white p-3">
                      <h3 className="font-semibold">3. 詳細スライド</h3>
                    </div>
                    <div className="p-4">
                      <p className="mb-3">データと分析結果を視覚的に表現します。</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Chart.jsによるグラフ表示</li>
                        <li>分析結果の要約</li>
                        <li>重要なインサイト</li>
                        <li>データに基づく説得力</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-wine-red text-white p-3">
                      <h3 className="font-semibold">4. 謝辞スライド</h3>
                    </div>
                    <div className="p-4">
                      <p className="mb-3">プレゼンテーションを締めくくる重要なスライドです。</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>感謝のメッセージ</li>
                        <li>次のステップの提示</li>
                        <li>連絡先情報</li>
                        <li>絵文字を使った親しみやすい表現</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* トラブルシューティングセクション */}
            {activeSection === "troubleshooting" && (
              <section>
                <h2 className="text-2xl font-bold text-wine-red mb-4">トラブルシューティング</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-red-700 mb-2">
                      エラー: 「APIキーが設定されていません」
                    </h3>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-sm mb-2">対処法:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>管理者にAPIキーの設定を依頼してください</li>
                        <li>環境変数が正しく設定されているか確認</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-red-700 mb-2">
                      エラー: 「プレゼンテーションの生成に失敗しました」
                    </h3>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-sm mb-2">確認事項:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>インターネット接続を確認</li>
                        <li>入力内容が極端に長くないか確認（各欄1000文字以内推奨）</li>
                        <li>特殊文字や絵文字を含んでいないか確認</li>
                        <li>しばらく時間をおいて再試行</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-yellow-700 mb-2">
                      グラフが表示されない
                    </h3>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm mb-2">対処法:</p>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>ブラウザのJavaScriptが有効か確認</li>
                        <li>ブラウザを最新版にアップデート</li>
                        <li>別のブラウザで試す</li>
                        <li>ページを再読み込み（Ctrl+F5）</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-blue-700 mb-2">
                      よくある質問
                    </h3>
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="font-semibold text-sm">Q: 生成にどのくらい時間がかかりますか？</p>
                        <p className="text-sm text-slate-600">A: 通常5-15秒程度です。高性能モデルの場合は最大30秒かかることがあります。</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Q: 一度生成したプレゼンテーションは保存されますか？</p>
                        <p className="text-sm text-slate-600">A: ブラウザのローカルストレージに一時保存されますが、ブラウザを閉じると削除されます。</p>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Q: PDFで保存するには？</p>
                        <p className="text-sm text-slate-600">A: 印刷ボタンをクリックし、プリンターとして「PDFとして保存」を選択してください。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}