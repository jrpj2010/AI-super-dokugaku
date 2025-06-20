# 会話フロービジュアライザー 開発計画書

**作成日**: 2025年6月20日  
**対象バージョン**: v0.2.3-definitions → v0.3.0-dependency-edges  
**計画期間**: 2025年6月〜7月

## 1. エグゼクティブサマリー

本計画書は、会話フロービジュアライザーの次期開発フェーズ（フェーズ1: MVP）における実装計画を定義します。特に緊急性の高いGeminiモデル移行と、主要機能である依存関係エッジの実装に焦点を当てています。

### 主要目標
1. **2025年7月15日期限**: Geminiモデルの移行完了
2. **フェーズ1コア機能**: TF-IDFベースの依存関係エッジ実装
3. **品質向上**: パフォーマンス最適化とエラーハンドリング強化

## 2. 緊急対応事項（最優先）

### 2.1 Geminiモデル移行（期限: 2025年7月15日）

#### 現状
- 使用中モデル: `gemini-2.5-flash-preview-04-17`（廃止予定）
- 移行先モデル: `gemini-2.5-flash`（一般提供開始済み）

#### 実装タスク
```typescript
// 1. モデル名を環境変数化
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// 2. GoogleGenerativeAI初期化部分を更新
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: GEMINI_MODEL,
  generationConfig: {
    temperature: 0.7,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  }
});

// 3. プロンプトの最適化（新モデル対応）
const improvedPrompt = `
あなたは音声文字起こしと会話分析のエキスパートです。
以下の音声を文字起こしし、意味のある単位で区切ってください。

区切りの基準：
- 話題の転換点
- 文の完了
- 重要なキーワードの出現
- 約50-100文字を目安

各セグメントの後に必ず「---NODE_BREAK---」を挿入してください。

出力例：
商談の開始にあたり、本日の議題を確認させていただきます。
---NODE_BREAK---
まず最初に、前回のミーティングでご要望いただいた機能について説明します。
---NODE_BREAK---
`;
```

### 2.2 SDK更新

#### 現状確認と更新手順
```bash
# 1. 現在のバージョン確認
npm list @google/genai

# 2. 最新版へ更新
npm install @google/genai@latest

# 3. 型定義の確認
npm install --save-dev @types/google__genai
```

#### コード修正箇所
```typescript
// 旧インポート（確認）
import { GoogleGenerativeAI } from '@google/generative-ai';

// 新インポート（推奨）
import { GoogleGenerativeAI } from '@google/genai';
```

## 3. フェーズ1実装計画：依存関係エッジ（タスク12）

### 3.1 TF-IDF実装

#### 3.1.1 基本アルゴリズム実装

```typescript
// types/Analysis.ts
interface TFIDFResult {
  term: string;
  tfidf: number;
  nodeId: string;
}

interface KeywordInfo {
  keyword: string;
  score: number;
  nodeIds: string[];
}

// lib/tfidf.ts
class TFIDFAnalyzer {
  private documents: Map<string, string[]> = new Map();
  private documentFrequency: Map<string, number> = new Map();
  private totalDocuments: number = 0;

  // 日本語テキストの単語分割（簡易版）
  private tokenize(text: string): string[] {
    // 基本的な処理: 句読点で分割、助詞を除外
    const stopWords = ['の', 'に', 'は', 'を', 'が', 'で', 'と', 'から', 'まで', 'より'];
    
    // 句読点とスペースで分割
    const tokens = text
      .replace(/[。、！？\s]+/g, ' ')
      .split(' ')
      .filter(token => token.length > 1)
      .filter(token => !stopWords.includes(token));
    
    return tokens;
  }

  // ドキュメント（ノード）を追加
  addDocument(nodeId: string, text: string): void {
    const tokens = this.tokenize(text.toLowerCase());
    this.documents.set(nodeId, tokens);
    this.totalDocuments++;
    
    // ドキュメント頻度を更新
    const uniqueTokens = new Set(tokens);
    uniqueTokens.forEach(token => {
      this.documentFrequency.set(
        token, 
        (this.documentFrequency.get(token) || 0) + 1
      );
    });
  }

  // TF（Term Frequency）を計算
  private calculateTF(term: string, document: string[]): number {
    const termCount = document.filter(token => token === term).length;
    return termCount / document.length;
  }

  // IDF（Inverse Document Frequency）を計算
  private calculateIDF(term: string): number {
    const df = this.documentFrequency.get(term) || 0;
    if (df === 0) return 0;
    return Math.log(this.totalDocuments / df);
  }

  // TF-IDFスコアを計算
  calculateTFIDF(nodeId: string): TFIDFResult[] {
    const document = this.documents.get(nodeId);
    if (!document) return [];

    const tfidfScores: TFIDFResult[] = [];
    const uniqueTerms = new Set(document);

    uniqueTerms.forEach(term => {
      const tf = this.calculateTF(term, document);
      const idf = this.calculateIDF(term);
      const tfidf = tf * idf;
      
      if (tfidf > 0) {
        tfidfScores.push({ term, tfidf, nodeId });
      }
    });

    // スコアの高い順にソート
    return tfidfScores.sort((a, b) => b.tfidf - a.tfidf);
  }

  // 全ノードのキーワードを抽出（上位N個）
  extractKeywords(topN: number = 5): Map<string, TFIDFResult[]> {
    const keywordsByNode = new Map<string, TFIDFResult[]>();
    
    this.documents.forEach((_, nodeId) => {
      const keywords = this.calculateTFIDF(nodeId).slice(0, topN);
      keywordsByNode.set(nodeId, keywords);
    });
    
    return keywordsByNode;
  }
}
```

