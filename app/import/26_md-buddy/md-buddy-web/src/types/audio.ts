// 音声処理関連の型定義

// 音声録音の状態
export enum RecordingState {
  IDLE = 'idle',
  PREPARING = 'preparing',
  RECORDING = 'recording',
  PROCESSING = 'processing',
  PAUSED = 'paused',
  ERROR = 'error'
}

// 音声フォーマット設定
export interface AudioFormatConfig {
  sampleRate: number;      // サンプリングレート (Hz)
  channels: number;        // チャンネル数 (1: mono, 2: stereo)
  bitDepth: number;        // ビット深度 (16, 24, 32)
  encoding: 'pcm' | 'opus' | 'webm';
}

// Gemini用の音声フォーマット
export const GEMINI_AUDIO_FORMAT: AudioFormatConfig = {
  sampleRate: 16000,      // 16kHz
  channels: 1,            // モノラル
  bitDepth: 16,          // 16ビット
  encoding: 'pcm'
};

// MediaRecorder設定
export interface RecorderConfig {
  mimeType?: string;
  audioBitsPerSecond?: number;
  // Voice Activity Detection設定
  enableVAD?: boolean;
  vadThreshold?: number;
  vadDebounceTime?: number;
}

// 録音デバイス情報
export interface AudioDevice {
  deviceId: string;
  label: string;
  kind: 'audioinput' | 'audiooutput';
  groupId: string;
}

// 音声チャンク
export interface AudioChunk {
  data: ArrayBuffer;
  timestamp: number;
  duration?: number;
}

// 音声録音データ
export interface RecordingData {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;          // 秒単位
  chunks: AudioChunk[];
  format: AudioFormatConfig;
  deviceInfo?: AudioDevice;
  blob?: Blob;              // 元のBlobデータ
  metadata?: {
    fileName?: string;
    description?: string;
    language?: string;
  };
}

// 音声処理結果
export interface ProcessedAudio {
  id: string;
  originalData: RecordingData;
  processedBuffer: ArrayBuffer;  // 16kHz PCM変換後のデータ
  buffer: ArrayBuffer;          // 互換性のためのエイリアス
  duration: number;             // 秒単位の長さ
  format: AudioFormatConfig;
  waveformData?: Float32Array;   // 波形表示用データ
  metadata: {
    peakLevel: number;           // ピークレベル (0-1)
    averageLevel: number;        // 平均レベル (0-1)
    silenceRatio: number;        // 無音部分の比率 (0-1)
  };
}

// 録音エラー
export interface RecordingError {
  code: RecordingErrorCode;
  message: string;
  details?: any;
}

export enum RecordingErrorCode {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  DEVICE_NOT_FOUND = 'DEVICE_NOT_FOUND',
  MEDIA_RECORDER_ERROR = 'MEDIA_RECORDER_ERROR',
  PROCESSING_ERROR = 'PROCESSING_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Voice Activity Detection (VAD) 結果
export interface VADResult {
  isSpeaking: boolean;
  confidence: number;        // 0-1
  energyLevel: number;       // 0-1
  timestamp: number;
}

// オーディオ解析結果
export interface AudioAnalysis {
  duration: number;          // 秒
  sampleRate: number;
  channels: number;
  bitDepth: number;
  peakAmplitude: number;     // 0-1
  rms: number;               // Root Mean Square
  frequencySpectrum?: Float32Array;
  dominantFrequency?: number;
}

// ストリーム処理コールバック
export interface StreamCallbacks {
  onChunk?: (chunk: AudioChunk) => void;
  onVAD?: (result: VADResult) => void;
  onLevel?: (level: number) => void;
  onError?: (error: RecordingError) => void;
}

// 音声ファイルメタデータ
export interface AudioFileMetadata {
  fileName: string;
  fileSize: number;          // バイト
  mimeType: string;
  duration: number;          // 秒
  format: AudioFormatConfig;
  createdAt: Date;
  modifiedAt?: Date;
  hash?: string;             // ファイルのハッシュ値
}

// 音声変換オプション
export interface ConversionOptions {
  targetFormat: AudioFormatConfig;
  trimSilence?: boolean;
  normalizeVolume?: boolean;
  noiseReduction?: boolean;
  fadeIn?: number;           // ミリ秒
  fadeOut?: number;          // ミリ秒
}

// リアルタイム音声ストリーム
export interface AudioStream {
  id: string;
  state: 'active' | 'paused' | 'stopped';
  format: AudioFormatConfig;
  startTime: Date;
  bytesProcessed: number;
  packetsProcessed: number;
}

// 音声処理の進捗情報
export interface ProcessingProgress {
  stage: 'recording' | 'converting' | 'uploading' | 'analyzing';
  progress: number;          // 0-100
  message?: string;
  estimatedTimeRemaining?: number;  // 秒
}

// 音声メモリバッファ管理
export interface AudioBufferManager {
  maxBufferSize: number;     // 最大バッファサイズ（バイト）
  currentSize: number;       // 現在のバッファサイズ
  chunkSize: number;         // チャンクサイズ
  overflowStrategy: 'drop-oldest' | 'drop-newest' | 'pause';
}

// Web Audio API関連
export interface AudioNodeConfig {
  gainValue?: number;
  filterType?: BiquadFilterType;
  filterFrequency?: number;
  compressorThreshold?: number;
  compressorRatio?: number;
}

// 音声セッション設定
export interface AudioSessionConfig {
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  autoGainControl?: boolean;
  sampleRate?: number;
  channelCount?: number;
  latencyHint?: 'interactive' | 'balanced' | 'playback';
}

// エクスポート用の定数
export const DEFAULT_RECORDER_CONFIG: RecorderConfig = {
  mimeType: 'audio/webm;codecs=opus',
  audioBitsPerSecond: 128000,
  enableVAD: true,
  vadThreshold: 0.05,
  vadDebounceTime: 300
};

export const SUPPORTED_AUDIO_FORMATS = [
  'audio/webm',
  'audio/ogg',
  'audio/wav',
  'audio/mp4',
  'audio/mpeg'
];

export const MAX_RECORDING_DURATION = 600; // 10分（秒）
export const MIN_RECORDING_DURATION = 1;   // 1秒