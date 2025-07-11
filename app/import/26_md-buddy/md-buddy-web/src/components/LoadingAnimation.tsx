// 音声処理中のローディングアニメーションコンポーネント

import React, { useState, useEffect } from 'react';

// アニメーションタイプ
export enum AnimationType {
  WAVE = 'wave',
  PULSE = 'pulse',
  DOTS = 'dots',
  SPINNER = 'spinner',
  VOICE = 'voice',
  TRANSCRIBE = 'transcribe',
  AI_THINKING = 'ai-thinking'
}

// プロパティ
interface LoadingAnimationProps {
  type?: AnimationType;
  message?: string;
  subMessage?: string;
  progress?: number;
  showProgress?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

// ウェーブアニメーション
const WaveAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const barCount = 5;
  const barWidth = size === 'small' ? 3 : size === 'medium' ? 4 : 6;
  const barSpacing = size === 'small' ? 2 : size === 'medium' ? 3 : 4;
  const maxHeight = size === 'small' ? 20 : size === 'medium' ? 30 : 40;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${barSpacing}px` }}>
      {Array.from({ length: barCount }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `${barWidth}px`,
            height: `${maxHeight}px`,
            backgroundColor: color,
            borderRadius: `${barWidth / 2}px`,
            animation: `wave 1.2s ease-in-out ${index * 0.1}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          0%, 40%, 100% { transform: scaleY(0.4); }
          20% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

// パルスアニメーション
const PulseAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const circleSize = size === 'small' ? 40 : size === 'medium' ? 60 : 80;
  
  return (
    <div style={{ position: 'relative', width: `${circleSize}px`, height: `${circleSize}px` }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: color,
          opacity: 0.6,
          animation: 'pulse 2s ease-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          backgroundColor: color
        }}
      />
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// ドットアニメーション
const DotsAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const dotSize = size === 'small' ? 8 : size === 'medium' ? 12 : 16;
  const spacing = size === 'small' ? 4 : size === 'medium' ? 6 : 8;
  
  return (
    <div style={{ display: 'flex', gap: `${spacing}px` }}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: '50%',
            backgroundColor: color,
            animation: `dots 1.4s ease-in-out ${index * 0.16}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes dots {
          0%, 60%, 100% { transform: scale(0.6); opacity: 0.3; }
          30% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// スピナーアニメーション
const SpinnerAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const spinnerSize = size === 'small' ? 30 : size === 'medium' ? 40 : 50;
  const borderWidth = size === 'small' ? 3 : size === 'medium' ? 4 : 5;
  
  return (
    <div
      style={{
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        border: `${borderWidth}px solid ${color}20`,
        borderTop: `${borderWidth}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// 音声録音アニメーション
const VoiceAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const [audioLevel, setAudioLevel] = useState(0.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(0.3 + Math.random() * 0.7);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const micSize = size === 'small' ? 24 : size === 'medium' ? 32 : 40;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ fontSize: `${micSize}px`, color }}>🎤</div>
      <div style={{
        width: '60px',
        height: '4px',
        backgroundColor: '#e0e0e0',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${audioLevel * 100}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.1s ease-out'
        }} />
      </div>
    </div>
  );
};

// 転写中アニメーション
const TranscribeAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const [charIndex, setCharIndex] = useState(0);
  const text = '転写中...';
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex((prev) => (prev + 1) % (text.length + 1));
    }, 300);
    
    return () => clearInterval(interval);
  }, [text.length]);
  
  const fontSize = size === 'small' ? 14 : size === 'medium' ? 18 : 24;
  
  return (
    <div style={{ 
      fontSize: `${fontSize}px`,
      fontFamily: 'monospace',
      color,
      minWidth: '100px'
    }}>
      {text.substring(0, charIndex)}
      <span style={{ opacity: charIndex % 2 === 0 ? 1 : 0 }}>|</span>
    </div>
  );
};

