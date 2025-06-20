import React from 'react';

// 依存関係エッジの型定義
export interface DependencyEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: 'timeseries' | 'dependency';
  keywords: string[];
  strength: number; // 0-1の強度スコア
}

// ノード位置の型定義
export interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DependencyEdgeProps {
  edge: DependencyEdge;
  sourcePosition: NodePosition;
  targetPosition: NodePosition;
  onHover?: (edge: DependencyEdge | null) => void;
}

export const DependencyEdgeComponent: React.FC<DependencyEdgeProps> = ({
  edge,
  sourcePosition,
  targetPosition,
  onHover
}) => {
  // エッジの中心点を計算
  const sourceCenterX = sourcePosition.x + sourcePosition.width / 2;
  const sourceCenterY = sourcePosition.y + sourcePosition.height / 2;
  const targetCenterX = targetPosition.x + targetPosition.width / 2;
  const targetCenterY = targetPosition.y + targetPosition.height / 2;
  
  // 強度に基づいて透明度を調整（0.3〜1.0の範囲）
  const opacity = 0.3 + (edge.strength * 0.7);
  const strokeWidth = 1 + (edge.strength * 2); // 1〜3pxの太さ
  
  // エッジの色（依存関係は青系、時系列は灰色）
  const strokeColor = edge.type === 'dependency' ? '#3a8cff' : '#5c6b7a';
  
  return (
    <g className="dependency-edge-group">
      {/* メインの依存関係線（点線） */}
      <line
        x1={sourceCenterX}
        y1={sourceCenterY}
        x2={targetCenterX}
        y2={targetCenterY}
        stroke={strokeColor}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
        strokeDasharray={edge.type === 'dependency' ? "5,5" : "0"}
        className="dependency-edge"
        onMouseEnter={() => onHover?.(edge)}
        onMouseLeave={() => onHover?.(null)}
        style={{ 
          cursor: 'pointer',
          transition: 'stroke-opacity 0.2s ease'
        }}
      />
      
      {/* ホバー時のヒットエリアを拡大（透明な太い線） */}
      <line
        x1={sourceCenterX}
        y1={sourceCenterY}
        x2={targetCenterX}
        y2={targetCenterY}
        stroke="transparent"
        strokeWidth={10}
        onMouseEnter={() => onHover?.(edge)}
        onMouseLeave={() => onHover?.(null)}
        style={{ cursor: 'pointer' }}
      />
    </g>
  );
};

// エッジツールチップコンポーネント
interface EdgeTooltipProps {
  edge: DependencyEdge | null;
  position: { x: number; y: number };
}

export const EdgeTooltip: React.FC<EdgeTooltipProps> = ({ edge, position }) => {
  if (!edge) return null;
  
  return (
    <div
      className="edge-tooltip"
      style={{
        position: 'absolute',
        left: position.x + 10,
        top: position.y - 30,
        background: '#1c1f23',
        color: '#e9ecef',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        maxWidth: '200px',
        border: '1px solid #2a2d31'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        共通キーワード
      </div>
      <div style={{ marginBottom: '4px' }}>
        {edge.keywords.slice(0, 3).join('、')}
        {edge.keywords.length > 3 && ` 他${edge.keywords.length - 3}個`}
      </div>
      <div style={{ opacity: 0.7, fontSize: '11px' }}>
        関連度: {(edge.strength * 100).toFixed(0)}%
      </div>
    </div>
  );
};