### 3.2 依存関係検出ロジック

#### 3.2.1 キーワードマッチングによる依存関係検出

```typescript
// lib/dependencyAnalyzer.ts
interface DependencyEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: 'timeseries' | 'dependency';
  keywords: string[];
  strength: number; // 0-1の強度スコア
}

class DependencyAnalyzer {
  private tfidfAnalyzer: TFIDFAnalyzer;
  private similarityThreshold: number = 0.3;

  constructor(nodes: Node[]) {
    this.tfidfAnalyzer = new TFIDFAnalyzer();
    
    // 全ノードをTF-IDF分析器に追加
    nodes.forEach(node => {
      this.tfidfAnalyzer.addDocument(node.id, node.text);
    });
  }

  // ノード間の依存関係を検出
  detectDependencies(nodes: Node[]): DependencyEdge[] {
    const dependencies: DependencyEdge[] = [];
    const keywordsByNode = this.tfidfAnalyzer.extractKeywords(5);
    
    // 各ノードペアをチェック
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const sourceNode = nodes[i];
        const targetNode = nodes[j];
        
        const sourceKeywords = keywordsByNode.get(sourceNode.id) || [];
        const targetKeywords = keywordsByNode.get(targetNode.id) || [];
        
        // 共通キーワードを検出
        const commonKeywords = this.findCommonKeywords(
          sourceKeywords,
          targetKeywords
        );
        
        if (commonKeywords.length > 0) {
          const strength = this.calculateStrength(
            commonKeywords,
            sourceKeywords,
            targetKeywords
          );
          
          if (strength >= this.similarityThreshold) {
            dependencies.push({
              id: `dep-${sourceNode.id}-${targetNode.id}`,
              sourceNodeId: sourceNode.id,
              targetNodeId: targetNode.id,
              type: 'dependency',
              keywords: commonKeywords.map(k => k.term),
              strength
            });
          }
        }
      }
    }
    
    return dependencies;
  }

  // 共通キーワードを検出
  private findCommonKeywords(
    keywords1: TFIDFResult[],
    keywords2: TFIDFResult[]
  ): TFIDFResult[] {
    const common: TFIDFResult[] = [];
    
    keywords1.forEach(kw1 => {
      const match = keywords2.find(kw2 => 
        kw2.term === kw1.term || 
        this.isSimilarTerm(kw1.term, kw2.term)
      );
      
      if (match) {
        common.push({
          term: kw1.term,
          tfidf: (kw1.tfidf + match.tfidf) / 2,
          nodeId: `${kw1.nodeId}-${match.nodeId}`
        });
      }
    });
    
    return common;
  }

  // 用語の類似性をチェック（簡易版）
  private isSimilarTerm(term1: string, term2: string): boolean {
    // 部分一致チェック（3文字以上の場合）
    if (term1.length >= 3 && term2.length >= 3) {
      return term1.includes(term2) || term2.includes(term1);
    }
    return false;
  }

  // 依存関係の強度を計算
  private calculateStrength(
    commonKeywords: TFIDFResult[],
    sourceKeywords: TFIDFResult[],
    targetKeywords: TFIDFResult[]
  ): number {
    const commonScore = commonKeywords.reduce((sum, kw) => sum + kw.tfidf, 0);
    const sourceScore = sourceKeywords.reduce((sum, kw) => sum + kw.tfidf, 0);
    const targetScore = targetKeywords.reduce((sum, kw) => sum + kw.tfidf, 0);
    
    // Jaccard係数に似た計算
    return commonScore / (sourceScore + targetScore - commonScore);
  }
}
```

### 3.3 UI実装

#### 3.3.1 依存関係エッジの描画コンポーネント

