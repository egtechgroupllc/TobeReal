import axios from 'axios';

import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import instance, {decodeToken} from '../apiClient';
import {storage} from '../../../utils/MMKVStorage';
import {REFRESH_TOKEN_KEY, TOKEN_KEY} from '../../../context/AuthContext';
import {baseUrl} from '../../url';
import {showMess} from '../../../assets/constants/Helper';

// instance.interceptors.request.use(async req => {
//   if (typeof window !== 'undefined') {
//     const storedToken = await storage.getString(TOKEN_KEY);

//     if (storedToken) {
//       req.headers.Authorization = `Bearer ${storedToken}`;
//     }
//   }

//   return req;
// });

// let countErr = 0;
// instance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     // console.log(error.response.status);
//     if (error.response && error.response.status === 401 && countErr < 1) {
//       Alert.alert(
//         'Notification',
//         'Your session has expired or your account has been logged in on another device. Please log in again.',
//         [{text: 'OK', onPress: () => handleLogoutExistToken()}],
//       );

//       ++countErr;
//     }
//     return Promise.reject(error);
//   },
// );

export const postLogin = async data => {
  const responsive = await instance.post('/user/auth/sign-in', data);

  return responsive.data;
};

export const postSignUp = async data => {
  const responsive = await instance.post('/user/auth/sign-up', data);

  return responsive.data;
};
export const postVerifyEmail = async data => {
  const responsive = await instance.post('/user/auth/verify-email', data);

  return responsive.data;
};
export const postResendMail = async data => {
  const responsive = await instance.post(
    '/user/auth/resend-verify-email',
    data,
  );

  return responsive.data;
};
export const postForgotPassword = async data => {
  const responsive = await instance.post('/user/auth/forgot-password', data);

  return responsive.data;
};
export const postResetPassword = async data => {
  const responsive = await instance.post('/user/auth/reset-password', data);

  return responsive.data;
};

export const getListSession = async accessToken => {
  const response = await instance.get('/user/auth/session', {
    headers: {
      accessToken: accessToken,
    },
  });

  return response.data;
};
export const deleteSession = async tokenJtiList => {
  const response = await instance.delete('/user/auth/session', {
    data: {tokenJtiList},
  });
  return response.data;
};

export const deleteCurrentSession = async () => {
  const refreshToken = storage.getString(REFRESH_TOKEN_KEY);

  if (!refreshToken) return;

  const decoded = decodeToken(refreshToken);

  if (!decoded?.jti) return;

  return deleteSession([decoded.jti]);
};

export const renewAccessToken = async refreshToken => {
  try {
    const res = await axios.get(`${baseUrl}/user/auth/renew-access-token`, {
      headers: {refreshToken},
    });
    console.log('response token', res.data);

    const newAccessToken = res.data?.data?.accessToken || null;
    console.log('New access token:', newAccessToken);

    if (newAccessToken) {
      return newAccessToken;
    }
    return null;
  } catch (e) {
    console.error('❌ Renew error:', e.response?.data || e.message);
    return null;
  }
};
