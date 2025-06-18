import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  const { translations } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-primary-700">{translations.branding.shortName}</span>
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-primary-600 py-2">{translations.nav.home}</Link>
            <Link to="/appointments" className="font-medium text-gray-700 hover:text-primary-600 py-2">{translations.nav.appointments}</Link>
            <Link to="/profile" className="font-medium text-gray-700 hover:text-primary-600 py-2">{translations.nav.profile}</Link>
            <Link to="/help" className="font-medium text-gray-700 hover:text-primary-600 py-2">{translations.nav.help}</Link>
          </nav>
          
          {/* Quick contact and language switcher - visible on all screens */}
          <div className="flex items-center">
            <a 
              href="tel:+18001234567" 
              className="flex items-center text-primary-600 font-medium mr-4"
            >
              <Phone size={18} className="mr-1" />
              <span className="hidden sm:inline">1-800-123-4567</span>
            </a>
            
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 border-t border-gray-200">
            <Link to="/" className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>{translations.nav.home}</Link>
            <Link to="/appointments" className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>{translations.nav.appointments}</Link>
            <Link to="/profile" className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>{translations.nav.profile}</Link>
            <Link to="/help" className="block py-3 px-4 text-lg font-medium hover:bg-gray-100 rounded-md" onClick={toggleMenu}>{translations.nav.help}</Link>
            <div className="mt-4 py-3 px-4 bg-gray-50 rounded-md flex items-center">
              <HelpCircle size={20} className="text-primary-500 mr-2" />
              <span className="text-gray-700 font-medium">Cần hỗ trợ? Gọi cho chúng tôi</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
