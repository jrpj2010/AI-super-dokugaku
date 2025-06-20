// ホットペッパーグルメAPI統合
import { cache, generateCacheKey } from './cache';

export interface HotpepperRestaurant {
  id: string;
  name: string;
  address: string;
  genre: {
    name: string;
    catch: string;
  };
  budget: {
    name: string;
    average: string;
  };
  photo: {
    pc: {
      l: string;
      m: string;
      s: string;
    };
  };
  urls: {
    pc: string;
  };
  catch: string;
  open: string;
  close: string;
  access: string;
  lat: number;
  lng: number;
  budget_memo?: string;
  party_capacity?: number;
  free_drink?: string;
  free_food?: string;
  course?: string;
  ktai_coupon?: number;
}

interface HotpepperResponse {
  results: {
    results_available: number;
    results_returned: number;
    results_start: number;
    shop: HotpepperRestaurant[];
  };
}

// モックデータ
const mockRestaurants: HotpepperRestaurant[] = [
  {
    id: 'mock001',
    name: '海鮮料理 潮風',
    address: '静岡県熱海市渚町10-1',
    genre: {
      name: '和食',
      catch: '新鮮な海の幸を堪能'
    },
    budget: {
      name: '3001～4000円',
      average: '3500円'
    },
    photo: {
      pc: {
        l: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
        m: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351',
        s: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'
      }
    },
    urls: {
      pc: 'https://example.com/restaurant1'
    },
    catch: '熱海の新鮮な海鮮を使った料理が自慢',
    open: '11:00～22:00',
    close: '無休',
    access: 'JR熱海駅から徒歩15分',
    lat: 35.0961,
    lng: 139.0776,
    party_capacity: 50,
    free_drink: 'あり',
    course: 'あり',
    ktai_coupon: 1
  },
  {
    id: 'mock002',
    name: '温泉宿 湯の花',
    address: '静岡県熱海市春日町12-4',
    genre: {
      name: '旅館',
      catch: '源泉かけ流しの温泉と会席料理'
    },
    budget: {
      name: '5001～7000円',
      average: '6000円'
    },
    photo: {
      pc: {
        l: 'https://images.unsplash.com/photo-1540465900092-090728841a96',
        m: 'https://images.unsplash.com/photo-1540465900092-090728841a96',
        s: 'https://images.unsplash.com/photo-1540465900092-090728841a96'
      }
    },
    urls: {
      pc: 'https://example.com/restaurant2'
    },
    catch: '絶景露天風呂と季節の会席料理',
    open: '朝食7:00～9:00 夕食18:00～20:00',
    close: '無休',
    access: 'JR熱海駅からバスで10分',
    lat: 35.1025,
    lng: 139.0812,
    party_capacity: 100,
    course: 'あり',
    ktai_coupon: 0
  },
  {
    id: 'mock003',
    name: '鉄板焼き 炎',
    address: '東京都港区六本木3-15-20',
    genre: {
      name: '鉄板焼き',
      catch: 'A5和牛と季節の野菜'
    },
    budget: {
      name: '8000円～',
      average: '10000円'
    },
    photo: {
      pc: {
        l: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
        m: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
        s: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5'
      }
    },
    urls: {
      pc: 'https://example.com/restaurant3'
    },
    catch: '目の前で焼き上げる極上の和牛',
    open: '17:00～23:00',
    close: '日曜定休',
    access: '東京メトロ六本木駅から徒歩5分',
    lat: 35.6651,
    lng: 139.7314,
    party_capacity: 30,
    free_drink: 'あり',
    course: 'あり',
    ktai_coupon: 1
  },
  {
    id: 'mock004',
    name: '京懐石 花見小路',
    address: '京都府京都市東山区祇園町南側',
    genre: {
      name: '懐石料理',
      catch: '伝統の京懐石'
    },
    budget: {
      name: '10001円～15000円',
      average: '12000円'
    },
    photo: {
      pc: {
        l: 'https://images.unsplash.com/photo-1540465704512-6b5ce98e4c67',
        m: 'https://images.unsplash.com/photo-1540465704512-6b5ce98e4c67',
        s: 'https://images.unsplash.com/photo-1540465704512-6b5ce98e4c67'
      }
    },
    urls: {
      pc: 'https://example.com/restaurant4'
    },
    catch: '四季折々の京都の味覚を堪能',
    open: '11:30～14:00, 17:30～21:00',
    close: '月曜定休',
    access: '京阪祇園四条駅から徒歩10分',
    lat: 35.0032,
    lng: 135.7755,
    party_capacity: 40,
    course: 'あり',
    ktai_coupon: 0
  }
];

