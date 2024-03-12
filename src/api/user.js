import axios from 'axios';
import {baseUrl} from './url';

const instance = axios.create({
  baseURL: baseUrl,
});

export const getProfile = async () => {
  const responsive = await instance.get('/api/v1/user/profile');

  return responsive.data;
};

// ============================ Accommodation =====================================
export const getListRent = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/api/v1/accommodation/list-rent?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};
