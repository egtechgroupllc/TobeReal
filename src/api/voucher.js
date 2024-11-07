import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/voucher',
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
export const postCreateVoucherDoctor = async data => {
  const response = await instance.post('/createVoucherDoctor', data);
  return response.data;
};
export const postUpdateVoucherDoctor = async ({id, data}) => {
  const response = await instance.put(`/updateVoucherDoctor/${id}`, data);
  return response.data;
};
export const postDeleteVoucherDoctor = async ({id, data}) => {
  const response = await instance.delete(`/deleteVoucherDoctor/${id}`, data);
  return response.data;
};
export const postBuyVoucherDoctor = async data => {
  const response = await instance.post('/buyVoucherDoctor', data);
  return response.data;
};
export const getListVoucherDoctor = async ({
  pageParam = 1,
  limit = 10,
  keyword,
}) => {
  const response = await instance.get(
    `/listVoucherDoctor?page=${pageParam}&limit=${limit}&keyword=${keyword}`,
  );

  return response.data;
};
getListVoucherDoctor.queryKey = ['voucher', 'listVoucherDoctor'];
export const getListVoucherUser = async ({
  pageParam = 1,
  limit = 10,
  keyword,
}) => {
  const response = await instance.get(
    `/listVoucherUser?page=${pageParam}&limit=${limit}&keyword=${keyword}`,
  );

  return response.data;
};
getListVoucherUser.queryKey = ['voucher', 'listVoucherUser'];

export const getDetailVoucherDoctor = async ({id}) => {
  const response = await instance.get(`/detailVoucherDoctor/${id}`);

  return response.data;
};
getDetailVoucherDoctor.queryKey = ['voucher', 'detailVoucherDoctor'];
