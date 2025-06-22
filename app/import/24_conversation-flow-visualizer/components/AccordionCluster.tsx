import React, { useState } from 'react';
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

interface AccordionClusterProps {
  cluster: ThemeCluster;
  nodes: Node[];
  nodePositions: Map<string, NodePosition>;
  onNodeClick: (nodeId: string) => void;
  selectedNodeId: string | null;
  onClusterToggle: (clusterId: string, expanded: boolean) => void;
  isExpanded: boolean;
  currentlyPlayingNodeId: string | null;
  onPlayAudio?: (audioUrl: string, nodeId: string) => void;
}

export const AccordionCluster: React.FC<AccordionClusterProps> = ({
  cluster,
  nodes,
  nodePositions,
  onNodeClick,
  selectedNodeId,
  onClusterToggle,
  isExpanded,
  currentlyPlayingNodeId,
  onPlayAudio
}) => {
  const [detailLevel, setDetailLevel] = useState<'summary' | 'detailed'>('summary');
  
  // クラスター内のノードを取得
  const clusterNodes = nodes.filter(node => cluster.nodeIds.includes(node.id));
  
  // クラスター境界を計算
  const clusterNodePositions = cluster.nodeIds
    .map(nodeId => nodePositions.get(nodeId))
    .filter(pos => pos !== undefined) as NodePosition[];
  
  if (clusterNodePositions.length === 0) return null;
  
  const minX = Math.min(...clusterNodePositions.map(p => p.x));
  const maxX = Math.max(...clusterNodePositions.map(p => p.x + p.width));
  const minY = Math.min(...clusterNodePositions.map(p => p.y));
  const maxY = Math.max(...clusterNodePositions.map(p => p.y + p.height));
  
  const clusterBounds = {
    x: minX - 20,
    y: minY - 40,
    width: maxX - minX + 40,
    height: maxY - minY + 80
  };

  // ノードのサマリー表示を生成
  const generateSummary = () => {
    const totalNodes = clusterNodes.length;
    const speakerCounts = clusterNodes.reduce((acc, node) => {
      const speaker = node.text.match(/^話者(\d+)/)?.[1] || 'unknown';
      acc[speaker] = (acc[speaker] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalNodes,
      speakerCounts,
      keyPoints: cluster.keywords.slice(0, 3)
    };
  };

  const summary = generateSummary();

  return (
    <div
      className="accordion-cluster"
      style={{
        position: 'absolute',
        left: `${clusterBounds.x}px`,
        top: `${clusterBounds.y}px`,
        width: `${clusterBounds.width}px`,
        height: isExpanded ? `${clusterBounds.height}px` : '60px',
        border: `2px solid ${cluster.color}`,
        borderRadius: '12px',
        backgroundColor: isExpanded ? `${cluster.color}08` : `${cluster.color}15`,
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        zIndex: isExpanded ? 20 : 5,
        cursor: 'pointer'
      }}
      onClick={() => onClusterToggle(cluster.id, !isExpanded)}
    >
      {/* クラスターヘッダー */}
      <div
        className="cluster-header"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: `linear-gradient(135deg, ${cluster.color}20, ${cluster.color}10)`,
          borderBottom: isExpanded ? `1px solid ${cluster.color}30` : 'none',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* 展開・収束アイコン */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: cluster.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            marginRight: '12px',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        >
          ▶
        </div>
        
        {/* クラスタータイトル */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '2px'
            }}
          >
            {cluster.name}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: cluster.color,
              opacity: 0.8
            }}
          >
            {summary.totalNodes}ノード • {Object.keys(summary.speakerCounts).length}話者 • {summary.keyPoints.join('・')}
          </div>
        </div>
        
        {/* 重要度インジケーター */}
        <div
          style={{
            width: '8px',
            height: '32px',
            borderRadius: '4px',
            background: `linear-gradient(to top, ${cluster.color}60, ${cluster.color})`,
            marginLeft: '8px'
          }}
        />
      </div>

      {/* 展開時のコンテンツ */}
      {isExpanded && (
        <div
          className="cluster-content"
          style={{
            position: 'absolute',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '16px',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 詳細レベル切り替え */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              fontSize: '12px'
            }}
          >
            <button
              onClick={() => setDetailLevel('summary')}
              style={{
                padding: '4px 12px',
                borderRadius: '16px',
                border: 'none',
                background: detailLevel === 'summary' ? cluster.color : 'transparent',
                color: detailLevel === 'summary' ? 'white' : cluster.color,
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              概要
            </button>
            <button
              onClick={() => setDetailLevel('detailed')}
              style={{
                padding: '4px 12px',
                borderRadius: '16px',
                border: 'none',
                background: detailLevel === 'detailed' ? cluster.color : 'transparent',
                color: detailLevel === 'detailed' ? 'white' : cluster.color,
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              詳細
            </button>
          </div>

          {/* コンテンツ表示 */}
          {detailLevel === 'summary' ? (
            // サマリー表示
            <div className="cluster-summary">
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                  話者別分布
                </div>
                {Object.entries(summary.speakerCounts).map(([speaker, count]) => (
                  <div
                    key={speaker}
                    style={{
                      fontSize: '11px',
                      color: '#e9ecef',
                      marginBottom: '2px'
                    }}
                  >
                    話者{speaker}: {count}ノード
                  </div>
                ))}
              </div>
              
              <div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>
                  主要キーワード
                </div>
                <div style={{ fontSize: '11px', color: cluster.color }}>
                  {cluster.keywords.join(' • ')}
                </div>
              </div>
            </div>
          ) : (
            // 詳細ノードリスト
            <div className="cluster-nodes">
              {clusterNodes.map(node => (
                <div
                  key={node.id}
                  onClick={() => onNodeClick(node.id)}
                  style={{
                    padding: '8px 12px',
                    margin: '4px 0',
                    borderRadius: '8px',
                    background: selectedNodeId === node.id ? `${cluster.color}20` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${selectedNodeId === node.id ? cluster.color : 'transparent'}`,
                    cursor: 'pointer',
                    fontSize: '11px',
                    lineHeight: '1.4',
                    color: '#e9ecef',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {node.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};