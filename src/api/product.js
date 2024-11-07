import axios from 'axios';
import {urlNowCare1, urlNowCare2} from './url';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '~/context/AuthContext';
const instance = axios.create({
  baseURL: urlNowCare1,
});
instance.interceptors.request.use(async req => {
  const storedToken = await EncryptedStorage.getItem(TOKEN_KEY);

  if (storedToken) {
    req.headers.Authorization = `Bearer ${storedToken}`;
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
      // Alert.alert(
      //   'Notification',
      //   'Your account has been logged in from another device, please log in again!',
      //   [{text: 'OK', onPress: () => handleLogoutExistToken()}],
      // );
      ++countErr;
    }
    return Promise.reject(error);
  },
);

export const getListProduct = async ({keyword, limit = 1}) => {
  const response = await instance.get(
    `${urlNowCare2}/patient/item?keyword=${keyword}&limit=${limit}`,
  );

  return response.data;
};
getListProduct.queryKey = ['list-product'];
