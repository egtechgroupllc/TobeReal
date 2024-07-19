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
export const postUpdateTour = async ({data, id_tour}) => {
  const responsive = await instance.post(`/${id_tour}/update`, data, {
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
  min_price,
  max_price,
  date_start,
  date_end,
  latitude,
  longitude,
  distance,
  currency_id = 1,
}) => {
  const province = province_id ? `province_id=${province_id}` : '';
  const country = country_id ? `country_id=${country_id}` : '';
  const minprice = min_price ? `min_price=${min_price}` : '';
  const maxprice = max_price ? `max_price=${max_price}` : '';
  const dist = distance ? `distance=${distance}` : '';
  const lat = latitude ? `latitude=${latitude}` : '';
  const long = longitude ? `longitude=${longitude}` : '';
  const responsive = await instance.get(
    `/list-sell?page=${page}&${country}&${province}&name=${name}&${minprice}&${maxprice}&date_start=${date_start}&date_end=${date_end}&${dist}&${lat}&${long}&currency_id=${currency_id}`,
  );

  return responsive.data;
};
export const getDetailTour = async id_tour => {
  const responsive = await instance.get(`/detail/${id_tour}`);

  return responsive.data;
};
export const getListTicket = async ({id_tour, date_start, date_end}) => {
  const dateStart = date_start ? `date_start=${date_start}` : '';
  const dateEnd = date_end ? `date_end=${date_end}` : '';
  const responsive = await instance.get(
    `/detail/${id_tour}/list-ticket?${dateStart}&${dateEnd}`,
  );

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
export const deleteTicketItem = async ({id_ticket_item}) => {
  const responsive = await instance.delete(`/ticket/item/${id_ticket_item}`);
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
export const getListTicketDate = async ({id_ticket, date_start, date_end}) => {
  const responsive = await instance.get(
    `/ticket/${id_ticket}/list-ticket-date?date_start=${date_start}&date_end=${date_end}`,
  );

  return responsive.data;
};
export const getListBookingTour = async ({pageParam = 1, limit = 10}) => {
  const responsive = await instance.get(
    // `/room/booking/my-booking?limit=${limit}&page=${pageParam}`,
    `/ticket/booking/my-booking`,
  );

  return responsive.data;
};
export const postBookingTour = async data => {
  const responsive = await instance.post('/ticket/booking/create-order', data);

  return responsive.data;
};

export const getListPopularProvinceTour = async (parent = '') => {
  const responsive = await instance.get(
    `/statistic/popular-province?parent=${parent}`,
  );

  return responsive.data;
};
