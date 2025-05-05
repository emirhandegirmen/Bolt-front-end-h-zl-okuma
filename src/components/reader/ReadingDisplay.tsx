import React, { useMemo } from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';
import { findFocusPoint } from '../../utils/readingUtils';

interface ReadingDisplayProps {
  text: string;
  isPlaying: boolean;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ text, isPlaying }) => {
  const { settings, guideSettings } = useUserSettings();
  
  // Find the optimal focus point in the word
  const focusIndex = useMemo(() => findFocusPoint(text), [text]);
  
  // Split the word at the focus point
  const beforeFocus = text.substring(0, focusIndex);
  const focusChar = text.charAt(focusIndex);
  const afterFocus = text.substring(focusIndex + 1);

  // Determine font size based on settings
  const getFontSize = () => {
    // Base size is settings.fontSize in rem
    return `${settings.fontSize / 10}rem`;
  };

  return (
    <div 
      className={`relative flex items-center justify-center min-h-[300px] w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 transition-all duration-500`}
    >
      {/* Focus line (vertical) */}
      {guideSettings.showFocusPoint && (
        <div 
          className="absolute h-full w-px bg-gray-300 dark:bg-gray-600 opacity-50 z-10 pointer-events-none"
          style={{ animationName: isPlaying ? 'pulse' : 'none' }}
        ></div>
      )}
      
      {/* Reading content with focus highlighting */}
      <div 
        className={`text-center transition-all duration-300`}
        style={{ fontSize: getFontSize() }}
      >
        <span className="text-gray-800 dark:text-gray-200">{beforeFocus}</span>
        <span 
          className="text-blue-600 dark:text-blue-400 font-bold"
          style={{ 
            color: guideSettings.showFocusPoint ? guideSettings.highlightColor : 'inherit' 
          }}
        >
          {focusChar}
        </span>
        <span className="text-gray-800 dark:text-gray-200">{afterFocus}</span>
      </div>

      {/* Line tracker (horizontal) */}
      {guideSettings.showLineTracker && (
        <div 
          className="absolute h-1 left-0 right-0 bg-gray-300 dark:bg-gray-600 opacity-20 transform -translate-y-1 z-10 pointer-events-none"
          style={{ bottom: '45%' }}
        ></div>
      )}
    </div>
  );
};

export default ReadingDisplay;