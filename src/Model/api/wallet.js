import axios from 'axios';
import {baseUrl} from '../url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '../../context/AuthContext';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user',
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

export const getBalanceWallet = async token => {
  const responsive = await instance.get('/wallet/balance', {
    headers: {
      Authorization: token,
    },
  });

  return responsive.data;
};

export const postCreateWallet = async () => {
  const responsive = await instance.post('/wallet/create');

  return responsive.data;
};

export const postImportWallet = async data => {
  const responsive = await instance.post('/wallet/import', data);

  return responsive.data;
};

export const deleteWallet = async () => {
  const responsive = await instance.delete('/wallet/delete');

  return responsive.data;
};
