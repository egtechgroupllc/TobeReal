import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/accommodation`,
});

export const getListTypeRoom = async () => {
  const responsive = await instance.get('/room/list-type');

  return responsive.data;
};

export const getListTypeBed = async () => {
  const responsive = await instance.get('/room/list-bed-type');

  return responsive.data;
};

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

export const getMyListCreateAccom = async ({page = 1, hasRoom, limit = 10}) => {
  const responsive = await instance.get(
    `/my-list?page=${page}&limit=${limit}${
      hasRoom || hasRoom === 0 ? `&hasRoom=${hasRoom}` : ''
    }`,
  );

  return responsive.data;
};

// ==> API CREATE ROOM FOR ACCOMO <==
export const postCreateAccommoRoomLease = async ({id_accomo, formData}) => {
  const responsive = await instance.post(`/${id_accomo}/add-room`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};
