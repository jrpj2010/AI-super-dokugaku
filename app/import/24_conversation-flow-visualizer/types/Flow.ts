// 会話フロー関連の型定義

export interface FlowNode {
    id: string;
    phase: string;  // フェーズ名（例：挨拶、課題確認、提案）
    content: string;  // 内容の要約
    keywords: string[];  // キーワード
    speaker: string;  // 主な話者
    type: 'greeting' | 'problem' | 'current_state' | 'proposal' | 'qa' | 'negotiation' | 'closing' | 'next_step' | 'general';
    level: 'large' | 'medium' | 'small';  // 階層レベル
    parentId?: string;  // 親ノードのID（中・小テーマの場合）
    childIds?: string[];  // 子ノードのIDリスト
    timeRange?: { start: number; end: number };  // 時間範囲
    summary?: string;  // より詳細な要約（大・中テーマ用）
}

export interface FlowTheme {
    id: string;
    name: string;
    description: string;
}

export interface FlowTransition {
    from: string;
    to: string;
    reason: string;
}

export interface FlowAnalysis {
    nodes: FlowNode[];
    themes: FlowTheme[];
    edges: import('./Dependency').DependencyEdge[];
    transitions: FlowTransition[];
}