
import { PresentationData, GeminiResponseFormat } from '../types';

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

    // 4. Fix unescaped control characters - 日本語対応版
    // 特に日本語文字が問題になることはないので、制御文字のみに焦点を当てる
    cleaned = cleaned
      .replace(/\r\n/g, '\\n') // Normalize CR LFs to LF first
      .replace(/(?<!\\)\n/g, '\\n')  // Replace literal newlines (LF) not preceded by a backslash
      .replace(/(?<!\\)\r/g, '\\r')  // Replace literal carriage returns (CR) not preceded by a backslash
      .replace(/(?<!\\)\t/g, '\\t'); // Replace literal tabs (TAB) not preceded by a backslash

    return cleaned;
  }

  async generatePresentationContent(
    inputText: string, 
    modelName: string,
    systemPromptTemplate: string,
    desiredSlideCount: number 
  ): Promise<PresentationData> {
    if (!this.ai) {
      throw new Error("Gemini API client is not initialized. Check API Key.");
    }
    if (!modelName || modelName.trim() === "") {
        throw new Error("Model name not provided for Gemini API call.");
    }
    if (!systemPromptTemplate || systemPromptTemplate.trim() === "") {
        throw new Error("System prompt template not provided for Gemini API call.");
    }

    // Replace placeholders in the template
    let prompt = systemPromptTemplate.replace('{{USER_INPUT}}', inputText);
    prompt = prompt.replace('{{NUM_SLIDES}}', desiredSlideCount.toString());


    try {
      // サーバープロキシ経由でAPI呼び出し
      const response = await fetch(`${this.baseUrl}/v1beta/models/${modelName}:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.5,
            topP: 0.9,
            topK: 40,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const responseData = await response.json();
      const rawJson = responseData.candidates?.[0]?.content?.parts?.[0]?.text || '';
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
      } catch (e) {
        console.error("Failed to parse JSON response from Gemini:", cleanedJson);
        console.error("Raw JSON length:", rawJson.length);
        console.error("Cleaned JSON length:", cleanedJson.length);
        console.error("First 50 chars of raw JSON:", JSON.stringify(rawJson.substring(0, 50)));
        console.error("First 50 chars of cleaned JSON:", JSON.stringify(cleanedJson.substring(0, 50)));
        console.error("JSON parse error:", e);
        
        // Try to identify problematic characters (excluding valid Unicode characters like Japanese)
        for (let i = 0; i < Math.min(cleanedJson.length, 100); i++) {
          const char = cleanedJson[i];
          const charCode = char.charCodeAt(0);
          // Only report actual control characters (0-31) and DEL (127), not valid Unicode
          if (charCode < 32 || charCode === 127) {
            console.error(`Control character at position ${i}:`, charCode, JSON.stringify(char));
          }
        }
        
        throw new Error(`AIからのJSONレスポンスが無効です: ${ (e as Error).message }。未加工レスポンス抜粋 (最大500文字): ${rawJson.substring(0,500)}`);
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
