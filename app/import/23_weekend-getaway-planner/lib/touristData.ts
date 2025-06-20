// 観光地静的データ

import { TouristSpot } from '@/types/v2';
import { cache, generateCacheKey } from './cache';

// エリア別観光地データ
const TOURIST_SPOTS_DATA: Record<string, TouristSpot[]> = {
  // 東京
  tokyo: [
    {
      id: 'tokyo-skytree',
      name: '東京スカイツリー',
      nameKana: 'とうきょうスカイツリー',
      description: '高さ634mの電波塔。展望台からは東京の街並みを一望でき、天気が良ければ富士山も見える。',
      category: 'landmark',
      address: '東京都墨田区押上1-1-2',
      lat: 35.7101,
      lng: 139.8107,
      access: '東武スカイツリーライン「とうきょうスカイツリー駅」すぐ',
      openHours: '8:00～22:00（最終入場21:00）',
      admission: { adult: 2100, child: 950, senior: 1500 },
      duration: 120,
      popularity: 4.5,
      images: [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800'
      ],
      tips: ['平日の午前中は比較的空いています', '夕暮れ時の景色がおすすめ'],
      nearbySpots: ['asakusa-temple']
    },
    {
      id: 'asakusa-temple',
      name: '浅草寺',
      nameKana: 'せんそうじ',
      description: '東京最古の寺院。雷門から仲見世通りを経て本堂へ。江戸文化を感じられる人気スポット。',
      category: 'temple',
      address: '東京都台東区浅草2-3-1',
      lat: 35.7148,
      lng: 139.7967,
      access: '東京メトロ銀座線「浅草駅」より徒歩5分',
      openHours: '6:00～17:00（10月～3月は6:30開門）',
      admission: { adult: 0 },
      duration: 90,
      popularity: 4.6,
      images: [
        'https://images.unsplash.com/photo-1554797589-7241bb691973?w=800',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
      ],
      tips: ['朝早めの参拝がおすすめ', '仲見世通りでお土産探しも楽しい'],
      nearbySpots: ['tokyo-skytree']
    },
    {
      id: 'ueno-zoo',
      name: '上野動物園',
      nameKana: 'うえのどうぶつえん',
      description: '日本最古の動物園。ジャイアントパンダをはじめ、約350種の動物を飼育。',
      category: 'theme_park',
      address: '東京都台東区上野公園9-83',
      lat: 35.7175,
      lng: 139.7713,
      access: 'JR「上野駅」公園口より徒歩5分',
      openHours: '9:30～17:00',
      closedDays: '月曜日（祝日の場合は翌日）',
      admission: { adult: 600, child: 200, senior: 300 },
      duration: 180,
      popularity: 4.3,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800'
      ],
      tips: ['パンダの観覧は混雑するので朝一がおすすめ', '園内は広いので歩きやすい靴で']
    }
  ],

  // 熱海
  atami: [
    {
      id: 'atami-castle',
      name: '熱海城',
      nameKana: 'あたみじょう',
      description: '熱海の絶景を一望できる観光城。最上階の展望台からは相模湾と熱海市街を見渡せる。',
      category: 'landmark',
      address: '静岡県熱海市熱海1993',
      lat: 35.0494,
      lng: 139.0792,
      access: '熱海駅よりバス「熱海城前」下車すぐ',
      openHours: '9:00～17:00',
      admission: { adult: 1000, child: 550 },
      duration: 90,
      popularity: 4.0,
      images: [
        'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800'
      ],
      tips: ['晴れた日は富士山が見えることも', '城内には体験型アトラクションもあり']
    },
    {
      id: 'kiunkaku',
      name: '起雲閣',
      nameKana: 'きうんかく',
      description: '大正・昭和の文豪たちに愛された歴史的建造物。美しい日本庭園と建築が見どころ。',
      category: 'landmark',
      address: '静岡県熱海市昭和町4-2',
      lat: 35.0961,
      lng: 139.0736,
      access: '熱海駅より徒歩20分またはバス「起雲閣前」下車',
      openHours: '9:00～17:00',
      closedDays: '水曜日',
      admission: { adult: 610, child: 300 },
      duration: 60,
      popularity: 4.2,
      images: [
        'https://images.unsplash.com/photo-1577654041839-ff15e6ae2b77?w=800'
      ],
      tips: ['建物内の見学と庭園散策がセット', '喫茶室で庭園を眺めながら休憩も']
    },
    {
      id: 'omiya-memorial-park',
      name: '熱海梅園',
      nameKana: 'あたみばいえん',
      description: '日本一早咲きの梅で有名。約450本の梅の木があり、11月下旬から咲き始める。',
      category: 'park',
      address: '静岡県熱海市梅園町8-11',
      lat: 35.1111,
      lng: 139.0667,
      access: 'JR来宮駅より徒歩10分',
      openHours: '8:30～16:00',
      admission: { adult: 300, child: 0 },
      duration: 60,
      popularity: 4.1,
      images: [
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800'
      ],
      tips: ['梅まつり期間中は特に混雑', '紅葉の時期も美しい']
    }
  ],

  // 京都
  kyoto: [
    {
      id: 'kiyomizu-temple',
      name: '清水寺',
      nameKana: 'きよみずでら',
      description: '世界遺産の寺院。清水の舞台からの眺めは絶景。春の桜、秋の紅葉が特に美しい。',
      category: 'temple',
      address: '京都府京都市東山区清水1-294',
      lat: 34.9949,
      lng: 135.7850,
      access: '京阪電車「清水五条駅」より徒歩25分',
      openHours: '6:00～18:00（季節により変動）',
      admission: { adult: 400, child: 200 },
      duration: 90,
      popularity: 4.7,
      images: [
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
      ],
      tips: ['早朝参拝で混雑を避けられる', '参道の店舗も楽しい'],
      nearbySpots: ['fushimi-inari']
    },
    {
      id: 'fushimi-inari',
      name: '伏見稲荷大社',
      nameKana: 'ふしみいなりたいしゃ',
      description: '千本鳥居で有名な神社。山頂まで続く鳥居のトンネルは圧巻。',
      category: 'shrine',
      address: '京都府京都市伏見区深草薮之内町68',
      lat: 34.9671,
      lng: 135.7727,
      access: 'JR奈良線「稲荷駅」すぐ',
      openHours: '24時間参拝可能',
      admission: { adult: 0 },
      duration: 120,
      popularity: 4.8,
      images: [
        'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800'
      ],
      tips: ['山頂まで往復2時間程度', '早朝や夕方は幻想的'],
      nearbySpots: ['kiyomizu-temple']
    },
    {
      id: 'arashiyama',
      name: '嵐山',
      nameKana: 'あらしやま',
      description: '竹林の道や渡月橋など見どころ満載。四季折々の美しい景色が楽しめる。',
      category: 'nature',
      address: '京都府京都市右京区嵐山',
      lat: 35.0095,
      lng: 135.6666,
      access: '嵐電「嵐山駅」、JR「嵯峨嵐山駅」',
      openHours: '散策自由',
      admission: { adult: 0 },
      duration: 180,
      popularity: 4.5,
      images: [
        'https://images.unsplash.com/photo-1553864250-05b20249ee0c?w=800'
      ],
      tips: ['竹林の道は朝早めが空いている', '人力車での観光もおすすめ']
    }
  ],

  // 箱根
  hakone: [
    {
      id: 'hakone-shrine',
      name: '箱根神社',
      nameKana: 'はこねじんじゃ',
      description: '芦ノ湖畔にある歴史ある神社。湖上の鳥居が有名で、パワースポットとしても人気。',
      category: 'shrine',
      address: '神奈川県足柄下郡箱根町元箱根80-1',
      lat: 35.2045,
      lng: 139.0245,
      access: '箱根登山バス「元箱根」下車徒歩10分',
      openHours: '境内自由',
      admission: { adult: 0 },
      duration: 60,
      popularity: 4.4,
      images: [
        'https://images.unsplash.com/photo-1578637387939-43c525550085?w=800'
      ],
      tips: ['朝の参拝がおすすめ', '湖畔の鳥居は撮影スポット']
    },
    {
      id: 'owakudani',
      name: '大涌谷',
      nameKana: 'おおわくだに',
      description: '箱根火山の噴煙地。黒たまごが名物。ロープウェイからの景色も絶景。',
      category: 'nature',
      address: '神奈川県足柄下郡箱根町仙石原1251',
      lat: 35.2444,
      lng: 139.0194,
      access: '箱根ロープウェイ「大涌谷駅」下車',
      openHours: '9:00～17:00',
      admission: { adult: 0 },
      duration: 90,
      popularity: 4.3,
      images: [
        'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800'
      ],
      tips: ['火山ガスの影響で立入制限の場合あり', '黒たまごは1個食べると7年長生き']
    }
  ],

  // 鎌倉
  kamakura: [
    {
      id: 'kamakura-daibutsu',
      name: '鎌倉大仏',
      nameKana: 'かまくらだいぶつ',
      description: '高徳院にある国宝の大仏。高さ約13.35m、重さ約121トンの青銅製坐像。',
      category: 'temple',
      address: '神奈川県鎌倉市長谷4-2-28',
      lat: 35.3169,
      lng: 139.5357,
      access: '江ノ電「長谷駅」より徒歩7分',
      openHours: '8:00～17:30（10月～3月は17:00まで）',
      admission: { adult: 300, child: 150 },
      duration: 45,
      popularity: 4.5,
      images: [
        'https://images.unsplash.com/photo-1574094520371-70b5cd87211d?w=800'
      ],
      tips: ['大仏の内部（胎内）にも入れます', '周辺の長谷寺も合わせて参拝がおすすめ']
    },
    {
      id: 'tsurugaoka-hachimangu',
      name: '鶴岡八幡宮',
      nameKana: 'つるがおかはちまんぐう',
      description: '鎌倉の中心的な神社。源頼朝ゆかりの地で、鎌倉観光の定番スポット。',
      category: 'shrine',
      address: '神奈川県鎌倉市雪ノ下2-1-31',
      lat: 35.3260,
      lng: 139.5564,
      access: 'JR「鎌倉駅」東口より徒歩10分',
      openHours: '5:00～21:00（10月～3月は6:00～）',
      admission: { adult: 0 },
      duration: 60,
      popularity: 4.4,
      images: [
        'https://images.unsplash.com/photo-1580323043629-f4c88e758a7f?w=800'
      ],
      tips: ['初詣は非常に混雑', '段葛（参道）の桜並木も美しい']
    }
  ]
};

