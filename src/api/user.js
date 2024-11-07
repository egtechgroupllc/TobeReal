import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

import {TOKEN_KEY} from '~/context/AuthContext';
import {baseUrl} from './url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';
const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user',
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

// MARK: network

export const getProfile = async () => {
  const response = await instance.get(`/info/getlistprofile`);

  return response.data;
};
getProfile.queryKey = ['user', 'get-list-profile'];

export const getListCountry = async ({level, parent}) => {
  const response = await instance.get(
    `/info/listAddress?level=${level}&parent=${parent}`,
  );

  return response.data;
};
getListCountry.queryKey = ['user', 'get-list-country'];

export const postUpdateProfile = async data => {
  const response = await instance.put('/info/updateProfile', data);
  return response.data;
};
postUpdateProfile.queryKey = ['user', 'update-profile'];
