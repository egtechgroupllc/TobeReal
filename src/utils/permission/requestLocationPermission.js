import {Platform} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';

export const requestLocationPermission = async () => {
  try {
    let permission;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      permission =
        Platform.Version >= 29
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION // For Android 10+
          : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
    }

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.log('Error requesting location permission:', error);
    return false;
  }
};
