// 音声コントロールUI（シンプル版）
import React from 'react';

interface VoiceControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  audioLevel: number;
  onStart: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isRecording,
  isPaused,
  audioLevel,
  onStart,
  onStop,
  onPause,
  onResume,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      {/* 録音ボタン */}
      <button
        onClick={isRecording ? onStop : onStart}
        className={`
          px-6 py-3 rounded-full font-medium transition-all
          ${isRecording 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
      >
        {isRecording ? '停止' : '録音開始'}
      </button>

      {/* 一時停止/再開ボタン */}
      {isRecording && (
        <button
          onClick={isPaused ? onResume : onPause}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          {isPaused ? '再開' : '一時停止'}
        </button>
      )}

      {/* 音声レベル表示 */}
      {isRecording && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">音声レベル:</span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${audioLevel * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};