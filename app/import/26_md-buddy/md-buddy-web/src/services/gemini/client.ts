// Gemini APIクライアントの初期化と管理

import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  GeminiModel, 
  GenerationConfig, 
  SafetySettings,
  ModelSelectionCriteria,
  GeminiError,
  GeminiResponse
} from '../../types/gemini';

// APIキーの取得
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// クライアントインスタンスのキャッシュ
const clientCache = new Map<string, GoogleGenerativeAI>();

// デフォルトの生成設定
const DEFAULT_GENERATION_CONFIG: GenerationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 8192,
};

// デフォルトのセーフティ設定
const DEFAULT_SAFETY_SETTINGS: SafetySettings[] = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
];

// APIクライアントの初期化
export function initializeClient(apiKey?: string): GoogleGenerativeAI {
  const key = apiKey || API_KEY;
  
  if (!key) {
    throw new Error('Gemini APIキーが設定されていません');
  }

  // キャッシュからクライアントを取得
  if (clientCache.has(key)) {
    return clientCache.get(key)!;
  }

  // 新しいクライアントを作成してキャッシュ
  const client = new GoogleGenerativeAI(key);
  clientCache.set(key, client);
  
  return client;
}

// モデルの取得
export function getModel(
  modelName: GeminiModel,
  customConfig?: {
    generationConfig?: GenerationConfig;
    safetySettings?: SafetySettings[];
  }
) {
  const client = initializeClient();
  
  return client.getGenerativeModel({
    model: modelName,
    generationConfig: {
      ...DEFAULT_GENERATION_CONFIG,
      ...customConfig?.generationConfig,
    },
    safetySettings: customConfig?.safetySettings || DEFAULT_SAFETY_SETTINGS,
  });
}

// モデル選択ロジック
export function selectModel(criteria: ModelSelectionCriteria): GeminiModel {
  const { taskType, priority, requiresRealtime, estimatedLength } = criteria;

  // リアルタイム処理が必要な場合
  if (requiresRealtime) {
    // 音声対話の場合
    if (taskType === 'real_time_chat') {
      return GeminiModel.FLASH_NATIVE_AUDIO;
    }
    // その他のリアルタイム処理
    return GeminiModel.FLASH_LIVE;
  }

  // タスクタイプ別の選択
  switch (taskType) {
    case 'analysis':
    case 'meeting_notes':
      // 高精度が必要な場合はPRO
      if (priority === 'accuracy') {
        return GeminiModel.PRO;
      }
      // コスト優先の場合はFLASH
      if (priority === 'cost') {
        return GeminiModel.FLASH_LITE;
      }
      // バランス型
      return GeminiModel.FLASH;

    case 'transcription':
      // 短い音声はFLASH_LITE
      if (estimatedLength && estimatedLength < 1000) {
        return GeminiModel.FLASH_LITE;
      }
      // 通常はFLASH
      return GeminiModel.FLASH;

    case 'summarization':
      // 速度優先ならFLASH_LITE
      if (priority === 'speed') {
        return GeminiModel.FLASH_LITE;
      }
      // 精度優先ならPRO
      if (priority === 'accuracy') {
        return GeminiModel.PRO;
      }
      // デフォルトはFLASH
      return GeminiModel.FLASH;

    default:
      // デフォルトはバランスの取れたFLASH
      return GeminiModel.FLASH;
  }
}

// エラーハンドリング
export function handleGeminiError(error: any): GeminiError {
  // Gemini APIエラーの場合
  if (error.response?.data?.error) {
    return {
      code: error.response.data.error.code || 'UNKNOWN_ERROR',
      message: error.response.data.error.message || 'エラーが発生しました',
      details: error.response.data.error.details,
    };
  }

  // ネットワークエラー
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return {
      code: 'TIMEOUT_ERROR',
      message: 'リクエストがタイムアウトしました',
      details: { originalError: error.message },
    };
  }

  // APIキーエラー
  if (error.message?.includes('API key')) {
    return {
      code: 'AUTH_ERROR',
      message: 'APIキーが無効です',
      details: { originalError: error.message },
    };
  }

  // その他のエラー
  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || '予期しないエラーが発生しました',
    details: { originalError: error },
  };
}

// APIレスポンスのラッパー
export async function callGeminiAPI<T>(
  apiCall: () => Promise<T>
): Promise<GeminiResponse<T>> {
  try {
    const data = await apiCall();
    return { data };
  } catch (error) {
    return { error: handleGeminiError(error) };
  }
}

// ヘルスチェック
export async function checkAPIHealth(): Promise<boolean> {
  try {
    const client = initializeClient();
    const model = client.getGenerativeModel({ model: GeminiModel.FLASH_LITE });
    
    // 簡単なテストプロンプト
    const result = await model.generateContent('こんにちは');
    
    return !!result.response.text();
  } catch (error) {
    console.error('Gemini API health check failed:', error);
    return false;
  }
}

// クライアントキャッシュのクリア
export function clearClientCache(): void {
  clientCache.clear();
}

// 使用量の追跡（将来の拡張用）
export interface UsageTracker {
  modelName: GeminiModel;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  timestamp: Date;
}

const usageHistory: UsageTracker[] = [];

export function trackUsage(usage: UsageTracker): void {
  usageHistory.push(usage);
  
  // 古いエントリを削除（7日以上前）
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentHistory = usageHistory.filter(
    entry => entry.timestamp > sevenDaysAgo
  );
  
  usageHistory.length = 0;
  usageHistory.push(...recentHistory);
}

export function getUsageHistory(): UsageTracker[] {
  return [...usageHistory];
}

// 設定のエクスポート
export const GeminiConfig = {
  DEFAULT_GENERATION_CONFIG,
  DEFAULT_SAFETY_SETTINGS,
  API_KEY,
};