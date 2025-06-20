# 技術定義書 - 会話フロービジュアライザー

## 1. 概要
本書は、「会話フロービジュアライザー」システムを構築・運用するための技術的な要素について定義する。アーキテクチャ、使用するプログラミング言語、フレームワーク、ライブラリ、データ構造、API連携などについて記述する。

**プロジェクトリポジトリ**: `conversation-flow-visualizer`

## 2. システムアーキテクチャ

本システムは、クライアントサイドで完結する機能（音声入力、Gemini API連携、UI描画）を中心としたシングルページアプリケーション (SPA) として構築される。

*   **クライアントサイド (ブラウザ)**:
    *   UIレンダリング、状態管理
    *   マイクからの音声入力処理 (WebRTC, Web Audio API)
    *   音声データのエンコードおよびGoogle Gemini APIへの送信
    *   Gemini APIからのレスポンス処理とノードデータの生成
    *   SVGによるエッジ描画
    *   インタラクション処理（ズーム、パン、選択など）
    *   (将来) IndexedDBによるローカルストレージへのデータ永続化
*   **外部サービス**:
    *   Google Gemini API: 音声認識およびテキスト生成

将来的には、データ共有や高度な分析機能のためにNode.jsベースのバックエンドサーバーを導入する構想がある (仕様書参照)。

## 3. 主要技術スタック

### 3.1. フロントエンド
*   **プログラミング言語**: TypeScript
*   **フレームワーク/ライブラリ**:
    *   React 19 (UI構築、コンポーネントベース開発)
    *   React DOM (ブラウザへのレンダリング)
*   **状態管理**: React Context API および `useState`, `useRef`, `useEffect`フック (現状の規模ではこれで対応。大規模化する場合はZustandまたはReduxを検討)
*   **APIクライアント**:
    *   `@google/genai` (Google Gemini API JavaScript SDK)
*   **音声処理**:
    *   WebRTC API (`navigator.mediaDevices.getUserMedia`) : マイク入力
    *   Web Audio API (`AudioContext`, `AnalyserNode`): 音声波形分析
    *   `MediaRecorder` API: 音声録音とエンコード (webm形式)
*   **描画**:
    *   HTML/CSS: 基本的なUI要素、ノードのスタイリング
    *   SVG: ノード間のエッジ（線）描画
*   **モジュールバンドラ/ビルドツール**: (esbuild経由のesm.shを利用しているため、直接的な設定はなし。ローカル開発時はViteやParcelなどを検討)
*   **パッケージマネージャ**: (npm または yarn を想定)

### 3.2. バックエンド (将来構想)
*   **言語**: Node.js (v20)
*   **フレームワーク**: Express.js
*   **リアルタイム通信**: Socket.io (WebSocket)
*   **役割**: Speech service proxy, データ同期, ユーザー認証など

### 3.3. NLPエンジン (クライアントサイド/API利用)
*   **音声認識・テキスト処理**: Google Gemini API (`gemini-2.5-flash-preview-04-17`)
*   **キーワード抽出 (簡易実装)**: クライアントサイドでテキスト処理 (トリム、小文字化、キーワードマッチング)

### 3.4. データベース (将来構想)
*   **ローカル**: IndexedDB (ブラウザ内ストレージ)
*   **クラウド (オプション)**: Firestore (NoSQL Document Database)

## 4. API連携

### 4.1. Google Gemini API
*   **SDK**: `@google/genai`
*   **認証**: APIキー (`process.env.API_KEY`)
*   **モデル**: `gemini-2.5-flash-preview-04-17`
*   **主な利用機能**:
    *   `generateContentStream`: 音声データとテキストプロンプトを送信し、ストリーミング形式で文字起こし結果と区切り情報を含むテキストを受信。
*   **リクエスト形式**: 音声データをBase64エンコードし、`inlineData`として送信。テキストプロンプトで出力形式（区切り文字）を指示。
*   **レスポンス形式**: ストリーミングされるテキスト。区切り文字 `---NODE_BREAK---` によって個々のノードテキストに分割。

## 5. データモデル概要

