import { useEffect, useRef, useState, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

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
      setIsLoading(true);
      setError(null);

      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numFaces: 1,
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize face detection');
      setIsLoading(false);
    }
  }, []);

  // Process video frame
  const detectFaces = useCallback(() => {
    if (!faceLandmarkerRef.current || !videoRef.current || !enabled) {
      return;
    }

    const video = videoRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      try {
        const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());
        
        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          setLandmarks(results.faceLandmarks[0]);
        } else {
          setLandmarks(null);
        }
      } catch (err) {
        console.error('Face detection error:', err);
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

  // Initialize on mount
  useEffect(() => {
    if (enabled) {
      initializeFaceLandmarker();
    }

    return () => {
      if (faceLandmarkerRef.current) {
        faceLandmarkerRef.current.close();
        faceLandmarkerRef.current = null;
      }
    };
  }, [enabled, initializeFaceLandmarker]);

  return {
    landmarks,
    isLoading,
    error,
    isDetecting: !!animationFrameRef.current,
  };
}