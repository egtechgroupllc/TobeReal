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
export const postLogin = async data => {
  const responsive = await instance.post('/login', data);

  return responsive.data;
};

export const postSignUp = async data => {
  const responsive = await instance.post('/sign-up', data);

  return responsive.data;
};

export const postLogout = async data => {
  const responsive = await instance.get('/logout');

  return responsive.data;
};

export const postForgotPassword = async data => {
  const responsive = await instance.post('/forgot-password', data);

  return responsive.data;
};

export const postResetPassword = async data => {
  const responsive = await instance.post('/reset-password', data);

  return responsive.data;
};

export const postChangePassword = async data => {
  const responsive = await instance.post('/change-password', data);

  return responsive.data;
};
export const postEditProfile = async data => {
  const responsive = await instance.post('/edit-profile', data);

  return responsive.data;
};
//  ================== Deposit ======================
export const getListMethod = async data => {
  const responsive = await instance.get('/deposit/list-method');

  return responsive.data;
};

export const postInitOrderDeposit = async data => {
  const responsive = await instance.post('/deposit/initial-order', data);

  return responsive.data;
};

export const postConfirmDeposit = async data => {
  const responsive = await instance.post('/deposit/create-order', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });

  return responsive.data;
};
export const getHistoryDeposit = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/deposit/my-order?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};
export const getHistoryWithdraw = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/withdraw/my-order?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};
export const postConfirmWithdraw = async data => {
  const responsive = await instance.post('/withdraw/create-order', data);

  return responsive.data;
};
export const postCancelWithdraw = async data => {
  const responsive = await instance.post('/withdraw/cancel-order', data);

  return responsive.data;
};
export const postWithdrawToken = async data => {
  const responsive = await instance.post('/token-data/withdraw', data);

  return responsive.data;
};
export const getHistoryToken = async ({pageParam = 1}) => {
  const responsive = await instance.get(
    `/token-data/history?page=${pageParam}&limit=10`,
  );

  return responsive.data;
};
