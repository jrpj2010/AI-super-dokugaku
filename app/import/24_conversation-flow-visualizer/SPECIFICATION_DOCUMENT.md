# 要件定義書 - 会話フロービジュアライザー

## 1. 概要

### 1.1. 本書の位置づけ
本書は、「会話フロービジュアライザー」システムが提供すべき機能、性能、満たすべき制約条件を定義するものである。要求定義書で示されたユーザーニーズを実現するための具体的な仕様を記述する。

### 1.2. システム概要
本システムは、Webアプリケーションとして提供され、商談やミーティング中の発話をリアルタイムに構造分解し、ブロック（ノード）と依存線（エッジ）でグラフィカルに可視化する。キーワードの伏線回収や話法の分岐点を一目で把握可能にし、トーク改善・分析に役立てることを目的とする。

### 1.3. プロジェクトリポジトリ
`conversation-flow-visualizer`

## 2. 機能要件

### 2.1. 音声キャプチャ (Capture Audio)
*   **FR-001**: ブラウザのマイク機能を利用し、ユーザーの音声をリアルタイムにストリーミング取得できること。
*   **FR-002**: マイクが利用できない場合やオフラインでの利用を想定し、音声ファイル（WAV/MP3形式）をアップロードして処理できること (将来機能)。

### 2.2. 音声認識 (Speech-to-Text)
*   **FR-003**: 取得した音声データをリアルタイム（目標レイテンシ: 500ms以内）にテキストへ変換できること。
*   **FR-004**: 音声認識エンジンとして Google Gemini API (gemini-2.5-flash-preview-04-17) を使用すること。
*   **FR-005**: 主な対応言語を日本語（ja-JP）とすること。

### 2.3. 発話セグメンテーション (Sentence Segmentation)
*   **FR-006**: 認識されたテキストを、意味のある塊（一文または複数の文）に分割（セグメント化）すること。
*   **FR-007**: セグメンテーションは、Gemini APIからの応答に含まれる区切り文字 (`---NODE_BREAK---`) に基づいて行うこと。

### 2.4. 依存関係分析 (Dependency Analysis) - 将来的な拡張目標
*   **FR-008**: ノード間の時系列的な依存関係を表現できること（直列線）。
*   **FR-009**: テキスト内容に基づき、キーワードが再出現するノード間の依存関係を表現できること（点線）。
*   **FR-010**: 会話の流れが分岐する点を「IFノード」のような特殊なノードで表現できること。
*   **FR-011**: 依存関係分析のアルゴリズムとして、TF-IDFによるキーフレーズ抽出、文字列類似度、ルールベースの手法を組み合わせることを検討する。

### 2.5. グラフ描画 (Graph Rendering)
*   **FR-012**: 分析された発話セグメントをノード、依存関係をエッジとしてグラフィカルに表示すること。現在はReactコンポーネントとSVGを直接使用。
*   **FR-013**: ズーム機能: 表示倍率を0.1から2.0の範囲で変更できること。ズーム操作は専用ボタンで行う。
*   **FR-014**: パン機能: 表示領域をドラッグして移動できること。

### 2.6. UIブロック (ノード)
*   **FR-015**: ノードは角丸長方形（`rounded_rectangle`）で表示すること。
*   **FR-016**: ノードの基本背景色は`#2a2d31`とすること。
*   **FR-017**: ノードには、内容に応じてアクセントアイコン（例: `❗` - 重要ポイント, `💡` - アイデア）を表示できること。
*   **FR-018**: ノードにマウスオーバーすると、ツールチップで補足情報（現在はノード全文）を表示できること。ツールチップはマークダウン形式をサポート (将来)。
*   **FR-019**: 新しい発話が認識されるたびに、画面の左側から右方向へ、または上から下方向へノードを展開すること (現在は上から下)。

### 2.7. アイコン注釈 (Icon Annotations)
*   **FR-020**: 「要注意・重要ポイント」を示すアイコン（例: `❗`）を定義すること。
*   **FR-021**: 「アイデア・提案」を示すアイコン（例: `💡`）を定義すること。

### 2.8. トランスクリプトタイムラインと波形表示
*   **FR-022**: 録音中、リアルタイムに音声波形を画面下部（`waveform_bar`）に表示すること。

### 2.9. エクスポート機能 (Export) - 将来機能
*   **FR-023**: 表示されているグラフ構造をPNG形式でエクスポートできること。
*   **FR-024**: 表示されているグラフ構造をSVG形式でエクスポートできること。
*   **FR-025**: 会話の構造データ（ノード、エッジ情報）をJSON形式でエクスポートできること。
*   **FR-026**: `Ctrl+Shift+S` のホットキーでスクリーンショットを取得できること。

