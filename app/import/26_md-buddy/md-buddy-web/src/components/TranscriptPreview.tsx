// リアルタイム文字起こしプレビューコンポーネント

import React, { useState, useEffect, useRef } from 'react';
import { LiveMessage } from '../types/gemini';

interface TranscriptPreviewProps {
  messages: LiveMessage[];
  isProcessing?: boolean;
  onMessageClick?: (message: LiveMessage) => void;
  className?: string;
  showTimestamps?: boolean;
  maxHeight?: string;
  autoScroll?: boolean;
}

interface ProcessedMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isPartial?: boolean;
  confidence?: number;
}

export const TranscriptPreview: React.FC<TranscriptPreviewProps> = ({
  messages,
  isProcessing = false,
  onMessageClick,
  className = '',
  showTimestamps = true,
  maxHeight = '400px',
  autoScroll = true,
}) => {
  const [processedMessages, setProcessedMessages] = useState<ProcessedMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // メッセージの処理
  useEffect(() => {
    const processed = messages.map((message, index) => {
      const isUser = message.data?.role === 'user';
      const content = message.type === 'text' 
        ? message.data?.text || ''
        : message.type === 'audio' 
          ? '[音声メッセージ]'
          : message.data?.toString() || '';

      return {
        id: `msg_${index}_${message.timestamp}`,
        type: isUser ? 'user' as const : 'assistant' as const,
        content,
        timestamp: message.timestamp || Date.now(),
        isPartial: message.type === 'text' && !content.endsWith('.') && !content.endsWith('。'),
        confidence: message.data?.confidence || 1.0
      };
    });

    setProcessedMessages(processed);
  }, [messages]);

  // 自動スクロール
  useEffect(() => {
    if (autoScroll && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [processedMessages, autoScroll]);

  // 時間フォーマット
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 信頼度による色分け
  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`transcript-preview ${className}`}>
      <div 
        ref={scrollRef}
        className="bg-white border border-gray-300 rounded-lg overflow-hidden"
        style={{ maxHeight }}
      >
        {/* ヘッダー */}
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              リアルタイム文字起こし
            </h3>
            <div className="flex items-center space-x-2">
              {isProcessing && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">処理中...</span>
                </div>
              )}
              <span className="text-xs text-gray-500">
                {processedMessages.length} メッセージ
              </span>
            </div>
          </div>
        </div>

        {/* メッセージリスト */}
        <div className="overflow-y-auto h-full">
          {processedMessages.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500">
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <p className="text-sm">音声入力を開始してください</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {processedMessages.map((message, index) => (
                <div
                  key={message.id}
                  ref={index === processedMessages.length - 1 ? lastMessageRef : undefined}
                  className={`
                    flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}
                  `}
                  onClick={() => onMessageClick && onMessageClick(messages[index])}
                >
                  <div
                    className={`
                      max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm
                      ${message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                      }
                      ${message.isPartial ? 'opacity-75 animate-pulse' : ''}
                      ${onMessageClick ? 'cursor-pointer hover:opacity-80' : ''}
                      transition-all duration-200
                    `}
                  >
                    {/* メッセージ内容 */}
                    <div className="break-words">
                      {message.content}
                      {message.isPartial && (
                        <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse">|</span>
                      )}
                    </div>

                    {/* タイムスタンプと信頼度 */}
                    {showTimestamps && (
                      <div className={`
                        text-xs mt-1 flex items-center justify-between
                        ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}
                      `}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.type === 'assistant' && message.confidence !== undefined && (
                          <span className={`
                            font-medium
                            ${getConfidenceColor(message.confidence)}
                          `}>
                            {Math.round(message.confidence * 100)}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* 処理中インジケーター */}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* フッター（統計情報） */}
        {processedMessages.length > 0 && (
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>
                文字数: {processedMessages.reduce((acc, msg) => acc + msg.content.length, 0)}
              </span>
              <span>
                平均信頼度: {Math.round(
                  processedMessages
                    .filter(msg => msg.type === 'assistant' && msg.confidence)
                    .reduce((acc, msg) => acc + (msg.confidence || 0), 0) /
                  Math.max(processedMessages.filter(msg => msg.type === 'assistant').length, 1) * 100
                )}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 簡易版コンポーネント
export const SimpleTranscriptPreview: React.FC<{
  currentTranscript: string;
  isProcessing?: boolean;
  className?: string;
}> = ({ currentTranscript, isProcessing = false, className = '' }) => {
  return (
    <div className={`simple-transcript-preview ${className}`}>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">音声認識結果</h4>
          {isProcessing && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">認識中...</span>
            </div>
          )}
        </div>
        
        <div className="min-h-[60px] text-sm text-gray-800">
          {currentTranscript ? (
            <p className="leading-relaxed">
              {currentTranscript}
              {isProcessing && (
                <span className="inline-block w-2 h-4 bg-gray-800 ml-1 animate-pulse">|</span>
              )}
            </p>
          ) : (
            <p className="text-gray-500 italic">
              音声を入力すると、ここに文字起こし結果が表示されます
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// 音声波形付きプレビュー
export const WaveformTranscriptPreview: React.FC<{
  messages: LiveMessage[];
  audioLevel?: number;
  isRecording?: boolean;
  isProcessing?: boolean;
  className?: string;
}> = ({ 
  messages, 
  audioLevel = 0, 
  isRecording = false, 
  isProcessing = false, 
  className = '' 
}) => {
  // 音声レベルの可視化
  const renderWaveform = () => {
    const bars = 20;
    const activeBar = Math.floor(audioLevel * bars);

    return (
      <div className="flex items-center space-x-1 h-8">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className={`
              w-1 transition-all duration-100
              ${i < activeBar 
                ? i < bars * 0.6 
                  ? 'bg-green-500 h-6' 
                  : i < bars * 0.8 
                    ? 'bg-yellow-500 h-4' 
                    : 'bg-red-500 h-2'
                : 'bg-gray-300 h-1'
              }
              ${isRecording ? 'animate-pulse' : ''}
            `}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`waveform-transcript-preview ${className}`}>
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        {/* 音声レベル表示 */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">音声レベル</span>
              {renderWaveform()}
            </div>
            <div className="flex items-center space-x-2">
              {isRecording && (
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600">録音中</span>
                </span>
              )}
              {isProcessing && (
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600">処理中</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 文字起こし結果 */}
        <TranscriptPreview
          messages={messages}
          isProcessing={isProcessing}
          showTimestamps={false}
          maxHeight="300px"
        />
      </div>
    </div>
  );
};