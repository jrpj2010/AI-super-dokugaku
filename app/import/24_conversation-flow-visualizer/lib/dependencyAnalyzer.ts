// 依存関係分析ロジック
// Based on DEVELOPMENT_PLAN.md Section 3.2

import { TFIDFAnalyzer, TFIDFResult } from './tfidf';
import type { DependencyEdge } from '../types/Dependency';

interface Node {
  id: string;
  text: string;
}

export class DependencyAnalyzer {
  private tfidfAnalyzer: TFIDFAnalyzer;
  private similarityThreshold: number = 0.15; // 闾値を下げる
  private nodes: Node[];

  constructor(nodes: Node[]) {
    this.nodes = nodes;
    this.tfidfAnalyzer = new TFIDFAnalyzer();
    
    // 全ノードをTF-IDF分析器に追加
    nodes.forEach(node => {
      this.tfidfAnalyzer.addDocument(node.id, node.text);
    });
  }

  // ノード間の依存関係を検出
  detectDependencies(nodes: Node[]): DependencyEdge[] {
    const dependencies: DependencyEdge[] = [];
    const keywordsByNode = this.tfidfAnalyzer.extractKeywords(8); // より多くのキーワードを抽出
    
    // デバッグ情報を出力（本番環境ではコメントアウト）
    if (this.similarityThreshold < 0.2) {
      console.log('キーワード抽出結果:');
      keywordsByNode.forEach((keywords, nodeId) => {
        const nodeIndex = nodes.findIndex(n => n.id === nodeId);
        console.log(`ノード${nodeIndex + 1}: ${keywords.slice(0, 3).map(k => k.term).join(', ')}`);
      });
    }
    
    // 各ノードペアをチェック
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const sourceNode = nodes[i];
        const targetNode = nodes[j];
        
        // 話者関係の分析
        const conversationFlow = this.analyzeConversationFlow(sourceNode.text, targetNode.text);
        
        const sourceKeywords = keywordsByNode.get(sourceNode.id) || [];
        const targetKeywords = keywordsByNode.get(targetNode.id) || [];
        
        // 共通キーワードを検出
        const commonKeywords = this.findCommonKeywords(
          sourceKeywords,
          targetKeywords
        );
        
        const strength = this.calculateStrength(
          commonKeywords,
          sourceKeywords,
          targetKeywords
        );
        
        // 会話フローボーナス
        const finalStrength = strength + conversationFlow.bonus;
        
        if (finalStrength >= this.similarityThreshold || conversationFlow.isDirectResponse) {
          // 方向性を考慮（時系列または会話フロー）
          const [source, target] = conversationFlow.reversed ? 
            [targetNode, sourceNode] : [sourceNode, targetNode];
          
          dependencies.push({
            id: `dep-${source.id}-${target.id}`,
            sourceNodeId: source.id,
            targetNodeId: target.id,
            type: conversationFlow.isDirectResponse ? 'timeseries' : 'dependency',
            keywords: commonKeywords.map(k => k.term).slice(0, 5),
            strength: Math.min(finalStrength, 1)
          });
        }
      }
    }
    
    // 連続するノード間の時系列依存も追加（隣接ノードのみ）
    for (let i = 0; i < nodes.length - 1; i++) {
      // 話者が変わる場合のみ時系列エッジを追加
      const speaker1 = nodes[i].text.match(/^話者(\d+)[：:]/);
      const speaker2 = nodes[i + 1].text.match(/^話者(\d+)[：:]/);
      
      if (speaker1 && speaker2 && speaker1[1] !== speaker2[1]) {
        const hasExisting = dependencies.some(d => 
          (d.sourceNodeId === nodes[i].id && d.targetNodeId === nodes[i + 1].id) ||
          (d.sourceNodeId === nodes[i + 1].id && d.targetNodeId === nodes[i].id)
        );
        
        if (!hasExisting) {
          dependencies.push({
            id: `time-${nodes[i].id}-${nodes[i + 1].id}`,
            sourceNodeId: nodes[i].id,
            targetNodeId: nodes[i + 1].id,
            type: 'timeseries',
            keywords: ['会話フロー'],
            strength: 0.4
          });
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
    const termMap = new Map<string, TFIDFResult>();
    
    // 最初のキーワードセットをマップに格納
    keywords1.forEach(kw => termMap.set(kw.term, kw));
    
    // 2番目のキーワードセットと比較
    keywords2.forEach(kw2 => {
      const kw1 = termMap.get(kw2.term);
      if (kw1) {
        // 完全一致
        common.push({
          term: kw2.term,
          tfidf: (kw1.tfidf + kw2.tfidf) / 2,
          nodeId: `${kw1.nodeId}-${kw2.nodeId}`
        });
      } else {
        // 部分一致チェック
        keywords1.forEach(kw1 => {
          if (this.isSimilarTerm(kw1.term, kw2.term)) {
            common.push({
              term: `${kw1.term}/${kw2.term}`,
              tfidf: (kw1.tfidf + kw2.tfidf) / 2,
              nodeId: `${kw1.nodeId}-${kw2.nodeId}`
            });
          }
        });
      }
    });
    
    return common;
  }

  // 用語の類似性をチェック（簡易版）
  private isSimilarTerm(term1: string, term2: string): boolean {
    // 部分一致チェック（3文字以上の場合）
    if (term1.length >= 3 && term2.length >= 3) {
      // どちらかが他方を含む場合
      if (term1.includes(term2) || term2.includes(term1)) {
        return true;
      }
      
      // 共通部分文字列の長さが一定以上の場合
      const commonLength = this.getCommonSubstringLength(term1, term2);
      const minLength = Math.min(term1.length, term2.length);
      return commonLength / minLength >= 0.7;
    }
    return false;
  }

  // 最長共通部分文字列の長さを取得
  private getCommonSubstringLength(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    let maxLength = 0;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          maxLength = Math.max(maxLength, dp[i][j]);
        }
      }
    }

    return maxLength;
  }

  // 会話フローを分析
  private analyzeConversationFlow(text1: string, text2: string): {
    isDirectResponse: boolean;
    reversed: boolean;
    bonus: number;
  } {
    // 話者パターンを抽出
    const speaker1Match = text1.match(/^話者(\d+)[：:]/);
    const speaker2Match = text2.match(/^話者(\d+)[：:]/);
    
    // 質問パターン
    const questionPatterns = /[？か。]$|でしょうか|ですか|ますか/;
    const isQuestion1 = questionPatterns.test(text1);
    const isQuestion2 = questionPatterns.test(text2);
    
    // 応答パターン
    const responsePatterns = /^はい|いいえ|そうです|ちがいます|おっしゃる通り/;
    const isResponse2 = responsePatterns.test(text2);
    
    let isDirectResponse = false;
    let reversed = false;
    let bonus = 0;
    
    // 異なる話者間の会話
    if (speaker1Match && speaker2Match && speaker1Match[1] !== speaker2Match[1]) {
      bonus += 0.1;
      
      // 質問→回答パターン
      if (isQuestion1 && !isQuestion2) {
        isDirectResponse = true;
      }
      // 応答パターン
      if (isResponse2) {
        isDirectResponse = true;
      }
    }
    
    // 重要マーカーがある場合
    if (text1.includes('【重要】') || text2.includes('【重要】')) {
      bonus += 0.05;
    }
    
    return { isDirectResponse, reversed, bonus };
  }

  // 依存関係の強度を計算
  private calculateStrength(
    commonKeywords: TFIDFResult[],
    sourceKeywords: TFIDFResult[],
    targetKeywords: TFIDFResult[]
  ): number {
    if (commonKeywords.length === 0) return 0;
    
    // 共通キーワード数に基づくボーナス
    const countBonus = Math.min(commonKeywords.length * 0.05, 0.2);
    
    const commonScore = commonKeywords.reduce((sum, kw) => sum + kw.tfidf, 0);
    const sourceScore = sourceKeywords.reduce((sum, kw) => sum + kw.tfidf, 0);
    const targetScore = targetKeywords.reduce((sum, kw) => sum + kw.tfidf, 0);
    
    // Jaccard係数に似た計算（共通部分 / 和集合）
    const unionScore = sourceScore + targetScore - commonScore;
    const jaccardScore = unionScore > 0 ? commonScore / unionScore : 0;
    
    return Math.min(jaccardScore + countBonus, 1);
  }

  // 類似度閾値を設定
  setSimilarityThreshold(threshold: number): void {
    this.similarityThreshold = Math.max(0, Math.min(1, threshold));
  }

  // デバッグ情報を出力
  debugPrint(dependencies: DependencyEdge[]): void {
    console.log('=== Dependency Analysis Debug ===');
    console.log(`Total dependencies found: ${dependencies.length}`);
    console.log(`Similarity threshold: ${this.similarityThreshold}`);
    
    dependencies.slice(0, 5).forEach(dep => {
      console.log(`\n${dep.sourceNodeId} -> ${dep.targetNodeId}`);
      console.log(`  Keywords: ${dep.keywords.join(', ')}`);
      console.log(`  Strength: ${(dep.strength * 100).toFixed(1)}%`);
    });
  }
}