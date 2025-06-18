import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { translations } = useLanguage();
  return (
    <footer className="bg-white border-t border-gray-200 mt-8 pt-10 pb-4 text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left: Info */}
        <div className="flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            {/* Logo nếu có */}
            {/* <img src="/logo.svg" alt="Logo" className="w-8 h-8" /> */}
            <span className="font-bold text-primary-700 text-lg">{translations.branding.medicalCenter}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-primary-500" />
            <span>448B Nguyễn Thị Minh Khai, P. Cái Khế, Q. Ninh Kiều, TP. Cần Thơ</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Phone className="w-4 h-4 text-primary-500" />
            <a href="tel:18001234" className="text-primary-600 font-semibold hover:underline">1800-1234</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary-500" />
            <a href="mailto:hotro@medicalcenter.com" className="hover:underline">hotro@medicalcenter.com</a>
          </div>
        </div>
        {/* Right: Quick Links */}
        <div className="flex flex-col gap-2 min-w-[160px]">
          <span className="font-semibold text-gray-700 mb-1">Liên kết nhanh</span>
          <Link to="/" className="hover:text-primary-600 transition">{translations.nav.home}</Link>
          <Link to="/appointments" className="hover:text-primary-600 transition">{translations.nav.appointments}</Link>
          <Link to="/profile" className="hover:text-primary-600 transition">{translations.nav.profile}</Link>
          <Link to="/help" className="hover:text-primary-600 transition">{translations.nav.help}</Link>
          <a href="tel:18001234" className="hover:text-primary-600 transition">Liên hệ</a>
        </div>
      </div>
      <div className="text-xs text-gray-400 text-center mt-6">
        &copy; {new Date().getFullYear()} {translations.branding.shortName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 