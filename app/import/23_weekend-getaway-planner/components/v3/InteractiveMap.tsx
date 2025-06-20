'use client'

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface InteractiveMapProps {
  places: any[];
}

// 仮の座標データ（実際にはGoogle Maps APIなどで取得）
const MOCK_COORDINATES: Record<string, { lat: number; lng: number }> = {
  '箱根・強羅温泉': { lat: 35.2323, lng: 139.0419 },
  '鎌倉・北鎌倉エリア': { lat: 35.3369, lng: 139.5468 },
  '熱海・駅前商店街': { lat: 35.1035, lng: 139.0776 },
};

export function InteractiveMap({ places }: InteractiveMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスのサイズ設定
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 背景をクリア
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // グリッドを描画
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // プレースマーカーを描画
    places.forEach((place, index) => {
      const coords = MOCK_COORDINATES[place.details.location];
      if (!coords) return;

      // 仮の座標変換（実際には適切な投影変換が必要）
      const x = (coords.lng - 138) * 200 + 100;
      const y = (36 - coords.lat) * 200 + 100;

      // 接続線を描画
      if (index > 0) {
        const prevPlace = places[index - 1];
        const prevCoords = MOCK_COORDINATES[prevPlace.details.location];
        if (prevCoords) {
          const prevX = (prevCoords.lng - 138) * 200 + 100;
          const prevY = (36 - prevCoords.lat) * 200 + 100;

          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // マーカーを描画
      ctx.fillStyle = hoveredPlace === place.id ? '#3b82f6' : '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();

      // 番号を描画
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), x, y);
    });
  }, [places, hoveredPlace]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          🗺️ インタラクティブマップ
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Navigation className="w-4 h-4" />
          <span>予想移動時間: 2時間30分</span>
        </div>
      </div>

      <div className="flex-1 relative rounded-xl overflow-hidden bg-gray-100 border border-gray-300">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* プレースリスト */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
            {places.map((place, index) => (
              <div
                key={place.id}
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 whitespace-nowrap cursor-pointer hover:bg-gray-200 transition-colors"
                onMouseEnter={() => setHoveredPlace(place.id)}
                onMouseLeave={() => setHoveredPlace(null)}
              >
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-sm text-gray-900">{place.emoji} {place.title}</span>
              </div>
            ))}
          </div>
        </div>

        {places.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">
                タイムラインにアイテムを追加すると
                <br />
                ここに地図が表示されます
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}