import React, {createContext, useState, useEffect, ReactNode} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import getTranslations from '../languages/languagesApi';
import vietnamese from '../languages/vi.json';
import english from '../languages/en.json';

interface LanguageTranslations {
  [locale: string]: {[key: string]: string};
}
interface LanguageProps {
  locale?: string;
  changeLocale?: (data: any) => Promise<any>;
  t?: (key: keyof typeof english) => string;
}

const languageFallback: LanguageTranslations = {
  en: english,
  vi: vietnamese,
};

export const LanguageContext = createContext<LanguageProps>({});

export const LanguageProvider = ({children}: {children: ReactNode}) => {
  const [locale, setLocale] = useState<string>('en'); //ngôn ngữ hiện tại
  const [translations, setTranslations] = useState<LanguageTranslations | null>(
    null,
  ); //lưu trữ dữ liệu các bản dịch

  const t = React.useMemo(() => {
    return (key: string) => {
      return (
        languageFallback[locale][key] ||
        (translations && translations?.[locale]?.[key]) ||
        key
      );
    };
  }, [locale, translations]);

  const changeLocale = async (newLocale: string) => {
    setLocale(newLocale);
    try {
      await EncryptedStorage.setItem('selectedLanguage', newLocale);
    } catch (error) {
      //_console.log(error);
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
