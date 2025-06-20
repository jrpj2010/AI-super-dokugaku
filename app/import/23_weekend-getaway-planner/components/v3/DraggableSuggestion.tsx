'use client'

import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

interface DraggableSuggestionProps {
  suggestion: {
    id: string;
    emoji: string;
    title: string;
    details: {
      duration: string;
    };
  };
}

export function DraggableSuggestion({ suggestion }: DraggableSuggestionProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: suggestion.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white rounded-lg p-3 
        border border-gray-200 cursor-grab active:cursor-grabbing
        transition-all hover:border-blue-400 hover:shadow-md shadow-sm
        ${isDragging ? 'opacity-50' : ''}
      `}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-3">
        <GripVertical className="w-4 h-4 text-gray-400" />
        <span className="text-2xl">{suggestion.emoji}</span>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{suggestion.title}</p>
          <p className="text-xs text-gray-600">{suggestion.details.duration}</p>
        </div>
      </div>
    </div>
  );
}