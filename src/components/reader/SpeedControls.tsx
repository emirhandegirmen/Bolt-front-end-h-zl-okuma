import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronUp, ChevronDown, Settings } from 'lucide-react';

interface SpeedControlsProps {
  speed: number;
  isPlaying: boolean;
  onSpeedChange: (speed: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSettingsClick?: () => void;
}

const SpeedControls: React.FC<SpeedControlsProps> = ({
  speed,
  isPlaying,
  onSpeedChange,
  onPlay,
  onPause,
  onReset,
  onSettingsClick
}) => {
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);

  const presetSpeeds = [100, 200, 300, 400, 500, 600, 700, 800];

  const handleSpeedDecrease = () => {
    const newSpeed = Math.max(50, speed - 25);
    onSpeedChange(newSpeed);
  };

  const handleSpeedIncrease = () => {
    const newSpeed = Math.min(1000, speed + 25);
    onSpeedChange(newSpeed);
  };

  const toggleSpeedDropdown = () => {
    setShowSpeedDropdown(!showSpeedDropdown);
  };

  const selectPresetSpeed = (presetSpeed: number) => {
    onSpeedChange(presetSpeed);
    setShowSpeedDropdown(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Play/Pause Button */}
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        aria-label="Reset"
      >
        <RotateCcw className="h-4 w-4" />
      </button>

      {/* Speed Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSpeedDecrease}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Decrease speed"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
        
        <div className="relative">
          <button
            onClick={toggleSpeedDropdown}
            className="flex items-center justify-center min-w-[90px] h-10 px-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            {speed} KPM
          </button>
          
          {showSpeedDropdown && (
            <div className="absolute top-full left-0 mt-1 py-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
              {presetSpeeds.map((presetSpeed) => (
                <button
                  key={presetSpeed}
                  onClick={() => selectPresetSpeed(presetSpeed)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    speed === presetSpeed
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {presetSpeed} KPM
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={handleSpeedIncrease}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Increase speed"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      {/* Settings Button */}
      {onSettingsClick && (
        <button
          onClick={onSettingsClick}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SpeedControls;