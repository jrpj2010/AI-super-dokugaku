// フィードバックボタンコンポーネント

import React, { useState, useCallback, useEffect } from 'react';
import { analyticsTracker, TrackingEvent } from '../services/analytics/tracker';

// フィードバックタイプ
export enum FeedbackType {
  LIKE = 'like',
  DISLIKE = 'dislike',
  HELPFUL = 'helpful',
  NOT_HELPFUL = 'not_helpful',
  ACCURATE = 'accurate',
  INACCURATE = 'inaccurate'
}

// フィードバックカテゴリ
export enum FeedbackCategory {
  TRANSCRIPTION_QUALITY = 'transcription_quality',
  MARKDOWN_QUALITY = 'markdown_quality',
  UI_EXPERIENCE = 'ui_experience',
  FEATURE_REQUEST = 'feature_request',
  BUG_REPORT = 'bug_report',
  GENERAL = 'general'
}

// フィードバック情報
export interface FeedbackInfo {
  type: FeedbackType;
  category: FeedbackCategory;
  rating?: number;
  comment?: string;
  contextData?: any;
}

// プロパティ
interface FeedbackButtonsProps {
  onFeedback?: (feedback: FeedbackInfo) => void;
  category?: FeedbackCategory;
  contextData?: any;
  showDetailedFeedback?: boolean;
  style?: 'simple' | 'detailed' | 'emoji';
  className?: string;
}

