'use client';

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };
  
  const srText = language === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label={srText}
      className="relative"
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">{srText}</span>
       <span className='hidden md:inline-block ml-2 font-bold text-sm'>{language.toUpperCase()}</span>
    </Button>
  );
}
