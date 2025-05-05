import React from 'react';
import { Clock, ArrowRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReadingExercise } from '../../types';

interface ExerciseCardProps {
  exercise: ReadingExercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  // Get difficulty badge color
  const getDifficultyColor = () => {
    switch (exercise.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Format difficulty text
  const formatDifficulty = () => {
    switch (exercise.difficulty) {
      case 'beginner':
        return 'Başlangıç';
      case 'intermediate':
        return 'Orta Seviye';
      case 'advanced':
        return 'İleri Seviye';
      default:
        return exercise.difficulty;
    }
  };

  // Calculate word count
  const wordCount = exercise.content.split(/\s+/).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
            {formatDifficulty()}
          </span>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{exercise.estimatedTime} dk</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {exercise.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {exercise.content.substring(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span>{wordCount} kelime</span>
          </div>
          
          <Link 
            to={`/reader/${exercise.id}`} 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Egzersize Başla
            <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;