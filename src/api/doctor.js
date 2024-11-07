import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/doctor',
});

instance.interceptors.request.use(async req => {
  const storedToken = await EncryptedStorage.getItem(TOKEN_KEY);
  if (storedToken) {
    req.headers['token'] = `EG ${storedToken}`;
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
export const postRegisterDoctor = async data => {
  const response = await instance.post('/create-info', data);

  return response.data;
};
export const postUpdateDoctor = async data => {
  const response = await instance.put('/update-info', data);

  return response.data;
};
export const postCreateDateWorking = async data => {
  const response = await instance.post('/create-date-working', data);

  return response.data;
};
export const postUpdateDateWorking = async ({id, data}) => {
  const response = await instance.put(`/update-date-working/${id}`, data);

  return response.data;
};
export const postDeleteDateWorking = async id => {
  const response = await instance.delete(`/delete-date-working/${id}`);

  return response.data;
};
export const getDateWorkingDoctor = async ({
  date_start,
  date_end,
  type,
  status,
}) => {
  const response = await instance.get(
    `/get-date-working-doctor?date_start=${date_start}&date_end=${date_end}&type=${type}&status=${status}`,
  );
  return response.data;
};
getDateWorkingDoctor.queryKey = ['doctor', 'get-date-working'];

export const getListDoctor = async ({limit = 10, pageParam = 1, keyword}) => {
  const response = await instance.get(
    `/get-all-doctor?keyword=${keyword}&limit=${limit}&page=${pageParam}`,
  );
  return response.data;
};
getListDoctor.queryKey = ['doctor', 'get-all-doctor'];
export const getDetailDoctor = async ({id}) => {
  const response = await instance.get(`/detail_doctor/${id}`);
  return response.data;
};
getDetailDoctor.queryKey = ['doctor', 'detail-doctor'];

export const getExaminationPrice = async data => {
  const response = await instance.get('/get-examination-price', data);

  return response.data;
};
getExaminationPrice.queryKey = ['doctor', 'get-examination-price'];

export const postCreatePriceExamination = async data => {
  const response = await instance.post('/create-examination-price', data);

  return response.data;
};
export const postUpdatePriceExamination = async ({id, data}) => {
  const response = await instance.put(`/update-examination-price/${id}`, data);

  return response.data;
};
export const postDeletePriceExamination = async id => {
  const response = await instance.delete(`/delete-examination-price/${id}`);

  return response.data;
};

export const postCreateServicePrice = async data => {
  const response = await instance.post('/create-service-price', data);

  return response.data;
};
export const postUpdateServicePrice = async ({id, data}) => {
  const response = await instance.put(`/update-service-price/${id}`, data);

  return response.data;
};
export const postDeleteServicePrice = async id => {
  const response = await instance.delete(`/delete-service-price/${id}`);

  return response.data;
};
