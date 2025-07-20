export interface ReportSection {
  id: string
  title: string
  icon?: string
  subsections?: ReportSection[]
  estimatedTime?: number // 予想生成時間（秒）
}

export const reportStructure: ReportSection[] = [
  {
    id: 'executive-summary',
    title: 'エグゼクティブサマリー',
    icon: '📊',
    estimatedTime: 5,
  },
  {
    id: 'market-analysis',
    title: '市場環境分析',
    icon: '🌍',
    estimatedTime: 15,
    subsections: [
      { id: 'market-size', title: '市場規模と成長性' },
      { id: 'key-players', title: '主要プレイヤー' },
      { id: 'tech-trends', title: '技術トレンド' },
    ],
  },
  {
    id: 'pest-analysis',
    title: 'PEST分析',
    icon: '🔍',
    estimatedTime: 12,
    subsections: [
      { id: 'political', title: '政治的要因 (Political)' },
      { id: 'economic', title: '経済的要因 (Economic)' },
      { id: 'social', title: '社会的要因 (Social)' },
      { id: 'technological', title: '技術的要因 (Technological)' },
    ],
  },
  {
    id: 'swot-analysis',
    title: 'SWOT分析',
    icon: '💡',
    estimatedTime: 10,
    subsections: [
      { id: 'strengths', title: '強み (Strengths)' },
      { id: 'weaknesses', title: '弱み (Weaknesses)' },
      { id: 'opportunities', title: '機会 (Opportunities)' },
      { id: 'threats', title: '脅威 (Threats)' },
    ],
  },
  {
    id: 'competitive-analysis',
    title: '競争環境分析',
    icon: '⚔️',
    estimatedTime: 12,
    subsections: [
      { id: 'new-entrants', title: '新規参入の脅威' },
      { id: 'substitutes', title: '代替品の脅威' },
      { id: 'buyers-power', title: '買い手の交渉力' },
      { id: 'suppliers-power', title: '売り手の交渉力' },
      { id: 'rivalry', title: '競合他社との競争' },
    ],
  },
  {
    id: 'strategic-recommendations',
    title: '戦略的推奨事項',
    icon: '🎯',
    estimatedTime: 10,
    subsections: [
      { id: 'short-term', title: '短期的施策（1年以内）' },
      { id: 'mid-term', title: '中期的施策（1-3年）' },
      { id: 'long-term', title: '長期的施策（3年以上）' },
    ],
  },
  {
    id: 'risk-mitigation',
    title: 'リスクと対策',
    icon: '⚠️',
    estimatedTime: 8,
    subsections: [
      { id: 'key-risks', title: '主要リスク' },
      { id: 'mitigation-strategies', title: 'リスク軽減策' },
    ],
  },
  {
    id: 'conclusion',
    title: '結論',
    icon: '🎯',
    estimatedTime: 5,
  },
  {
    id: 'references',
    title: '参考文献',
    icon: '📚',
    estimatedTime: 2,
  },
]

// アニメーション用のタイミング設定
export const animationConfig = {
  // フェーズ1: 大テーマの出現
  phaseOneDelay: 200, // 各大テーマ間の遅延（ミリ秒）
  phaseOneDuration: 600, // 各大テーマのアニメーション時間
  
  // フェーズ2: 中テーマの展開
  phaseTwoDelay: 100, // 各中テーマ間の遅延
  phaseTwoDuration: 400, // 各中テーマのアニメーション時間
  
  // フェーズ3: コンテンツストリーミング
  streamingDelay: 50, // 文字表示の遅延
}

// 生成フェーズの定義
export enum GenerationPhase {
  IDLE = 'idle',
  ANALYZING = 'analyzing', // テーマ分析中
  STRUCTURE_BUILDING = 'structure_building', // 構造構築中
  SUBSECTION_EXPANDING = 'subsection_expanding', // サブセクション展開中
  CONTENT_STREAMING = 'content_streaming', // コンテンツ生成中
  COMPLETED = 'completed', // 完了
}

// セクションの状態
export enum SectionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}