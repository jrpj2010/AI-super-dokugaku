// 音声入力コンポーネント

import React, { useState, useEffect, useRef } from 'react';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { RecordingState } from '../types/audio';
import { ProcessedAudio } from '../types/audio';

interface VoiceInputProps {
  onRecordingComplete: (audio: ProcessedAudio) => void;
  onError?: (error: Error) => void;
  maxDuration?: number;
  className?: string;
  compact?: boolean;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onRecordingComplete,
  onError,
  maxDuration = 300, // 5分
  className = '',
  compact = false,
}) => {
  const voiceRecordingOptions = {
    maxDuration,
    onRecordingComplete,
    onError: onError ? (err: any) => onError(new Error(err.message)) : undefined,
  };

  const {
    recordingState,
    recordingDuration,
    audioLevel,
    error,
    availableDevices,
    selectedDevice,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    selectDevice,
  } = useVoiceRecording(voiceRecordingOptions);

  const [showDeviceSelector, setShowDeviceSelector] = useState(false);
  const animationFrameRef = useRef<number>();

  // 音声レベルのビジュアライゼーション
  useEffect(() => {
    const updateVisualizer = () => {
      const visualizer = document.getElementById('audio-visualizer');
      if (visualizer && recordingState === RecordingState.RECORDING) {
        visualizer.style.transform = `scale(${1 + audioLevel * 0.5})`;
        visualizer.style.opacity = `${0.5 + audioLevel * 0.5}`;
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    if (recordingState === RecordingState.RECORDING) {
      updateVisualizer();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [recordingState, audioLevel]);

  // 録音時間のフォーマット
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 録音ボタンのクリックハンドラ
  const handleRecordClick = async () => {
    if (recordingState === RecordingState.IDLE) {
      await startRecording();
    } else if (recordingState === RecordingState.RECORDING) {
      await stopRecording();
    }
  };

  // エラー表示
  if (error) {
    return (
      <div className={`voice-input-error ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">
            <span className="font-semibold">エラー:</span> {error.message}
          </p>
          <button
            onClick={resetRecording}
            className="mt-2 text-red-600 underline text-sm hover:text-red-700"
          >
            リセット
          </button>
        </div>
      </div>
    );
  }

  // コンパクトモード
  if (compact) {
    return (
      <div className={`voice-input-compact ${className}`}>
        <button
          onClick={handleRecordClick}
          disabled={recordingState === RecordingState.PROCESSING}
          className={`
            relative p-3 rounded-full transition-all duration-200
            ${recordingState === RecordingState.RECORDING
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : recordingState === RecordingState.PROCESSING
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
            }
          `}
          title={recordingState === RecordingState.RECORDING ? '録音停止' : '録音開始'}
        >
          {recordingState === RecordingState.RECORDING ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <rect x="6" y="6" width="8" height="8" />
            </svg>
          ) : recordingState === RecordingState.PROCESSING ? (
            <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  // 通常モード
  return (
    <div className={`voice-input ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">音声入力</h3>
          {availableDevices.length > 1 && (
            <button
              onClick={() => setShowDeviceSelector(!showDeviceSelector)}
              className="text-gray-500 hover:text-gray-700"
              title="録音デバイスを選択"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>

        {/* デバイスセレクター */}
        {showDeviceSelector && availableDevices.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <label className="text-sm font-medium text-gray-700">録音デバイス:</label>
            <select
              value={selectedDevice?.deviceId || ''}
              onChange={(e) => {
                const device = availableDevices.find(d => d.deviceId === e.target.value);
                if (device) selectDevice(device);
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {availableDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* メインコントロール */}
        <div className="flex flex-col items-center">
          {/* 録音ボタン */}
          <div className="relative mb-4">
            <button
              onClick={handleRecordClick}
              disabled={recordingState === RecordingState.PROCESSING}
              className={`
                relative w-24 h-24 rounded-full transition-all duration-200 focus:outline-none focus:ring-4
                ${recordingState === RecordingState.RECORDING
                  ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300'
                  : recordingState === RecordingState.PROCESSING
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
                }
              `}
            >
              {/* ビジュアライザー */}
              <div
                id="audio-visualizer"
                className={`
                  absolute inset-0 rounded-full transition-all duration-100
                  ${recordingState === RecordingState.RECORDING ? 'bg-red-400' : 'bg-transparent'}
                `}
                style={{ transformOrigin: 'center' }}
              />
              
              {/* アイコン */}
              <div className="relative z-10 flex items-center justify-center">
                {recordingState === RecordingState.RECORDING ? (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <rect x="6" y="6" width="8" height="8" />
                  </svg>
                ) : recordingState === RecordingState.PROCESSING ? (
                  <svg className="w-10 h-10 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          </div>

          {/* ステータステキスト */}
          <div className="text-center mb-4">
            {recordingState === RecordingState.IDLE && (
              <p className="text-gray-600">クリックして録音を開始</p>
            )}
            {recordingState === RecordingState.RECORDING && (
              <p className="text-red-600 font-medium">録音中...</p>
            )}
            {recordingState === RecordingState.PROCESSING && (
              <p className="text-gray-600">処理中...</p>
            )}
            {recordingState === RecordingState.PAUSED && (
              <p className="text-yellow-600">一時停止中</p>
            )}
          </div>

          {/* 録音時間 */}
          {(recordingState === RecordingState.RECORDING || recordingState === RecordingState.PAUSED) && (
            <div className="mb-4">
              <div className="text-2xl font-mono text-gray-800">
                {formatDuration(recordingDuration)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                最大 {formatDuration(maxDuration)}
              </div>
            </div>
          )}

          {/* 一時停止/再開ボタン */}
          {recordingState === RecordingState.RECORDING && (
            <button
              onClick={pauseRecording}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              一時停止
            </button>
          )}
          {recordingState === RecordingState.PAUSED && (
            <div className="flex gap-4">
              <button
                onClick={resumeRecording}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                再開
              </button>
              <button
                onClick={stopRecording}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                停止
              </button>
            </div>
          )}
        </div>

        {/* 音声レベルインジケーター */}
        {recordingState === RecordingState.RECORDING && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>音声レベル</span>
              <span>{Math.round(audioLevel * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-100"
                style={{ width: `${audioLevel * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};