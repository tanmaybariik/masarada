"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, DictionaryKey, Language } from './dictionaries';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: DictionaryKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'bn',
  setLanguage: () => {},
  t: (key: DictionaryKey) => dictionaries.bn[key] || key,
});

export const LanguageProvider = ({ 
  children,
  initialLanguage = 'bn'
}: { 
  children: React.ReactNode,
  initialLanguage?: Language
}) => {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Sync state from client-side cookies if available on mount
  useEffect(() => {
    const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
    if (match) {
      const savedLang = match[2] as Language;
      if (savedLang === 'en' || savedLang === 'bn') {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`; // 1 year
  };

  const t = (key: DictionaryKey) => {
    return dictionaries[language][key] || dictionaries.bn[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
