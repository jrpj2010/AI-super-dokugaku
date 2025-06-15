# メッセージ徹底解析サイトのモジュール設計

## サイト構造
- `index.html`: ホームページ
- `message_analysis.html`: メッセージ分析ページ
- `structure_analysis.html`: 構造分析ページ
- `practical_advice.html`: 実践アドバイスページ
- `interactive_tool.html`: インタラクティブ分析ツール

## スタイルシート
- `css/styles.css`: 全体のスタイル定義

## JavaScript モジュール

### コアモジュール
- `js/app.js`: アプリケーションのエントリポイント

### 分析モジュール
- `js/analyzer.js`: メッセージ分析機能を提供するモジュール
  ```typescript
  interface AnalysisResult {
    themes: string[];
    structure: StructureAnalysis;
    advice: string[];
  }

  interface StructureAnalysis {
    mainPoints: string[];
    logicalFlow: string[];
    strengths: string[];
    weaknesses: string[];
  }

  class MessageAnalyzer {
    constructor();
    
    // メッセージを分析して結果を返す
    async analyzeMessage(text: string): Promise<AnalysisResult>;
    
    // メッセージの主要テーマを抽出
    identifyThemes(text: string): string[];
    
    // メッセージの構造を分析
    analyzeStructure(text: string): StructureAnalysis;
    
    // 実践的アドバイスを生成
    generateAdvice(analysis: StructureAnalysis): string[];
  }
  ```

### 視覚化モジュール
- `js/visualizer.js`: 分析結果を視覚的に表現するモジュール
  ```typescript
  class VisualizationManager {
    constructor(containerId: string);
    
    // 構造分析結果を視覚化
    renderStructureVisualization(structureData: StructureAnalysis): void;
    
    // テーマの関連性を視覚化
    renderThemeRelationship(themes: string[]): void;
    
    // アドバイス要素をカテゴリー別に視覚化
    renderAdviceCategories(advice: string[]): void;
  }
  ```

### インタラクティブツールモジュール
- `js/interactive-tool.js`: ユーザー入力メッセージを分析するツール
  ```typescript
  class InteractiveTool {
    constructor(formId: string, resultContainerId: string);
    
    // フォーム送信のイベントハンドラを設定
    setupEventListeners(): void;
    
    // メッセージを処理して分析結果を表示
    async processMessage(message: string): Promise<void>;
    
    // 分析結果を表示
    displayResults(results: AnalysisResult): void;
    
    // サンプルメッセージを設定
    loadSampleMessage(): void;
  }
  ```

### ユーティリティモジュール
- `js/utils.js`: 共通のユーティリティ関数
  ```typescript
  // テキストからキーワードを抽出
  function extractKeywords(text: string): string[];
  
  // 結果をローカルストレージに保存
  function saveAnalysisResult(id: string, result: AnalysisResult): void;
  
  // ローカルストレージから結果を取得
  function getAnalysisResult(id: string): AnalysisResult | null;
  ```

## データモデル
- サンプルメッセージと分析結果の格納形式
  ```typescript
  interface SampleMessage {
    id: string;
    title: string;
    content: string;
    analysis: AnalysisResult;
  }
  
  const sampleMessages: SampleMessage[] = [
    // サンプルデータの定義
  ];
  ```

## ページ間の相互作用
1. ユーザーがインタラクティブツールでメッセージを入力
2. 分析モジュールがメッセージを処理
3. 視覚化モジュールが結果をレンダリング
4. ユーザーは詳細な分析要素を閲覧可能

## レスポンシブ対応
- モバイルファーストアプローチ
- 画面サイズに応じた視覚化要素の調整
- タッチインタラクション対応