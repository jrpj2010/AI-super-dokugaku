
import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "AIが思考を開始...",
  "入力内容を分析中...",
  "プレゼンテーション構造を設計中...",
  "各スライドコンテンツを生成中...",
  "最終調整とフォーマット中...",
  "まもなく完了します...",
];

const ESTIMATED_DURATION_MS = 25000; // 25秒で95%に達する想定
const MESSAGE_CHANGE_INTERVAL_MS = ESTIMATED_DURATION_MS / LOADING_MESSAGES.length;
const PROGRESS_UPDATE_INTERVAL_MS = 100; // プログレスバーの更新頻度

export const LoadingSpinner: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    // メッセージ更新タイマー
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % LOADING_MESSAGES.length);
    }, MESSAGE_CHANGE_INTERVAL_MS);

    // プログレスバー更新タイマー
    // 0から95%まで進むように調整
    const maxProgressSteps = ESTIMATED_DURATION_MS / PROGRESS_UPDATE_INTERVAL_MS;
    const progressIncrement = 95 / maxProgressSteps;

    const progressTimer = setInterval(() => {
      setProgressPercent(prevProgress => {
        const nextProgress = prevProgress + progressIncrement;
        return Math.min(nextProgress, 95); // 95%を上限とする
      });
    }, PROGRESS_UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 rounded-full animate-pulse bg-rose-500"></div>
        <div className="w-3 h-3 rounded-full animate-pulse bg-rose-600" style={{animationDelay: '0.15s'}}></div>
        <div className="w-3 h-3 rounded-full animate-pulse bg-rose-700" style={{animationDelay: '0.3s'}}></div>
        <span className="text-sm font-medium text-white ml-2">
          {LOADING_MESSAGES[currentMessageIndex]}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2.5 mb-1 overflow-hidden">
        <div
          className="bg-rose-600 h-1.5 rounded-full transition-all duration-150 ease-linear"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};
