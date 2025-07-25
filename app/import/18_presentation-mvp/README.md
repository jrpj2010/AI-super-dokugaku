# 高度情報入力型 プレゼンテーション生成ツール v1.0.0

## 概要

明治モダンスタイルの美しいプレゼンテーションを、AI（Google Gemini）を使って自動生成するWebアプリケーションです。顧客情報、コンテキスト、参考資料などの詳細な情報を入力することで、高品質なプレゼンテーション資料を瞬時に作成できます。

## 主な機能

- 🎨 **明治モダンスタイル**: 格調高い文語調と現代的なデザインの融合
- 🤖 **AI自動生成**: Google Gemini 2.5を使用した高度な内容生成
- 📊 **グラフ自動生成**: Chart.jsによる美しいデータビジュアライゼーション
- 🎯 **4スライド構成**: 表紙・アジェンダ・詳細・謝辞の完全パッケージ
- 🖨️ **印刷対応**: プレゼンテーション資料として印刷可能

## セットアップ手順

### 1. 環境要件

- Node.js 18以上
- pnpm または npm
- Google Gemini APIキー

### 2. インストール

```bash
# リポジトリのクローン
git clone [repository-url]
cd app/import/18_presentation-mvp

# 依存関係のインストール
pnpm install
# または
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、Google Gemini APIキーを設定：

```env
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
```

> **注意**: APIキーは[Google AI Studio](https://aistudio.google.com/)から取得してください。

### 4. 開発サーバーの起動

```bash
pnpm dev
# または
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## 使い方ガイド

### 1. 基本情報の入力

#### プレゼンテーションタイトル
- プレゼンテーションの主題を入力
- 例: 「新規システム導入提案」「DX推進プロジェクト」

#### AIモデル選択
- **標準モデル（推奨）**: Gemini 2.5 Flash Preview - 高速でバランスの取れた生成
- **高性能モデル**: Gemini 2.5 Pro Preview - より詳細で高品質な内容生成

### 2. 詳細情報の入力

#### A: 対象顧客について
提案先の企業や担当者の情報を詳しく記入：
- 会社名、部署名
- 担当者名と役職
- 業界、事業内容
- 企業規模（従業員数、売上規模など）

**入力例**:
```
株式会社山田商事様
担当: 山田太郎様（営業部長）
業界: 製造業（自動車部品）
従業員数: 500名
年商: 50億円
```

#### B: 入力情報(C群)のコンテキスト解説
C欄に入力する情報ソースの背景や関連性を説明：
- 各情報ソースの意味
- 情報間の関連性
- プレゼンテーションでの活用方針

**入力例**:
```
C1は現行システムの課題分析レポートです。
C2は競合他社の導入事例調査結果です。
これらを基に、貴社に最適なシステム導入案を提案します。
```

#### C: プレゼンテーションの元となる情報
複数の情報ソースを追加可能：
- 「情報ソースを追加」ボタンで入力欄を増やせます
- 各情報ソースにラベルと内容を記入

**入力例**:
- **ラベル**: 現状分析レポート
- **内容**: 
```
現行システムは10年前に構築されたオンプレミス環境。
年間運用コストは5000万円で、年々10%ずつ増加傾向。
可用性は99%に留まり、年間3.6日のダウンタイムが発生。
災害対策も不十分で、BCP対応が急務。
```

### 3. プレゼンテーション生成

すべての情報を入力後、「プレゼンテーションを生成」ボタンをクリック：
- 生成には5-15秒程度かかります
- 生成中は「生成中...」と表示されます
- 完了すると自動的にプレゼンテーション画面に遷移します

### 4. プレゼンテーション操作

#### ナビゲーション
- **前へ/次へボタン**: スライド間の移動
- **スライド番号表示**: 現在のスライド位置を確認
- **キーボード操作**: （今後実装予定）

#### 機能ボタン
- **印刷ボタン**: ブラウザの印刷機能でPDF化
- **ダウンロードボタン**: （MVPでは未実装）

## スライド構成

### 1. 表紙スライド
- プレゼンテーションタイトル
- サブタイトル（顧客名など）
- 3つの主要指標
- 作成者情報と日付

### 2. アジェンダスライド
- 議事次第（3項目）
- 重要な洞察（1項目）
- 明治モダンスタイルの装飾

### 3. 詳細スライド
- データ分析グラフ
- 分析結果の要約
- 重要なインサイト

### 4. 謝辞スライド
- 感謝のメッセージ
- 次のステップ
- 連絡先情報

## トラブルシューティング

### エラー: "APIキーが設定されていません"
→ `.env.local`ファイルにAPIキーが正しく設定されているか確認

### エラー: "プレゼンテーションの生成に失敗しました"
→ 以下を確認：
- インターネット接続
- APIキーの有効性
- 入力内容が極端に長くないか

### グラフが表示されない
→ ブラウザのJavaScriptが有効か確認

## 技術スタック

- **フレームワーク**: Next.js 15.2.4 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **AI**: Google Gemini 2.5 (Vercel AI SDK)
- **グラフ**: Chart.js
- **バリデーション**: Zod

## ライセンス

本プロジェクトは社内利用を前提としています。

## 開発者向け情報

詳細な開発ガイドは `DEVELOPMENT_GUIDE.md` を参照してください。

---

**Version**: 1.0.0  
**Last Updated**: 2025年6月5日