import {Platform} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (error) {
    console.log('Error requesting location permission:', error);
    return false;
  }
};