// AI思考中アニメーション
const AIThinkingAnimation: React.FC<{ size: string; color: string }> = ({ size, color }) => {
  const [brainPulse, setBrainPulse] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBrainPulse(prev => prev === 1 ? 1.1 : 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const brainSize = size === 'small' ? 30 : size === 'medium' ? 40 : 50;
  
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        fontSize: `${brainSize}px`,
        transform: `scale(${brainPulse})`,
        transition: 'transform 0.5s ease-in-out'
      }}>
        🧠
      </div>
      <div style={{
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        display: 'flex',
        gap: '2px'
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: color,
              animation: `thinking ${1.5}s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes thinking {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

// メインコンポーネント
export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  type = AnimationType.WAVE,
  message,
  subMessage,
  progress,
  showProgress = false,
  size = 'medium',
  color = '#007bff',
  className = ''
}) => {
  // アニメーションコンポーネントの選択
  const renderAnimation = () => {
    switch (type) {
      case AnimationType.WAVE:
        return <WaveAnimation size={size} color={color} />;
      case AnimationType.PULSE:
        return <PulseAnimation size={size} color={color} />;
      case AnimationType.DOTS:
        return <DotsAnimation size={size} color={color} />;
      case AnimationType.SPINNER:
        return <SpinnerAnimation size={size} color={color} />;
      case AnimationType.VOICE:
        return <VoiceAnimation size={size} color={color} />;
      case AnimationType.TRANSCRIBE:
        return <TranscribeAnimation size={size} color={color} />;
      case AnimationType.AI_THINKING:
        return <AIThinkingAnimation size={size} color={color} />;
      default:
        return <WaveAnimation size={size} color={color} />;
    }
  };
  
  const containerPadding = size === 'small' ? '16px' : size === 'medium' ? '24px' : '32px';
  const messageFontSize = size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px';
  const subMessageFontSize = size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px';
  
  return (
    <div 
      className={`loading-animation ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: containerPadding,
        gap: '16px'
      }}
    >
      {/* アニメーション */}
      <div className="loading-animation-icon">
        {renderAnimation()}
      </div>
      
      {/* メッセージ */}
      {message && (
        <div style={{
          fontSize: messageFontSize,
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}
      
      {/* サブメッセージ */}
      {subMessage && (
        <div style={{
          fontSize: subMessageFontSize,
          color: '#666',
          textAlign: 'center'
        }}>
          {subMessage}
        </div>
      )}
      
      {/* プログレスバー */}
      {showProgress && progress !== undefined && (
        <div style={{
          width: '200px',
          marginTop: '8px'
        }}>
          <div style={{
            height: '4px',
            backgroundColor: '#e0e0e0',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              height: '100%',
              backgroundColor: color,
              transition: 'width 0.3s ease-out'
            }} />
          </div>
          <div style={{
            marginTop: '4px',
            fontSize: '12px',
            color: '#666',
            textAlign: 'center'
          }}>
            {Math.round(progress)}%
          </div>
        </div>
      )}
    </div>
  );
};

// 音声処理用プリセット
export const VoiceRecordingLoader: React.FC<Omit<LoadingAnimationProps, 'type'>> = (props) => (
  <LoadingAnimation
    {...props}
    type={AnimationType.VOICE}
    message={props.message || '録音中...'}
    subMessage={props.subMessage || 'マイクに向かって話してください'}
  />
);

export const TranscriptionLoader: React.FC<Omit<LoadingAnimationProps, 'type'>> = (props) => (
  <LoadingAnimation
    {...props}
    type={AnimationType.TRANSCRIBE}
    message={props.message || '音声を転写しています...'}
    subMessage={props.subMessage || 'しばらくお待ちください'}
  />
);

export const AIProcessingLoader: React.FC<Omit<LoadingAnimationProps, 'type'>> = (props) => (
  <LoadingAnimation
    {...props}
    type={AnimationType.AI_THINKING}
    message={props.message || 'AIが処理中...'}
    subMessage={props.subMessage || 'Markdownを生成しています'}
  />
);

// フルスクリーンローダー
export const FullscreenLoader: React.FC<LoadingAnimationProps & { backdrop?: boolean }> = ({
  backdrop = true,
  ...props
}) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backdrop ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  }}>
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)'
    }}>
      <LoadingAnimation {...props} />
    </div>
  </div>
);