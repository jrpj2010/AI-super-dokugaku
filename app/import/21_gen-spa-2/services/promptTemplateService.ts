import { PromptTemplate } from '../types';
import { AVAILABLE_PROMPT_TEMPLATES } from '../promptTemplates';

const CUSTOM_TEMPLATES_KEY = 'genSpaCustomPromptTemplates';

export class PromptTemplateService {
  // デバッグ用のコールバック
  private static debugCallback?: (level: string, message: string, details?: any) => void;
  
  static setDebugCallback(callback: (level: string, message: string, details?: any) => void) {
    this.debugCallback = callback;
  }
  
  private static log(level: string, message: string, details?: any) {
    if (this.debugCallback) {
      this.debugCallback(level, message, details);
    }
  }
  // LocalStorageからカスタムテンプレートを読み込む
  static loadCustomTemplates(): PromptTemplate[] {
    try {
      const saved = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('カスタムテンプレートの読み込みに失敗しました:', error);
    }
    return [];
  }

  // LocalStorageにカスタムテンプレートを保存
  static saveCustomTemplates(templates: PromptTemplate[]): void {
    try {
      localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(templates));
    } catch (error) {
      console.error('カスタムテンプレートの保存に失敗しました:', error);
    }
  }

  // すべてのテンプレート（デフォルト＋カスタム）を取得
  static getAllTemplates(): PromptTemplate[] {
    const customTemplates = this.loadCustomTemplates();
    return [...AVAILABLE_PROMPT_TEMPLATES, ...customTemplates];
  }

  // テンプレートの内容を取得（ファイルまたは直接の内容から）
  static async getTemplateContent(template: PromptTemplate): Promise<string> {
    if (template.content) {
      // カスタムテンプレートの場合は直接内容を返す
      return template.content;
    } else if (template.systemPromptPath) {
      // デフォルトテンプレートの場合はファイルから読み込む
      try {
        // パスの処理を追加
        let path = template.systemPromptPath;
        if (!path.startsWith('/')) {
          path = `/${path}`;
        }
        const publicUrl = process.env.PUBLIC_URL || '';
        path = `${publicUrl}${path}`.replace(/\/\//g, '/');
        
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Failed to load template: ${response.status}`);
        }
        return await response.text();
      } catch (error) {
        console.error('テンプレートファイルの読み込みに失敗しました:', error);
        throw error;
      }
    }
    throw new Error('テンプレートに内容が設定されていません');
  }

  // カスタムテンプレートを追加
  static addCustomTemplate(template: PromptTemplate): void {
    const customTemplates = this.loadCustomTemplates();
    const newTemplate = {
      ...template,
      isCustom: true,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    customTemplates.push(newTemplate);
    this.saveCustomTemplates(customTemplates);
  }

  // テンプレートを更新
  static updateTemplate(id: string, updates: Partial<PromptTemplate>): void {
    const customTemplates = this.loadCustomTemplates();
    const index = customTemplates.findIndex(t => t.id === id);
    
    if (index !== -1) {
      customTemplates[index] = { ...customTemplates[index], ...updates };
      this.saveCustomTemplates(customTemplates);
    } else {
      // デフォルトテンプレートの編集の場合は、カスタムとして保存
      const defaultTemplate = AVAILABLE_PROMPT_TEMPLATES.find(t => t.id === id);
      if (defaultTemplate) {
        const customizedTemplate: PromptTemplate = {
          ...defaultTemplate,
          ...updates,
          id: `custom-${id}-${Date.now()}`,
          isCustom: true,
          systemPromptPath: undefined, // ファイルパスは使わない
        };
        customTemplates.push(customizedTemplate);
        this.saveCustomTemplates(customTemplates);
      }
    }
  }

  // カスタムテンプレートを削除
  static deleteCustomTemplate(id: string): void {
    const customTemplates = this.loadCustomTemplates();
    const filtered = customTemplates.filter(t => t.id !== id);
    this.saveCustomTemplates(filtered);
  }

  // テンプレートが削除可能かどうか
  static isDeletable(template: PromptTemplate): boolean {
    return template.isCustom === true;
  }

  // テンプレートが編集可能かどうか
  static isEditable(template: PromptTemplate): boolean {
    // すべてのテンプレートは編集可能（デフォルトも編集してカスタムとして保存）
    return true;
  }

  // 古い形式のテンプレートを新しい形式に変換
  static migrateOldTemplates(): boolean {
    // 移行完了フラグをチェック
    const migrationVersion = localStorage.getItem('template-migration-version');
    const currentVersion = '2.0'; // バージョンを上げることで再移行可能
    
    if (migrationVersion === currentVersion) {
      this.log('info', `移行は既に完了済みです (バージョン: ${currentVersion})`);
      return false;
    }
    
    try {
      const templates = this.loadCustomTemplates();
      let hasChanges = false;
      
      if (templates.length === 0) {
        this.log('info', 'カスタムテンプレートが存在しないため移行をスキップします');
        // 移行完了フラグを設定（空の場合でも今後のチェックをスキップ）
        localStorage.setItem('template-migration-version', currentVersion);
        return false;
      }
      
      const migratedTemplates = templates.map(template => {
        if (!template.content) return template;
        
        // 古い形式（slide_structure）を検出
        if (template.content.includes('"slide_structure"') || 
            template.content.includes('"design_theme"') ||
            template.content.includes('"narrative_flow"')) {
          
          this.log('warning', `古い形式のテンプレートを検出: ${template.name}`, {
            templateId: template.id,
            oldFormat: 'slide_structure/design_theme/narrative_flow',
            problemFields: [
              template.content.includes('"slide_structure"') ? 'slide_structure' : null,
              template.content.includes('"design_theme"') ? 'design_theme' : null,
              template.content.includes('"narrative_flow"') ? 'narrative_flow' : null
            ].filter(Boolean)
          });
          
          // 新しい形式に変換
          const newContent = this.convertOldFormatToNew(template.content);
          hasChanges = true;
          
          this.log('success', `テンプレート「${template.name}」を新形式に変換しました`, {
            変換内容: {
              'slide_structure → slides': true,
              'design_theme削除': true,
              'narrative_flow削除': true,
              'presentationTitle追加': true,
              'analysisAndDesignDocument追加': true
            }
          });
          
          return {
            ...template,
            content: newContent,
            description: template.description + ' (自動変換済み)'
          };
        }
        
        // 必須フィールドが不足している場合も修正（ただし、既に修正済みは除外）
        if ((!template.content.includes('"presentationTitle"') ||
            !template.content.includes('"analysisAndDesignDocument"') ||
            !template.content.includes('"slides"')) &&
            !template.description.includes('(必須フィールド追加済み)') &&
            !template.description.includes('(自動変換済み)')) {
          
          this.log('warning', `必須フィールドが不足: ${template.name}`, {
            templateId: template.id,
            missingFields: {
              presentationTitle: !template.content.includes('"presentationTitle"'),
              analysisAndDesignDocument: !template.content.includes('"analysisAndDesignDocument"'),
              slides: !template.content.includes('"slides"')
            }
          });
          
          const fixedContent = this.addMissingFields(template.content);
          hasChanges = true;
          
          return {
            ...template,
            content: fixedContent,
            description: template.description + ' (必須フィールド追加済み)'
          };
        }
        
        return template;
      });
      
      if (hasChanges) {
        this.saveCustomTemplates(migratedTemplates);
        this.log('success', 'カスタムテンプレートの移行が完了しました', {
          migratedCount: migratedTemplates.filter(t => t.description?.includes('自動変換済み') || t.description?.includes('必須フィールド追加済み')).length
        });
      }
      
      // 移行処理が完了したことを記録（変更がなくても）
      localStorage.setItem('template-migration-version', currentVersion);
      
      return hasChanges;
    } catch (error) {
      this.log('error', 'テンプレート移行中にエラーが発生しました', error);
      return false;
    }
  }

  // 古い形式を新しい形式に変換
  private static convertOldFormatToNew(content: string): string {
    // デフォルトのテンプレート構造
    const newTemplate = `あなたは「Gen-Spa 2.0」、完全自律型の日本語プレゼンテーション生成システムです。

入力テキスト:
\`\`\`
{{USER_INPUT}}
\`\`\`

以下のステップを精密に実行し、約 {{NUM_SLIDES}} 枚のスライドを生成してください:

**重要: 最初に必ずプレゼンテーション全体のタイトル（presentationTitle）を決定してください。**

1. **プレゼンテーションタイトルの決定 (日本語):**
   - 入力テキストの内容を分析し、プレゼンテーション全体を端的に表現するタイトルを決定してください。

2. **戦略分析と構成設計 (Markdown形式、日本語):**
   - 内容を分析し、キーメッセージを抽出します。
   - ストーリーラインを構築します。
   - 各スライドの概要を設計します。

3. **スライドコンテンツ生成 (HTML構造化、日本語):**
   - 各スライドのタイトルと内容を生成します。
   - Tailwind CSSを使用したスタイリングを適用します。

**出力形式 (厳密なJSON):**
あなたの応答全体は、単一の有効なJSONオブジェクトでなければなりません。JSONの前後に余計なテキストは含めないでください。

\`\`\`json
{
  "presentationTitle": "string (必須: 日本語のプレゼンテーションタイトル)",
  "analysisAndDesignDocument": "string (Markdown形式のコンテンツ、JSON用に正しくエスケープ)",
  "slides": [
    {
      "slideNumber": number,
      "title": "string (日本語のタイトル)",
      "contentHtml": "string (Tailwind CSSを使用したHTMLコンテンツ)",
      "highlightedKeywords": ["string"],
      "visualElementSuggestion": "string",
      "layoutType": "string (任意)",
      "notes": "string (任意)"
    }
  ]
}
\`\`\`

注意事項:
- すべてのテキストは自然な日本語で記述してください
- JSONは完全で有効な形式である必要があります
- 文字列内の引用符やバックスラッシュは適切にエスケープしてください`;
    
    // 既存のコンテンツから有用な情報を抽出して組み込む試み
    try {
      // プロンプトの説明部分を抽出
      const descriptionMatch = content.match(/あなたは[^。]+。/);
      if (descriptionMatch) {
        newTemplate.replace('あなたは「Gen-Spa 2.0」、完全自律型の日本語プレゼンテーション生成システムです。', descriptionMatch[0]);
      }
    } catch (e) {
      // エラーは無視して、デフォルトテンプレートを使用
    }
    
    return newTemplate;
  }

  // 必須フィールドを追加
  private static addMissingFields(content: string): string {
    let updatedContent = content;
    
    // presentationTitleフィールドの追加
    if (!content.includes('"presentationTitle"')) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonPart = jsonMatch[0];
        const updatedJson = jsonPart.replace('{', '{\n  "presentationTitle": "string (必須: 日本語のプレゼンテーションタイトル)",');
        updatedContent = content.replace(jsonPart, updatedJson);
      }
    }
    
    // analysisAndDesignDocumentフィールドの追加
    if (!content.includes('"analysisAndDesignDocument"')) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonPart = jsonMatch[0];
        const lines = jsonPart.split('\n');
        let insertIndex = 1;
        
        // presentationTitleの後に挿入
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('presentationTitle')) {
            insertIndex = i + 1;
            break;
          }
        }
        
        lines.splice(insertIndex, 0, '  "analysisAndDesignDocument": "string (Markdown形式のコンテンツ)",');
        updatedContent = content.replace(jsonPart, lines.join('\n'));
      }
    }
    
    // slidesフィールドの修正（slide_structureからslidesへ）
    if (content.includes('"slide_structure"')) {
      updatedContent = updatedContent.replace(/"slide_structure"/g, '"slides"');
    }
    
    // 不要なフィールドの削除
    updatedContent = updatedContent.replace(/"design_theme":\s*\{[^}]*\},?\s*/g, '');
    updatedContent = updatedContent.replace(/"narrative_flow":\s*\{[^}]*\},?\s*/g, '');
    
    return updatedContent;
  }
}