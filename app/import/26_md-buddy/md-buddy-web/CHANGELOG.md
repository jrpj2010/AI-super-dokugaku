# MD Buddy 更新履歴 (CHANGELOG)

すべての重要な変更をこのファイルに記録します。

このプロジェクトは[セマンティックバージョニング](https://semver.org/lang/ja/)に準拠しています。

## [0.025] - 2025-01-11

### 🎯 AIパネル責務の根本的再設計

#### 🏗️ Promiseベースのアーキテクチャ
- **非同期音声認識フロー**
  - `showAIPanel()`がPromiseを返す設計に変更
  - `const text = await showAIPanel()`で音声認識結果を取得
  - AIパネルは純粋に音声認識結果を返すだけの責務に限定

- **音声再生機能の実装**
  - 録音完了後に音声を再生確認できる機能を追加
  - AudioContextによる録音データの再生
  - ユーザーが録音内容を確認してから挿入可能

#### 🔧 UI/UXの改善
- **viewMode管理の宣言的実装**
  - ボタンテキストの動的切り替え（編集⇔プレビュー）
  - 三項演算子による状態とUIの1対1対応
  - より直感的なモード切り替え体験

- **エディタへの自然な挿入**
  - 音声認識結果を現在のカーソル位置に挿入
  - 不要な確認ダイアログを削除
  - スムーズなワークフローの実現

#### ✅ 技術的改善
- コンポーネント間の責務を明確に分離
- 状態管理の単純化と可読性向上
- ユーザーの期待に沿った自然な動作

## [0.024] - 2025-01-11

### 🎯 完全なワークフロー再設計

#### 🏗️ AIパネルの根本的な役割再定義
- **音声認識専用ツールとして再定義**
  - AIパネルの責務を音声認識のみに限定
  - 新規ファイル作成機能を完全に廃止
  - ファイル管理はファイルエクスプローラーに一元化

- **エディタ統合の改善**
  - 音声認識結果を現在のエディタに直接挿入
  - カーソル位置への挿入 / 全文置き換えの選択オプション
  - ワークフローの明確化と単純化

#### 🔧 UI要素の整理
- **不要な機能の削除**
  - 共有ボタンをツールバーから削除
  - 一時停止ボタンを完全削除（Web Speech APIの制御に不要）
  - ツールバー全体を削除してUIをシンプル化

#### ✅ 開発品質の向上
- **バージョン管理の統一**
  - `APP_VERSION`による一元管理を完全実現
  - すべてのコンポーネントが`constants/version.ts`からインポート
  - Single Source of Truth原則の徹底

- **ステータスバーの追加**
  - エディタ下部に保存状態を表示
  - 「保存中...」と「すべての変更を保存しました」の明確な表示
  - ユーザーエクスペリエンスの向上

## [0.023] - 2025-01-11

### 🏗️ 根本的アーキテクチャ再設計

#### 🎯 状態管理とデータフロー
- **エディタ内容の一元管理**
  - `useState`によるeditorContent管理でリアルタイムプレビュー実現
  - エディタの変更が即座にプレビューに反映
  - 手動での同期操作を完全に排除

- **AIパネルコールバック実装**
  - AI生成結果が自動的にエディタに反映
  - AIパネル閉じる際の適切なクリーンアップ
  - コンポーネント間の責務明確化

#### 🔧 音声認識プロセスの改善
- **録音完了時のアクション明確化**
  - 「議事録を生成する」ボタンと「生データダウンロード」の明確な分離
  - 文字起こしテキストの直接ダウンロード機能
  - 生データと加工データの明確な区別

- **一時停止機能のデバッグ強化**
  - 一時停止・再開ボタンのデバッグログ追加
  - isPausedフラグによる状態管理の確認

#### ✅ 品質改善
- バージョン管理の統一（package.jsonとUI表示の一致）
- プロフェッショナル開発者の基準を満たす実装品質

## [0.022] - 2025-01-11

### 🔥 致命的バグの根本的修正

#### 🎯 最重要修正
- **Web Speech APIの累積トランスクリプト機能実装**
  - `accumulatedFinalTranscriptRef`による全認識結果の保存
  - 3分の録音が最後の数秒だけになる致命的バグを修正
  - onresultイベントハンドラーの完全な書き直し
  - デバッグログで累積文字数を常時追跡

#### 🔧 UI改善
- **「自動保存済み」インジケーターの削除**
  - ユーザーフィードバックに基づく改悪要素の排除
  - 自動保存機能は維持したまま不要なUIを削除

#### ⚡ その他の改善
- 一時停止機能の改善（録音停止・再開時のトランスクリプト保持）
- デバッグログの改善（累積トランスクリプトのサイズを常時記録）

## [0.021] - 2025-01-11

### 🚀 エンタープライズグレードへの完全進化

#### 🎯 追加
- **debounce付き自動保存機能**
  - 2秒間の入力停止後に自動保存
  - 保存状態のリアルタイムインジケーター表示
  - 手動保存の必要性を完全排除

#### 🔧 修正
- **編集⇔プレビューモード切り替えの根本的修正**
  - Zustandストアからの独立
  - React useStateによるローカル状態管理
  - プレビュー画面での編集ボタン表示修正

- **音声認識フローの完全修正**
  - 音声認識テキストの親コンポーネント管理
  - 停止ボタンクリック時のデータ保持
  - AI分析へのデータ送信の確実性向上
  - localTranscriptの廃止

- **ダウンロード機能の修正**
  - MarkdownダウンロードでのviewMode対応
  - AI生成結果の適切な保存

#### ⚡ パフォーマンス改善
- 不要な再レンダリングの削減
- 自動保存のdebounce最適化

#### 🗑️ 削除
- 手動保存ボタン（自動保存により不要）
- Ctrl+Sショートカット（自動保存により不要）

## [0.020] - 2025-01-11

### ✨ プロフェッショナルグレードへの完全リファクタリング

#### 🎯 追加
- **編集⇔プレビューモード切り替えシステム**
  - シームレスなモード切り替え機能
  - Ctrl+Eショートカットによる高速切り替え
  - ツールバーボタンの動的表示

- **クリップボード画像ペースト機能**
  - Ctrl+Vで画像を直接Markdownに挿入
  - Data URL形式での即時プレビュー
  - 包括的なエラーハンドリング

- **包括的なツールチップシステム**
  - すべてのUIボタンに説明的なツールチップを追加
  - ショートカットキーの表示
  - 操作方法の直感的な理解促進

#### 🔧 修正
- **一時停止ボタンの完全修正**
  - RecordingState.PAUSEDの適切な使用
  - isPaused状態の正しい伝達
  - Web Speech APIとの同期改善

- **AI分析データフローの完全修正**
  - 音声→テキスト変換の確実な動作
  - テキストが空の場合の音声データフォールバック
  - 詳細なデバッグログの追加

- **Web Speech API制御ロジックの完全書き換え**
  - 状態管理の改善（started フラグ）
  - エラーハンドリングの強化
  - 自動リトライメカニズムの実装

#### 🚀 改善
- **リアルタイムプレビュー機能**
  - エディタ変更時の即時プレビュー更新
  - パフォーマンスの最適化

- **明示的保存機能**
  - 保存ボタンの追加
  - Ctrl+Sショートカットの実装
  - 保存状態の視覚的フィードバック

#### 📝 技術的変更
- 新規ファイル: `src/utils/clipboard.ts`
- 主要な変更: `App.tsx`, `Preview.tsx`, `VoiceInputPanel.tsx`, `MarkdownToolbar.tsx`

---

## [0.019] - 2025-01-11

### 新機能
- **音声ファイルの自動保存機能** - 録音完了時に自動的にファイルエクスプローラーに保存
- **3ファイル同時保存機能** - Markdown、音声（WebM）、字幕（SRT）を同じフォルダに整理して保存
- **タブUI** - 同じフォルダ内の関連ファイルをタブで簡単に切り替え
- **音声プレーヤー** - 再生/一時停止、シークバー、音量調整、再生速度変更機能
- **字幕同期表示** - SRTファイルがある場合、音声再生と同期して字幕を表示
- **AI分析後の自動ファイルアクティブ化** - 生成されたMarkdownファイルを自動的に選択・表示

### 修正
- **Geminiプロンプト改善** - ダミーデータ生成問題を修正、実際の音声内容のみを使用するよう改善

### 改善
- ファイルエクスプローラーのUI改善
- 音声ファイルのメモリ管理最適化

## v0.018 (2025-01-11)

### 新機能
- **音声録音・文字起こし・字幕生成システム** - AIパネルからの統合音声入力
- **リアルタイム文字起こし** - Web Speech APIによる即時変換
- **タイムスタンプ記録** - 発話タイミングの正確な記録
- **SRT字幕生成** - プロ仕様の字幕ファイル作成
- **ダウンロード機能** - 音声、字幕、Markdownファイルの個別ダウンロード

### 技術仕様
- React 18.3 + TypeScript 5.6
- Vite 7.0 ビルドシステム
- Tailwind CSS + shadcn/ui
- Web Audio API + MediaRecorder API
- Google Gemini API統合

## [0.017]以前
- 基本的なMarkdownエディター機能
- ファイル管理システム
- プレビュー機能
- 設定画面

---

## バージョン管理方針

### セマンティックバージョニング
- **パッチ**: 0.020 → 0.021 (バグ修正)
- **マイナー**: 0.020 → 0.030 (新機能追加)
- **メジャー**: 0.020 → 1.000 (破壊的変更)

### コミット規約
```bash
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: スタイル調整
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

### 例
```bash
feat(clipboard): 画像ペースト機能を追加
fix(voice): 一時停止ボタンの状態管理を修正
docs: v0.020の更新履歴を追加
```

---

開発: TANREN株式会社
