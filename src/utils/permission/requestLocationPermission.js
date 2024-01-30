import {Platform} from 'react-native';
import {PERMISSIONS, check, request} from 'react-native-permissions';
export const requestLocationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const granted = await request(permission);
    const status = await check(permission);
    console.log(status, granted, 2321);
    if (granted === 'granted') {
      return true;
    } else {
      console.log('Location permission denied');
    }
  } catch (error) {
    console.log('Error requesting location permission:', error);
  }
};
