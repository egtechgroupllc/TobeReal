import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/wallet',
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
export const postCreateWallet = async data => {
  const response = await instance.post('/add_wallet', data);
  return response.data;
};
export const postImportWallet = async data => {
  const response = await instance.post('/import', data);
  return response.data;
};
export const postDeleteWallet = async data => {
  const response = await instance.delete('/delete', data);
  return response.data;
};
export const getBalanceWallet = async () => {
  const response = await instance.get(`/list_wallet}`);

  return response.data;
};
getBalanceWallet.queryKey = ['wallet', 'list_wallet'];
