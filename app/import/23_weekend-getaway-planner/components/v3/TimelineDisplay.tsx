'use client'

import { Clock, MapPin, DollarSign, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineDisplayProps {
  timeline: {
    saturday: any[];
    sunday: any[];
  };
  onRemoveItem: (day: 'saturday' | 'sunday', index: number) => void;
  selectedDay: 'saturday' | 'sunday';
  onDayChange: (day: 'saturday' | 'sunday') => void;
}

export function TimelineDisplay({ 
  timeline, 
  onRemoveItem, 
  selectedDay, 
  onDayChange 
}: TimelineDisplayProps) {
  const currentDayItems = timeline[selectedDay];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        📅 タイムライン
      </h2>

      {/* 曜日タブ */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => onDayChange('saturday')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            selectedDay === 'saturday'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          土曜日（{timeline.saturday.length}件）
        </button>
        <button
          onClick={() => onDayChange('sunday')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            selectedDay === 'sunday'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          日曜日（{timeline.sunday.length}件）
        </button>
      </div>

      {/* タイムラインアイテム */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        <AnimatePresence mode="sync">
          {currentDayItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                まだ予定がありません
                <br />
                <span className="text-sm">
                  左側の提案をクリックして追加しましょう
                </span>
              </p>
            </motion.div>
          ) : (
            currentDayItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* 時間軸の線 */}
                {index < currentDayItems.length - 1 && (
                  <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-300" />
                )}

                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* 時刻 */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-1">{item.time}</p>
                    </div>

                    {/* コンテンツ */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            {item.title}
                          </h3>
                          
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {item.details.location}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {item.details.duration}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              {item.details.price}
                            </p>
                          </div>

                          {/* ホットペッパーリンク */}
                          {item.details.hotpepperData?.urls?.pc && (
                            <a
                              href={item.details.hotpepperData.urls.pc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-800"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              ホットペッパーで予約
                            </a>
                          )}
                        </div>

                        {/* 削除ボタン */}
                        <button
                          onClick={() => onRemoveItem(selectedDay, index)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors group"
                          aria-label="削除"
                        >
                          <X className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* サマリー */}
      {currentDayItems.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">合計時間</span>
            <span className="font-medium text-gray-900">
              約{currentDayItems.reduce((total, item) => {
                const duration = parseFloat(item.details.duration) || 0;
                return total + duration;
              }, 0).toFixed(1)}時間
            </span>
          </div>
        </div>
      )}
    </div>
  );
}