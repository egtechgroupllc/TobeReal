import axios from 'axios';
import {baseUrl, urlNowCare1, urlNowCare2} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
import {RNRestart} from 'react-native-restart';
import {Alert} from 'react-native';
import {useAuthentication} from '~/hooks/useAuthentication';

const instance = axios.create({
  urlNowCare1: urlNowCare1,
});
const instanceCommon = axios.create({
  baseURL: baseUrl + '/api/v1/user/common',
});

instanceCommon.interceptors.request.use(async req => {
  const storedToken = await EncryptedStorage.getItem(TOKEN_KEY);

  if (storedToken) {
    req.headers['token'] = `EG ${storedToken}`;
  }

  return req;
});
const {onClearToken} = useAuthentication();
export const handleLogoutExistToken = async () => {
  onClearToken();
};
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

//-------TobeCare---------//
export const getListSlider = async () => {
  const response = await instance.get(`${urlNowCare1}/public/slider-list`);

  return response.data;
};
getListSlider.queryKey = ['public', 'slider-list'];

export const getNewsFeed = async ({
  offset = 0,
  limit = 1000,
  title,
  author,
}) => {
  const response = await instance.get(
    `${urlNowCare2}/newsfeed?offset=${offset}&limit=${limit}&title=${title}&author=${author}`,
  );

  return response.data;
};
getNewsFeed.queryKey = ['newsfeed'];

export const getSpecial = async ({offset = 0, limit = 1000, name}) => {
  const response = await instance.get(
    `${urlNowCare2}/special?offset=${offset}&limit=${limit}&name=${name}`,
  );

  return response.data;
};
getSpecial.queryKey = ['special'];

export const getListTypeQuestion = async ({status}) => {
  const response = await instance.get(
    `${urlNowCare1}/public/list-category?status=${status}`,
  );

  return response.data;
};
getListTypeQuestion.queryKey = ['list-type', 'questions'];

//-------Common---------//
export const getListSpecialty = async ({
  limit = 10,
  pageParam = 1,
  keyword = '',
}) => {
  const response = await instanceCommon.get(
    `/list-specialty?limit=${limit}&page=${pageParam}&keyword=${keyword}`,
  );
  return response.data;
};
getListSpecialty.queryKey = ['user', 'list-specialty'];

export const getListFacility = async ({limit = 10, pageParam = 1, keyword}) => {
  const response = await instanceCommon.get(
    `/list-medical-facility?limit=${limit}&page=${pageParam}&keyword=${keyword}`,
  );
  return response.data;
};
getListFacility.queryKey = ['user', 'list-medical-facility'];
export const getDetailFacility = async ({id}) => {
  const response = await instanceCommon.get(`/detail-medical-facility/${id}`);
  return response.data;
};
getDetailFacility.queryKey = ['user', 'detail-medical-facility'];
export const getDetailDoctorSpecialty = async ({id}) => {
  const response = await instanceCommon.get(`/detail-doctor-specialty/${id}`);
  return response.data;
};
getDetailDoctorSpecialty.queryKey = ['user', 'detail-doctor-specialty'];

export const postCreateMedicalFacility = async data => {
  const response = await instanceCommon.post('/create', data);

  return response.data;
};
postCreateMedicalFacility.queryKey = ['common', 'create'];

export const postUpdateMedicalFacility = async ({data, id}) => {
  const response = await instanceCommon.put(`/update/${id}`, data);

  return response.data;
};
postUpdateMedicalFacility.queryKey = ['common', 'update'];

export const postDeleteMedicalFacility = async ({data, id}) => {
  const response = await instanceCommon.delete(
    `/delete-medical-facility-user/${id}`,
    data,
  );

  return response.data;
};
postDeleteMedicalFacility.queryKey = ['common', 'update'];

export const postContactRegister = async data => {
  const response = await instanceCommon.post('/contact-register', data);

  return response.data;
};
postContactRegister.queryKey = ['common', 'contact-register'];

export const getListContactCooperate = async data => {
  const response = await instanceCommon.get('/list-contact-cooperate', data);

  return response.data;
};
getListContactCooperate.queryKey = ['common', 'list-contact-cooperate'];

export const getListMedicalFacilityUser = async data => {
  const response = await instanceCommon.get(
    '/list-medical-facility-user',
    data,
  );

  return response.data;
};
getListMedicalFacilityUser.queryKey = ['common', 'list-medical-facility-user'];
