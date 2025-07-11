// 議事録作成用プロンプトテンプレート

// 議事録タイプ
export enum MeetingType {
  GENERAL = 'general',
  STANDUP = 'standup',
  PLANNING = 'planning',
  REVIEW = 'review',
  RETROSPECTIVE = 'retrospective',
  DECISION = 'decision',
  BRAINSTORMING = 'brainstorming',
  CLIENT = 'client',
  SALES = 'sales'
}

// 議事録設定
export interface MeetingNotesConfig {
  type: MeetingType;
  includeParticipants: boolean;
  extractDecisions: boolean;
  extractActionItems: boolean;
  includeDiscussionFlow: boolean;
  highlightKeyPoints: boolean;
  estimatedDuration?: number;
  language: 'ja' | 'en';
}

// プロンプトテンプレート
export class MeetingNotesPrompts {
  // メインプロンプトの生成
  static generatePrompt(config: MeetingNotesConfig): string {
    const basePrompt = this.getBasePrompt(config);
    const structurePrompt = this.getStructurePrompt(config);
    const specificInstructions = this.getSpecificInstructions(config);
    const formatInstructions = this.getFormatInstructions(config);

    return `${basePrompt}\n\n${structurePrompt}\n\n${specificInstructions}\n\n${formatInstructions}`;
  }

  // ベースプロンプト
  private static getBasePrompt(config: MeetingNotesConfig): string {
    if (config.language === 'en') {
      return `You are a professional meeting minutes specialist. Create structured meeting minutes in Markdown format from the provided audio or text.

Key requirements:
- Capture all important discussions and decisions
- Maintain professional tone and clarity
- Focus on actionable outcomes and next steps`;
    }

    return `あなたは議事録作成の専門家です。提供された音声またはテキストから、構造化された議事録をMarkdown形式で作成してください。

重要な要件：
- すべての重要な議論と決定事項を記録してください
- 専門的で明確な文調を維持してください
- 実行可能な成果と次のステップに焦点を当ててください`;
  }

  // 構造プロンプト
  private static getStructurePrompt(config: MeetingNotesConfig): string {
    const structure = this.getMeetingStructure(config.type, config.language);
    
    if (config.language === 'en') {
      return `Meeting minutes structure:\n${structure}`;
    }

    return `議事録の構造：\n${structure}`;
  }

  // 会議タイプ別構造
  private static getMeetingStructure(type: MeetingType, language: 'ja' | 'en'): string {
    if (language === 'en') {
      switch (type) {
        case MeetingType.STANDUP:
          return `1. # Daily Standup - [Date]
2. ## Participants
3. ## What was completed yesterday
4. ## What will be done today
5. ## Blockers and issues
6. ## Action items`;

        case MeetingType.PLANNING:
          return `1. # Planning Meeting - [Date]
2. ## Meeting information
3. ## Objectives
4. ## Requirements discussion
5. ## Timeline and milestones
6. ## Resource allocation
7. ## Decisions made
8. ## Action items
9. ## Next steps`;

        case MeetingType.REVIEW:
          return `1. # Review Meeting - [Date]
2. ## Meeting information
3. ## Review items
4. ## Discussion points
5. ## Feedback and comments
6. ## Decisions made
7. ## Action items
8. ## Next review`;

        case MeetingType.RETROSPECTIVE:
          return `1. # Retrospective - [Date]
2. ## Meeting information
3. ## What went well
4. ## What could be improved
5. ## Action items for improvement
6. ## Next retrospective`;

        case MeetingType.CLIENT:
          return `1. # Client Meeting - [Date]
2. ## Meeting information
3. ## Agenda items
4. ## Client requirements
5. ## Discussion summary
6. ## Agreements and commitments
7. ## Action items
8. ## Follow-up plans`;

        case MeetingType.SALES:
          return `1. # Sales Meeting - [Date]
2. ## Meeting information
3. ## Client background
4. ## Discussion points
5. ## Client needs and pain points
6. ## Proposed solutions
7. ## Next steps
8. ## Follow-up actions`;

        default:
          return `1. # Meeting - [Date]
2. ## Meeting information
3. ## Agenda
4. ## Discussion
5. ## Decisions made
6. ## Action items
7. ## Next meeting`;
      }
    }

    // 日本語版
    switch (type) {
      case MeetingType.STANDUP:
        return `1. # デイリースタンドアップ - [日付]
2. ## 参加者
3. ## 昨日完了したこと
4. ## 今日行うこと
5. ## 課題・ブロッカー
6. ## アクションアイテム`;

      case MeetingType.PLANNING:
        return `1. # 企画会議 - [日付]
2. ## 会議情報
3. ## 目的・目標
4. ## 要件討議
5. ## スケジュール・マイルストーン
6. ## リソース配分
7. ## 決定事項
8. ## アクションアイテム
9. ## 次のステップ`;

      case MeetingType.REVIEW:
        return `1. # レビュー会議 - [日付]
2. ## 会議情報
3. ## レビュー項目
4. ## 討議内容
5. ## フィードバック・コメント
6. ## 決定事項
7. ## アクションアイテム
8. ## 次回レビュー`;

      case MeetingType.RETROSPECTIVE:
        return `1. # 振り返り会議 - [日付]
2. ## 会議情報
3. ## 良かった点
4. ## 改善すべき点
5. ## 改善アクション
6. ## 次回振り返り`;

      case MeetingType.CLIENT:
        return `1. # クライアント会議 - [日付]
2. ## 会議情報
3. ## 議題
4. ## クライアント要件
5. ## 討議内容
6. ## 合意・約束事項
7. ## アクションアイテム
8. ## フォローアップ計画`;

      case MeetingType.SALES:
        return `1. # 営業会議 - [日付]
2. ## 会議情報
3. ## クライアント背景
4. ## 討議内容
5. ## クライアントニーズ・課題
6. ## 提案ソリューション
7. ## 次のステップ
8. ## フォローアップアクション`;

      default:
        return `1. # 会議 - [日付]
2. ## 会議情報
3. ## 議題
4. ## 討議内容
5. ## 決定事項
6. ## アクションアイテム
7. ## 次回会議`;
    }
  }

