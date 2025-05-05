import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const HomePage: React.FC = () => {
  // Update page title
  React.useEffect(() => {
    document.title = 'HızlıOku - Modern Hızlı Okuma Platformu';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;