import axios from 'axios';
import {baseUrl} from '../url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '../../context/AuthContext';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/tour`,
});

instance.interceptors.request.use(async req => {
  if (typeof window !== 'undefined') {
    const storedToken = await EncryptedStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      req.headers.Authorization = `Bearer ${storedToken}`;
    }
  }

  return req;
});
let countErr = 0;
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401 && countErr < 1) {
      Alert.alert(
        'Notification',
        'Your account has been logged in from another device, please log in again!',
        [{text: 'OK', onPress: () => handleLogoutExistToken()}],
      );

      ++countErr;
    }
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
export const postUpdateTypeTicket = async data => {
  const responsive = await instance.post('/ticket/item/update', data);

  return responsive.data;
};
export const getListTour = async ({
  pageParam = 1,
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
    `/list-sell?page=${pageParam}&limit=10&${country}&${province}&name=${name}&${minprice}&${maxprice}&date_start=${date_start}&date_end=${date_end}&${dist}&${lat}&${long}&currency_id=${currency_id}`,
  );
  return responsive.data;
};
export const postPriceTicketDate = async data => {
  const responsive = await instance.post('/ticket/manage-ticket-date', data);

  return responsive.data;
};
export const postAddTicketDate = async ({id_ticket, dataTicket}) => {
  const responsive = await instance.post(
    `/ticket/${id_ticket}/add-ticket-date`,
    dataTicket,
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
  const dateStart = date_start ? `date_start=${date_start}` : '';
  const dateEnd = date_end ? `date_end=${date_end}` : '';
  const responsive = await instance.get(
    `/ticket/${id_ticket}/list-ticket-date?${dateStart}&${dateEnd}`,
  );

  return responsive.data;
};
export const getListBookingTour = async ({pageParam = 1, limit = 10}) => {
  const responsive = await instance.get(
    // `/room/booking/my-booking?limit=${limit}&page=${pageParam}`,
    `/ticket/booking/my-booking?page=${pageParam}&limit=${limit}`,
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
export const getListPopularCountryTour = async (hidden_id = '') => {
  const responsive = await instance.get(
    `/statistic/popular-country?hidden_id=${hidden_id}`,
  );

  return responsive.data;
};

export const postCreateVoucherTour = async data => {
  const responsive = await instance.post('/voucher/create', data);

  return responsive.data;
};

export const getListVoucherTourSelling = async tour_id => {
  const responsive = await instance.get(
    `/detail/${tour_id}/list-voucher-selling`,
  );

  return responsive.data;
};

export const getListVoucherTourCanUse = async tour_id => {
  const responsive = await instance.get(`/${tour_id}/list-voucher-can-use`);

  return responsive.data;
};

export const postBuyVoucherTour = async data => {
  const responsive = await instance.post('/voucher/buy', data);

  return responsive.data;
};

export const postReviewTour = async data => {
  const responsive = await instance.post('ticket/booking/post-review', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};
