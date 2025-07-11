// 音声コメントコンポーネント

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { analyticsTracker } from '../services/analytics/tracker';
import { markdownConverter } from '../services/gemini/markdown-converter';

// コメントタイプ
export enum CommentType {
  QUESTION = 'question',
  SUGGESTION = 'suggestion',
  CLARIFICATION = 'clarification',
  APPROVAL = 'approval',
  CONCERN = 'concern'
}

// コメントタイプのアイコン
const COMMENT_ICONS: Record<CommentType, string> = {
  [CommentType.QUESTION]: '❓',
  [CommentType.SUGGESTION]: '💡',
  [CommentType.CLARIFICATION]: '📝',
  [CommentType.APPROVAL]: '✅',
  [CommentType.CONCERN]: '⚠️'
};

// コメントタイプの色
const COMMENT_COLORS: Record<CommentType, string> = {
  [CommentType.QUESTION]: '#ff69b4',
  [CommentType.SUGGESTION]: '#ffd700',
  [CommentType.CLARIFICATION]: '#87ceeb',
  [CommentType.APPROVAL]: '#90ee90',
  [CommentType.CONCERN]: '#ffa500'
};

// 音声コメント情報
export interface VoiceCommentInfo {
  id: string;
  position: number;
  audioData?: ArrayBuffer;
  transcribedText: string;
  duration: number;
  type: CommentType;
  isResolved: boolean;
  parentCommentId?: string;
  userId: string;
  userName?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// プロパティ
interface VoiceCommentProps {
  position: number;
  fileId: string;
  onCommentAdd?: (comment: Omit<VoiceCommentInfo, 'id' | 'userId' | 'createdAt'>) => void;
  onClose?: () => void;
  parentCommentId?: string;
  initialType?: CommentType;
}

// 音声コメント入力コンポーネント
export const VoiceCommentInput: React.FC<VoiceCommentProps> = ({
  position,
  fileId,
  onCommentAdd,
  onClose,
  parentCommentId,
  initialType = CommentType.QUESTION
}) => {
  const [commentType, setCommentType] = useState<CommentType>(initialType);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const audioDataRef = useRef<ArrayBuffer | null>(null);
  const durationRef = useRef<number>(0);

  const {
    isRecording,
    audioLevel,
    startRecording,
    stopRecording,
    error: recordingError
  } = useVoiceRecording({
    onRecordingComplete: async (audioData) => {
      audioDataRef.current = audioData.buffer;
      durationRef.current = audioData.duration;
      await transcribeAudio(audioData.buffer);
    }
  });

  // 音声転写処理
  const transcribeAudio = async (audioData: ArrayBuffer) => {
    setIsTranscribing(true);
    try {
      // 実際の実装では、Gemini APIを使用して転写
      // ここでは簡易的な実装
      const text = await simulateTranscription(audioData);
      setTranscribedText(text);
    } catch (error) {
      console.error('Transcription error:', error);
      setTranscribedText('（転写エラー）');
    } finally {
      setIsTranscribing(false);
    }
  };

  // 転写シミュレーション（実際の実装ではGemini APIを使用）
  const simulateTranscription = async (audioData: ArrayBuffer): Promise<string> => {
    // 実際の実装では以下のようにGemini APIを呼び出す
    // const response = await markdownConverter.convertAudioToMarkdown(
    //   { processedBuffer: audioData, duration: durationRef.current },
    //   { type: ConversionType.CUSTOM, language: 'ja' }
    // );
    // return response.markdown;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'これはテスト音声コメントです。実際の実装ではGemini APIを使用して音声を転写します。';
  };

  // コメント保存
  const handleSaveComment = useCallback(() => {
    if (!transcribedText.trim() && !audioDataRef.current) return;

    const comment = {
      position,
      audioData: audioDataRef.current || undefined,
      transcribedText: transcribedText.trim(),
      duration: durationRef.current,
      type: commentType,
      isResolved: false,
      parentCommentId
    };

    if (onCommentAdd) {
      onCommentAdd(comment);
    }

    // アナリティクス記録
    analyticsTracker.trackVoiceComment(
      fileId,
      position,
      audioDataRef.current || new ArrayBuffer(0),
      transcribedText,
      durationRef.current,
      commentType
    );

    // リセット
    setTranscribedText('');
    audioDataRef.current = null;
    durationRef.current = 0;
    
    if (onClose) {
      onClose();
    }
  }, [transcribedText, commentType, position, parentCommentId, fileId, onCommentAdd, onClose]);

  // 録音トグル
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return (
    <div className="voice-comment-input" style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '320px'
    }}>
      {/* ヘッダー */}
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
          {parentCommentId ? '返信を追加' : '音声コメントを追加'}
        </h4>
        
