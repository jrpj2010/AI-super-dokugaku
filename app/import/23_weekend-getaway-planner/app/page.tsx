'use client'

import { useState } from 'react';
import { SearchCriteria, Restaurant, TouristSpot, WeekendPlan } from '@/types/v2';
import { HeroSection } from '@/components/landing/HeroSection';
import { StepWizard } from '@/components/search/StepWizard';
import { RestaurantCard } from '@/components/results/RestaurantCard';
import { SpotCard } from '@/components/results/SpotCard';
import { fetchWeekendData } from '@/lib/dataFetcher';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function HomePage() {
  const [mode, setMode] = useState<'landing' | 'search' | 'results'>('landing');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickSearch = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    setMode('results');
    performSearch(criteria);
  };

  const handleDetailedSearch = () => {
    setMode('search');
  };

  const handleSearchComplete = (criteria: SearchCriteria) => {
    setSearchCriteria(criteria);
    setMode('results');
    performSearch(criteria);
  };

  const performSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchWeekendData(criteria);
      if (result.error) {
        setError(result.error);
      } else {
        setRestaurants(result.restaurants);
        setTouristSpots(result.touristSpots);
      }
    } catch (err) {
      setError('データの取得中にエラーが発生しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setMode('landing');
    setSearchCriteria(null);
    setRestaurants([]);
    setTouristSpots([]);
    setError(null);
  };

  const handleBackToSearch = () => {
    setMode('search');
  };

  // ランディングページ
  if (mode === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <HeroSection 
          onQuickSearch={handleQuickSearch}
          onDetailedSearch={handleDetailedSearch}
        />
      </div>
    );
  }

  // 詳細検索
  if (mode === 'search') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBackToHome}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ホームに戻る
          </button>
          <StepWizard onComplete={handleSearchComplete} onCancel={handleBackToHome} />
        </div>
      </div>
    );
  }

  // 検索結果
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <button
            onClick={handleBackToHome}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ホームに戻る
          </button>
          
          {searchCriteria && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-2">
                {searchCriteria.area.name}の週末プラン
              </h1>
              <p className="text-gray-600">
                {searchCriteria.purposes.join('・')} | 
                {searchCriteria.peopleCount && ` ${searchCriteria.peopleCount}名`} | 
                {searchCriteria.budget && ` 予算: ${searchCriteria.budget}`}
              </p>
              <button
                onClick={handleBackToSearch}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                検索条件を変更
              </button>
            </div>
          )}
        </div>

        {/* ローディング */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">プランを検索中...</p>
            </div>
          </div>
        )}

        {/* エラー */}
        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 結果表示 */}
        {!isLoading && !error && (restaurants.length > 0 || touristSpots.length > 0) && (
          <div className="space-y-12">
            {/* レストラン */}
            {restaurants.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">🍽️</span>
                  おすすめレストラン
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {restaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* 観光スポット */}
            {touristSpots.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">🏛️</span>
                  観光スポット
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {touristSpots.map((spot) => (
                    <SpotCard
                      key={spot.id}
                      spot={spot}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* 結果なし */}
        {!isLoading && !error && restaurants.length === 0 && touristSpots.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">
              条件に合うプランが見つかりませんでした
            </p>
            <button
              onClick={handleBackToSearch}
              className="text-blue-600 hover:text-blue-800"
            >
              検索条件を変更する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
