import React from 'react';

export type ViewLevel = 'summary' | 'topics' | 'details';

interface ViewLevelSelectorProps {
  currentLevel: ViewLevel;
  onLevelChange: (level: ViewLevel) => void;
  nodeCount: number;
  topicCount: number;
}

export const ViewLevelSelector: React.FC<ViewLevelSelectorProps> = React.memo(({
  currentLevel,
  onLevelChange,
  nodeCount,
  topicCount
}) => {
  const levels: Array<{ id: ViewLevel; label: string; description: string }> = [
    { id: 'summary', label: '概要', description: '会話の全体像' },
    { id: 'topics', label: 'トピック', description: `${topicCount}個の主要テーマ` },
    { id: 'details', label: '詳細', description: `${nodeCount}個の発言` }
  ];

  return (
    <div className="view-level-selector">
      {levels.map(level => (
        <button
          key={level.id}
          className={`level-button ${currentLevel === level.id ? 'active' : ''}`}
          onClick={() => onLevelChange(level.id)}
        >
          <span className="level-label">{level.label}</span>
          <span className="level-description">{level.description}</span>
        </button>
      ))}
    </div>
  );
});

ViewLevelSelector.displayName = 'ViewLevelSelector';