        {/* コメントタイプ選択 */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {Object.entries(CommentType).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setCommentType(value)}
              style={{
                padding: '4px 12px',
                border: `2px solid ${commentType === value ? COMMENT_COLORS[value] : '#e0e0e0'}`,
                borderRadius: '20px',
                backgroundColor: commentType === value ? COMMENT_COLORS[value] + '20' : 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s'
              }}
            >
              <span>{COMMENT_ICONS[value]}</span>
              <span>{value}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 録音コントロール */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleRecording}
            disabled={isTranscribing}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isRecording ? '#ff4444' : '#007bff',
              color: 'white',
              cursor: 'pointer',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: isRecording ? '0 0 0 4px rgba(255,68,68,0.3)' : 'none'
            }}
          >
            {isRecording ? '⏹️' : '🎤'}
          </button>

          {/* 音声レベルインジケーター */}
          {isRecording && (
            <div style={{ flex: 1 }}>
              <div style={{
                height: '8px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${audioLevel * 100}%`,
                  backgroundColor: '#4caf50',
                  transition: 'width 0.1s'
                }} />
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                録音中...
              </div>
            </div>
          )}

          {/* テキスト入力切り替え */}
          <button
            onClick={() => setShowTextInput(!showTextInput)}
            style={{
              padding: '8px 16px',
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ⌨️ テキスト
          </button>
        </div>

        {recordingError && (
          <div style={{ 
            marginTop: '8px',
            padding: '8px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {typeof recordingError === 'string' ? recordingError : recordingError.message}
          </div>
        )}
      </div>

      {/* 転写中表示 */}
      {isTranscribing && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          <div className="loading-spinner" style={{ marginBottom: '8px' }}>
            ⏳
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            音声を転写しています...
          </div>
        </div>
      )}

      {/* 転写結果またはテキスト入力 */}
      {(transcribedText || showTextInput) && (
        <div style={{ marginBottom: '12px' }}>
          <textarea
            value={transcribedText}
            onChange={(e) => setTranscribedText(e.target.value)}
            placeholder="コメントを入力..."
            readOnly={!showTextInput && !transcribedText}
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '8px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: '14px'
            }}
          />
        </div>
      )}

      {/* アクションボタン */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          style={{
            padding: '8px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          キャンセル
        </button>
        <button
          onClick={handleSaveComment}
          disabled={!transcribedText.trim() && !audioDataRef.current}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            opacity: (!transcribedText.trim() && !audioDataRef.current) ? 0.5 : 1
          }}
        >
          保存
        </button>
      </div>
    </div>
  );
};

// 音声コメント表示コンポーネント
export const VoiceCommentDisplay: React.FC<{
  comment: VoiceCommentInfo;
  onReply?: () => void;
  onResolve?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}> = ({ comment, onReply, onResolve, onDelete, showActions = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 音声再生
  const playAudio = useCallback(() => {
    if (!comment.audioData) return;

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // 音声データからBlobを作成
      const blob = new Blob([comment.audioData], { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
      
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
    }
  }, [comment.audioData, isPlaying]);

  return (
    <div style={{
      padding: '12px',
      backgroundColor: comment.isResolved ? '#f5f5f5' : 'white',
      border: `1px solid ${comment.isResolved ? '#e0e0e0' : COMMENT_COLORS[comment.type]}`,
      borderRadius: '8px',
      opacity: comment.isResolved ? 0.7 : 1
    }}>
      {/* ヘッダー */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '20px' }}>{COMMENT_ICONS[comment.type]}</span>
        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
          {comment.userName || 'ユーザー'}
        </span>
        <span style={{ fontSize: '12px', color: '#666' }}>
          {new Date(comment.createdAt).toLocaleString('ja-JP')}
        </span>
        {comment.isResolved && (
          <span style={{
            fontSize: '12px',
            padding: '2px 8px',
            backgroundColor: '#4caf50',
            color: 'white',
            borderRadius: '12px'
          }}>
            解決済み
          </span>
        )}
      </div>

      {/* コメント本文 */}
      <div style={{ marginBottom: '8px' }}>
        {comment.audioData && (
          <button
            onClick={playAudio}
            style={{
              padding: '4px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '20px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginBottom: '8px'
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
            <span>{Math.round(comment.duration)}秒</span>
          </button>
        )}
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
          {comment.transcribedText}
        </p>
      </div>

      {/* アクション */}
      {showActions && (
        <div style={{ display: 'flex', gap: '8px' }}>
          {onReply && (
            <button
              onClick={onReply}
              style={{
                padding: '4px 12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              💬 返信
            </button>
          )}
          {onResolve && !comment.isResolved && (
            <button
              onClick={onResolve}
              style={{
                padding: '4px 12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#4caf50',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              ✅ 解決
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              style={{
                padding: '4px 12px',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#ff4444',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              🗑️ 削除
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// 音声コメントリストコンポーネント
export const VoiceCommentList: React.FC<{
  comments: VoiceCommentInfo[];
  onReply?: (commentId: string) => void;
  onResolve?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
}> = ({ comments, onReply, onResolve, onDelete }) => {
  // コメントをスレッド形式に整理
  const threadedComments = comments.reduce((acc, comment) => {
    if (!comment.parentCommentId) {
      acc.push({
        ...comment,
        replies: comments.filter(c => c.parentCommentId === comment.id)
      });
    }
    return acc;
  }, [] as (VoiceCommentInfo & { replies: VoiceCommentInfo[] })[]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {threadedComments.map(comment => (
        <div key={comment.id}>
          <VoiceCommentDisplay
            comment={comment}
            onReply={onReply ? () => onReply(comment.id) : undefined}
            onResolve={onResolve ? () => onResolve(comment.id) : undefined}
            onDelete={onDelete ? () => onDelete(comment.id) : undefined}
          />
          {comment.replies.length > 0 && (
            <div style={{ marginLeft: '32px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comment.replies.map(reply => (
                <VoiceCommentDisplay
                  key={reply.id}
                  comment={reply}
                  onResolve={onResolve ? () => onResolve(reply.id) : undefined}
                  onDelete={onDelete ? () => onDelete(reply.id) : undefined}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};