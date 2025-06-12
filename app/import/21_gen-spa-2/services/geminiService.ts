
import { PresentationData, GeminiResponseFormat } from '../types';
import { jsonrepair } from 'jsonrepair';

export class GeminiService {
  private baseUrl: string;

  constructor() {
    // サーバープロキシを使用
    this.baseUrl = '/api-proxy';
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
        
        const response = await fetch(`${this.baseUrl}/v1beta/models/${modelName}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const responseData = await response.json();
        
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
    desiredSlideCount: number 
  ): Promise<PresentationData> {
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
      
      const rawJson = responseData.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      // レスポンスサイズの確認
      console.log('Raw JSON size:', rawJson.length, 'characters');
      const cleanedJson = this.cleanJsonString(rawJson);
      
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
        console.error("Raw JSON length:", rawJson.length);
        console.error("Cleaned JSON length:", cleanedJson.length);
        console.error("First 100 chars of raw JSON:", JSON.stringify(rawJson.substring(0, 100)));
        console.error("Last 100 chars of raw JSON:", JSON.stringify(rawJson.substring(Math.max(0, rawJson.length - 100))));
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
        
        throw new Error(`AIからのJSONレスポンスが無効です（自動修復も失敗）: ${ (e2 as Error).message }。未加工レスポンス抜粋 (最大500文字): ${rawJson.substring(0,500)}`);
        }  // e2のcatch終了
      }
      
      if (!parsedData.presentationTitle || !parsedData.analysisAndDesignDocument || !Array.isArray(parsedData.slides)) {
        console.error("Unexpected Gemini response structure:", parsedData);
        throw new Error("AIのレスポンスに必要なフィールド（presentationTitle, analysisAndDesignDocument, または slides）がありません。");
      }
      
      parsedData.slides.forEach((slide, index) => {
        slide.slideNumber = index + 1; 
        if (typeof slide.title !== 'string' || typeof slide.contentHtml !== 'string') {
            console.error("Invalid slide structure in Gemini response:", slide);
            throw new Error(`AIレスポンスの ${index + 1} 番目のスライドデータ構造が無効です（タイトルまたはcontentHtmlが文字列ではありません）。`);
        }
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
