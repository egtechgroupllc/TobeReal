import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/estate`,
});

export const postCreateEstatSell = async data => {
  const responsive = await instance.post('/post-estate', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};
