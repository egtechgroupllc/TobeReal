import {useQuery} from '@tanstack/react-query';
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  getListCountry,
  getListCurrency,
  getUserInfoLocation,
} from '../Model/api/common';
import {getCurrentLocation} from '../utils/getCurrentLocation';

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
  const [country, setCountry] = useState<any>({}); // Current language
  const [currency, setCurrency] = useState<any>({}); // Current language
  // const [coordinates, setCoordinates] = useState<any>({});

  const {data, isLoading, isError} = useQuery({
    queryKey: ['common', 'list-currency'],
    queryFn: getListCurrency,
  });

  // const {data: dataCountry} = useQuery({
  //   queryKey: ['common', 'list-country'],
  //   queryFn: () => getListCountry(),
  // });

  // useEffect(() => {
  //   const currentPosition = async () => {
  //     const {coords} = await getCurrentLocation();

  //     if (coords) {
  //       const currenCoords = {
  //         latitude: coords?.latitude,
  //         longitude: coords?.longitude,
  //       };

  //       setCoordinates(currenCoords);
  //     }
  //   };
  //   currentPosition();
  // }, []);

  // const {
  //   data: dataUserInfoLocation,
  //   isSuccess,
  //   error,
  // } = useQuery({
  //   queryKey: ['common', 'user-info-location'],
  //   queryFn: () =>
  //     getUserInfoLocation({
  //       lat: +coordinates?.latitude,
  //       lon: +coordinates?.longitude,
  //     }),
  //   enabled: !!coordinates,
  // });

  // useEffect(() => {
  //   const dataUserCountry =
  //     dataUserInfoLocation?.address?.country_code.toUpperCase();
  //   // console.log({dataUserInfoLocation, dataUserCountry}, '12312aaaa3123312aaa');

  //   dataCountry?.data?.find((item: any) => {
  //     if (item?.iso2 === dataUserCountry) {
  //       onSaveCountry(item);
  //       return;
  //     }
  //   });
  // }, [dataCountry?.data, dataUserInfoLocation, coordinates]);

  useEffect(() => {
    const loadCountry = async () => {
      const result = (await EncryptedStorage.getItem(COUNTRY_KEY)) || '';
      const resultCurrency =
        (await EncryptedStorage.getItem(CURRENCY_KEY)) || '';

      if (result) {
        setCountry(JSON.parse(result));
      }
      if (resultCurrency) {
        setCurrency(JSON.parse(resultCurrency));
      }

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
