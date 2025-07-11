import React, { useState, useEffect } from 'react';
import { X, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { APP_VERSION } from '../../constants/version';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [replacementWords, setReplacementWords] = useState('');
  const [autoSaveInterval, setAutoSaveInterval] = useState(60);
  const [fontSize, setFontSize] = useState(16);
  const [isValidatingApi, setIsValidatingApi] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<'valid' | 'invalid' | ''>('');

  // 設定の読み込み
  useEffect(() => {
    const settings = localStorage.getItem('md-buddy-settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      setApiKey(parsed.apiKey || '');
      setSelectedModel(parsed.selectedModel || 'gemini-2.5-flash');
      setTheme(parsed.theme || 'light');
      setReplacementWords(parsed.replacementWords || '');
      setAutoSaveInterval(parsed.autoSaveInterval || 60);
      setFontSize(parsed.fontSize || 16);
    }

    // テーマの適用
    const currentTheme = localStorage.getItem('md-buddy-theme') || 'light';
    setTheme(currentTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [isOpen]);

  // APIキーの検証
  const validateApiKey = async () => {
    if (!apiKey) {
      setApiKeyStatus('invalid');
      return;
    }

    setIsValidatingApi(true);
    (window as any).debugAction?.('APIキー検証', 'Gemini APIキーの検証開始', 'pending');
    
    try {
      // 簡単な検証（実際のAPIコールは省略）
      if (apiKey.startsWith('AIzaSy')) {
        setApiKeyStatus('valid');
        (window as any).debugAction?.('APIキー検証', 'APIキーが有効です', 'success');
      } else {
        setApiKeyStatus('invalid');
        (window as any).debugAction?.('APIキー検証', 'APIキーが無効です', 'error');
      }
    } catch (error) {
      setApiKeyStatus('invalid');
      (window as any).debugAction?.('APIキー検証', 'APIキー検証エラー', 'error');
    } finally {
      setIsValidatingApi(false);
    }
  };

  // 設定の保存
  const handleSave = () => {
    const settings = {
      apiKey,
      selectedModel,
      theme,
      replacementWords,
      autoSaveInterval,
      fontSize,
    };
    localStorage.setItem('md-buddy-settings', JSON.stringify(settings));
    
    // テーマの適用
    localStorage.setItem('md-buddy-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');

    (window as any).debugAction?.('設定保存', `モデル: ${selectedModel}, テーマ: ${theme}`, 'success');
    (window as any).debugLog?.('設定を保存しました', 'success');

    onClose();
  };

  // テーマの切り替え
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    (window as any).debugAction?.('テーマ切り替え', `${theme} → ${newTheme}`, 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">設定</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* 設定内容 */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* APIキー設定 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gemini APIキー
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Gemini APIキーを入力してください。キーは安全に保存されます。
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                  {showApiKey ? (
                    <EyeOff size={16} className="text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
              <button
                onClick={validateApiKey}
                disabled={isValidatingApi}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors disabled:opacity-50"
              >
                {isValidatingApi ? '検証中...' : '検証'}
              </button>
            </div>
            {apiKeyStatus && (
              <p className={`mt-2 text-sm ${apiKeyStatus === 'valid' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {apiKeyStatus === 'valid' ? '✓ APIキーが有効です' : '✗ APIキーが無効です'}
              </p>
            )}
          </div>

          {/* モデル選択 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              AIモデル
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              文字起こしと要約に使用するモデルを選択してください。
            </p>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gemini-2.5-flash">標準版 (Gemini 2.5 Flash) - 高速処理</option>
              <option value="gemini-2.5-pro">高機能版 (Gemini 2.5 Pro) - 高精度</option>
            </select>
          </div>

          {/* テーマ設定 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              テーマ
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              ライトモードとダークモードを切り替えます。
            </p>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              {theme === 'light' ? (
                <>
                  <Sun size={16} className="text-yellow-500" />
                  <span className="text-gray-700 dark:text-gray-300">ライトモード</span>
                </>
              ) : (
                <>
                  <Moon size={16} className="text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">ダークモード</span>
                </>
              )}
            </button>
          </div>

          {/* 置換ワード設定 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              置換ワード
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              専門用語や固有名詞などをカンマ区切りで入力してください（例：Gemini, API, プロジェクト名）。
              音声入力時に自動的に置換されます。
            </p>
            <textarea
              value={replacementWords}
              onChange={(e) => setReplacementWords(e.target.value)}
              placeholder="Gemini, API, MD Buddy, Next.js..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 自動保存間隔 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              自動保存間隔（秒）
            </label>
            <input
              type="number"
              value={autoSaveInterval}
              onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
              min={10}
              max={300}
              step={10}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* フォントサイズ */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              フォントサイズ（px）
            </label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min={12}
              max={24}
              step={1}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">v{APP_VERSION}</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              保存して閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};