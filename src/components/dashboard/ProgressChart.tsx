import React, { useMemo } from 'react';
import { ReadingStats } from '../../types';

interface ProgressChartProps {
  data: ReadingStats[];
  height?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  data, 
  height = 200 
}) => {
  const chartData = useMemo(() => {
    // Get max WPM for scaling
    const maxWpm = Math.max(...data.map(d => d.wordsPerMinute), 100);
    // Round up to nearest 100
    const scaledMax = Math.ceil(maxWpm / 100) * 100;
    
    // Format dates
    const formattedData = data.map(item => {
      const date = new Date(item.date);
      return {
        ...item,
        formattedDate: date.toLocaleDateString('tr-TR', { 
          day: 'numeric',
          month: 'short'
        }),
        percentage: (item.wordsPerMinute / scaledMax) * 100
      };
    });
    
    return {
      items: formattedData,
      max: scaledMax
    };
  }, [data]);

  // Calculate average WPM
  const averageWpm = useMemo(() => {
    const sum = data.reduce((acc, item) => acc + item.wordsPerMinute, 0);
    return Math.round(sum / data.length);
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Okuma Hızı</h3>
          <p className="text-gray-600 dark:text-gray-400">Son 7 gün</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averageWpm}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Ort. kelime/dakika</div>
        </div>
      </div>
      
      <div className="relative" style={{ height: `${height}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>
            {chartData.max}
          </div>
          <div>
            {chartData.max / 2}
          </div>
          <div>
            0
          </div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute left-8 right-0 inset-y-0 flex flex-col justify-between">
          <div className="border-b border-gray-200 dark:border-gray-700 h-0"></div>
          <div className="border-b border-gray-200 dark:border-gray-700 h-0"></div>
          <div className="border-b border-gray-200 dark:border-gray-700 h-0"></div>
        </div>
        
        {/* Bars */}
        <div className="absolute left-10 right-4 inset-y-0 flex items-end">
          <div className="flex-1 flex items-end justify-between h-full">
            {chartData.items.map((item, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col justify-end items-center" 
                style={{ height: '100%' }}
              >
                <div 
                  className="w-10 bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-400 rounded-t-md transition-all duration-300 hover:opacity-90"
                  style={{ 
                    height: `${item.percentage}%`,
                    maxWidth: `${100 / chartData.items.length - 10}%`,
                    minWidth: '16px'
                  }}
                ></div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">{item.formattedDate}</span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
                  {item.wordsPerMinute} KPM
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;