import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface FeedbackMessageProps {
  type: 'correct' | 'wrong' | 'skipped' | 'info';
  message: string;
  autoHide?: boolean;
  duration?: number;
  onHide?: () => void;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  message,
  autoHide = true,
  duration = 3000,
  onHide
}) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setVisible(true);
    
    if (autoHide) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onHide) onHide();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, autoHide, duration, onHide]);
  
  if (!visible) return null;
  
  const typeConfig = {
    correct: {
      icon: <CheckCircle className="text-green-500" size={20} />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    wrong: {
      icon: <XCircle className="text-red-500" size={20} />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800'
    },
    skipped: {
      icon: <AlertCircle className="text-yellow-500" size={20} />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
    },
    info: {
      icon: <AlertCircle className="text-blue-500" size={20} />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    }
  };
  
  const config = typeConfig[type];
  
  return (
    <div 
      className={`flex items-center p-4 mb-4 rounded-lg border ${config.bgColor} ${config.borderColor} animate-fadeIn`}
      role="alert"
    >
      <div className="mr-3">{config.icon}</div>
      <div className={`text-sm font-medium ${config.textColor}`}>{message}</div>
      <button 
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 inline-flex h-8 w-8 bg-white text-gray-500 hover:bg-gray-100"
        onClick={() => {
          setVisible(false);
          if (onHide) onHide();
        }}
      >
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};

export default FeedbackMessage;