import { useState, useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  draggedNodeId: string | null;
  offset: Position;
  startPosition: Position;
}

interface UseDragAndDropProps {
  onNodeMove: (nodeId: string, newPosition: Position) => void;
  scale: number;
}

export const useDragAndDrop = ({ onNodeMove, scale }: UseDragAndDropProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedNodeId: null,
    offset: { x: 0, y: 0 },
    startPosition: { x: 0, y: 0 }
  });

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseDown = useCallback((
    event: React.MouseEvent,
    nodeId: string,
    currentPosition: Position
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const clientX = event.clientX;
    const clientY = event.clientY;

    // ドラッグ開始位置を記録
    dragStartRef.current = { x: clientX, y: clientY };

    setDragState({
      isDragging: true,
      draggedNodeId: nodeId,
      offset: {
        x: clientX - currentPosition.x * scale,
        y: clientY - currentPosition.y * scale
      },
      startPosition: currentPosition
    });
  }, [scale]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedNodeId) return;

    const newX = (event.clientX - dragState.offset.x) / scale;
    const newY = (event.clientY - dragState.offset.y) / scale;

    // 最小移動距離のチェック（誤操作防止）
    if (dragStartRef.current) {
      const dx = event.clientX - dragStartRef.current.x;
      const dy = event.clientY - dragStartRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) { // 5px以上移動したらドラッグとみなす
        onNodeMove(dragState.draggedNodeId, { x: newX, y: newY });
      }
    }
  }, [dragState, scale, onNodeMove]);

  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedNodeId: null,
      offset: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 }
    });
    dragStartRef.current = null;
  }, []);

  // グローバルマウスイベントの管理
  const attachGlobalListeners = useCallback(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return {
    dragState,
    handleMouseDown,
    attachGlobalListeners,
    isDraggingNode: (nodeId: string) => 
      dragState.isDragging && dragState.draggedNodeId === nodeId
  };
};