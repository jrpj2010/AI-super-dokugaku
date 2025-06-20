'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Restaurant } from '@/types/v2';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users,
  Utensils,
  Star,
  ExternalLink,
  Wine,
  Coffee,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect?: (restaurant: Restaurant) => void;
  showDetails?: boolean;
}

export function RestaurantCard({ restaurant, onSelect, showDetails = false }: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* 画像 */}
      <div className="relative h-48 bg-gray-200">
        {!imageError ? (
          <Image
            src={restaurant.photo.pc.l}
            alt={restaurant.name}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Utensils className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* ジャンルバッジ */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-gray-800">
            {restaurant.genre.name}
          </Badge>
        </div>

        {/* 評価 */}
        {restaurant.rating && (
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold">{restaurant.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="p-4">
        {/* 店名とキャッチ */}
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{restaurant.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{restaurant.catch}</p>

        {/* 詳細情報 */}
        <div className="space-y-2 text-sm">
          {/* 場所 */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600 line-clamp-1">{restaurant.access}</span>
          </div>

          {/* 営業時間 */}
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">{restaurant.open}</span>
          </div>

          {/* 予算 */}
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-gray-600">
              {restaurant.budget.average || restaurant.budget.name}
            </span>
          </div>

          {/* 収容人数 */}
          {restaurant.capacity && (
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-gray-400 mt-0.5" />
              <span className="text-gray-600">最大{restaurant.capacity}名</span>
            </div>
          )}
        </div>

        {/* 特徴タグ */}
        <div className="flex flex-wrap gap-1 mt-3">
          {restaurant.course === 'あり' && (
            <Badge variant="secondary" className="text-xs">
              <Utensils className="w-3 h-3 mr-1" />
              コース
            </Badge>
          )}
          {restaurant.freeDrink === 'あり' && (
            <Badge variant="secondary" className="text-xs">
              <Wine className="w-3 h-3 mr-1" />
              飲み放題
            </Badge>
          )}
          {restaurant.freeFood === 'あり' && (
            <Badge variant="secondary" className="text-xs">
              <Coffee className="w-3 h-3 mr-1" />
              食べ放題
            </Badge>
          )}
          {restaurant.privateRoom === 'あり' && (
            <Badge variant="secondary" className="text-xs">
              個室
            </Badge>
          )}
          {restaurant.parking === 'あり' && (
            <Badge variant="secondary" className="text-xs">
              <Car className="w-3 h-3 mr-1" />
              駐車場
            </Badge>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4">
          {onSelect && (
            <Button
              onClick={() => onSelect(restaurant)}
              className="flex-1"
              variant="default"
            >
              プランに追加
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            className="flex-1"
          >
            <a
              href={restaurant.urls.pc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              詳細
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}