import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from './permission/requestLocationPermission';

export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (hasPermission) {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error.message);
        },
        {enableHighAccuracy: true},
      );
    });
  } else {
    throw new Error('Location permission not granted');
  }
};
