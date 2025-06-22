import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

interface TimelineNode {
  id: string;
  text: string;
  speaker: string;
  timestamp: string;
  importance: 'high' | 'medium' | 'low';
  topic?: string;
}

interface TimelineViewProps {
  nodes: TimelineNode[];
  height: number;
  onNodeClick: (nodeId: string) => void;
  selectedNodeId: string | null;
}

const TimelineItem: React.FC<{
  index: number;
  style: React.CSSProperties;
  data: {
    nodes: TimelineNode[];
    onNodeClick: (nodeId: string) => void;
    selectedNodeId: string | null;
  };
}> = React.memo(({ index, style, data }) => {
  const node = data.nodes[index];
  const isSelected = data.selectedNodeId === node.id;
  const isSpeaker1 = node.speaker === '話者1';
  
  return (
    <div 
      style={style}
      className={`timeline-item ${isSelected ? 'selected' : ''} ${isSpeaker1 ? 'speaker-1' : 'speaker-2'} importance-${node.importance}`}
      onClick={() => data.onNodeClick(node.id)}
    >
      <div className="timeline-marker" />
      <div className="timeline-content">
        <div className="timeline-header">
          <span className="timeline-speaker">{node.speaker}</span>
          <span className="timeline-timestamp">{node.timestamp}</span>
          {node.topic && <span className="timeline-topic">{node.topic}</span>}
        </div>
        <div className="timeline-text">{node.text}</div>
      </div>
      
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

export const TimelineView: React.FC<TimelineViewProps> = React.memo(({
  nodes,
  height,
  onNodeClick,
  selectedNodeId
}) => {
  const itemData = useMemo(() => ({
    nodes,
    onNodeClick,
    selectedNodeId
  }), [nodes, onNodeClick, selectedNodeId]);

  return (
    <div className="timeline-view">
      <List
        height={height}
        itemCount={nodes.length}
        itemSize={80} // 各アイテムの固定高さ
        width="100%"
        itemData={itemData}
      >
        {TimelineItem}
      </List>
      
    </div>
  );
});

TimelineView.displayName = 'TimelineView';