// 文書構造解析用プロンプトテンプレート

// 文書タイプ
export enum DocumentType {
  MEETING_NOTES = 'meeting_notes',
  ARTICLE = 'article',
  BLOG_POST = 'blog_post',
  PRESENTATION = 'presentation',
  REPORT = 'report',
  MEMO = 'memo',
  MANUAL = 'manual',
  ACADEMIC = 'academic',
  PROPOSAL = 'proposal',
  UNKNOWN = 'unknown'
}

// 構造要素
export enum StructureElement {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  LIST = 'list',
  TABLE = 'table',
  QUOTE = 'quote',
  CODE = 'code',
  LINK = 'link',
  IMAGE = 'image',
  ACTION_ITEM = 'action_item',
  DECISION = 'decision',
  QUESTION = 'question',
  SUMMARY = 'summary'
}

// 構造解析設定
export interface StructureAnalysisConfig {
  targetLanguage: 'ja' | 'en';
  detectDocumentType: boolean;
  analyzeHeadingHierarchy: boolean;
  extractKeyElements: boolean;
  identifyActionItems: boolean;
  findDecisionPoints: boolean;
  detectQuestions: boolean;
  analyzeSentiment: boolean;
  extractKeywords: boolean;
  suggestImprovements: boolean;
}

// 解析結果
export interface DocumentStructure {
  documentType: DocumentType;
  confidence: number;
  structure: StructureNode[];
  metadata: DocumentMetadata;
  suggestions?: ImprovementSuggestion[];
}

export interface StructureNode {
  type: StructureElement;
  level: number;
  content: string;
  children?: StructureNode[];
  metadata?: {
    confidence?: number;
    sentiment?: 'positive' | 'negative' | 'neutral';
    importance?: 'high' | 'medium' | 'low';
    tags?: string[];
  };
}

export interface DocumentMetadata {
  title?: string;
  wordCount: number;
  headingCount: number;
  actionItemCount: number;
  decisionCount: number;
  questionCount: number;
  keywords: string[];
  readabilityScore?: number;
  estimatedReadingTime: number;
}

export interface ImprovementSuggestion {
  type: 'structure' | 'content' | 'format' | 'clarity';
  priority: 'high' | 'medium' | 'low';
  description: string;
  suggestion: string;
  location?: string;
}

// 構造解析プロンプトクラス
export class StructureAnalyzerPrompts {
  // メイン解析プロンプトの生成
  static generateAnalysisPrompt(config: StructureAnalysisConfig): string {
    const basePrompt = this.getBasePrompt(config.targetLanguage);
    const taskInstructions = this.getTaskInstructions(config);
    const outputFormat = this.getOutputFormatInstructions(config.targetLanguage);
    
    return `${basePrompt}\n\n${taskInstructions}\n\n${outputFormat}`;
  }

  // ベースプロンプト
  private static getBasePrompt(language: 'ja' | 'en'): string {
    if (language === 'en') {
      return `You are an expert document structure analyzer. Analyze the provided text and identify its structure, type, and key elements.

Your task is to:
- Identify the document type and structure
- Extract hierarchical information
- Identify key content elements
- Provide insights and improvement suggestions`;
    }

    return `あなたは文書構造解析の専門家です。提供されたテキストを解析し、その構造、タイプ、重要な要素を特定してください。

重要な指示：
- 提供されたテキストの実際の内容のみを解析してください
- 架空の内容や例文を生成しないでください
- ダミーデータやサンプルデータを作成しないでください
- 実際のテキストに基づいた分析のみを行ってください

あなたのタスク：
- 実際の文書タイプと構造の特定
- 実際の階層情報の抽出  
- 実際に存在する重要なコンテンツ要素の識別
- 実際の内容に基づいた洞察と改善提案の提供`;
  }

