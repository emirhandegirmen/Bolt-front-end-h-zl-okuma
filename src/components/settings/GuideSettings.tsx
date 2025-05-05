import React from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';
import { Switch } from '../ui/Switch';

const GuideSettings: React.FC = () => {
  const { settings, updateSettings, guideSettings, updateGuideSettings } = useUserSettings();
  
  const colors = [
    { id: 'blue', value: '#3B82F6', label: 'Mavi' },
    { id: 'red', value: '#EF4444', label: 'Kırmızı' },
    { id: 'green', value: '#10B981', label: 'Yeşil' },
    { id: 'purple', value: '#8B5CF6', label: 'Mor' },
    { id: 'orange', value: '#F97316', label: 'Turuncu' },
    { id: 'teal', value: '#14B8A6', label: 'Turkuaz' }
  ];

  const toggleGuide = () => {
    updateSettings({ showGuide: !settings.showGuide });
  };

  const toggleFocusPoint = () => {
    updateGuideSettings({ showFocusPoint: !guideSettings.showFocusPoint });
  };

  const toggleLineTracker = () => {
    updateGuideSettings({ showLineTracker: !guideSettings.showLineTracker });
  };

  const changeHighlightColor = (color: string) => {
    updateGuideSettings({ highlightColor: color });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Okuma Rehberi</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Okuma Rehberi</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Okumaya yardımcı olacak görsel rehberler
            </p>
          </div>
          <Switch 
            checked={settings.showGuide} 
            onCheckedChange={toggleGuide} 
          />
        </div>
        
        {settings.showGuide && (
          <>
            <div className="flex items-center justify-between pl-6 border-l-2 border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Odak Noktası</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Kelimelerin optimal odak noktasını vurgular
                </p>
              </div>
              <Switch 
                checked={guideSettings.showFocusPoint} 
                onCheckedChange={toggleFocusPoint} 
              />
            </div>
            
            <div className="flex items-center justify-between pl-6 border-l-2 border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Satır Takipçisi</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Metni takip etmenize yardımcı olan yatay çizgi
                </p>
              </div>
              <Switch 
                checked={guideSettings.showLineTracker} 
                onCheckedChange={toggleLineTracker} 
              />
            </div>
            
            {guideSettings.showFocusPoint && (
              <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">Vurgu Rengi</p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        ${guideSettings.highlightColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}
                      `}
                      style={{ backgroundColor: color.value }}
                      onClick={() => changeHighlightColor(color.value)}
                      aria-label={`${color.label} rengini seç`}
                      title={color.label}
                    >
                      {guideSettings.highlightColor === color.value && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GuideSettings;