// アクションアイテム抽出サービス

import { getModel, callGeminiAPI } from './client';
import { GeminiModel } from '../../types/gemini';
import { StructureAnalyzerPrompts } from './prompts/structure-analyzer';

// アクションアイテムタイプ
export enum ActionType {
  TASK = 'task',
  ASSIGNMENT = 'assignment', 
  DECISION = 'decision',
  FOLLOW_UP = 'follow_up',
  REMINDER = 'reminder',
  RESEARCH = 'research',
  REVIEW = 'review',
  MEETING = 'meeting',
  APPROVAL = 'approval',
  NOTIFICATION = 'notification'
}

// 優先度レベル
export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  URGENT = 'urgent'
}

// ステータス
export enum ActionStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
  CANCELLED = 'cancelled'
}

// アクションアイテム
export interface ActionItem {
  id: string;
  type: ActionType;
  title: string;
  description: string;
  assignee?: string;
  reporter?: string;
  dueDate?: Date;
  priority: Priority;
  status: ActionStatus;
  tags: string[];
  context: string; // 元のテキスト中の文脈
  confidence: number; // 抽出の信頼度
  dependencies?: string[]; // 依存するアクションのID
  estimatedEffort?: number; // 見積もり工数（時間）
  completionCriteria?: string; // 完了条件
}

// 抽出設定
export interface ExtractionConfig {
  language: 'ja' | 'en';
  includeImplicitActions: boolean; // 暗黙的なアクションも含める
  extractAssignees: boolean; // 担当者の抽出
  extractDeadlines: boolean; // 期限の抽出
  analyzePriority: boolean; // 優先度の分析
  detectDependencies: boolean; // 依存関係の検出
  suggestCompletionCriteria: boolean; // 完了条件の提案
  minConfidence: number; // 最小信頼度閾値
}

// 抽出結果
export interface ExtractionResult {
  actions: ActionItem[];
  statistics: {
    totalFound: number;
    byType: Record<ActionType, number>;
    byPriority: Record<Priority, number>;
    averageConfidence: number;
    withAssignees: number;
    withDeadlines: number;
  };
  suggestions: string[]; // 改善提案
}

// デフォルト設定
const DEFAULT_EXTRACTION_CONFIG: ExtractionConfig = {
  language: 'ja',
  includeImplicitActions: true,
  extractAssignees: true,
  extractDeadlines: true,
  analyzePriority: true,
  detectDependencies: false,
  suggestCompletionCriteria: true,
  minConfidence: 0.6
};

// アクション抽出サービス
export class ActionExtractor {
  // メインの抽出処理
  async extractActions(
    text: string,
    config: Partial<ExtractionConfig> = {}
  ): Promise<ExtractionResult> {
    const fullConfig = { ...DEFAULT_EXTRACTION_CONFIG, ...config };
    
    const prompt = this.buildExtractionPrompt(text, fullConfig);
    
    const model = getModel(GeminiModel.PRO, {
      generationConfig: {
        temperature: 0.3, // 一貫性のため低めに設定
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096
      }
    });

    const response = await callGeminiAPI(async () => {
      return await model.generateContent(prompt);
    });

    if (response.error) {
      throw new Error(`Action extraction failed: ${response.error.message}`);
    }

    const generatedText = response.data?.response.text() || '';
    return this.parseExtractionResult(generatedText, fullConfig);
  }

  // 特定タイプのアクション抽出
  async extractSpecificActions(
    text: string,
    actionTypes: ActionType[],
    config: Partial<ExtractionConfig> = {}
  ): Promise<ActionItem[]> {
    const fullConfig = { ...DEFAULT_EXTRACTION_CONFIG, ...config };
    
    const typePrompt = this.buildTypeSpecificPrompt(text, actionTypes, fullConfig);
    
    const model = getModel(GeminiModel.FLASH, {
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048
      }
    });

    const response = await callGeminiAPI(async () => {
      return await model.generateContent(typePrompt);
    });

