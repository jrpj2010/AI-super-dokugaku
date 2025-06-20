'use client'

import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface GoogleMapViewProps {
  places: any[];
}

// Google Maps APIのタイプ定義
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

// 座標データベース（実際の座標）
const COORDINATES_DB: Record<string, { lat: number; lng: number }> = {
  // 箱根エリア
  '箱根・強羅温泉': { lat: 35.2323, lng: 139.0419 },
  '箱根・宮ノ下': { lat: 35.2303, lng: 139.0628 },
  '箱根・元箱根': { lat: 35.2045, lng: 139.0245 },
  '箱根・大涌谷': { lat: 35.2444, lng: 139.0194 },
  '箱根・芦ノ湖畔': { lat: 35.2000, lng: 139.0000 },
  '箱根湯本駅': { lat: 35.2329, lng: 139.1069 },
  '箱根・彫刻の森': { lat: 35.2448, lng: 139.0510 },
  '箱根・宿泊先': { lat: 35.2400, lng: 139.0500 },
  
  // 熱海エリア
  '熱海・駅前商店街': { lat: 35.1035, lng: 139.0776 },
  '熱海駅': { lat: 35.1035, lng: 139.0776 },
  
  // 鎌倉エリア
  '鎌倉・北鎌倉エリア': { lat: 35.3369, lng: 139.5468 },
  
  // 東京エリア
  '東京駅': { lat: 35.6812, lng: 139.7671 },
  
  // デフォルト（見つからない場合は箱根中心）
  'default': { lat: 35.2323, lng: 139.0419 }
};

export function GoogleMapView({ places }: GoogleMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const directionsServiceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);

  // 座標を取得（見つからない場合はエリア名で検索）
  const getCoordinates = (location: string) => {
    // 完全一致を試す
    if (COORDINATES_DB[location]) {
      return COORDINATES_DB[location];
    }
    
    // 部分一致を試す
    for (const [key, coords] of Object.entries(COORDINATES_DB)) {
      if (location.includes(key) || key.includes(location)) {
        return coords;
      }
    }
    
    // デフォルト座標を返す
    return COORDINATES_DB.default;
  };

  // Google Maps APIを読み込む
  useEffect(() => {
    // すでに読み込まれている場合
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // APIキーがない場合はデモモードで動作
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey === 'your-google-maps-api-key-here') {
      console.warn('Google Maps APIキーが設定されていません。デモモードで動作します。');
      setIsLoading(false);
      return;
    }
    
    // スクリプトタグを作成
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places`;
    script.async = true;
    script.defer = true;
    
    // コールバック関数を設定
    window.initMap = () => {
      initializeMap();
    };

    // APIキーがない場合の処理
    script.onerror = () => {
      console.error('Google Maps APIの読み込みに失敗しました');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // クリーンアップ
      const scriptTag = document.querySelector('script[src*="maps.googleapis.com"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, []);

  // マップの初期化
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.2323, lng: 139.0419 }, // 箱根を中心に
      zoom: 11,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    });

    // DirectionsServiceとRendererを初期化
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#ef4444',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    });

    setMap(mapInstance);
    setIsLoading(false);
  };

  // プレースが変更されたときにマーカーとルートを更新
  useEffect(() => {
    if (!map || !window.google || places.length === 0) return;

    // 既存のマーカーをクリア
    markers.forEach(marker => marker.setMap(null));

    // 新しいマーカーを作成
    const newMarkers: any[] = [];
    const bounds = new window.google.maps.LatLngBounds();

    places.forEach((place, index) => {
      const coords = getCoordinates(place.details.location);
      const position = new window.google.maps.LatLng(coords.lat, coords.lng);
      
      // カスタムマーカーを作成
      const marker = new window.google.maps.Marker({
        position,
        map,
        title: place.title,
        label: {
          text: (index + 1).toString(),
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold'
        },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 20,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2
        }
      });

      // 情報ウィンドウを追加
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold;">
              ${place.emoji} ${place.title}
            </h3>
            <p style="margin: 0; color: #666; font-size: 14px;">
              📍 ${place.details.location}<br>
              ⏱️ ${place.details.duration}<br>
              💰 ${place.details.price}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
      bounds.extend(position);
    });

    setMarkers(newMarkers);

    // ルートを描画（2箇所以上ある場合）
    if (places.length >= 2 && directionsServiceRef.current && directionsRendererRef.current) {
      const waypoints = places.slice(1, -1).map(place => ({
        location: getCoordinates(place.details.location),
        stopover: true
      }));

      const request = {
        origin: getCoordinates(places[0].details.location),
        destination: getCoordinates(places[places.length - 1].details.location),
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false
      };

      directionsServiceRef.current.route(request, (result: any, status: any) => {
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(result);
        } else {
          console.error('ルート検索エラー:', status);
        }
      });
    } else {
      // ルートをクリア
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setDirections({ routes: [] });
      }
    }

    // 地図の表示範囲を調整
    if (places.length > 0) {
      map.fitBounds(bounds);
      
      // ズームレベルが大きすぎる場合は調整
      const listener = map.addListener('idle', () => {
        if (map.getZoom() > 16) {
          map.setZoom(16);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [map, places]);

  // APIキーがない場合のフォールバック表示
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === 'your-google-maps-api-key-here') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            🗺️ ルートマップ
          </h2>
          {places.length > 0 && (
            <div className="text-sm text-gray-600">
              {places.length}箇所のスポット
            </div>
          )}
        </div>

        <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-300 bg-gray-50">
          {/* デモ用の静的地図表示 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* 背景として地図画像を表示 */}
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=35.2323,139.0419&zoom=11&size=600x400&maptype=roadmap&markers=color:red%7C35.2323,139.0419&key=" 
                alt="箱根エリアの地図"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              
              {/* プレース情報をオーバーレイ表示 */}
              <div className="relative z-10 p-6">
                <div className="bg-white/95 rounded-lg p-4 max-w-md mx-auto">
                  <h3 className="font-bold text-lg mb-3 text-gray-900">📍 訪問スポット一覧</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {places.map((place, index) => {
                      const coords = getCoordinates(place.details.location);
                      return (
                        <div key={place.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {place.emoji} {place.title}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              <div>📍 {place.details.location}</div>
                              <div>🕐 {place.time} ({place.details.duration})</div>
                              <div className="text-xs text-gray-500 mt-1">
                                座標: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {places.length >= 2 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>推定移動距離:</strong> 約{((places.length - 1) * 8).toFixed(0)}km<br/>
                        <strong>推定移動時間:</strong> 約{((places.length - 1) * 25).toFixed(0)}分
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {places.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">
                  タイムラインにアイテムを追加すると<br />
                  ここに地図が表示されます
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          🗺️ Google マップ
        </h2>
        {places.length > 0 && (
          <div className="text-sm text-gray-600">
            {places.length}箇所のスポット
          </div>
        )}
      </div>

      <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-300">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">地図を読み込み中...</p>
            </div>
          </div>
        )}
        
        <div ref={mapRef} className="w-full h-full" />

        {/* プレースリスト */}
        {places.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-h-32 overflow-y-auto">
            <div className="space-y-2">
              {places.map((place, index) => (
                <div
                  key={place.id}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {place.emoji} {place.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {place.time} • {place.details.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {places.length === 0 && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
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