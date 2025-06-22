// 軽量TF-IDF分析器（パフォーマンス重視）

export interface TFIDFResult {
  term: string;
  tfidf: number;
  nodeId: string;
}

export class TFIDFAnalyzer {
  private documents: Map<string, string[]> = new Map();
  private documentFrequency: Map<string, number> = new Map();
  private totalDocuments: number = 0;

  constructor(nodes: Array<{ id: string; text: string }>) {
    // ドキュメントを登録
    nodes.forEach(node => {
      const terms = this.tokenize(node.text);
      this.documents.set(node.id, terms);
    });
    this.totalDocuments = nodes.length;
    
    // ドキュメント頻度を計算
    this.calculateDocumentFrequency();
  }

  private tokenize(text: string): string[] {
    // 話者マーカーを削除
    const cleanText = text.replace(/話者\d+[：:]\s*/, '');
    
    // 日本語の重要語を抽出（2文字以上）
    const words = cleanText.match(/[ぁ-んァ-ヶー一-龯０-９a-zA-Z]{2,}/g) || [];
    
    // ストップワードを除外
    const stopWords = new Set([
      'です', 'ます', 'ました', 'でした', 'ですね', 'ですが',
      'から', 'けど', 'けれど', 'でも', 'しかし', 'ので', 'のに',
      'よう', 'こと', 'もの', 'それ', 'これ', 'あれ', 'その', 'この',
      'という', 'といった', 'として', 'とても', 'すごく',
      'はい', 'ええ', 'うん', 'いいえ', 'ちょっと'
    ]);
    
    return words.filter(word => !stopWords.has(word));
  }

  private calculateDocumentFrequency(): void {
    this.documents.forEach(terms => {
      const uniqueTerms = new Set(terms);
      uniqueTerms.forEach(term => {
        this.documentFrequency.set(term, (this.documentFrequency.get(term) || 0) + 1);
      });
    });
  }

  // 各ノードのキーワードを抽出
  extractKeywords(topN: number = 5): Map<string, TFIDFResult[]> {
    const result = new Map<string, TFIDFResult[]>();
    
    this.documents.forEach((terms, nodeId) => {
      const tfidfScores: TFIDFResult[] = [];
      const termFrequency = new Map<string, number>();
      
      // 語頻度を計算
      terms.forEach(term => {
        termFrequency.set(term, (termFrequency.get(term) || 0) + 1);
      });
      
      // TF-IDFスコアを計算
      termFrequency.forEach((tf, term) => {
        const df = this.documentFrequency.get(term) || 0;
        const idf = Math.log(this.totalDocuments / (1 + df));
        const tfidf = (tf / terms.length) * idf;
        
        tfidfScores.push({ term, tfidf, nodeId });
      });
      
      // スコアでソートしてトップNを取得
      tfidfScores.sort((a, b) => b.tfidf - a.tfidf);
      result.set(nodeId, tfidfScores.slice(0, topN));
    });
    
    return result;
  }

  // 2つのノード間の類似度を計算
  calculateSimilarity(nodeId1: string, nodeId2: string): number {
    const terms1 = new Set(this.documents.get(nodeId1) || []);
    const terms2 = new Set(this.documents.get(nodeId2) || []);
    
    if (terms1.size === 0 || terms2.size === 0) return 0;
    
    const intersection = new Set([...terms1].filter(t => terms2.has(t)));
    const union = new Set([...terms1, ...terms2]);
    
    return intersection.size / union.size;
  }
}