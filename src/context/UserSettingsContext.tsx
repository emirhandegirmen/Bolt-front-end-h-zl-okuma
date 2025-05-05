import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserSettings, ReadingGuideSettings } from '../types';

// Default settings
const defaultSettings: UserSettings = {
  theme: 'light',
  fontSize: 18,
  showGuide: true,
  preferredSpeed: 250,
};

const defaultGuideSettings: ReadingGuideSettings = {
  highlightColor: '#3B82F6',
  showFocusPoint: true,
  showLineTracker: true,
};

interface UserSettingsContextType {
  settings: UserSettings;
  guideSettings: ReadingGuideSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateGuideSettings: (newSettings: Partial<ReadingGuideSettings>) => void;
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined);

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    // Load from localStorage if available
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const [guideSettings, setGuideSettings] = useState<ReadingGuideSettings>(() => {
    const savedGuideSettings = localStorage.getItem('guideSettings');
    return savedGuideSettings ? JSON.parse(savedGuideSettings) : defaultGuideSettings;
  });

  // Save to localStorage when settings change
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('guideSettings', JSON.stringify(guideSettings));
  }, [guideSettings]);

  // Update theme class on body
  useEffect(() => {
    document.body.className = settings.theme;
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateGuideSettings = (newSettings: Partial<ReadingGuideSettings>) => {
    setGuideSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <UserSettingsContext.Provider 
      value={{ 
        settings, 
        guideSettings, 
        updateSettings, 
        updateGuideSettings 
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (context === undefined) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};