'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Area } from '@/types/v2';

const POPULAR_AREAS: Area[] = [
  { code: 'tokyo', name: '東京', region: 'kanto' },
  { code: 'atami', name: '熱海', region: 'tokai' },
  { code: 'kyoto', name: '京都', region: 'kansai' },
  { code: 'hakone', name: '箱根', region: 'kanto' },
  { code: 'kamakura', name: '鎌倉', region: 'kanto' },
];

interface HeroSectionProps {
  onQuickSearch: (criteria: any) => void;
  onDetailedSearch: () => void;
}

export function HeroSection({ onQuickSearch, onDetailedSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const handleQuickSearch = () => {
    if (selectedArea) {
      onQuickSearch({
        area: selectedArea,
        purposes: ['gourmet'],
        budget: 'moderate'
      });
    }
  };

  const handleAreaClick = (area: Area) => {
    setSelectedArea(area);
    setSearchQuery(area.name);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920"
          alt="日本の美しい風景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        {/* ロゴとタイトル */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Weekend Planner
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            あなたの週末を、特別な体験に。
          </p>
        </div>

        {/* 検索ボックス */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            どこへ行きたいですか？
          </h2>

          {/* 検索フォーム */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="エリア・キーワードを入力"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
                className="pl-10 h-12 text-lg border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <Button
              onClick={handleQuickSearch}
              className="h-12 px-8 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              週末プランを探す
            </Button>
          </div>

          {/* 人気エリア */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">人気のエリア</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {POPULAR_AREAS.map((area) => (
                <button
                  key={area.code}
                  onClick={() => handleAreaClick(area)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedArea?.code === area.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <MapPin className="inline-block w-3 h-3 mr-1" />
                  {area.name}
                </button>
              ))}
            </div>
          </div>

          {/* 詳細検索リンク */}
          <div className="mt-6 text-center">
            <button
              onClick={onDetailedSearch}
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
            >
              より詳しい条件で検索する →
            </button>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="mt-12 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}