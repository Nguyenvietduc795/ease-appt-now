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
    // Header & Navigation
    'medical.center': 'Medical Center',
    'nav.home': 'Home',
    'nav.appointments': 'My Appointments',
    'nav.profile': 'Profile',
    'nav.help': 'Help',
    'nav.need.help': 'Need help? Call us',

    // Booking Pages
    'book.appointment.title': 'Book an Appointment',
    'book.appointment.subtitle': 'Follow these simple steps to schedule your visit',
    
    // Department Selection
    'department.select': 'Select Department',
    
    // Doctor Selection
    'doctor.select': 'Select Doctor',
    
    // Time Slot Selection
    'time.slot.select': 'Choose Time Slot',
    
    // Profile Page
    'profile.title': 'My Profile',
    'profile.personal.info': 'Personal Information',
    'profile.edit': 'Edit Profile',
    'profile.name': 'Full Name',
    'profile.phone': 'Phone Number',
    'profile.email': 'Email',
    'profile.address': 'Address',
    
    // Help Page
    'help.title': 'Help & Support',
    'help.subtitle': "We're here to help you with any questions or issues",
    'help.call.support': 'Call Support',
    'help.video.guide': 'Video Guide',
    'help.email.support': 'Email Support',
    
    // Common
    'available': 'Available',
    'no.slots': 'No Available Time Slots',
    'no.slots.message': 'There are currently no available time slots for this doctor. Please try selecting a different doctor or check back later.',
    'no.slots.date': 'No available time slots for this date',
    'selected.doctor': 'Selected Doctor',
    'choose.slot': 'Choose Time Slot',
    'save': 'Save',
    'cancel': 'Cancel',

    // Appointment Rescheduling
    'choose.new.slot': 'Choose New Time Slot',
    'no.slots.reschedule': 'No Available Time Slots for Rescheduling',
    'current.slot': 'Current Appointment',
    'previous.date': 'Previous date',
    'next.date': 'Next date',

    // Time Slot Messages
    'slot.past': 'This time slot is no longer available as it has passed',
    'slot.outside.hours': 'This time slot is outside hospital working hours (8 AM - 6 PM)',
  },
  vi: {
    // Header & Navigation
    'medical.center': 'Trung Tâm Y Tế',
    'nav.home': 'Trang Chủ',
    'nav.appointments': 'Lịch Hẹn',
    'nav.profile': 'Hồ Sơ',
    'nav.help': 'Trợ Giúp',
    'nav.need.help': 'Cần trợ giúp? Gọi cho chúng tôi',

    // Booking Pages
    'book.appointment.title': 'Đặt Lịch Khám',
    'book.appointment.subtitle': 'Thực hiện các bước đơn giản để đặt lịch khám',
    
    // Department Selection
    'department.select': 'Chọn Khoa',
    
    // Doctor Selection
    'doctor.select': 'Chọn Bác Sĩ',
    
    // Time Slot Selection
    'time.slot.select': 'Chọn Khung Giờ',
    
    // Profile Page
    'profile.title': 'Hồ Sơ Của Tôi',
    'profile.personal.info': 'Thông Tin Cá Nhân',
    'profile.edit': 'Chỉnh Sửa Hồ Sơ',
    'profile.name': 'Tên Đầy Đủ',
    'profile.phone': 'Số Điện Thoại',
    'profile.email': 'Thư Điện Tử',
    'profile.address': 'Địa Chỉ',
    
    // Help Page
    'help.title': 'Hỗ Trợ & Trợ Giúp',
    'help.subtitle': 'Chúng tôi ở đây để hỗ trợ bạn với mọi câu hỏi',
    'help.call.support': 'Hỗ Trợ Qua Điện Thoại',
    'help.video.guide': 'Hướng Dẫn Video',
    'help.email.support': 'Hỗ Trợ Qua Email',
    
    // Common
    'available': 'Còn Trống',
    'no.slots': 'Không Có Lịch Trống',
    'no.slots.message': 'Hiện tại không có lịch trống cho bác sĩ này. Vui lòng chọn bác sĩ khác hoặc quay lại sau.',
    'no.slots.date': 'Không có lịch trống cho ngày này',
    'selected.doctor': 'Bác Sĩ Đã Chọn',
    'choose.slot': 'Chọn Thời Gian',
    'save': 'Lưu',
    'cancel': 'Hủy',

    // Appointment Rescheduling
    'choose.new.slot': 'Chọn Thời Gian Mới',
    'no.slots.reschedule': 'Không Có Lịch Trống Để Đổi Lịch',
    'current.slot': 'Lịch Hẹn Hiện Tại',
    'previous.date': 'Ngày trước',
    'next.date': 'Ngày sau',

    // Time Slot Messages
    'slot.past': 'Khung giờ này không còn khả dụng vì đã qua',
    'slot.outside.hours': 'Khung giờ này nằm ngoài giờ làm việc của bệnh viện (8:00 - 18:00)',
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
