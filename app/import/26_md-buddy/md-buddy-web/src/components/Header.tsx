// ヘッダーコンポーネント
import React from 'react';
import { Plus, Settings } from 'lucide-react';
import { APP_VERSION } from '../constants/version';

interface HeaderProps {
  onNewFile: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewFile,
  onOpenSettings
}) => {
  return (
    <header className="glass border-b border-white/20 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 左側: ロゴとタイトル */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 radius-unified shadow-interactive flex items-center justify-center" 
               style={{background: 'var(--bg-gradient-accent)'}}>
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-xl font-semibold text-white gradient-text">
            MD Buddy
          </h1>
          <span className="text-sm text-white/80 font-medium">
            爆速マークダウンエディター
          </span>
          <span className="text-xs text-white/60 ml-3 px-2 py-1 glass radius-unified">
            v{APP_VERSION}
          </span>
        </div>

        {/* 右側: アクションボタン */}
        <div className="flex items-center gap-3">
          {/* 新規作成ボタン */}
          <button
            onClick={onNewFile}
            className="flex items-center gap-2 px-5 py-3 radius-unified font-medium text-white transition-all shadow-interactive"
            style={{background: 'var(--bg-gradient-accent)'}}
            title="新規作成"
          >
            <Plus size={18} />
            <span>新規作成</span>
          </button>

          {/* 設定ボタン */}
          <button
            onClick={onOpenSettings}
            className="p-3 radius-unified glass hover:bg-white/20 transition-all shadow-interactive"
            title="設定"
          >
            <Settings size={20} className="text-white/80" />
          </button>
        </div>
      </div>
    </header>
  );
};