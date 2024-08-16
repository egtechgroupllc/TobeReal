import {PermissionsAndroid} from 'react-native';

export async function requestNotificationPermission() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('You can use the notifications');
  } else {
    console.log('Notification permission denied');
  }
}
