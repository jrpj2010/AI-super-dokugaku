'use client'

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface DemoScheduleFillerProps {
  onFillSchedule: (scheduleData: any) => void;
}

const DEMO_SCHEDULE = {
  saturday: [
    {
      id: 'demo-1',
      time: '09:00',
      emoji: '🚃',
      title: '東京駅から箱根へ出発',
      description: 'ロマンスカーで快適な旅',
      details: {
        location: '東京駅',
        duration: '1.5時間',
        price: '¥3,000',
        category: 'transport'
      }
    },
    {
      id: 'demo-2',
      time: '11:00',
      emoji: '🍜',
      title: '田むら銀かつ亭で箱根名物を堪能',
      description: 'ホットペッパー予約済み',
      details: {
        location: '箱根・強羅温泉',
        duration: '1.5時間',
        price: '¥2,500',
        category: 'gourmet',
        hotpepperData: {
          id: 'J001234567',
          name: '田むら銀かつ亭',
          urls: { pc: 'https://www.hotpepper.jp/strJ001234567/' }
        }
      }
    },
    {
      id: 'demo-3',
      time: '13:00',
      emoji: '🏛️',
      title: '彫刻の森美術館で芸術鑑賞',
      description: '屋外展示で自然と芸術の融合',
      details: {
        location: '箱根・彫刻の森',
        duration: '2時間',
        price: '¥1,600',
        category: 'sightseeing'
      }
    },
    {
      id: 'demo-4',
      time: '15:00',
      emoji: '♨️',
      title: '強羅温泉で日帰り入浴',
      description: '源泉かけ流しの名湯',
      details: {
        location: '箱根・強羅温泉',
        duration: '2時間',
        price: '¥2,000',
        category: 'relax'
      }
    },
    {
      id: 'demo-5',
      time: '18:00',
      emoji: '🍣',
      title: '鮨処 匠で新鮮な海の幸',
      description: 'ホットペッパー予約済み',
      details: {
        location: '箱根・宮ノ下',
        duration: '2時間',
        price: '¥6,000',
        category: 'gourmet',
        hotpepperData: {
          id: 'J001234568',
          name: '鮨処 匠',
          urls: { pc: 'https://www.hotpepper.jp/strJ001234568/' }
        }
      }
    },
    {
      id: 'demo-6',
      time: '20:00',
      emoji: '🌃',
      title: '箱根の夜景を楽しむ',
      description: '大涌谷からの絶景',
      details: {
        location: '箱根・大涌谷',
        duration: '1時間',
        price: '無料',
        category: 'sightseeing'
      }
    }
  ],
  sunday: [
    {
      id: 'demo-7',
      time: '09:00',
      emoji: '🍳',
      title: 'ホテルで朝食ビュッフェ',
      description: '地元食材を使った料理',
      details: {
        location: '箱根・宿泊先',
        duration: '1時間',
        price: '¥2,000',
        category: 'gourmet'
      }
    },
    {
      id: 'demo-8',
      time: '10:00',
      emoji: '🚠',
      title: '箱根ロープウェイで空中散歩',
      description: '富士山の絶景を望む',
      details: {
        location: '箱根・大涌谷',
        duration: '1.5時間',
        price: '¥1,500',
        category: 'sightseeing'
      }
    },
    {
      id: 'demo-9',
      time: '12:00',
      emoji: '🍛',
      title: '富士屋ホテルでクラシックカレー',
      description: '伝統の味を堪能',
      details: {
        location: '箱根・宮ノ下',
        duration: '1.5時間',
        price: '¥3,500',
        category: 'gourmet',
        hotpepperData: {
          id: 'J001234569',
          name: '富士屋ホテル メインダイニング',
          urls: { pc: 'https://www.hotpepper.jp/strJ001234569/' }
        }
      }
    },
    {
      id: 'demo-10',
      time: '14:00',
      emoji: '⛩️',
      title: '箱根神社で参拝',
      description: 'パワースポットで運気アップ',
      details: {
        location: '箱根・元箱根',
        duration: '1.5時間',
        price: '無料',
        category: 'sightseeing'
      }
    },
    {
      id: 'demo-11',
      time: '16:00',
      emoji: '☕',
      title: 'カフェでティータイム',
      description: 'レイクビューの絶景カフェ',
      details: {
        location: '箱根・芦ノ湖畔',
        duration: '1時間',
        price: '¥1,500',
        category: 'gourmet'
      }
    },
    {
      id: 'demo-12',
      time: '18:00',
      emoji: '🚃',
      title: '箱根から東京へ帰路',
      description: '思い出とともに帰宅',
      details: {
        location: '箱根湯本駅',
        duration: '1.5時間',
        price: '¥3,000',
        category: 'transport'
      }
    }
  ]
};

export function DemoScheduleFiller({ onFillSchedule }: DemoScheduleFillerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFillSchedule = () => {
    setIsAnimating(true);
    
    // アニメーション付きで順番に追加
    let delay = 0;
    const allItems = [
      ...DEMO_SCHEDULE.saturday.map(item => ({ ...item, day: 'saturday' })),
      ...DEMO_SCHEDULE.sunday.map(item => ({ ...item, day: 'sunday' }))
    ];

    allItems.forEach((item, index) => {
      setTimeout(() => {
        onFillSchedule({
          item: item,
          day: item.day,
          time: item.time
        });
        
        if (index === allItems.length - 1) {
          setTimeout(() => setIsAnimating(false), 500);
        }
      }, delay);
      delay += 200;
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleFillSchedule}
      disabled={isAnimating}
      className={`
        relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold
        transition-all duration-300 overflow-hidden
        ${isAnimating 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-red-600 to-blue-600 text-white hover:shadow-lg'
        }
      `}
    >
      <Wand2 className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
      <span>{isAnimating ? 'スケジュール作成中...' : '完璧な週末プランを自動生成'}</span>
      
      {isAnimating && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: 'linear'
          }}
        />
      )}
    </motion.button>
  );
}