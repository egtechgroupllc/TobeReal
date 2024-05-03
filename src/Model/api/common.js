import axios from 'axios';
import {baseUrl} from '../url';

export const instanceCommon = axios.create({
  baseURL: baseUrl + '/api/v1',
});
// ============================ Common =====================================

export const getProfile = async token => {
  const responsive = await instanceCommon.get('/user/profile', {
    headers: {
      Authorization: token,
    },
  });

  return responsive.data;
};

export const getListCountry = async (province_id = '') => {
  const responsive = await instanceCommon.get(
    `/common/list-country?geoname_id=${province_id}`,
  );

  return responsive.data;
};

export const getListCurrency = async () => {
  const responsive = await instanceCommon.get('/common/list-currency');

  return responsive.data;
};

export const getListTypeRent = async () => {
  const responsive = await instanceCommon.get('/accommodation/list-type');

  return responsive.data;
};

export const getListTypeEstateSell = async () => {
  const responsive = await instanceCommon.get('/estate/list-type');

  return responsive.data;
};

export const getListDirection = async () => {
  const responsive = await instanceCommon.get('common/list-direction');

  return responsive.data;
};

export const getListPackagePost = async () => {
  const responsive = await instanceCommon.get('common/list-package-post');

  return responsive.data;
};
export const getListConstant = async () => {
  const responsive = await instanceCommon.get('common/list-constant');

  return responsive.data;
};
