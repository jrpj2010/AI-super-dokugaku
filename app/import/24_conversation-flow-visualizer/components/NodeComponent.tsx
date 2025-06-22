import React from 'react';
import { FlowNode } from '../types/Flow';
import { NodePosition } from '../types/UI';

interface NodeComponentProps {
    node: FlowNode;
    position: NodePosition;
    isSelected: boolean;
    isExpanded?: boolean;
    onClick: () => void;
    onMouseDown?: (e: React.MouseEvent) => void;
}

export const NodeComponent: React.FC<NodeComponentProps> = React.memo(({
    node,
    position,
    isSelected,
    isExpanded = false,
    onClick,
    onMouseDown
}) => {
    const getNodeColor = (type: FlowNode['type']) => {
        const colors = {
            'greeting': '#10b981',      // 緑
            'problem': '#ef4444',       // 赤
            'current_state': '#f59e0b', // オレンジ
            'proposal': '#3b82f6',      // 青
            'qa': '#8b5cf6',          // 紫
            'negotiation': '#ec4899',   // ピンク
            'closing': '#10b981',       // 緑
            'next_step': '#6366f1',     // インディゴ
            'general': '#6b7280'        // グレー
        };
        return colors[type] || colors.general;
    };

    const nodeColor = getNodeColor(node.type);

    return (
        <div
            className={`flow-node ${isSelected ? 'selected' : ''} ${isExpanded ? 'expanded' : ''}`}
            style={{
                width: isExpanded ? `${position.width * 1.5}px` : `${position.width}px`,
                height: isExpanded ? 'auto' : `${position.height}px`,
                minHeight: isExpanded ? `${position.height * 2}px` : `${position.height}px`,
                borderColor: nodeColor,
                backgroundColor: `${nodeColor}10`,
                zIndex: isSelected ? 1000 : 1,
                transition: 'all 0.3s ease'
            }}
            onClick={onClick}
        >
            <div 
                className="node-header" 
                style={{ backgroundColor: nodeColor }}
                onMouseDown={onMouseDown}
            >
                <h3 className="node-phase">{node.phase}</h3>
            </div>
            <div className="node-content">
                <p className="node-summary">
                    {isExpanded ? node.content : node.content.slice(0, 100) + (node.content.length > 100 ? '...' : '')}
                </p>
                <div className="node-keywords">
                    {(isExpanded ? node.keywords : node.keywords.slice(0, 3)).map((keyword, idx) => (
                        <span key={idx} className="keyword-tag">{keyword}</span>
                    ))}
                    {!isExpanded && node.keywords.length > 3 && (
                        <span className="keyword-more">+{node.keywords.length - 3}</span>
                    )}
                </div>
                <div className="node-speaker">話者: {node.speaker}</div>
                {isExpanded && (
                    <div className="node-expanded-content">
                        <div className="node-details">
                            <h4>詳細分析</h4>
                            <p className="node-full-content">{node.content}</p>
                            {node.keywords.length > 3 && (
                                <div className="node-all-keywords">
                                    <h5>全キーワード</h5>
                                    <div className="node-keywords">
                                        {node.keywords.map((keyword, idx) => (
                                            <span key={idx} className="keyword-tag">{keyword}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

NodeComponent.displayName = 'NodeComponent';