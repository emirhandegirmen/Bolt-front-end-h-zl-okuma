import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Üniversite Öğrencisi',
      content: 'Bu platform sayesinde okuma hızımı iki katına çıkardım. Ders notlarını artık çok daha kısa sürede okuyabiliyorum ve sınavlarımda daha başarılı oluyorum.',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 5
    },
    {
      name: 'Zeynep Kaya',
      role: 'Yönetici',
      content: 'İş hayatımda her gün onlarca e-posta ve rapor okumak zorundayım. HızlıOku platformu bana günde en az bir saat kazandırıyor ve artık daha az göz yorgunluğu yaşıyorum.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4
    },
    {
      name: 'Mehmet Demir',
      role: 'Yazılım Geliştirici',
      content: 'Teknik dokümanları okurken zorlanıyordum. Bu platformdaki egzersizler ve özellikle odak noktası tekniği sayesinde hem daha hızlı hem de daha iyi anlayarak okuyabiliyorum.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Kullanıcılarımız Ne Diyor?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            HızlıOku ile okuma hızını ve anlama kabiliyetini geliştiren kullanıcılarımızın deneyimleri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:-translate-y-1">
      {/* Testimonial Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${
              i < testimonial.rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`} 
          />
        ))}
      </div>
      
      {/* Testimonial Content */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
        "{testimonial.content}"
      </p>
      
      {/* Testimonial Author */}
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;