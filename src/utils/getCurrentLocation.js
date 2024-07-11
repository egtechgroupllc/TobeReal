import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from './permission/requestLocationPermission';

export const getCurrentLocation = async callback => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    Geolocation.getCurrentPosition(info => {
      callback && callback(info);
    });
  } else {
    throw new Error('Location permission not granted');
  }
};
