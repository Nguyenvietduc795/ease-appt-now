import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileNavbar from './MobileNavbar';
import LanguageSwitcher from '../LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
  noMobileNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, noMobileNav = false }) => {
  const { translations } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex flex-col">
                <span className="text-2xl font-bold text-primary">
                  {translations.branding.shortName}
                </span>
                <span className="text-sm text-gray-600 hidden md:block">
                  {translations.branding.medicalCenter}
                </span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/') ? 'text-primary' : 'text-gray-600'
                } hover:text-primary px-3 py-2 text-sm font-medium`}
              >
                {translations.nav.home}
              </Link>
              <Link
                to="/appointments"
                className={`${
                  isActive('/appointments') ? 'text-primary' : 'text-gray-600'
                } hover:text-primary px-3 py-2 text-sm font-medium`}
              >
                {translations.nav.appointments}
              </Link>
              <Link
                to="/profile"
                className={`${
                  isActive('/profile') ? 'text-primary' : 'text-gray-600'
                } hover:text-primary px-3 py-2 text-sm font-medium`}
              >
                {translations.nav.profile}
              </Link>
              <Link
                to="/help"
                className={`${
                  isActive('/help') ? 'text-primary' : 'text-gray-600'
                } hover:text-primary px-3 py-2 text-sm font-medium`}
              >
                {translations.nav.help}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <a
                href="tel:1-800-123-4567"
                className="flex items-center text-primary"
              >
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-medium">1-800-123-4567</span>
              </a>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {!noMobileNav && <MobileNavbar />}
    </div>
  );
};

export default Layout;
