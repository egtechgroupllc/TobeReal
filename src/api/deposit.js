import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/deposit',
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

export const getDepositMethod = async data => {
  const response = await instance.get('/list-method', data);
  return response.data;
};
getDepositMethod.queryKey = ['deposit', 'list-method'];
export const getDepositHistory = async data => {
  const response = await instance.get('/list-order', data);
  return response.data;
};
getDepositHistory.queryKey = ['deposit', 'list-order'];

export const postInitOrderDeposit = async data => {
  const response = await instance.post('/initial-order', data);
  return response.data;
};
export const postCreateDeposit = async data => {
  const response = await instance.post('/create-order', data);
  return response.data;
};

export const getListCurrency = async ({pageParam = 1, limit = 10, keyword}) => {
  const response = await instance.get(
    `/list-currency?page=${pageParam}&limit=${limit}&keyword=${keyword}`,
  );

  return response.data;
};
getListCurrency.queryKey = ['deposit', 'list-currency'];
