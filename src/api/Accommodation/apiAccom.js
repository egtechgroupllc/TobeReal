import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/accommodation`,
});

export const getListRent = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/list-rent?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};

export const postCreateAccommoLease = async data => {
  const responsive = await instance.post('/create', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};

export const getMyListCreateAccom = async ({pageParam = 1, hasRoom}) => {
  const responsive = await instance.get(
    `/my-list?page=${pageParam}&limit=10${
      hasRoom || hasRoom === 0 ? `&hasRoom=${hasRoom}` : ''
    }`,
  );

  return responsive.data;
};
