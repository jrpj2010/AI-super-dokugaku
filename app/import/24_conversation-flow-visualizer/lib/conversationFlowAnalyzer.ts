// 会話フロー分析エンジン
// ビジネス会話のフェーズと遷移を分析

import { FlowNode, FlowTheme, FlowAnalysis } from '../types/Flow';
import { DependencyEdge } from '../types/Dependency';

interface Node {
    id: string;
    text: string;
}

export class ConversationFlowAnalyzer {
    private nodes: Node[];
    
    constructor(nodes: Node[]) {
        this.nodes = nodes || [];
    }
    
    // 会話フローを分析
    analyzeFlow(): FlowAnalysis {
        const flowNodes: FlowNode[] = [];
        const themes: FlowTheme[] = [];
        const edges: DependencyEdge[] = [];
        
        // ノードをフェーズに分類
        let currentPhase = '';
        let phaseNodes: Node[] = [];
        let phaseIndex = 0;
        
        this.nodes.forEach((node, index) => {
            const detectedPhase = this.detectPhase(node.text);
            
            if (detectedPhase !== currentPhase && phaseNodes.length > 0) {
                // 新しいフェーズが始まったので、前のフェーズをまとめる
                const flowNode = this.createFlowNode(phaseNodes, currentPhase, phaseIndex);
                flowNodes.push(flowNode);
                phaseIndex++;
                
                // 新しいフェーズを開始
                currentPhase = detectedPhase;
                phaseNodes = [node];
            } else {
                // 同じフェーズに追加
                if (currentPhase === '') currentPhase = detectedPhase;
                phaseNodes.push(node);
            }
        });
        
        // 最後のフェーズを追加
        if (phaseNodes.length > 0) {
            const flowNode = this.createFlowNode(phaseNodes, currentPhase, phaseIndex);
            flowNodes.push(flowNode);
        }
        
        // エッジを生成（フェーズ間の遷移）
        for (let i = 0; i < flowNodes.length - 1; i++) {
            edges.push({
                id: `flow-edge-${i}`,
                sourceNodeId: flowNodes[i].id,
                targetNodeId: flowNodes[i + 1].id,
                type: 'flow',
                keywords: [],
                strength: 1,
                description: this.getTransitionReason(flowNodes[i].type, flowNodes[i + 1].type)
            });
        }
        
        // テーマを抽出
        themes.push(...this.extractThemes(flowNodes));
        
        return {
            nodes: flowNodes,
            themes,
            edges,
            transitions: []
        };
    }
    
    // フェーズを検出
    private detectPhase(text: string): string {
        const lowerText = text.toLowerCase();
        
        // 挨拶・アイスブレイク
        if (this.containsKeywords(lowerText, ['よろしく', 'はじめまして', 'お忙しい', 'お時間', 'ありがとうございます'])) {
            return 'greeting';
        }
        
        // 課題確認・ヒアリング
        if (this.containsKeywords(lowerText, ['課題', '問題', '困って', '悩み', 'どうですか', 'いかがですか'])) {
            return 'problem';
        }
        
        // 現状把握
        if (this.containsKeywords(lowerText, ['現在', '今', '現状', '状況', 'について'])) {
            return 'current_state';
        }
        
        // 提案・プレゼンテーション
        if (this.containsKeywords(lowerText, ['提案', 'おすすめ', '解決', '改善', '弊社', 'サービス', '製品'])) {
            return 'proposal';
        }
        
        // 質疑応答
        if (text.includes('？') || this.containsKeywords(lowerText, ['質問', 'どう', 'なぜ', 'いつ', '教えて'])) {
            return 'qa';
        }
        
        // 価格・条件交渉
        if (this.containsKeywords(lowerText, ['価格', '料金', '費用', '予算', '円', '割引', '条件'])) {
            return 'negotiation';
        }
        
        // 合意形成・クロージング
        if (this.containsKeywords(lowerText, ['お願い', '契約', '決定', '合意', 'やりましょう', '進めましょう'])) {
            return 'closing';
        }
        
        // ネクストステップ
        if (this.containsKeywords(lowerText, ['次回', '今後', 'スケジュール', '予定', '連絡'])) {
            return 'next_step';
        }
        
        return 'general';
    }
    
