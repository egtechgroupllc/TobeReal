import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/tour`,
});

// Định nghĩa hàm xử lý lỗi toàn cục
const handleGlobalError = err => {
  const status = err.response?.status || 500;
  switch (status) {
    case 401:
    case 403:
    case 400:
    case 404:
    case 409:
    case 422:
    default:
  }
};

// Thiết lập interceptor để xử lý lỗi toàn cục
axios.interceptors.response.use(
  response => response,
  error => {
    handleGlobalError(error);
    return Promise.reject(error);
  },
);
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
export const postAddTypeTicket = async data => {
  const responsive = await instance.post('/ticket/item/create', data);

  return responsive.data;
};
export const getListTour = async ({
  page = 1,
  country_id,
  province_id,
  name = '',
  min_price = 0,
  max_price,
  currency_id = 151,
}) => {
  const province = province_id ? `province_id=${province_id}` : '';
  const country = country_id ? `country_id=${country_id}` : '';
  const maxPrice = max_price ? `max_price=${max_price}` : '';
  const responsive = await instance.get(
    `/list-sell?page=${page}&limit=10&${country}&${province}&name=${name}&min_price=${min_price}&${maxPrice}&currency_id=${currency_id}`,
  );

  return responsive.data;
};
export const getDetailTour = async id_tour => {
  const responsive = await instance.get(`/detail/${id_tour}`);

  return responsive.data;
};
export const getListTicket = async ({id_tour}) => {
  const responsive = await instance.get(`/detail/${id_tour}/list-ticket`);

  return responsive.data;
};
export const getDetailTicket = async id_ticket => {
  const responsive = await instance.get(`/ticket/${id_ticket}`);

  return responsive.data;
};
export const deleteTour = async ({id_tour}) => {
  const responsive = await instance.delete(`/${id_tour}`);
  return responsive.data;
};
export const deleteTicket = async ({id_ticket}) => {
  const responsive = await instance.delete(`/ticket/${id_ticket}`);
  return responsive.data;
};
export const getListReviewTour = async ({
  id_tour,
  pageParam = 1,
  limit = 10,
}) => {
  const responsive = await instance.get(
    `/${id_tour}/list-review?limit=${limit}&page=${pageParam}`,
  );

  return responsive.data;
};