  // タスク指示の生成
  private static getTaskInstructions(config: StructureAnalysisConfig): string {
    const instructions: string[] = [];
    
    if (config.targetLanguage === 'en') {
      if (config.detectDocumentType) {
        instructions.push('- Analyze and classify the document type (meeting notes, article, blog post, etc.)');
      }
      
      if (config.analyzeHeadingHierarchy) {
        instructions.push('- Identify heading hierarchy and structure levels');
      }
      
      if (config.extractKeyElements) {
        instructions.push('- Extract key content elements (titles, lists, tables, quotes, etc.)');
      }
      
      if (config.identifyActionItems) {
        instructions.push('- Identify action items, tasks, and todo items');
      }
      
      if (config.findDecisionPoints) {
        instructions.push('- Find decision points and conclusion statements');
      }
      
      if (config.detectQuestions) {
        instructions.push('- Detect questions and areas requiring clarification');
      }
      
      if (config.analyzeSentiment) {
        instructions.push('- Analyze sentiment and tone of different sections');
      }
      
      if (config.extractKeywords) {
        instructions.push('- Extract keywords and important terms');
      }
      
      if (config.suggestImprovements) {
        instructions.push('- Suggest structural and content improvements');
      }

      return `Analysis tasks:\n${instructions.join('\n')}`;
    }

    // 日本語版
    if (config.detectDocumentType) {
      instructions.push('- 文書タイプの解析と分類（議事録、記事、ブログ記事など）');
    }
    
    if (config.analyzeHeadingHierarchy) {
      instructions.push('- 見出し階層と構造レベルの特定');
    }
    
    if (config.extractKeyElements) {
      instructions.push('- 重要なコンテンツ要素の抽出（タイトル、リスト、テーブル、引用など）');
    }
    
    if (config.identifyActionItems) {
      instructions.push('- アクションアイテム、タスク、TODOアイテムの特定');
    }
    
    if (config.findDecisionPoints) {
      instructions.push('- 決定事項と結論の発見');
    }
    
    if (config.detectQuestions) {
      instructions.push('- 質問や明確化が必要な箇所の検出');
    }
    
    if (config.analyzeSentiment) {
      instructions.push('- 各セクションの感情と論調の分析');
    }
    
    if (config.extractKeywords) {
      instructions.push('- キーワードと重要用語の抽出');
    }
    
    if (config.suggestImprovements) {
      instructions.push('- 構造とコンテンツの改善提案');
    }

    return `解析タスク：\n${instructions.join('\n')}`;
  }

  // 出力フォーマット指示
  private static getOutputFormatInstructions(language: 'ja' | 'en'): string {
    if (language === 'en') {
      return `Output format:
Please provide your analysis in the following JSON structure:

{
  "documentType": "meeting_notes|article|blog_post|...",
  "confidence": 0.85,
  "structure": [
    {
      "type": "title|heading|paragraph|list|...",
      "level": 1,
      "content": "content text",
      "metadata": {
        "confidence": 0.9,
        "sentiment": "positive|negative|neutral",
        "importance": "high|medium|low",
        "tags": ["keyword1", "keyword2"]
      },
      "children": [...]
    }
  ],
  "metadata": {
    "title": "Document Title",
    "wordCount": 500,
    "headingCount": 5,
    "actionItemCount": 3,
    "decisionCount": 2,
    "questionCount": 1,
    "keywords": ["keyword1", "keyword2"],
    "estimatedReadingTime": 3
  },
  "suggestions": [
    {
      "type": "structure|content|format|clarity",
      "priority": "high|medium|low",
      "description": "Issue description",
      "suggestion": "Improvement suggestion",
      "location": "Section reference"
    }
  ]
}`;
    }

    return `出力形式：
以下のJSON構造で解析結果を提供してください：

{
  "documentType": "meeting_notes|article|blog_post|...",
  "confidence": 0.85,
  "structure": [
    {
      "type": "title|heading|paragraph|list|...",
      "level": 1,
      "content": "コンテンツテキスト",
      "metadata": {
        "confidence": 0.9,
        "sentiment": "positive|negative|neutral",
        "importance": "high|medium|low", 
        "tags": ["キーワード1", "キーワード2"]
      },
      "children": [...]
    }
  ],
  "metadata": {
    "title": "文書タイトル",
    "wordCount": 500,
    "headingCount": 5,
    "actionItemCount": 3,
    "decisionCount": 2,
    "questionCount": 1,
    "keywords": ["キーワード1", "キーワード2"],
    "estimatedReadingTime": 3
  },
  "suggestions": [
    {
      "type": "structure|content|format|clarity",
      "priority": "high|medium|low",
      "description": "問題の説明",
      "suggestion": "改善提案",
      "location": "セクション参照"
    }
  ]
}`;
  }

