import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import ExerciseCard from '../components/exercises/ExerciseCard';
import { ReadingExercise } from '../types';
import { exercises } from '../data/exercises';

type FilterOption = 'all' | 'beginner' | 'intermediate' | 'advanced';

const ExercisesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Update page title
  React.useEffect(() => {
    document.title = 'Egzersizler - HızlıOku';
  }, []);

  // Filter exercises based on search term and difficulty filter
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = 
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      activeFilter === 'all' || exercise.difficulty === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Hızlı Okuma Egzersizleri
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Okuma hızınızı ve anlama kabiliyetinizi geliştirecek çeşitli egzersizler
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex">
              <select 
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 mr-2"
                aria-label="Sıralama seçeneği"
              >
                <option value="newest">En yeni</option>
                <option value="popular">En popüler</option>
                <option value="easiest">En kolay</option>
                <option value="hardest">En zor</option>
              </select>
              <button className="flex items-center justify-center p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Search bar and filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-8">
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Egzersiz ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              
              <div className="flex space-x-2">
                <FilterButton 
                  active={activeFilter === 'all'} 
                  onClick={() => setActiveFilter('all')}
                >
                  Tümü
                </FilterButton>
                <FilterButton 
                  active={activeFilter === 'beginner'} 
                  onClick={() => setActiveFilter('beginner')}
                >
                  Başlangıç
                </FilterButton>
                <FilterButton 
                  active={activeFilter === 'intermediate'} 
                  onClick={() => setActiveFilter('intermediate')}
                >
                  Orta
                </FilterButton>
                <FilterButton 
                  active={activeFilter === 'advanced'} 
                  onClick={() => setActiveFilter('advanced')}
                >
                  İleri
                </FilterButton>
              </div>
            </div>
          </div>
          
          {/* Exercise grid */}
          {filteredExercises.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Sonuç bulunamadı
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Arama kriterlerinize uygun egzersiz bulunamadı. Lütfen farklı anahtar kelimeler deneyin veya filtreleri değiştirin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );
};

export default ExercisesPage;