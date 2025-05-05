import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useUserSettings } from '../../context/UserSettingsContext';

const FontSizeSelector: React.FC = () => {
  const { settings, updateSettings } = useUserSettings();
  
  const MIN_FONT_SIZE = 12;
  const MAX_FONT_SIZE = 32;
  const STEP = 2;

  const decreaseFontSize = () => {
    if (settings.fontSize > MIN_FONT_SIZE) {
      updateSettings({ fontSize: settings.fontSize - STEP });
    }
  };

  const increaseFontSize = () => {
    if (settings.fontSize < MAX_FONT_SIZE) {
      updateSettings({ fontSize: settings.fontSize + STEP });
    }
  };

  // Calculate the percentage for the progress indicator
  const fontSizePercentage = ((settings.fontSize - MIN_FONT_SIZE) / (MAX_FONT_SIZE - MIN_FONT_SIZE)) * 100;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Yazı Boyutu</h3>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={decreaseFontSize}
          disabled={settings.fontSize <= MIN_FONT_SIZE}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Yazı boyutunu küçült"
        >
          <Minus className="h-5 w-5" />
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>A</span>
            <span>Boyut: {settings.fontSize}px</span>
            <span className="text-lg">A</span>
          </div>
          
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${fontSizePercentage}%` }}
            ></div>
          </div>
        </div>
        
        <button
          onClick={increaseFontSize}
          disabled={settings.fontSize >= MAX_FONT_SIZE}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Yazı boyutunu büyüt"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: `${settings.fontSize}px` }}>
          Örnek metin
        </p>
      </div>
    </div>
  );
};

export default FontSizeSelector;