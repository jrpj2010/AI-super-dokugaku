// 音声からMarkdown変換エンジン

import { getModel, callGeminiAPI, selectModel } from './client';
import { 
  GeminiModel, 
  MarkdownConversionRequest, 
  MarkdownConversionResponse,
  ModelSelectionCriteria
} from '../../types/gemini';
import { ProcessedAudio } from '../../types/audio';
import { audioProcessor } from '../audio/processor';

// 変換タイプ
export enum ConversionType {
  MEETING_NOTES = 'meeting_notes',
  ARTICLE = 'article', 
  SUMMARY = 'summary',
  BLOG_POST = 'blog_post',
  DOCUMENTATION = 'documentation',
  CUSTOM = 'custom',
  AUTO_DETECT = 'auto_detect'
}

// 出力フォーマット（互換性のため）
export enum OutputFormat {
  MARKDOWN = 'markdown',
  HTML = 'html',
  TEXT = 'text'
}

// 変換オプション
export interface ConversionOptions {
  type: ConversionType;
  language: 'ja' | 'en';
  includeTimestamps: boolean;
  extractActionItems: boolean;
  highlightImportant: boolean;
  customPrompt?: string;
  model?: GeminiModel;
  temperature?: number;
}

// デフォルト設定
const DEFAULT_OPTIONS: ConversionOptions = {
  type: ConversionType.MEETING_NOTES,
  language: 'ja',
  includeTimestamps: false,
  extractActionItems: true,
  highlightImportant: true,
  temperature: 0.7
};

// Markdown変換サービス
export class MarkdownConverter {
  // 音声からMarkdownに変換
  async convertAudioToMarkdown(
    audio: ProcessedAudio,
    options: Partial<ConversionOptions> = {}
  ): Promise<MarkdownConversionResponse> {
    const config = { ...DEFAULT_OPTIONS, ...options };
    
    // 音声データをBase64エンコード
    const audioBase64 = await audioProcessor.encodeToBase64(audio.processedBuffer);
    
    const request: MarkdownConversionRequest = {
      audioData: audioBase64,
      model: config.model || this.selectOptimalModel(config),
      config: {
        outputFormat: config.type,
        includeTimestamps: config.includeTimestamps,
        extractActionItems: config.extractActionItems,
        highlightImportant: config.highlightImportant,
        customPrompt: config.customPrompt
      }
    };

    return this.processConversion(request, config);
  }

  // テキストからMarkdownに変換
  async convertTextToMarkdown(
    text: string,
    options: Partial<ConversionOptions> = {}
  ): Promise<MarkdownConversionResponse> {
    const config = { ...DEFAULT_OPTIONS, ...options };
    
    const request: MarkdownConversionRequest = {
      text,
      model: config.model || this.selectOptimalModel(config),
      config: {
        outputFormat: config.type,
        includeTimestamps: config.includeTimestamps,
        extractActionItems: config.extractActionItems,
        highlightImportant: config.highlightImportant,
        customPrompt: config.customPrompt
      }
    };

    return this.processConversion(request, config);
  }

