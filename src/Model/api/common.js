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
  const responsive = await instanceCommon.get(
    '/user/profile',
    token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {},
  );

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

////-----Video-Short------//
export const getListVideoRandom = async ({table_name = ''}) => {
  const responsive = await instanceCommon.get(
    `/video-short/list-random?table_name=${table_name}`,
  );

  return responsive.data;
};

export const getLinkData = async ({table_name, table_id, token}) => {
  const responsive = await instanceCommon.get(
    `/video-short/linked-data?table_name=${table_name}&table_id=${table_id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return responsive.data;
};
export const getMyListVideoShort = async ({table_name, table_id, token}) => {
  const responsive = await instanceCommon.get(
    `/video-short/my-list?table_name=${table_name}&table_id=${table_id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return responsive.data;
};
export const postVideoShort = async ({data, token}) => {
  const responsive = await instanceCommon.post(
    '/video-short/post-video',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    },
  );

  return responsive.data;
};
