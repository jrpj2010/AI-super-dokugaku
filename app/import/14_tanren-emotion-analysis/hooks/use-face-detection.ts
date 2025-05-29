import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';

interface UseFaceDetectionOptions {
  stream: MediaStream | null;
  enabled?: boolean;
}

export function useFaceDetection({ stream, enabled = true }: UseFaceDetectionOptions) {
  const [landmarks, setLandmarks] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize MediaPipe Face Landmarker
  const initializeFaceLandmarker = useCallback(async () => {
    try {
      console.log('[FaceDetection] 初期化開始');
      setIsLoading(true);
      setError(null);

      // シンプルなエラーハンドリングで確実に初期化
      try {
        console.log('[FaceDetection] MediaPipe初期化開始...');
        
        // FilesetResolverをロード
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
        );
        console.log('[FaceDetection] FilesetResolverロード完了');
        
        // FaceLandmarkerを作成
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
            delegate: 'GPU' // GPUを試し、失敗したらCPUにフォールバック
          },
          runningMode: 'VIDEO',
          numFaces: 1,
          minFaceDetectionConfidence: 0.3, // より低い闾値で検出を容易に
          minFacePresenceConfidence: 0.3,
          minTrackingConfidence: 0.3,
        });
        
        faceLandmarkerRef.current = landmarker;
        console.log('[FaceDetection] FaceLandmarker初期化成功！');
        
      } catch (error) {
        console.error('[FaceDetection] 初期化エラー詳細:', error);
        
        // GPUが失敗した場合はCPUで再試行
        if (error instanceof Error && error.message.includes('GPU')) {
          console.log('[FaceDetection] GPU初期化失敗、CPUで再試行...');
          try {
            const vision = await FilesetResolver.forVisionTasks(
              'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm'
            );
            const landmarker = await FaceLandmarker.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
                delegate: 'CPU'
              },
              runningMode: 'VIDEO',
              numFaces: 1,
              minFaceDetectionConfidence: 0.3,
              minFacePresenceConfidence: 0.3,
              minTrackingConfidence: 0.3,
            });
            faceLandmarkerRef.current = landmarker;
            console.log('[FaceDetection] CPUモードで初期化成功！');
          } catch (cpuError) {
            console.error('[FaceDetection] CPUモードでも失敗:', cpuError);
            throw cpuError;
          }
        } else {
          throw error;
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error('[FaceDetection] 初期化エラー:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize face detection');
      setIsLoading(false);
    }
  }, []);

  // Process video frame
  const detectFaces = useCallback(() => {
    if (!faceLandmarkerRef.current || !videoRef.current || !enabled) {
      if (!faceLandmarkerRef.current) console.log('[FaceDetection] FaceLandmarkerが初期化されていません');
      if (!videoRef.current) console.log('[FaceDetection] ビデオ要素が存在しません');
      if (!enabled) console.log('[FaceDetection] 検出が無効化されています');
      return;
    }

    const video = videoRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      try {
        const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());
        
        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          console.log('[FaceDetection] 顔検出成功:', results.faceLandmarks[0].length, 'landmarks');
          setLandmarks(results.faceLandmarks[0]);
        } else {
          console.log('[FaceDetection] 顔が検出されませんでした');
          setLandmarks(null);
        }
      } catch (err) {
        console.error('[FaceDetection] 検出エラー:', err);
        // エラーが発生してもアニメーションループを継続
      }
    }

    // Continue detection
    animationFrameRef.current = requestAnimationFrame(detectFaces);
  }, [enabled]);

  // Setup video element
  useEffect(() => {
    if (!stream || !enabled) return;

    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    video.onloadedmetadata = () => {
      console.log('[FaceDetection] ビデオメタデータ読み込み完了');
      video.play();
      detectFaces();
    };

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.pause();
      video.srcObject = null;
      videoRef.current = null;
    };
  }, [stream, enabled, detectFaces]);

  // Initialize when stream is available
  useEffect(() => {
    if (enabled && stream) {
      console.log('[FaceDetection] Streamが利用可能になりました。FaceLandmarkerを初期化します');
      initializeFaceLandmarker();
    }

    return () => {
      if (faceLandmarkerRef.current) {
        console.log('[FaceDetection] FaceLandmarkerをクリーンアップ');
        faceLandmarkerRef.current.close();
        faceLandmarkerRef.current = null;
      }
    };
  }, [enabled, stream, initializeFaceLandmarker]);

  return {
    landmarks,
    isLoading,
    error,
    isDetecting: !!animationFrameRef.current,
  };
}