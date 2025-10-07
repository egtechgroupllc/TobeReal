import axios from 'axios';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import {baseUrl} from '../url';
import {TOKEN_KEY, REFRESH_TOKEN_KEY} from '../../context/AuthContext';
import {storage} from '../../utils/MMKVStorage';
import {jwtDecode} from 'jwt-decode';
import {renewAccessToken} from './user/auth';

export const instance = axios.create({
  baseURL: baseUrl,
});

let isShowingSessionAlert = false; // 👈 flag chống spam Alert

/**
 * Decode JWT
 */
export const decodeToken = token => {
  try {
    const decoded = jwtDecode(token);
    return {
      jti: decoded?.jti || decoded?.sub || decoded?.userId || null,
      exp: decoded?.exp || null,
      raw: decoded,
    };
  } catch (e) {
    console.log('Decode error:', e);
    return null;
  }
};

/**
 * Clear session sau khi confirm
 */
const clearSessionWithConfirm = () => {
  if (isShowingSessionAlert) return; // 👈 tránh mở nhiều Alert
  isShowingSessionAlert = true;

  Alert.alert(
    'Session expired',
    'Your session has expired. Please login again.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => (isShowingSessionAlert = false),
      },
      {
        text: 'OK',
        onPress: () => {
          delete axios.defaults.headers.common['accessToken'];
          storage.delete(TOKEN_KEY);
          storage.delete(REFRESH_TOKEN_KEY);
          isShowingSessionAlert = false;
          RNRestart.restart();
        },
      },
    ],
    {cancelable: false},
  );
};

/**
 * Request interceptor
 */
instance.interceptors.request.use(async req => {
  const storedToken = storage.getString(TOKEN_KEY);
  if (!storedToken) return req;

  const decoded = decodeToken(storedToken);
  const now = Date.now() / 1000;

  if (!decoded || (decoded.exp && decoded.exp - now < 60)) {
    const refreshToken = storage.getString(REFRESH_TOKEN_KEY);

    if (refreshToken) {
      const newAccessToken = await renewAccessToken(refreshToken);
      if (newAccessToken) {
        // Lưu lại token mới
        storage.set(TOKEN_KEY, newAccessToken);
        req.headers.accessToken = newAccessToken;
        return req;
      }
    }

    // Fail → logout
    clearSessionWithConfirm();
    return req;
  }

  req.headers.accessToken = storedToken;
  return req;
});

/**
 * Response interceptor
 */
instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const storedToken = storage.getString(TOKEN_KEY);
    if (!storedToken) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = storage.getString(REFRESH_TOKEN_KEY);

      if (refreshToken) {
        const newAccessToken = await renewAccessToken(refreshToken);
        if (newAccessToken) {
          storage.set(TOKEN_KEY, newAccessToken);
          originalRequest.headers.accessToken = newAccessToken;
          return instance(originalRequest);
        }
      }

      clearSessionWithConfirm();
    }

    return Promise.reject(error);
  },
);

export default instance;
