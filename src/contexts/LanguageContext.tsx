
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Header
    'medical.center': 'Medical Center',
    'nav.home': 'Home',
    'nav.appointments': 'My Appointments',
    'nav.profile': 'Profile',
    'nav.help': 'Help',
    'nav.need.help': 'Need help? Call us',
    // Common
    'available': 'Available',
    'no.slots': 'No Available Time Slots',
    'no.slots.message': 'There are currently no available time slots for this doctor. Please try selecting a different doctor or check back later.',
    'no.slots.date': 'No available time slots for this date',
    'selected.doctor': 'Selected Doctor',
    'choose.slot': 'Choose Time Slot',
  },
  vi: {
    // Header
    'medical.center': 'Trung Tâm Y Tế',
    'nav.home': 'Trang Chủ',
    'nav.appointments': 'Lịch Hẹn',
    'nav.profile': 'Hồ Sơ',
    'nav.help': 'Trợ Giúp',
    'nav.need.help': 'Cần trợ giúp? Gọi cho chúng tôi',
    // Common
    'available': 'Còn Trống',
    'no.slots': 'Không Có Lịch Trống',
    'no.slots.message': 'Hiện tại không có lịch trống cho bác sĩ này. Vui lòng chọn bác sĩ khác hoặc quay lại sau.',
    'no.slots.date': 'Không có lịch trống cho ngày này',
    'selected.doctor': 'Bác Sĩ Đã Chọn',
    'choose.slot': 'Chọn Thời Gian',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'vi' ? 'vi' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