```typescript
// components/DependencyEdge.tsx
interface DependencyEdgeProps {
  edge: DependencyEdge;
  sourcePosition: NodePosition;
  targetPosition: NodePosition;
  onHover?: (edge: DependencyEdge | null) => void;
}

const DependencyEdge: React.FC<DependencyEdgeProps> = ({
  edge,
  sourcePosition,
  targetPosition,
  onHover
}) => {
  // エッジの中心点を計算
  const sourceCenterX = sourcePosition.x + sourcePosition.width / 2;
  const sourceCenterY = sourcePosition.y + sourcePosition.height / 2;
  const targetCenterX = targetPosition.x + targetPosition.width / 2;
  const targetCenterY = targetPosition.y + targetPosition.height / 2;
  
  // 強度に基づいて透明度を調整
  const opacity = 0.3 + (edge.strength * 0.7);
  const strokeWidth = 1 + (edge.strength * 2);
  
  return (
    <g>
      <line
        x1={sourceCenterX}
        y1={sourceCenterY}
        x2={targetCenterX}
        y2={targetCenterY}
        stroke="#5c6b7a"
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
        strokeDasharray="5,5"
        className="dependency-edge"
        onMouseEnter={() => onHover?.(edge)}
        onMouseLeave={() => onHover?.(null)}
        style={{ cursor: 'pointer' }}
      />
      {/* ホバー時のヒットエリアを拡大 */}
      <line
        x1={sourceCenterX}
        y1={sourceCenterY}
        x2={targetCenterX}
        y2={targetCenterY}
        stroke="transparent"
        strokeWidth={10}
        onMouseEnter={() => onHover?.(edge)}
        onMouseLeave={() => onHover?.(null)}
        style={{ cursor: 'pointer' }}
      />
    </g>
  );
};

// components/EdgeTooltip.tsx
interface EdgeTooltipProps {
  edge: DependencyEdge | null;
  position: { x: number; y: number };
}

const EdgeTooltip: React.FC<EdgeTooltipProps> = ({ edge, position }) => {
  if (!edge) return null;
  
  return (
    <div
      className="edge-tooltip"
      style={{
        position: 'absolute',
        left: position.x + 10,
        top: position.y - 30,
        background: '#1c1f23',
        color: '#e9ecef',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        maxWidth: '200px'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        共通キーワード
      </div>
      <div>
        {edge.keywords.join('、')}
      </div>
      <div style={{ marginTop: '4px', opacity: 0.7 }}>
        関連度: {(edge.strength * 100).toFixed(0)}%
      </div>
    </div>
  );
};
```

#### 3.3.2 メインコンポーネントへの統合

```typescript
// index.tsx への追加実装
const App: React.FC = () => {
  // 既存のstate...
  
  // 依存関係エッジ用の新しいstate
  const [dependencyEdges, setDependencyEdges] = useState<DependencyEdge[]>([]);
  const [hoveredEdge, setHoveredEdge] = useState<DependencyEdge | null>(null);
  const [showDependencies, setShowDependencies] = useState(true);
  
  // ノード生成後に依存関係を分析
  useEffect(() => {
    if (nodes.length > 1) {
      const analyzer = new DependencyAnalyzer(nodes);
      const dependencies = analyzer.detectDependencies(nodes);
      setDependencyEdges(dependencies);
    }
  }, [nodes]);
  
  // 既存のrender部分に追加
  return (
    <div className="app">
      {/* 既存のUI要素 */}
      
      {/* キャンバスエリア内のSVG部分を更新 */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        {/* 時系列エッジ（既存） */}
        {edges.map(edge => (
          <TimeSeriesEdge key={edge.id} edge={edge} {...otherProps} />
        ))}
        
        {/* 依存関係エッジ（新規） */}
        {showDependencies && dependencyEdges.map(edge => {
          const sourcePos = nodePositions[edge.sourceNodeId];
          const targetPos = nodePositions[edge.targetNodeId];
          
          if (!sourcePos || !targetPos) return null;
          
          return (
            <DependencyEdge
              key={edge.id}
              edge={edge}
              sourcePosition={sourcePos}
              targetPosition={targetPos}
              onHover={setHoveredEdge}
            />
          );
        })}
      </svg>
      
      {/* エッジツールチップ */}
      {hoveredEdge && (
        <EdgeTooltip
          edge={hoveredEdge}
          position={{ x: mousePosition.x, y: mousePosition.y }}
        />
      )}
      
      {/* 依存関係表示トグルボタン */}
      <button
        className="toggle-dependencies"
        onClick={() => setShowDependencies(!showDependencies)}
        style={{
          position: 'absolute',
          bottom: '120px',
          right: '20px',
          padding: '8px 16px',
          background: showDependencies ? '#3a8cff' : '#2a2d31',
          color: '#e9ecef',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {showDependencies ? '依存関係を隠す' : '依存関係を表示'}
      </button>
    </div>
  );
};
```

