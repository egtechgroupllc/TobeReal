import axios from 'axios';
import {baseUrl} from '../url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user',
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
