import React from 'react';
import { FlowTheme } from '../types/Flow';

interface FlowControlPanelProps {
    scale: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    showDependencies: boolean;
    onToggleDependencies: () => void;
    themes: FlowTheme[];
    onReset: () => void;
    hierarchyLevel: number;
    onHierarchyChange: (level: number) => void;
}

export const FlowControlPanel: React.FC<FlowControlPanelProps> = React.memo(({
    scale,
    onZoomIn,
    onZoomOut,
    showDependencies,
    onToggleDependencies,
    themes,
    onReset,
    hierarchyLevel,
    onHierarchyChange
}) => {
    return (
        <div className="flow-control-panel">
            <div className="control-section">
                <h3 className="control-title">表示コントロール</h3>
                <div className="zoom-controls">
                    <button onClick={onZoomOut} className="zoom-button">−</button>
                    <span className="zoom-level">{Math.round(scale * 100)}%</span>
                    <button onClick={onZoomIn} className="zoom-button">+</button>
                </div>
                <label className="control-checkbox">
                    <input 
                        type="checkbox" 
                        checked={showDependencies}
                        onChange={onToggleDependencies}
                    />
                    <span>フロー接続を表示</span>
                </label>
            </div>

            <div className="control-section">
                <h3 className="control-title">階層レベル</h3>
                <div className="hierarchy-controls">
                    <input
                        type="range"
                        min="0"
                        max="2"
                        value={hierarchyLevel}
                        onChange={(e) => onHierarchyChange(parseInt(e.target.value))}
                        className="hierarchy-slider"
                    />
                    <div className="hierarchy-labels">
                        <span className={hierarchyLevel === 0 ? 'active' : ''}>大テーマ</span>
                        <span className={hierarchyLevel === 1 ? 'active' : ''}>中テーマ</span>
                        <span className={hierarchyLevel === 2 ? 'active' : ''}>小テーマ</span>
                    </div>
                </div>
            </div>

            <div className="control-section">
                <h3 className="control-title">検出されたテーマ</h3>
                <div className="theme-list">
                    {themes.map(theme => (
                        <div key={theme.id} className="theme-item">
                            <h4 className="theme-name">{theme.name}</h4>
                            <p className="theme-description">{theme.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="control-section">
                <button onClick={onReset} className="reset-button">
                    リセット
                </button>
            </div>
        </div>
    );
});

FlowControlPanel.displayName = 'FlowControlPanel';