  // 変換処理の実行
  private async processConversion(
    request: MarkdownConversionRequest,
    config: ConversionOptions
  ): Promise<MarkdownConversionResponse> {
    const model = getModel(
      request.model || GeminiModel.PRO,
      {
        generationConfig: {
          temperature: config.temperature,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      }
    );

    const prompt = this.buildPrompt(request, config);
    
    const response = await callGeminiAPI(async () => {
      if (request.audioData) {
        // 音声データの場合
        return await model.generateContent([
          { text: prompt },
          {
            inlineData: {
              mimeType: 'audio/pcm',
              data: request.audioData
            }
          }
        ]);
      } else {
        // テキストの場合
        return await model.generateContent(prompt);
      }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    const generatedText = response.data?.response.text() || '';
    
    return this.parseResponse(generatedText, config);
  }

  // プロンプトの構築
  private buildPrompt(request: MarkdownConversionRequest, config: ConversionOptions): string {
    const basePrompt = this.getBasePrompt(config);
    const formatInstructions = this.getFormatInstructions(config);
    const additionalInstructions = this.getAdditionalInstructions(config);

    let prompt = `${basePrompt}\n\n${formatInstructions}`;

    if (additionalInstructions) {
      prompt += `\n\n${additionalInstructions}`;
    }

    if (request.config?.customPrompt) {
      prompt += `\n\n追加指示: ${request.config.customPrompt}`;
    }

    if (request.text) {
      prompt += `\n\n変換対象テキスト:\n${request.text}`;
    }

    return prompt;
  }

  // ベースプロンプトの取得
  private getBasePrompt(config: ConversionOptions): string {
    switch (config.type) {
      case ConversionType.MEETING_NOTES:
        return `あなたは議事録作成の専門家です。提供された音声またはテキストから、構造化された議事録をMarkdown形式で作成してください。

重要なポイント：
- 参加者の発言を要約し、重要な決定事項を明確にしてください
- アクションアイテムと担当者、期限を特定してください
- 議論の流れが分かりやすい構造にしてください`;

      case ConversionType.ARTICLE:
        return `あなたは技術ライターです。提供された音声またはテキストから、読みやすい記事をMarkdown形式で作成してください。

重要なポイント：
- 適切な見出し構造（H1, H2, H3）を使用してください
- 重要なポイントは太字や箇条書きで強調してください
- 読者にとって価値のある内容に整理してください`;

      case ConversionType.SUMMARY:
        return `あなたは要約の専門家です。提供された音声またはテキストから、簡潔で分かりやすい要約をMarkdown形式で作成してください。

重要なポイント：
- 主要なポイントを漏れなく含めてください
- 簡潔で理解しやすい文章にしてください
- 重要度に応じて情報を整理してください`;

      case ConversionType.BLOG_POST:
        return `あなたはブログライターです。提供された音声またはテキストから、魅力的なブログ記事をMarkdown形式で作成してください。

重要なポイント：
- 読者の興味を引く導入を書いてください
- 実用的で価値のある情報を提供してください
- 親しみやすく読みやすい文体にしてください`;

      case ConversionType.DOCUMENTATION:
        return `あなたは技術文書作成の専門家です。提供された音声またはテキストから、正確で詳細なドキュメントをMarkdown形式で作成してください。

重要なポイント：
- 手順や説明は明確で具体的にしてください
- 必要に応じてコードブロックやテーブルを使用してください
- 技術的な正確性を保ってください`;

      case ConversionType.CUSTOM:
      default:
        return `提供された音声またはテキストから、適切に構造化されたMarkdown文書を作成してください。内容に応じて最適な形式を選択し、読みやすく有用な文書にしてください。`;
    }
  }

  // フォーマット指示の取得
  private getFormatInstructions(config: ConversionOptions): string {
    let instructions = `出力形式：
- Markdown形式で出力してください
- 適切な見出し階層を使用してください（# ## ###）
- 重要な情報は太字（**太字**）で強調してください
- リストには箇条書き（- または1.）を使用してください`;

    if (config.language === 'ja') {
      instructions += `\n- 日本語で出力してください`;
    } else {
      instructions += `\n- 英語で出力してください`;
    }

    if (config.includeTimestamps) {
      instructions += `\n- 重要な発言にはタイムスタンプを含めてください`;
    }

    if (config.extractActionItems) {
      instructions += `\n- アクションアイテムがある場合は「## アクションアイテム」セクションを作成してください`;
    }

    if (config.highlightImportant) {
      instructions += `\n- 特に重要なポイントは「> 重要：」として引用ブロックで強調してください`;
    }

    return instructions;
  }

  // 追加指示の取得
  private getAdditionalInstructions(config: ConversionOptions): string {
    switch (config.type) {
      case ConversionType.MEETING_NOTES:
        return `議事録の構造：
1. # 会議タイトル
2. ## 会議情報（日時、参加者、場所）
3. ## 議題
4. ## 討議内容
5. ## 決定事項
6. ## アクションアイテム
7. ## 次回会議`;

      case ConversionType.ARTICLE:
        return `記事の構造：
1. # タイトル
2. ## 概要
3. ## 主要内容（複数のセクション）
4. ## まとめ`;

      case ConversionType.BLOG_POST:
        return `ブログ記事の構造：
1. # タイトル
2. ## はじめに
3. ## メインコンテンツ（読者にとって価値のある情報）
4. ## まとめ
5. ## 関連リンクや参考資料（必要に応じて）`;

      default:
        return '';
    }
  }

  // レスポンスの解析
  private parseResponse(
    generatedText: string,
    config: ConversionOptions
  ): MarkdownConversionResponse {
    // メタデータの抽出
    const metadata = this.extractMetadata(generatedText, config);
    
    // Markdownコンテンツのクリーンアップ
    const markdown = this.cleanupMarkdown(generatedText);

    return {
      markdown,
      metadata,
      usage: {
        promptTokens: 0, // Gemini APIからの取得が必要
        completionTokens: 0,
        totalTokens: 0
      }
    };
  }

  // メタデータの抽出
  private extractMetadata(text: string, config: ConversionOptions): any {
    const metadata: any = {};

    // タイトルの抽出
    const titleMatch = text.match(/^# (.+)$/m);
    if (titleMatch) {
      metadata.title = titleMatch[1].trim();
    }

    // アクションアイテムの抽出
    if (config.extractActionItems) {
      const actionItemsSection = text.match(/##?\s*アクションアイテム[^#]*?((?:[-*]\s*.+\n?)+)/i);
      if (actionItemsSection) {
        metadata.actionItems = actionItemsSection[1]
          .split('\n')
          .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
          .map(line => line.replace(/^[-*]\s*/, '').trim())
          .filter(item => item.length > 0);
      }
    }

    // キーワードの抽出（簡易版）
    const keywords = this.extractKeywords(text);
    if (keywords.length > 0) {
      metadata.keywords = keywords;
    }

    // 参加者の抽出（議事録の場合）
    if (config.type === ConversionType.MEETING_NOTES) {
      const participantsMatch = text.match(/参加者[：:]\s*(.+?)(?:\n|$)/i);
      if (participantsMatch) {
        metadata.participants = participantsMatch[1]
          .split(/[、,]/)
          .map(p => p.trim())
          .filter(p => p.length > 0);
      }
    }

    return metadata;
  }

  // キーワード抽出（簡易版）
  private extractKeywords(text: string): string[] {
    // 太字で強調されたテキストをキーワードとして扱う
    const boldMatches = text.match(/\*\*([^*]+)\*\*/g);
    if (!boldMatches) return [];

    return boldMatches
      .map(match => match.replace(/\*\*/g, '').trim())
      .filter(keyword => keyword.length > 2 && keyword.length < 30)
      .slice(0, 10); // 最大10個
  }

  // Markdownのクリーンアップ
  private cleanupMarkdown(text: string): string {
    return text
      .trim()
      // 余分な空行を削除
      .replace(/\n{3,}/g, '\n\n')
      // 余分なスペースを削除
      .replace(/ +$/gm, '')
      // 見出しの前後に適切なスペースを確保
      .replace(/\n(#{1,6})/g, '\n\n$1')
      .replace(/(#{1,6}.+)\n([^#\n])/g, '$1\n\n$2')
      .trim();
  }

  // 最適なモデルの選択
  private selectOptimalModel(config: ConversionOptions): GeminiModel {
    const criteria: ModelSelectionCriteria = {
      taskType: 'analysis',
      priority: 'accuracy', // Markdown変換は精度を重視
      requiresRealtime: false
    };

    // 複雑な変換タイプの場合はPROモデルを使用
    if (config.type === ConversionType.DOCUMENTATION || 
        config.type === ConversionType.ARTICLE ||
        config.customPrompt) {
      return GeminiModel.PRO;
    }

    return selectModel(criteria);
  }
}

// シングルトンインスタンス
export const markdownConverter = new MarkdownConverter();

// 便利な関数
export async function convertAudioToMarkdown(
  audio: ProcessedAudio,
  type: ConversionType = ConversionType.MEETING_NOTES,
  options: Partial<ConversionOptions> = {}
): Promise<MarkdownConversionResponse> {
  return markdownConverter.convertAudioToMarkdown(audio, { type, ...options });
}

export async function convertTextToMarkdown(
  text: string,
  type: ConversionType = ConversionType.ARTICLE,
  options: Partial<ConversionOptions> = {}
): Promise<MarkdownConversionResponse> {
  return markdownConverter.convertTextToMarkdown(text, { type, ...options });
}