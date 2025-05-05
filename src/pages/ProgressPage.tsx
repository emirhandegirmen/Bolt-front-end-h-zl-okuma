import React from 'react';
import { BarChart2, Award, TrendingUp, Settings, Info } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import { weeklyStats } from '../data/mockStats';

const ProgressPage: React.FC = () => {
  // Update page title
  React.useEffect(() => {
    document.title = 'İlerleme - HızlıOku';
  }, []);

  // Calculate average from stats
  const averageWpm = Math.round(
    weeklyStats.reduce((acc, stat) => acc + stat.wordsPerMinute, 0) / weeklyStats.length
  );
  
  // Calculate improvement
  const improvement = weeklyStats[weeklyStats.length - 1].wordsPerMinute - weeklyStats[0].wordsPerMinute;
  const improvementPercentage = Math.round((improvement / weeklyStats[0].wordsPerMinute) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">İlerleme Takibi</h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                Okuma hızınızdaki gelişimi ve performansınızı izleyin. Düzenli pratikle devamlı gelişim göstereceksiniz.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                Raporları Özelleştir
              </button>
            </div>
          </div>
          
          {/* Info alert */}
          <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-8">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Tebrikler!</span> Son 7 günde okuma hızınızı %{improvementPercentage} oranında artırdınız. Düzenli pratikle bu oranı daha da yükseltebilirsiniz.
              </p>
            </div>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Ortalama Hız" 
              value={averageWpm}
              unit="KPM"
              change={improvement}
              changeText="son haftada"
              type="wpm"
            />
            <StatsCard 
              title="Anlama Oranı" 
              value={`${weeklyStats[weeklyStats.length - 1].comprehensionRate}%`}
              change={-2}
              type="comprehension"
            />
            <StatsCard 
              title="Toplam Pratik" 
              value={weeklyStats.reduce((acc, stat) => acc + stat.sessionTime, 0)}
              unit="dk"
              type="time"
            />
            <StatsCard 
              title="Mevcut Seviye" 
              value="Orta Seviye"
              type="level"
            />
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ProgressChart data={weeklyStats} height={300} />
            </div>
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Başarılar</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Son kazandığınız rozetler</p>
                  </div>
                  <Award className="h-5 w-5 text-purple-500" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Hızlı Başlangıç', desc: 'İlk 5 egzersizi tamamladınız', date: '3 gün önce', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
                    { name: '300 KPM Kulübü', desc: 'Dakikada 300 kelime hızına ulaştınız', date: '2 gün önce', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
                    { name: 'Tutarlı Okuyucu', desc: '5 gün üst üste pratik yaptınız', date: 'Bugün', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
                  ].map((badge, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${badge.color} mr-3 flex-shrink-0`}>
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{badge.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{badge.desc}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{badge.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center">
                  Tüm Başarıları Gör
                </button>
              </div>
            </div>
          </div>
          
          {/* Recent exercises */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Son Egzersizler</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Son 7 gündeki aktiviteleriniz</p>
              </div>
              <BarChart2 className="h-5 w-5 text-blue-500" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Egzersiz</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tarih</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hız</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Anlama</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Süre</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {weeklyStats.slice(0, 5).map((stat, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                            <TrendingUp className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Hızlı Okuma Temelleri</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Başlangıç Seviyesi</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(stat.date).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {stat.wordsPerMinute} KPM
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {stat.comprehensionRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {stat.sessionTime} dakika
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Tüm Geçmişi Gör
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;