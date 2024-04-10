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

// ==> LIST REVIEW ACCOMO <==
export const getListReviewAccmo = async ({id_accomo, pageParam = 1}) => {
  const responsive = await instance.get(
    `/${id_accomo}/list-review?limit=10&page=${pageParam}`,
  );

  return responsive.data;
};

// ==> DETAIL ACCOMO <==
export const getDetailAccmo = async id_accomo => {
  const responsive = await instance.get(`/detail/${id_accomo}`);

  return responsive.data;
};

// ==> LIST ROOM DETAIL ACCOMO <==
export const getListRoomDetailAccmo = async ({
  id_accomo,
  date_start,
  date_end,
  status = 'AVAILABLE',
}) => {
  const responsive = await instance.get(
    `/detail/${id_accomo}/list-room?date_start=${date_start}&date_end=${date_end}&status=${status}`,
  );

  return responsive.data;
};

// ==> BOOKING ROOM <==
export const postBookingRoom = async ({id_room, data}) => {
  const responsive = await instance.post(`room/${id_room}/booking`, data);

  return responsive.data;
};

export const getListPriceRoomDate = async ({id_room, date_start, date_end}) => {
  const responsive = await instance.get(
    `room/${id_room}/list-room-date?date_start=${date_start}&date_end=${date_end}`,
  );

  return responsive.data;
};
