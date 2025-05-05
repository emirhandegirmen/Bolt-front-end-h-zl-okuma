import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MousePointer, Sparkles, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [currentWord, setCurrentWord] = useState("Hızlı");
  const words = ["Hızlı", "Kolay", "Verimli", "Etkili"];
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Word rotation animation
    timerRef.current = window.setInterval(() => {
      setCurrentWord(words[(words.indexOf(currentWord) + 1) % words.length]);
    }, 2000);
    
    // Animation sequence
    const sequenceTimer = window.setTimeout(() => {
      const sequence = () => {
        setAnimationStep(prev => {
          // Loop back to beginning after reaching end
          return prev >= 3 ? 0 : prev + 1;
        });
      };
      
      // Change animation step every 4 seconds
      const interval = window.setInterval(sequence, 4000);
      return () => window.clearInterval(interval);
    }, 1000);
    
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      window.clearTimeout(sequenceTimer);
    };
  }, [currentWord]);
  
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 pt-24 pb-16 overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-grid-blue-100/50 dark:bg-grid-gray-800/30 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Blob shapes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-200 dark:bg-purple-900/20 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            <span className="inline-block">Okumak Artık</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 relative">
              <span className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out" style={{ opacity: currentWord === "Hızlı" ? 1 : 0 }}>
                Hızlı
              </span>
              <span className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out" style={{ opacity: currentWord === "Kolay" ? 1 : 0 }}>
                Kolay
              </span>
              <span className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out" style={{ opacity: currentWord === "Verimli" ? 1 : 0 }}>
                Verimli
              </span>
              <span className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out" style={{ opacity: currentWord === "Etkili" ? 1 : 0 }}>
                Etkili
              </span>
              {/* This invisible text maintains the size */}
              <span className="invisible">Verimli</span>
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Dakikada okuduğunuz kelime sayısını artırarak bilgi edinme hızınızı yükseltin. Modern okuma teknikleriyle zamanı verimli kullanın.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              to="/exercises" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Hemen Başla
              <ArrowRight className="ml-2 inline-block h-5 w-5" />
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200"
            >
              Daha Fazla Bilgi
            </Link>
          </div>
          
          {/* Animated feature display */}
          <div className="relative h-[350px] md:h-[400px] lg:h-[450px] max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Feature 1: Speed reading */}
            <div 
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                animationStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex items-center h-full p-8">
                <div className="w-1/2 pr-8">
                  <Sparkles className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Hızlı Okuma Tekniği</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    RSVP (Hızlı Ardışık Görsel Sunum) tekniğiyle tek bir odak noktasında kelimeler gösterilir, göz hareketi minimuma indirilir.
                  </p>
                </div>
                <div className="w-1/2 bg-gray-50 dark:bg-gray-900 h-full flex items-center justify-center rounded-lg">
                  <div className="relative p-6 flex flex-col items-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8 animate-pulse">
                      Okuma
                    </div>
                    <div className="absolute h-full w-0.5 bg-blue-500 opacity-70"></div>
                    <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-blue-500 rounded-full animate-progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 2: Progress tracking */}
            <div 
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                animationStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex items-center h-full p-8">
                <div className="w-1/2 pr-8">
                  <Clock className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">İlerlemeyi Takip Edin</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Okuma hızınızı ve gelişiminizi düzenli olarak ölçün. İstatistikler ve grafiklerle ilerlemenizi görün.
                  </p>
                </div>
                <div className="w-1/2 bg-gray-50 dark:bg-gray-900 h-full flex items-center justify-center rounded-lg">
                  <div className="w-full max-w-xs">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-800 dark:text-gray-200">Okuma Hızı</span>
                          <span className="text-green-600 dark:text-green-400">+15%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-progress" style={{width: '65%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-800 dark:text-gray-200">Anlama</span>
                          <span className="text-blue-600 dark:text-blue-400">87%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{width: '87%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 3: Customizable experience */}
            <div 
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                animationStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex items-center h-full p-8">
                <div className="w-1/2 pr-8">
                  <MousePointer className="h-10 w-10 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Kişiselleştirilebilir Deneyim</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Okuma hızınızı, yazı boyutunu ve görsel rehberleri tercihlerinize göre ayarlayın.
                  </p>
                </div>
                <div className="w-1/2 bg-gray-50 dark:bg-gray-900 h-full flex items-center justify-center rounded-lg">
                  <div className="space-y-4 w-full max-w-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200">Hız</span>
                      <div className="relative w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="absolute h-6 w-6 bg-blue-500 rounded-full top-1 transform transition-all" style={{left: 'calc(60% - 12px)'}}></div>
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">400 KPM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200">Tema</span>
                      <div className="flex space-x-2">
                        <div className="w-6 h-6 bg-white border-2 border-blue-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-900 rounded-full"></div>
                        <div className="w-6 h-6 bg-amber-50 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800 dark:text-gray-200">Odak Rengi</span>
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 4: Practice exercises */}
            <div 
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                animationStep === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="flex items-center h-full p-8">
                <div className="w-1/2 pr-8">
                  <Clock className="h-10 w-10 text-orange-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Çeşitli Egzersizler</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Farklı zorluk seviyelerinde alıştırmalar ve okuma egzersizleriyle kendinizi geliştirin.
                  </p>
                </div>
                <div className="w-1/2 bg-gray-50 dark:bg-gray-900 h-full flex items-center justify-center rounded-lg">
                  <div className="space-y-3 w-full max-w-xs">
                    {['Başlangıç', 'Orta Seviye', 'İleri Seviye'].map((level, i) => (
                      <div 
                        key={i}
                        className={`p-3 rounded-lg border ${
                          i === 1 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${
                            i === 1 ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'
                          }`}>
                            {level}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {(i+1) * 10} egzersiz
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              {[0, 1, 2, 3].map((step) => (
                <button
                  key={step}
                  onClick={() => setAnimationStep(step)}
                  className={`mx-1 w-2.5 h-2.5 rounded-full transition-all ${
                    animationStep === step 
                      ? 'bg-blue-600 dark:bg-blue-500 w-8' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  aria-label={`Show feature ${step + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;