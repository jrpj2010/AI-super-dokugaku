'use client'

import { BudgetLevel, SearchCriteria } from '@/types/v2';
import { 
  DollarSign, 
  Users, 
  Car, 
  Train,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DetailSelectorProps {
  criteria: Partial<SearchCriteria>;
  onChange: (criteria: Partial<SearchCriteria>) => void;
  onComplete: () => void;
}

export function DetailSelector({ criteria, onChange, onComplete }: DetailSelectorProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          詳細を教えてください
        </h2>
        <p className="text-gray-600">
          より最適なプランをご提案するため、詳細情報をお聞かせください
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* 予算 */}
        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3">
            <DollarSign className="w-5 h-5 mr-2" />
            予算
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: 'budget', label: '¥', description: '〜5,000円' },
              { value: 'moderate', label: '¥¥', description: '5,000〜15,000円' },
              { value: 'premium', label: '¥¥¥', description: '15,000〜30,000円' },
              { value: 'luxury', label: '指定なし', description: '予算上限なし' },
            ].map(({ value, label, description }) => (
              <button
                key={value}
                onClick={() => onChange({ ...criteria, budget: value as BudgetLevel })}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${criteria.budget === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="font-bold text-lg mb-1">{label}</div>
                <div className="text-xs text-gray-600">{description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 人数 */}
        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3">
            <Users className="w-5 h-5 mr-2" />
            人数
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: 1, label: '1人' },
              { value: 2, label: '2人' },
              { value: 4, label: '家族（3-4人）' },
              { value: 8, label: '団体（5人以上）' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onChange({ ...criteria, peopleCount: value })}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${criteria.peopleCount === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="font-bold">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 移動手段 */}
        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3">
            <Car className="w-5 h-5 mr-2" />
            移動手段
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'car', label: '車', icon: Car },
              { value: 'train', label: '電車', icon: Train },
              { value: 'both', label: 'どちらでも', icon: null },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onChange({ ...criteria, transportation: value as 'car' | 'train' | 'both' })}
                className={`
                  p-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2
                  ${criteria.transportation === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="font-bold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 期間 */}
        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3">
            <Calendar className="w-5 h-5 mr-2" />
            期間
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '1day', label: '日帰り' },
              { value: '2days', label: '1泊2日' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onChange({ ...criteria, duration: value as '1day' | '2days' })}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${criteria.duration === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="font-bold">{label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onComplete}
          className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
        >
          プランを作成する
          <span className="ml-2">✨</span>
        </Button>
      </div>
    </div>
  );
}