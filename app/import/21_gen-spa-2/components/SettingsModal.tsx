import React, { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { AVAILABLE_MODELS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">⚙️ 設定</h2>
        
        <div className="space-y-4">
          {/* APIキー設定 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gemini APIキー（オプション）
            </label>
            <input
              type="password"
              value={localSettings.apiKey || ''}
              onChange={(e) => setLocalSettings({ ...localSettings, apiKey: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="AIzaSy..."
            />
            <p className="mt-1 text-xs text-gray-500">
              ※ 空欄の場合はサーバー側の設定を使用します
            </p>
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              APIキーの取得はこちら →
            </a>
          </div>

          {/* モデル選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              AIモデル
            </label>
            <select
              value={localSettings.selectedModel}
              onChange={(e) => setLocalSettings({ ...localSettings, selectedModel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {AVAILABLE_MODELS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* デバッグモード */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={localSettings.debugMode}
                onChange={(e) => setLocalSettings({ ...localSettings, debugMode: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                デバッグモード（API通信ログを表示）
              </span>
            </label>
            <p className="mt-1 text-xs text-gray-500 ml-6">
              APIの動作状況をリアルタイムで確認できます
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};