import axios from 'axios';
import {baseUrl} from '../url';

export const instance = axios.create({
  baseURL: baseUrl,
});
export const getBanner = async () => {
  const responsive = await instance.get('/airdrop/index.json');

  return responsive.data;
};
