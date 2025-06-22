import React from 'react';

export type LayoutMode = 'vertical' | 'horizontal' | 'circular' | 'hierarchical';

interface LayoutModeSelectorProps {
  currentMode: LayoutMode;
  onModeChange: (mode: LayoutMode) => void;
}

export const LayoutModeSelector: React.FC<LayoutModeSelectorProps> = ({
  currentMode,
  onModeChange
}) => {
  const layoutModes = [
    {
      id: 'vertical' as LayoutMode,
      name: '縦展開',
      icon: '↕️',
      description: '時系列重視の縦配置'
    },
    {
      id: 'horizontal' as LayoutMode,
      name: '横展開',
      icon: '↔️',
      description: '話者重視の横配置'
    },
    {
      id: 'circular' as LayoutMode,
      name: '円形',
      icon: '🔄',
      description: '中心テーマから放射状'
    },
    {
      id: 'hierarchical' as LayoutMode,
      name: '階層',
      icon: '🌳',
      description: 'ツリー構造表示'
    }
  ];

  return (
    <div className="layout-mode-selector">
      <div className="selector-header">
        <span className="selector-title">レイアウトモード</span>
      </div>
      
      <div className="mode-grid">
        {layoutModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`mode-button ${currentMode === mode.id ? 'active' : ''}`}
            title={mode.description}
          >
            <div className="mode-icon">{mode.icon}</div>
            <div className="mode-name">{mode.name}</div>
          </button>
        ))}
      </div>
      
    </div>
  );
};