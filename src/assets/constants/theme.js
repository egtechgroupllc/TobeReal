import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export const scale = value => {
  const ratio = height / 852;
  return Math.round(value * ratio);
};

export const COLORS = {
  primary: '#F0B90B',
  text: '#3b3a3a',
  textSub: '#7d7d7d',
  white: '#fff',
  grey:'#B9B9B9',
  black:'#000000'
};
export const WIDTH = {
  widthScreen: width,
  heightScreen: height,
};
export const SIZES = {
  xSmall: scale(10),
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
  shadowColor: '#333',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};
