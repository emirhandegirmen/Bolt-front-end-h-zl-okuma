import React from 'react';
import { 
  BarChart2, 
  Zap, 
  Brain, 
  Sliders, 
  Layers, 
  LineChart, 
  Award, 
  BookOpen 
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: 'Hız Takibi',
      description: 'Anlık okuma hızınızı görerek kelime hızınızı takip edin ve zaman içindeki gelişiminizi izleyin.'
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: 'RSVP Tekniği',
      description: 'Hızlı Ardışık Görsel Sunum tekniğiyle göz hareketlerini en aza indirerek okuma hızınızı artırın.'
    },
    {
      icon: <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />,
      title: 'Anlama Testleri',
      description: 'Hızlı okuduğunuzda ne kadar anladığınızı ölçen anlama testleriyle bilgi alımınızı optimize edin.'
    },
    {
      icon: <Sliders className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      title: 'Kişiselleştirilebilir',
      description: 'Okuma hızınızı, metin boyutunu ve görsel rehberleri kendi ihtiyaçlarınıza göre ayarlayın.'
    },
    {
      icon: <Layers className="h-6 w-6 text-red-600 dark:text-red-400" />,
      title: 'Seviye Sistemi',
      description: 'Başlangıç seviyesinden uzmanlığa kadar adım adım ilerleyen alıştırmalar ve okuma egzersizleri.'
    },
    {
      icon: <LineChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'İlerleme Analizi',
      description: 'Zaman içindeki gelişiminizi görmek için detaylı grafikler ve performans analizleri.'
    },
    {
      icon: <Award className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
      title: 'Başarılar ve Ödüller',
      description: 'Hedeflerinize ulaştıkça kazanacağınız başarı rozetleri ile motivasyonunuzu yüksek tutun.'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      title: 'Geniş İçerik Kütüphanesi',
      description: 'Farklı konularda ve zorluk seviyelerinde içeriklerle okuma pratiği yapın.'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hızlı Okuma Platformunun Özellikleri
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Modern teknikler ve akıllı araçlarla okuma hızınızı geliştirin
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="p-3 bg-white dark:bg-gray-900 rounded-lg inline-block mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;