'use client'

import { Area } from '@/types/v2';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AREAS_BY_REGION = {
  kanto: {
    name: '関東',
    areas: [
      { code: 'tokyo', name: '東京', region: 'kanto' as const },
      { code: 'yokohama', name: '横浜', region: 'kanto' as const },
      { code: 'kamakura', name: '鎌倉', region: 'kanto' as const },
      { code: 'hakone', name: '箱根', region: 'kanto' as const },
      { code: 'nikko', name: '日光', region: 'kanto' as const },
      { code: 'kawagoe', name: '川越', region: 'kanto' as const },
    ]
  },
  kansai: {
    name: '関西',
    areas: [
      { code: 'kyoto', name: '京都', region: 'kansai' as const },
      { code: 'osaka', name: '大阪', region: 'kansai' as const },
      { code: 'nara', name: '奈良', region: 'kansai' as const },
      { code: 'kobe', name: '神戸', region: 'kansai' as const },
    ]
  },
  tokai: {
    name: '東海',
    areas: [
      { code: 'nagoya', name: '名古屋', region: 'tokai' as const },
      { code: 'atami', name: '熱海', region: 'tokai' as const },
      { code: 'izu', name: '伊豆', region: 'tokai' as const },
      { code: 'hamamatsu', name: '浜松', region: 'tokai' as const },
    ]
  },
  kyushu: {
    name: '九州',
    areas: [
      { code: 'fukuoka', name: '福岡', region: 'kyushu' as const },
      { code: 'nagasaki', name: '長崎', region: 'kyushu' as const },
      { code: 'kumamoto', name: '熊本', region: 'kyushu' as const },
      { code: 'beppu', name: '別府', region: 'kyushu' as const },
    ]
  }
};

interface AreaSelectorProps {
  selectedArea?: Area;
  onAreaChange: (area: Area) => void;
  onNext: () => void;
}

export function AreaSelector({ selectedArea, onAreaChange, onNext }: AreaSelectorProps) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          どちらのエリアをお探しですか？
        </h2>
        <p className="text-gray-600">
          週末旅行の目的地を選んでください
        </p>
      </div>

      <div className="space-y-8 mb-8">
        {Object.entries(AREAS_BY_REGION).map(([regionKey, regionData]) => (
          <div key={regionKey}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              {regionData.name}地方
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {regionData.areas.map((area) => (
                <button
                  key={area.code}
                  onClick={() => onAreaChange(area)}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${selectedArea?.code === area.code
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <div className="text-center">
                    <div className={`
                      font-bold text-lg mb-1
                      ${selectedArea?.code === area.code ? 'text-blue-700' : 'text-gray-800'}
                    `}>
                      {area.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!selectedArea}
          className="px-8 py-3 text-lg"
        >
          次へ進む
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
}