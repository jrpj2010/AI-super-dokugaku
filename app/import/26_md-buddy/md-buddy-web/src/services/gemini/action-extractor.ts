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

あなたの目標：
- 明示的および暗黙的なアクションアイテムの抽出
- 担当者と期限の特定
- 優先度レベルの決定
- アクションタイプの分類
- 完了条件の提供`;
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
      return `Examples:

Input: "John should prepare the proposal by Friday. We also need to schedule a follow-up meeting with the client next week."

Output:
{
  "actions": [
    {
      "id": "action_1",
      "type": "assignment",
      "title": "Prepare proposal",
      "description": "John should prepare the proposal",
      "assignee": "John",
      "dueDate": "2024-01-12",
      "priority": "high",
      "status": "not_started",
      "tags": ["proposal", "deadline"],
      "context": "John should prepare the proposal by Friday",
      "confidence": 0.95,
      "estimatedEffort": 8,
      "completionCriteria": "Proposal document completed and reviewed"
    },
    {
      "id": "action_2", 
      "type": "meeting",
      "title": "Schedule follow-up meeting",
      "description": "Schedule a follow-up meeting with the client",
      "dueDate": "2024-01-19",
      "priority": "medium",
      "status": "not_started",
      "tags": ["meeting", "client", "follow-up"],
      "context": "schedule a follow-up meeting with the client next week",
      "confidence": 0.90,
      "estimatedEffort": 1,
      "completionCriteria": "Meeting scheduled and invitations sent"
    }
  ]
}`;
    }

    return `使用例：

入力: "田中さんは金曜日までに提案書を準備してください。また、来週クライアントとのフォローアップ会議をスケジュールする必要があります。"

出力:
{
  "actions": [
    {
      "id": "action_1",
      "type": "assignment",
      "title": "提案書の準備",
      "description": "田中さんは提案書を準備する",
      "assignee": "田中",
      "dueDate": "2024-01-12",
      "priority": "high",
      "status": "not_started",
      "tags": ["提案書", "期限"],
      "context": "田中さんは金曜日までに提案書を準備してください",
      "confidence": 0.95,
      "estimatedEffort": 8,
      "completionCriteria": "提案書の作成と確認完了"
    },
    {
      "id": "action_2",
      "type": "meeting", 
      "title": "フォローアップ会議のスケジュール",
      "description": "クライアントとのフォローアップ会議をスケジュールする",
      "dueDate": "2024-01-19",
      "priority": "medium",
      "status": "not_started",
      "tags": ["会議", "クライアント", "フォローアップ"],
      "context": "来週クライアントとのフォローアップ会議をスケジュールする必要があります",
      "confidence": 0.90,
      "estimatedEffort": 1,
      "completionCriteria": "会議がスケジュールされ、招待が送信済み"
    }
  ]
}`;
  }

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