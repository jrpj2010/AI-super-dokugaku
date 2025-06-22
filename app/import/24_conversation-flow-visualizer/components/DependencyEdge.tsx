import React from 'react';

// 依存関係エッジの型定義
export interface DependencyEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: 'timeseries' | 'dependency' | 'foreshadowing' | 'callback' | 'question_answer' | 'theme_relation';
  keywords: string[];
  strength: number; // 0-1の強度スコア
  description?: string;
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
  isHovered?: boolean;
}

export const DependencyEdgeComponent: React.FC<DependencyEdgeProps> = ({
  edge,
  sourcePosition,
  targetPosition,
  onHover,
  isHovered = false
}) => {
  // ノードの中心点を計算
  const sourceCenterX = sourcePosition.x + sourcePosition.width / 2;
  const sourceCenterY = sourcePosition.y + sourcePosition.height / 2;
  const targetCenterX = targetPosition.x + targetPosition.width / 2;
  const targetCenterY = targetPosition.y + targetPosition.height / 2;
  
  // 角度を計算
  const angle = Math.atan2(targetCenterY - sourceCenterY, targetCenterX - sourceCenterX);
  
  // ノードの境界線との交点を計算
  const calculateBoundaryPoint = (nodePos: NodePosition, centerX: number, centerY: number, angle: number, isSource: boolean) => {
    const halfWidth = nodePos.width / 2;
    const halfHeight = nodePos.height / 2;
    
    // 反対方向の角度を使用（ソースノードの場合は外向き、ターゲットノードの場合は内向き）
    const adjustedAngle = isSource ? angle : angle + Math.PI;
    
    // 四辺との交点を計算
    const absAngle = Math.abs(Math.atan(halfHeight / halfWidth));
    const quadrant = Math.abs(adjustedAngle);
    
    let x, y;
    
    if (quadrant < absAngle || quadrant > Math.PI - absAngle) {
      // 左右の辺との交点
      const sign = Math.cos(adjustedAngle) > 0 ? 1 : -1;
      x = centerX + sign * halfWidth;
      y = centerY + sign * halfWidth * Math.tan(adjustedAngle);
    } else {
      // 上下の辺との交点
      const sign = Math.sin(adjustedAngle) > 0 ? 1 : -1;
      y = centerY + sign * halfHeight;
      x = centerX + sign * halfHeight / Math.tan(adjustedAngle);
    }
    
    return { x, y };
  };
  
  // ソースとターゲットの境界点を計算
  const sourcePoint = calculateBoundaryPoint(sourcePosition, sourceCenterX, sourceCenterY, angle, true);
  const targetPoint = calculateBoundaryPoint(targetPosition, targetCenterX, targetCenterY, angle, false);
  
  // エッジタイプに基づくスタイル設定
  const getEdgeStyle = () => {
    switch (edge.type) {
      case 'foreshadowing':
        return {
          color: '#f59e0b',
          dashArray: '12,6',
          width: 3 + (edge.strength * 2),
          opacity: 0.7 + (edge.strength * 0.3)
        };
      case 'callback':
        return {
          color: '#10b981',
          dashArray: '0',
          width: 4 + (edge.strength * 3),
          opacity: 0.8 + (edge.strength * 0.2)
        };
      case 'question_answer':
        return {
          color: '#6366f1',
          dashArray: '8,4',
          width: 3 + (edge.strength * 2),
          opacity: 0.8
        };
      case 'theme_relation':
        return {
          color: '#8b5cf6',
          dashArray: '4,4',
          width: 2 + (edge.strength * 2),
          opacity: 0.6 + (edge.strength * 0.4)
        };
      case 'dependency':
        return {
          color: '#6366f1',
          dashArray: '8,4',
          width: 2 + (edge.strength * 3),
          opacity: 0.4 + (edge.strength * 0.6)
        };
      default: // timeseries
        return {
          color: '#6b7280',
          dashArray: '0',
          width: 2,
          opacity: 0.5
        };
    }
  };

  const edgeStyle = getEdgeStyle();
  
  // ベジェ曲線のコントロールポイントを計算（境界点を使用）
  const midX = (sourcePoint.x + targetPoint.x) / 2;
  const midY = (sourcePoint.y + targetPoint.y) / 2;
  const controlOffset = edge.type === 'foreshadowing' || edge.type === 'callback' ? 80 : 50;
  const controlX = midX + (targetPoint.x > sourcePoint.x ? controlOffset : -controlOffset);
  const controlY = midY - Math.abs(targetPoint.y - sourcePoint.y) * 0.3;
  
  // パスを作成（境界点を使用）
  const path = `M ${sourcePoint.x} ${sourcePoint.y} Q ${controlX} ${controlY} ${targetPoint.x} ${targetPoint.y}`;
  
  // ラベルの位置を計算
  const labelX = midX;
  const labelY = midY - 10;
  
  return (
    <g className="dependency-edge-group">
      {/* メインの依存関係線（曲線） */}
      <path
        d={path}
        stroke={edgeStyle.color}
        strokeOpacity={isHovered ? 1 : edgeStyle.opacity}
        strokeWidth={isHovered ? edgeStyle.width + 1 : edgeStyle.width}
        strokeDasharray={edgeStyle.dashArray}
        fill="none"
        markerEnd="url(#arrowhead)"
        className="dependency-edge edge-line"
        onMouseEnter={() => onHover?.(edge)}
        onMouseLeave={() => onHover?.(null)}
        style={{ 
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          filter: `drop-shadow(0 0 ${isHovered ? 8 : 4}px ${edgeStyle.color}30)`
        }}
      />
      
      {/* ホバー時のヒットエリアを拡大（透明な太い線） */}
      <path
        d={path}
        stroke="transparent"
        strokeWidth={15}
        fill="none"
        onMouseEnter={() => onHover?.(edge)}
        onMouseLeave={() => onHover?.(null)}
        style={{ cursor: 'pointer' }}
      />
      
      {/* エッジのラベル */}
      {edge.description && (
        <g>
          <rect
            x={labelX - 40}
            y={labelY - 10}
            width="80"
            height="20"
            fill="#ffffff"
            stroke={edgeStyle.color}
            strokeWidth="1"
            rx="4"
            opacity="0.95"
          />
          <text
            x={labelX}
            y={labelY + 3}
            textAnchor="middle"
            fontSize="11"
            fill={edgeStyle.color}
            style={{ pointerEvents: 'none' }}
          >
            {edge.description.length > 10 ? edge.description.slice(0, 10) + '...' : edge.description}
          </text>
        </g>
      )}
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
  
  // エッジタイプに基づく表示情報
  const getEdgeInfo = () => {
    switch (edge.type) {
      case 'foreshadowing':
        return { title: '伏線設置', icon: '🎯', color: '#f59e0b' };
      case 'callback':
        return { title: '伏線回収', icon: '🔗', color: '#10b981' };
      case 'question_answer':
        return { title: '質問→回答', icon: '💬', color: '#6366f1' };
      case 'theme_relation':
        return { title: 'テーマ関連', icon: '🏷️', color: '#8b5cf6' };
      case 'dependency':
        return { title: '依存関係', icon: '🔀', color: '#6366f1' };
      default:
        return { title: '時系列', icon: '⏱️', color: '#6b7280' };
    }
  };

  const edgeInfo = getEdgeInfo();
  
  return (
    <div
      className="edge-tooltip visible"
      style={{
        position: 'absolute',
        left: position.x + 10,
        top: position.y - 30,
        background: '#1c1f23',
        color: '#e9ecef',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        zIndex: 1000,
        maxWidth: '240px',
        border: `1px solid ${edgeInfo.color}60`
      }}
    >
      <div style={{ 
        fontWeight: 'bold', 
        marginBottom: '6px',
        color: edgeInfo.color,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>{edgeInfo.icon}</span>
        {edgeInfo.title}
      </div>
      
      {edge.description && (
        <div style={{ marginBottom: '4px', fontSize: '11px' }}>
          {edge.description}
        </div>
      )}
      
      {edge.keywords.length > 0 && (
        <div style={{ marginBottom: '4px' }}>
          <span style={{ opacity: 0.7 }}>キーワード: </span>
          {edge.keywords.slice(0, 3).join('、')}
          {edge.keywords.length > 3 && ` 他${edge.keywords.length - 3}個`}
        </div>
      )}
      
      <div style={{ opacity: 0.7, fontSize: '10px' }}>
        関連度: {(edge.strength * 100).toFixed(0)}%
      </div>
    </div>
  );
};