import {showMessage} from 'react-native-flash-message';
import {FONTS, MessageStyle, SIZES} from './theme';
export const showMess = (message, type = 'success', props) => {
  if (type === 'success') {
    return showMessage({
      message,
      ...MessageStyle.success,
      ...props,
    });
  }
  if (type === 'info') {
    return showMessage({
      message,
      ...MessageStyle.success,
      ...props,
    });
  }
  return showMessage({
    message,
    ...MessageStyle.error,
    ...props,
  });
};
export const secondsToStringTime = seconds => {
  return new Date(seconds * 3000).toISOString().substring(11, 8).split(':');
};
