export const APP_TITLE = "YouTube Subtitle Manager";

export const VIDEOS_PER_PAGE = 10;

export const DATE_RANGE_OPTIONS = [
  { value: 'any', label: 'いつでも (Any time)' },
  { value: 'today', label: '今日 (Today)' },
  { value: 'week', label: '今週 (This week)' },
  { value: 'month', label: '今月 (This month)' },
  { value: 'year', label: '今年 (This year)' },
];

export const VIDEO_LENGTH_OPTIONS = [
  { value: 'any', label: 'すべて (Any)' },
  { value: 'short', label: '短い (Short, <4 min)' },
  { value: 'medium', label: '中程度 (Medium, 4-20 min)' },
  { value: 'long', label: '長い (Long, >20 min)' },
];

export const SORT_ORDER_OPTIONS = [
  { value: 'relevance', label: '関連度順 (Relevance)' },
  { value: 'date', label: 'アップロード日順 (Upload date)' },
  { value: 'viewCount', label: '視聴回数順 (View count)' },
  { value: 'rating', label: '評価順 (Rating)' },
];

export const MOCK_API_DELAY = 500; // ms
