'use client'

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { searchHotpepperRestaurants, getAreaCoordinates } from '@/lib/hotpepperApi';
import { getTouristSpotsByArea } from '@/lib/touristData';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'suggestions';
  content: string;
  suggestions?: Suggestion[];
}

interface Suggestion {
  id: string;
  emoji: string;
  title: string;
  description: string;
  details: {
    location: string;
    duration: string;
    price: string;
    category: string;
    hotpepperData?: any;
  };
}

interface ChatInterfaceProps {
  onSuggestionsReceived: (suggestions: Suggestion[]) => void;
  currentTimeline: any;
}

export function ChatInterface({ onSuggestionsReceived, currentTimeline }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'こんにちは！週末のプランを一緒に作りましょう。\n\n「箱根で温泉と美食」「鎌倉でインスタ映えスポット」など、行きたい場所とやりたいことを教えてください。\n\nホットペッパーの実際のお店情報を使って提案します！'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    // 選択した提案をメッセージに追加
    const selectionMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `「${suggestion.title}」を選択しました`
    };
    
    setMessages(prev => [...prev, selectionMessage]);
    setIsLoading(true);

    // 次の提案を生成
    setTimeout(async () => {
      let nextMessage = '';
      let relatedSuggestions: Suggestion[] = [];
      
      if (suggestion.details.category === 'gourmet' && suggestion.details.hotpepperData) {
        // レストランの場合、近隣の観光地を提案
        nextMessage = `${suggestion.emoji} ${suggestion.title}\n\n素敵なお店ですね！こちらの近くで楽しめるスポットを提案します：`;
        
        const area = suggestion.details.location.includes('熱海') ? 'atami' : 
                    suggestion.details.location.includes('箱根') ? 'hakone' : 
                    suggestion.details.location.includes('鎌倉') ? 'kamakura' : 'tokyo';
        
        const spots = await getTouristSpotsByArea(area);
        relatedSuggestions = spots.slice(0, 3).map(spot => ({
          id: Math.random().toString(),
          emoji: '🏛️',
          title: `${spot.name}で観光`,
          description: spot.description,
          details: {
            location: spot.address,
            duration: `${Math.floor(spot.duration / 60)}時間`,
            price: spot.admission?.adult ? `¥${spot.admission.adult}` : '無料',
            category: 'sightseeing'
          }
        }));
        
        // ホットペッパーのURLも表示
        if (suggestion.details.hotpepperData.urls) {
          nextMessage += `\n\n🔗 ${suggestion.title}の詳細・予約はこちら：\n${suggestion.details.hotpepperData.urls.pc}`;
        }
      } else if (suggestion.details.category === 'sightseeing') {
        // 観光地の場合、近隣のレストランを提案
        nextMessage = `${suggestion.emoji} ${suggestion.title}\n\nいいですね！観光の後に立ち寄れるお店を提案します：`;
        
        const keyword = suggestion.details.location.split('・')[0];
        const restaurants = await searchHotpepperRestaurants(keyword + ' ランチ ディナー');
        
        relatedSuggestions = restaurants.slice(0, 3).map(restaurant => ({
          id: Math.random().toString(),
          emoji: '🍽️',
          title: restaurant.name,
          description: restaurant.catch || restaurant.genre.catch,
          details: {
            location: restaurant.address,
            duration: '1.5時間',
            price: restaurant.budget.average || '¥3,000〜',
            category: 'gourmet',
            hotpepperData: restaurant
          }
        }));
      } else {
        // 温泉などの場合
        nextMessage = `${suggestion.emoji} ${suggestion.title}\n\nリラックスできそうですね！合わせて楽しめる場所を提案します：`;
        relatedSuggestions = await generateSuggestions(suggestion.details.location + ' グルメ 観光');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: nextMessage
      };

      const suggestionsMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'suggestions',
        content: '',
        suggestions: relatedSuggestions
      };

      setMessages(prev => [...prev, botMessage, suggestionsMessage]);
      onSuggestionsReceived(relatedSuggestions);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateSuggestions = async (userInput: string): Promise<Suggestion[]> => {
    // ユーザー入力からエリアを抽出
    const areas = [
      { name: '箱根', code: 'hakone' },
      { name: '鎌倉', code: 'kamakura' },
      { name: '熱海', code: 'atami' },
      { name: '東京', code: 'tokyo' },
      { name: '京都', code: 'kyoto' }
    ];
    
    let targetArea = areas.find(area => userInput.includes(area.name));
    if (!targetArea) targetArea = { name: '東京', code: 'tokyo' }; // デフォルト

    // ホットペッパーAPIで実際のレストランを検索
    const restaurants = await searchHotpepperRestaurants(
      `${targetArea.name} ${userInput}`,
      undefined,
      undefined,
      3
    );

    // 観光スポットを取得
    const spots = await getTouristSpotsByArea(targetArea.code);

    const suggestions: Suggestion[] = [];

    // レストラン提案
    if (restaurants.length > 0) {
      const restaurant = restaurants[0];
      suggestions.push({
        id: Math.random().toString(),
        emoji: '🍴',
        title: `${restaurant.name}で絶品グルメ`,
        description: restaurant.catch || restaurant.genre.catch || '地元で人気の名店',
        details: {
          location: restaurant.address,
          duration: '2時間',
          price: restaurant.budget.average || '¥3,000〜',
          category: 'gourmet',
          hotpepperData: restaurant
        }
      });
    }

    // 観光スポット提案
    if (spots.length > 0) {
      const spot = spots[0];
      suggestions.push({
        id: Math.random().toString(),
        emoji: '⛩️',
        title: `${spot.name}で歴史を感じる`,
        description: spot.description,
        details: {
          location: spot.address,
          duration: `${Math.floor(spot.duration / 60)}時間`,
          price: spot.admission?.adult ? `¥${spot.admission.adult}〜` : '無料',
          category: 'sightseeing'
        }
      });
    }

    // リラックス提案
    if (userInput.includes('温泉') || userInput.includes('のんびり')) {
      suggestions.push({
        id: Math.random().toString(),
        emoji: '♨️',
        title: `${targetArea.name}の温泉でリフレッシュ`,
        description: '日頃の疲れを癒す至福の時間',
        details: {
          location: `${targetArea.name}エリア`,
          duration: '3時間',
          price: '¥2,000〜5,000',
          category: 'relax'
        }
      });
    }

    // 3つに満たない場合は補充
    if (suggestions.length < 3 && restaurants.length > 1) {
      const restaurant2 = restaurants[1];
      suggestions.push({
        id: Math.random().toString(),
        emoji: '🍣',
        title: `${restaurant2.name}でディナー`,
        description: restaurant2.catch || '特別な夜を演出',
        details: {
          location: restaurant2.address,
          duration: '2時間',
          price: restaurant2.budget.average || '¥4,000〜',
          category: 'gourmet',
          hotpepperData: restaurant2
        }
      });
    }

    return suggestions.slice(0, 3);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // AIの返答をシミュレート
    setTimeout(async () => {
      const suggestions = await generateSuggestions(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'いいですね！3つの素敵なプランを提案します：'
      };

      const suggestionsMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'suggestions',
        content: '',
        suggestions
      };

      setMessages(prev => [...prev, botMessage, suggestionsMessage]);
      onSuggestionsReceived(suggestions);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        💬 あなたの希望を教えてください
      </h2>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/20">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === 'user' && (
                <div className="flex justify-end">
                  <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-white" />
                      <span className="text-sm font-medium text-white">あなた</span>
                    </div>
                    <p className="text-white">{message.content}</p>
                  </div>
                </div>
              )}

              {message.type === 'bot' && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">AI プランナー</span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              )}

              {message.type === 'suggestions' && message.suggestions && (
                <div className="space-y-3">
                  {message.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{suggestion.emoji}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                            {suggestion.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {suggestion.description}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                              📍 {suggestion.details.location}
                            </span>
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              ⏱️ {suggestion.details.duration}
                            </span>
                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                              💰 {suggestion.details.price}
                            </span>
                          </div>
                          {suggestion.details.hotpepperData?.urls?.pc && (
                            <a 
                              href={suggestion.details.hotpepperData.urls.pc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-800"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              ホットペッパーで詳細を見る
                            </a>
                          )}
                        </div>
                        <Sparkles className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-red-600 animate-pulse" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="例: 箱根で温泉と美食を楽しみたい"
          className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 rounded-xl transition-colors"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}