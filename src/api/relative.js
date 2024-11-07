import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {TOKEN_KEY} from '~/context/AuthContext';
import {baseUrl} from './url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/relative',
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
export const postCreateRelative = async data => {
  const response = await instance.post('/create', data);

  return response.data;
};
export const postUpdateRelative = async ({id, data}) => {
  const response = await instance.put(`/update/${id}`, data);

  return response.data;
};
export const postDeleteRelative = async ({id}) => {
  const response = await instance.delete(`/delete-relationship/${id}`);

  return response.data;
};
export const getListRelationship = async () => {
  const response = await instance.get('/list-relationship');
  return response.data;
};
getListRelationship.queryKey = ['user', 'relative', 'list-relationship'];
