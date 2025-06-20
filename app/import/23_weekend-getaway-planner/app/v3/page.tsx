'use client'

import { useState } from 'react';
import { ChatInterfaceFixed as ChatInterface } from '@/components/v3/ChatInterfaceFixed';
import { TimelineDisplay } from '@/components/v3/TimelineDisplay';
import { GoogleMapView } from '@/components/v3/GoogleMapView';
import { DemoScheduleFiller } from '@/components/v3/DemoScheduleFiller';
import { PlanExporter } from '@/components/v3/PlanExporter';
// import { AnimatedBackground } from '@/components/v3/AnimatedBackground';
import { Sparkles } from 'lucide-react';

export default function WeekendPlannerV3() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<any>({
    saturday: [],
    sunday: []
  });
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<'saturday' | 'sunday'>('saturday');

  const handleNewSuggestions = (newSuggestions: any[]) => {
    // タイムラインに自動追加される場合
    const itemsWithTime = newSuggestions.filter(s => s.time && s.day);
    if (itemsWithTime.length > 0) {
      itemsWithTime.forEach(item => {
        handleAddToTimeline(item, item.day, item.time);
      });
    } else {
      // 通常の提案
      setSuggestions(newSuggestions);
    }
  };
  
  const handleDemoFill = (data: { item: any, day: string, time: string }) => {
    handleAddToTimeline(data.item, data.day as 'saturday' | 'sunday', data.time);
  };

  const handleAddToTimeline = (item: any, day: 'saturday' | 'sunday', time: string) => {
    setTimeline(prev => ({
      ...prev,
      [day]: [...prev[day], { ...item, time }].sort((a, b) => 
        a.time.localeCompare(b.time)
      )
    }));
    setSelectedPlaces(prev => [...prev, item]);
  };

  const handleRemoveFromTimeline = (day: 'saturday' | 'sunday', index: number) => {
    const removed = timeline[day][index];
    setTimeline(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
    setSelectedPlaces(prev => prev.filter(p => p.id !== removed.id));
  };
  
  // 現在の曜日のタイムラインを取得
  const getCurrentDayPlaces = () => {
    return timeline[selectedDay];
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      
      {/* ヘッダー */}
      <header className="relative z-10 text-center py-8 px-4 border-b border-gray-200">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
          週末プランナー AI
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-4">
          話すだけで、ホットペッパーの実店舗から最適なプランを提案
        </p>
        <div className="flex justify-center gap-4">
          <DemoScheduleFiller onFillSchedule={handleDemoFill} />
          <PlanExporter timeline={timeline} />
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="relative z-10 container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左側: チャットインターフェース */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
            <ChatInterface 
              onSuggestionsReceived={handleNewSuggestions}
              currentTimeline={timeline}
            />
          </div>

          {/* 右側: タイムライン表示 */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
            <TimelineDisplay
              timeline={timeline}
              onRemoveItem={handleRemoveFromTimeline}
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
            />
          </div>
        </div>

        {/* 下部: Googleマップ */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm h-[500px]">
          <GoogleMapView places={getCurrentDayPlaces()} />
        </div>
      </div>
    </div>
  );
}