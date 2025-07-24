
import { PresentationData, GeminiResponseFormat } from '../types';
import { jsonrepair } from 'jsonrepair';

export class GeminiService {
  private baseUrl: string;
  private debugCallback?: (level: string, message: string, details?: any) => void;
  private userApiKey?: string;

  constructor() {
    // サーバープロキシを使用
    this.baseUrl = '/api-proxy';
  }

  public setDebugCallback(callback: (level: string, message: string, details?: any) => void) {
    this.debugCallback = callback;
  }

  public setUserApiKey(apiKey?: string) {
    this.userApiKey = apiKey;
  }

  private log(level: string, message: string, details?: any) {
    if (this.debugCallback) {
      this.debugCallback(level, message, details);
    }
  }

  public isApiKeySet(): boolean {
    // サーバー側で管理されているので常にtrue
    return true;
  }

  private async generateWithFallback(
    prompt: string,
    modelName: string,
    originalSlideCount: number
  ): Promise<any> {
    const maxAttempts = 3;
    let currentSlideCount = originalSlideCount;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxAttempts} with ${currentSlideCount} slides`);
        
        const currentPrompt = prompt.replace(originalSlideCount.toString(), currentSlideCount.toString());
        
        const requestBody: any = {
          contents: [{ parts: [{ text: currentPrompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.5,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 65536, // Gemini 2.5の最大出力トークン数
            candidateCount: 1,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        };
        
        if (this.userApiKey) {
          requestBody.apiKey = this.userApiKey;
        }

        this.log('info', `Gemini APIにリクエスト送信中... (モデル: ${modelName}, スライド数: ${currentSlideCount})`, {
          model: modelName,
          slideCount: currentSlideCount,
          attempt: attempt
        });

        const response = await fetch(`${this.baseUrl}/v1beta/models/${modelName}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorText = await response.text();
          this.log('error', `Gemini APIエラー: HTTP ${response.status}`, {
            status: response.status,
            errorText: errorText.substring(0, 500)
          });
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const responseData = await response.json();
        this.log('success', 'Gemini APIからレスポンスを受信しました', {
          responseSize: JSON.stringify(responseData).length,
          hasContent: !!responseData.candidates?.[0]?.content
        });
        
        // finish_reasonをチェック
        const candidate = responseData.candidates?.[0];
        if (candidate?.finishReason === 'MAX_TOKENS' && attempt < maxAttempts) {
          console.warn(`Response truncated due to token limit. Reducing slides from ${currentSlideCount} to ${Math.floor(currentSlideCount * 0.7)}`);
          currentSlideCount = Math.max(3, Math.floor(currentSlideCount * 0.7));
          continue;
        }
        
