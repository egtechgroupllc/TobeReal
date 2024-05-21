import {useQuery} from '@tanstack/react-query';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getListCurrency} from '../Model/api/common';

interface CountryProps {
  onSaveCountry?: (data: string) => Promise<any>;
  onSaveCurrency?: (data: string) => Promise<any>;
  onClear?: () => Promise<any>;
  country?: any;
  currency?: any;
}
export const COUNTRY_KEY = '@country';
export const CURRENCY_KEY = '@currency';

export const CountryContext = createContext<CountryProps>({});
const dataFake = {
  currency_code: 'VND',
  flag: '🇻🇳',
  geoname_id: 1562822,
  id: 241,
  iso2: 'VN',
  iso3: 'VNM',
  name: 'Vietnam',
  phone_code: '+84',
};

export const CountryProvider = ({children}: {children: ReactNode}) => {
  const [country, setCountry] = useState<any>(dataFake); // Current language
  const [currency, setCurrency] = useState<any>({}); // Current language

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'list-currency'],
    queryFn: getListCurrency,
  });

  useEffect(() => {
    const loadCountry = async () => {
      const result = (await EncryptedStorage.getItem(COUNTRY_KEY)) || '';
      const resultCurrency =
        (await EncryptedStorage.getItem(CURRENCY_KEY)) || '';

      setCountry(JSON.parse(result));
      setCurrency(JSON.parse(resultCurrency));

      return result;
    };
    loadCountry();
  }, []);

  useEffect(() => {
    data?.data?.find((item: any) => {
      if (country?.currency_code === item?.currency_code) {
        onSaveCurrency(item);
      }
    });
  }, [data?.data, country]);

  const onSaveCountry = async (value: any) => {
    try {
      await EncryptedStorage.setItem(COUNTRY_KEY, JSON.stringify(value));
      setCountry(value);
    } catch (error) {
      console.log(error);
    }
  };
  const onSaveCurrency = async (value: any) => {
    try {
      await EncryptedStorage.setItem(CURRENCY_KEY, JSON.stringify(value));
      setCurrency(value);
    } catch (error) {
      console.log(error);
    }
  };

  const onClear = async () => {
    await EncryptedStorage.removeItem(COUNTRY_KEY);
    await EncryptedStorage.removeItem(CURRENCY_KEY);
  };

  const value = {
    onSaveCountry: onSaveCountry,
    onSaveCurrency: onSaveCurrency,
    onClear: onClear,
    country,
    currency,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};
