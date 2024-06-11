import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1/estate`,
});

export const postCreateEstatSell = async data => {
  const responsive = await instance.post('/post-estate', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};

export const getMyListCreateSell = async ({page = 1, limit = 10}) => {
  const responsive = await instance.get(`/my-list?page=${page}&limit=${limit}`);

  return responsive.data;
};
export const getListSell = async ({
  pageParam = 1,
  country_id,
  province_id,
  estate_type_id,
  title = '',
  min_price,
  max_price,
  latitude,
  longitude,
  distance,
  min_size,
  max_size,
}) => {
  const province = province_id ? `province_id=${province_id}` : '';
  const country = country_id ? `country_id=${country_id}` : '';
  const estate_type = estate_type_id ? `estate_type_id=${estate_type_id}` : '';
  const minprice = min_price ? `min_price=${min_price}` : '';
  const maxprice = max_price ? `max_price=${max_price}` : '';
  const lat = latitude ? `latitude=${latitude}` : '';
  const long = longitude ? `longitude=${longitude}` : '';
  const dist = distance ? `distance=${distance}` : '';
  const minsize = min_size ? `min_size=${min_size}` : '';
  const maxsize = max_size ? `max_size=${max_size}` : '';
  const responsive = await instance.get(
    `/list-post?page=${pageParam}&limit=10&${country}&${province}&${estate_type}&title=${title}&${minprice}&${maxprice}&${lat}&${long}&${dist}&${minsize}&${maxsize}`,
  );

  return responsive.data;
};

export const deleteEstate = async ({id_estate}) => {
  const responsive = await instance.delete(`/${id_estate}/delete`);
  return responsive.data;
};

export const postUpdateEstate = async ({id_estate, data}) => {
  const responsive = await instance.post(`/${id_estate}/update`, data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};

export const getDetailEstate = async id_estate => {
  const responsive = await instance.get(`/detail/${id_estate}`);

  return responsive.data;
};
