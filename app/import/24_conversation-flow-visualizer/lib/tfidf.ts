// TF-IDF Analyzer for Japanese text
// Based on DEVELOPMENT_PLAN.md Section 3.1

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

export class TFIDFAnalyzer {
  private documents: Map<string, string[]> = new Map();
  private documentFrequency: Map<string, number> = new Map();
  private totalDocuments: number = 0;

  // 日本語テキストの単語分割（簡易版）
  private tokenize(text: string): string[] {
    // 基本的な処理: 句読点で分割、助詞を除外
    const stopWords = ['の', 'に', 'は', 'を', 'が', 'で', 'と', 'から', 'まで', 'より', 'へ', 'や', 'も', 'だ', 'です', 'ます'];
    
    // 句読点とスペースで分割
    const tokens = text
      .replace(/[。、！？\s]+/g, ' ')
      .split(' ')
      .filter(token => token.length > 1)
      .filter(token => !stopWords.includes(token))
      // カタカナ、ひらがな、漢字、英数字を含む単語のみ抽出
      .filter(token => /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\w]+/.test(token));
    
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

  // 全文書から重要キーワードを集計
  getGlobalKeywords(topN: number = 10): KeywordInfo[] {
    const keywordMap = new Map<string, { score: number; nodeIds: Set<string> }>();
    
    this.documents.forEach((_, nodeId) => {
      const keywords = this.calculateTFIDF(nodeId);
      keywords.forEach(({ term, tfidf }) => {
        if (!keywordMap.has(term)) {
          keywordMap.set(term, { score: 0, nodeIds: new Set() });
        }
        const info = keywordMap.get(term)!;
        info.score += tfidf;
        info.nodeIds.add(nodeId);
      });
    });
    
    // スコア順にソートして返す
    return Array.from(keywordMap.entries())
      .map(([keyword, { score, nodeIds }]) => ({
        keyword,
        score,
        nodeIds: Array.from(nodeIds)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }

  // デバッグ用: 分析結果を表示
  debugPrint(): void {
    console.log('=== TF-IDF Analysis Debug ===');
    console.log(`Total documents: ${this.totalDocuments}`);
    console.log(`Unique terms: ${this.documentFrequency.size}`);
    
    const globalKeywords = this.getGlobalKeywords(5);
    console.log('\nTop 5 global keywords:');
    globalKeywords.forEach(({ keyword, score, nodeIds }) => {
      console.log(`  ${keyword}: ${score.toFixed(3)} (in ${nodeIds.length} nodes)`);
    });
  }
}