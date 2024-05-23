import axios from 'axios';
import {baseUrl} from '../url';

export const instanceCommon = axios.create({
  baseURL: baseUrl + '/api/v1',
});
// ============================ Common =====================================
export const getUserInfoLocation = async ({lat, lon}) => {
  // Encode the latitude and longitude to ensure they are correctly formatted
  const encodedLat = encodeURIComponent(lat);
  const encodedLon = encodeURIComponent(lon);

  // Construct the request URL
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${encodedLat}&lon=${encodedLon}&format=json`;

  // Make the GET request to the Nominatim API
  const response = await axios.get(url);

  // Return the response data
  return response.data;
};

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
