import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Info } from 'lucide-react';
import { exercises } from '../data/exercises';
import ReadingDisplay from '../components/reader/ReadingDisplay';
import SpeedControls from '../components/reader/SpeedControls';
import { useSpeedReader } from '../hooks/useSpeedReader';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useUserSettings } from '../context/UserSettingsContext';
import { estimateReadingTime } from '../utils/readingUtils';

const ReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { settings } = useUserSettings();
  const [showInfo, setShowInfo] = useState(true);
  const exercise = exercises.find(ex => ex.id === id) || exercises[0];
  
  // Update page title
  React.useEffect(() => {
    document.title = `${exercise.title} - HızlıOku`;
  }, [exercise.title]);

  const { 
    currentText, 
    isPlaying, 
    progress, 
    speed, 
    play, 
    pause, 
    reset, 
    changeSpeed,
    jumpTo
  } = useSpeedReader(exercise.content, { 
    initialSpeed: settings.preferredSpeed,
    chunkSize: 1,
    autoStart: false
  });

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = ((e.clientX - rect.left) / rect.width) * 100;
    jumpTo(percentage);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Exercise Info */}
          {showInfo && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6 relative">
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                aria-label="Close info panel"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-start space-x-3">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{exercise.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Bu egzersiz, hızlı okuma becerilerinizi geliştirmek için tasarlanmıştır. Aşağıdaki kontrolleri kullanarak okuma hızınızı ayarlayabilirsiniz.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                      <span>Zorluk: {getDifficultyText(exercise.difficulty)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                      <span>Tahmini süre: {exercise.estimatedTime} dakika</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                      <span>Kelime sayısı: {exercise.content.split(/\s+/).length} kelime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Reading Display */}
          <ReadingDisplay 
            text={currentText} 
            isPlaying={isPlaying} 
          />
          
          {/* Progress Bar */}
          <div 
            className="mt-6 mb-4 cursor-pointer"
            onClick={handleProgressBarClick}
          >
            <ProgressBar 
              value={progress} 
              max={100} 
              showLabel 
              color="blue"
              size="lg"
            />
          </div>
          
          {/* Speed Controls */}
          <div className="mt-6 mb-4">
            <SpeedControls 
              speed={speed}
              isPlaying={isPlaying}
              onSpeedChange={changeSpeed}
              onPlay={play}
              onPause={pause}
              onReset={reset}
            />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <StatCard 
              label="Hız" 
              value={`${speed}`} 
              unit="KPM" 
              textColor="text-blue-600 dark:text-blue-400" 
            />
            <StatCard 
              label="Tahmini Süre" 
              value={`${estimateReadingTime(exercise.content, speed)}`} 
              unit="dk" 
              textColor="text-purple-600 dark:text-purple-400" 
            />
            <StatCard 
              label="İlerleme" 
              value={`${Math.round(progress)}`} 
              unit="%" 
              textColor="text-green-600 dark:text-green-400" 
            />
            <StatCard 
              label="Kelime Sayısı" 
              value={`${exercise.content.split(/\s+/).length}`} 
              unit="kelime" 
              textColor="text-orange-600 dark:text-orange-400" 
            />
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Önceki Egzersiz
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Sonraki Egzersiz
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for X close button
const X: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

// Helper component for stat cards
interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, textColor }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</p>
    <div className="flex items-baseline">
      <span className={`text-xl font-bold ${textColor}`}>{value}</span>
      <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">{unit}</span>
    </div>
  </div>
);

// Helper function to format difficulty
const getDifficultyText = (difficulty: string): string => {
  switch (difficulty) {
    case 'beginner': return 'Başlangıç';
    case 'intermediate': return 'Orta Seviye';
    case 'advanced': return 'İleri Seviye';
    default: return difficulty;
  }
};

export default ReaderPage;