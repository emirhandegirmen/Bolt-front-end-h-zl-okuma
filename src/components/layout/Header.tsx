import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Settings, BarChart, Moon, Sun, Coffee } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUserSettings } from '../../context/UserSettingsContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { settings, updateSettings } = useUserSettings();

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };

  // Check if scrolled for transparent to solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            <BookOpen className="h-8 w-8" />
            <span className="hidden sm:inline-block">HızlıOku</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Ana Sayfa" currentPath={location.pathname} />
            <NavLink to="/exercises" label="Egzersizler" currentPath={location.pathname} />
            <NavLink to="/reader" label="Hızlı Okuyucu" currentPath={location.pathname} />
            <NavLink to="/progress" label="İlerleme" currentPath={location.pathname} />
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={settings.theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {settings.theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <Link 
              to="/settings" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Başla
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`
        md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-30 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }
      `}>
        <div className="flex flex-col h-full p-6 pt-20">
          <nav className="flex flex-col space-y-6 text-lg">
            <MobileNavLink to="/" label="Ana Sayfa" icon={<Coffee className="h-5 w-5" />} />
            <MobileNavLink to="/exercises" label="Egzersizler" icon={<BookOpen className="h-5 w-5" />} />
            <MobileNavLink to="/reader" label="Hızlı Okuyucu" icon={<BookOpen className="h-5 w-5" />} />
            <MobileNavLink to="/progress" label="İlerleme" icon={<BarChart className="h-5 w-5" />} />
            <MobileNavLink to="/settings" label="Ayarlar" icon={<Settings className="h-5 w-5" />} />
          </nav>
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {settings.theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <span>Aydınlık Mod</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 text-gray-700" />
                  <span>Karanlık Mod</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={`relative font-medium transition-colors ${
        isActive 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform -translate-y-1" />
      )}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-3 p-3 rounded-lg ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Header;