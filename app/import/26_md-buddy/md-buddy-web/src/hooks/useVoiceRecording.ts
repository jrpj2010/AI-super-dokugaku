// 音声録音の状態管理カスタムフック

import { useState, useCallback, useRef, useEffect } from 'react';
import { AudioRecorder } from '../services/audio/recorder';
import { audioProcessor } from '../services/audio/processor';
import {
  RecordingState,
  RecordingData,
  ProcessedAudio,
  RecordingError,
  VADResult,
  AudioDevice,
  ConversionOptions
} from '../types/audio';

// フックの戻り値の型定義
interface UseVoiceRecordingReturn {
  // 状態
  recordingState: RecordingState;
  isRecording: boolean; // App.tsxとの互換性のため追加
  recordingDuration: number;
  audioLevel: number;
  vadResult: VADResult | null;
  error: RecordingError | null;
  availableDevices: AudioDevice[];
  selectedDevice: AudioDevice | null;
  
  // 録音データ
  recordingData: RecordingData | null;
  processedAudio: ProcessedAudio | null;
  audioBlob: Blob | null; // App.tsxとの互換性のため追加
  
  // アクション
  startRecording: (deviceId?: string) => Promise<void>;
  stopRecording: () => Promise<ProcessedAudio | null>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  resetRecording: () => void;
  selectDevice: (device: AudioDevice) => void;
  refreshDevices: () => Promise<void>;
  
  // 処理オプション
  setConversionOptions: (options: Partial<ConversionOptions>) => void;
}

// フックのオプション
interface UseVoiceRecordingOptions {
  autoStart?: boolean;
  maxDuration?: number; // 秒
  enableVAD?: boolean;
  vadThreshold?: number;
  conversionOptions?: Partial<ConversionOptions>;
  onRecordingComplete?: (audio: ProcessedAudio) => void;
  onError?: (error: RecordingError) => void;
}