    // キーワードが含まれているかチェック
    private containsKeywords(text: string, keywords: string[]): boolean {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    // フローノードを作成
    private createFlowNode(nodes: Node[], phaseType: string, index: number): FlowNode {
        const phaseNames = {
            'greeting': '挨拶・アイスブレイク',
            'problem': '課題確認・ヒアリング',
            'current_state': '現状把握',
            'proposal': '提案・プレゼンテーション',
            'qa': '質疑応答',
            'negotiation': '価格・条件交渉',
            'closing': '合意形成・クロージング',
            'next_step': 'ネクストステップ確認',
            'general': '一般的な会話'
        };
        
        // 内容を要約
        const content = nodes.map(n => n.text).join(' ').slice(0, 100) + '...';
        
        // キーワードを抽出
        const keywords = this.extractKeywords(nodes.map(n => n.text).join(' '));
        
        // 話者を判定
        const speaker = this.detectSpeaker(nodes);
        
        return {
            id: `phase-${index}`,
            phase: phaseNames[phaseType as keyof typeof phaseNames] || phaseType,
            content,
            keywords,
            speaker,
            type: phaseType as FlowNode['type']
        };
    }
    
    // キーワードを抽出
    private extractKeywords(text: string): string[] {
        const stopWords = ['です', 'ます', 'ました', 'でした', 'ですね', 'から', 'けど', 'よう', 'こと'];
        const words = text.match(/[ぁ-んァ-ヶー一-龯０-９a-zA-Z]{2,}/g) || [];
        
        const wordFreq = new Map<string, number>();
        words.forEach(word => {
            if (!stopWords.includes(word)) {
                wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
            }
        });
        
        return Array.from(wordFreq.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([word]) => word);
    }
    
    // 話者を検出
    private detectSpeaker(nodes: Node[]): string {
        const speaker1Count = nodes.filter(n => n.text.includes('話者1')).length;
        const speaker2Count = nodes.filter(n => n.text.includes('話者2')).length;
        
        if (speaker1Count > speaker2Count) return '話者1';
        if (speaker2Count > speaker1Count) return '話者2';
        return '両者';
    }
    
    // 遷移理由を取得
    private getTransitionReason(fromType: string, toType: string): string {
        const transitions: Record<string, Record<string, string>> = {
            'greeting': {
                'problem': '挨拶から本題へ',
                'current_state': '挨拶から現状確認へ'
            },
            'problem': {
                'current_state': '課題から現状の詳細確認へ',
                'proposal': '課題を受けて提案へ'
            },
            'current_state': {
                'proposal': '現状を踏まえた提案へ',
                'problem': '現状から新たな課題発見へ'
            },
            'proposal': {
                'qa': '提案内容への質疑へ',
                'negotiation': '提案から条件交渉へ'
            },
            'qa': {
                'proposal': '質問を受けて追加提案へ',
                'negotiation': '疑問解消から条件交渉へ'
            },
            'negotiation': {
                'closing': '条件合意から契約へ',
                'qa': '条件への追加質問'
            },
            'closing': {
                'next_step': '合意から次のステップへ'
            }
        };
        
        return transitions[fromType]?.[toType] || '話題の展開';
    }
    
    // テーマを抽出
    private extractThemes(flowNodes: FlowNode[]): FlowTheme[] {
        const themes: FlowTheme[] = [];
        
        // フェーズタイプごとにテーマを集約
        const phaseTypes = new Set(flowNodes.map(n => n.type));
        let themeIndex = 0;
        
        phaseTypes.forEach(type => {
            const relatedNodes = flowNodes.filter(n => n.type === type);
            if (relatedNodes.length > 0) {
                themes.push({
                    id: `theme-${themeIndex++}`,
                    name: relatedNodes[0].phase.split('・')[0],
                    description: `${relatedNodes.length}回の${relatedNodes[0].phase}に関する会話`
                });
            }
        });
        
        return themes;
    }
}