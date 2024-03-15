import axios from 'axios';
import {baseUrl} from './url';

const instance = axios.create({
  baseURL: baseUrl,
});
// ============================ Common =====================================

export const getProfile = async () => {
  const responsive = await instance.get('/api/v1/user/profile');

  return responsive.data;
};

export const getListCountry = async (province_id = '') => {
  const responsive = await instance.get(
    `/api/v1/common/list-country?geoname_id=${province_id}`,
  );

  return responsive.data;
};

export const getListCurrency = async () => {
  const responsive = await instance.get('/api/v1/common/list-currency');

  return responsive.data;
};

export const getListTypeRent = async () => {
  const responsive = await instance.get('/api/v1/accommodation/list-type');

  return responsive.data;
};
export const getListTypeEstate = async () => {
  const responsive = await instance.get('/api/v1/estate/list-type');

  return responsive.data;
};
