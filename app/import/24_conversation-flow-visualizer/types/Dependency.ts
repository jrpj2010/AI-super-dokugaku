// 依存関係エッジ関連の型定義

export interface DependencyEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: 'timeseries' | 'dependency';
  keywords: string[];
  strength: number; // 0-1の強度スコア
}

export interface DependencyAnalysisResult {
  edges: DependencyEdge[];
  keywordMap: Map<string, string[]>; // キーワード -> ノードIDリスト
  analysisTime: number; // 分析にかかった時間（ミリ秒）
}