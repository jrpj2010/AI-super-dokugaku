// 会話構造分析エンジン
// 伏線回収、会話分岐、テーマ展開を検出

import { TFIDFAnalyzer, TFIDFResult } from './tfidf';

export interface ConversationPattern {
  id: string;
  type: 'foreshadowing' | 'callback' | 'branch' | 'question' | 'answer' | 'theme_shift';
  nodeId: string;
  relatedNodeIds: string[];
  keywords: string[];
  strength: number;
  description: string;
}

export interface ThemeCluster {
  id: string;
  name: string;
  nodeIds: string[];
  keywords: string[];
  color: string;
  importance: number;
}

interface Node {
  id: string;
  text: string;
}

export class ConversationAnalyzer {
  private nodes: Node[];
  private tfidfAnalyzer: TFIDFAnalyzer;

  constructor(nodes: Node[]) {
    this.nodes = nodes || [];
    // TFIDFAnalyzerにnodesを渡す
    this.tfidfAnalyzer = new TFIDFAnalyzer(this.nodes);
  }

  // 会話パターンを分析
  analyzeConversationPatterns(): ConversationPattern[] {
    const patterns: ConversationPattern[] = [];
    
    // 質問・回答パターンの検出
    patterns.push(...this.detectQuestionAnswerPatterns());
    
    // 伏線・回収パターンの検出
    patterns.push(...this.detectForeshadowingPatterns());
    
    // 会話分岐ポイントの検出
    patterns.push(...this.detectBranchPoints());
    
    // テーマシフトの検出
    patterns.push(...this.detectThemeShifts());
    
    return patterns;
  }

  // 質問・回答パターンの検出
  private detectQuestionAnswerPatterns(): ConversationPattern[] {
    const patterns: ConversationPattern[] = [];
    
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const currentNode = this.nodes[i];
      const nextNode = this.nodes[i + 1];
      
      // 質問パターンの検出
      const questionIndicators = /[？?]|でしょうか|ですか|ますか|どう思い|いかが/;
      const isQuestion = questionIndicators.test(currentNode.text);
      
      if (isQuestion) {
        // 話者が異なる場合の回答を検出
        const currentSpeaker = this.extractSpeaker(currentNode.text);
        const nextSpeaker = this.extractSpeaker(nextNode.text);
        
        if (currentSpeaker !== nextSpeaker) {
          patterns.push({
            id: `qa-${currentNode.id}-${nextNode.id}`,
            type: 'question',
            nodeId: currentNode.id,
            relatedNodeIds: [nextNode.id],
            keywords: this.extractKeywords(currentNode.text, 3),
            strength: 0.8,
            description: '質問→回答パターン'
          });
          
          patterns.push({
            id: `ans-${nextNode.id}-${currentNode.id}`,
            type: 'answer',
            nodeId: nextNode.id,
            relatedNodeIds: [currentNode.id],
            keywords: this.extractKeywords(nextNode.text, 3),
            strength: 0.8,
            description: '回答'
          });
        }
      }
    }
    
