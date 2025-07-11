import React, { useState } from 'react';
import { shareService } from '../services/shareService';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  content: string;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onClose,
  fileName,
  content
}) => {
  const [shareSettings, setShareSettings] = useState({
    password: '',
    expiry: '1week' as '1week' | '1month' | 'unlimited',
    allowDownload: true
  });
  const [shareUrl, setShareUrl] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');

  const handleShare = async () => {
    setIsSharing(true);
    setError('');
    try {
      const response = await shareService.createShareLink({
        fileName,
        content,
        password: shareSettings.password || undefined,
        expiry: shareSettings.expiry,
        allowDownload: shareSettings.allowDownload
      });
      setShareUrl(response.url);
    } catch (error) {
      console.error('Failed to create share link:', error);
      setError('共有リンクの作成に失敗しました。Supabaseの設定を確認してください。');
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">ファイルを共有</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">共有するファイル</p>
            <p className="font-medium text-gray-900">{fileName}</p>
          </div>

          {!shareUrl ? (
            <>
              {/* パスワード設定 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード保護（オプション）
                </label>
                <input
                  type="password"
                  value={shareSettings.password}
                  onChange={(e) => setShareSettings({ ...shareSettings, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="パスワードを設定"
                />
              </div>

              {/* 有効期限 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  共有期限
                </label>
                <select
                  value={shareSettings.expiry}
                  onChange={(e) => setShareSettings({ ...shareSettings, expiry: e.target.value as '1week' | '1month' | 'unlimited' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1week">1週間</option>
                  <option value="1month">1ヶ月</option>
                  <option value="unlimited">無期限</option>
                </select>
              </div>

              {/* ダウンロード許可 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowDownload"
                  checked={shareSettings.allowDownload}
                  onChange={(e) => setShareSettings({ ...shareSettings, allowDownload: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="allowDownload" className="ml-2 block text-sm text-gray-700">
                  ダウンロードを許可
                </label>
              </div>
            </>
          ) : (
            /* 共有リンク表示 */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  共有リンク
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    コピー
                  </button>
                </div>
              </div>

              {shareSettings.password && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>パスワード:</strong> {shareSettings.password}
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    パスワードは別途共有してください
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <p className="text-sm text-blue-800">
                  このリンクは{shareSettings.expiry === '1week' ? '1週間' : shareSettings.expiry === '1month' ? '1ヶ月' : '無期限'}で有効です
                </p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            閉じる
          </button>
          {!shareUrl && (
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50"
            >
              {isSharing ? '共有リンクを作成中...' : '共有リンクを作成'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};