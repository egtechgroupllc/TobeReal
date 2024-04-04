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
    `/list-post?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};

export const deleteEstate = async ({id_estate}) => {
  const responsive = await instance.delete(`/${id_estate}/delete`);
  return responsive.data;
};

export const postUpdateEstate = async ({id_estate, data}) => {
  const responsive = await instance.post(`/${id_estate}/update`, data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};
