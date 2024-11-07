import {Dimensions, TextStyle} from 'react-native';
import {scale} from '~/utils/scale';

const {height, width} = Dimensions.get('window');

export const COLORS = {
  blue: '#0085FF',
  primary: '#012133',
  body: '#012133',
  cyan: '#00DEAB',
  text: '#2A5872',
  bluecyan: '#97B5BF',
  textSub: '#7d7d7d',
  grey: '#cccccc',
  black: '#000000',
  overlay: 'rgba(242, 248, 255, 0.2)',
  error: '#f0334b',
  green: '#5ad539',
  Blue: '#01B6AD',
  BlueSky: '#00bfff',
  BlueSkys: '#CDEBF2',
  BlueSemi: '#F1FAFB',
  Orange: '#BD3A3A',
  Dark: '#000000',
  greyBold: '#505052',
  greySemi: '#807E7E',
  greyLight: '#BABABB',
  whiteLight: '#E5E5E5',
  whiteSemi: '#FAFAFA',
  White: '#FFFFFF',
  GreenBlue: '#007C91',
  GreenBold: '#087972',
  GreenLight: '#48D49E',
  Green: '#4BBD99',
  BlueNavyBold: 'rgba(27, 77, 97, 0.4)',
  BlueNavy: 'rgba(0, 124, 145, 0.7)',
  BlueBold: '#126C73',
  OrangeBold: '#FAA51A',
  OrangeSemi: '#f9c74f',
  DeepPurple: '#60CEA3',
  DeepOrange: '#F7931A',
  yellow: '#face14',
  GreenBuy: '#00FF47',
  RedP2P: '#C9001D',
  linearButton: ['#01B6AD', '#00DEAB', '#00DEAB'],
  linearDisabled: ['#BABABB', '#BABABB'],
  input: '#0664994D',
  blueView: '#1d3557',
};
export const WIDTH = {
  widthScreen: width,
  heightScreen: height,
};
export const SIZES = {
  xSmall: scale(10),
  xlSmall: scale(8),
  xxSmall: scale(6),
  small: scale(12),
  xMedium: scale(14),
  medium: scale(16),
  large: scale(20),
  xLarge: scale(24),
  xxLarge: scale(32),
};

export const FONTS = {
  regular: 'IBMPlexSans-Regular',
  medium: 'IBMPlexSans-Medium',
  semiBold: 'IBMPlexSans-SemiBold',
  bold: 'IBMPlexSans-Bold',
};

export const SHADOW = {
  shadowColor: '#333',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: scale(0.2),
  shadowRadius: scale(2),
  elevation: 2,
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
