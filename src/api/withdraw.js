import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/withdraw',
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
export const postCreateWithdraw = async data => {
  const response = await instance.post('/create-order', data);
  return response.data;
};
export const getWithdrawHistory = async data => {
  const response = await instance.get('/my-order', data);
  return response.data;
};
getWithdrawHistory.queryKey = ['withdraw', 'my-order'];
export const postCancelWithdraw = async ({id}) => {
  const response = await instance.put(`/cancel-order/${id}`);
  return response.data;
};