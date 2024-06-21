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
  province_id,
  country_id,
  number_occupancy = 1,
  name = '',
  min_price,
  max_price,
  currency_id = 1,
  latitude,
  longitude,
  distance,
  accommodation_type_id,
}) => {
  const province = province_id ? `province_id=${province_id}` : '';
  const country = country_id ? `country_id=${country_id}` : '';
  const minprice = min_price ? `min_price=${min_price}` : '';
  const maxprice = max_price ? `max_price=${max_price}` : '';
  const lat = latitude ? `latitude=${latitude}` : '';
  const long = longitude ? `longitude=${longitude}` : '';
  const dist = distance ? `distance=${distance}` : '';
  const accommodation_type = accommodation_type_id
    ? `accommodation_type_id=${accommodation_type_id}`
    : '';
  const responsive = await instanceAccom.get(
    `/list-rent?page=${pageParam}&limit=10&date_start=${date_start}&date_end=${date_end}&number_room=${number_room}&${accommodation_type}&${province}&${country}&number_occupancy=${number_occupancy}&name=${name}&${minprice}&${maxprice}&currency_id=${currency_id}&${lat}&${long}&${dist}`,
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
export const postUpdateAccom = async ({id_room, formData}) => {
  const responsive = await instanceAccom.post(
    `/room/${id_room}/update`,
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
  number_occupancy = 1,
  number_child_occupancy,
  child_age = [],
}) => {
  const number_child = number_child_occupancy
    ? `number_child_occupancy=${number_child_occupancy}&child_age=${child_age}`
    : '';
  const responsive = await instanceAccom.get(
    `/detail/${id_accomo}/list-room?date_start=${date_start}&date_end=${date_end}&status=${status}&number_room=${number_room}&number_occupancy=${number_occupancy}&${number_child}`,
  );

  return responsive.data;
};

export const postBookingRoom = async data => {
  const responsive = await instanceAccom.post(
    'room/booking/create-order',
    data,
  );

  return responsive.data;
};
export const postPaypal = async data => {
  const responsive = await axios.post(baseUrl + '/api/v1/paypal/pay', data);

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

// ==> API REVIEW  <==

export const postReviewAccmo = async data => {
  const responsive = await instanceAccom.post(
    'room/booking/post-review',
    data,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );

  return responsive.data;
};

export const getListReviewAccmo = async ({
  id_accomo,
  pageParam = 1,
  limit = 10,
}) => {
  const responsive = await instanceAccom.get(
    `/${id_accomo}/list-review?limit=${limit}&page=${pageParam}`,
  );

  return responsive.data;
};

// ==> API LIST BOOKING  <==
export const getListBookingAccomo = async ({pageParam = 1, limit = 10}) => {
  const responsive = await instanceAccom.get(
    // `/room/booking/my-booking?limit=${limit}&page=${pageParam}`,
    `/room/booking/my-booking`,
  );

  return responsive.data;
};

// API CREATE POLICY

export const postCreatePolicyToAccom = async data => {
  const responsive = await instanceAccom.post('policy/create', data);

  return responsive.data;
};

export const getListPolicy = async ({accommodation_id, room_id}) => {
  const accomId = accommodation_id
    ? `accommodation_id=${accommodation_id}`
    : '';
  const roomId = room_id ? `room_id=${room_id}` : '';
  const responsive = await instanceAccom.get(
    `/policy/list?${accomId}&${roomId}`,
  );

  return responsive.data;
};
export const getDetailRoom = async ({room_id}) => {
  const responsive = await instanceAccom.get(`/room/${room_id}`);

  return responsive.data;
};
export const postPolicyToRoom = async data => {
  const responsive = await instanceAccom.post('/policy/policy-to-room', data);

  return responsive.data;
};
export const deleteRoom = async ({id_room}) => {
  const responsive = await instanceAccom.delete(`/room/${id_room}`);
  return responsive.data;
};
export const deletePolicy = async ({id_policy}) => {
  const responsive = await instanceAccom.delete(`/policy/${id_policy}`);
  return responsive.data;
};
export const deleteAccom = async ({id_accom}) => {
  const responsive = await instanceAccom.delete(`/${id_accom}`);
  return responsive.data;
};
