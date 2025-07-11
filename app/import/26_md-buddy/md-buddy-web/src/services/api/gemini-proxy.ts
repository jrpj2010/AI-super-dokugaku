// Gemini APIプロキシサービス（セキュリティ対策）

import { StreamBuffer } from '../../utils/stream-buffer';
import { GeminiErrorHandler, GeminiError } from '../gemini/error-handler';

// プロキシ設定
export interface ProxyConfig {
  apiUrl: string;
  apiKey?: string;
  timeout?: number;
  maxRetries?: number;
  rateLimit?: {
    requests: number;
    windowMs: number;
  };
}

// リクエストオプション
export interface ProxyRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  stream?: boolean;
  signal?: AbortSignal;
}

// レート制限管理
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    // 期限切れのリクエストを削除
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  timeUntilNextRequest(): number {
    if (this.canMakeRequest()) return 0;
    
    const oldestRequest = Math.min(...this.requests);
    const timeUntilExpiry = this.windowMs - (Date.now() - oldestRequest);
    
    return Math.max(0, timeUntilExpiry);
  }
}

// APIキー検証
class ApiKeyValidator {
  private static readonly KEY_PATTERN = /^[A-Za-z0-9\-_]{39}$/;
  private static readonly ALLOWED_DOMAINS = [
    'generativelanguage.googleapis.com',
    'aiplatform.googleapis.com'
  ];

  static validateKey(key: string): boolean {
    return this.KEY_PATTERN.test(key);
  }

  static validateDomain(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      return this.ALLOWED_DOMAINS.some(domain => 
        parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  }
}

// リクエストサニタイザー
class RequestSanitizer {
  // 危険なヘッダーの削除
  private static readonly FORBIDDEN_HEADERS = [
    'cookie',
    'authorization',
    'x-api-key',
    'x-auth-token'
  ];

  // 許可されたコンテンツタイプ
  private static readonly ALLOWED_CONTENT_TYPES = [
    'application/json',
    'application/octet-stream',
    'audio/webm',
    'audio/wav',
    'audio/mp3'
  ];

  static sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
    const sanitized: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase();
      
      // 禁止ヘッダーをスキップ
      if (this.FORBIDDEN_HEADERS.includes(lowerKey)) {
        continue;
      }
      
      // 値の検証
      if (typeof value !== 'string' || value.length > 1024) {
        continue;
      }
      
      sanitized[key] = value;
    }
    
    return sanitized;
  }

  static sanitizeBody(body: any, contentType?: string): any {
    if (!body) return body;

    // コンテンツタイプの検証
    if (contentType && !this.ALLOWED_CONTENT_TYPES.includes(contentType)) {
      throw new Error('不正なコンテンツタイプです');
    }

    // JSONの場合
    if (contentType === 'application/json') {
      try {
        // JSONをパースして再構築（XSS対策）
        const parsed = JSON.parse(JSON.stringify(body));
        return this.removeScriptTags(parsed);
      } catch {
        throw new Error('不正なJSONデータです');
      }
    }

    // バイナリデータの場合
    if (body instanceof ArrayBuffer || body instanceof Uint8Array) {
      // サイズ制限（100MB）
      const maxSize = 100 * 1024 * 1024;
      if (body.byteLength > maxSize) {
        throw new Error('ファイルサイズが大きすぎます');
      }
      return body;
    }

    return body;
  }

  private static removeScriptTags(obj: any): any {
    if (typeof obj === 'string') {
      // スクリプトタグの除去
      return obj.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeScriptTags(item));
    }
    
    if (obj && typeof obj === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        cleaned[key] = this.removeScriptTags(value);
      }
      return cleaned;
    }
    
    return obj;
  }
}

// メインプロキシクラス
export class GeminiProxy {
  private config: ProxyConfig;
  private rateLimiter?: RateLimiter;

  constructor(config: ProxyConfig) {
    // ドメイン検証
    if (!ApiKeyValidator.validateDomain(config.apiUrl)) {
      throw new Error('許可されていないAPIドメインです');
    }

    this.config = {
      timeout: 30000,
      maxRetries: 3,
      ...config
    };

    // APIキー検証（存在する場合）
    if (this.config.apiKey && !ApiKeyValidator.validateKey(this.config.apiKey)) {
      throw new Error('不正なAPIキー形式です');
    }

    // レート制限の設定
    if (this.config.rateLimit) {
      this.rateLimiter = new RateLimiter(
        this.config.rateLimit.requests,
        this.config.rateLimit.windowMs
      );
    }
  }