export async function searchHotpepperRestaurants(
  keyword: string,
  lat?: number,
  lng?: number,
  range: number = 3
): Promise<HotpepperRestaurant[]> {
  // キャッシュキー生成
  const cacheKey = generateCacheKey('hotpepper-search', { keyword, lat, lng, range });
  
  // キャッシュから取得
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('Returning cached Hotpepper search data');
    return cached;
  }
  const apiKey = process.env.HOTPEPPER_API_KEY;
  
  if (!apiKey) {
    console.log('Hotpepper API key not configured, using mock data');
    // キーワードに基づいてモックデータをフィルタリング
    const mockData = mockRestaurants.filter(restaurant => {
      const searchText = `${restaurant.name} ${restaurant.genre.name} ${restaurant.catch} ${restaurant.address}`.toLowerCase();
      return keyword.toLowerCase().split(' ').some(term => searchText.includes(term));
    });
    cache.set(cacheKey, mockData);
    return mockData;
  }
  
  try {
    const baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
    const params = new URLSearchParams({
      key: apiKey,
      keyword: keyword,
      format: 'json',
      count: '20',
      order: '4', // おススメ順
    });
    
    // 位置情報がある場合は追加
    if (lat && lng) {
      params.append('lat', lat.toString());
      params.append('lng', lng.toString());
      params.append('range', range.toString());
    }
    
    // キーワードに基づいて追加のフィルタを適用
    if (keyword.includes('温泉') || keyword.includes('熱海')) {
      params.append('large_area', 'Z014'); // 静岡
    } else if (keyword.includes('東京')) {
      params.append('large_area', 'Z011'); // 東京
    } else if (keyword.includes('京都')) {
      params.append('large_area', 'Z013'); // 京都
    }
    
    const response = await fetch(`${baseUrl}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Hotpepper API error: ${response.status}`);
    }
    
    const data: HotpepperResponse = await response.json();
    
    if (data.results && data.results.shop) {
      const results = data.results.shop;
      cache.set(cacheKey, results);
      return results;
    }
    
    cache.set(cacheKey, [], 60 * 1000); // 空の結果もキャッシュ
    return [];
  } catch (error) {
    console.error('Hotpepper API error:', error);
    cache.set(cacheKey, [], 60 * 1000); // エラー時は1分だけキャッシュ
    return [];
  }
}

// レストラン情報を観光スポット形式に変換
export function convertToTourismSpot(restaurant: HotpepperRestaurant) {
  const activities = ['食事', restaurant.genre.name];
  
  // 特徴を追加
  if (restaurant.free_drink === 'あり') activities.push('飲み放題');
  if (restaurant.free_food === 'あり') activities.push('食べ放題');
  if (restaurant.course === 'あり') activities.push('コースあり');
  
  return {
    name: restaurant.name,
    description: `${restaurant.genre.name}のお店。${restaurant.catch}`,
    location: restaurant.address,
    category: 'グルメ',
    activities: activities,
    priceRange: restaurant.budget.average || restaurant.budget.name,
    imageUrl: restaurant.photo.pc.l || restaurant.photo.pc.m,
    rating: undefined,
    url: restaurant.urls.pc,
  };
}