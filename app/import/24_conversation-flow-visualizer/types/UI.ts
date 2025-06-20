// UI関連の型定義

export interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TooltipData {
  content: string;
  position: { x: number; y: number };
  type: 'node' | 'edge';
}

export interface ViewportState {
  scale: number;
  panOffset: { x: number; y: number };
}

export interface UIConfig {
  minScale: number;
  maxScale: number;
  zoomStep: number;
  nodeSpacing: number;
  animationDuration: number;
}