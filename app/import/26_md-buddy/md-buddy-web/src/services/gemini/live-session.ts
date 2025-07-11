// Gemini Live API WebSocketセッション管理

import {
  GeminiModel,
  LiveSessionConfig,
  LiveMessage,
  LiveCallbacks,
  GeminiError,
  AudioConfig,
  GenerationConfig
} from '../../types/gemini';
import { GEMINI_AUDIO_FORMAT } from '../../types/audio';

interface LiveSessionMessage {
  type: 'setup' | 'audio' | 'text' | 'error' | 'close';
  data?: any;
  sessionId?: string;
  timestamp?: number;
}

export class GeminiLiveSession {
  private websocket: WebSocket | null = null;
  private sessionId: string = '';
  private config: LiveSessionConfig;
  private callbacks: LiveCallbacks;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 3;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private messageQueue: LiveSessionMessage[] = [];
  private audioBuffer: ArrayBuffer[] = [];

  constructor(config: LiveSessionConfig, callbacks: LiveCallbacks = {}) {
    this.config = {
      model: GeminiModel.FLASH_LIVE,
      responseModalities: ['TEXT', 'AUDIO'],
      ...config
    };
    this.callbacks = callbacks;
    this.sessionId = this.generateSessionId();
  }

  // セッションの開始
  async connect(): Promise<void> {
    if (this.websocket?.readyState === WebSocket.OPEN) {
      return; // 既に接続済み
    }

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini APIキーが設定されていません');
      }

      // WebSocket URLの構築
      const wsUrl = this.buildWebSocketUrl(apiKey);
      
      this.websocket = new WebSocket(wsUrl);
      
      this.setupEventHandlers();
      
      // 接続待機
      await this.waitForConnection();
      
