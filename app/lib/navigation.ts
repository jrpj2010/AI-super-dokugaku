// ナビゲーション設定
export interface NavItem {
  title: string;
  href: string;
  description: string;
  icon?: string;
  status?: 'active' | 'coming-soon' | 'beta';
}

export const navigationItems: NavItem[] = [
  {
    title: 'ホーム',
    href: '/',
    description: 'VibeCodingのトップページ',
    status: 'active'
  },
  {
    title: 'スライド生成',
    href: '/new-project',
    description: '議事録からプレゼンテーションスライドを自動生成',
    icon: 'presentation',
    status: 'active'
  },
  {
    title: 'TTS（音声合成）',
    href: '/tts',
    description: 'テキストを自然な音声に変換',
    icon: 'volume',
    status: 'active'
  },
  {
    title: 'SRT音声変換',
    href: '/srt',
    description: 'SRT字幕ファイルから音声を生成',
    icon: 'subtitles',
    status: 'active'
  },
  {
    title: 'プロンプト生成',
    href: '/prompt-generator',
    description: 'AI用の効果的なプロンプトを生成',
    icon: 'edit',
    status: 'coming-soon'
  },
  {
    title: 'リサーチツール',
    href: '/research',
    description: 'AIを使った調査・分析ツール',
    icon: 'search',
    status: 'coming-soon'
  },
  {
    title: '話者分離',
    href: '/speaker-separation',
    description: '音声から話者を分離・識別',
    icon: 'users',
    status: 'coming-soon'
  },
  {
    title: 'AI日記',
    href: '/ai-diary',
    description: 'AIと対話しながら日記を作成',
    icon: 'book',
    status: 'coming-soon'
  },
  {
    title: '画像生成',
    href: '/image-generator',
    description: 'AIでオリジナル画像を生成',
    icon: 'image',
    status: 'coming-soon'
  },
  {
    title: '感情分析',
    href: '/emotion-analysis',
    description: 'リアルタイムで感情を分析',
    icon: 'heart',
    status: 'coming-soon'
  }
];

// アクティブなナビゲーション項目のみを取得
export const activeNavItems = navigationItems.filter(item => item.status === 'active');

// すべてのナビゲーション項目を取得（開発中も含む）
export const allNavItems = navigationItems;