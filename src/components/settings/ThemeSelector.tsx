import React from 'react';
import { Sun, Moon, Coffee } from 'lucide-react';
import { useUserSettings } from '../../context/UserSettingsContext';

const ThemeSelector: React.FC = () => {
  const { settings, updateSettings } = useUserSettings();
  
  const themes = [
    { 
      id: 'light', 
      name: 'Aydınlık', 
      icon: <Sun className="h-5 w-5" />,
      description: 'Beyaz arkaplan ve koyu metin'
    },
    { 
      id: 'dark', 
      name: 'Karanlık', 
      icon: <Moon className="h-5 w-5" />,
      description: 'Koyu arkaplan ve açık metin'
    },
    { 
      id: 'sepia', 
      name: 'Sepia', 
      icon: <Coffee className="h-5 w-5" />,
      description: 'Göz yorgunluğunu azaltan sıcak ton'
    }
  ];

  const handleThemeChange = (themeId: 'light' | 'dark' | 'sepia') => {
    updateSettings({ theme: themeId });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tema</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div 
            key={theme.id}
            className={`
              relative cursor-pointer rounded-lg border p-4 transition-all duration-200
              ${settings.theme === theme.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-800'}
            `}
            onClick={() => handleThemeChange(theme.id as 'light' | 'dark' | 'sepia')}
          >
            <div className="flex items-center space-x-3">
              <div 
                className={`
                  p-2 rounded-full 
                  ${settings.theme === theme.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                `}
              >
                {theme.icon}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{theme.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{theme.description}</p>
              </div>
            </div>
            {settings.theme === theme.id && (
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;