  // 特定指示
  private static getSpecificInstructions(config: MeetingNotesConfig): string {
    const instructions: string[] = [];

    if (config.language === 'en') {
      if (config.includeParticipants) {
        instructions.push('- Always include a participants section with names and roles');
      }
      
      if (config.extractDecisions) {
        instructions.push('- Clearly highlight all decisions made during the meeting');
        instructions.push('- Use "**Decision:**" prefix for important decisions');
      }
      
      if (config.extractActionItems) {
        instructions.push('- Extract all action items with clear assignees and deadlines');
        instructions.push('- Format action items as: "- [ ] Task description (Assignee, Due date)"');
      }
      
      if (config.includeDiscussionFlow) {
        instructions.push('- Maintain chronological flow of discussions');
        instructions.push('- Include context for each discussion point');
      }
      
      if (config.highlightKeyPoints) {
        instructions.push('- Use blockquotes (>) for particularly important points');
        instructions.push('- Bold important terms and decisions');
      }

      return `Specific instructions:\n${instructions.join('\n')}`;
    }

    // 日本語版
    if (config.includeParticipants) {
      instructions.push('- 参加者セクションには名前と役職を必ず含めてください');
    }
    
    if (config.extractDecisions) {
      instructions.push('- 会議で決定されたすべての事項を明確に強調してください');
      instructions.push('- 重要な決定には「**決定：**」のプレフィックスを使用してください');
    }
    
    if (config.extractActionItems) {
      instructions.push('- 担当者と期限を明確にしてすべてのアクションアイテムを抽出してください');
      instructions.push('- アクションアイテムの形式： "- [ ] タスク内容 (担当者、期限)"');
    }
    
    if (config.includeDiscussionFlow) {
      instructions.push('- 討議の時系列の流れを維持してください');
      instructions.push('- 各討議ポイントの背景を含めてください');
    }
    
    if (config.highlightKeyPoints) {
      instructions.push('- 特に重要なポイントには引用ブロック（>）を使用してください');
      instructions.push('- 重要な用語と決定事項を太字にしてください');
    }

    return `特定指示：\n${instructions.join('\n')}`;
  }

  // フォーマット指示
  private static getFormatInstructions(config: MeetingNotesConfig): string {
    if (config.language === 'en') {
      return `Format requirements:
- Use proper Markdown formatting with clear headings
- Include timestamps for important events (if available)
- Use bullet points for lists and discussions
- Use tables for structured information when appropriate
- Keep sentences clear and professional
- Use present tense for decisions and future tense for action items`;
    }

    return `形式要件：
- 明確な見出しで適切なMarkdown形式を使用してください
- 重要なイベントにはタイムスタンプを含めてください（利用可能な場合）
- リストと討議には箇条書きを使用してください
- 構造化された情報には適切にテーブルを使用してください
- 文章は明確で専門的に保ってください
- 決定事項は現在形、アクションアイテムは未来形を使用してください`;
  }

