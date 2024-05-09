import {useContext} from 'react';
import {CountryContext} from '../context/CountryContent';

export const useCountry = () => {
  return useContext(CountryContext);
};
