// AudioRecorderクラスのテスト

import { AudioRecorder, RecordingState, AudioFormat } from '../services/audio/audio-recorder';
import { AudioProcessorUtil } from '../utils/audio-processor';

// モックの設定
const mockMediaRecorder = {
  start: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  state: 'inactive' as RecordingState,
  ondataavailable: null as any,
  onstop: null as any,
  onerror: null as any
};

const mockMediaStream = {
  getTracks: jest.fn(() => [
    { stop: jest.fn(), kind: 'audio' }
  ])
};

const mockAnalyserNode = {
  fftSize: 0,
  frequencyBinCount: 128,
  getByteFrequencyData: jest.fn((array: Uint8Array) => {
    // シミュレートされた周波数データ
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.random() * 255;
    }
  }),
  connect: jest.fn(),
  disconnect: jest.fn()
};

const mockAudioContext = {
  createAnalyser: jest.fn(() => mockAnalyserNode),
  createMediaStreamSource: jest.fn(() => ({
    connect: jest.fn(),
    disconnect: jest.fn()
  })),
  state: 'running',
  close: jest.fn()
};

// グローバルモック
global.MediaRecorder = jest.fn(() => mockMediaRecorder) as any;
global.navigator.mediaDevices = {
  getUserMedia: jest.fn(() => Promise.resolve(mockMediaStream))
} as any;
global.AudioContext = jest.fn(() => mockAudioContext) as any;

