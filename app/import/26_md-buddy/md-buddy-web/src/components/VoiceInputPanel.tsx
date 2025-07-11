import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Square, Pause, Play, X, Download, PlayCircle, StopCircle, FileText } from 'lucide-react';
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
  audioBlob?: Blob;
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
  audioBlob,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [waveformData, setWaveformData] = useState<number[]>(new Array(50).fill(0));
  const [isWebSpeechSupported, setIsWebSpeechSupported] = useState(false);
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);
  const recognitionRef = useRef<any>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const accumulatedFinalTranscriptRef = useRef<string>(''); // 累積された最終トランスクリプト
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      let currentInterimTranscript = '';
      let currentFinalTranscript = '';
      const currentTime = (Date.now() - recordingStartTimeRef.current) / 1000; // 秒単位

      // event.resultIndexから最新の結果まで処理
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence || 1.0;
        
        if (event.results[i].isFinal) {
          currentFinalTranscript += transcript;
          
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
          currentInterimTranscript += transcript;
        }
      }

      // 置換ワードの適用（最終結果のみ）
      if (currentFinalTranscript) {
        const replacementWords = JSON.parse(localStorage.getItem('replacementWords') || '[]');
        let processedTranscript = currentFinalTranscript;
        
        replacementWords.forEach((replacement: { from: string; to: string }) => {
          if (replacement.from && replacement.to) {
            const regex = new RegExp(replacement.from, 'gi');
            processedTranscript = processedTranscript.replace(regex, replacement.to);
          }
        });
        
        if (processedTranscript !== currentFinalTranscript) {
          (window as any).debugLog?.(`置換適用: "${currentFinalTranscript}" → "${processedTranscript}"`, 'info');
        }
        currentFinalTranscript = processedTranscript;
        
        // 累積された最終トランスクリプトに追加
        accumulatedFinalTranscriptRef.current += currentFinalTranscript;
      }

      if (onTranscriptChange) {
        // 親コンポーネントに累積されたトランスクリプト全体を送信
        const fullTranscript = accumulatedFinalTranscriptRef.current + currentInterimTranscript;
        onTranscriptChange(fullTranscript);
        (window as any).debugLog?.(`トランスクリプト更新: 累積=${accumulatedFinalTranscriptRef.current.length}文字, 中間=${currentInterimTranscript.length}文字`, 'info');
      }
      
      // デバッグログ（最終結果のみ記録）
      if (currentFinalTranscript) {
        (window as any).debugLog?.(`音声認識完了（今回分）: ${currentFinalTranscript}`, 'info');
        (window as any).debugLog?.(`累積トランスクリプト: ${accumulatedFinalTranscriptRef.current.length}文字`, 'info');
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

  // 録音開始時の初期化
  useEffect(() => {
    if (isRecording && !isPaused && !showPreview) {
      // 録音開始時にトランスクリプトをリセットしない
      // 累積トランスクリプトは録音停止→新規録音開始のタイミングでのみリセット
      recordingStartTimeRef.current = Date.now();
      (window as any).debugLog?.(`録音セッション継続中: 累積トランスクリプト=${accumulatedFinalTranscriptRef.current.length}文字`, 'info');
    }
  }, [isRecording, isPaused, showPreview]);
  
  // 録音停止時の処理
  useEffect(() => {
    if (!isRecording && !isPaused) {
      // 録音が完全に停止した時のみリセットフラグを立てる
      return () => {
        // 次回の録音開始時にリセット
        if (!showPreview) {
          accumulatedFinalTranscriptRef.current = '';
          setTranscriptSegments([]);
          (window as any).debugLog?.('録音セッション終了: 次回開始時にトランスクリプトをリセット', 'info');
        }
      };
    }
  }, [isRecording, isPaused, showPreview]);

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

  // 音声再生機能
  const handlePlayAudio = () => {
    if (!audioBlob) return;
    
    if (isPlaying) {
      // 停止
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    } else {
      // 再生
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  // コンポーネントのクリーンアップ
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-40 px-4">
      <div className="glass radius-unified shadow-strong overflow-hidden">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <h3 className="text-xl font-semibold text-white gradient-text">AIパネル</h3>
          <button
            onClick={onClose}
            className="p-2 radius-unified glass hover:bg-white/20 transition-all shadow-interactive"
          >
            <X size={20} className="text-white/80" />
          </button>
        </div>

        {/* 録音状態表示エリア */}
        <div className="px-6 py-6" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
          <div className="relative">
            {/* 録音状態インジケーター */}
            <div className="flex items-center justify-center mb-4">
              {isRecording ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-medium"></div>
                  <span className="text-white font-medium text-lg">
                    {isPaused ? '一時停止中' : '録音中'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-white/40 rounded-full"></div>
                  <span className="text-white/80 text-lg">録音準備完了</span>
                </div>
              )}
            </div>
            
            {/* 波形表示 */}
            <canvas
              ref={canvasRef}
              width={600}
              height={80}
              className="w-full h-20 glass radius-unified shadow-inner"
            />
            
            {/* 録音時間表示 */}
            <div className="absolute top-2 right-2 glass text-white px-3 py-2 radius-unified text-sm font-mono">
              {formatDuration(recordingDuration)}
            </div>
          </div>
        </div>

        {/* コントロールエリア */}
        <div className="px-6 py-4 flex items-center justify-center gap-4">
          {!isRecording ? (
            <button
              onClick={onStartRecording}
              className="flex items-center gap-2 px-6 py-3 radius-unified text-white font-medium shadow-interactive transition-all transform hover:scale-105"
              style={{background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'}}
            >
              <Mic size={24} />
              <span className="font-medium">録音開始</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  console.log('Stop button clicked in VoiceInputPanel');
                  onStopRecording();
                }}
                className="flex items-center gap-2 px-6 py-3 radius-unified text-white font-medium shadow-interactive transition-all transform hover:scale-105"
                style={{background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)'}}
              >
                <Square size={20} />
                <span className="font-medium">停止</span>
              </button>
            </>
          )}
        </div>

        {/* リアルタイムトランスクリプト */}
        <div className="px-6 pb-6">
          <div className="glass radius-unified p-4 max-h-40 overflow-y-auto">
            <h4 className="text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
              <span>{showPreview ? '録音結果' : 'リアルタイム文字起こし'}</span>
              {isWebSpeechSupported && isRecording && (
                <span className="text-xs glass text-white px-2 py-0.5 radius-unified">
                  Web Speech API 使用中
                </span>
              )}
            </h4>
            {isProcessing ? (
              <div className="flex items-center gap-2 text-white/70">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/70"></div>
                <span className="text-sm">処理中...</span>
              </div>
            ) : (
              <div className="text-white text-sm leading-relaxed">
                {(isWebSpeechSupported ? (onTranscriptChange ? transcript : localTranscript) : transcript) || (
                  <span className="text-white/60 italic">
                    {isWebSpeechSupported 
                      ? '録音を開始すると、ここにリアルタイムで文字起こしが表示されます'
                      : 'Web Speech APIが利用できません。Gemini APIによる音声認識を使用します'
                    }
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* 録音完了時のアクション */}
          {showPreview && transcript && (
            <div className="mt-4">
              {/* 音声再生ボタン */}
              {audioBlob && (
                <div className="flex justify-center mb-4">
                  <button
                    onClick={handlePlayAudio}
                    className="flex items-center gap-2 px-4 py-2 glass radius-unified text-white/90 hover:bg-white/20 shadow-interactive transition-all"
                  >
                    {isPlaying ? (
                      <>
                        <StopCircle size={20} />
                        <span>停止</span>
                      </>
                    ) : (
                      <>
                        <PlayCircle size={20} />
                        <span>録音を再生</span>
                      </>
                    )}
                  </button>
                </div>
              )}
              
              {/* メインアクションボタン */}
              <div className="flex justify-center gap-4">
                {/* エディタに挿入ボタン */}
                {onAnalyze && (
                  <button
                    onClick={onAnalyze}
                    className="flex items-center gap-2 px-6 py-3 radius-unified text-white font-medium shadow-interactive transform transition-all hover:scale-105"
                    style={{background: 'var(--bg-gradient-accent)'}}
                    disabled={isProcessing}
                  >
                    <FileText size={20} />
                    <span className="font-medium">エディタに挿入</span>
                  </button>
                )}
              </div>
              
              {/* セパレーター */}
              <div className="my-4 text-center text-sm text-white/60">または</div>
              
              {/* 生データダウンロードボタン */}
              <div className="flex justify-center gap-3 flex-wrap">
                {/* 文字起こしダウンロード */}
                <button
                  onClick={() => {
                    const blob = new Blob([transcript], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `文字起こし_${new Date().toISOString().slice(0, 10)}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2 px-4 py-2 glass radius-unified text-white/90 hover:bg-white/20 shadow-interactive transition-all"
                >
                  <Download size={16} />
                  <span className="text-sm">文字起こしをダウンロード</span>
                </button>
                
                {/* 音声ダウンロード */}
                {hasAudioData && onDownloadAudio && (
                  <button
                    onClick={onDownloadAudio}
                    className="flex items-center gap-2 px-4 py-2 glass radius-unified text-white/90 hover:bg-white/20 shadow-interactive transition-all"
                  >
                    <Download size={16} />
                    <span className="text-sm">音声ファイルをダウンロード</span>
                  </button>
                )}
                
                {/* SRTダウンロード */}
                {hasSRTData && onDownloadSRT && (
                  <button
                    onClick={onDownloadSRT}
                    className="flex items-center gap-2 px-4 py-2 glass radius-unified text-white/90 hover:bg-white/20 shadow-interactive transition-all"
                  >
                    <Download size={16} />
                    <span className="text-sm">字幕ファイルをダウンロード</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ステータスバー */}
        <div className="px-6 py-3 border-t border-white/20" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {isRecording ? (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white/90">
                    {isPaused ? '一時停止中' : '録音中'}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  <span className="text-white/90">待機中</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-white/70">
              <span>音声レベル: {Math.round(audioLevel)}%</span>
              {!isWebSpeechSupported && (
                <span className="text-yellow-400 text-xs">
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