// TF-IDF分析関連の型定義

export interface TFIDFResult {
  term: string;
  tfidf: number;
  nodeId: string;
}

export interface KeywordInfo {
  keyword: string;
  score: number;
  nodeIds: string[];
}

export interface AnalysisConfig {
  topKeywordsPerNode: number;
  globalKeywordsCount: number;
  minimumTFIDFScore: number;
  similarityThreshold: number;
}