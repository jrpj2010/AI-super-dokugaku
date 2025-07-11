import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Square, Pause, Play, X, Download } from 'lucide-react';
import { TranscriptSegment } from '../types/transcript';

// Web Speech API の型定義
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface VoiceInputPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isRecording: boolean;
  isPaused?: boolean;
  audioLevel: number;
  recordingDuration: number;
  transcript: string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPauseRecording?: () => void;
  onResumeRecording?: () => void;
  onTranscriptChange?: (text: string) => void;
  isProcessing?: boolean;
  showPreview?: boolean;
  onAnalyze?: () => void;
  onDownloadAudio?: () => void;
  onDownloadSRT?: () => void;
  onDownloadMarkdown?: () => void;
  hasAudioData?: boolean;
  hasSRTData?: boolean;
  hasMarkdownData?: boolean;
}

export const VoiceInputPanel: React.FC<VoiceInputPanelProps> = ({
  isOpen,
  onClose,
  isRecording,
  isPaused = false,
  audioLevel,
  recordingDuration,
  transcript,
  onStartRecording,
  onStopRecording,
  onPauseRecording,
  onResumeRecording,
  onTranscriptChange,
  isProcessing = false,
  showPreview = false,
  onAnalyze,
  onDownloadAudio,
  onDownloadSRT,
  onDownloadMarkdown,
  hasAudioData = false,
  hasSRTData = false,
  hasMarkdownData = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [waveformData, setWaveformData] = useState<number[]>(new Array(50).fill(0));
  const [isWebSpeechSupported, setIsWebSpeechSupported] = useState(false);
  const [localTranscript, setLocalTranscript] = useState('');
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordingStartTimeRef = useRef<number>(0);

  // Web Speech API のサポートチェック
  useEffect(() => {
    setIsWebSpeechSupported('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }, []);

  // Web Speech API の初期化
  useEffect(() => {
    if (!isWebSpeechSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true; // 継続的な認識
    recognition.interimResults = true; // 中間結果も取得
    recognition.lang = 'ja-JP'; // 日本語設定
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      const currentTime = (Date.now() - recordingStartTimeRef.current) / 1000; // 秒単位

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence || 1.0;
        
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          
          // タイムスタンプ付きセグメントを作成
          const segment: TranscriptSegment = {
            id: `seg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            text: transcript,
            startTime: currentTime - 2, // 約2秒前から開始と仮定
            endTime: currentTime,
            confidence,
            isFinal: true
          };
          
          setTranscriptSegments(prev => [...prev, segment]);
          (window as any).debugLog?.(`音声セグメント追加: ${JSON.stringify(segment)}`, 'info');
        } else {
          interimTranscript += transcript;
        }
      }

      // 置換ワードの適用
      if (finalTranscript) {
        const replacementWords = JSON.parse(localStorage.getItem('replacementWords') || '[]');
        let processedTranscript = finalTranscript;
        
        replacementWords.forEach((replacement: { from: string; to: string }) => {
          if (replacement.from && replacement.to) {
            const regex = new RegExp(replacement.from, 'gi');
            processedTranscript = processedTranscript.replace(regex, replacement.to);
          }
        });
        
        if (processedTranscript !== finalTranscript) {
          (window as any).debugLog?.(`置換適用: "${finalTranscript}" → "${processedTranscript}"`, 'info');
        }
        finalTranscript = processedTranscript;
      }

      if (onTranscriptChange) {
        const currentTranscript = localTranscript + finalTranscript;
        setLocalTranscript(currentTranscript);
        onTranscriptChange(currentTranscript + interimTranscript);
      }
      
      // デバッグログ（最終結果のみ記録）
      if (finalTranscript) {
        (window as any).debugLog?.(`音声認識完了: ${finalTranscript}`, 'info');
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('音声認識エラー:', event.error);
      (window as any).debugLog?.(`音声認識エラー: ${event.error}`, 'error');
      
      // 現在の認識状態をリセット
      if (recognitionRef.current) {
        recognitionRef.current.started = false;
      }
      
      // エラー種別に応じてリトライ処理
      switch (event.error) {
        case 'network':
          (window as any).debugLog?.('ネットワークエラー - 3秒後にリトライ', 'warn');
          setTimeout(() => {
            if (isRecording && !isPaused && recognitionRef.current) {
              try {
                recognitionRef.current.start();
                recognitionRef.current.started = true;
                (window as any).debugLog?.('音声認識リトライ成功', 'info');
              } catch (retryError) {
                (window as any).debugLog?.(`音声認識リトライ失敗: ${retryError}`, 'error');
              }
            }
          }, 3000);
          break;
          
        case 'aborted':
          (window as any).debugLog?.('音声認識が中止されました', 'warn');
          break;
          
        case 'audio-capture':
          (window as any).debugLog?.('音声キャプチャエラー - マイクの確認が必要', 'error');
          break;
          
        case 'not-allowed':
          (window as any).debugLog?.('マイクアクセスが拒否されました', 'error');
          break;
          
        default:
          (window as any).debugLog?.(`その他の音声認識エラー: ${event.error}`, 'error');
          break;
      }
    };

    recognition.onend = () => {
      // 現在の状態をリセット
      if (recognitionRef.current) {
        recognitionRef.current.started = false;
      }
      
      // 録音中かつ一時停止していない場合のみ再開
      if (isRecording && !isPaused && recognitionRef.current) {
        try {
          (window as any).debugLog?.('Web Speech API 自動再開', 'info');
          recognitionRef.current.start();
          recognitionRef.current.started = true;
        } catch (error: any) {
          console.error('音声認識自動再開エラー:', error);
          (window as any).debugLog?.(`音声認識自動再開エラー: ${error.message}`, 'error');
          
          // 'already started' エラーの場合は無視
          if (error.name === 'InvalidStateError' && error.message.includes('already started')) {
            recognitionRef.current.started = true;
          }
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
          recognitionRef.current.started = false;
          (window as any).debugLog?.('Web Speech API クリーンアップ', 'info');
        } catch (e) {
          // 既に停止している場合は無視
          (window as any).debugLog?.('Web Speech API クリーンアップ（既に停止済み）', 'info');
        }
      }
    };
  }, [isWebSpeechSupported]); // 依存関係を最小限に

  // 録音開始/停止時の処理
  useEffect(() => {
    if (!recognitionRef.current) return;

    // 現在の音声認識状態を取得
    const currentRecognition = recognitionRef.current;
    
    if (isRecording && !isPaused) {
      // 録音中かつ一時停止していない場合は開始
      try {
        // 既に開始している場合は何もしない
        if (currentRecognition.started) {
          (window as any).debugLog?.('Web Speech API 既に開始済み', 'info');
          return;
        }
        
        currentRecognition.start();
        currentRecognition.started = true;
        (window as any).debugLog?.('Web Speech API 開始', 'info');
      } catch (error: any) {
        console.error('音声認識開始エラー:', error);
        (window as any).debugLog?.(`音声認識開始エラー: ${error.message}`, 'error');
        
        // 'already started' エラーの場合は無視
        if (error.name === 'InvalidStateError' && error.message.includes('already started')) {
          (window as any).debugLog?.('Web Speech API 既に開始済み（エラー処理）', 'info');
        }
      }
    } else {
      // 録音停止または一時停止の場合は停止
      try {
        if (currentRecognition.started) {
          currentRecognition.stop();
          currentRecognition.started = false;
          (window as any).debugLog?.('Web Speech API 停止', 'info');
        }
      } catch (error: any) {
        console.error('音声認識停止エラー:', error);
        (window as any).debugLog?.(`音声認識停止エラー: ${error.message}`, 'error');
      }
    }
  }, [isRecording, isPaused]);

  // 録音開始時にトランスクリプトをリセット（プレビューモードでない場合のみ）
  useEffect(() => {
    if (isRecording && !isPaused && !showPreview) {
      setLocalTranscript('');
      setTranscriptSegments([]);
      recordingStartTimeRef.current = Date.now();
    }
  }, [isRecording, showPreview]);

  // 録音時間のフォーマット
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 波形データの更新
  useEffect(() => {
    if (isRecording && !isPaused) {
      const updateWaveform = () => {
        setWaveformData(prev => {
          const newData = [...prev.slice(1), audioLevel];
          return newData;
        });
      };
      
      const interval = setInterval(updateWaveform, 50); // 50msで更新（20FPS）
      return () => clearInterval(interval);
    }
  }, [isRecording, isPaused, audioLevel]);

  // 波形の描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawWaveform = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // クリア
      ctx.clearRect(0, 0, width, height);
      
      // 背景のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // 波形を描画
      ctx.strokeStyle = isRecording && !isPaused ? '#3B82F6' : '#9CA3AF';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      const centerY = height / 2;
      const bars = 60; // より細かいバー
      const barWidth = width / bars;
      const smoothFactor = 0.8;
      
      for (let i = 0; i < bars; i++) {
        const dataIndex = Math.floor((i / bars) * waveformData.length);
        const value = waveformData[dataIndex] || 0;
        const nextValue = waveformData[Math.min(dataIndex + 1, waveformData.length - 1)] || 0;
        
        // スムージング
        const smoothedValue = value * smoothFactor + nextValue * (1 - smoothFactor);
        const barHeight = (smoothedValue / 100) * (height * 0.7);
        
        const x = i * barWidth + barWidth / 2;
        
        // グラデーション付きのバー
        const barGradient = ctx.createLinearGradient(x, centerY - barHeight / 2, x, centerY + barHeight / 2);
        barGradient.addColorStop(0, isRecording && !isPaused ? 'rgba(59, 130, 246, 0.8)' : 'rgba(156, 163, 175, 0.8)');
        barGradient.addColorStop(0.5, isRecording && !isPaused ? 'rgba(59, 130, 246, 1)' : 'rgba(156, 163, 175, 1)');
        barGradient.addColorStop(1, isRecording && !isPaused ? 'rgba(59, 130, 246, 0.8)' : 'rgba(156, 163, 175, 0.8)');
        
        ctx.strokeStyle = barGradient;
        ctx.beginPath();
        ctx.moveTo(x, centerY - barHeight / 2);
        ctx.lineTo(x, centerY + barHeight / 2);
        ctx.stroke();
      }
      
      if (isRecording && !isPaused) {
        animationRef.current = requestAnimationFrame(drawWaveform);
      }
    };

    drawWaveform();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waveformData, isRecording, isPaused]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-40">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AIパネル</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* 録音状態表示エリア */}
        <div className="px-6 py-6 bg-gray-50 dark:bg-gray-900">
          <div className="relative">
            {/* 録音状態インジケーター */}
            <div className="flex items-center justify-center mb-4">
              {isRecording ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-900 dark:text-white font-medium text-lg">
                    {isPaused ? '一時停止中' : '録音中'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-lg">録音準備完了</span>
                </div>
              )}
            </div>
            
            {/* 波形表示 */}
            <canvas
              ref={canvasRef}
              width={600}
              height={80}
              className="w-full h-20 bg-white dark:bg-gray-800 rounded-lg shadow-inner"
            />
            
            {/* 録音時間表示 */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm font-mono">
              {formatDuration(recordingDuration)}
            </div>
          </div>
        </div>

        {/* コントロールエリア */}
        <div className="px-6 py-4 flex items-center justify-center gap-4">
          {!isRecording ? (
            <button
              onClick={onStartRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transform transition-all hover:scale-105"
            >
              <Mic size={24} />
              <span className="font-medium">録音開始</span>
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={onResumeRecording}
                  className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transform transition-all hover:scale-105"
                >
                  <Play size={24} />
                </button>
              ) : (
                <button
                  onClick={onPauseRecording}
                  className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transform transition-all hover:scale-105"
                >
                  <Pause size={24} />
                </button>
              )}
              <button
                onClick={() => {
                  console.log('Stop button clicked in VoiceInputPanel');
                  onStopRecording();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transform transition-all hover:scale-105"
              >
                <Square size={20} />
                <span className="font-medium">停止</span>
              </button>
            </>
          )}
        </div>

        {/* リアルタイムトランスクリプト */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-40 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span>{showPreview ? '録音結果' : 'リアルタイム文字起こし'}</span>
              {isWebSpeechSupported && isRecording && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  Web Speech API 使用中
                </span>
              )}
            </h4>
            {isProcessing ? (
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                <span className="text-sm">処理中...</span>
              </div>
            ) : (
              <div className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
                {(isWebSpeechSupported ? (onTranscriptChange ? transcript : localTranscript) : transcript) || (
                  <span className="text-gray-400 dark:text-gray-500 italic">
                    {isWebSpeechSupported 
                      ? '録音を開始すると、ここにリアルタイムで文字起こしが表示されます'
                      : 'Web Speech APIが利用できません。Gemini APIによる音声認識を使用します'
                    }
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* AI分析ボタン */}
          {showPreview && transcript && onAnalyze && (
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={onAnalyze}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-lg transform transition-all hover:scale-105"
                disabled={isProcessing}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="font-medium">AI分析開始</span>
              </button>
              
            </div>
          )}
          
          {/* ダウンロードボタン */}
          {showPreview && (
            <div className="mt-4 flex justify-center gap-2">
              {hasAudioData && onDownloadAudio && (
                <button
                  onClick={onDownloadAudio}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow transition-all"
                >
                  <Download size={16} />
                  <span className="text-sm">音声</span>
                </button>
              )}
              {hasSRTData && onDownloadSRT && (
                <button
                  onClick={onDownloadSRT}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition-all"
                >
                  <Download size={16} />
                  <span className="text-sm">字幕</span>
                </button>
              )}
              {hasMarkdownData && onDownloadMarkdown && (
                <button
                  onClick={onDownloadMarkdown}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow transition-all"
                >
                  <Download size={16} />
                  <span className="text-sm">MD</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* ステータスバー */}
        <div className="px-6 py-3 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {isRecording ? (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {isPaused ? '一時停止中' : '録音中'}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-300">待機中</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
              <span>音声レベル: {Math.round(audioLevel)}%</span>
              {!isWebSpeechSupported && (
                <span className="text-yellow-600 text-xs">
                  Web Speech API未対応
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};