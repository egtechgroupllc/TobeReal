import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/booking/order',
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

export const postCreateBooking = async data => {
  const response = await instance.post('/create-booking', data);

  return response.data;
};
export const getHistoryBookingUser = async ({limit = 10, pageParam = 1}) => {
  const response = await instance.get(
    `/history-booking-user?limit=${limit}&page=${pageParam}`,
  );

  return response.data;
};
getHistoryBookingUser.queryKey = ['order', 'history-booking-user'];

export const getHistoryBookingDoctor = async ({limit = 10, pageParam = 1}) => {
  const response = await instance.get(
    `/history-booking-doctor?limit=${limit}&page=${pageParam}`,
  );

  return response.data;
};
getHistoryBookingDoctor.queryKey = ['order', 'history-booking-doctor'];
export const postCancelBooking = async ({id, data}) => {
  const response = await instance.put(`/cancel-booking-user/${id}`, data);

  return response.data;
};
export const getCreateQRCode = async id => {
  const response = await instance.get(`/create-Qr/${id}`);
  return response.data;
};

export const postVerifyQRCode = async data => {
  const response = await instance.post('/verify-Qr', data);

  return response.data;
};