## 4. パフォーマンス最適化

### 4.1 TF-IDF処理の最適化

```typescript
// Web Workerを使用した並列処理
// workers/tfidfWorker.ts
self.addEventListener('message', (event) => {
  const { nodes } = event.data;
  
  const analyzer = new TFIDFAnalyzer();
  nodes.forEach(node => {
    analyzer.addDocument(node.id, node.text);
  });
  
  const keywords = analyzer.extractKeywords(5);
  
  self.postMessage({ keywords });
});

// メインスレッドでの使用
const tfidfWorker = new Worker('./workers/tfidfWorker.js');
tfidfWorker.postMessage({ nodes });
tfidfWorker.onmessage = (event) => {
  const { keywords } = event.data;
  // 結果を処理
};
```

### 4.2 React最適化

```typescript
// メモ化によるレンダリング最適化
const DependencyEdgeMemo = React.memo(DependencyEdge, (prevProps, nextProps) => {
  return (
    prevProps.edge.id === nextProps.edge.id &&
    prevProps.edge.strength === nextProps.edge.strength &&
    prevProps.sourcePosition === nextProps.sourcePosition &&
    prevProps.targetPosition === nextProps.targetPosition
  );
});

// useCallbackによるイベントハンドラ最適化
const handleEdgeHover = useCallback((edge: DependencyEdge | null) => {
  setHoveredEdge(edge);
}, []);
```

## 5. テスト計画

### 5.1 単体テスト項目

```typescript
// __tests__/tfidf.test.ts
describe('TFIDFAnalyzer', () => {
  test('日本語テキストの正しいトークン化', () => {
    const analyzer = new TFIDFAnalyzer();
    const tokens = analyzer.tokenize('これはテストです。重要なキーワードを含みます。');
    expect(tokens).toContain('テスト');
    expect(tokens).toContain('重要');
    expect(tokens).toContain('キーワード');
  });
  
  test('TF-IDFスコアの正確な計算', () => {
    const analyzer = new TFIDFAnalyzer();
    analyzer.addDocument('1', 'テスト テスト 重要');
    analyzer.addDocument('2', 'テスト データ');
    
    const scores = analyzer.calculateTFIDF('1');
    const testScore = scores.find(s => s.term === 'テスト');
    const importantScore = scores.find(s => s.term === '重要');
    
    expect(importantScore.tfidf).toBeGreaterThan(testScore.tfidf);
  });
});
```

### 5.2 統合テストシナリオ

1. **基本フロー**
   - 音声録音開始
   - 3つ以上のノード生成
   - 依存関係エッジの自動生成確認
   - エッジホバーでキーワード表示

2. **パフォーマンステスト**
   - 100ノード生成時の処理時間測定
   - 600ノード（1時間想定）での動作確認

## 6. 実装スケジュール

### Week 1（6/20-6/26）
- [ ] Geminiモデル移行実装
- [ ] SDK更新と動作確認
- [ ] TF-IDF基本実装

### Week 2（6/27-7/3）
- [ ] 依存関係検出ロジック実装
- [ ] UI基本実装
- [ ] 単体テスト作成

### Week 3（7/4-7/10）
- [ ] パフォーマンス最適化
- [ ] 統合テスト実施
- [ ] バグ修正

### Week 4（7/11-7/15）
- [ ] 最終テストと調整
- [ ] ドキュメント更新
- [ ] v0.3.0リリース

## 7. リスク管理

### 7.1 技術的リスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|----------|------|
| Geminiモデル移行の互換性問題 | 高 | 中 | 早期テスト実施、ロールバック計画 |
| 日本語形態素解析の精度 | 中 | 高 | 段階的改善、外部ライブラリ検討 |
| 大量ノードでのパフォーマンス | 高 | 中 | Web Worker活用、仮想化実装 |

### 7.2 スケジュールリスク

- **7月15日期限厳守**: Geminiモデル廃止
- **バッファ期間**: Week 4を調整期間として確保

## 8. 成功基準

1. **機能要件**
   - Geminiモデル移行完了（7/15まで）
   - 依存関係エッジの正確な表示
   - 600ノードでの安定動作

2. **パフォーマンス要件**
   - ノード生成から依存関係表示まで3秒以内
   - 60fps維持（ズーム・パン操作時）

3. **品質要件**
   - エラー率1%未満
   - ユーザビリティテスト合格

## 9. 次のフェーズへの準備

フェーズ1完了後、以下の機能実装を検討：
- ハンバーガーメニュー機能
- エクスポート機能（PNG/SVG/JSON）
- IndexedDBローカル保存
- キーボードショートカット

---

*本計画書は定期的に更新され、進捗に応じて調整されます。*