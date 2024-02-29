import React, {createContext, useState, useEffect, ReactNode} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import getTranslations from '../languages/languagesApi';
import vietnamese from '../languages/vi.json';
import english from '../languages/en.json';
import philipin from '../languages/ph.json';
import thailand from '../languages/th.json';
import malaysia from '../languages/my.json';
import indonesia from '../languages/id.json';
import china from '../languages/cn.json';
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
  my: malaysia,
  id: indonesia,
  cn:china
};

export const LanguageContext = createContext<LanguageProps>({});

export const LanguageProvider = ({children}: {children: ReactNode}) => {
  const [locale, setLocale] = useState<string>('en'); // Current language
  const [translations, setTranslations] = useState<LanguageTranslations>({});

  const t = React.useMemo(() => {
    return (key: string) => {
      return (
        translations?.[locale]?.[key] ||
        languageFallback?.[locale]?.[key] ||
        key
      );
    };
  }, [locale, translations, languageFallback]);

  const changeLocale = async (newLocale: string) => {
    try {
      await EncryptedStorage.setItem('selectedLanguage', newLocale);
      setLocale(newLocale);
    } catch (error) {
      console.log(error);
    }
  };

  // Tải dữ liệu translations từ GitHub
  useEffect(() => {
    const fetchTranslations = async () => {
      const translationsData = await getTranslations();
      setTranslations(translationsData);
    };

    fetchTranslations();
  }, []);

  // Khôi phục ngôn ngữ đã lưu khi ứng dụng khởi động
  useEffect(() => {
    const restoreSelectedLanguage = async () => {
      try {
        const selectedLanguage = await EncryptedStorage.getItem(
          'selectedLanguage',
        );
      
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
