// Gemini API関連の型定義

// Geminiモデルの種類
export enum GeminiModel {
  // 高性能モデル（複雑な推論・高度な分析用）
  PRO = 'gemini-2.5-pro',
  // 標準モデル（リアルタイム処理・一般的なタスク用）
  FLASH = 'gemini-2.5-flash',
  // 軽量モデル（高速・低コスト・頻繁なタスク用）
  FLASH_LITE = 'gemini-2.5-flash-8b',
  // Live API用モデル（リアルタイム音声対話）
  FLASH_LIVE = 'gemini-live-2.5-flash-preview',
  // ネイティブ音声対話モデル
  FLASH_NATIVE_AUDIO = 'gemini-2.5-flash-preview-native-audio-dialog'
}

// 音声フォーマット
export interface AudioFormat {
  sampleRate: number; // 16000 (16kHz)
  channels: number;   // 1 (mono)
  encoding: 'LINEAR16' | 'MULAW' | 'AMR' | 'AMR_WB' | 'OGG_OPUS' | 'SPEEX_WITH_HEADER_BYTE';
}

// 音声入力設定
export interface AudioConfig {
  encoding: string;
  sampleRate: number;
  languageCode?: string; // 'ja-JP' など
}

// テキスト生成設定
export interface GenerationConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  stopSequences?: string[];
}

// セーフティ設定
export interface SafetySettings {
  category: string;
  threshold: 'HARM_BLOCK_THRESHOLD_UNSPECIFIED' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH' | 'BLOCK_NONE';
}

// プロンプト設定
export interface PromptConfig {
  systemInstruction?: string;
  context?: string;
  examples?: Array<{
    input: string;
    output: string;
  }>;
}

// Markdown変換リクエスト
export interface MarkdownConversionRequest {
  audioData?: string; // Base64エンコードされた音声データ
  text?: string;     // テキスト入力（音声の代わり）
  model?: GeminiModel;
  config?: {
    outputFormat?: 'meeting_notes' | 'article' | 'summary' | 'custom';
    includeTimestamps?: boolean;
    extractActionItems?: boolean;
    highlightImportant?: boolean;
    customPrompt?: string;
  };
}

// Markdown変換レスポンス
export interface MarkdownConversionResponse {
  markdown: string;
  metadata?: {
    title?: string;
    summary?: string;
    actionItems?: string[];
    keywords?: string[];
    participants?: string[];
    duration?: number;
  };
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Live APIセッション設定
export interface LiveSessionConfig {
  model: GeminiModel;
  responseModalities: Array<'TEXT' | 'AUDIO'>;
  systemInstruction?: string;
  generationConfig?: GenerationConfig;
  audioConfig?: AudioConfig;
}

// Live APIメッセージタイプ
export interface LiveMessage {
  type: 'audio' | 'text' | 'error' | 'end';
  data?: any;
  timestamp?: number;
}

// Live APIコールバック
export interface LiveCallbacks {
  onopen?: () => void;
  onmessage?: (message: LiveMessage) => void;
  onerror?: (error: Error) => void;
  onclose?: () => void;
}

// エラータイプ
export interface GeminiError {
  code: string;
  message: string;
  details?: any;
}

// APIレスポンス基本型
export interface GeminiResponse<T> {
  data?: T;
  error?: GeminiError;
}

// ファイルアップロードレスポンス
export interface FileUploadResponse {
  file: {
    name: string;
    displayName?: string;
    mimeType: string;
    sizeBytes: string;
    createTime: string;
    updateTime: string;
    expirationTime: string;
    sha256Hash: string;
    uri: string;
    state: 'PROCESSING' | 'ACTIVE' | 'FAILED';
    error?: {
      code: number;
      message: string;
    };
  };
}

// モデル選択基準
export interface ModelSelectionCriteria {
  taskType: 'transcription' | 'meeting_notes' | 'summarization' | 'real_time_chat' | 'analysis';
  priority: 'speed' | 'accuracy' | 'cost';
  estimatedLength?: number; // 推定文字数
  requiresRealtime?: boolean;
}