// Weekend Planner Ver2.0 型定義

// エリア
export interface Area {
  code: string;
  name: string;
  region: 'kanto' | 'kansai' | 'tokai' | 'kyushu' | 'hokkaido' | 'tohoku' | 'chugoku' | 'shikoku';
}

// 目的・アクティビティ
export type Purpose = 'gourmet' | 'sightseeing' | 'onsen' | 'activity' | 'shopping' | 'family';

// 予算レベル
export type BudgetLevel = 'budget' | 'moderate' | 'premium' | 'luxury';

// 検索条件
export interface SearchCriteria {
  area: Area;
  purposes: Purpose[];
  budget?: BudgetLevel;
  peopleCount?: number;
  transportation?: 'car' | 'train' | 'both';
  date?: Date;
  duration?: '1day' | '2days';
}

// レストラン（ホットペッパーAPI準拠）
export interface Restaurant {
  id: string;
  name: string;
  nameKana: string;
  address: string;
  lat: number;
  lng: number;
  genre: {
    code: string;
    name: string;
    catch: string;
  };
  subGenre?: {
    code: string;
    name: string;
  };
  budget: {
    code: string;
    name: string;
    average: string;
  };
  catch: string;
  capacity: number;
  access: string;
  mobileAccess: string;
  urls: {
    pc: string;
    mobile?: string;
  };
  photo: {
    pc: {
      l: string;
      m: string;
      s: string;
    };
    mobile?: {
      l: string;
      s: string;
    };
  };
  open: string;
  close: string;
  partyCapacity?: number;
  lunch?: string;
  course?: string;
  freeDrink?: string;
  freeFood?: string;
  privateRoom?: string;
  card?: string;
  nonSmoking?: string;
  parking?: string;
  rating?: number;
  reviews?: Review[];
}

// 観光スポット
export interface TouristSpot {
  id: string;
  name: string;
  nameKana?: string;
  description: string;
  category: 'temple' | 'shrine' | 'museum' | 'park' | 'landmark' | 'nature' | 'theme_park' | 'shopping';
  address: string;
  lat: number;
  lng: number;
  access: string;
  openHours?: string;
  closedDays?: string;
  admission?: {
    adult: number;
    child?: number;
    senior?: number;
  };
  duration: number; // 推奨滞在時間（分）
  popularity: number; // 人気度（1-5）
  images: string[];
  tips?: string[];
  nearbySpots?: string[]; // 近隣スポットID
}

// 温泉・宿泊施設
export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'ryokan' | 'minshuku' | 'onsen';
  address: string;
  lat: number;
  lng: number;
  priceRange: {
    min: number;
    max: number;
  };
  amenities: string[];
  onsenType?: 'natural' | 'artificial' | 'mixed';
  images: string[];
  rating: number;
  checkIn: string;
  checkOut: string;
}

// タイムラインアイテム
export interface TimelineItem {
  id: string;
  time: string;
  duration: number; // 分
  type: 'restaurant' | 'spot' | 'transport' | 'accommodation' | 'free';
  place?: Restaurant | TouristSpot | Accommodation;
  transport?: Transport;
  memo?: string;
  cost?: number;
}

// 交通手段
export interface Transport {
  from: string;
  to: string;
  method: 'walk' | 'train' | 'bus' | 'car' | 'taxi';
  duration: number; // 分
  cost?: number;
  route?: string;
}

// 週末プラン
export interface WeekendPlan {
  id: string;
  title: string;
  description: string;
  area: Area;
  duration: '1day' | '2days';
  timeline: {
    day1: TimelineItem[];
    day2?: TimelineItem[];
  };
  totalCost: {
    min: number;
    max: number;
    breakdown: {
      food: number;
      transport: number;
      admission: number;
      accommodation?: number;
    };
  };
  tags: string[];
  created: Date;
  popularity?: number;
}

// レビュー
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

// API レスポンス
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    total: number;
    page: number;
    perPage: number;
  };
}