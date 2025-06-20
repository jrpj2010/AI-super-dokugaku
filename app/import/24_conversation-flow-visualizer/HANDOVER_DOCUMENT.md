# 会話フロービジュアライザー 引き継ぎ書

**作成日**: 2025年6月20日  
**プロジェクトバージョン**: v0.2.3-definitions  
**リポジトリ**: `conversation-flow-visualizer`

## 1. プロジェクト概要

### 1.1 システム概要
会話フロービジュアライザーは、商談やミーティング中の発話をリアルタイムに構造分解し、ブロック（ノード）と依存線（エッジ）でグラフィカルに可視化するWebアプリケーションです。

### 1.2 主要な目的
- キーワードの伏線回収や話法の分岐点を一目で把握可能にする
- 利用者のトークスキル改善を支援
- 会話内容の分析・レビューを容易にする

### 1.3 想定利用者
- **ユーザー（発話者）**: 商談担当者、講師、プレゼンター
- **観察者（分析者）**: 上司、コーチ、同僚

## 2. 技術スタック（2025年6月現在）

### 2.1 フロントエンド
- **フレームワーク**: React 19（2024年12月5日正式リリース）
- **言語**: TypeScript
- **UIライブラリ**: 
  - カスタムReactコンポーネント
  - SVGによるエッジ描画
- **状態管理**: React標準フック（useState, useRef, useEffect）

### 2.2 音声処理・AI
- **音声認識API**: Google Gemini API
- **SDK**: `@google/genai`（現在使用中、最新版v1.5.1が利用可能）
- **モデル**: `gemini-2.5-flash-preview-04-17`（**注意**: 2025年7月15日廃止予定）
- **音声入力**: WebRTC API、Web Audio API、MediaRecorder API

### 2.3 開発環境
- **モジュール読み込み**: esm.sh（CDNベース）
- **ビルドツール**: なし（ブラウザ直接実行）

## 3. 完了済み機能（フェーズ0: プロトタイプ）

### 3.1 基本機能
- ✅ 基本レイアウト実装
  - トップバー（高さ56px、ハンバーガーメニュー、タイトル、ズームコントロール）
  - キャンバスエリア（ノード表示領域）
  - 波形バー（高さ96px、マイクボタン、リアルタイム波形表示）

### 3.2 音声処理機能
- ✅ マイク録音機能
  - マイク使用許可の取得
  - 録音開始/停止のトグル
  - 音声データのBase64エンコード
  
- ✅ Gemini API連携
  - ストリーミング形式での文字起こし
  - 区切り文字（`---NODE_BREAK---`）による分割指示
  - リアルタイムレスポンス表示

- ✅ 音声再生機能
  - 録音した音声の再生（現在は全ノードで共有）

### 3.3 可視化機能
- ✅ ノード生成・表示
  - 複数ノードへの自動分割
  - 角丸長方形デザイン（背景色: #2a2d31）
  - アイコン表示（❗重要ポイント、💡アイデア）
  - 選択状態のスタイリング

- ✅ エッジ描画
  - 時系列エッジ（実線）の自動生成
  - SVGによる描画実装

- ✅ インタラクション
  - ズーム機能（0.1〜2.0倍、専用ボタン）
  - パン機能（ドラッグによる視点移動）
  - ノードホバー時のツールチップ表示
  - ノード選択機能

### 3.4 UI/UX
- ✅ リアルタイム波形表示
- ✅ レスポンシブなキャンバス操作
- ✅ ダークテーマデザイン

## 4. 2025年6月時点の技術調査結果

### 4.1 Google Gemini API最新情報
- **最新SDK**: `@google/genai` v1.5.1（2025年6月14日リリース）
- **重要な変更**: 
  - 旧SDK（`@google/generative-ai`）は非推奨、2025年9月30日サポート終了
  - 新SDKはGemini 2.0機能に対応
  - Vertex AIとGemini Developer APIの両方をサポート

- **モデル移行の必要性**:
  - 現在使用中: `gemini-2.5-flash-preview-04-17`（2025年7月15日廃止）
  - 推奨移行先: `gemini-2.5-flash`（2025年6月初旬一般提供開始）

- **新機能**:
  - Thinking capabilities（推論機能）
  - Native audio対応（24言語、30種類のHD音声）
  - マルチスピーカーTTS
  - Computer use capabilities（2025年夏予定）

### 4.2 React 19新機能
- **新フック**:
  - `useActionState`: フォーム状態管理の簡素化
  - `useFormStatus`: フォーム送信状態の取得
  - `useOptimistic`: 楽観的UI更新
  - `use()`: Promise解決とContext取得

- **その他の改善**:
  - Server Components対応
  - Document metadata自動処理
  - React Compiler（自動最適化）
  - エラーハンドリングの改善

### 4.3 TF-IDF実装オプション
- 複数のJavaScript実装がnpmで利用可能
- `tf-idf-search`、`related-documents`、`covectric`など
- React統合の実績あり
- 日本語処理には形態素解析の考慮が必要

## 5. 既知の問題と制限事項

### 5.1 技術的制限
- 長時間録音のテストが未実施
- エラーハンドリングの網羅性が不十分
- モバイルデバイスでの表示は未対応

### 5.2 機能的制限
- 各ノードの音声は全体録音を共有（部分再生未実装）
- 依存関係エッジ（キーワードベース）は未実装
- エクスポート機能（PNG/SVG/JSON）は未実装
- ローカル保存機能（IndexedDB）は未実装

### 5.3 緊急対応事項
- **Geminiモデルの廃止対応（2025年7月15日期限）**
- SDKの更新検討

## 6. プロジェクト構造

```
/app/import/24_conversation-flow-visualizer/
├── index.html              # エントリーポイント
├── index.tsx               # Reactアプリケーション本体
├── style.css               # スタイルシート
├── metadata.json           # プロジェクトメタデータ
├── preview.html            # 静的プレビュー
├── README.md               # 簡易説明書
├── REQUIREMENT_DEFINITION.md    # 要求定義書
├── SPECIFICATION_DOCUMENT.md    # 要件定義書
├── TECHNICAL_DEFINITION.md      # 技術定義書
├── PROCESS_DEFINITION.md        # 工程定義書
├── QUALITY_DEFINITION.md        # 品質定義書
├── PROJECT_STATUS.md            # プロジェクトステータス
├── HANDOVER_DOCUMENT.md         # 本文書
└── DEVELOPMENT_PLAN.md          # 開発計画書（作成予定）
```

## 7. 次のステップ

1. **緊急**: Geminiモデル移行（7月15日期限）
2. **高優先**: フェーズ1タスク12 - 依存関係エッジの実装
3. **中優先**: その他のフェーズ1機能の実装

詳細な開発計画については、`DEVELOPMENT_PLAN.md`を参照してください。

## 8. 連絡先・参考資料

- プロジェクトオーナー: TANREN株式会社 CEO 佐藤勝彦様
- 開発環境: AI Studio環境
- 参考資料:
  - [Google Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
  - [React 19 Documentation](https://react.dev)
  - [プロジェクトメタデータ](metadata.json)

---

*本文書は2025年6月20日時点の情報に基づいて作成されています。*