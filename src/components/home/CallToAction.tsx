import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CallToAction: React.FC = () => {
  const benefits = [
    'Okuma hızınızı 2-3 kat artırın',
    'Daha iyi anlama ve hafıza',
    'Zamanınızı daha verimli kullanın',
    'Göz yorgunluğunu azaltın',
    'Öğrenme sürecinizi hızlandırın',
    'İş ve akademik hayatta avantaj elde edin'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Okuma becerilerinizi geliştirmeye <span className="text-blue-200">bugün başlayın!</span>
            </h2>
            
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Günlük pratiğinizle 30 gün içinde okuma hızınızı ikiye katlayın. Dakikada okuduğunuz kelime sayısını artırarak bilgi edinme hızınızı yükseltin.
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-300 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-white">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/exercises" 
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                Ücretsiz Başla
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-3 bg-transparent text-white border border-white rounded-full font-medium hover:bg-blue-700 hover:bg-opacity-30 transition-colors duration-200 text-center"
              >
                Nasıl Çalışır?
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-5/12 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Ortalama İlerleme
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kullanıcılarımızın 30 günlük gelişimi
              </p>
            </div>
            
            <div className="p-6">
              <div className="relative pb-6">
                <div className="absolute left-0 h-full w-px bg-blue-100 dark:bg-gray-700 ml-3"></div>
                
                {[
                  { day: "1. Gün", wpm: "200 KPM", desc: "Başlangıç seviyesi" },
                  { day: "7. Gün", wpm: "300 KPM", desc: "+50% artış" },
                  { day: "15. Gün", wpm: "400 KPM", desc: "+100% artış" },
                  { day: "30. Gün", wpm: "500+ KPM", desc: "+150% artış" }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start mb-6">
                    <div className="absolute left-0">
                      <div className="h-7 w-7 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white z-10">
                        {index + 1}
                      </div>
                    </div>
                    <div className="ml-12">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
                        <span>{item.day}</span>
                        <span className="text-blue-600 dark:text-blue-400">{item.wpm}</span>
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Başlangıç seviyeniz ne olursa olsun, gelişme göstereceksiniz!
                </p>
                <Link 
                  to="/register" 
                  className="inline-block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Hemen Kaydol
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;