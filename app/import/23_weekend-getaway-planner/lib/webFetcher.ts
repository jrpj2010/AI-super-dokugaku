// APIを使った観光情報取得（スクレイピングの代替）

export interface TourismSpot {
  name: string;
  description: string;
  location: string;
  category: string;
  activities: string[];
  priceRange?: string;
  imageUrl?: string;
  rating?: number;
  url?: string;
}

// Google Places APIのモック（実際のAPIキーが必要）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchGooglePlaces(_query: string): Promise<TourismSpot[]> {
  // 実際にはGoogle Places APIを使用
  // ここではデモ用のモックデータを返す
  return [];
}

// OpenTripMap APIを使用（APIキーが必要）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchOpenTripMapPlaces(query: string): Promise<TourismSpot[]> {
  // OpenTripMap APIは認証が必要なため、現在は静的データのみを使用
  // 将来的にAPIキーを取得した場合は、以下のような実装になる予定
  /*
  const apiKey = process.env.OPENTRIPMAP_API_KEY;
  if (!apiKey) {
    console.log('OpenTripMap API key not configured');
    return [];
  }
  
  try {
    const searchUrl = `https://api.opentripmap.com/0.1/en/places/autosuggest?name=${encodeURIComponent(query)}&max=10&apikey=${apiKey}`;
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from OpenTripMap');
    }
    
    const data = await response.json();
    // ... データ変換処理
  } catch (error) {
    console.error('OpenTripMap API error:', error);
    return [];
  }
  */
  
  // 現在は静的データから補完的な検索を行う
  console.log('OpenTripMap API is not configured, using static data only');
  return [];
}