  // 文書タイプ別プロンプト
  static getDocumentTypePrompt(type: DocumentType, language: 'ja' | 'en' = 'ja'): string {
    if (language === 'en') {
      switch (type) {
        case DocumentType.MEETING_NOTES:
          return `Focus on meeting structure: agenda items, decisions, action items, participants, and follow-up tasks.`;
        
        case DocumentType.ARTICLE:
          return `Analyze article structure: introduction, main content sections, supporting evidence, and conclusion.`;
        
        case DocumentType.BLOG_POST:
          return `Evaluate blog structure: engaging introduction, main content flow, readability, and call-to-action.`;
        
        case DocumentType.PRESENTATION:
          return `Identify presentation structure: agenda, key points, supporting slides, and summary.`;
        
        case DocumentType.REPORT:
          return `Analyze report structure: executive summary, methodology, findings, recommendations, and appendices.`;
        
        case DocumentType.MANUAL:
          return `Focus on instructional structure: clear steps, prerequisites, examples, and troubleshooting.`;
        
        case DocumentType.ACADEMIC:
          return `Evaluate academic structure: abstract, literature review, methodology, results, discussion, and conclusion.`;
        
        case DocumentType.PROPOSAL:
          return `Analyze proposal structure: problem statement, proposed solution, benefits, timeline, and budget.`;
        
        default:
          return `Analyze general document structure and identify the most appropriate format.`;
      }
    }

    switch (type) {
      case DocumentType.MEETING_NOTES:
        return `議事録構造に焦点：議題、決定事項、アクションアイテム、参加者、フォローアップタスク。`;
      
      case DocumentType.ARTICLE:
        return `記事構造の解析：導入、主要コンテンツセクション、裏付け情報、結論。`;
      
      case DocumentType.BLOG_POST:
        return `ブログ構造の評価：魅力的な導入、メインコンテンツの流れ、読みやすさ、行動喚起。`;
      
      case DocumentType.PRESENTATION:
        return `プレゼン構造の特定：アジェンダ、キーポイント、サポートスライド、まとめ。`;
      
      case DocumentType.REPORT:
        return `レポート構造の解析：エグゼクティブサマリー、方法論、発見事項、推奨事項、付録。`;
      
      case DocumentType.MANUAL:
        return `指導書構造に焦点：明確な手順、前提条件、例、トラブルシューティング。`;
      
      case DocumentType.ACADEMIC:
        return `学術構造の評価：要約、文献レビュー、方法論、結果、考察、結論。`;
      
      case DocumentType.PROPOSAL:
        return `提案書構造の解析：問題提起、提案ソリューション、利益、タイムライン、予算。`;
      
      default:
        return `一般的な文書構造を解析し、最も適切な形式を特定。`;
    }
  }

  // 改善提案プロンプト
  static getImprovementPrompt(language: 'ja' | 'en' = 'ja'): string {
    if (language === 'en') {
      return `Improvement suggestions should focus on:

Structure improvements:
- Better heading hierarchy
- Logical content flow
- Section organization

Content improvements:
- Clarity and conciseness
- Missing information
- Redundant content

Format improvements:
- Consistent formatting
- Better use of lists and tables
- Visual hierarchy

Clarity improvements:
- Unclear sections
- Complex sentences
- Technical jargon`;
    }

    return `改善提案は以下に焦点を当ててください：

構造改善：
- より良い見出し階層
- 論理的なコンテンツフロー
- セクション構成

コンテンツ改善：
- 明確性と簡潔性
- 不足している情報
- 冗長なコンテンツ

フォーマット改善：
- 一貫したフォーマット
- リストとテーブルの効果的な使用
- 視覚的階層

明確性改善：
- 不明確なセクション
- 複雑な文章
- 専門用語`;
  }

