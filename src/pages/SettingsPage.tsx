import React from 'react';
import { UserPlus, Globe, Bell } from 'lucide-react';
import ThemeSelector from '../components/settings/ThemeSelector';
import FontSizeSelector from '../components/settings/FontSizeSelector';
import GuideSettings from '../components/settings/GuideSettings';

const SettingsPage: React.FC = () => {
  // Update page title
  React.useEffect(() => {
    document.title = 'Ayarlar - HızlıOku';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ayarlar</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Okuma deneyiminizi kişiselleştirin ve tercihlerinizi yönetin
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="md:col-span-1">
              <nav className="space-y-1 sticky top-24">
                <NavButton 
                  active={true} 
                  icon={<UserPlus className="h-5 w-5" />}
                >
                  Görünüm
                </NavButton>
                <NavButton 
                  active={false} 
                  icon={<Globe className="h-5 w-5" />}
                >
                  Hesap
                </NavButton>
                <NavButton 
                  active={false} 
                  icon={<Bell className="h-5 w-5" />}
                >
                  Bildirimler
                </NavButton>
              </nav>
            </div>
            
            {/* Settings Content */}
            <div className="md:col-span-3 space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Görünüm Ayarları</h2>
                </div>
                <div className="p-6 space-y-8">
                  <ThemeSelector />
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <FontSizeSelector />
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <GuideSettings />
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">İpucu</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Birçok hızlı okuyucu, kelime veya satırları takip etmek için görsel rehberler kullanır. Odak noktası vurgulaması ve satır takipçisi, gözlerinizin metinde daha verimli hareket etmesine yardımcı olabilir.
                </p>
                <button className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  Daha Fazla İpucu
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-4">
                  Varsayılana Sıfırla
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, children }) => {
  return (
    <button 
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
        active 
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{children}</span>
    </button>
  );
};

export default SettingsPage;