// 日本の観光情報データベース（静的データ）
const JAPAN_TOURISM_DATA: TourismSpot[] = [
  // 東京エリア
  {
    name: "東京スカイツリー",
    description: "高さ634mの電波塔。展望台からは東京の街並みを一望できます。",
    location: "東京都墨田区",
    category: "観光名所",
    activities: ["展望台観覧", "ソラマチでショッピング", "すみだ水族館"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/4B9BFF/FFFFFF?text=東京スカイツリー",
    rating: 4.5
  },
  {
    name: "浅草寺",
    description: "東京最古の寺院。雷門や仲見世通りなど見どころ満載。",
    location: "東京都台東区",
    category: "寺社仏閣",
    activities: ["参拝", "仲見世通りで買い物", "人力車体験"],
    priceRange: "¥",
    imageUrl: "https://placehold.co/400x200/FF6B6B/FFFFFF?text=浅草寺",
    rating: 4.6
  },
  {
    name: "お台場",
    description: "東京湾に面したエンターテインメントエリア。",
    location: "東京都港区",
    category: "エンタメ",
    activities: ["レインボーブリッジ観賞", "大江戸温泉物語", "アクアシティお台場"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/4ECDC4/FFFFFF?text=お台場",
    rating: 4.3
  },
  // 京都エリア
  {
    name: "清水寺",
    description: "世界遺産の寺院。清水の舞台からの眺めは絶景。",
    location: "京都府京都市",
    category: "寺社仏閣",
    activities: ["参拝", "清水坂散策", "着物レンタル体験"],
    priceRange: "¥",
    imageUrl: "https://placehold.co/400x200/F7B731/FFFFFF?text=清水寺",
    rating: 4.7
  },
  {
    name: "伏見稲荷大社",
    description: "千本鳥居で有名な神社。山頂まで続く鳥居のトンネルは圧巻。",
    location: "京都府京都市",
    category: "寺社仏閣",
    activities: ["千本鳥居散策", "きつねうどん", "お守り購入"],
    priceRange: "¥",
    imageUrl: "https://placehold.co/400x200/FF6B6B/FFFFFF?text=伏見稲荷大社",
    rating: 4.8
  },
  // 大阪エリア
  {
    name: "道頓堀",
    description: "大阪の繁華街。グルメとエンターテインメントの中心地。",
    location: "大阪府大阪市",
    category: "グルメ・エンタメ",
    activities: ["たこ焼き食べ歩き", "川沿い散策", "なんば観光"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/4ECDC4/FFFFFF?text=道頓堀",
    rating: 4.4
  },
  // 北海道エリア
  {
    name: "函館山",
    description: "世界三大夜景の一つ。ロープウェイで山頂へ。",
    location: "北海道函館市",
    category: "自然・景観",
    activities: ["夜景観賞", "ロープウェイ乗車", "山頂レストラン"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/F7B731/FFFFFF?text=函館山",
    rating: 4.7
  },
  // 沖縄エリア
  {
    name: "美ら海水族館",
    description: "世界最大級の水族館。ジンベエザメやマンタが見られる。",
    location: "沖縄県本部町",
    category: "水族館",
    activities: ["ジンベエザメ観察", "イルカショー", "深海魚展示"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/4B9BFF/FFFFFF?text=美ら海水族館",
    rating: 4.6
  },
  // 熱海・温泉エリア
  {
    name: "熱海温泉",
    description: "日本有数の温泉地。海を見ながら温泉を楽しめる。",
    location: "静岡県熱海市",
    category: "温泉",
    activities: ["日帰り温泉", "温泉街散策", "足湯巡り"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/FF6B6B/FFFFFF?text=熱海温泉",
    rating: 4.4
  },
  {
    name: "箱根温泉",
    description: "富士山を望む温泉地。美術館や観光スポットも充実。",
    location: "神奈川県箱根町",
    category: "温泉",
    activities: ["露天風呂", "箱根彫刻の森美術館", "大涌谷観光"],
    priceRange: "¥¥¥",
    imageUrl: "https://placehold.co/400x200/4ECDC4/FFFFFF?text=箱根温泉",
    rating: 4.7
  },
  {
    name: "草津温泉",
    description: "日本三名泉の一つ。湯畑が有名な温泉街。",
    location: "群馬県草津町",
    category: "温泉",
    activities: ["湯畑見学", "湯もみ体験", "西の河原露天風呂"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/F7B731/FFFFFF?text=草津温泉",
    rating: 4.6
  },
  // 鎌倉エリア
  {
    name: "鎌倉大仏",
    description: "高徳院にある国宝の大仏。鎌倉のシンボル。",
    location: "神奈川県鎌倉市",
    category: "寺社仏閣",
    activities: ["大仏参拝", "境内散策", "写真撮影"],
    priceRange: "¥",
    imageUrl: "https://placehold.co/400x200/4B9BFF/FFFFFF?text=鎌倉大仏",
    rating: 4.5
  },
  {
    name: "江ノ島",
    description: "湘南を代表する観光地。海と島の絶景が楽しめる。",
    location: "神奈川県藤沢市",
    category: "観光名所",
    activities: ["江島神社参拝", "シーキャンドル展望", "しらす丼"],
    priceRange: "¥¥",
    imageUrl: "https://placehold.co/400x200/FF6B6B/FFFFFF?text=江ノ島",
    rating: 4.4
  }
];

// キーワードに基づいて観光地を検索
export async function searchTourismSpots(query: string): Promise<TourismSpot[]> {
  const keywords = query.toLowerCase().split(/\s+/);
  
  // 静的データから検索
  const filteredSpots = JAPAN_TOURISM_DATA.filter(spot => {
    const searchText = `${spot.name} ${spot.description} ${spot.location} ${spot.category} ${spot.activities.join(' ')}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword));
  });
  
  // 並列で複数のソースから情報を取得
  const results = await Promise.allSettled([
    // OpenTripMap APIからも取得を試みる
    fetchOpenTripMapPlaces(query),
    // ホットペッパーAPIから取得
    fetchHotpepperSpots(query),
    // スクレイピングが有効な場合は実行
    process.env.ENABLE_SCRAPING === 'true' ? fetchScrapedSpots(query) : Promise.resolve([]),
  ]);
  
  // 成功した結果を統合
  const apiSpots = results
    .filter(result => result.status === 'fulfilled')
    .flatMap(result => (result as PromiseFulfilledResult<TourismSpot[]>).value);
  
  // 結果を統合して重複を除去
  const allSpots = [...filteredSpots, ...apiSpots];
  const uniqueSpots = allSpots.filter((spot, index, self) =>
    index === self.findIndex(s => s.name === spot.name)
  );
  
  return uniqueSpots.slice(0, 15);
}

// ホットペッパーAPIから観光スポット形式で取得
async function fetchHotpepperSpots(query: string): Promise<TourismSpot[]> {
  try {
    const { searchHotpepperRestaurants, convertToTourismSpot } = await import('./hotpepperApi');
    const restaurants = await searchHotpepperRestaurants(query);
    return restaurants.map(convertToTourismSpot);
  } catch (error) {
    console.error('Hotpepper integration error:', error);
    return [];
  }
}

// スクレイピングから観光スポット形式で取得
async function fetchScrapedSpots(query: string): Promise<TourismSpot[]> {
  try {
    const { scrapeMultipleSources } = await import('./scraper');
    const places = await scrapeMultipleSources(query);
    
    return places.map(place => ({
      name: place.name,
      description: place.description,
      location: place.location,
      category: place.category,
      activities: [],
      priceRange: place.priceRange,
      imageUrl: place.imageUrl,
      rating: place.rating,
      url: place.url,
    }));
  } catch (error) {
    console.error('Scraping integration error:', error);
    return [];
  }
}