  // 特定要素抽出プロンプト
  static getElementExtractionPrompt(element: StructureElement, language: 'ja' | 'en' = 'ja'): string {
    if (language === 'en') {
      switch (element) {
        case StructureElement.ACTION_ITEM:
          return `Focus on identifying action items: tasks, assignments, deadlines, responsible parties.`;
        
        case StructureElement.DECISION:
          return `Identify decision points: conclusions, agreements, resolutions, final determinations.`;
        
        case StructureElement.QUESTION:
          return `Find questions: direct questions, areas needing clarification, unresolved issues.`;
        
        case StructureElement.SUMMARY:
          return `Locate summary sections: key points, main takeaways, conclusions.`;
        
        default:
          return `Extract all instances of the specified element type with context.`;
      }
    }

    switch (element) {
      case StructureElement.ACTION_ITEM:
        return `アクションアイテムの特定に焦点：タスク、割り当て、期限、責任者。`;
      
      case StructureElement.DECISION:
        return `決定事項の特定：結論、合意、解決事項、最終決定。`;
      
      case StructureElement.QUESTION:
        return `質問の発見：直接的な質問、明確化が必要な箇所、未解決の問題。`;
      
      case StructureElement.SUMMARY:
        return `サマリーセクションの特定：キーポイント、主要な要点、結論。`;
      
      default:
        return `指定された要素タイプのすべての事例をコンテキストと共に抽出。`;
    }
  }
}

// デフォルト設定
export const DEFAULT_STRUCTURE_CONFIG: StructureAnalysisConfig = {
  targetLanguage: 'ja',
  detectDocumentType: true,
  analyzeHeadingHierarchy: true,
  extractKeyElements: true,
  identifyActionItems: true,
  findDecisionPoints: true,
  detectQuestions: true,
  analyzeSentiment: false,
  extractKeywords: true,
  suggestImprovements: true
};

// 便利な関数
export function createStructureAnalysisPrompt(
  text: string,
  config: Partial<StructureAnalysisConfig> = {}
): string {
  const fullConfig: StructureAnalysisConfig = {
    ...DEFAULT_STRUCTURE_CONFIG,
    ...config
  };

  const prompt = StructureAnalyzerPrompts.generateAnalysisPrompt(fullConfig);
  
  return `${prompt}\n\n重要：以下のテキストの実際の内容のみを分析してください。架空の内容を生成しないでください。\n\n分析対象テキスト:\n${text}`;
}

export function createQuickAnalysisPrompt(text: string, language: 'ja' | 'en' = 'ja'): string {
  const config: StructureAnalysisConfig = {
    targetLanguage: language,
    detectDocumentType: true,
    analyzeHeadingHierarchy: true,
    extractKeyElements: false,
    identifyActionItems: false,
    findDecisionPoints: false,
    detectQuestions: false,
    analyzeSentiment: false,
    extractKeywords: true,
    suggestImprovements: false
  };

  return createStructureAnalysisPrompt(text, config);
}

export function createDetailedAnalysisPrompt(text: string, language: 'ja' | 'en' = 'ja'): string {
  const config: StructureAnalysisConfig = {
    ...DEFAULT_STRUCTURE_CONFIG,
    targetLanguage: language,
    analyzeSentiment: true,
    suggestImprovements: true
  };

  return createStructureAnalysisPrompt(text, config);
}

// 文書タイプ検出用プロンプト
export function createDocumentTypeDetectionPrompt(text: string, language: 'ja' | 'en' = 'ja'): string {
  if (language === 'en') {
    return `Analyze the following text and identify its document type. Choose from: meeting_notes, article, blog_post, presentation, report, memo, manual, academic, proposal, or unknown.

Provide your analysis as JSON:
{
  "documentType": "...",
  "confidence": 0.85,
  "reasoning": "Explanation of why this type was chosen"
}

Text to analyze:
${text}`;
  }

  return `以下のテキストを解析し、文書タイプを特定してください。選択肢：meeting_notes, article, blog_post, presentation, report, memo, manual, academic, proposal, unknown

重要な指示：
- 実際のテキスト内容のみを解析してください
- 架空の内容やダミーデータを生成しないでください

JSON形式で解析結果を提供してください：
{
  "documentType": "...",
  "confidence": 0.85,
  "reasoning": "実際のテキスト内容に基づいてこのタイプを選択した理由の説明"
}

解析対象テキスト：
${text}`;
}