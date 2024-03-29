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

export const getMyListCreateSell = async ({page = 1, limit = 10}) => {
  const responsive = await instance.get(`/my-list?page=${page}&limit=${limit}`);

  return responsive.data;
};
export const getListSell = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/list-sell?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};
