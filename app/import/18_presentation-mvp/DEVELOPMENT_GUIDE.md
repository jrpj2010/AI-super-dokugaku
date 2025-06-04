# 高度情報入力型 プレゼンテーション生成ツール - 開発ガイド

## 1. プロジェクト概要

本プロジェクトは、ユーザーが入力した顧客情報、コンテキスト、関連情報ソースに基づいて、AI (Google Gemini) が「明治モダン」スタイルのプレゼンテーション資料を動的に生成するウェブアプリケーションのMVP（Minimum Viable Product）です。

主な目的は以下の通りです。

*   AIによるプレゼンテーションコンテンツ生成の実現可能性検証
*   「明治モダン」テーマに基づいたUI/UXの構築
*   将来的な機能拡張のための基盤設計

## 2. 技術スタック

*   **フレームワーク**: Next.js (App Router)
*   **言語**: TypeScript
*   **スタイリング**: Tailwind CSS, shadcn/ui (一部コンポーネント)
*   **AI連携**: Vercel AI SDK
*   **LLM**: Google Gemini API (gemini-1.5-pro-latest, gemini-1.5-flash-latest)
*   **状態管理**: React Hooks (useState, useEffect)
*   **UIコンポーネント**: カスタムコンポーネント + shadcn/ui
*   **作図・グラフ**: Chart.js (react-chartjs-2)

## 3. セットアップ手順

### 3.1. 前提条件

*   Node.js (v18.x 以上推奨)
*   npm または yarn

### 3.2. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を記述してください。

\`\`\`env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_studio_api_key
\`\`\`

**重要**: `your_google_ai_studio_api_key` は、有効な Google AI Studio の API キーに置き換えてください。このキーはGoogle Cloud Consoleから取得できます。
**APIキーは機密情報です。Gitリポジトリにはコミットしないでください。`.gitignore` ファイルに `.env.local` が含まれていることを確認してください。**

### 3.3. 依存関係のインストール

プロジェクトのルートディレクトリで、以下のコマンドを実行します。

\`\`\`bash
npm install
# または
yarn install
\`\`\`

### 3.4. 開発サーバーの起動

以下のコマンドで開発サーバーを起動します。

\`\`\`bash
npm run dev
# または
yarn dev
\`\`\`

デフォルトでは `http://localhost:3000` でアプリケーションにアクセスできます。

## 4. プロジェクト構造