describe('AudioRecorder', () => {
  let recorder: AudioRecorder;

  beforeEach(() => {
    jest.clearAllMocks();
    recorder = new AudioRecorder();
  });

  afterEach(() => {
    recorder.cleanup();
  });

  describe('初期化', () => {
    it('デフォルト設定で初期化される', () => {
      expect(recorder.getState()).toBe('inactive');
      expect(recorder.getCurrentTime()).toBe(0);
    });

    it('カスタム設定で初期化できる', () => {
      const customRecorder = new AudioRecorder({
        mimeType: 'audio/mp4',
        audioBitsPerSecond: 256000,
        sampleRate: 48000
      });
      
      expect(customRecorder).toBeDefined();
      customRecorder.cleanup();
    });
  });

  describe('録音開始', () => {
    it('正常に録音を開始できる', async () => {
      const onStart = jest.fn();
      recorder.on('start', onStart);

      await recorder.start();

      expect(global.navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000
        }
      });
      expect(mockMediaRecorder.start).toHaveBeenCalled();
      expect(onStart).toHaveBeenCalled();
      expect(recorder.getState()).toBe('recording');
    });

    it('マイクアクセスエラーを処理できる', async () => {
      const error = new Error('マイクアクセスが拒否されました');
      (global.navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValueOnce(error);

      const onError = jest.fn();
      recorder.on('error', onError);

      await expect(recorder.start()).rejects.toThrow('マイクアクセスが拒否されました');
      expect(onError).toHaveBeenCalledWith(error);
    });

    it('すでに録音中の場合はエラーを返す', async () => {
      await recorder.start();
      await expect(recorder.start()).rejects.toThrow('すでに録音中です');
    });
  });

  describe('録音停止', () => {
    beforeEach(async () => {
      await recorder.start();
    });

    it('正常に録音を停止できる', async () => {
      const onStop = jest.fn();
      recorder.on('stop', onStop);

      // MediaRecorderのondataavailableをシミュレート
      const mockBlob = new Blob([new ArrayBuffer(1000)], { type: 'audio/webm' });
      mockMediaRecorder.ondataavailable({ data: mockBlob } as any);

      await recorder.stop();

      expect(mockMediaRecorder.stop).toHaveBeenCalled();
      expect(onStop).toHaveBeenCalled();
      expect(recorder.getState()).toBe('inactive');
    });

    it('音声データを返す', async () => {
      const mockAudioData = new ArrayBuffer(1000);
      const mockBlob = new Blob([mockAudioData], { type: 'audio/webm' });
      
      // データ取得をシミュレート
      const stopPromise = recorder.stop();
      mockMediaRecorder.ondataavailable({ data: mockBlob } as any);
      mockMediaRecorder.onstop();
      
      const result = await stopPromise;
      
      expect(result).toBeDefined();
      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.duration).toBeGreaterThan(0);
    });
  });

  describe('一時停止と再開', () => {
    beforeEach(async () => {
      await recorder.start();
    });

    it('録音を一時停止できる', () => {
      const onPause = jest.fn();
      recorder.on('pause', onPause);

      recorder.pause();

      expect(mockMediaRecorder.pause).toHaveBeenCalled();
      expect(onPause).toHaveBeenCalled();
      expect(recorder.getState()).toBe('paused');
    });

    it('録音を再開できる', () => {
      recorder.pause();
      
      const onResume = jest.fn();
      recorder.on('resume', onResume);

      recorder.resume();

      expect(mockMediaRecorder.resume).toHaveBeenCalled();
      expect(onResume).toHaveBeenCalled();
      expect(recorder.getState()).toBe('recording');
    });

    it('録音中でない場合は一時停止できない', () => {
      recorder.stop();
      expect(() => recorder.pause()).toThrow('録音中ではありません');
    });
  });

  describe('音声レベル監視', () => {
    beforeEach(async () => {
      await recorder.start();
    });

    it('音声レベルを取得できる', () => {
      const level = recorder.getAudioLevel();
      expect(level).toBeGreaterThanOrEqual(0);
      expect(level).toBeLessThanOrEqual(1);
    });

    it('音声レベル変更イベントを発行する', (done) => {
      recorder.on('levelchange', (level: number) => {
        expect(level).toBeGreaterThanOrEqual(0);
        expect(level).toBeLessThanOrEqual(1);
        done();
      });

      // アニメーションフレームをシミュレート
      setTimeout(() => {
        (recorder as any).updateAudioLevel();
      }, 100);
    });
  });

  describe('ストリーミング', () => {
    it('ストリーミングモードで録音できる', async () => {
      const onDataAvailable = jest.fn();
      recorder.on('dataavailable', onDataAvailable);

      await recorder.start({ streaming: true, timeslice: 1000 });

      expect(mockMediaRecorder.start).toHaveBeenCalledWith(1000);
      
      // データ受信をシミュレート
      const mockBlob = new Blob([new ArrayBuffer(100)], { type: 'audio/webm' });
      mockMediaRecorder.ondataavailable({ data: mockBlob } as any);

      expect(onDataAvailable).toHaveBeenCalledWith(mockBlob);
    });
  });

  describe('フォーマット変換', () => {
    it('WebMからWAVに変換できる', async () => {
      const mockWebMData = new ArrayBuffer(1000);
      const mockWAVData = new ArrayBuffer(2000);
      
      jest.spyOn(AudioProcessorUtil, 'webmToWav').mockResolvedValueOnce(mockWAVData);

      await recorder.start();
      
      const stopPromise = recorder.stop({ format: AudioFormat.WAV });
      mockMediaRecorder.ondataavailable({ 
        data: new Blob([mockWebMData], { type: 'audio/webm' }) 
      } as any);
      mockMediaRecorder.onstop();
      
      const result = await stopPromise;
      
      expect(AudioProcessorUtil.webmToWav).toHaveBeenCalled();
      expect(result.blob.type).toBe('audio/wav');
    });
  });

  describe('エラーハンドリング', () => {
    it('MediaRecorderエラーを処理できる', async () => {
      const onError = jest.fn();
      recorder.on('error', onError);

      await recorder.start();
      
      const error = new Error('MediaRecorderエラー');
      mockMediaRecorder.onerror({ error } as any);

      expect(onError).toHaveBeenCalledWith(error);
    });

    it('ブラウザサポートを確認できる', () => {
      const isSupported = AudioRecorder.isSupported();
      expect(typeof isSupported).toBe('boolean');
    });

    it('利用可能なMIMEタイプを取得できる', () => {
      const mimeTypes = AudioRecorder.getSupportedMimeTypes();
      expect(Array.isArray(mimeTypes)).toBe(true);
    });
  });

  describe('クリーンアップ', () => {
    it('リソースを適切に解放する', async () => {
      await recorder.start();
      recorder.cleanup();

      expect(mockMediaStream.getTracks()[0].stop).toHaveBeenCalled();
      expect(mockAudioContext.close).toHaveBeenCalled();
      expect(recorder.getState()).toBe('inactive');
    });
  });

  describe('録音時間制限', () => {
    it('最大録音時間で自動停止する', async () => {
      jest.useFakeTimers();
      
      const onStop = jest.fn();
      recorder.on('stop', onStop);

      await recorder.start({ maxDuration: 5000 }); // 5秒制限

      // 5秒経過をシミュレート
      jest.advanceTimersByTime(5000);

      expect(mockMediaRecorder.stop).toHaveBeenCalled();
      
      jest.useRealTimers();
    });
  });

  describe('音声検出', () => {
    it('無音を検出できる', async () => {
      // 無音データをシミュレート
      mockAnalyserNode.getByteFrequencyData.mockImplementationOnce((array: Uint8Array) => {
        array.fill(0);
      });

      await recorder.start();
      
      const isSilent = (recorder as any).detectSilence();
      expect(isSilent).toBe(true);
    });

    it('音声を検出できる', async () => {
      // 音声データをシミュレート
      mockAnalyserNode.getByteFrequencyData.mockImplementationOnce((array: Uint8Array) => {
        array.fill(128);
      });

      await recorder.start();
      
      const isSilent = (recorder as any).detectSilence();
      expect(isSilent).toBe(false);
    });
  });
});