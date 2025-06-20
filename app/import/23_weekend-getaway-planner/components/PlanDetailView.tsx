'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CostSymbolDisplay } from './CostSymbolDisplay';
import { OutingIdea } from '@/types';
import { ArrowLeft, MapPin, Tag, Activity, ImageOff, ExternalLink } from 'lucide-react';

interface PlanDetailViewProps {
  plan: OutingIdea;
  onBack: () => void;
}

export function PlanDetailView({ plan, onBack }: PlanDetailViewProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        onClick={onBack} 
        variant="outline" 
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        戻る
      </Button>
      
      <Card>
        <CardHeader className="p-0">
          <div className="relative h-64 w-full">
            {!imageError ? (
              <Image
                src={plan.imageUrl}
                alt={plan.planName}
                fill
                className="object-cover rounded-t-lg"
                onError={() => setImageError(true)}
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200 rounded-t-lg">
                <ImageOff className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <CardTitle className="text-2xl font-bold mb-2">{plan.planName}</CardTitle>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {plan.category}
            </span>
          </div>
          
          <p className="text-gray-700 mb-6">{plan.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                アクティビティ
              </h3>
              <ul className="list-disc list-inside space-y-1">
                {plan.activities.map((activity, index) => (
                  <li key={index} className="text-gray-700">{activity}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  場所
                </h3>
                <p className="text-gray-700">{plan.suggestedLocation}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">費用目安</h3>
                <CostSymbolDisplay symbol={plan.estimatedCostSymbol} />
                {plan.priceRange && (
                  <p className="text-gray-700 mt-1">{plan.priceRange}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  キーワード
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plan.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {plan.url && (
            <div className="mt-6 pt-6 border-t">
              <a
                href={plan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                詳細を見る
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}