// エリアコードから観光地を取得
export async function getTouristSpotsByArea(areaCode: string): Promise<TouristSpot[]> {
  // キャッシュキー生成
  const cacheKey = generateCacheKey('tourist-area', { areaCode });
  
  // キャッシュから取得
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('Returning cached tourist spots data');
    return cached;
  }
  
  const spots = TOURIST_SPOTS_DATA[areaCode] || [];
  cache.set(cacheKey, spots);
  return spots;
}

// 全観光地を取得
export async function getAllTouristSpots(): Promise<TouristSpot[]> {
  // キャッシュキー生成
  const cacheKey = 'tourist-all';
  
  // キャッシュから取得
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  const allSpots = Object.values(TOURIST_SPOTS_DATA).flat();
  cache.set(cacheKey, allSpots);
  return allSpots;
}

// カテゴリ別に観光地を取得
export async function getTouristSpotsByCategory(category: TouristSpot['category']): Promise<TouristSpot[]> {
  // キャッシュキー生成
  const cacheKey = generateCacheKey('tourist-category', { category });
  
  // キャッシュから取得
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  const allSpots = await getAllTouristSpots();
  const categorySpots = allSpots.filter(spot => spot.category === category);
  cache.set(cacheKey, categorySpots);
  return categorySpots;
}

// 近隣の観光地を取得
export async function getNearbySpots(spotId: string): Promise<TouristSpot[]> {
  const allSpots = await getAllTouristSpots();
  const targetSpot = allSpots.find(spot => spot.id === spotId);
  
  if (!targetSpot || !targetSpot.nearbySpots) {
    return [];
  }
  
  return allSpots.filter(spot => targetSpot.nearbySpots?.includes(spot.id));
}