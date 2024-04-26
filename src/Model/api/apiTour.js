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

export const getListTour = async ({
  pageParam = 1,
  country_id,
  province_id,
  name = '',
}) => {
  const province = province_id ? `province_id=${province_id}` : '';
  const country = country_id ? `country_id=${country_id}` : '';
  const responsive = await instance.get(
    `/list-sell?page=${pageParam}&limit=10&${country}&${province}&name=${name}`,
  );

  return responsive.data;
};
export const getDetailTour = async id_tour => {
  const responsive = await instance.get(`/detail/${id_tour}`);

  return responsive.data;
};
export const getListTicket = async id_tour => {
  const responsive = await instance.get(`/detail/${id_tour}/list-ticket`);

  return responsive.data;
};
export const getDetailTicket = async id_ticket => {
  const responsive = await instance.get(`/ticket/${id_ticket}`);

  return responsive.data;
};
