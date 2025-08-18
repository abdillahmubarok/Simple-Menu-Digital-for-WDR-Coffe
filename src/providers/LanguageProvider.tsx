'use client';

import { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import id from '@/locales/id.json';
import en from '@/locales/en.json';

type Language = 'id' | 'en';

const translations = { id, en };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en' || browserLang === 'id') {
      setLanguage(browserLang);
    } else {
      setLanguage('id'); // Default to Indonesian
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);


  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key as keyof typeof translations[Language]] || key;
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    return translation;
  }, [language]);


  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
