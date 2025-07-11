// チャンク録音フック - 1分ごとに音声データを処理
import { useState, useRef, useCallback, useEffect } from 'react';
import { useVoiceRecording } from './useVoiceRecording';
import { getTranscriptionService } from '../services/gemini/voice-transcription';
import { GeminiModel } from '../types/gemini';

interface ChunkData {
  id: string;
  startTime: number;
  endTime: number;
  audioBlob: Blob;
  transcript?: string;
  isProcessing: boolean;
  error?: string;
}

interface UseChunkedRecordingOptions {
  chunkDuration?: number; // ミリ秒（デフォルト: 300000 = 5分）
  onChunkTranscribed?: (chunkId: string, transcript: string) => void;
  onError?: (error: Error) => void;
  model?: GeminiModel;
}

export function useChunkedRecording(options: UseChunkedRecordingOptions = {}) {
  const {
    chunkDuration = 300000, // 5分
    onChunkTranscribed,
    onError,
    model = GeminiModel.FLASH
  } = options;

  const [chunks, setChunks] = useState<ChunkData[]>([]);
  const [isChunkedRecording, setIsChunkedRecording] = useState(false);
  const [totalTranscript, setTotalTranscript] = useState('');
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [completeAudioBlob, setCompleteAudioBlob] = useState<Blob | undefined>();
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunkStartTimeRef = useRef<number>(0);
  const chunkBufferRef = useRef<Blob[]>([]);
  const chunkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordingStartTimeRef = useRef<number>(0);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioLevelIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // チャンクを処理
  const processChunk = useCallback(async (chunkData: ChunkData) => {
    (window as any).debugLog?.(`チャンク処理開始: ${chunkData.id}`, 'info');
    
    try {
      // チャンクの状態を更新（処理中）
      setChunks(prev => prev.map(c => 
        c.id === chunkData.id ? { ...c, isProcessing: true } : c
      ));

      // Base64に変換
      const reader = new FileReader();
      const base64Audio = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const result = reader.result?.toString().split(',')[1];
          if (result) resolve(result);
          else reject(new Error('Base64変換に失敗'));
        };
        reader.onerror = reject;
        reader.readAsDataURL(chunkData.audioBlob);
      });

      // 音声認識
      const transcriptionService = getTranscriptionService();
      const transcript = await transcriptionService.transcribeChunk(
        await chunkData.audioBlob.arrayBuffer(),
        totalTranscript.slice(-500), // 前の文脈を渡す
        { model, language: 'ja-JP' }
      );

      // チャンクの状態を更新（完了）
      setChunks(prev => prev.map(c => 
        c.id === chunkData.id ? { ...c, transcript, isProcessing: false } : c
      ));

      // 全体の転写結果に追加
      setTotalTranscript(prev => prev + ' ' + transcript);

      // コールバック実行
      if (onChunkTranscribed) {
        onChunkTranscribed(chunkData.id, transcript);
      }

      (window as any).debugLog?.(`チャンク処理完了: ${transcript.substring(0, 50)}...`, 'success');
    } catch (error: any) {
      (window as any).debugLog?.(`チャンク処理エラー: ${error.message}`, 'error');
      
      // チャンクの状態を更新（エラー）
      setChunks(prev => prev.map(c => 
        c.id === chunkData.id ? { ...c, error: error.message, isProcessing: false } : c
      ));

      if (onError) {
        onError(error);
      }
    }
  }, [model, totalTranscript, onChunkTranscribed, onError]);

  // チャンクを保存して処理
  const saveAndProcessChunk = useCallback(() => {
    if (chunkBufferRef.current.length === 0) return;

    const chunkBlob = new Blob(chunkBufferRef.current, { type: 'audio/webm' });
    const chunkData: ChunkData = {
      id: `chunk_${Date.now()}`,
      startTime: chunkStartTimeRef.current,
      endTime: Date.now(),
      audioBlob: chunkBlob,
      isProcessing: false
    };

    setChunks(prev => [...prev, chunkData]);
    processChunk(chunkData);

    // バッファをクリア
    chunkBufferRef.current = [];
    chunkStartTimeRef.current = Date.now();

    (window as any).debugLog?.(`新しいチャンクを作成: ${chunkData.id}`, 'info');
  }, [processChunk]);

  // 録音開始
  const startChunkedRecording = useCallback(async () => {
    try {
      (window as any).debugLog?.('チャンク録音を開始します', 'info');
      
      // マイクアクセス
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      streamRef.current = stream;

      // MediaRecorderの設定
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;

      // データ受信時の処理
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunkBufferRef.current.push(event.data);
        }
      };

      // 録音開始
      chunkStartTimeRef.current = Date.now();
      recordingStartTimeRef.current = Date.now();
      mediaRecorder.start(1000); // 1秒ごとにデータを取得

      // 音声レベル監視の設定
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      // 音声レベルの監視
      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // 平均音量を計算
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const normalizedLevel = Math.min(100, Math.floor((average / 255) * 100 * 2));
        setAudioLevel(normalizedLevel);
      };

      audioLevelIntervalRef.current = setInterval(updateAudioLevel, 100);

      // 録音時間の更新
      durationIntervalRef.current = setInterval(() => {
        const duration = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
        setRecordingDuration(duration);
      }, 100);

      // チャンクインターバルの設定
      chunkIntervalRef.current = setInterval(() => {
        saveAndProcessChunk();
      }, chunkDuration);

      setIsChunkedRecording(true);
      (window as any).debugLog?.(`チャンク録音開始（${chunkDuration / 1000}秒ごと）`, 'success');
    } catch (error: any) {
      (window as any).debugLog?.(`録音開始エラー: ${error.message}`, 'error');
      if (onError) {
        onError(error);
      }
    }
  }, [chunkDuration, saveAndProcessChunk, onError]);

  // 録音停止
  const stopChunkedRecording = useCallback(() => {
    (window as any).debugLog?.('チャンク録音を停止します', 'info');

    // インターバルをクリア
    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
      chunkIntervalRef.current = null;
    }
    
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    
    if (audioLevelIntervalRef.current) {
      clearInterval(audioLevelIntervalRef.current);
      audioLevelIntervalRef.current = null;
    }
    
    // AudioContextをクローズ
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // 最後のチャンクを保存
    saveAndProcessChunk();

    // MediaRecorderを停止
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = () => {
        // すべてのチャンクを結合して完全な音声ファイルを作成
        const allChunks = chunks.map(chunk => chunk.audioBlob);
        if (chunkBufferRef.current.length > 0) {
          allChunks.push(new Blob(chunkBufferRef.current, { type: 'audio/webm' }));
        }
        const completeBlob = new Blob(allChunks, { type: 'audio/webm' });
        setCompleteAudioBlob(completeBlob);
        (window as any).debugLog?.(`完全な音声ファイルを作成: ${completeBlob.size} bytes`, 'success');
      };
      mediaRecorderRef.current.stop();
    }

    // ストリームを停止
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsChunkedRecording(false);
    setRecordingDuration(0);
    setAudioLevel(0);
    (window as any).debugLog?.('チャンク録音を停止しました', 'success');
  }, [saveAndProcessChunk, chunks]);

  // コンポーネントのアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      // コンポーネントがアンマウントされる時のみクリーンアップ
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (chunkIntervalRef.current) {
        clearInterval(chunkIntervalRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []); // 空の依存配列で、コンポーネントのアンマウント時のみ実行

  return {
    chunks,
    isChunkedRecording,
    totalTranscript,
    recordingDuration,
    audioLevel,
    audioBlob: completeAudioBlob,
    startChunkedRecording,
    stopChunkedRecording,
    clearChunks: () => {
      setChunks([]);
      setTotalTranscript('');
      setCompleteAudioBlob(undefined);
    }
  };
}