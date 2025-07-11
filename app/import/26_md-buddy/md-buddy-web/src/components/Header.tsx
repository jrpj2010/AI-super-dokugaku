// ヘッダーコンポーネント
import React from 'react';
import { Plus, Settings } from 'lucide-react';

interface HeaderProps {
  onNewFile: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewFile,
  onOpenSettings
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-2">
        {/* 左側: ロゴとタイトル */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            MD Buddy
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            爆速マークダウンエディター
          </span>
        </div>

        {/* 右側: アクションボタン */}
        <div className="flex items-center gap-2">
          {/* 新規作成ボタン */}
          <button
            onClick={onNewFile}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
            title="新規作成"
          >
            <Plus size={18} />
            <span>新規作成</span>
          </button>

          {/* 設定ボタン */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="設定"
          >
            <Settings size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};