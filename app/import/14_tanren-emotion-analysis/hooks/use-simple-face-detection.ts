import { useEffect, useRef, useState, useCallback } from 'react';

interface UseSimpleFaceDetectionOptions {
  stream: MediaStream | null;
  enabled?: boolean;
}

// シンプルな顔検出フック（MediaPipeの代替案）
export function useSimpleFaceDetection({ stream, enabled = true }: UseSimpleFaceDetectionOptions) {
  const [landmarks, setLandmarks] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // ダミーのランドマークデータを生成（デモ用）
  const generateDemoLandmarks = useCallback(() => {
    const landmarks = [];
    const time = Date.now() / 1000;
    
    // 顔の輪郭（簡略化された478点）
    for (let i = 0; i < 478; i++) {
      const angle = (i / 478) * Math.PI * 2;
      const radius = 0.3 + Math.sin(angle * 4) * 0.05;
      
      landmarks.push({
        x: 0.5 + Math.cos(angle + time * 0.5) * radius,
        y: 0.5 + Math.sin(angle + time * 0.5) * radius * 0.8,
        z: 0
      });
    }
    
    return landmarks;
  }, []);

  // ビデオストリームのセットアップ
  useEffect(() => {
    if (!stream || !enabled) return;

    console.log('[SimpleFaceDetection] ストリームセットアップ開始');
    
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    video.onloadedmetadata = () => {
      console.log('[SimpleFaceDetection] ビデオメタデータ読み込み完了');
      video.play();
      setIsDetecting(true);
    };

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.pause();
      video.srcObject = null;
      videoRef.current = null;
      setIsDetecting(false);
    };
  }, [stream, enabled]);

  // デモ用のランドマーク生成
  useEffect(() => {
    if (!enabled || !isDetecting) return;

    const updateLandmarks = () => {
      // デモ用のランドマークを生成
      const demoLandmarks = generateDemoLandmarks();
      setLandmarks(demoLandmarks);
      
      animationFrameRef.current = requestAnimationFrame(updateLandmarks);
    };

    updateLandmarks();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, isDetecting, generateDemoLandmarks]);

  return {
    landmarks,
    isLoading,
    error,
    isDetecting,
  };
}