### 2.10. ストレージ機能 (Storage) - 将来機能
*   **FR-027**: 会話データをローカルのIndexedDBに保存できること。
*   **FR-028**: 保存期間はデフォルトで30日間とすること（設定変更可能を検討）。
*   **FR-029**: オプションでクラウドバックエンド（例: Firestore）への保存も可能とすること。

## 3. 非機能要件

### 3.1. パフォーマンス
*   **NFR-001**: グラフ描画の目標フレームレートを60fpsとすること（スムーズなアニメーションのため）。
*   **NFR-002**: 1時間の会話（約600ノードを想定）でも、快適な操作性を維持できること。

### 3.2. スケーラビリティ
*   **NFR-003**: 初期リリースはシングルユーザーのリアルタイム処理を対象とする。
*   **NFR-004**: 将来的には複数ユーザーによる同時利用や共有機能を視野に入れる。

### 3.3. アクセシビリティ
*   **NFR-005**: 色のコントラストはWCAG 2.1 AA基準を満たすこと。
*   **NFR-006**: 主要な機能はキーボードのみで操作可能であること（タブ移動、エンターキーでの選択など）。
*   **NFR-007**: ARIA属性を適切に使用し、スクリーンリーダー等による情報アクセスを支援すること。

### 3.4. セキュリティ
*   **NFR-008**: アプリケーションはHTTPS経由でのみ提供されること。
*   **NFR-009**: 音声データやAPIキーの通信はTLSで暗号化されること。

### 3.5. プライバシー
*   **NFR-010**: 録音開始前にユーザーの明確な同意（オプトイン）を得ること。
*   **NFR-011**: GDPRなど関連するプライバシー規制を考慮した設計とすること。

### 3.6. 国際化 (i18n)
*   **NFR-012**: 基本言語は日本語（ja-JP）とし、将来的には英語（en-US）にも対応可能設計とすること。

## 4. UI/UX仕様

（詳細は `UI/UXデザイン` ドキュメントまたは `metadata.json` 内 `ui_ux_spec` を参照）

### 4.1. レイアウト
*   **トップバー**: 高さ56px。ハンバーガーメニュー、タイトル「TRANSCRIPT」、ズームコントロールを配置。背景色: `#1c1f23`。
*   **キャンバスエリア**: トップバーと波形バーの間の全域。背景色: `#121417`。パン・ズーム操作可能。
*   **波形バー**: 高さ96px。マイク切り替えボタン、リアルタイム波形表示エリアを配置。背景色: `#121417`。

### 4.2. デザイントークン
*   **主要背景色**: `#121417` (bg_primary)
*   **ノード背景色**: `#2a2d31` (node_bg)
*   **アクセントカラー**: `#3a8cff`
*   **主要テキスト色**: `#e9ecef` (text_primary)
*   **フォントファミリー**: `'Noto Sans JP', sans-serif`
*   **ノード角丸**: `6px`

### 4.3. 主要コンポーネント
*   **ノードブロック**: 角丸長方形。パディング `8px 12px`。最小幅 `120px`。アイコン表示スロットあり。
*   **エッジ線**: 通常線は実線 (`#5c6b7a`)、依存線は点線 (`#5c6b7a80`)。矢印なし。
*   **ツールチップ**: ノードホバーで表示。最大幅 `260px`。背景色 `#1c1f23`。
*   **マイクボタン**: 円形。アクティブ時背景色 `#3a8cff`。

### 4.4. インタラクション
*   マイクボタンクリックで録音開始/停止。
*   ノードホバーでツールチップ表示。
*   キャンバスドラッグでパン。
*   ホイールスクロールまたはボタンでズーム。

### 4.5. アニメーション
*   ノード出現: フェードスライド (将来)
*   エッジ描画: スイープ描画 (将来)
*   ツールチップ: フェードイン＆スケールアップ。
*   ズーム: スムーズなトランジション。

## 5. データフロー
1.  マイクからの音声ストリームをSTTエンジン (Gemini API) へ送信。
2.  STTエンジンからのテキスト結果を、区切り文字に基づき発話セグメントへ分割。
3.  (将来) 分割されたセグメントを依存関係アナライザーへ。
4.  分析/分割されたノードをグラフレンダラー (Reactコンポーネント) で表示。
5.  UI更新はReactのstateを通じて行われる。

## 6. 制約事項・前提条件
*   音声認識エンジン (Gemini API) の利用には、有効なAPIキーとインターネット接続が必須。
*   1時間を超えるような長時間の連続録音セッションにおけるパフォーマンスは未検証。
*   初期バージョンではモバイルデバイスへの最適化は行わない (Phase-2で検討)。
*   ユーザー認証やマルチユーザー機能は初期バージョンには含まず、将来OAuth等を利用して実装予定。