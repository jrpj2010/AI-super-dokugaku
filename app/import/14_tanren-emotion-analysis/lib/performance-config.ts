// パフォーマンス最適化の設定

export const PERFORMANCE_CONFIG = {
  // ビデオフレームキャプチャ設定
  video: {
    // フレームキャプチャ間隔（ミリ秒）
    captureInterval: 1500, // 1.5秒ごと（よりリアルタイムに）
    // 最大解像度
    maxWidth: 640,
    maxHeight: 480,
    // JPEG品質（0-1）
    jpegQuality: 0.7,
  },
  
  // 感情分析API設定
  emotionAnalysis: {
    // 分析間隔（ミリ秒）
    analysisInterval: 1000, // 1秒ごと（より高頻度に）
    // バッチサイズ（一度に処理するフレーム数）
    batchSize: 1,
    // 最大保留フレーム数
    maxQueueSize: 5, // キューサイズを増やして取りこぼしを防ぐ
    // タイムアウト（ミリ秒）
    timeout: 10000,
  },
  
  // 音声認識設定
  speechRecognition: {
    // 中間結果の更新間隔（ミリ秒）
    interimResultsDebounce: 500,
    // 最大連続認識時間（秒）
    maxContinuousTime: 300, // 5分
  },
  
  // セッション記録設定
  recording: {
    // MediaRecorderのビットレート
    videoBitsPerSecond: 1000000, // 1 Mbps
    audioBitsPerSecond: 128000, // 128 kbps
    // チャンクサイズ（ミリ秒）
    timeslice: 1000,
  },
  
  // UI更新設定
  ui: {
    // チャート更新間隔（ミリ秒）
    chartUpdateInterval: 1000,
    // 最大データポイント数
    maxChartDataPoints: 30,
  },
  
  // キャッシュ設定
  cache: {
    // 感情分析結果のキャッシュ時間（秒）
    emotionCacheTTL: 60,
    // セッションデータのキャッシュ時間（秒）
    sessionCacheTTL: 300,
  }
}

// 環境に応じた設定の上書き
export function getOptimizedConfig() {
  const config = { ...PERFORMANCE_CONFIG }
  
  // 開発環境では頻度を上げる
  if (process.env.NODE_ENV === 'development') {
    config.video.captureInterval = 1000 // 1秒ごと
    config.emotionAnalysis.analysisInterval = 1000 // 1秒ごと
  }
  
  // モバイルデバイスの検出 - SSRセーフ
  if (typeof window !== 'undefined') {
    try {
      const nav = window.navigator
      if (nav && nav.userAgent && /Mobi|Android/i.test(nav.userAgent)) {
        config.video.maxWidth = 480
        config.video.maxHeight = 360
        config.video.captureInterval = 5000
        config.emotionAnalysis.analysisInterval = 10000
      }
    } catch (e) {
      // SSR環境では無視
    }
  }
  
  return config
}