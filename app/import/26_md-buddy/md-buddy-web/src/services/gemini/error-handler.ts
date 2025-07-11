// Gemini APIエラーハンドリング

import { GeminiError } from '../../types/gemini';

// エラーコード定義
export enum GeminiErrorCode {
  // 認証エラー
  AUTH_ERROR = 'AUTH_ERROR',
  API_KEY_INVALID = 'API_KEY_INVALID',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  
  // ネットワークエラー
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  
  // API制限エラー
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  RATE_LIMIT = 'RATE_LIMIT',
  
  // 入力エラー
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_AUDIO_FORMAT = 'INVALID_AUDIO_FORMAT',
  AUDIO_TOO_LARGE = 'AUDIO_TOO_LARGE',
  AUDIO_TOO_SHORT = 'AUDIO_TOO_SHORT',
  
  // Live APIエラー
  LIVE_SESSION_ERROR = 'LIVE_SESSION_ERROR',
  WEBSOCKET_ERROR = 'WEBSOCKET_ERROR',
  SESSION_TIMEOUT = 'SESSION_TIMEOUT',
  
  // モデルエラー
  MODEL_ERROR = 'MODEL_ERROR',
  MODEL_UNAVAILABLE = 'MODEL_UNAVAILABLE',
  GENERATION_ERROR = 'GENERATION_ERROR',
  
  // 処理エラー
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  CONVERSION_ERROR = 'CONVERSION_ERROR',
  
