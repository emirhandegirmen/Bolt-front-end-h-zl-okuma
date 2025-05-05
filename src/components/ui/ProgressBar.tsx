import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  color = 'blue',
  className = '',
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Set height based on size
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-1';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };
  
  // Set color of progress
  const getColor = () => {
    switch (color) {
      case 'green': return 'bg-green-600 dark:bg-green-500';
      case 'red': return 'bg-red-600 dark:bg-red-500';
      case 'purple': return 'bg-purple-600 dark:bg-purple-500';
      case 'orange': return 'bg-orange-600 dark:bg-orange-500';
      default: return 'bg-blue-600 dark:bg-blue-500';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${getHeight()} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div 
          className={`${getHeight()} ${getColor()} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};