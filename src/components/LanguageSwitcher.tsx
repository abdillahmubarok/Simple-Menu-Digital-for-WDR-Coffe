'use client';

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label="Switch language"
      className="hidden md:inline-flex"
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        {language === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
      </span>
      <span className='ml-2 font-bold text-sm'>{language.toUpperCase()}</span>
    </Button>
  );
}
