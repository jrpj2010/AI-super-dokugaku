// データ取得の統合ロジック

import { SearchCriteria, Restaurant, TouristSpot, WeekendPlan } from '@/types/v2';
import { searchHotpepperRestaurants } from './hotpepperApi';
import { getTouristSpotsByArea } from './touristData';

// エリアコードからホットペッパーの大エリアコードへのマッピング
const AREA_TO_HOTPEPPER_MAP: Record<string, string> = {
  // 関東
  'tokyo': 'Z011',      // 東京
  'yokohama': 'Z014',   // 神奈川
  'kamakura': 'Z014',   // 神奈川
  'hakone': 'Z014',     // 神奈川
  'nikko': 'Z012',      // 栃木
  'kawagoe': 'Z013',    // 埼玉
  // 関西
  'kyoto': 'Z023',      // 京都
  'osaka': 'Z022',      // 大阪
  'nara': 'Z024',       // 奈良
  'kobe': 'Z025',       // 兵庫
  // 東海
  'nagoya': 'Z021',     // 愛知
  'atami': 'Z016',      // 静岡
  'izu': 'Z016',        // 静岡
  'hamamatsu': 'Z016',  // 静岡
  // 九州
  'fukuoka': 'Z041',    // 福岡
  'nagasaki': 'Z043',   // 長崎
  'kumamoto': 'Z044',   // 熊本
  'beppu': 'Z045',      // 大分
};

// ジャンルマッピング
const PURPOSE_TO_GENRE_MAP: Record<string, string[]> = {
  'gourmet': ['G001', 'G002', 'G003', 'G004'], // 居酒屋、ダイニングバー、創作料理、和食
  'family': ['G008', 'G009', 'G016'],          // 焼肉、各国料理、お好み焼き
  'onsen': ['G001', 'G004'],                   // 居酒屋、和食（温泉地の食事）
};

export interface FetchDataResult {
  restaurants: Restaurant[];
  touristSpots: TouristSpot[];
  error?: string;
}

// 統合データ取得関数
export async function fetchWeekendData(criteria: SearchCriteria): Promise<FetchDataResult> {
  try {
    const [restaurants, touristSpots] = await Promise.all([
      fetchRestaurants(criteria),
      fetchTouristSpots(criteria)
    ]);

    return {
      restaurants,
      touristSpots
    };
  } catch (error) {
    console.error('データ取得エラー:', error);
    return {
      restaurants: [],
      touristSpots: [],
      error: 'データの取得中にエラーが発生しました'
    };
  }
}

// レストラン情報取得
async function fetchRestaurants(criteria: SearchCriteria): Promise<Restaurant[]> {
  const hotpepperAreaCode = AREA_TO_HOTPEPPER_MAP[criteria.area.code];
  
  if (!hotpepperAreaCode) {
    console.warn(`エリアコード ${criteria.area.code} のマッピングが見つかりません`);
    return [];
  }

  // キーワード生成
  const keywords: string[] = [criteria.area.name];
  
  // 目的に応じたキーワード追加
  if (criteria.purposes.includes('gourmet')) {
    keywords.push('名物', '人気', 'おすすめ');
  }
  if (criteria.purposes.includes('family')) {
    keywords.push('ファミリー', '子供', '個室');
  }
  if (criteria.purposes.includes('onsen')) {
    keywords.push('温泉', '旅館', '地元');
  }

  // ホットペッパーAPI呼び出し
  const results = await searchHotpepperRestaurants(
    keywords.join(' '),
    undefined,
    undefined,
    3,
    {
      large_area: hotpepperAreaCode,
      budget: getBudgetCode(criteria.budget),
      private_room: criteria.purposes.includes('family') ? '1' : undefined,
      course: criteria.peopleCount && criteria.peopleCount >= 4 ? '1' : undefined,
      party_capacity: criteria.peopleCount && criteria.peopleCount >= 8 ? criteria.peopleCount.toString() : undefined,
    }
  );

  // 型変換
  return results.map(convertHotpepperToRestaurant);
}

// 観光地情報取得
async function fetchTouristSpots(criteria: SearchCriteria): Promise<TouristSpot[]> {
  const spots = await getTouristSpotsByArea(criteria.area.code);
  
  // 目的に応じたフィルタリング
  return spots.filter(spot => {
    // グルメ目的でも主要な観光地は表示
    if (criteria.purposes.includes('gourmet')) {
      return ['temple', 'shrine', 'landmark', 'park'].includes(spot.category);
    }
    if (criteria.purposes.includes('sightseeing') && 
        ['temple', 'shrine', 'landmark', 'museum'].includes(spot.category)) {
      return true;
    }
    if (criteria.purposes.includes('family') && 
        ['park', 'theme_park', 'museum'].includes(spot.category)) {
      return true;
    }
    if (criteria.purposes.includes('shopping') && 
        spot.category === 'shopping') {
      return true;
    }
    if (criteria.purposes.includes('activity') && 
        ['theme_park', 'nature', 'park'].includes(spot.category)) {
      return true;
    }
    return false;
  });
}

// 予算コード変換
function getBudgetCode(budget?: string): string | undefined {
  const budgetMap: Record<string, string> = {
    'budget': 'B001',      // ～2000円
    'moderate': 'B002',    // 2001～3000円
    'premium': 'B003',     // 3001～4000円
    'luxury': 'B008',      // 5001～7000円
  };
  return budget ? budgetMap[budget] : undefined;
}

// ホットペッパーデータを内部Restaurant型に変換
function convertHotpepperToRestaurant(hp: any): Restaurant {
  return {
    id: hp.id,
    name: hp.name,
    nameKana: hp.name_kana || '',
    address: hp.address,
    lat: parseFloat(hp.lat),
    lng: parseFloat(hp.lng),
    genre: {
      code: hp.genre.code,
      name: hp.genre.name,
      catch: hp.genre.catch || ''
    },
    subGenre: hp.sub_genre ? {
      code: hp.sub_genre.code,
      name: hp.sub_genre.name
    } : undefined,
    budget: {
      code: hp.budget.code,
      name: hp.budget.name,
      average: hp.budget.average
    },
    catch: hp.catch,
    capacity: parseInt(hp.capacity) || 0,
    access: hp.access,
    mobileAccess: hp.mobile_access || '',
    urls: {
      pc: hp.urls.pc
    },
    photo: {
      pc: {
        l: hp.photo.pc.l,
        m: hp.photo.pc.m,
        s: hp.photo.pc.s
      }
    },
    open: hp.open,
    close: hp.close,
    partyCapacity: hp.party_capacity ? parseInt(hp.party_capacity) : undefined,
    lunch: hp.lunch,
    course: hp.course,
    freeDrink: hp.free_drink,
    freeFood: hp.free_food,
    privateRoom: hp.private_room,
    card: hp.card,
    nonSmoking: hp.non_smoking,
    parking: hp.parking,
    rating: 4.0 + Math.random() * 0.8 // ダミーレーティング（4.0-4.8）
  };
}