    if (response.error) {
      throw new Error(`Specific action extraction failed: ${response.error.message}`);
    }

    const generatedText = response.data?.response.text() || '';
    const result = this.parseExtractionResult(generatedText, fullConfig);
    
    return result.actions.filter(action => actionTypes.includes(action.type));
  }

  // 決定事項の抽出
  async extractDecisions(text: string, language: 'ja' | 'en' = 'ja'): Promise<ActionItem[]> {
    return this.extractSpecificActions(text, [ActionType.DECISION], { language });
  }

  // タスクの抽出
  async extractTasks(text: string, language: 'ja' | 'en' = 'ja'): Promise<ActionItem[]> {
    return this.extractSpecificActions(text, [ActionType.TASK, ActionType.ASSIGNMENT], { language });
  }

  // フォローアップアクションの抽出
  async extractFollowUps(text: string, language: 'ja' | 'en' = 'ja'): Promise<ActionItem[]> {
    return this.extractSpecificActions(text, [ActionType.FOLLOW_UP, ActionType.REMINDER], { language });
  }

  // プロンプトの構築
  private buildExtractionPrompt(text: string, config: ExtractionConfig): string {
    const basePrompt = this.getBasePrompt(config.language);
    const taskInstructions = this.getTaskInstructions(config);
    const outputFormat = this.getOutputFormat(config.language);
    const examples = this.getExamples(config.language);

    return `${basePrompt}\n\n${taskInstructions}\n\n${outputFormat}\n\n${examples}\n\n解析対象テキスト:\n${text}`;
  }

  // ベースプロンプト
  private getBasePrompt(language: 'ja' | 'en'): string {
    if (language === 'en') {
      return `You are an expert action item extraction specialist. Analyze the provided text and identify all actionable items, tasks, decisions, and follow-up actions.

Your goal is to:
- Extract explicit and implicit action items
- Identify assignees and deadlines
- Determine priority levels
- Classify action types
- Provide completion criteria`;
    }

    return `あなたはアクションアイテム抽出の専門家です。提供されたテキストを解析し、すべての実行可能なアイテム、タスク、決定事項、フォローアップアクションを特定してください。

重要な指示：
- 提供されたテキストの実際の内容のみを解析してください
- 架空のアクションアイテムを生成しないでください
- ダミーデータやサンプルデータを作成しないでください
- テキストに実際に記載されている内容のみを抽出してください

あなたの目標：
- 実際に記載された明示的および暗黙的なアクションアイテムの抽出
- 実際に言及された担当者と期限の特定
- 実際の内容に基づいた優先度レベルの決定
- 実際のアクションタイプの分類
- 実際の内容に基づいた完了条件の提供`;
  }

  // タスク指示
  private getTaskInstructions(config: ExtractionConfig): string {
    const instructions: string[] = [];

    if (config.language === 'en') {
      instructions.push('- Identify all action items, both explicit (clear tasks) and implicit (suggested actions)');
      
      if (config.extractAssignees) {
        instructions.push('- Extract assignees (who is responsible for each action)');
      }
      
      if (config.extractDeadlines) {
        instructions.push('- Identify deadlines and due dates');
      }
      
      if (config.analyzePriority) {
        instructions.push('- Analyze and assign priority levels (urgent, high, medium, low)');
      }
      
      if (config.detectDependencies) {
        instructions.push('- Detect dependencies between actions');
      }
      
      if (config.suggestCompletionCriteria) {
        instructions.push('- Suggest clear completion criteria for each action');
      }

      return `Instructions:\n${instructions.join('\n')}`;
    }

    // 日本語版
    instructions.push('- すべてのアクションアイテムを特定（明示的なタスクと暗黙的なアクションの両方）');
    
    if (config.extractAssignees) {
      instructions.push('- 担当者の抽出（各アクションの責任者）');
    }
    
    if (config.extractDeadlines) {
      instructions.push('- 期限と締切日の特定');
    }
    
    if (config.analyzePriority) {
      instructions.push('- 優先度レベルの分析と割り当て（緊急、高、中、低）');
    }
    
    if (config.detectDependencies) {
      instructions.push('- アクション間の依存関係の検出');
    }
    
    if (config.suggestCompletionCriteria) {
      instructions.push('- 各アクションの明確な完了条件の提案');
    }

    return `指示：\n${instructions.join('\n')}`;
  }

  // 出力フォーマット
  private getOutputFormat(language: 'ja' | 'en'): string {
    if (language === 'en') {
      return `Output format (JSON):
{
  "actions": [
    {
      "id": "action_1",
      "type": "task|assignment|decision|follow_up|reminder|research|review|meeting|approval|notification",
      "title": "Brief action title",
      "description": "Detailed description",
      "assignee": "Person responsible",
      "dueDate": "2024-01-15",
      "priority": "urgent|high|medium|low",
      "status": "not_started",
      "tags": ["tag1", "tag2"],
      "context": "Original text context",
      "confidence": 0.85,
      "estimatedEffort": 2,
      "completionCriteria": "How to know when done"
    }
  ],
  "statistics": {
    "totalFound": 5,
    "byType": {"task": 3, "decision": 2},
    "byPriority": {"high": 2, "medium": 3},
    "averageConfidence": 0.82,
    "withAssignees": 4,
    "withDeadlines": 2
  },
  "suggestions": ["Improvement suggestions"]
}`;
    }

    return `出力形式（JSON）：
{
  "actions": [
    {
      "id": "action_1",
      "type": "task|assignment|decision|follow_up|reminder|research|review|meeting|approval|notification",
      "title": "簡潔なアクションタイトル",
      "description": "詳細な説明",
      "assignee": "責任者",
      "dueDate": "2024-01-15",
      "priority": "urgent|high|medium|low",
      "status": "not_started",
      "tags": ["タグ1", "タグ2"],
      "context": "元のテキストの文脈",
      "confidence": 0.85,
      "estimatedEffort": 2,
      "completionCriteria": "完了の判断基準"
    }
  ],
  "statistics": {
    "totalFound": 5,
    "byType": {"task": 3, "decision": 2},
    "byPriority": {"high": 2, "medium": 3},
    "averageConfidence": 0.82,
    "withAssignees": 4,
    "withDeadlines": 2
  },
  "suggestions": ["改善提案"]
}`;
  }

  // 使用例
  private getExamples(language: 'ja' | 'en'): string {
    if (language === 'en') {
      return `Note: The following is just an example of the expected output format. 
Do NOT use this example data in your response. 
Only extract actual action items from the provided text.

Example format (DO NOT USE THIS DATA):
{
  "actions": [
    {
      "id": "action_1",
      "type": "assignment",
      "title": "[Actual title from the text]",
      "description": "[Actual description from the text]",
      "assignee": "[Actual person mentioned]",
      "dueDate": "[Actual date if mentioned]",
      "priority": "high|medium|low",
      "status": "not_started",
      "tags": ["[relevant tags]"],
      "context": "[Actual text excerpt]",
      "confidence": 0.85,
      "estimatedEffort": [number],
      "completionCriteria": "[Based on actual content]"
    }
  ]
}`;
    }

    return `注意：以下は出力形式の例です。
この例のデータを使用しないでください。
提供されたテキストから実際のアクションアイテムのみを抽出してください。

形式の例（このデータを使用しないこと）：
{
  "actions": [
    {
      "id": "action_1",
      "type": "assignment",
      "title": "[テキストからの実際のタイトル]",
      "description": "[テキストからの実際の説明]",
      "assignee": "[実際に言及された人物]",
      "dueDate": "[言及された場合の実際の日付]",
      "priority": "high|medium|low",
      "status": "not_started",
      "tags": ["[関連するタグ]"],
      "context": "[実際のテキストの抜粋]",
      "confidence": 0.85,
      "estimatedEffort": [数値],
      "completionCriteria": "[実際の内容に基づく]"
    }
  ]
}`;

  // 特定タイプ用プロンプト
  private buildTypeSpecificPrompt(
    text: string,
    actionTypes: ActionType[],
    config: ExtractionConfig
  ): string {
    const typeNames = actionTypes.join(', ');
    const basePrompt = this.getBasePrompt(config.language);
    
    if (config.language === 'en') {
      return `${basePrompt}

Focus specifically on extracting these types of actions: ${typeNames}

${this.getOutputFormat(config.language)}

Text to analyze:
${text}`;
    }

    return `${basePrompt}

以下のタイプのアクションの抽出に特に焦点を当ててください: ${typeNames}

${this.getOutputFormat(config.language)}

解析対象テキスト:
${text}`;
  }

  // 結果の解析
  private parseExtractionResult(generatedText: string, config: ExtractionConfig): ExtractionResult {
    try {
      // JSONブロックを抽出
      const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) ||
                       generatedText.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const jsonText = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonText);

      // データの検証とクリーンアップ
      const actions: ActionItem[] = (parsed.actions || [])
        .filter((action: any) => action.confidence >= config.minConfidence)
        .map((action: any, index: number) => ({
          ...action,
          id: action.id || `action_${index + 1}`,
          dueDate: action.dueDate ? new Date(action.dueDate) : undefined,
          status: action.status || ActionStatus.NOT_STARTED,
          tags: action.tags || [],
          confidence: action.confidence || 0.5
        }));

      // 統計情報の計算
      const statistics = this.calculateStatistics(actions);

      return {
        actions,
        statistics,
        suggestions: parsed.suggestions || []
      };

    } catch (error) {
      console.error('Failed to parse extraction result:', error);
      return {
        actions: [],
        statistics: {
          totalFound: 0,
          byType: {} as Record<ActionType, number>,
          byPriority: {} as Record<Priority, number>,
          averageConfidence: 0,
          withAssignees: 0,
          withDeadlines: 0
        },
        suggestions: ['JSON解析エラーが発生しました。テキストを確認してください。']
      };
    }
  }

  // 統計情報の計算
  private calculateStatistics(actions: ActionItem[]): ExtractionResult['statistics'] {
    const byType: Record<ActionType, number> = {} as Record<ActionType, number>;
    const byPriority: Record<Priority, number> = {} as Record<Priority, number>;
    
    let totalConfidence = 0;
    let withAssignees = 0;
    let withDeadlines = 0;

    actions.forEach(action => {
      byType[action.type] = (byType[action.type] || 0) + 1;
      byPriority[action.priority] = (byPriority[action.priority] || 0) + 1;
      
      totalConfidence += action.confidence;
      
      if (action.assignee) withAssignees++;
      if (action.dueDate) withDeadlines++;
    });

    return {
      totalFound: actions.length,
      byType,
      byPriority,
      averageConfidence: actions.length > 0 ? totalConfidence / actions.length : 0,
      withAssignees,
      withDeadlines
    };
  }
}

// シングルトンインスタンス
export const actionExtractor = new ActionExtractor();

// 便利な関数
export async function extractActionsFromText(
  text: string,
  options: Partial<ExtractionConfig> = {}
): Promise<ExtractionResult> {
  return actionExtractor.extractActions(text, options);
}

export async function extractTasksFromText(
  text: string,
  language: 'ja' | 'en' = 'ja'
): Promise<ActionItem[]> {
  return actionExtractor.extractTasks(text, language);
}

export async function extractDecisionsFromText(
  text: string,
  language: 'ja' | 'en' = 'ja'
): Promise<ActionItem[]> {
  return actionExtractor.extractDecisions(text, language);
}

export async function extractFollowUpsFromText(
  text: string,
  language: 'ja' | 'en' = 'ja'
): Promise<ActionItem[]> {
  return actionExtractor.extractFollowUps(text, language);
}