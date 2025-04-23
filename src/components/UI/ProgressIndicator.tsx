import React, { useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  value: number;
  maxValue: number;
  className?: string;
  variant?: 'primary' | 'success' | 'danger';
  showLabel?: boolean;
  labelFormat?: (value: number, maxValue: number) => string;
  animate?: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  maxValue,
  className = '',
  variant = 'primary',
  showLabel = true,
  labelFormat,
  animate = true
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    if (!animate) {
      setAnimatedValue(value);
      return;
    }
    
    // Animate the progress bar
    setAnimatedValue(0);
    const animationDuration = 600; // ms
    const startTime = Date.now();
    
    const animateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      setAnimatedValue(value * progress);
      
      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, [value, animate]);
  
  const percentage = Math.min(Math.round((animatedValue / maxValue) * 100), 100);
  
  const variantStyles = {
    primary: 'bg-blue-600',
    success: 'bg-green-600',
    danger: 'bg-red-600'
  };
  
  const defaultLabelFormat = (val: number, max: number) => `${val} / ${max}`;
  const formattedLabel = (labelFormat || defaultLabelFormat)(value, maxValue);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="relative pt-1">
        {showLabel && (
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700">{formattedLabel}</div>
            <div className="text-sm font-medium text-gray-700">{percentage}%</div>
          </div>
        )}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${variantStyles[variant]} rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;