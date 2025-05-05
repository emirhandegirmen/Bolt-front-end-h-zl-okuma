import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  BarChart2, 
  Brain, 
  Award 
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  changeText?: string;
  type: 'wpm' | 'time' | 'comprehension' | 'progress' | 'level' | 'streak';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit,
  change,
  changeText,
  type
}) => {
  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case 'wpm':
        return <BarChart2 className="h-5 w-5 text-blue-500" />;
      case 'time':
        return <Clock className="h-5 w-5 text-purple-500" />;
      case 'comprehension':
        return <Brain className="h-5 w-5 text-green-500" />;
      case 'progress':
        return <TrendingUp className="h-5 w-5 text-orange-500" />;
      case 'level':
        return <Award className="h-5 w-5 text-indigo-500" />;
      case 'streak':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <BarChart2 className="h-5 w-5 text-blue-500" />;
    }
  };

  // Determine gradient based on type
  const getGradient = () => {
    switch (type) {
      case 'wpm':
        return 'from-blue-500/20 to-blue-500/5';
      case 'time':
        return 'from-purple-500/20 to-purple-500/5';
      case 'comprehension':
        return 'from-green-500/20 to-green-500/5';
      case 'progress':
        return 'from-orange-500/20 to-orange-500/5';
      case 'level':
        return 'from-indigo-500/20 to-indigo-500/5';
      case 'streak':
        return 'from-red-500/20 to-red-500/5';
      default:
        return 'from-blue-500/20 to-blue-500/5';
    }
  };

  // Get change icon and color
  const renderChange = () => {
    if (change === undefined) return null;
    
    const isPositive = change >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-green-500' : 'text-red-500';
    
    return (
      <div className={`flex items-center space-x-1 ${colorClass}`}>
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">
          {isPositive ? '+' : ''}{change}{unit} {changeText || ''}
        </span>
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${getGradient()} rounded-full -mr-16 -mt-16 opacity-50`}></div>
      <div className="relative">
        <div className="flex items-center space-x-2 mb-2">
          {getIcon()}
          <h3 className="text-gray-700 dark:text-gray-300 font-medium">{title}</h3>
        </div>
        <div className="flex items-end space-x-2 mb-2">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {unit && <span className="text-lg text-gray-600 dark:text-gray-400 mb-0.5">{unit}</span>}
        </div>
        {renderChange()}
      </div>
    </div>
  );
};

export default StatsCard;