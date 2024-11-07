import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {TOKEN_KEY} from '~/context/AuthContext';
import {baseUrl} from './url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/authentication',
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
    console.log(error.response.status);
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

export const postRegister = async data => {
  const response = await instance.post('/register', data);

  return response.data;
};
postRegister.queryKey = ['user', 'register'];

export const postLogin = async data => {
  const response = await instance.post('/login01', data);
  return response.data;
};
postLogin.queryKey = ['user', 'login01'];

export const postForgotPassword = async data => {
  const response = await instance.post('/forgotPass', data);
  return response.data;
};
postForgotPassword.queryKey = ['user', 'forgotPass'];

export const postResetPassword = async data => {
  const response = await instance.post('/verifyEmailpass', data);
  return response.data;
};
postResetPassword.queryKey = ['user', 'verifyEmailpass'];

export const postChangePassword = async data => {
  const response = await instance.post('/changePass', data);
  return response.data;
};
postChangePassword.queryKey = ['user', 'changePass'];
