import axios from 'axios';
import {baseUrl} from '../url';
import {Alert} from 'react-native';
import {handleLogoutExistToken} from './common';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '../../context/AuthContext';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user',
});
instance.interceptors.request.use(async req => {
  if (typeof window !== 'undefined') {
    const storedToken = await EncryptedStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      req.headers.Authorization = `Bearer ${storedToken}`;
    }
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
// export const postEditProfile = async ({data, token}) => {
//   const responsive = await instance.post('/edit-profile', data, {
//     headers: {
//       Authorization: token,
//     },
//   });

//   return responsive.data;
// };
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
export const getHistoryToken = async ({pageParam = 1, token}) => {
  const responsive = await instance.get(
    `/token-data/history?page=${pageParam}&limit=10`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return responsive.data;
};

////-----Check-in-Daily------//
export const getDailyCheckinInfo = async token => {
  const response = await instance.get('/daily-check-in/info', {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
export const postDailyCheckin = async ({data, token}) => {
  const responsive = await instance.post('/daily-check-in/check-in', data, {
    headers: {
      Authorization: token,
    },
  });

  return responsive.data;
};