\`\`\`
.
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 情報入力ページ
│   ├── presentation/             # プレゼンテーション表示関連
│   │   ├── page.tsx              # プレゼンテーション表示ページ
│   │   └── loading.tsx           # ローディングUI (現在はnull)
│   ├── api/                      # APIルート
│   │   └── generate-presentation/
│   │       └── route.ts          # LLM呼び出しAPI
│   ├── layout.tsx                # ルートレイアウト
│   └── globals.css               # グローバルスタイル
├── components/
│   ├── presentation/             # 各スライドコンポーネント
│   │   ├── cover-slide.tsx
│   │   ├── agenda-slide.tsx
│   │   ├── detail-slide-a.tsx
│   │   ├── thankyou-slide.tsx
│   │   └── slide-layout.tsx      # スライド共通レイアウト
│   ├── ui/                       # shadcn/ui コンポーネント (Button, Inputなど)
│   └── theme-provider.tsx        # テーマ管理
├── hooks/
│   └── use-toast.ts              # shadcn/uiのtoastフック
├── lib/
│   ├── dummy-data.ts             # ダミーデータ (フォールバック用)
│   └── utils.ts                  # ユーティリティ関数 (cnなど)
├── public/                       # 静的アセット (画像など)
├── .env.local                    # 環境変数ファイル (Git管理外)
├── .gitignore                    # Git無視ファイル
├── DEVELOPMENT_GUIDE.md          # このドキュメント
├── next.config.mjs               # Next.js設定
├── package.json                  # プロジェクト定義、依存関係
├── tailwind.config.ts            # Tailwind CSS設定
└── tsconfig.json                 # TypeScript設定
\`\`\`

## 5. 主要機能

### 5.1. 情報入力フォーム (`app/page.tsx`)

*   プレゼンテーションタイトル、顧客情報、コンテキスト、情報ソース（動的追加/削除可能）を入力。
*   使用するAIモデル（Gemini 1.5 Pro / Flash）を選択。

### 5.2. プレゼンテーション生成 (`app/api/generate-presentation/route.ts`)

*   入力フォームからデータを受け取り、選択されたGeminiモデルに対してプロンプトを生成。
*   Vercel AI SDKの `generateObject` 関数と `@ai-sdk/google` プロバイダーを使用し、LLMに構造化されたJSONデータ（スライド内容）を要求。
    *   Zodスキーマ (`PresentationDataSchema`) を用いて、LLMの出力形式を定義・検証。
*   生成されたデータをフロントエンドに返す。

### 5.3. プレゼンテーション表示 (`app/presentation/page.tsx`)

*   APIから受け取った（またはlocalStorage経由で渡された）データを基に、各スライドコンポーネントをレンダリング。
*   スライドナビゲーション（次へ/前へ）。
*   印刷機能（ブラウザ標準）、ダウンロード機能（プレースホルダー）。
*   LLMからのデータ取得に失敗した場合やデータ形式が不正な場合は、エラーメッセージを表示し、ダミーデータをフォールバックとして使用。

## 6. LLM連携 (`app/api/generate-presentation/route.ts`)

*   **使用モデル**:
    *   `gemini-1.5-pro-latest` (高性能モデル)
    *   `gemini-1.5-flash-latest` (標準モデル)
*   **APIキー**: 環境変数 `GOOGLE_GENERATIVE_AI_API_KEY` から読み込み。
    *   **セキュリティ**: APIキーはサーバーサイドでのみ使用し、クライアントには公開しません。取り扱いには十分注意してください。
*   **プロンプト**:
    *   ユーザー入力と固定の指示（「明治モダン」スタイル、和暦使用など）を組み合わせて動的に生成。
    *   LLMに対し、Zodスキーマに基づいたJSON形式での出力を要求。
*   **Vercel AI SDK**:
    *   `@ai-sdk/google`: Google Gemini APIとの連携を簡略化。
    *   `generateObject`: LLMに特定のスキーマに基づいたオブジェクトを生成させるための関数。

## 7. 今後の開発・改善点

*   **プロンプトエンジニアリング**:
    *   より高品質で安定したプレゼンテーション内容を生成するためのプロンプト改善。
    *   多様なスライドパターン（グラフ種類、リスト、画像配置など）に対応できるようなプロンプト設計。
    *   ユーザー入力の曖昧さに対する頑健性の向上。
*   **エラーハンドリングとUX**:
    *   LLM API呼び出し時のタイムアウト処理、リトライ処理の強化。
    *   生成中のより詳細な進捗表示。
    *   LLMからの不適切な応答（例: スキーマ不一致、内容不足）に対するフォールバックやユーザーへのフィードバック改善。
*   **機能拡張**:
    *   画像生成AIとの連携によるスライド内画像の動的生成。
    *   ユーザーによるスライド構成のカスタマイズ機能。
    *   生成されたプレゼンテーションの保存・編集機能。
    *   より多くのスライドテンプレートの追加。
*   **パフォーマンス**:
    *   LLMの応答速度改善のための工夫（ストリーミング処理の検討など）。
    *   特にProモデル使用時の待ち時間対策。
*   **テスト**:
    *   APIルートの単体テスト、結合テスト。
    *   UIコンポーネントのテスト。
*   **セキュリティ**:
    *   入力値のサニタイズ強化。
    *   APIレートリミットの導入検討。

## 8. 注意事項

*   **APIキーの管理**: `GOOGLE_GENERATIVE_AI_API_KEY` は厳重に管理し、絶対に外部に漏洩しないようにしてください。定期的なキーのローテーションも検討してください。
*   **LLMのコスト**: Gemini APIの使用にはコストが発生します。特にProモデルや大量のリクエストは高額になる可能性があるため、利用状況を監視し、予算内で運用できるように注意してください。
*   **LLMの応答**: LLMの応答は常に確定的ではありません。同じ入力でも異なる結果が返ってくることがあります。また、期待通りの品質や形式で応答が得られない場合もあります。
*   **開発中のデータ**: 現在、生成されたプレゼンテーションデータはlocalStorageに一時的に保存されています。これは開発用の簡易的な措置であり、本番環境ではより永続的で安全なデータ保存方法を検討する必要があります。

---

このドキュメントが開発の助けとなれば幸いです。
