import React from 'react';
import { ThemeCluster } from '../lib/conversationAnalyzer';

interface ThemeBlockProps {
  cluster: ThemeCluster;
  position: { x: number; y: number; width: number; height: number };
  isVisible: boolean;
}

export const ThemeBlock: React.FC<ThemeBlockProps> = ({ 
  cluster, 
  position, 
  isVisible 
}) => {
  if (!isVisible) return null;
  
  return (
    <div
      className="theme-block"
      style={{
        position: 'absolute',
        left: `${position.x - 20}px`,
        top: `${position.y - 20}px`,
        width: `${position.width + 40}px`,
        height: `${position.height + 40}px`,
        border: `2px dashed ${cluster.color}40`,
        borderRadius: '16px',
        backgroundColor: `${cluster.color}08`,
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* テーマラベル */}
      <div
        className="theme-label"
        style={{
          position: 'absolute',
          top: '-12px',
          left: '12px',
          background: cluster.color,
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        {cluster.name}
      </div>
      
      {/* キーワード表示 */}
      <div
        className="theme-keywords"
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '12px',
          background: 'rgba(0,0,0,0.8)',
          color: cluster.color,
          padding: '2px 8px',
          borderRadius: '8px',
          fontSize: '10px',
          fontWeight: 500
        }}
      >
        {cluster.keywords.slice(0, 2).join('・')}
      </div>
    </div>
  );
};

// 会話パターンマーカーコンポーネント
interface PatternMarkerProps {
  type: 'foreshadowing' | 'callback' | 'branch' | 'question' | 'answer' | 'theme_shift';
  position: { x: number; y: number };
  description: string;
}

export const PatternMarker: React.FC<PatternMarkerProps> = ({ 
  type, 
  position, 
  description 
}) => {
  const getMarkerStyle = () => {
    switch (type) {
      case 'foreshadowing':
        return {
          icon: '🎯',
          color: '#f59e0b',
          label: '伏線'
        };
      case 'callback':
        return {
          icon: '🔗',
          color: '#10b981',
          label: '回収'
        };
      case 'branch':
        return {
          icon: '🔀',
          color: '#ef4444',
          label: '分岐'
        };
      case 'question':
        return {
          icon: '❓',
          color: '#6366f1',
          label: '質問'
        };
      case 'answer':
        return {
          icon: '💬',
          color: '#8b5cf6',
          label: '回答'
        };
      case 'theme_shift':
        return {
          icon: '🔄',
          color: '#06b6d4',
          label: '転換'
        };
      default:
        return {
          icon: '📍',
          color: '#6b7280',
          label: 'マーク'
        };
    }
  };

  const markerStyle = getMarkerStyle();

  return (
    <div
      className="pattern-marker"
      style={{
        position: 'absolute',
        left: `${position.x - 12}px`,
        top: `${position.y - 12}px`,
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: markerStyle.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        zIndex: 15,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease'
      }}
      title={`${markerStyle.label}: ${description}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {markerStyle.icon}
    </div>
  );
};