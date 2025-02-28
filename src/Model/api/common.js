import axios from 'axios';
import {baseUrl} from '../url';
import {showMess} from '../../assets/constants/Helper';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TOKEN_KEY} from '../../context/AuthContext';
import RNRestart from 'react-native-restart';
import {Alert} from 'react-native';
import {storage} from '../../utils/MMKVStorage';

export const instanceCommon = axios.create({
  baseURL: baseUrl + '/api/v1',
});

instanceCommon.interceptors.request.use(async req => {
  if (typeof window !== 'undefined') {
    const storedToken = await storage.getString(TOKEN_KEY);

    if (storedToken) {
      req.headers.Authorization = `Bearer ${storedToken}`;
    }
  }

  return req;
});
export const handleLogoutExistToken = async () => {
  axios.defaults.headers.common['Authorization'] = '';
  await storage.delete(TOKEN_KEY);
  RNRestart.restart();
};

let countErr = 0;
instanceCommon.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401 && countErr < 1) {
      Alert.alert(
        'Notification',
        'Your session has expired or your account has been logged in on another device. Please log in again.',
        [{text: 'OK', onPress: () => handleLogoutExistToken()}],
      );

      ++countErr;
    }
    return Promise.reject(error);
  },
);
// ============================ Common =====================================
export const getUserInfoLocation = async ({lat, lon}) => {
  // Encode the latitude and longitude to ensure they are correctly formatted
  const encodedLat = encodeURIComponent(lat);
  const encodedLon = encodeURIComponent(lon);

  // Construct the request URL
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${encodedLat}&lon=${encodedLon}&format=json`;

  // Make the GET request to the Nominatim API
  const response = await axios.get(url);

  // Return the response data
  return response.data;
};

export const getProfile = async token => {
  const responsive = await instanceCommon.get(
    '/user/profile',
    token
      ? {
          headers: {
            Authorization: token,
          },
        }
      : {},
  );

  return responsive.data;
};

export const getListCountry = async (province_id = '') => {
  const responsive = await instanceCommon.get(
    `/common/list-country?geoname_id=${province_id}`,
  );

  return responsive.data;
};

export const getListCurrency = async () => {
  const responsive = await instanceCommon.get('/common/list-currency');

  return responsive.data;
};

export const getListTypeRent = async () => {
  const responsive = await instanceCommon.get('/accommodation/list-type');

  return responsive.data;
};

export const getListTypeEstateSell = async () => {
  const responsive = await instanceCommon.get('/estate/list-type');

  return responsive.data;
};

export const getListDirection = async () => {
  const responsive = await instanceCommon.get('common/list-direction');

  return responsive.data;
};

export const getListPackagePost = async () => {
  const responsive = await instanceCommon.get('common/list-package-post');

  return responsive.data;
};
export const getListConstant = async () => {
  const responsive = await instanceCommon.get('common/list-constant');

  return responsive.data;
};
export const getTokenAirdrop = async () => {
  const responsive = await instanceCommon.get('common/token-airdrop');

  return responsive.data;
};
export const getToken = async () => {
  const responsive = await instanceCommon.get('common/token');

  return responsive.data;
};
////-----Video-Short------//
export const getListVideoRandom = async ({
  model_name = '',
  pageParam = 1,
  limit = 2,
}) => {
  const responsive = await instanceCommon.get(
    `/video-short/list-random?model_name=${model_name}&page=${pageParam}&limit=${limit}`,
  );

  return responsive.data;
};

export const getLinkData = async ({model_name, table_id, token}) => {
  const responsive = await instanceCommon.get(
    `/video-short/linked-data?model_name=${model_name}&table_id=${table_id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return responsive.data;
};
export const getMyListVideoShort = async ({model_name, table_id}) => {
  const responsive = await instanceCommon.get(
    `/video-short/my-list?model_name=${model_name}&table_id=${table_id}`,
  );
  return responsive.data;
};
export const postVideoShort = async ({data, token}) => {
  const responsive = await instanceCommon.post(
    '/video-short/post-video',
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
    },
  );

  return responsive.data;
};

////-----Chat------//
export const postCreateGroupChat = async ({data, token}) => {
  const responsive = await instanceCommon.post('/chat/create-group', data, {
    headers: {
      Authorization: token,
    },
  });
  return responsive.data;
};
export const postSendChat = async ({data, token}) => {
  const responsive = await instanceCommon.post('/chat/send', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  });
  return responsive.data;
};
export const getListMessage = async ({
  chat_group_id,
  pageParam = 1,
  token,
  limit = 10,
}) => {
  const response = await instanceCommon.get(
    `/chat/list-message?page=${pageParam}&limit=${limit}&chat_group_id=${chat_group_id}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return response.data;
};

export const getListChatGroup = async () => {
  const response = await instanceCommon.get('/chat/my-list-group');
  return response.data;
};

export const postSeenMessage = async ({data, token}) => {
  const responsive = await instanceCommon.post('/chat/seen-message', data, {
    headers: {
      Authorization: token,
    },
  });
  return responsive.data;
};

export const postCheckStatus = async ({data, token}) => {
  const responsive = await instanceCommon.post('/user/check-status', data, {
    headers: {
      Authorization: token,
    },
  });
  // console.log(responsive?.data);
  return responsive.data;
};
