// 音声波形表示コンポーネント

import React, { useEffect, useRef, useState } from 'react';
import { ProcessedAudio } from '../types/audio';

interface VoiceWaveformProps {
  // リアルタイム波形表示用
  audioLevel?: number;
  isRecording?: boolean;
  
  // 録音済み波形表示用
  processedAudio?: ProcessedAudio;
  
  // 表示設定
  width?: number;
  height?: number;
  backgroundColor?: string;
  waveColor?: string;
  progressColor?: string;
  className?: string;
  
  // 再生機能
  enablePlayback?: boolean;
  onPlaybackEnd?: () => void;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  audioLevel = 0,
  isRecording = false,
  processedAudio,
  width = 300,
  height = 100,
  backgroundColor = '#f3f4f6',
  waveColor = '#3b82f6',
  progressColor = '#1d4ed8',
  className = '',
  enablePlayback = false,
  onPlaybackEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const playbackStartTimeRef = useRef<number>(0);

  // リアルタイム波形の描画
  useEffect(() => {
    if (!canvasRef.current || !isRecording) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスサイズの設定
    canvas.width = width;
    canvas.height = height;

    const waveformHistory: number[] = [];
    const maxHistory = 50;

    const drawRealtimeWaveform = () => {
      // 背景をクリア
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // 現在の音声レベルを履歴に追加
      waveformHistory.push(audioLevel);
      if (waveformHistory.length > maxHistory) {
        waveformHistory.shift();
      }

      // 波形を描画
      ctx.strokeStyle = waveColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const segmentWidth = width / maxHistory;
      const centerY = height / 2;

      waveformHistory.forEach((level, index) => {
        const x = index * segmentWidth;
        const amplitude = level * (height / 2) * 0.8;
        
        if (index === 0) {
          ctx.moveTo(x, centerY);
        }
        
        // 正弦波風の描画
        const y1 = centerY - amplitude;
        const y2 = centerY + amplitude;
        
        ctx.lineTo(x, y1);
        ctx.lineTo(x + segmentWidth / 2, y2);
      });

      ctx.stroke();

      // 中央線
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(drawRealtimeWaveform);
    };

    drawRealtimeWaveform();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, audioLevel, width, height, backgroundColor, waveColor]);

  // 録音済み波形の描画
  useEffect(() => {
    if (!canvasRef.current || !processedAudio?.waveformData || isRecording) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const drawStaticWaveform = () => {
      // 背景をクリア
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      const waveformData = processedAudio.waveformData;
      if (!waveformData) return;
      
      const barWidth = width / waveformData.length;
      const centerY = height / 2;

      // 波形を描画
      ctx.fillStyle = waveColor;

      for (let i = 0; i < waveformData.length; i++) {
        const x = i * barWidth;
        const barHeight = waveformData[i] * height * 0.8;
        
        // 上半分
        ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight / 2);
        // 下半分
        ctx.fillRect(x, centerY, barWidth - 1, barHeight / 2);
      }

      // 再生進捗の描画
      if (playbackProgress > 0) {
        ctx.fillStyle = progressColor;
        const progressX = width * playbackProgress;
        
        for (let i = 0; i < waveformData.length; i++) {
          const x = i * barWidth;
          if (x > progressX) break;
          
          const barHeight = waveformData[i] * height * 0.8;
          ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
        }
      }

      // 中央線
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
    };

    drawStaticWaveform();
  }, [processedAudio, isRecording, width, height, backgroundColor, waveColor, progressColor, playbackProgress]);

  // 再生進捗の更新
  useEffect(() => {
    if (!isPlaying || !processedAudio) return;

    const updateProgress = () => {
      const currentTime = Date.now() - playbackStartTimeRef.current;
      const duration = processedAudio.originalData.duration * 1000; // ミリ秒に変換
      const progress = Math.min(currentTime / duration, 1);
      
      setPlaybackProgress(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateProgress);
      } else {
        setIsPlaying(false);
        setPlaybackProgress(0);
        if (onPlaybackEnd) {
          onPlaybackEnd();
        }
      }
    };

    updateProgress();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, processedAudio, onPlaybackEnd]);

  // 音声の再生/停止
  const togglePlayback = async () => {
    if (!processedAudio || !enablePlayback) return;

    if (isPlaying) {
      // 停止
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }
      setIsPlaying(false);
      setPlaybackProgress(0);
    } else {
      // 再生
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }

        // PCMデータをAudioBufferに変換
        const audioBuffer = await audioContextRef.current.decodeAudioData(
          processedAudio.processedBuffer.slice(0)
        );

        sourceRef.current = audioContextRef.current.createBufferSource();
        sourceRef.current.buffer = audioBuffer;
        sourceRef.current.connect(audioContextRef.current.destination);
        
        sourceRef.current.onended = () => {
          setIsPlaying(false);
          setPlaybackProgress(0);
          if (onPlaybackEnd) {
            onPlaybackEnd();
          }
        };

        playbackStartTimeRef.current = Date.now();
        sourceRef.current.start();
        setIsPlaying(true);
      } catch (error) {
        console.error('再生エラー:', error);
        setIsPlaying(false);
      }
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className={`voice-waveform ${className}`}>
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 rounded"
          style={{ width, height }}
        />
        
        {/* 再生ボタン */}
        {enablePlayback && processedAudio && !isRecording && (
          <button
            onClick={togglePlayback}
            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            title={isPlaying ? '停止' : '再生'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <rect x="6" y="6" width="3" height="8" />
                <rect x="11" y="6" width="3" height="8" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* 録音情報 */}
      {processedAudio && !isRecording && (
        <div className="mt-2 text-sm text-gray-600">
          <p>長さ: {processedAudio.originalData.duration.toFixed(1)}秒</p>
          <p>形式: {processedAudio.format.sampleRate}Hz, {processedAudio.format.bitDepth}bit</p>
        </div>
      )}
    </div>
  );
};

// シンプルな音声レベルメーター
export const VoiceLevelMeter: React.FC<{
  level: number;
  width?: number;
  height?: number;
  className?: string;
}> = ({ level, width = 200, height = 20, className = '' }) => {
  const bars = 20;
  const activeBar = Math.floor(level * bars);

  return (
    <div className={`voice-level-meter ${className}`}>
      <div 
        className="flex gap-1" 
        style={{ width, height }}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className={`
              flex-1 rounded-sm transition-all duration-100
              ${i < activeBar 
                ? i < bars * 0.6 
                  ? 'bg-green-500' 
                  : i < bars * 0.8 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                : 'bg-gray-300'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};