import React, { useState, useEffect } from 'react';
import { Cog6ToothIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon, EyeIcon, EyeSlashIcon } from './icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySave: (apiKey: string) => void;
  currentApiKey: string | null;
}

const YOUTUBE_API_KEY_STORAGE_KEY = 'youtube_api_key';

export const getApiKey = (): string | null => {
  return localStorage.getItem(YOUTUBE_API_KEY_STORAGE_KEY);
};

export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(YOUTUBE_API_KEY_STORAGE_KEY, apiKey);
};

export const removeApiKey = (): void => {
  localStorage.removeItem(YOUTUBE_API_KEY_STORAGE_KEY);
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onApiKeySave, currentApiKey }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(currentApiKey || '');
      setShowApiKey(false);
    }
  }, [isOpen, currentApiKey]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      alert('APIキーを入力してください。 (Please enter an API key.)');
      return;
    }

    setIsSaving(true);
    try {
      saveApiKey(apiKey.trim());
      onApiKeySave(apiKey.trim());
      alert('APIキーが保存されました。 (API key has been saved.)');
      onClose();
    } catch (error) {
      console.error('Error saving API key:', error);
      alert('APIキーの保存に失敗しました。 (Failed to save API key.)');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = () => {
    if (confirm('APIキーを削除しますか？ (Do you want to remove the API key?)')) {
      removeApiKey();
      onApiKeySave('');
      setApiKey('');
      alert('APIキーが削除されました。 (API key has been removed.)');
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 id="settings-modal-title" className="text-xl font-semibold text-blue-400 flex items-center">
            <Cog6ToothIcon className="w-6 h-6 mr-2" />
            設定 (Settings)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-100 p-1 rounded-full hover:bg-gray-700"
            aria-label="Close settings modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* API Key Input Section */}
        <div className="mb-6">
          <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-300 mb-2">
            YouTube Data API v3 キー (YouTube Data API v3 Key) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              id="api-key-input"
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (Google Cloud ConsoleからAPIキーを取得してください)"
              className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSaving}
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
            >
              {showApiKey ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Google Cloud Consoleでプロジェクトを作成し、YouTube Data API v3を有効化してAPIキーを取得してください。
          </p>
        </div>

        <div className="mb-6 p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-md text-red-200">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0 text-red-400" />
            <div>
              <h4 className="font-semibold text-red-300">セキュリティ警告 (Security Warning)</h4>
              <p className="text-sm leading-relaxed mt-1">
                APIキーはブラウザのローカルストレージに保存されます。これはセキュリティリスクを伴います。
                本番環境では、APIキーをバックエンドサーバーで管理することを強く推奨します。
              </p>
              <p className="text-xs text-gray-400 mt-2">
                (The API key will be stored in browser's localStorage. This poses security risks. In production, it's strongly recommended to manage API keys on a backend server.)
              </p>
            </div>
          </div>
        </div>


        <div className="mb-6 p-3 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-md text-blue-200">
          <div className="flex items-start">
            <InformationCircleIcon className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0 text-blue-400" />
            <div>
              <h4 className="font-semibold">APIキーの取得方法 (How to get API Key)</h4>
              <ol className="text-sm leading-relaxed mt-1 list-decimal list-inside space-y-1">
                <li>Google Cloud Console (console.cloud.google.com) にアクセス</li>
                <li>新しいプロジェクトを作成または既存のプロジェクトを選択</li>
                <li>「APIs & Services」→「Library」から「YouTube Data API v3」を検索・有効化</li>
                <li>「APIs & Services」→「Credentials」から「Create Credentials」→「API Key」を選択</li>
                <li>作成されたAPIキーをコピーして上記のフィールドに入力</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          {currentApiKey && (
            <button
              onClick={handleRemove}
              disabled={isSaving}
              className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              削除 (Remove)
            </button>
          )}
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            キャンセル (Cancel)
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !apiKey.trim()}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            {isSaving ? '保存中...' : '保存 (Save)'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;