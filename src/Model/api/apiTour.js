import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/tour`,
});

export const postCreateTour = async data => {
  const responsive = await instance.post('/create', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};

export const getMyListCreateTour = async ({page = 1, hasRoom, limit = 10}) => {
  // const responsive = await instance.get(
  //   `/my-list?page=${page}&limit=${limit}${
  //     hasRoom || hasRoom === 0 ? `&hasRoom=${hasRoom}` : ''
  //   }`,
  // );
  const responsive = await instance.get(`/my-list`);

  return responsive.data;
};
