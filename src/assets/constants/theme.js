import {Dimensions, Platform, TextStyle} from 'react-native';

const {height, width} = Dimensions.get('window');
export const scale = (value = 0) => {
  const ratio = height / 852;
  return Math.round(value * ratio);
};

export const COLORS = {
  blue: '#0194f3',
  primary: '#F0B90B',
  text: '#3b3a3a',
  textSub: '#7d7d7d',
  white: '#fff',
  grey: '#ccc',
  black: '#000000',
  overlay: '#00000060',
  error: '#FF0000',
};
export const WIDTH = {
  widthScreen: width,
  widthContain: '94%',
  heightScreen: height,
};
export const SIZES = {
  xSmall: scale(10),
  xxSmall: scale(6),
  small: scale(12),
  xMedium: scale(14),
  medium: scale(16),
  large: scale(20),
  xLarge: scale(24),
  xxLarge: scale(32),
};

export const FONTS = {
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semiBold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
};

export const SHADOW = {
  shadowColor: Platform?.OS === 'ios' ? '#333' : '#DCDCDC',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 1,
};
export const MessageStyle = {
  success: {
    style: {backgroundColor: '#26A17B'},
    duration: 3000,
    titleStyle: SIZES.medium,
  },
  error: {
    style: {backgroundColor: '#FB7181'},
    duration: 3000,
    titleStyle: SIZES.medium,
  },
};
