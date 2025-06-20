'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CostSymbolDisplay } from './CostSymbolDisplay';
import { OutingIdea } from '@/types';
import { MapPin, Activity, ImageOff } from 'lucide-react';

interface IdeaCardProps {
  idea: OutingIdea;
  onClick: () => void;
}

export function IdeaCard({ idea, onClick }: IdeaCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {!imageError ? (
            <Image
              src={idea.imageUrl}
              alt={idea.planName}
              fill
              className="object-cover rounded-t-lg"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
              <ImageOff className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow">
            <span className="text-sm font-medium">{idea.category}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-2">{idea.planName}</h3>
        <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{idea.suggestedLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <CostSymbolDisplay symbol={idea.estimatedCostSymbol} />
            {idea.priceRange && (
              <span className="text-xs text-gray-600">({idea.priceRange})</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Activity className="w-4 h-4 mr-1" />
          <span>{idea.activities.length}つのアクティビティ</span>
        </div>
      </CardContent>
    </Card>
  );
}