// シンプルフィードバックボタン
export const SimpleFeedbackButtons: React.FC<{
  onFeedback?: (isPositive: boolean) => void;
  size?: 'small' | 'medium' | 'large';
}> = ({ onFeedback, size = 'medium' }) => {
  const [selected, setSelected] = useState<'like' | 'dislike' | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  const buttonSize = {
    small: '32px',
    medium: '40px',
    large: '48px'
  }[size];

  const fontSize = {
    small: '16px',
    medium: '20px',
    large: '24px'
  }[size];

  const handleFeedback = useCallback((isPositive: boolean) => {
    setSelected(isPositive ? 'like' : 'dislike');
    setShowThanks(true);
    
    if (onFeedback) {
      onFeedback(isPositive);
    }

    // アナリティクス記録
    analyticsTracker.trackEvent(TrackingEvent.FEEDBACK_GIVEN, {
      type: isPositive ? 'like' : 'dislike',
      category: 'simple_feedback'
    });

    // 3秒後にリセット
    setTimeout(() => {
      setShowThanks(false);
    }, 3000);
  }, [onFeedback]);

  if (showThanks) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: '#e8f5e9',
        borderRadius: '20px',
        fontSize: '14px',
        color: '#2e7d32'
      }}>
        ✨ フィードバックありがとうございます！
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <button
        onClick={() => handleFeedback(true)}
        disabled={selected !== null}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: '50%',
          border: selected === 'like' ? '2px solid #4caf50' : '1px solid #e0e0e0',
          backgroundColor: selected === 'like' ? '#e8f5e9' : 'white',
          cursor: selected === null ? 'pointer' : 'default',
          fontSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          opacity: selected === 'dislike' ? 0.5 : 1
        }}
        onMouseEnter={(e) => {
          if (selected === null) {
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        👍
      </button>
      
      <button
        onClick={() => handleFeedback(false)}
        disabled={selected !== null}
        style={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: '50%',
          border: selected === 'dislike' ? '2px solid #f44336' : '1px solid #e0e0e0',
          backgroundColor: selected === 'dislike' ? '#ffebee' : 'white',
          cursor: selected === null ? 'pointer' : 'default',
          fontSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          opacity: selected === 'like' ? 0.5 : 1
        }}
        onMouseEnter={(e) => {
          if (selected === null) {
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        👎
      </button>
    </div>
  );
};

// 詳細フィードバックコンポーネント
export const DetailedFeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  onFeedback,
  category = FeedbackCategory.GENERAL,
  contextData,
  className = ''
}) => {
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInitialFeedback = useCallback((type: FeedbackType) => {
    setSelectedType(type);
    setShowForm(true);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedType) return;

    const feedback: FeedbackInfo = {
      type: selectedType,
      category,
      rating: rating || undefined,
      comment: comment.trim() || undefined,
      contextData
    };

    if (onFeedback) {
      onFeedback(feedback);
    }

    // アナリティクス記録
    analyticsTracker.trackFeedback(
      category,
      rating || 0,
      comment.trim(),
      contextData
    );

    setIsSubmitted(true);
  }, [selectedType, category, rating, comment, contextData, onFeedback]);

  const handleReset = useCallback(() => {
    setSelectedType(null);
    setRating(0);
    setComment('');
    setShowForm(false);
    setIsSubmitted(false);
  }, []);

  if (isSubmitted) {
    return (
      <div className={`feedback-success ${className}`} style={{
        padding: '16px',
        backgroundColor: '#e8f5e9',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32' }}>
          フィードバックを送信しました
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
          貴重なご意見ありがとうございます
        </div>
        <button
          onClick={handleReset}
          style={{
            marginTop: '12px',
            padding: '6px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#4caf50',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          別のフィードバックを送る
        </button>
      </div>
    );
  }

  return (
    <div className={`detailed-feedback ${className}`}>
      {!showForm ? (
        // 初期ボタン表示
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => handleInitialFeedback(FeedbackType.HELPFUL)}
            className="feedback-option-button"
            style={{
              padding: '12px 20px',
              border: '1px solid #4caf50',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e8f5e9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <span style={{ fontSize: '20px' }}>💡</span>
            役に立った
          </button>

          <button
            onClick={() => handleInitialFeedback(FeedbackType.NOT_HELPFUL)}
            className="feedback-option-button"
            style={{
              padding: '12px 20px',
              border: '1px solid #ff9800',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fff3e0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <span style={{ fontSize: '20px' }}>🤔</span>
            改善が必要
          </button>

          <button
            onClick={() => handleInitialFeedback(FeedbackType.INACCURATE)}
            className="feedback-option-button"
            style={{
              padding: '12px 20px',
              border: '1px solid #f44336',
              borderRadius: '8px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffebee';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            <span style={{ fontSize: '20px' }}>❌</span>
            不正確
          </button>
        </div>
      ) : (
        // 詳細フォーム表示
        <div style={{
          padding: '16px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
            詳細なフィードバック
          </h4>

          {/* 評価 */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
              評価（任意）
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '24px',
                    color: star <= rating ? '#ffc107' : '#e0e0e0',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* コメント */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>
              コメント（任意）
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="具体的なフィードバックをお聞かせください..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                resize: 'vertical',
                fontFamily: 'inherit',
                fontSize: '14px'
              }}
            />
          </div>

          {/* アクションボタン */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={handleReset}
              style={{
                padding: '8px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              キャンセル
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#2196f3',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              送信
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 絵文字フィードバックコンポーネント
export const EmojiFeedbackButtons: React.FC<{
  onFeedback?: (emoji: string, sentiment: number) => void;
  question?: string;
}> = ({ onFeedback, question = 'この機能はいかがでしたか？' }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const emojiOptions = [
    { emoji: '😍', sentiment: 5, label: '最高！' },
    { emoji: '😊', sentiment: 4, label: '良い' },
    { emoji: '😐', sentiment: 3, label: '普通' },
    { emoji: '😕', sentiment: 2, label: 'イマイチ' },
    { emoji: '😞', sentiment: 1, label: '悪い' }
  ];

  const handleEmojiClick = useCallback((emoji: string, sentiment: number) => {
    setSelected(emoji);
    
    if (onFeedback) {
      onFeedback(emoji, sentiment);
    }

    // アナリティクス記録
    analyticsTracker.trackEvent(TrackingEvent.FEEDBACK_GIVEN, {
      type: 'emoji',
      emoji,
      sentiment
    });
  }, [onFeedback]);

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>
        {question}
      </p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {emojiOptions.map(({ emoji, sentiment, label }) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClick(emoji, sentiment)}
            disabled={selected !== null}
            style={{
              width: '48px',
              height: '48px',
              border: selected === emoji ? '2px solid #2196f3' : '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: selected === emoji ? '#e3f2fd' : 'white',
              cursor: selected === null ? 'pointer' : 'default',
              fontSize: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: selected !== null && selected !== emoji ? 0.5 : 1,
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (selected === null) {
                e.currentTarget.style.transform = 'scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={label}
          >
            <span>{emoji}</span>
            {selected === emoji && (
              <span style={{
                position: 'absolute',
                bottom: '-20px',
                fontSize: '12px',
                color: '#2196f3',
                whiteSpace: 'nowrap'
              }}>
                {label}
              </span>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#4caf50' }}>
          フィードバックありがとうございます！
        </p>
      )}
    </div>
  );
};

// メインのフィードバックボタンコンポーネント
export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  onFeedback,
  category = FeedbackCategory.GENERAL,
  contextData,
  showDetailedFeedback = false,
  style = 'simple',
  className = ''
}) => {
  const handleSimpleFeedback = useCallback((isPositive: boolean) => {
    if (onFeedback) {
      onFeedback({
        type: isPositive ? FeedbackType.LIKE : FeedbackType.DISLIKE,
        category,
        contextData
      });
    }
  }, [onFeedback, category, contextData]);

  const handleEmojiFeedback = useCallback((emoji: string, sentiment: number) => {
    if (onFeedback) {
      onFeedback({
        type: sentiment >= 4 ? FeedbackType.LIKE : sentiment <= 2 ? FeedbackType.DISLIKE : FeedbackType.HELPFUL,
        category,
        rating: sentiment,
        contextData
      });
    }
  }, [onFeedback, category, contextData]);

  switch (style) {
    case 'detailed':
      return (
        <DetailedFeedbackButtons
          onFeedback={onFeedback}
          category={category}
          contextData={contextData}
          className={className}
        />
      );
    
    case 'emoji':
      return (
        <EmojiFeedbackButtons
          onFeedback={handleEmojiFeedback}
        />
      );
    
    case 'simple':
    default:
      return (
        <SimpleFeedbackButtons
          onFeedback={handleSimpleFeedback}
        />
      );
  }
};