import axios from 'axios';
import {baseUrl} from '../url';

export const instanceAccom = axios.create({
  baseURL: `${baseUrl}/api/v1/accommodation`,
});

export const getListTypeRoom = async () => {
  const responsive = await instanceAccom.get('/room/list-type');

  return responsive.data;
};

export const getListTypeBed = async () => {
  const responsive = await instanceAccom.get('/room/list-bed-type');

  return responsive.data;
};

export const getListRent = async ({
  pageParam = 1,
  date_start,
  date_end,
  number_room = 1,
  accommodation_type_id = 1,
  province_id,
  country_id,
  number_occupancy = 1,
}) => {
  const province = province_id ? `province_id=${province_id}` : '';
  const country = country_id ? `country_id=${country_id}` : '';

  const responsive = await instanceAccom.get(
    `/list-rent?page=${pageParam}&limit=10&date_start=${date_start}&date_end=${date_end}&number_room=${number_room}&accommodation_type_id=${accommodation_type_id}&${province}&${country}&number_occupancy=${number_occupancy}`,
  );

  return responsive.data;
};

export const postCreateAccommoLease = async data => {
  const responsive = await instanceAccom.post('/create', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};

export const getMyListCreateAccom = async ({page = 1, hasRoom, limit = 10}) => {
  const responsive = await instanceAccom.get(
    `/my-list?page=${page}&limit=${limit}${
      hasRoom || hasRoom === 0 ? `&hasRoom=${hasRoom}` : ''
    }`,
  );

  return responsive.data;
};

// ==> LIST REVIEW ACCOMO <==
export const getListReviewAccmo = async ({id_accomo, pageParam = 1}) => {
  const responsive = await instanceAccom.get(
    `/${id_accomo}/list-review?limit=10&page=${pageParam}`,
  );

  return responsive.data;
};

// ==> DETAIL ACCOMO <==
export const getDetailAccmo = async id_accomo => {
  const responsive = await instanceAccom.get(`/detail/${id_accomo}`);

  return responsive.data;
};

// ==> API  ROOM  <==
export const postCreateAccommoRoomLease = async ({id_accomo, formData}) => {
  const responsive = await instanceAccom.post(
    `/${id_accomo}/add-room`,
    formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );

  return responsive.data;
};

export const getListRoomDetailAccmo = async ({
  id_accomo,
  date_start,
  date_end,
  status = 'ACTIVE',
  number_room = 1,
}) => {
  const responsive = await instanceAccom.get(
    `/detail/${id_accomo}/list-room?date_start=${date_start}&date_end=${date_end}&status=${status}&number_room=${number_room}`,
  );

  return responsive.data;
};

export const postBookingRoom = async ({id_room, data}) => {
  const responsive = await instanceAccom.post(`room/${id_room}/booking`, data);

  return responsive.data;
};

export const getListPriceRoomDate = async ({id_room, date_start, date_end}) => {
  const responsive = await instanceAccom.get(
    `room/${id_room}/list-room-date?date_start=${date_start}&date_end=${date_end}`,
  );

  return responsive.data;
};

// export const getDetailRoom = async ({id_room, date_start, date_end}) => {
//   const responsive = await instanceAccom.get(
//     `room/${id_room}/list-room-date?date_start=${date_start}&date_end=${date_end}`,
//   );

//   return responsive.data;
// };