    return patterns;
  }

  // 伏線・回収パターンの検出
  private detectForeshadowingPatterns(): ConversationPattern[] {
    const patterns: ConversationPattern[] = [];
    const keywordsByNode = this.tfidfAnalyzer.extractKeywords(5);
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 3; j < this.nodes.length; j++) { // 3つ以上離れたノードを対象
        const sourceNode = this.nodes[i];
        const targetNode = this.nodes[j];
        
        const sourceKeywords = keywordsByNode.get(sourceNode.id) || [];
        const targetKeywords = keywordsByNode.get(targetNode.id) || [];
        
        // 共通キーワードの検出
        const commonKeywords = this.findCommonKeywords(sourceKeywords, targetKeywords);
        
        if (commonKeywords.length >= 2) {
          const strength = this.calculateCallbackStrength(sourceNode.text, targetNode.text, commonKeywords);
          
          if (strength > 0.4) {
            patterns.push({
              id: `foreshadow-${sourceNode.id}-${targetNode.id}`,
              type: 'foreshadowing',
              nodeId: sourceNode.id,
              relatedNodeIds: [targetNode.id],
              keywords: commonKeywords.map(k => k.term),
              strength,
              description: `伏線設置: ${commonKeywords[0].term}について`
            });
            
            patterns.push({
              id: `callback-${targetNode.id}-${sourceNode.id}`,
              type: 'callback',
              nodeId: targetNode.id,
              relatedNodeIds: [sourceNode.id],
              keywords: commonKeywords.map(k => k.term),
              strength,
              description: `伏線回収: ${commonKeywords[0].term}の展開`
            });
          }
        }
      }
    }
    
    return patterns;
  }

  // 会話分岐ポイントの検出
  private detectBranchPoints(): ConversationPattern[] {
    const patterns: ConversationPattern[] = [];
    const keywordsByNode = this.tfidfAnalyzer.extractKeywords(5);
    
    for (let i = 1; i < this.nodes.length - 1; i++) {
      const prevNode = this.nodes[i - 1];
      const currentNode = this.nodes[i];
      const nextNode = this.nodes[i + 1];
      
      const prevKeywords = keywordsByNode.get(prevNode.id) || [];
      const currentKeywords = keywordsByNode.get(currentNode.id) || [];
      const nextKeywords = keywordsByNode.get(nextNode.id) || [];
      
      // テーマの急激な変化を検出
      const prevSimilarity = this.calculateSimilarity(prevKeywords, currentKeywords);
      const nextSimilarity = this.calculateSimilarity(currentKeywords, nextKeywords);
      
      // 分岐ポイントの条件: 前後のノードとの類似度が両方とも低い
      if (prevSimilarity < 0.3 && nextSimilarity < 0.3) {
        // 分岐キーワードを検出
        const branchIndicators = /ところで|話は変わ|そうい[えう]ば|別の|次に|さて/;
        const isBranchPoint = branchIndicators.test(currentNode.text);
        
        if (isBranchPoint || (prevSimilarity + nextSimilarity) < 0.4) {
          patterns.push({
            id: `branch-${currentNode.id}`,
            type: 'branch',
            nodeId: currentNode.id,
            relatedNodeIds: [prevNode.id, nextNode.id],
            keywords: currentKeywords.slice(0, 3).map(k => k.term),
            strength: 1 - (prevSimilarity + nextSimilarity) / 2,
            description: '会話分岐ポイント'
          });
        }
      }
    }
    
    return patterns;
  }

  // テーマシフトの検出
  private detectThemeShifts(): ConversationPattern[] {
    const patterns: ConversationPattern[] = [];
    const keywordsByNode = this.tfidfAnalyzer.extractKeywords(5);
    
    for (let i = 0; i < this.nodes.length - 2; i++) {
      const currentNode = this.nodes[i];
      const nextNode = this.nodes[i + 1];
      
      const currentKeywords = keywordsByNode.get(currentNode.id) || [];
      const nextKeywords = keywordsByNode.get(nextNode.id) || [];
      
      const similarity = this.calculateSimilarity(currentKeywords, nextKeywords);
      
      // テーマの大きな変化
      if (similarity < 0.2) {
        patterns.push({
          id: `theme-shift-${currentNode.id}-${nextNode.id}`,
          type: 'theme_shift',
          nodeId: currentNode.id,
          relatedNodeIds: [nextNode.id],
          keywords: currentKeywords.slice(0, 2).map(k => k.term),
          strength: 1 - similarity,
          description: 'テーマ転換'
        });
      }
    }
    
    return patterns;
  }

  // テーマクラスターを生成
  generateThemeClusters(): ThemeCluster[] {
    const keywordsByNode = this.tfidfAnalyzer.extractKeywords(5);
    const clusters: ThemeCluster[] = [];
    const processedNodes = new Set<string>();
    
    // クラスター色のパレット
    const colors = [
      '#6366f1', // 紫
      '#10b981', // 緑
      '#f59e0b', // オレンジ
      '#ef4444', // 赤
      '#8b5cf6', // 濃い紫
      '#06b6d4', // シアン
      '#84cc16', // ライム
      '#f97316'  // 深いオレンジ
    ];
    
    let colorIndex = 0;
    
    this.nodes.forEach((node, index) => {
      if (processedNodes.has(node.id)) return;
      
      const nodeKeywords = keywordsByNode.get(node.id) || [];
      const clusterNodes = [node.id];
      processedNodes.add(node.id);
      
      // 類似ノードを探してクラスターに追加
      this.nodes.forEach((otherNode, otherIndex) => {
        if (otherIndex <= index || processedNodes.has(otherNode.id)) return;
        
        const otherKeywords = keywordsByNode.get(otherNode.id) || [];
        const similarity = this.calculateSimilarity(nodeKeywords, otherKeywords);
        
        if (similarity > 0.4) {
          clusterNodes.push(otherNode.id);
          processedNodes.add(otherNode.id);
        }
      });
      
      // クラスター名を生成（最も重要なキーワード）
      const topKeywords = nodeKeywords.slice(0, 3).map(k => k.term);
      
      // より意味のあるテーマ名を生成
      const clusterName = this.generateMeaningfulThemeName(topKeywords, clusterNodes.map(id => 
        this.nodes.find(n => n.id === id)?.text || ''
      ));
      
      clusters.push({
        id: `cluster-${clusters.length}`,
        name: clusterName,
        nodeIds: clusterNodes,
        keywords: topKeywords,
        color: colors[colorIndex % colors.length],
        importance: clusterNodes.length
      });
      
      colorIndex++;
    });
    
    return clusters.sort((a, b) => b.importance - a.importance);
  }

  // ユーティリティメソッド
  private extractSpeaker(text: string): string {
    const match = text.match(/^話者(\d+)[：:]/);
    return match ? match[1] : 'unknown';
  }

  private extractKeywords(text: string, count: number): string[] {
    const cleanText = text.replace(/話者\d+[：:]/, '');
    const words = cleanText.split(/[\s、。！？]+/).filter(w => w.length >= 2);
    return words.slice(0, count);
  }

  private findCommonKeywords(keywords1: TFIDFResult[], keywords2: TFIDFResult[]): TFIDFResult[] {
    const common: TFIDFResult[] = [];
    const termMap = new Map<string, TFIDFResult>();
    
    keywords1.forEach(kw => termMap.set(kw.term, kw));
    
    keywords2.forEach(kw2 => {
      const kw1 = termMap.get(kw2.term);
      if (kw1) {
        common.push({
          term: kw2.term,
          tfidf: (kw1.tfidf + kw2.tfidf) / 2,
          nodeId: `${kw1.nodeId}-${kw2.nodeId}`
        });
      }
    });
    
    return common;
  }

  private calculateSimilarity(keywords1: TFIDFResult[], keywords2: TFIDFResult[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;
    
    const terms1 = new Set(keywords1.map(k => k.term));
    const terms2 = new Set(keywords2.map(k => k.term));
    
    const intersection = new Set([...terms1].filter(t => terms2.has(t)));
    const union = new Set([...terms1, ...terms2]);
    
    return intersection.size / union.size;
  }

  private calculateCallbackStrength(text1: string, text2: string, commonKeywords: TFIDFResult[]): number {
    let strength = commonKeywords.length * 0.2;
    
    // 参照表現の検出
    const referencePatterns = /その|それ|この|これ|先ほど|さっき|前に|以前/;
    if (referencePatterns.test(text2)) {
      strength += 0.3;
    }
    
    // 強調表現の検出
    const emphasisPatterns = /やはり|結局|つまり|要するに|改めて/;
    if (emphasisPatterns.test(text2)) {
      strength += 0.2;
    }
    
    return Math.min(strength, 1);
  }
  
  // 意味のあるテーマ名を生成
  private generateMeaningfulThemeName(keywords: string[], texts: string[]): string {
    // 相槌・フィラーのパターン
    const fillerPatterns = ['はい', 'えー', 'あー', 'そうですね', 'なるほど', 'ええ', 'うん', 'よいしょ', 'すいません', '失礼'];
    const hasFillers = keywords.some(k => fillerPatterns.some(f => k.includes(f)));
    const allTexts = texts.join(' ');
    
    // 挨拶パターン
    if (keywords.some(k => k.includes('よろしく') || k.includes('はじめ') || k.includes('こんにち'))) {
      return '挨拶・自己紹介';
    }
    
    // 相槌・フィラー
    if (hasFillers && keywords.length <= 2) {
      return '相槌・つなぎ言葉';
    }
    
    // 質問パターン
    if (allTexts.includes('？') || keywords.some(k => k.includes('どう') || k.includes('何') || k.includes('いつ'))) {
      return '質問・確認事項';
    }
    
    // 価格・金額
    if (keywords.some(k => k.includes('円') || k.includes('価格') || k.includes('料金') || k.includes('費用'))) {
      return '価格・費用説明';
    }
    
    // 機能・特徴
    if (keywords.some(k => k.includes('機能') || k.includes('特徴') || k.includes('できる') || k.includes('可能'))) {
      return '機能・特徴説明';
    }
    
    // スケジュール
    if (keywords.some(k => k.includes('日') || k.includes('月') || k.includes('予定') || k.includes('スケジュール'))) {
      return 'スケジュール調整';
    }
    
    // 問題・課題
    if (keywords.some(k => k.includes('問題') || k.includes('課題') || k.includes('困') || k.includes('難し'))) {
      return '課題・問題提起';
    }
    
    // 提案・解決
    if (keywords.some(k => k.includes('提案') || k.includes('解決') || k.includes('改善') || k.includes('方法'))) {
      return '提案・解決策';
    }
    
    // 合意・決定
    if (keywords.some(k => k.includes('決') || k.includes('合意') || k.includes('了解') || k.includes('承知'))) {
      return '合意・決定事項';
    }
    
    // デフォルト: キーワードを使った名前
    if (keywords.length > 0) {
      return keywords.slice(0, 2).join('・') + 'について';
    }
    
    return '一般的な会話';
  }
}