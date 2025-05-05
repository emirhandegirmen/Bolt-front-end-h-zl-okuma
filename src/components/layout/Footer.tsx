import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">HızlıOku</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Okuma hızınızı ve anlama kabiliyetinizi geliştirin. Modern tekniklerle daha hızlı okuyun, daha çok bilgi edinin.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Twitter />} href="https://twitter.com" label="Twitter" />
              <SocialLink icon={<Instagram />} href="https://instagram.com" label="Instagram" />
              <SocialLink icon={<Linkedin />} href="https://linkedin.com" label="LinkedIn" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-4">Sayfalar</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Ana Sayfa" />
              <FooterLink href="/exercises" label="Egzersizler" />
              <FooterLink href="/reader" label="Hızlı Okuyucu" />
              <FooterLink href="/progress" label="İlerleme" />
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-4">Kaynaklar</h3>
            <ul className="space-y-3">
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/tips" label="Ipuçları" />
              <FooterLink href="/faq" label="SSS" />
              <FooterLink href="/research" label="Araştırmalar" />
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-4">İletişim</h3>
            <div className="space-y-4">
              <a 
                href="mailto:info@hizlioku.com" 
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>info@hizlioku.com</span>
              </a>
              <p className="text-gray-600 dark:text-gray-400">
                Bültene kaydolarak son gelişmeleri ve ipuçlarını alın.
              </p>
              <form className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} HızlıOku. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink href="/privacy" label="Gizlilik Politikası" small />
            <FooterLink href="/terms" label="Kullanım Koşulları" small />
            <FooterLink href="/cookies" label="Çerezler" small />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
  small?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, small }) => {
  return (
    <li className={small ? 'inline' : ''}>
      <Link 
        to={href} 
        className={`text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
          small ? 'text-sm' : ''
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-600 hover:text-white transition-all duration-200"
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
    </a>
  );
};

export default Footer;