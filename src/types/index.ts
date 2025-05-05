export interface ReadingExercise {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  category: string;
}

export interface ReadingStats {
  wordsPerMinute: number;
  comprehensionRate: number;
  sessionTime: number;
  date: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'sepia';
  fontSize: number;
  showGuide: boolean;
  preferredSpeed: number;
}

export interface ReadingGuideSettings {
  highlightColor: string;
  showFocusPoint: boolean;
  showLineTracker: boolean;
}