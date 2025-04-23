import { useState, useCallback, useRef } from 'react';
import { processVideo } from '../services/api';
import { VideoProcessingResult } from '../types';

interface UseWebcamProps {
  enabled: boolean;
  interval?: number;
}

interface UseWebcamReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  lastProcessingResult: VideoProcessingResult | null;
  error: string | null;
}

const useWebcam = ({ enabled, interval = 2000 }: UseWebcamProps): UseWebcamReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastProcessingResult, setLastProcessingResult] = useState<VideoProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number>();

  const captureFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to base64 image
    const imageData = canvas.toDataURL('image/jpeg');
    
    return imageData;
  }, []);

  const processFrame = useCallback(async () => {
    try {
      const imageData = captureFrame();
      if (!imageData) return;
      
      const result = await processVideo(imageData);
      setLastProcessingResult(result);
      setError(null);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error processing video frame');
      console.error('Error processing video frame:', err);
    }
  }, [captureFrame]);

  const startMonitoring = useCallback(() => {
    if (!enabled) return;
    
    setIsMonitoring(true);
    
    // Set up video stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          
          // Start processing frames at regular intervals
          intervalRef.current = window.setInterval(processFrame, interval);
        })
        .catch((err: DOMException) => {
          let errorMessage = 'Error accessing webcam: ';
          if (err.name === 'NotAllowedError') {
            errorMessage += 'Permission denied. Please allow webcam access in your browser settings.';
          } else if (err.name === 'NotFoundError') {
            errorMessage += 'No webcam found. Please make sure you have a webcam connected.';
          } else {
            errorMessage += err.message;
          }
          setError(errorMessage);
          setIsMonitoring(false);
        });
    } else {
      setError('MediaDevices API not supported in this browser');
      setIsMonitoring(false);
    }
  }, [enabled, interval, processFrame]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    
    // Clear the processing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Stop the video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  return {
    videoRef,
    canvasRef,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    lastProcessingResult,
    error
  };
};

export default useWebcam;
