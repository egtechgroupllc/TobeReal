import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import vietnamese from '../languages/vi.json';
import english from '../languages/en.json';
import philipin from '../languages/ph.json';
import thailand from '../languages/th.json';
import malaysia from '../languages/ms.json';
import indonesia from '../languages/id.json';
import china from '../languages/zh.json';
import getTranslations from '../utils/getTranslations';
import {storage} from '../utils/MMKVStorage';
interface LanguageTranslations {
  [locale: string]: {[key: string]: string};
}
interface LanguageProps {
  locale?: string;
  changeLocale?: (data: string) => Promise<any>;
  t?: (key: keyof typeof english) => string;
}

const languageFallback: LanguageTranslations = {
  en: english,
  vi: vietnamese,
  ph: philipin,
  th: thailand,
  ms: malaysia,
  id: indonesia,
  zh: china,
};

export const LanguageContext = createContext<LanguageProps>({});

export const LanguageProvider = ({children}: {children: ReactNode}) => {
  const [locale, setLocale] = useState<string>('en'); // Current language
  const [translations, setTranslations] = useState<LanguageTranslations | null>(
    {},
  );
  // Tải dữ liệu translations từ GitHub
  useEffect(() => {
    const fetchTranslations = async () => {
      const translationsData = await getTranslations();

      setTranslations(translationsData);
    };

    fetchTranslations();
  }, []);

  const t = useCallback(
    (key: string, params: any) => {
      const text =
        translations?.[locale]?.[key] ||
        languageFallback?.[locale]?.[key] ||
        translations?.['en']?.[key] ||
        key;
      return params ? formatString(text, params) : text;
    },

    [translations, locale, languageFallback],
  );

  const changeLocale = async (newLocale: string) => {
    try {
      await storage.set('selectedLanguage', newLocale);
      setLocale(newLocale);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const restoreSelectedLanguage = async () => {
      try {
        const selectedLanguage = await storage.getString('selectedLanguage');

        if (selectedLanguage) {
          setLocale(selectedLanguage);
        }
      } catch (error) {
        //_console.log(error);
      }
    };

    restoreSelectedLanguage();
  }, []);

  const value = {
    t,
    changeLocale,
    locale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

function formatString(text: string, params: Record<string, string>): string {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, 'g'), value);
  }, text);
}
