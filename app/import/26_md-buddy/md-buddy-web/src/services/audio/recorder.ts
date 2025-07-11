// 音声録音サービス

import {
  RecordingState,
  RecordingData,
  RecordingError,
  RecordingErrorCode,
  AudioChunk,
  RecorderConfig,
  StreamCallbacks,
  AudioDevice,
  DEFAULT_RECORDER_CONFIG,
  MAX_RECORDING_DURATION,
  MIN_RECORDING_DURATION,
  GEMINI_AUDIO_FORMAT
} from '../../types/audio';

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private chunks: AudioChunk[] = [];
  private state: RecordingState = RecordingState.IDLE;
  private startTime: Date | null = null;
  private config: RecorderConfig;
  private callbacks: StreamCallbacks;
  private recordingId: string = '';
  private recordingTimer: NodeJS.Timeout | null = null;
  private vadTimer: NodeJS.Timeout | null = null;
  private deviceInfo: AudioDevice | null = null;

  constructor(
    config: RecorderConfig = DEFAULT_RECORDER_CONFIG,
    callbacks: StreamCallbacks = {}
  ) {
    this.config = { ...DEFAULT_RECORDER_CONFIG, ...config };
    this.callbacks = callbacks;
  }

  // 録音デバイスの列挙
  static async getAudioDevices(): Promise<AudioDevice[]> {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      return devices
        .filter(device => device.kind === 'audioinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `マイク ${device.deviceId}`,
          kind: 'audioinput' as const,
          groupId: device.groupId
        }));
    } catch (error) {
      throw this.createError(
        RecordingErrorCode.PERMISSION_DENIED,
        'マイクへのアクセスが拒否されました'
      );
    }
  }

  // 録音の開始
  async start(deviceId?: string): Promise<void> {
    try {
      if (this.state === RecordingState.RECORDING) {
        throw this.createError(
          RecordingErrorCode.MEDIA_RECORDER_ERROR,
          '既に録音中です'
        );
      }

      this.setState(RecordingState.PREPARING);
      this.chunks = [];
      this.recordingId = this.generateRecordingId();

      // メディアストリームの取得
      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: { ideal: GEMINI_AUDIO_FORMAT.sampleRate }
        }
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      // デバイス情報の保存
      const tracks = this.mediaStream.getAudioTracks();
      if (tracks.length > 0) {
        const settings = tracks[0].getSettings();
        this.deviceInfo = {
          deviceId: settings.deviceId || '',
          label: tracks[0].label,
          kind: 'audioinput',
          groupId: settings.groupId || ''
        };
      }

      // Web Audio APIのセットアップ（音声解析用）
      this.setupAudioAnalyser();

      // MediaRecorderの初期化
      const options: MediaRecorderOptions = {
        mimeType: this.config.mimeType,
        audioBitsPerSecond: this.config.audioBitsPerSecond
      };

      this.mediaRecorder = new MediaRecorder(this.mediaStream, options);

      // イベントハンドラの設定
      this.setupEventHandlers();

      // 録音開始
      this.mediaRecorder.start(100); // 100msごとにデータを取得
      this.startTime = new Date();
      this.setState(RecordingState.RECORDING);

      // 最大録音時間のタイマー設定
      this.recordingTimer = setTimeout(() => {
        this.stop();
      }, MAX_RECORDING_DURATION * 1000);

      // VADの開始
      if (this.config.enableVAD) {
        this.startVoiceActivityDetection();
      }

    } catch (error: any) {
      this.handleError(error);
      throw error;
    }
  }

  // 録音の停止
  async stop(): Promise<RecordingData> {
    if (this.state !== RecordingState.RECORDING && this.state !== RecordingState.PAUSED) {
      throw this.createError(
        RecordingErrorCode.MEDIA_RECORDER_ERROR,
        '録音が開始されていません'
      );
    }

    this.setState(RecordingState.PROCESSING);

    // タイマーのクリア
    if (this.recordingTimer) {
      clearTimeout(this.recordingTimer);
      this.recordingTimer = null;
    }

    if (this.vadTimer) {
      clearInterval(this.vadTimer);
      this.vadTimer = null;
    }

    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.startTime) {
        reject(this.createError(
          RecordingErrorCode.MEDIA_RECORDER_ERROR,
          '録音状態が不正です'
        ));
        return;
      }

      // 停止時のハンドラ
      this.mediaRecorder.onstop = () => {
        const endTime = new Date();
        const duration = (endTime.getTime() - this.startTime!.getTime()) / 1000;

        // 最小録音時間のチェック
        if (duration < MIN_RECORDING_DURATION) {
          this.cleanup();
          reject(this.createError(
            RecordingErrorCode.MEDIA_RECORDER_ERROR,
            `録音時間が短すぎます（最小${MIN_RECORDING_DURATION}秒）`
          ));
          return;
        }

        // チャンクからBlobを作成
        const blob = new Blob(
          this.chunks.map(chunk => chunk.data),
          { type: this.config.mimeType || 'audio/webm;codecs=opus' }
        );

        const recordingData: RecordingData = {
          id: this.recordingId,
          startTime: this.startTime!,
          endTime,
          duration,
          chunks: this.chunks,
          blob, // Blobを追加
          format: {
            sampleRate: this.deviceInfo?.groupId ? 48000 : 44100, // デフォルト値
            channels: 1,
            bitDepth: 16,
            encoding: 'opus'
          },
          deviceInfo: this.deviceInfo || undefined,
          metadata: {
            language: 'ja-JP'
          }
        };

        this.cleanup();
        this.setState(RecordingState.IDLE);
        resolve(recordingData);
      };

      // 録音停止
      this.mediaRecorder.stop();
    });
  }

  // 一時停止
  pause(): void {
    if (this.state !== RecordingState.RECORDING) {
      throw this.createError(
        RecordingErrorCode.MEDIA_RECORDER_ERROR,
        '録音中ではありません'
      );
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.setState(RecordingState.PAUSED);
    }
  }

  // 再開
  resume(): void {
    if (this.state !== RecordingState.PAUSED) {
      throw this.createError(
        RecordingErrorCode.MEDIA_RECORDER_ERROR,
        '一時停止中ではありません'
      );
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.setState(RecordingState.RECORDING);
    }
  }

  // 現在の状態を取得
  getState(): RecordingState {
    return this.state;
  }

  // 録音時間を取得（秒）
  getDuration(): number {
    if (!this.startTime) return 0;
    const now = new Date();
    return (now.getTime() - this.startTime.getTime()) / 1000;
  }

  // プライベートメソッド

  private setupEventHandlers(): void {
    if (!this.mediaRecorder) return;

    // データ取得時
    this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const chunk: AudioChunk = {
            data: reader.result as ArrayBuffer,
            timestamp: Date.now()
          };
          this.chunks.push(chunk);
          
          if (this.callbacks.onChunk) {
            this.callbacks.onChunk(chunk);
          }
        };
        reader.readAsArrayBuffer(event.data);
      }
    };

    // エラー時
    this.mediaRecorder.onerror = (event: Event) => {
      this.handleError(new Error('MediaRecorderエラー'));
    };
  }

  private setupAudioAnalyser(): void {
    if (!this.mediaStream) return;

    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaStreamSource(this.mediaStream);
    
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 2048;
    this.analyserNode.smoothingTimeConstant = 0.8;
    
    source.connect(this.analyserNode);
  }

  private startVoiceActivityDetection(): void {
    if (!this.analyserNode || !this.config.enableVAD) return;

    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
    
    this.vadTimer = setInterval(() => {
      this.analyserNode!.getByteFrequencyData(dataArray);
      
      // 音声レベルの計算
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      const normalizedLevel = average / 255;

      // レベルコールバック
      if (this.callbacks.onLevel) {
        this.callbacks.onLevel(normalizedLevel);
      }

      // VAD判定
      if (this.callbacks.onVAD) {
        const isSpeaking = normalizedLevel > (this.config.vadThreshold || 0.05);
        this.callbacks.onVAD({
          isSpeaking,
          confidence: normalizedLevel > 0.1 ? 0.9 : 0.5,
          energyLevel: normalizedLevel,
          timestamp: Date.now()
        });
      }
    }, 50); // 50msごとに解析
  }

  private setState(state: RecordingState): void {
    this.state = state;
  }

  private cleanup(): void {
    // MediaRecorderの停止
    if (this.mediaRecorder) {
      this.mediaRecorder.onstop = null;
      this.mediaRecorder.ondataavailable = null;
      this.mediaRecorder.onerror = null;
      this.mediaRecorder = null;
    }

    // MediaStreamの停止
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    // Web Audio APIのクリーンアップ
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.analyserNode = null;
    }

    // タイマーのクリア
    if (this.recordingTimer) {
      clearTimeout(this.recordingTimer);
      this.recordingTimer = null;
    }

    if (this.vadTimer) {
      clearInterval(this.vadTimer);
      this.vadTimer = null;
    }

    // 状態のリセット
    this.chunks = [];
    this.startTime = null;
    this.deviceInfo = null;
  }

  private handleError(error: any): void {
    const recordingError = this.parseError(error);
    
    if (this.callbacks.onError) {
      this.callbacks.onError(recordingError);
    }

    this.cleanup();
    this.setState(RecordingState.ERROR);
  }

  private parseError(error: any): RecordingError {
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      return this.createError(
        RecordingErrorCode.PERMISSION_DENIED,
        'マイクへのアクセスが拒否されました'
      );
    }

    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return this.createError(
        RecordingErrorCode.DEVICE_NOT_FOUND,
        'マイクが見つかりません'
      );
    }

    return this.createError(
      RecordingErrorCode.UNKNOWN_ERROR,
      error.message || '不明なエラーが発生しました'
    );
  }

  private static createError(
    code: RecordingErrorCode,
    message: string,
    details?: any
  ): RecordingError {
    return { code, message, details };
  }

  private generateRecordingId(): string {
    return `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// シングルトンインスタンスのエクスポート
export const audioRecorder = new AudioRecorder();