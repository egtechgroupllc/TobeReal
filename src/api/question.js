import axios from 'axios';
import {baseUrl} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user/question',
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
export const postCreateQuestion = async data => {
  const response = await instance.post('/create-question', data);

  return response.data;
};
export const postCreateAnswerQuestion = async data => {
  const response = await instance.post('/create-answer-question', data);

  return response.data;
};
export const getListQuestion = async ({
  limit = 10,
  pageParam = 1,
  keyword = '',
  status = '',
  country_id = '',
  specialty_id = '',
}) => {
  const response = await instance.get(
    `/get-all-question?limit=${limit}&page=${pageParam}&keyword=${keyword}&status=${status}&country_id=${country_id}&specialty_id=${specialty_id}`,
  );

  return response.data;
};
getListQuestion.queryKey = ['question', 'get-all-question'];

export const getListQuestionUser = async ({
  limit = 10,
  pageParam = 1,
  keyword = '',
  status = '',
  specialty_id = '',
}) => {
  const response = await instance.get(
    `/list-question-user?limit=${limit}&page=${pageParam}&keyword=${keyword}&status=${status}&specialty_id=${specialty_id}`,
  );

  return response.data;
};
getListQuestionUser.queryKey = ['question', 'list-question-user'];

export const getListQuestionDoctor = async ({
  limit = 10,
  pageParam = 1,
  specialty_id = '',
  keyword = '',
  status = '',
}) => {
  const response = await instance.get(
    `/list-question-doctor?limit=${limit}&page=${pageParam}&specialty_id=${specialty_id}&status=${status}&keyword=${keyword}`,
  );

  return response.data;
};
getListQuestionDoctor.queryKey = ['question', 'list-question-doctor'];

export const getListQuestionPending = async ({
  limit = 10,
  pageParam = 1,
  keyword = '',
  specialty_id = '',
}) => {
  const response = await instance.get(
    `/get-question-pending?limit=${limit}&page=${pageParam}&keyword=${keyword}&specialty_id=${specialty_id}`,
  );

  return response.data;
};
getListQuestionPending.queryKey = ['question', 'get-question-pending'];
