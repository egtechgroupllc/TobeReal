import axios from 'axios';
import {baseUrl} from './url';

const instance = axios.create({
  baseURL: baseUrl,
});

export const postLogin = async data => {
  const responsive = await instance.post('/api/v1/user/login', data);

  return responsive.data;
};

export const postSignUp = async data => {
  const responsive = await instance.post('/api/v1/user/sign-up', data);

  return responsive.data;
};

export const postLogout = async data => {
  const responsive = await instance.get('/api/v1/user/logout');

  return responsive.data;
};

export const postForgotPassword = async data => {
  const responsive = await instance.post('/api/v1/user/forgot-password', data);

  return responsive.data;
};

export const postResetPassword = async data => {
  const responsive = await instance.post('/api/v1/user/reset-password', data);

  return responsive.data;
};

export const postChangePassword = async data => {
  const responsive = await instance.post('/api/v1/user/change-password', data);

  return responsive.data;
};
