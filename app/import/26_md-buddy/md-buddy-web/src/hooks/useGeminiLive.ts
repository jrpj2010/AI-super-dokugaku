// Gemini Live APIリアルタイム通信フック

import { useState, useCallback, useRef, useEffect } from 'react';
import { GeminiLiveSession, createLiveSession } from '../services/gemini/live-session';
import {
  LiveSessionConfig,
  LiveMessage,
  GeminiModel,
  GeminiError
} from '../types/gemini';

// フックの戻り値の型定義
interface UseGeminiLiveReturn {
  // 接続状態
  isConnected: boolean;
  isConnecting: boolean;
  error: GeminiError | null;
  
  // メッセージ
  messages: LiveMessage[];
  isProcessing: boolean;
  
  // アクション
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendAudio: (audioData: ArrayBuffer) => Promise<void>;
  sendText: (text: string) => Promise<void>;
  clearMessages: () => void;
  
  // セッション情報
  sessionId: string;
}

// フックのオプション
interface UseGeminiLiveOptions {
  model?: GeminiModel;
  systemInstruction?: string;
  autoConnect?: boolean;
  onMessageReceived?: (message: LiveMessage) => void;
  onError?: (error: GeminiError) => void;
  onConnectionChange?: (connected: boolean) => void;
}

export function useGeminiLive(
  options: UseGeminiLiveOptions = {}
): UseGeminiLiveReturn {
  // 状態管理
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<GeminiError | null>(null);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId, setSessionId] = useState('');

  // Refs
  const sessionRef = useRef<GeminiLiveSession | null>(null);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // セッション設定
  const sessionConfig: LiveSessionConfig = {
    model: options.model || GeminiModel.FLASH_LIVE,
    responseModalities: ['TEXT', 'AUDIO'],
    systemInstruction: options.systemInstruction,
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    },
    audioConfig: {
      encoding: 'LINEAR16',
      sampleRate: 16000,
      languageCode: 'ja-JP'
    }
  };

  // 接続
  const connect = useCallback(async () => {
    if (isConnecting || isConnected) return;

    try {
      setIsConnecting(true);
      setError(null);

      // 新しいセッションを作成
      sessionRef.current = createLiveSession(sessionConfig, {
        onopen: () => {
          setIsConnected(true);
          setIsConnecting(false);
          setSessionId(sessionRef.current?.getSessionId() || '');
          
          if (options.onConnectionChange) {
            options.onConnectionChange(true);
          }
        },
        
        onmessage: (message: LiveMessage) => {
          // メッセージを状態に追加
          setMessages(prev => [...prev, message]);
          
          // 処理中状態をリセット
          if (processingTimeoutRef.current) {
            clearTimeout(processingTimeoutRef.current);
          }
          setIsProcessing(false);
          
          // コールバック実行
          if (options.onMessageReceived) {
            options.onMessageReceived(message);
          }
        },
        
        onerror: (error: Error) => {
          const geminiError: GeminiError = {
            code: 'LIVE_SESSION_ERROR',
            message: error.message,
            details: error
          };
          
          setError(geminiError);
          setIsProcessing(false);
          
          if (options.onError) {
            options.onError(geminiError);
          }
        },
        
        onclose: () => {
          setIsConnected(false);
          setIsConnecting(false);
          setIsProcessing(false);
          
          if (options.onConnectionChange) {
            options.onConnectionChange(false);
          }
        }
      });

      await sessionRef.current.connect();
      
    } catch (err: any) {
      const geminiError: GeminiError = {
        code: 'CONNECTION_ERROR',
        message: err.message || '接続に失敗しました',
        details: err
      };
      
      setError(geminiError);
      setIsConnecting(false);
      
      if (options.onError) {
        options.onError(geminiError);
      }
    }
  }, [isConnecting, isConnected, sessionConfig, options]);

  // 切断
  const disconnect = useCallback(async () => {
    if (sessionRef.current) {
      await sessionRef.current.disconnect();
      sessionRef.current = null;
    }
    
    setIsConnected(false);
    setIsConnecting(false);
    setIsProcessing(false);
    setSessionId('');
    
    // タイマーのクリア
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }
  }, []);

  // 音声データの送信
  const sendAudio = useCallback(async (audioData: ArrayBuffer) => {
    if (!sessionRef.current || !isConnected) {
      throw new Error('セッションが接続されていません');
    }

    try {
      setIsProcessing(true);
      setError(null);
      
      await sessionRef.current.sendAudio(audioData);
      
      // 処理タイムアウトの設定（30秒）
      processingTimeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
        setError({
          code: 'PROCESSING_TIMEOUT',
          message: '音声処理がタイムアウトしました'
        });
      }, 30000);
      
    } catch (err: any) {
      const geminiError: GeminiError = {
        code: 'AUDIO_SEND_ERROR',
        message: err.message || '音声データの送信に失敗しました',
        details: err
      };
      
      setError(geminiError);
      setIsProcessing(false);
      
      if (options.onError) {
        options.onError(geminiError);
      }
    }
  }, [isConnected, options]);

  // テキストメッセージの送信
  const sendText = useCallback(async (text: string) => {
    if (!sessionRef.current || !isConnected) {
      throw new Error('セッションが接続されていません');
    }

    try {
      setIsProcessing(true);
      setError(null);
      
      // ユーザーメッセージを追加
      const userMessage: LiveMessage = {
        type: 'text',
        data: { text, role: 'user' },
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMessage]);
      
      await sessionRef.current.sendText(text);
      
      // 処理タイムアウトの設定（15秒）
      processingTimeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
        setError({
          code: 'PROCESSING_TIMEOUT',
          message: 'テキスト処理がタイムアウトしました'
        });
      }, 15000);
      
    } catch (err: any) {
      const geminiError: GeminiError = {
        code: 'TEXT_SEND_ERROR',
        message: err.message || 'テキストメッセージの送信に失敗しました',
        details: err
      };
      
      setError(geminiError);
      setIsProcessing(false);
      
      if (options.onError) {
        options.onError(geminiError);
      }
    }
  }, [isConnected, options]);

  // メッセージのクリア
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  // 自動接続
  useEffect(() => {
    if (options.autoConnect && !isConnected && !isConnecting) {
      connect();
    }
  }, [options.autoConnect, isConnected, isConnecting, connect]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
      }
      
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  return {
    // 接続状態
    isConnected,
    isConnecting,
    error,
    
    // メッセージ
    messages,
    isProcessing,
    
    // アクション
    connect,
    disconnect,
    sendAudio,
    sendText,
    clearMessages,
    
    // セッション情報
    sessionId
  };
}

