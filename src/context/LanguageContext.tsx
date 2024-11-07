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
