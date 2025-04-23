import React, { useEffect, useState } from 'react';
import { Camera, CameraOff, User, UserCheck, AlertCircle } from 'lucide-react';
import useWebcam from '../hooks/useWebcam';
import Button from './UI/Button';
import Card, { CardHeader, CardBody, CardFooter } from './UI/Card';

interface VideoMonitorProps {
  enabled: boolean;
  onStatusChange?: (studentPresent: boolean) => void;
}

const VideoMonitor: React.FC<VideoMonitorProps> = ({ enabled, onStatusChange }) => {
  const {
    videoRef,
    canvasRef,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    lastProcessingResult,
    error
  } = useWebcam({ enabled, interval: 3000 });
  
  const [cameraExpanded, setCameraExpanded] = useState(true);
  
  useEffect(() => {
    if (enabled && !isMonitoring) {
      startMonitoring();
    }
    
    return () => {
      if (isMonitoring) {
        stopMonitoring();
      }
    };
  }, [enabled, isMonitoring, startMonitoring, stopMonitoring]);
  
  useEffect(() => {
    if (lastProcessingResult && onStatusChange) {
      onStatusChange(lastProcessingResult.student_present);
    }
  }, [lastProcessingResult, onStatusChange]);
  
  const toggleCamera = () => {
    setCameraExpanded(!cameraExpanded);
  };
  
  return (
    <Card className="transition-all duration-300 bg-gray-900 border border-gray-800 text-white backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-lg">
      <CardHeader className="flex justify-between items-center bg-gradient-to-r from-green-500 to-white text-black">
        <h3 className="text-lg font-semibold flex items-center">
          <Camera className="mr-2" size={20} />
          Video Monitoring
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="!border-white !text-white hover:!bg-white/20"
          onClick={toggleCamera}
        >
          {cameraExpanded ? 'Minimize' : 'Expand'}
        </Button>
      </CardHeader>

      <div className={`overflow-hidden transition-all duration-300 ${cameraExpanded ? 'max-h-80' : 'max-h-0'}`}>
        <CardBody className="relative">
          {error && (
            <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-4 z-10">
              <AlertCircle className="text-red-500 mb-2" size={24} />
              <p className="text-red-600 text-center">{error}</p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white shadow-md transition"
                onClick={startMonitoring}
              >
                Retry
              </Button>
            </div>
          )}

          <div className="relative aspect-video bg-gray-900 rounded overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <canvas ref={canvasRef} className="hidden" />

            {!isMonitoring && !error && (
              <div className="absolute inset-0 bg-gray-800/80 flex flex-col items-center justify-center">
                <CameraOff className="text-white mb-2" size={32} />
                <p className="text-white text-center mb-4">Camera is not active</p>
                <Button onClick={startMonitoring}>Start Monitoring</Button>
              </div>
            )}
          </div>
        </CardBody>
      </div>

      <CardFooter className="flex items-center justify-between bg-gray-800">
        <div className="flex items-center">
          {lastProcessingResult?.student_present ? (
            <>
              <UserCheck size={20} className="mr-2 text-green-600" />
              <span className="text-green-600 font-medium">Student Present</span>
            </>
          ) : (
            <>
              <User size={20} className="mr-2 text-red-600" />
              <span className="text-red-600 font-medium">Student Not Detected</span>
            </>
          )}
        </div>

        <div className="flex items-center">
          {isMonitoring ? (
            <Button
              variant="outline"
              size="sm"
              onClick={stopMonitoring}
              className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white transition"
            >
              Pause
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={startMonitoring}
              disabled={!!error}
              className="bg-green-500 hover:bg-green-600 text-white shadow-md transition"
            >
              Resume
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoMonitor;
