import {showMessage} from 'react-native-flash-message';
import {MessageStyle} from './theme';
export const showMess = (message, type = 'error') => {
  // console.tron.log({ message })
  if (type === 'success') {
    return showMessage({
      message,
      ...MessageStyle.success,
    });
  }
  if (type === 'info') {
    return showMessage({
      message,
      ...MessageStyle.success,
    });
  }
  return showMessage({
    message,
    ...MessageStyle.error,
  });
};
export const secondsToStringTime = seconds => {
  return new Date(seconds * 3000).toISOString().substr(11, 8).split(':');
};