        return responseData;
        
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        
        if (attempt < maxAttempts) {
          // 失敗時はスライド数を減らして再試行
          currentSlideCount = Math.max(3, Math.floor(currentSlideCount * 0.8));
          console.log(`Retrying with reduced slide count: ${currentSlideCount}`);
        } else {
          throw error;
        }
      }
    }
    
    throw new Error('All attempts failed');
  }

  private estimateTokenCount(text: string): number {
    // 概算トークン数計算（日本語対応）
    // 英語: 約4文字 = 1トークン、日本語: 約1.5文字 = 1トークン
    const englishChars = text.match(/[a-zA-Z0-9\s]/g)?.length || 0;
    const japaneseChars = text.length - englishChars;
    return Math.ceil(englishChars / 4 + japaneseChars / 1.5);
  }

  private optimizePromptForLength(prompt: string, maxInputTokens: number = 7000): string {
    const estimatedTokens = this.estimateTokenCount(prompt);
    console.log('Estimated input tokens:', estimatedTokens);
    
    if (estimatedTokens <= maxInputTokens) {
      return prompt;
    }
    
    // プロンプトが長すぎる場合の最適化
    console.warn('Prompt is too long, attempting to optimize...');
    
    // ユーザー入力部分を特定して短縮
    const userInputMatch = prompt.match(/{{USER_INPUT}}|\[\[USER_INPUT\]\]/);
    if (userInputMatch) {
      // ユーザー入力部分を段階的に短縮
      const beforeInput = prompt.split(userInputMatch[0])[0];
      const afterInput = prompt.split(userInputMatch[0])[1];
      const systemTokens = this.estimateTokenCount(beforeInput + afterInput);
      const availableForUserInput = maxInputTokens - systemTokens - 500; // 余裕を持たせる
      
      if (availableForUserInput > 0) {
        const maxUserInputChars = Math.floor(availableForUserInput * 3); // 保守的な見積もり
        const originalUserInput = prompt.split(userInputMatch[0])[1] || '';
        if (originalUserInput.length > maxUserInputChars) {
          const truncatedInput = originalUserInput.substring(0, maxUserInputChars) + '\n\n[注意: 入力テキストが長すぎるため、一部が省略されました]';
          return beforeInput + truncatedInput + afterInput;
        }
      }
    }
    
    // 全体的な短縮
    const targetChars = Math.floor(maxInputTokens * 3);
    return prompt.substring(0, targetChars) + '\n\n[注意: プロンプトが長すぎるため、一部が省略されました]';
  }

  private detectResponseType(response: string): 'gen-spa' | 'marp' | 'generic' {
    // JSON形式でGen-Spa構造を持つか確認
    if (response.includes('"presentationTitle"') && response.includes('"analysisAndDesignDocument"') && response.includes('"slides"')) {
      return 'gen-spa';
    }
    // MARP形式の検出
    if (response.includes('marp:') || (response.includes('---') && response.includes('paginate:'))) {
      return 'marp';
    }
    // JSON形式だが Gen-Spa 以外の構造の場合は JSON として処理を試行
    if (response.trim().startsWith('{') && response.trim().endsWith('}')) {
      return 'gen-spa'; // まずJSON解析を試す
    }
    // その他は汎用形式
    return 'generic';
  }

  private processMarpResponse(marpContent: string, inputText: string): PresentationData {
    // MARPコンテンツを解析してPresentationData形式に変換
    const slides: any[] = [];
    const sections = marpContent.split(/^---$/m);
    
    let presentationTitle = 'MARPプレゼンテーション';
    
    sections.forEach((section, index) => {
      if (index === 0 && section.includes('marp:')) {
        // MARPのメタデータセクションはスキップ
        return;
      }
      
      const lines = section.trim().split('\n');
      const titleMatch = lines[0].match(/^#\s+(.+)$/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : `スライド ${slides.length + 1}`;
      
      if (index === 1 && titleMatch) {
        presentationTitle = title;
      }
      
      slides.push({
        slideNumber: slides.length + 1,
        title: title,
        contentHtml: `<div class="marp-slide">${section.trim()}</div>`,
        highlightedKeywords: [],
        visualElementSuggestion: ''
      });
    });
    
    return {
      presentationTitle,
      analysisAndDesignDocument: `# MARPプレゼンテーション分析\n\n元のMARPコンテンツから${slides.length}枚のスライドを生成しました。`,
      slides
    };
  }

  private processGenericResponse(content: string, inputText: string): PresentationData {
    // 汎用的なテキストレスポンスをPresentationData形式に変換
    
    // JSONデータの場合は構造化されたコンテンツとして処理を試行
    if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
      try {
        const jsonData = JSON.parse(content);
        if (Array.isArray(jsonData)) {
          // 配列の場合、各要素を1つのスライドとして処理
          const slides = jsonData.slice(0, 15).map((item, index) => ({
            slideNumber: index + 1,
            title: item.title || item.name || `項目 ${index + 1}`,
            contentHtml: `<div class="structured-content">
              <h3>${item.title || item.name || `項目 ${index + 1}`}</h3>
              <p>${item.subtitle || item.description || JSON.stringify(item, null, 2).replace(/\n/g, '<br>')}</p>
            </div>`,
            highlightedKeywords: [],
            visualElementSuggestion: ''
          }));
          
          return {
            presentationTitle: '構造化データプレゼンテーション',
            analysisAndDesignDocument: `# データ分析\n\n構造化されたJSONデータから${slides.length}枚のスライドを生成しました。`,
            slides
          };
        }
      } catch (e) {
        // JSON解析に失敗した場合は通常のテキスト処理を続行
        this.log('info', 'JSONとしての解析に失敗、テキストとして処理します');
      }
    }
    
    // 通常のテキスト処理
    const sections = content.split(/\n\n+/);
    const slides: any[] = [];
    
    let presentationTitle = '生成されたプレゼンテーション';
    
    sections.forEach((section, index) => {
      if (!section.trim()) return;
      
      const lines = section.trim().split('\n');
      const firstLine = lines[0];
      
      if (index === 0 && firstLine.length < 50) {
        presentationTitle = firstLine;
      }
      
      slides.push({
        slideNumber: slides.length + 1,
        title: firstLine.length < 50 ? firstLine : `セクション ${slides.length + 1}`,
        contentHtml: `<div class="generic-content">${section.replace(/\n/g, '<br>')}</div>`,
        highlightedKeywords: [],
        visualElementSuggestion: ''
      });
    });
    
    // スライドが1つしかない場合で、非常に長い場合は分割
    if (slides.length === 1 && content.length > 1000) {
      const longContent = content;
      const chunks = this.splitLongContent(longContent, 800);
      
      return {
        presentationTitle,
        analysisAndDesignDocument: `# コンテンツ分析\n\n長いコンテンツを${chunks.length}個のセクションに分割してスライドを生成しました。`,
        slides: chunks.map((chunk, index) => ({
          slideNumber: index + 1,
          title: `セクション ${index + 1}`,
          contentHtml: `<div class="generic-content">${chunk.replace(/\n/g, '<br>')}</div>`,
          highlightedKeywords: [],
          visualElementSuggestion: ''
        }))
      };
    }
    
    return {
      presentationTitle,
      analysisAndDesignDocument: `# コンテンツ分析\n\n入力テキストから${slides.length}個のセクションを抽出し、スライドを生成しました。`,
      slides
    };
  }
  
  private splitLongContent(content: string, maxLength: number): string[] {
    // 長いコンテンツを適切な長さに分割
    const chunks: string[] = [];
    const paragraphs = content.split(/\n\n+/);
    let currentChunk = '';
    
    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length > maxLength && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = paragraph;
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks.length > 0 ? chunks : [content.substring(0, maxLength)];
  }

  private cleanJsonString(jsonStr: string): string {
    let cleaned = jsonStr;
    
    // 0. Remove BOM (Byte Order Mark) and other invisible characters
    cleaned = cleaned.replace(/^\uFEFF/, ''); // Remove UTF-8 BOM
    cleaned = cleaned.replace(/^[\u200B\u200C\u200D\uFEFF]/g, ''); // Remove zero-width characters
    
    // 1. Trim all whitespace (including newlines, tabs, spaces)
    cleaned = cleaned.trim();
    
    // 2. Remove any leading/trailing non-JSON characters before { and after }
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    }
    
    // 3. Remove Markdown code fences (```json ... ```)
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = cleaned.match(fenceRegex);
    if (match && match[2]) {
      cleaned = match[2].trim();
      // Re-extract JSON bounds after removing markdown
      const reJsonStart = cleaned.indexOf('{');
      const reJsonEnd = cleaned.lastIndexOf('}');
      if (reJsonStart !== -1 && reJsonEnd !== -1 && reJsonEnd > reJsonStart) {
        cleaned = cleaned.substring(reJsonStart, reJsonEnd + 1);
      }
    }

    // 4. 文字列リテラル内部の制御文字だけをエスケープ
    cleaned = cleaned.replace(
      /"(?:[^"\\]|\\.)*"/gs,
      (str) =>
        str
          .replace(/\r\n/g, '\\n')
          .replace(/\n/g,  '\\n')
          .replace(/\r/g,  '\\r')
          .replace(/\t/g,  '\\t')
    );

    return cleaned;
  }

  async generatePresentationContent(
    inputText: string, 
    modelName: string,
    systemPromptTemplate: string,
    desiredSlideCount: number,
    templateType?: 'gen-spa' | 'marp' | 'generic'
  ): Promise<PresentationData> {
    this.log('info', 'プレゼンテーション生成を開始します', {
      modelName,
      desiredSlideCount,
      inputTextLength: inputText.length,
      templateType: templateType || 'auto-detect'
    });
    if (!modelName || modelName.trim() === "") {
        throw new Error("Model name not provided for Gemini API call.");
    }
    if (!systemPromptTemplate || systemPromptTemplate.trim() === "") {
        throw new Error("System prompt template not provided for Gemini API call.");
    }

    // Replace placeholders in the template
    let prompt = systemPromptTemplate.replace('{{USER_INPUT}}', inputText);
    prompt = prompt.replace('{{NUM_SLIDES}}', desiredSlideCount.toString());
    
    // プロンプト長の最適化
    prompt = this.optimizePromptForLength(prompt);
    
    // スライド数調整（長いプロンプトの場合は自動的にスライド数を減らす）
    const estimatedTokens = this.estimateTokenCount(prompt);
    let adjustedSlideCount = desiredSlideCount;
    if (estimatedTokens > 6000) {
      // 入力が長い場合は出力を制限
      adjustedSlideCount = Math.max(3, Math.min(desiredSlideCount, Math.floor(8000 / (estimatedTokens / 1000))));
      if (adjustedSlideCount < desiredSlideCount) {
        console.warn(`Long input detected. Reducing slide count from ${desiredSlideCount} to ${adjustedSlideCount}`);
        prompt = prompt.replace(desiredSlideCount.toString(), adjustedSlideCount.toString());
      }
    }


    try {
      // フォールバック機能付きでAPI呼び出し
      const responseData = await this.generateWithFallback(prompt, modelName, adjustedSlideCount);
      
      // レスポンス構造の詳細チェック
      console.log('Gemini API Response Structure:', {
        candidates: responseData.candidates?.length,
        hasContent: !!responseData.candidates?.[0]?.content,
        partsCount: responseData.candidates?.[0]?.content?.parts?.length,
        finishReason: responseData.candidates?.[0]?.finishReason,
        safetyRatings: responseData.candidates?.[0]?.safetyRatings
      });
      
      // finish_reasonをチェックして切り捨ての原因を特定
      const candidate = responseData.candidates?.[0];
      if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
        console.warn('Response finished with reason:', candidate.finishReason);
        if (candidate.finishReason === 'MAX_TOKENS') {
          throw new Error('レスポンスが最大トークン数制限により切り捨てられました。プロンプトを短くするか、スライド数を減らしてください。');
        }
        if (candidate.finishReason === 'SAFETY') {
          throw new Error('セーフティフィルターによりレスポンスがブロックされました。内容を確認してください。');
        }
      }
      
      const rawResponse = responseData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // テンプレートタイプの自動検出
      const effectiveTemplateType = templateType || this.detectResponseType(rawResponse);
      this.log('info', `レスポンスタイプ: ${effectiveTemplateType}`);
      
      // MARP形式の場合は別処理
      if (effectiveTemplateType === 'marp') {
        return this.processMarpResponse(rawResponse, inputText);
      }
      
      // Generic形式の場合も別処理
      if (effectiveTemplateType === 'generic') {
        return this.processGenericResponse(rawResponse, inputText);
      }
      
      // Gen-Spa形式の処理（従来の処理）
      console.log('Raw JSON size:', rawResponse.length, 'characters');
      this.log('info', `JSON解析を開始します (サイズ: ${rawResponse.length}文字)`);
      const cleanedJson = this.cleanJsonString(rawResponse);
      
      let parsedData: GeminiResponseFormat;
      try {
        // 追加のJSONクリーニング：バックスラッシュのエスケープ問題を修正
        let finalJson = cleanedJson;
        
        // 不正なエスケープシーケンスを修正
        finalJson = finalJson
          .replace(/\\n/g, '\\n')   // 改行文字の正規化
          .replace(/\\r/g, '\\r')   // キャリッジリターンの正規化
          .replace(/\\t/g, '\\t')   // タブの正規化
          .replace(/\\\\/g, '\\');  // 重複バックスラッシュの修正
        
        parsedData = JSON.parse(finalJson) as GeminiResponseFormat;
      } catch (e1) {
        console.warn('First JSON.parse() failed - trying jsonrepair...');
        try {
          // jsonrepairで自動修復を試みる
          const repaired = jsonrepair(cleanedJson);
          console.log('jsonrepair successful, parsing repaired JSON...');
          parsedData = JSON.parse(repaired) as GeminiResponseFormat;
        } catch (e2) {
          // デバッグ用に2段階の例外内容も残す
          console.error('jsonrepair でも復旧できず:', e2);
        console.error("Failed to parse JSON response from Gemini (after jsonrepair):");
        console.error("Raw JSON length:", rawResponse.length);
        console.error("Cleaned JSON length:", cleanedJson.length);
        console.error("First 100 chars of raw JSON:", JSON.stringify(rawResponse.substring(0, 100)));
        console.error("Last 100 chars of raw JSON:", JSON.stringify(rawResponse.substring(Math.max(0, rawResponse.length - 100))));
        console.error("First 100 chars of cleaned JSON:", JSON.stringify(cleanedJson.substring(0, 100)));
        console.error("Last 100 chars of cleaned JSON:", JSON.stringify(cleanedJson.substring(Math.max(0, cleanedJson.length - 100))));
        console.error("JSON parse error:", e2);
        
        // JSONが切り捨てられているかチェック
        const lastChar = cleanedJson.trim().slice(-1);
        if (lastChar !== '}') {
          console.error('JSON appears to be truncated - last character is not "}"');
          throw new Error('AIからのレスポンスが途中で切り捨てられています。プロンプトまたはスライド数を減らして再試行してください。');
        }
        
        // Try to identify problematic characters (excluding valid Unicode characters like Japanese)
        for (let i = 0; i < Math.min(cleanedJson.length, 100); i++) {
          const char = cleanedJson[i];
          const charCode = char.charCodeAt(0);
          // Only report actual control characters (0-31) and DEL (127), not valid Unicode
          if (charCode < 32 || charCode === 127) {
            console.error(`Control character at position ${i}:`, charCode, JSON.stringify(char));
          }
        }
        
        // JSON解析に失敗した場合は汎用形式として処理
        this.log('warning', 'JSON解析に失敗しました。汎用形式として処理します。', {
          error: (e2 as Error).message,
          responsePreview: rawResponse.substring(0, 200)
        });
        return this.processGenericResponse(rawResponse, inputText);
        }  // e2のcatch終了
      }
      
      // デバッグ用：実際のレスポンス構造を詳細に記録
      this.log('info', 'パースされたJSONの構造を確認中...', {
        hasTitle: !!parsedData.presentationTitle,
        hasAnalysis: !!parsedData.analysisAndDesignDocument,
        hasSlides: !!parsedData.slides,
        slidesIsArray: Array.isArray(parsedData.slides),
        keys: Object.keys(parsedData),
        structure: JSON.stringify(parsedData, null, 2).substring(0, 500)
      });

      // presentationTitleが欠落している場合のフォールバック処理
      if (!parsedData.presentationTitle) {
        this.log('warning', 'presentationTitleが欠落しています。デフォルト値を使用します。');
        
        // analysisAndDesignDocumentから最初の見出しを抽出して使用
        const titleMatch = parsedData.analysisAndDesignDocument?.match(/^#\s+(.+)$/m);
        if (titleMatch && titleMatch[1]) {
          parsedData.presentationTitle = titleMatch[1].replace(/[：:].+$/, '').trim();
          this.log('info', `タイトルを分析文書から抽出: ${parsedData.presentationTitle}`);
        } else {
          parsedData.presentationTitle = 'プレゼンテーション';
          this.log('info', 'デフォルトタイトルを使用');
        }
      }

      // 必須フィールドのチェック（presentationTitleは既に処理済み）
      if (!parsedData.analysisAndDesignDocument || !Array.isArray(parsedData.slides)) {
        console.error("Unexpected Gemini response structure:", parsedData);
        const missingFields = [];
        if (!parsedData.analysisAndDesignDocument) missingFields.push('analysisAndDesignDocument');
        if (!Array.isArray(parsedData.slides)) missingFields.push('slides (配列である必要があります)');
        
        // 古い形式の可能性をチェック
        const hasOldFormat = Object.keys(parsedData).some(key => 
          ['slide_structure', 'design_theme', 'narrative_flow'].includes(key)
        );
        
        this.log('error', 'レスポンス構造エラー', {
          missing: missingFields,
          received: Object.keys(parsedData),
          hasOldFormat,
          fullResponse: JSON.stringify(parsedData).substring(0, 1000)
        });
        
        if (hasOldFormat) {
          throw new Error(`AIが古い形式でレスポンスを返しました。カスタムテンプレートが正しく更新されているか確認してください。検出されたフィールド: ${Object.keys(parsedData).join(', ')}`);
        }
        
        throw new Error(`AIのレスポンスに必要なフィールドがありません。不足: ${missingFields.join(', ')}`);
      }
      
      parsedData.slides.forEach((slide, index) => {
        slide.slideNumber = index + 1; 
        if (typeof slide.title !== 'string' || typeof slide.contentHtml !== 'string') {
            console.error("Invalid slide structure in Gemini response:", slide);
            throw new Error(`AIレスポンスの ${index + 1} 番目のスライドデータ構造が無効です（タイトルまたはcontentHtmlが文字列ではありません）。`);
        }
      });

      this.log('success', `プレゼンテーション生成完了! (${parsedData.slides.length}枚のスライド)`, {
        title: parsedData.presentationTitle,
        slideCount: parsedData.slides.length
      });

      return {
        presentationTitle: parsedData.presentationTitle,
        analysisAndDesignDocument: parsedData.analysisAndDesignDocument,
        slides: parsedData.slides,
      };
    } catch (error: any) {
      console.error("Error calling Gemini API:", error);
      if (error.message && error.message.includes('API key not valid')) {
        throw new Error("Gemini APIキーが有効ではありません。設定を確認してください。");
      }
      if (error.message && (error.message.includes('model is not found') || error.message.includes('permission denied'))) {
        throw new Error(`選択されたモデル「${modelName}」でエラーが発生しました: ${error.message}。モデルの利用可能性や権限を確認してください。`);
      }
      if (error.message && error.message.startsWith('AIからのJSONレスポンスが無効です')) {
        throw error; 
      }
      throw new Error(`Gemini APIリクエストに失敗しました: ${error.message}`);
    }
  }
}
