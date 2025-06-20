'use client'

import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Clock, Calendar, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DraggableSuggestion } from './DraggableSuggestion';
import { TimeSlot } from './TimeSlot';

interface TimelineBuilderProps {
  suggestions: any[];
  timeline: {
    saturday: any[];
    sunday: any[];
  };
  onAddToTimeline: (item: any, day: 'saturday' | 'sunday', time: string) => void;
  onRemoveFromTimeline: (day: 'saturday' | 'sunday', index: number) => void;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00'
];

export function TimelineBuilder({ 
  suggestions, 
  timeline, 
  onAddToTimeline, 
  onRemoveFromTimeline 
}: TimelineBuilderProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<'saturday' | 'sunday'>('saturday');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && over.id.startsWith('slot-')) {
      const [_, day, time] = over.id.split('-');
      const suggestion = suggestions.find(s => s.id === active.id);
      if (suggestion) {
        onAddToTimeline(suggestion, day as 'saturday' | 'sunday', time);
      }
    }
    
    setActiveId(null);
  };

  const activeSuggestion = activeId ? suggestions.find(s => s.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-[600px] flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          📅 タイムラインを作成
        </h2>

        {/* 曜日タブ */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedDay('saturday')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              selectedDay === 'saturday'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Calendar className="inline-block w-4 h-4 mr-2" />
            土曜日
          </button>
          <button
            onClick={() => setSelectedDay('sunday')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              selectedDay === 'sunday'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Calendar className="inline-block w-4 h-4 mr-2" />
            日曜日
          </button>
        </div>

        {/* 提案リスト */}
        {suggestions.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">ドラッグしてタイムラインに追加</p>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <DraggableSuggestion key={suggestion.id} suggestion={suggestion} />
              ))}
            </div>
          </div>
        )}

        {/* タイムスロット */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
          <div className="space-y-2">
            {TIME_SLOTS.map((time) => {
              const dayTimeline = timeline[selectedDay];
              const slotItem = dayTimeline.find(item => item.time === time);
              
              return (
                <TimeSlot
                  key={`${selectedDay}-${time}`}
                  id={`slot-${selectedDay}-${time}`}
                  time={time}
                  item={slotItem}
                  onRemove={() => {
                    const index = dayTimeline.findIndex(item => item.time === time);
                    if (index !== -1) {
                      onRemoveFromTimeline(selectedDay, index);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* プラン概要 */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">合計アクティビティ</span>
            <span className="text-gray-900 font-medium">
              {timeline.saturday.length + timeline.sunday.length}件
            </span>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeSuggestion && (
          <div className="bg-red-600 rounded-lg p-3 shadow-2xl text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeSuggestion.emoji}</span>
              <span className="font-medium">{activeSuggestion.title}</span>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}