export function useVoiceRecording(
  options: UseVoiceRecordingOptions = {}
): UseVoiceRecordingReturn {
  // 状態管理
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.IDLE);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [vadResult, setVadResult] = useState<VADResult | null>(null);
  const [error, setError] = useState<RecordingError | null>(null);
  const [availableDevices, setAvailableDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
  const [recordingData, setRecordingData] = useState<RecordingData | null>(null);
  const [processedAudio, setProcessedAudio] = useState<ProcessedAudio | null>(null);
  const [conversionOptions, setConversionOptions] = useState<Partial<ConversionOptions>>(
    options.conversionOptions || {}
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  // Refs
  const recorderRef = useRef<AudioRecorder | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 初期化
  useEffect(() => {
    // デバイスリストの取得
    refreshDevices();

    // クリーンアップ
    return () => {
      if (recorderRef.current) {
        if (recorderRef.current.getState() === RecordingState.RECORDING) {
          recorderRef.current.stop().catch(() => {});
        }
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // 録音時間の更新
  useEffect(() => {
    if (recordingState === RecordingState.RECORDING) {
      durationIntervalRef.current = setInterval(() => {
        if (recorderRef.current) {
          const duration = recorderRef.current.getDuration();
          setRecordingDuration(duration);

          // 最大時間のチェック
          if (options.maxDuration && duration >= options.maxDuration) {
            stopRecording();
          }
        }
      }, 100);
    } else {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [recordingState, options.maxDuration]);

  // デバイスリストの更新
  const refreshDevices = useCallback(async () => {
    try {
      const devices = await AudioRecorder.getAudioDevices();
      setAvailableDevices(devices);
      
      // デフォルトデバイスを選択
      if (devices.length > 0 && !selectedDevice) {
        setSelectedDevice(devices[0]);
      }
    } catch (err: any) {
      setError(err);
      if (options.onError) {
        options.onError(err);
      }
    }
  }, [selectedDevice, options.onError]);

  // デバイスの選択
  const selectDevice = useCallback((device: AudioDevice) => {
    setSelectedDevice(device);
  }, []);

  // 録音開始
  const startRecording = useCallback(async (deviceId?: string) => {
    try {
      setError(null);
      setRecordingDuration(0);
      setRecordingData(null);
      setProcessedAudio(null);

      // レコーダーの作成
      recorderRef.current = new AudioRecorder(
        {
          enableVAD: options.enableVAD ?? true,
          vadThreshold: options.vadThreshold ?? 0.05,
        },
        {
          onLevel: setAudioLevel,
          onVAD: setVadResult,
          onError: (err) => {
            setError(err);
            setRecordingState(RecordingState.ERROR);
            if (options.onError) {
              options.onError(err);
            }
          },
        }
      );

      // 録音開始
      const targetDeviceId = deviceId || selectedDevice?.deviceId;
      await recorderRef.current.start(targetDeviceId);
      setRecordingState(RecordingState.RECORDING);

    } catch (err: any) {
      setError(err);
      setRecordingState(RecordingState.ERROR);
      if (options.onError) {
        options.onError(err);
      }
      throw err;
    }
  }, [selectedDevice, options]);

  // 録音停止
  const stopRecording = useCallback(async (): Promise<ProcessedAudio | null> => {
    if (!recorderRef.current) {
      return null;
    }

    try {
      setRecordingState(RecordingState.PROCESSING);

      // 録音データの取得
      const data = await recorderRef.current.stop();
      setRecordingData(data);

      // Blobも設定（App.tsxとの互換性のため）
      if (data.blob) {
        setAudioBlob(data.blob);
      }

      // 音声処理（16kHz PCM変換など）
      const processed = await audioProcessor.convertToGeminiFormat(
        data,
        conversionOptions
      );
      setProcessedAudio(processed);

      // 完了コールバック
      if (options.onRecordingComplete) {
        options.onRecordingComplete(processed);
      }

      setRecordingState(RecordingState.IDLE);
      return processed;

    } catch (err: any) {
      setError(err);
      setRecordingState(RecordingState.ERROR);
      if (options.onError) {
        options.onError(err);
      }
      return null;
    } finally {
      recorderRef.current = null;
    }
  }, [conversionOptions, options]);

  // 一時停止
  const pauseRecording = useCallback(() => {
    if (recorderRef.current && recordingState === RecordingState.RECORDING) {
      recorderRef.current.pause();
      setRecordingState(RecordingState.PAUSED);
    }
  }, [recordingState]);

  // 再開
  const resumeRecording = useCallback(() => {
    if (recorderRef.current && recordingState === RecordingState.PAUSED) {
      recorderRef.current.resume();
      setRecordingState(RecordingState.RECORDING);
    }
  }, [recordingState]);

  // リセット
  const resetRecording = useCallback(() => {
    if (recorderRef.current) {
      if (recorderRef.current.getState() === RecordingState.RECORDING) {
        recorderRef.current.stop().catch(() => {});
      }
      recorderRef.current = null;
    }

    setRecordingState(RecordingState.IDLE);
    setRecordingDuration(0);
    setAudioLevel(0);
    setVadResult(null);
    setError(null);
    setRecordingData(null);
    setProcessedAudio(null);
    setAudioBlob(null);
  }, []);

  // isRecordingの計算
  const isRecording = recordingState === RecordingState.RECORDING;

  return {
    // 状態
    recordingState,
    isRecording, // App.tsxとの互換性のため追加
    recordingDuration,
    audioLevel,
    vadResult,
    error,
    availableDevices,
    selectedDevice,
    
    // 録音データ
    recordingData,
    processedAudio,
    audioBlob, // App.tsxとの互換性のため追加
    
    // アクション
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    selectDevice,
    refreshDevices,
    
    // 処理オプション
    setConversionOptions,
  };
}

// 簡易版フック（基本的な録音機能のみ）
export function useSimpleVoiceRecording(
  onComplete?: (audio: ProcessedAudio) => void
) {
  const {
    recordingState,
    recordingDuration,
    audioLevel,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useVoiceRecording({
    onRecordingComplete: onComplete,
  });

  const isRecording = recordingState === RecordingState.RECORDING;
  const isProcessing = recordingState === RecordingState.PROCESSING;

  const toggleRecording = useCallback(async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    isProcessing,
    duration: recordingDuration,
    level: audioLevel,
    error,
    toggleRecording,
    reset: resetRecording,
  };
}