'use client'

import { useState } from 'react';
import Image from 'next/image';
import { TouristSpot } from '@/types/v2';
import { 
  MapPin, 
  Clock, 
  Calendar,
  Ticket,
  Star,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SpotCardProps {
  spot: TouristSpot;
  onSelect?: (spot: TouristSpot) => void;
}

const CATEGORY_ICONS = {
  temple: '🏛️',
  shrine: '⛩️',
  museum: '🖼️',
  park: '🌳',
  landmark: '🗼',
  nature: '🏔️',
  theme_park: '🎢',
  shopping: '🛍️'
};

const CATEGORY_LABELS = {
  temple: '寺院',
  shrine: '神社',
  museum: '博物館',
  park: '公園',
  landmark: 'ランドマーク',
  nature: '自然',
  theme_park: 'テーマパーク',
  shopping: 'ショッピング'
};

export function SpotCard({ spot, onSelect }: SpotCardProps) {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (spot.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % spot.images.length);
    }
  };

  const prevImage = () => {
    if (spot.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + spot.images.length) % spot.images.length);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* 画像カルーセル */}
      <div className="relative h-48 bg-gray-200">
        {!imageError && spot.images[currentImageIndex] ? (
          <>
            <Image
              src={spot.images[currentImageIndex]}
              alt={spot.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            {/* 画像ナビゲーション */}
            {spot.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {/* インジケーター */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {spot.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">{CATEGORY_ICONS[spot.category]}</span>
          </div>
        )}

        {/* カテゴリバッジ */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-800">
            {CATEGORY_ICONS[spot.category]} {CATEGORY_LABELS[spot.category]}
          </Badge>
        </div>

        {/* 人気度 */}
        {spot.popularity && (
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{spot.popularity.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        {/* 名前と説明 */}
        <h3 className="font-bold text-lg mb-1">{spot.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{spot.description}</p>

        {/* 詳細情報 */}
        <div className="space-y-2 text-sm">
          {/* アクセス */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600 line-clamp-1">{spot.access}</span>
          </div>

          {/* 営業時間 */}
          {spot.openHours && (
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
              <span className="text-gray-600">{spot.openHours}</span>
            </div>
          )}

          {/* 定休日 */}
          {spot.closedDays && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
              <span className="text-gray-600">定休日: {spot.closedDays}</span>
            </div>
          )}

          {/* 入場料 */}
          {spot.admission && (
            <div className="flex items-start gap-2">
              <Ticket className="w-4 h-4 text-gray-400 mt-0.5" />
              <span className="text-gray-600">
                大人 ¥{spot.admission.adult.toLocaleString()}
                {spot.admission.child && ` / 子供 ¥${spot.admission.child.toLocaleString()}`}
              </span>
            </div>
          )}

          {/* 推奨滞在時間 */}
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">
              推奨滞在時間: {Math.floor(spot.duration / 60)}時間
              {spot.duration % 60 > 0 && `${spot.duration % 60}分`}
            </span>
          </div>
        </div>

        {/* ヒント */}
        {spot.tips && spot.tips.length > 0 && (
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-xs text-blue-800">{spot.tips[0]}</p>
            </div>
          </div>
        )}

        {/* アクションボタン */}
        {onSelect && (
          <Button
            onClick={() => onSelect(spot)}
            className="w-full mt-4"
          >
            プランに追加
          </Button>
        )}
      </div>
    </div>
  );
}