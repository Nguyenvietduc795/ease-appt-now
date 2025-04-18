
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="w-9 px-0"
      aria-label="Toggle language"
    >
      <Globe className="h-[1.2rem] w-[1.2rem]" />
      <span className="ml-1 text-xs font-bold">{language.toUpperCase()}</span>
    </Button>
  );
};

export default LanguageToggle;