      // セッション設定の送信
      await this.sendSetupMessage();
      
    } catch (error) {
      this.handleError(new Error(`接続エラー: ${error}`));
      throw error;
    }
  }

  // セッションの終了
  async disconnect(): Promise<void> {
    this.isConnected = false;
    
    // ハートビートの停止
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    // 再接続タイマーの停止
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    // WebSocket接続の終了
    if (this.websocket) {
      this.websocket.close(1000, 'セッション終了');
      this.websocket = null;
    }
    
    // バッファのクリア
    this.messageQueue = [];
    this.audioBuffer = [];
    
    if (this.callbacks.onclose) {
      this.callbacks.onclose();
    }
  }

  // 音声データの送信
  async sendAudio(audioData: ArrayBuffer): Promise<void> {
    if (!this.isConnected) {
      // 接続していない場合はバッファに保存
      this.audioBuffer.push(audioData);
      return;
    }

    const message: LiveSessionMessage = {
      type: 'audio',
      data: {
        audio: this.arrayBufferToBase64(audioData),
        mimeType: 'audio/pcm',
        format: {
          encoding: 'LINEAR16',
          sampleRate: GEMINI_AUDIO_FORMAT.sampleRate,
          channels: GEMINI_AUDIO_FORMAT.channels
        }
      },
      sessionId: this.sessionId,
      timestamp: Date.now()
    };

    this.sendMessage(message);
  }

  // テキストメッセージの送信
  async sendText(text: string): Promise<void> {
    if (!this.isConnected) {
      this.messageQueue.push({
        type: 'text',
        data: { text },
        sessionId: this.sessionId,
        timestamp: Date.now()
      });
      return;
    }

    const message: LiveSessionMessage = {
      type: 'text',
      data: { text },
      sessionId: this.sessionId,
      timestamp: Date.now()
    };

    this.sendMessage(message);
  }

  // 接続状態の取得
  isSessionConnected(): boolean {
    return this.isConnected && this.websocket?.readyState === WebSocket.OPEN;
  }

  // セッションIDの取得
  getSessionId(): string {
    return this.sessionId;
  }

  // プライベートメソッド

  private buildWebSocketUrl(apiKey: string): string {
    // Gemini Live API WebSocketエンドポイント
    const baseUrl = 'wss://generativelanguage.googleapis.com/v1/models';
    const modelPath = `${this.config.model}:streamGenerateContent`;
    
    // パラメータの構築
    const params = new URLSearchParams({
      key: apiKey,
      alt: 'sse'
    });

    return `${baseUrl}/${modelPath}?${params.toString()}`;
  }

  private setupEventHandlers(): void {
    if (!this.websocket) return;

    this.websocket.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // ハートビートの開始
      this.startHeartbeat();
      
      // バッファされたメッセージの送信
      this.flushMessageQueue();
      
      if (this.callbacks.onopen) {
        this.callbacks.onopen();
      }
    };

    this.websocket.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.websocket.onerror = (error) => {
      this.handleError(new Error(`WebSocketエラー: ${error}`));
    };

    this.websocket.onclose = (event) => {
      this.isConnected = false;
      
      if (event.code !== 1000) { // 正常終了以外
        this.attemptReconnect();
      }
    };
  }

  private async waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.websocket) {
        reject(new Error('WebSocketが初期化されていません'));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('接続タイムアウト'));
      }, 10000); // 10秒タイムアウト

      this.websocket.onopen = () => {
        clearTimeout(timeout);
        resolve();
      };

      this.websocket.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('WebSocket接続エラー'));
      };
    });
  }

  private async sendSetupMessage(): Promise<void> {
    const setupMessage = {
      type: 'setup',
      data: {
        model: this.config.model,
        generationConfig: this.config.generationConfig || this.getDefaultGenerationConfig(),
        systemInstruction: this.config.systemInstruction || this.getDefaultSystemInstruction(),
        tools: [], // 必要に応じてツールを追加
        responseModalities: this.config.responseModalities
      },
      sessionId: this.sessionId,
      timestamp: Date.now()
    };

    this.sendMessage(setupMessage);
  }

  private sendMessage(message: LiveSessionMessage): void {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      this.messageQueue.push(message);
      return;
    }

    try {
      this.websocket.send(JSON.stringify(message));
    } catch (error) {
      this.handleError(new Error(`メッセージ送信エラー: ${error}`));
    }
  }

  private handleMessage(data: string): void {
    try {
      const message = JSON.parse(data);
      
      // メッセージタイプに応じた処理
      switch (message.type) {
        case 'audio':
          this.handleAudioMessage(message);
          break;
        case 'text':
          this.handleTextMessage(message);
          break;
        case 'error':
          this.handleErrorMessage(message);
          break;
        case 'end':
          this.handleEndMessage(message);
          break;
        default:
          console.warn('未知のメッセージタイプ:', message.type);
      }
      
    } catch (error) {
      this.handleError(new Error(`メッセージ解析エラー: ${error}`));
    }
  }

  private handleAudioMessage(message: any): void {
    if (this.callbacks.onmessage) {
      const liveMessage: LiveMessage = {
        type: 'audio',
        data: {
          audio: message.data?.audio,
          mimeType: message.data?.mimeType || 'audio/pcm'
        },
        timestamp: message.timestamp || Date.now()
      };
      
      this.callbacks.onmessage(liveMessage);
    }
  }

  private handleTextMessage(message: any): void {
    if (this.callbacks.onmessage) {
      const liveMessage: LiveMessage = {
        type: 'text',
        data: {
          text: message.data?.text
        },
        timestamp: message.timestamp || Date.now()
      };
      
      this.callbacks.onmessage(liveMessage);
    }
  }

  private handleErrorMessage(message: any): void {
    const error: GeminiError = {
      code: message.data?.code || 'LIVE_SESSION_ERROR',
      message: message.data?.message || 'Live APIエラーが発生しました',
      details: message.data
    };
    
    this.handleError(error);
  }

  private handleEndMessage(message: any): void {
    if (this.callbacks.onmessage) {
      const liveMessage: LiveMessage = {
        type: 'end',
        data: message.data,
        timestamp: message.timestamp || Date.now()
      };
      
      this.callbacks.onmessage(liveMessage);
    }
  }

  private handleError(error: Error | GeminiError): void {
    if (this.callbacks.onerror) {
      this.callbacks.onerror(error instanceof Error ? error : new Error(error.message));
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.handleError(new Error('最大再接続試行回数に達しました'));
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.pow(2, this.reconnectAttempts) * 1000; // 指数バックオフ

    this.reconnectTimeout = setTimeout(() => {
      this.connect().catch((error) => {
        console.error('再接続失敗:', error);
      });
    }, delay);
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.websocket?.readyState === WebSocket.OPEN) {
        this.websocket.send(JSON.stringify({
          type: 'ping',
          timestamp: Date.now()
        }));
      }
    }, 30000); // 30秒ごと
  }

  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }

    // 音声バッファも送信
    while (this.audioBuffer.length > 0) {
      const audioData = this.audioBuffer.shift();
      if (audioData) {
        this.sendAudio(audioData);
      }
    }
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    return btoa(binary);
  }

  private generateSessionId(): string {
    return `live_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDefaultGenerationConfig(): GenerationConfig {
    return {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    };
  }

  private getDefaultSystemInstruction(): string {
    return `あなたは日本語での音声対話に特化したAIアシスタントです。
以下の点に注意してください：
- 自然で親しみやすい口調で話してください
- 簡潔で分かりやすい回答を心がけてください  
- 音声での対話であることを考慮し、長すぎる回答は避けてください
- 必要に応じて確認や質問を返してください`;
  }
}

// ファクトリー関数
export function createLiveSession(
  config: Partial<LiveSessionConfig> = {},
  callbacks: LiveCallbacks = {}
): GeminiLiveSession {
  const defaultConfig: LiveSessionConfig = {
    model: GeminiModel.FLASH_LIVE,
    responseModalities: ['TEXT', 'AUDIO'],
    audioConfig: {
      encoding: 'LINEAR16',
      sampleRate: GEMINI_AUDIO_FORMAT.sampleRate,
      languageCode: 'ja-JP'
    }
  };

  return new GeminiLiveSession({ ...defaultConfig, ...config }, callbacks);
}