  // 会議タイプ別のカスタムプロンプト
  static getCustomPrompt(type: MeetingType, language: 'ja' | 'en' = 'ja'): string {
    if (language === 'en') {
      switch (type) {
        case MeetingType.STANDUP:
          return `Focus on individual contributions and blockers. Keep it concise and action-oriented.`;
        
        case MeetingType.PLANNING:
          return `Emphasize timeline, resources, and dependencies. Ensure all requirements are clearly documented.`;
        
        case MeetingType.REVIEW:
          return `Focus on feedback quality and specific improvement suggestions.`;
        
        case MeetingType.RETROSPECTIVE:
          return `Balance positive feedback with constructive criticism. Focus on actionable improvements.`;
        
        case MeetingType.CLIENT:
          return `Maintain professional tone. Clearly document client requirements and expectations.`;
        
        case MeetingType.SALES:
          return `Focus on client needs, pain points, and how proposed solutions address them.`;
        
        default:
          return `Maintain clear structure and ensure all important points are captured.`;
      }
    }

    switch (type) {
      case MeetingType.STANDUP:
        return `個人の貢献とブロッカーに焦点を当ててください。簡潔でアクション指向にしてください。`;
      
      case MeetingType.PLANNING:
        return `タイムライン、リソース、依存関係を強調してください。すべての要件を明確に文書化してください。`;
      
      case MeetingType.REVIEW:
        return `フィードバックの品質と具体的な改善提案に焦点を当ててください。`;
      
      case MeetingType.RETROSPECTIVE:
        return `ポジティブなフィードバックと建設的な批判のバランスを取ってください。実行可能な改善に焦点を当ててください。`;
      
      case MeetingType.CLIENT:
        return `専門的な文調を維持してください。クライアントの要件と期待を明確に文書化してください。`;
      
      case MeetingType.SALES:
        return `クライアントのニーズ、課題、そして提案ソリューションがそれらをどう解決するかに焦点を当ててください。`;
      
      default:
        return `明確な構造を維持し、すべての重要なポイントが記録されるようにしてください。`;
    }
  }

  // 業界別プロンプト
  static getIndustryPrompt(industry: string, language: 'ja' | 'en' = 'ja'): string {
    const industryPrompts: Record<string, { ja: string; en: string }> = {
      'tech': {
        ja: '技術用語や仕様について正確に記録し、開発スケジュールや技術的な決定事項を明確にしてください。',
        en: 'Accurately record technical terms and specifications, and clarify development schedules and technical decisions.'
      },
      'finance': {
        ja: '財務数値や投資判断について正確に記録し、リスクやコンプライアンス事項を明確にしてください。',
        en: 'Accurately record financial figures and investment decisions, and clarify risks and compliance matters.'
      },
      'healthcare': {
        ja: '医療用語や治療方針について正確に記録し、患者安全や規制要件を明確にしてください。',
        en: 'Accurately record medical terms and treatment policies, and clarify patient safety and regulatory requirements.'
      },
      'education': {
        ja: '教育目標や学習成果について明確に記録し、教育方法や評価基準を詳細にしてください。',
        en: 'Clearly record educational objectives and learning outcomes, and detail teaching methods and evaluation criteria.'
      },
      'legal': {
        ja: '法的用語や条項について正確に記録し、コンプライアンスや法的リスクを明確にしてください。',
        en: 'Accurately record legal terms and clauses, and clarify compliance and legal risks.'
      }
    };

    const prompt = industryPrompts[industry.toLowerCase()];
    return prompt ? prompt[language] : '';
  }
}

// デフォルト設定
export const DEFAULT_MEETING_CONFIG: MeetingNotesConfig = {
  type: MeetingType.GENERAL,
  includeParticipants: true,
  extractDecisions: true,
  extractActionItems: true,
  includeDiscussionFlow: true,
  highlightKeyPoints: true,
  language: 'ja'
};

// 便利な関数
export function createMeetingPrompt(
  type: MeetingType = MeetingType.GENERAL,
  customConfig: Partial<MeetingNotesConfig> = {}
): string {
  const config: MeetingNotesConfig = {
    ...DEFAULT_MEETING_CONFIG,
    type,
    ...customConfig
  };

  return MeetingNotesPrompts.generatePrompt(config);
}

export function createStandupPrompt(language: 'ja' | 'en' = 'ja'): string {
  return createMeetingPrompt(MeetingType.STANDUP, { language });
}

export function createPlanningPrompt(language: 'ja' | 'en' = 'ja'): string {
  return createMeetingPrompt(MeetingType.PLANNING, { language });
}

export function createClientMeetingPrompt(language: 'ja' | 'en' = 'ja'): string {
  return createMeetingPrompt(MeetingType.CLIENT, { language });
}

export function createSalesMeetingPrompt(language: 'ja' | 'en' = 'ja'): string {
  return createMeetingPrompt(MeetingType.SALES, { language });
}