// 簡易版フック（音声専用）
export function useGeminiVoice(
  onTranscriptReceived?: (transcript: string) => void
) {
  const {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    sendAudio,
    isProcessing
  } = useGeminiLive({
    model: GeminiModel.FLASH_NATIVE_AUDIO,
    systemInstruction: `音声を受け取ったら、その内容をそのまま文字起こしして返してください。
追加の説明やコメントは不要です。聞き取った内容をできるだけ正確に文字にしてください。`,
    onMessageReceived: (message) => {
      if (message.type === 'text' && message.data?.text && onTranscriptReceived) {
        onTranscriptReceived(message.data.text);
      }
    }
  });

  return {
    isConnected,
    isConnecting,
    error,
    isProcessing,
    connect,
    disconnect,
    sendAudio
  };
}

// Markdown変換専用フック
export function useGeminiMarkdown(
  onMarkdownReceived?: (markdown: string, metadata?: any) => void
) {
  const [conversionProgress, setConversionProgress] = useState(0);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  
  const {
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    sendAudio,
    sendText,
    isProcessing
  } = useGeminiLive({
    model: GeminiModel.PRO,
    systemInstruction: `あなたは音声をMarkdown文書に変換する専門家です。
音声やテキストを受け取ったら、以下の形式で構造化されたMarkdown文書を作成してください：

1. 適切な見出し構造（# ## ###）を使用
2. 重要なポイントは太字や箇条書きで強調
3. 必要に応じてコードブロックやテーブルを使用
4. 読みやすく整理された文書構造

出力は必ずMarkdown形式で、追加の説明は含めないでください。`,
    onMessageReceived: (message) => {
      if (message.type === 'text' && message.data?.text) {
        setGeneratedMarkdown(message.data.text);
        setConversionProgress(100);
        if (onMarkdownReceived) {
          onMarkdownReceived(message.data.text, message.data?.metadata);
        }
      }
    }
  });

  // convertToMarkdown関数の実装
  const convertToMarkdown = useCallback(async (
    input: string | ArrayBuffer,
    conversionType?: string,
    context?: any
  ): Promise<string> => {
    try {
      setConversionProgress(0);
      setGeneratedMarkdown('');
      
      // 接続していない場合は接続
      if (!isConnected && !isConnecting) {
        setConversionProgress(10);
        await connect();
        
        // 接続完了を待つ
        await new Promise<void>((resolve, reject) => {
          const maxAttempts = 50; // 5秒まで待つ
          let attempts = 0;
          
          const checkConnection = setInterval(() => {
            attempts++;
            if (isConnected) {
              clearInterval(checkConnection);
              resolve();
            } else if (attempts >= maxAttempts) {
              clearInterval(checkConnection);
              reject(new Error('接続タイムアウト'));
            }
          }, 100);
        });
      }
      
      setConversionProgress(30);
      
      // 入力タイプに応じて送信
      if (typeof input === 'string') {
        await sendText(input);
      } else {
        await sendAudio(input);
      }
      
      setConversionProgress(60);
      
      // レスポンスを待つ（タイムアウト付き）
      return new Promise((resolve, reject) => {
        let resultReceived = false;
        
        const timeout = setTimeout(() => {
          if (!resultReceived) {
            reject(new Error('Markdown変換タイムアウト'));
          }
        }, 30000);
        
        const checkInterval = setInterval(() => {
          if (generatedMarkdown) {
            resultReceived = true;
            clearInterval(checkInterval);
            clearTimeout(timeout);
            resolve(generatedMarkdown);
          }
        }, 100);
      });
      
    } catch (err: any) {
      setConversionProgress(0);
      console.error('Markdown変換エラー:', err);
      (window as any).debugLog?.(`Markdown変換エラー: ${err.message}`, 'error');
      throw err;
    }
  }, [isConnected, isConnecting, connect, sendText, sendAudio, generatedMarkdown]);

  return {
    isConnected,
    isConnecting,
    error,
    isProcessing,
    isConverting: isProcessing, // App.tsxとの互換性
    conversionProgress,
    convertToMarkdown,
    connect,
    disconnect,
    sendAudio,
    sendText
  };
}