### 5.1. Node (ノード)
```typescript
interface Node {
    id: string;          // ユニークID (例: `node-${Date.now()}-${index}`)
    text: string;        // ノードに表示される文字起こしテキスト
    audioUrl?: string;   // (現在未使用、将来的に部分再生用) 関連する音声データのURL。現在は全ノードがフル録音のURLを共有
    icons?: ('exclamation' | 'lightbulb')[]; // 表示するアイコンの種別配列
}
```
*備考: 現在の実装では、各ノードの `audioUrl` は録音全体の音声データを指す単一のURLを共有している。*

### 5.2. Edge (エッジ) - 時系列接続用
```typescript
interface Edge {
    id: string;           // ユニークID (例: `edge-${sourceNodeId}-${targetNodeId}`)
    sourceNodeId: string; // 接続元ノードのID
    targetNodeId: string; // 接続先ノードのID
}
```
*備考: 将来的には `type: 'timeseries' | 'dependency'` のようなプロパティを追加予定。*

### 5.3. NodePosition (ノード位置情報)
```typescript
interface NodePosition {
    x: number;      // ノードの左上のX座標 (親コンテナ基準)
    y: number;      // ノードの左上のY座標 (親コンテナ基準)
    width: number;  // ノードの幅
    height: number; // ノードの高さ
}
// 実装では Record<string, NodePosition> (キーはNode ID) として保持
```

## 6. 主要処理フロー (クライアントサイド)

1.  **初期化**:
    *   APIキーの存在確認。
    *   `GoogleGenAI` SDKのインスタンス化。
2.  **録音開始**:
    *   マイク使用許可の取得 (`getUserMedia`)。
    *   `AudioContext`, `AnalyserNode` のセットアップ (波形表示用)。
    *   `MediaRecorder` の初期化とイベントハンドラ設定 (`ondataavailable`, `onstop`)。
    *   録音開始 (`mediaRecorder.start()`)。
    *   波形描画ループ開始。
3.  **録音中**:
    *   `ondataavailable` で音声チャンクを収集。
    *   波形をリアルタイム描画。
4.  **録音停止**:
    *   `mediaRecorder.stop()`。波形描画ループ停止。
    *   `onstop` イベント発火:
        *   収集した音声チャンクから `Blob` を生成。
        *   `Blob` を Base64 文字列にエンコード。
        *   Gemini API (`generateContentStream`) にBase64音声データと指示プロンプトを送信。
        *   ストリーミングレスポンスを逐次受信し、UIに表示。
        *   全レスポンス受信後、区切り文字でテキストを分割し、`Node` オブジェクトの配列を生成。
        *   生成されたノード間に時系列 `Edge` データを生成。
        *   Reactのstateを更新し、ノードとエッジを再描画。
        *   ノードの位置情報を計算・保存。
5.  **UIインタラクション**:
    *   **ズーム/パン**: `scale` と `panOffset` stateを更新し、CSS `transform` でビューポートを操作。
    *   **ノード選択**: `selectedNodeId` stateを更新し、選択されたノードにCSSクラスを適用。
    *   **ツールチップ**: マウスホバーで `tooltipData` stateを更新し、ツールチップコンポーネントを表示/非表示。
    *   **音声再生**: クリックされたノードに関連付けられた（現在は共有の）`audioUrl` を持つ `HTMLAudioElement` で再生。

## 7. ディレクトリ構造 (主要部)
```
/project_root
├── index.html
├── style.css
├── index.tsx         # Reactアプリケーション本体
├── metadata.json     # プロジェクトメタデータ (要件定義等の元情報)
├── preview.html      # 静的プレビューファイル
├── REQUIREMENT_DEFINITION.md
├── SPECIFICATION_DOCUMENT.md
├── TECHNICAL_DEFINITION.md
├── PROCESS_DEFINITION.md
├── QUALITY_DEFINITION.md
└── (node_modules/)   # 依存ライブラリ (ローカル開発時)
└── (dist/)           # ビルド成果物 (ローカル開発時)
```
*備考: `esm.sh` を利用したCDNベースのインポートのため、ローカルの `node_modules` は必須ではないが、開発効率のためにローカルセットアップも考慮。*