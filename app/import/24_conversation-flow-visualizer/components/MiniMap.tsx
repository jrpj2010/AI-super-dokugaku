import React from 'react';
import { ThemeCluster } from '../lib/conversationAnalyzer';

interface Node {
  id: string;
  text: string;
}

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MiniMapProps {
  nodes: Node[];
  nodePositions: Map<string, NodePosition>;
  themeClusters: ThemeCluster[];
  viewportBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  onViewportChange: (x: number, y: number) => void;
  scale: number;
}

export const MiniMap: React.FC<MiniMapProps> = ({
  nodes,
  nodePositions,
  themeClusters,
  viewportBounds,
  onViewportChange,
  scale
}) => {
  const miniMapWidth = 200;
  const miniMapHeight = 120;
  
  // 全ノードの境界を計算
  const positions = Array.from(nodePositions.values());
  if (positions.length === 0) return null;
  
  const minX = Math.min(...positions.map(p => p.x));
  const maxX = Math.max(...positions.map(p => p.x + p.width));
  const minY = Math.min(...positions.map(p => p.y));
  const maxY = Math.max(...positions.map(p => p.y + p.height));
  
  const contentWidth = maxX - minX;
  const contentHeight = maxY - minY;
  
  // スケール計算
  const scaleX = miniMapWidth / contentWidth;
  const scaleY = miniMapHeight / contentHeight;
  const miniScale = Math.min(scaleX, scaleY) * 0.8; // 余白を考慮
  
  // 座標変換関数
  const transformX = (x: number) => ((x - minX) * miniScale) + 10;
  const transformY = (y: number) => ((y - minY) * miniScale) + 10;
  
  // ビューポート位置の変換
  const viewportX = transformX(viewportBounds.x);
  const viewportY = transformY(viewportBounds.y);
  const viewportWidth = (viewportBounds.width / scale) * miniScale;
  const viewportHeight = (viewportBounds.height / scale) * miniScale;

  const handleMiniMapClick = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left - 10; // 余白を考慮
    const clickY = event.clientY - rect.top - 10;
    
    // ミニマップ座標を実座標に変換
    const realX = (clickX / miniScale) + minX;
    const realY = (clickY / miniScale) + minY;
    
    onViewportChange(realX, realY);
  };

  return (
    <div className="mini-map">
      <div className="mini-map-header">
        <span className="mini-map-title">ナビゲーション</span>
        <span className="mini-map-info">{nodes.length}ノード</span>
      </div>
      
      <svg
        width={miniMapWidth}
        height={miniMapHeight}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          background: 'rgba(0, 0, 0, 0.5)',
          cursor: 'pointer'
        }}
        onClick={handleMiniMapClick}
      >
        {/* テーマクラスターの表示 */}
        {themeClusters.map(cluster => {
          const clusterPositions = cluster.nodeIds
            .map(nodeId => nodePositions.get(nodeId))
            .filter(pos => pos !== undefined) as NodePosition[];
          
          if (clusterPositions.length === 0) return null;
          
          const clusterMinX = Math.min(...clusterPositions.map(p => p.x));
          const clusterMaxX = Math.max(...clusterPositions.map(p => p.x + p.width));
          const clusterMinY = Math.min(...clusterPositions.map(p => p.y));
          const clusterMaxY = Math.max(...clusterPositions.map(p => p.y + p.height));
          
          return (
            <rect
              key={cluster.id}
              x={transformX(clusterMinX)}
              y={transformY(clusterMinY)}
              width={(clusterMaxX - clusterMinX) * miniScale}
              height={(clusterMaxY - clusterMinY) * miniScale}
              fill={cluster.color}
              fillOpacity={0.2}
              stroke={cluster.color}
              strokeWidth={1}
              strokeOpacity={0.5}
              rx={2}
            />
          );
        })}
        
        {/* ノードの表示 */}
        {nodes.map(node => {
          const position = nodePositions.get(node.id);
          if (!position) return null;
          
          // 話者による色分け
          const speaker = node.text.match(/^話者(\d+)/)?.[1];
          const nodeColor = speaker === '1' ? '#3b82f6' : '#10b981';
          
          return (
            <circle
              key={node.id}
              cx={transformX(position.x + position.width / 2)}
              cy={transformY(position.y + position.height / 2)}
              r={2}
              fill={nodeColor}
              fillOpacity={0.8}
            />
          );
        })}
        
        {/* ビューポート表示 */}
        <rect
          x={Math.max(0, viewportX)}
          y={Math.max(0, viewportY)}
          width={Math.min(viewportWidth, miniMapWidth - Math.max(0, viewportX))}
          height={Math.min(viewportHeight, miniMapHeight - Math.max(0, viewportY))}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          strokeOpacity={0.8}
          strokeDasharray="4,2"
        />
      </svg>
      
    </div>
  );
};