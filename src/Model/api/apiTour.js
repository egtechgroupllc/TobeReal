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

export const getMyListCreateTour = async ({
  page = 1,
  hasTicket,
  limit = 10,
}) => {
  const responsive = await instance.get(
    `/my-list?page=${page}&limit=${limit}${
      hasTicket || hasTicket === 0 ? `&hasTicket=${hasTicket}` : ''
    }`,
  );

  return responsive.data;
};

export const postAddTicket = async ({data, tour_id}) => {
  const responsive = await instance.post(`/${tour_id}/add-ticket`, data);

  return responsive.data;
};

export const getListTour = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/list-sell?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};
