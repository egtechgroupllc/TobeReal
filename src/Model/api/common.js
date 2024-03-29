import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1',
});
// ============================ Common =====================================

export const getProfile = async () => {
  const responsive = await instance.get('/user/profile');

  return responsive.data;
};

export const getListCountry = async (province_id = '') => {
  const responsive = await instance.get(
    `/common/list-country?geoname_id=${province_id}`,
  );

  return responsive.data;
};

export const getListCurrency = async () => {
  const responsive = await instance.get('/common/list-currency');

  return responsive.data;
};

export const getListTypeRent = async () => {
  const responsive = await instance.get('/accommodation/list-type');

  return responsive.data;
};

export const getListTypeEstateSell = async () => {
  const responsive = await instance.get('/estate/list-type');

  return responsive.data;
};

export const getListDirection = async () => {
  const responsive = await instance.get('common/list-direction');

  return responsive.data;
};