  // 一般エラー
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

// ユーザー向けエラーメッセージ
const USER_FRIENDLY_MESSAGES: Record<GeminiErrorCode, string> = {
  [GeminiErrorCode.AUTH_ERROR]: 'APIキーが正しくありません。設定を確認してください。',
  [GeminiErrorCode.API_KEY_INVALID]: 'APIキーが無効です。有効なGemini APIキーを設定してください。',
  [GeminiErrorCode.PERMISSION_DENIED]: 'このAPIへのアクセス権限がありません。',
  
  [GeminiErrorCode.NETWORK_ERROR]: 'ネットワーク接続に問題があります。インターネット接続を確認してください。',
  [GeminiErrorCode.TIMEOUT_ERROR]: 'リクエストがタイムアウトしました。しばらく待ってから再試行してください。',
  [GeminiErrorCode.CONNECTION_ERROR]: 'サーバーに接続できません。しばらく待ってから再試行してください。',
  
  [GeminiErrorCode.QUOTA_EXCEEDED]: 'API使用量の上限に達しました。しばらく待ってから再試行してください。',
  [GeminiErrorCode.RATE_LIMIT]: 'リクエストが多すぎます。しばらく待ってから再試行してください。',
  
  [GeminiErrorCode.INVALID_REQUEST]: 'リクエストの形式が正しくありません。',
  [GeminiErrorCode.INVALID_AUDIO_FORMAT]: '音声ファイルの形式がサポートされていません。',
  [GeminiErrorCode.AUDIO_TOO_LARGE]: '音声ファイルが大きすぎます。短い音声で再試行してください。',
  [GeminiErrorCode.AUDIO_TOO_SHORT]: '音声が短すぎます。もう少し長い音声で再試行してください。',
  
  [GeminiErrorCode.LIVE_SESSION_ERROR]: 'リアルタイム音声セッションでエラーが発生しました。',
  [GeminiErrorCode.WEBSOCKET_ERROR]: 'リアルタイム接続でエラーが発生しました。',
  [GeminiErrorCode.SESSION_TIMEOUT]: 'セッションがタイムアウトしました。再接続してください。',
  
  [GeminiErrorCode.MODEL_ERROR]: '選択されたAIモデルでエラーが発生しました。',
  [GeminiErrorCode.MODEL_UNAVAILABLE]: '選択されたAIモデルが利用できません。',
  [GeminiErrorCode.GENERATION_ERROR]: 'AI応答の生成中にエラーが発生しました。',
  
  [GeminiErrorCode.PROCESSING_ERROR]: '音声処理中にエラーが発生しました。',
  [GeminiErrorCode.CONVERSION_ERROR]: '音声変換中にエラーが発生しました。',
  
  [GeminiErrorCode.UNKNOWN_ERROR]: '予期しないエラーが発生しました。',
  [GeminiErrorCode.INTERNAL_ERROR]: 'システム内部エラーが発生しました。'
};

// 復旧提案
const RECOVERY_SUGGESTIONS: Record<GeminiErrorCode, string[]> = {
  [GeminiErrorCode.AUTH_ERROR]: [
    'APIキーが正しく設定されているか確認してください',
    'Gemini APIダッシュボードでAPIキーを確認してください'
  ],
  [GeminiErrorCode.API_KEY_INVALID]: [
    'APIキーを再作成してください',
    '環境変数VITE_GEMINI_API_KEYが正しく設定されているか確認してください'
  ],
  [GeminiErrorCode.PERMISSION_DENIED]: [
    'Gemini APIが有効になっているか確認してください',
    'APIキーに適切な権限が付与されているか確認してください'
  ],
  
  [GeminiErrorCode.NETWORK_ERROR]: [
    'インターネット接続を確認してください',
    'VPNを使用している場合は、一時的に無効にしてみてください',
    'ファイアウォール設定を確認してください'
  ],
  [GeminiErrorCode.TIMEOUT_ERROR]: [
    'しばらく待ってから再試行してください',
    'より短い音声で試してみてください',
    'インターネット接続の安定性を確認してください'
  ],
  [GeminiErrorCode.CONNECTION_ERROR]: [
    'インターネット接続を確認してください',
    'サーバーの状態を確認してください',
    '時間をおいて再試行してください'
  ],
  
  [GeminiErrorCode.QUOTA_EXCEEDED]: [
    'しばらく待ってから再試行してください',
    'Gemini APIの使用量制限を確認してください',
    '必要に応じて課金プランのアップグレードを検討してください'
  ],
  [GeminiErrorCode.RATE_LIMIT]: [
    '30秒程度待ってから再試行してください',
    'リクエストの頻度を下げてください'
  ],
  
  [GeminiErrorCode.INVALID_AUDIO_FORMAT]: [
    'サポートされている音声形式（WAV、MP3、WebM）を使用してください',
    '音声を再録音してみてください'
  ],
  [GeminiErrorCode.AUDIO_TOO_LARGE]: [
    '音声を短く録音し直してください（推奨：5分以内）',
    '音声ファイルを圧縮してみてください'
  ],
  [GeminiErrorCode.AUDIO_TOO_SHORT]: [
    'より長い音声（3秒以上）で再試行してください',
    'はっきりと話してみてください'
  ],
  
  [GeminiErrorCode.LIVE_SESSION_ERROR]: [
    'セッションを再開してください',
    'ブラウザを再読み込みしてみてください'
  ],
  [GeminiErrorCode.WEBSOCKET_ERROR]: [
    'ページを再読み込みしてください',
    'ブラウザが最新版かどうか確認してください'
  ],
  [GeminiErrorCode.SESSION_TIMEOUT]: [
    '新しいセッションを開始してください',
    'より頻繁に音声を送信してください'
  ],
  
  [GeminiErrorCode.MODEL_ERROR]: [
    '別のAIモデルを試してください',
    'しばらく待ってから再試行してください'
  ],
  [GeminiErrorCode.MODEL_UNAVAILABLE]: [
    '別のAIモデルを選択してください',
    'サービスの状態を確認してください'
  ],
  [GeminiErrorCode.GENERATION_ERROR]: [
    '入力内容を調整して再試行してください',
    'より具体的な指示を与えてみてください'
  ],
  
  [GeminiErrorCode.PROCESSING_ERROR]: [
    '音声を再録音してみてください',
    'ノイズの少ない環境で録音してください'
  ],
  [GeminiErrorCode.CONVERSION_ERROR]: [
    '音声形式を変更して再試行してください',
    'より短い音声で試してみてください'
  ],
  
  [GeminiErrorCode.UNKNOWN_ERROR]: [
    'ページを再読み込みしてください',
    'ブラウザのキャッシュをクリアしてください',
    'しばらく待ってから再試行してください'
  ],
  [GeminiErrorCode.INTERNAL_ERROR]: [
    'しばらく待ってから再試行してください',
    '問題が続く場合はサポートにお問い合わせください'
  ]
};

// エラー分類
export interface ErrorClassification {
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'auth' | 'network' | 'quota' | 'input' | 'live' | 'model' | 'processing' | 'system';
  recoverable: boolean;
  retryable: boolean;
  userAction: boolean;
}

const ERROR_CLASSIFICATIONS: Record<GeminiErrorCode, ErrorClassification> = {
  [GeminiErrorCode.AUTH_ERROR]: {
    severity: 'high',
    category: 'auth',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  [GeminiErrorCode.API_KEY_INVALID]: {
    severity: 'high',
    category: 'auth',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  [GeminiErrorCode.PERMISSION_DENIED]: {
    severity: 'high',
    category: 'auth',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  
  [GeminiErrorCode.NETWORK_ERROR]: {
    severity: 'medium',
    category: 'network',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  [GeminiErrorCode.TIMEOUT_ERROR]: {
    severity: 'medium',
    category: 'network',
    recoverable: true,
    retryable: true,
    userAction: false
  },
  [GeminiErrorCode.CONNECTION_ERROR]: {
    severity: 'medium',
    category: 'network',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  
  [GeminiErrorCode.QUOTA_EXCEEDED]: {
    severity: 'medium',
    category: 'quota',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  [GeminiErrorCode.RATE_LIMIT]: {
    severity: 'low',
    category: 'quota',
    recoverable: true,
    retryable: true,
    userAction: false
  },
  
  [GeminiErrorCode.INVALID_REQUEST]: {
    severity: 'medium',
    category: 'input',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  [GeminiErrorCode.INVALID_AUDIO_FORMAT]: {
    severity: 'medium',
    category: 'input',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  [GeminiErrorCode.AUDIO_TOO_LARGE]: {
    severity: 'low',
    category: 'input',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  [GeminiErrorCode.AUDIO_TOO_SHORT]: {
    severity: 'low',
    category: 'input',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  
  [GeminiErrorCode.LIVE_SESSION_ERROR]: {
    severity: 'medium',
    category: 'live',
    recoverable: true,
    retryable: true,
    userAction: false
  },
  [GeminiErrorCode.WEBSOCKET_ERROR]: {
    severity: 'medium',
    category: 'live',
    recoverable: true,
    retryable: true,
    userAction: false
  },
  [GeminiErrorCode.SESSION_TIMEOUT]: {
    severity: 'low',
    category: 'live',
    recoverable: true,
    retryable: true,
    userAction: false
  },
  
  [GeminiErrorCode.MODEL_ERROR]: {
    severity: 'medium',
    category: 'model',
    recoverable: true,
    retryable: true,
    userAction: false
  },
  [GeminiErrorCode.MODEL_UNAVAILABLE]: {
    severity: 'medium',
    category: 'model',
    recoverable: true,
    retryable: false,
    userAction: true
  },
  [GeminiErrorCode.GENERATION_ERROR]: {
    severity: 'medium',
    category: 'model',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  
  [GeminiErrorCode.PROCESSING_ERROR]: {
    severity: 'medium',
    category: 'processing',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  [GeminiErrorCode.CONVERSION_ERROR]: {
    severity: 'medium',
    category: 'processing',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  
  [GeminiErrorCode.UNKNOWN_ERROR]: {
    severity: 'medium',
    category: 'system',
    recoverable: true,
    retryable: true,
    userAction: true
  },
  [GeminiErrorCode.INTERNAL_ERROR]: {
    severity: 'high',
    category: 'system',
    recoverable: false,
    retryable: true,
    userAction: false
  }
};

// エラーハンドラークラス
export class GeminiErrorHandler {
  // エラーの解析と変換
  static parseError(error: any): GeminiError {
    // Gemini APIエラーの場合
    if (error.response?.data?.error) {
      return this.parseGeminiAPIError(error.response.data.error);
    }

    // ネットワークエラー
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return {
        code: GeminiErrorCode.TIMEOUT_ERROR,
        message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.TIMEOUT_ERROR],
        details: { originalError: error.message }
      };
    }

    // WebSocketエラー
    if (error.name === 'WebSocketError' || error.type === 'websocket') {
      return {
        code: GeminiErrorCode.WEBSOCKET_ERROR,
        message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.WEBSOCKET_ERROR],
        details: { originalError: error.message }
      };
    }

    // 認証エラー
    if (error.status === 401 || error.message?.includes('API key')) {
      return {
        code: GeminiErrorCode.API_KEY_INVALID,
        message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.API_KEY_INVALID],
        details: { originalError: error.message }
      };
    }

    // レート制限エラー
    if (error.status === 429) {
      return {
        code: GeminiErrorCode.RATE_LIMIT,
        message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.RATE_LIMIT],
        details: { originalError: error.message }
      };
    }

    // 一般的なエラー
    return {
      code: GeminiErrorCode.UNKNOWN_ERROR,
      message: error.message || USER_FRIENDLY_MESSAGES[GeminiErrorCode.UNKNOWN_ERROR],
      details: { originalError: error }
    };
  }

  // Gemini API固有エラーの解析
  private static parseGeminiAPIError(apiError: any): GeminiError {
    const code = apiError.code || 'UNKNOWN';
    const message = apiError.message || '';

    // ステータスコードによる分類
    switch (apiError.status) {
      case 400:
        if (message.includes('audio')) {
          return {
            code: GeminiErrorCode.INVALID_AUDIO_FORMAT,
            message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.INVALID_AUDIO_FORMAT],
            details: apiError
          };
        }
        return {
          code: GeminiErrorCode.INVALID_REQUEST,
          message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.INVALID_REQUEST],
          details: apiError
        };

      case 401:
        return {
          code: GeminiErrorCode.AUTH_ERROR,
          message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.AUTH_ERROR],
          details: apiError
        };

      case 403:
        return {
          code: GeminiErrorCode.PERMISSION_DENIED,
          message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.PERMISSION_DENIED],
          details: apiError
        };

      case 429:
        return {
          code: GeminiErrorCode.QUOTA_EXCEEDED,
          message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.QUOTA_EXCEEDED],
          details: apiError
        };

      case 500:
      case 502:
      case 503:
        return {
          code: GeminiErrorCode.INTERNAL_ERROR,
          message: USER_FRIENDLY_MESSAGES[GeminiErrorCode.INTERNAL_ERROR],
          details: apiError
        };

      default:
        return {
          code: GeminiErrorCode.UNKNOWN_ERROR,
          message: message || USER_FRIENDLY_MESSAGES[GeminiErrorCode.UNKNOWN_ERROR],
          details: apiError
        };
    }
  }

  // エラー分類の取得
  static getErrorClassification(error: GeminiError): ErrorClassification {
    const code = error.code as GeminiErrorCode;
    return ERROR_CLASSIFICATIONS[code] || ERROR_CLASSIFICATIONS[GeminiErrorCode.UNKNOWN_ERROR];
  }

  // 復旧提案の取得
  static getRecoverySuggestions(error: GeminiError): string[] {
    const code = error.code as GeminiErrorCode;
    return RECOVERY_SUGGESTIONS[code] || RECOVERY_SUGGESTIONS[GeminiErrorCode.UNKNOWN_ERROR];
  }

  // ユーザー向けメッセージの取得
  static getUserFriendlyMessage(error: GeminiError): string {
    const code = error.code as GeminiErrorCode;
    return USER_FRIENDLY_MESSAGES[code] || error.message || USER_FRIENDLY_MESSAGES[GeminiErrorCode.UNKNOWN_ERROR];
  }

  // リトライ可能かどうかの判定
  static isRetryable(error: GeminiError): boolean {
    const classification = this.getErrorClassification(error);
    return classification.retryable;
  }

  // リトライ遅延時間の計算
  static getRetryDelay(attemptCount: number, error: GeminiError): number {
    const classification = this.getErrorClassification(error);
    
    if (!classification.retryable) {
      return 0;
    }

    // 指数バックオフ
    const baseDelay = classification.category === 'quota' ? 5000 : 1000; // クォータエラーは長めに
    return Math.min(baseDelay * Math.pow(2, attemptCount), 30000); // 最大30秒
  }

  // エラーログの生成
  static createErrorLog(error: GeminiError, context?: any): any {
    const classification = this.getErrorClassification(error);
    
    return {
      timestamp: new Date().toISOString(),
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      },
      classification,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };
  }
}

// エラーリポーター（オプション）
export class ErrorReporter {
  private static reportEndpoint = '/api/errors'; // 必要に応じて設定

  static async reportError(error: GeminiError, context?: any): Promise<void> {
    try {
      const errorLog = GeminiErrorHandler.createErrorLog(error, context);
      
      // 重要なエラーのみ報告
      const classification = GeminiErrorHandler.getErrorClassification(error);
      if (classification.severity === 'critical' || classification.severity === 'high') {
        // 実際の実装では、外部サービス（Sentry等）や内部エンドポイントに送信
        console.error('Critical error reported:', errorLog);
      }
    } catch (reportError) {
      console.error('Failed to report error:', reportError);
    }
  }
}