'use client'

import { useDroppable } from '@dnd-kit/core';
import { Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeSlotProps {
  id: string;
  time: string;
  item?: any;
  onRemove: () => void;
}

export function TimeSlot({ id, time, item, onRemove }: TimeSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        relative min-h-[60px] rounded-lg border-2 border-dashed
        transition-all duration-200
        ${isOver ? 'border-yellow-400 bg-yellow-400/10' : 'border-white/20'}
        ${item ? 'border-solid bg-white/10' : ''}
      `}
    >
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/60">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-medium">{time}</span>
      </div>

      <AnimatePresence>
        {item && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="ml-20 p-3 pr-10"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <p className="font-medium text-white">{item.title}</p>
                <p className="text-xs text-white/60">
                  📍 {item.details.location} • {item.details.duration}
                </p>
              </div>
            </div>
            
            <button
              onClick={onRemove}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!item && isOver && (
        <div className="ml-20 p-3 animate-pulse">
          <div className="h-6 bg-yellow-400/20 rounded" />
        </div>
      )}
    </div>
  );
}