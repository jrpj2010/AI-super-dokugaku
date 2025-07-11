// Gemini音声認識サービス
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiModel } from '../../types/gemini';

interface TranscriptionOptions {
  language?: string;
  model?: GeminiModel;
  temperature?: number;
  maxOutputTokens?: number;
}

export class VoiceTranscriptionService {
  private genAI: GoogleGenerativeAI;
  
  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * 音声データをテキストに変換
   */
  async transcribeAudio(
    audioData: ArrayBuffer | string, // Base64またはArrayBuffer
    options: TranscriptionOptions = {}
  ): Promise<string> {
    try {
      (window as any).debugLog?.('Gemini APIで音声認識を開始', 'info');

      const model = this.genAI.getGenerativeModel({
        model: options.model || GeminiModel.PRO,
      });

      // プロンプトの準備
      const prompt = `この音声を正確に文字起こししてください。
言語: ${options.language || 'ja-JP'}
話者の発言を忠実に記録し、句読点も適切に付けてください。
「えー」「あのー」などのフィラーは除去してください。`;

      // Base64形式に変換
      let base64Audio: string;
      if (typeof audioData === 'string') {
        base64Audio = audioData;
      } else {
        // ArrayBufferをBase64に変換
        const uint8Array = new Uint8Array(audioData);
        const binaryString = Array.from(uint8Array)
          .map(byte => String.fromCharCode(byte))
          .join('');
        base64Audio = btoa(binaryString);
      }

      // Gemini APIに送信
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'audio/webm',
            data: base64Audio
          }
        }
      ]);

      const response = await result.response;
      const transcript = response.text();

      (window as any).debugLog?.(`音声認識完了: ${transcript.substring(0, 50)}...`, 'success');
      
      return transcript;
    } catch (error: any) {
      (window as any).debugLog?.(`音声認識エラー: ${error.message}`, 'error');
      throw new Error(`音声認識に失敗しました: ${error.message}`);
    }
  }

  /**
   * リアルタイム音声認識（チャンク処理）
   */
  async transcribeChunk(
    audioChunk: ArrayBuffer,
    previousContext?: string,
    options: TranscriptionOptions = {}
  ): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: options.model || GeminiModel.FLASH,
        generationConfig: {
          temperature: options.temperature || 0.1,
          maxOutputTokens: options.maxOutputTokens || 1024,
        }
      });

      // コンテキスト付きプロンプト
      const prompt = `音声の続きを文字起こししてください。
${previousContext ? `前の文脈: ${previousContext.slice(-200)}` : ''}
言語: ${options.language || 'ja-JP'}
この音声チャンクの内容を正確に文字起こしし、前の文脈と自然につながるようにしてください。`;

      // Base64変換
      const uint8Array = new Uint8Array(audioChunk);
      const binaryString = Array.from(uint8Array)
        .map(byte => String.fromCharCode(byte))
        .join('');
      const base64Audio = btoa(binaryString);

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'audio/webm',
            data: base64Audio
          }
        }
      ]);

      const response = await result.response;
      return response.text();
    } catch (error: any) {
      (window as any).debugLog?.(`チャンク音声認識エラー: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * 音声ファイルの検証
   */
  validateAudioData(audioData: ArrayBuffer | Blob): boolean {
    if (audioData instanceof Blob) {
      return audioData.size > 0 && audioData.type.startsWith('audio/');
    }
    return audioData.byteLength > 0;
  }
}

// シングルトンインスタンス
let transcriptionService: VoiceTranscriptionService | null = null;

export function getTranscriptionService(): VoiceTranscriptionService {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your-api-key') {
    throw new Error('Gemini APIキーが設定されていません');
  }

  if (!transcriptionService) {
    transcriptionService = new VoiceTranscriptionService(apiKey);
  }

  return transcriptionService;
}