  // プロキシリクエスト実行
  async request<T = any>(
    endpoint: string,
    options: ProxyRequestOptions = {}
  ): Promise<T> {
    // レート制限チェック
    if (this.rateLimiter && !this.rateLimiter.canMakeRequest()) {
      const waitTime = this.rateLimiter.timeUntilNextRequest();
      throw new GeminiError({
        code: 'RATE_LIMIT_EXCEEDED',
        message: `レート制限に達しました。${Math.ceil(waitTime / 1000)}秒後に再試行してください。`
      });
    }

    // URL構築
    const url = new URL(endpoint, this.config.apiUrl);
    
    // ヘッダー準備
    const headers = RequestSanitizer.sanitizeHeaders({
      'Content-Type': 'application/json',
      ...options.headers
    });

    // APIキー追加（環境変数から）
    const apiKey = this.config.apiKey || process.env.GEMINI_API_KEY;
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // ボディサニタイズ
    const body = options.body ? 
      RequestSanitizer.sanitizeBody(options.body, headers['Content-Type']) : 
      undefined;

    // リクエスト実行（リトライ付き）
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < (this.config.maxRetries || 1); attempt++) {
      try {
        // レート制限記録
        this.rateLimiter?.recordRequest();

        const response = await this.executeRequest(url.toString(), {
          method: options.method || 'POST',
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: options.signal
        });

        if (!response.ok) {
          const error = await this.parseError(response);
          throw error;
        }

        // ストリーミングレスポンス
        if (options.stream && response.body) {
          return this.handleStreamResponse(response) as any;
        }

        // 通常のレスポンス
        return await response.json();
      } catch (error) {
        lastError = error as Error;
        
        // リトライ可能なエラーでない場合は即座に終了
        if (!this.isRetryableError(error)) {
          break;
        }

        // 指数バックオフ
        if (attempt < (this.config.maxRetries || 1) - 1) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }

    throw lastError || new Error('リクエストに失敗しました');
  }

  // HTTPリクエスト実行
  private async executeRequest(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout || 30000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: options.signal || controller.signal
      });
      
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // ストリーミングレスポンス処理
  private async handleStreamResponse(response: Response): Promise<ReadableStream> {
    const reader = response.body!.getReader();
    const buffer = new StreamBuffer({ maxSize: 10 * 1024 * 1024 }); // 10MB

    return new ReadableStream({
      async pull(controller) {
        try {
          const { done, value } = await reader.read();
          
          if (done) {
            controller.close();
            return;
          }

          // バッファに書き込み
          if (!buffer.write(value)) {
            controller.error(new Error('ストリームバッファがオーバーフローしました'));
            return;
          }

          controller.enqueue(value);
        } catch (error) {
          controller.error(error);
        }
      },

      cancel() {
        reader.cancel();
      }
    });
  }

  // エラーパース
  private async parseError(response: Response): Promise<GeminiError> {
    try {
      const errorData = await response.json();
      return GeminiErrorHandler.parseError(errorData);
    } catch {
      return new GeminiError({
        code: 'UNKNOWN_ERROR',
        message: `HTTPエラー: ${response.status} ${response.statusText}`
      });
    }
  }

  // リトライ可能なエラーか判定
  private isRetryableError(error: any): boolean {
    if (error instanceof GeminiError) {
      const retryableCodes = [
        'NETWORK_ERROR',
        'TIMEOUT',
        'RATE_LIMIT_EXCEEDED',
        'SERVER_ERROR'
      ];
      return retryableCodes.includes(error.code);
    }
    
    // ネットワークエラー
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true;
    }
    
    return false;
  }

  // 遅延
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ストリーミングAPI用メソッド
  async streamCompletion(
    prompt: string,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      signal?: AbortSignal;
    } = {}
  ): Promise<ReadableStream> {
    const response = await this.request('/v1/models/generateContent', {
      method: 'POST',
      body: {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 1024
        }
      },
      stream: true,
      signal: options.signal
    });

    return response as ReadableStream;
  }

  // ファイルアップロード用メソッド
  async uploadFile(
    file: ArrayBuffer,
    mimeType: string,
    displayName?: string
  ): Promise<{ uri: string }> {
    // MIMEタイプ検証
    const allowedMimeTypes = [
      'audio/webm',
      'audio/wav',
      'audio/mp3',
      'audio/mpeg',
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedMimeTypes.includes(mimeType)) {
      throw new Error('サポートされていないファイル形式です');
    }

    return await this.request('/v1/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Goog-Upload-Protocol': 'raw',
        'X-Goog-Upload-Command': 'upload, finalize',
        'X-Goog-Upload-Header-Content-Type': mimeType,
        'X-Goog-Upload-Header-Content-Length': file.byteLength.toString()
      },
      body: file
    });
  }
}

// シングルトンインスタンス
let proxyInstance: GeminiProxy | null = null;

// プロキシ取得関数
export function getGeminiProxy(config?: ProxyConfig): GeminiProxy {
  if (!proxyInstance && config) {
    proxyInstance = new GeminiProxy(config);
  }
  
  if (!proxyInstance) {
    throw new Error('Geminiプロキシが初期化されていません');
  }
  
  return proxyInstance;
}

// プロキシ初期化関数
export function initializeGeminiProxy(config: ProxyConfig): void {
  proxyInstance = new GeminiProxy(config);
}