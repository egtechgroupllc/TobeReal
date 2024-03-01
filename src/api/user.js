import axios from 'axios';
import {baseUrl} from './url';

const instance = axios.create({
  baseURL: baseUrl,
});

export const getProfile = async token => {
  const responsive = await instance.get('/api/v1/user/profile');

  return responsive.data;
};
