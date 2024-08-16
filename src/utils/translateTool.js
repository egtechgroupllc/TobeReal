import {useState, useCallback, useMemo} from 'react';
import translate from 'translate';
import {useLanguage} from '../hooks/useLanguage';
import {useCountry} from '../hooks/useCountry';
const dataISO = [
  {
    iso2: 'VN',
    locale: 'vi',
  },
  {
    iso2: 'US',
    locale: 'en',
  },
  {
    iso2: 'CN',
    locale: 'cn',
  },
  {
    iso2: 'ID',
    locale: 'id',
  },
  {
    iso2: 'MY',
    locale: 'ms',
  },
  {
    iso2: 'TH',
    locale: 'th',
  },
  {
    iso2: 'PH',
    locale: 'ph',
  },
];
translate.engine = 'google'; // Set the translation engine

const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {locale} = useLanguage();
  const {country} = useCountry();

  //   const dataFrom = useMemo(() => {
  //     // Ensure country?.iso2 is defined before filtering
  //     return dataISO?.filter(item => item.iso2 === country?.iso2);
  //   }, [country?.iso2]);
  const dataFrom = useMemo(() => {
    const result = dataISO.map(item => {
      return item;
    });

    return result?.find(item => item.iso2 === country?.iso2);
  }, [country?.iso2]);

  const functionTranslations = async text => {
    try {
      const result = await translate(text, {
        from: dataFrom?.locale,
        to: locale,
      }).catch(error => {
        console.log(error);
      });
      return result;
    } catch (error) {
      console.error('Error during translation:', error);
      throw error;
    }
  };

  const translateTexts = useCallback(async (...texts) => {
    if (texts.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const translatedTexts = await Promise.all(
        texts.map(async text => {
          try {
            const translatedText = await functionTranslations(text);
            return {text, translatedText};
          } catch (error) {
            console.error(`Error translating text: ${text}`, error);
            return {text, translatedText: ''};
          }
        }),
      );

      const result = translatedTexts.reduce((acc, {text, translatedText}) => {
        acc[text] = translatedText;
        return acc;
      }, {});

      setTranslations(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    translations,
    loading,
    error,
    translateTexts, // Expose this function for translating multiple texts
  };
};

export default useTranslation;
