import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from './permission/requestLocationPermission';
import {Alert, Linking, Platform} from 'react-native';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import RNRestart from 'react-native-restart';
export const requestEnableGPS = async () => {
  try {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        if (enableResult === 'enabled') {
          RNRestart.restart();
        }
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
          // codes :
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          //  - ERR03 : Internal error
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentLocation = async callback => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.log('Location permission denied.');
    return;
  }

  Geolocation.getCurrentPosition(
    info => {
      callback && callback(info);
    },
    error => {
      console.log('Location error:', error);

      if (error.code === 1) {
        // PERMISSION_DENIED
        requestLocationPermission().then(retryPermission => {
          if (retryPermission) getCurrentLocation(callback);
        });
      } else if (error.code === 2) {
        requestEnableGPS();
        // // POSITION_UNAVAILABLE
        // Alert.alert(
        //   'Enable location to continue',
        //   'For a better experience, please enable precise location (GPS) on your device.',
        //   [
        //     {text: 'Cancel', style: 'cancel'},
        //     {text: 'Enable', onPress: () => requestEnableGPS()},
        //   ],
        // );
      } else {
        Alert.alert('Error', error.message);
      }
    },
    {
      enableHighAccuracy: true, // Force GPS mode
      timeout: 20000,
      maximumAge: 1000,
    },
  );
};
