'use client'

import { useState } from 'react';
import { Purpose } from '@/types/v2';
import { 
  Utensils, 
  Camera, 
  Sparkles, 
  Activity, 
  ShoppingBag, 
  Users,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PURPOSE_OPTIONS: {
  value: Purpose;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    value: 'gourmet',
    label: 'グルメを楽しむ',
    icon: Utensils,
    description: '地元の美味しい料理やレストラン'
  },
  {
    value: 'sightseeing',
    label: '観光地巡り',
    icon: Camera,
    description: '名所や歴史的スポットを訪問'
  },
  {
    value: 'onsen',
    label: '温泉でリラックス',
    icon: Sparkles,
    description: '温泉や宿泊施設でゆったり'
  },
  {
    value: 'activity',
    label: 'アクティビティ',
    icon: Activity,
    description: 'スポーツやレジャー体験'
  },
  {
    value: 'shopping',
    label: 'ショッピング',
    icon: ShoppingBag,
    description: '買い物やお土産探し'
  },
  {
    value: 'family',
    label: '家族で楽しむ',
    icon: Users,
    description: '子供も楽しめるスポット'
  }
];

interface PurposeSelectorProps {
  selectedPurposes: Purpose[];
  onPurposeChange: (purposes: Purpose[]) => void;
  onNext: () => void;
}

export function PurposeSelector({ 
  selectedPurposes, 
  onPurposeChange,
  onNext 
}: PurposeSelectorProps) {
  const togglePurpose = (purpose: Purpose) => {
    if (selectedPurposes.includes(purpose)) {
      onPurposeChange(selectedPurposes.filter(p => p !== purpose));
    } else {
      onPurposeChange([...selectedPurposes, purpose]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          何をしたいですか？
        </h2>
        <p className="text-gray-600">
          複数選択できます。あなたの理想の週末をお聞かせください。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {PURPOSE_OPTIONS.map(({ value, label, icon: Icon, description }) => {
          const isSelected = selectedPurposes.includes(value);
          
          return (
            <button
              key={value}
              onClick={() => togglePurpose(value)}
              className={`
                relative p-6 rounded-xl border-2 transition-all
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              {/* 選択チェックマーク */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-3
                  ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}
                `}>
                  <Icon className={`
                    w-8 h-8
                    ${isSelected ? 'text-blue-600' : 'text-gray-600'}
                  `} />
                </div>
                <h3 className={`
                  font-bold mb-1
                  ${isSelected ? 'text-blue-900' : 'text-gray-900'}
                `}>
                  {label}
                </h3>
                <p className={`
                  text-sm
                  ${isSelected ? 'text-blue-700' : 'text-gray-600'}
                `}>
                  {description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={selectedPurposes.length === 0}
          className="px-8 py-3 text-lg"
        >
          次へ進む
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  );
}