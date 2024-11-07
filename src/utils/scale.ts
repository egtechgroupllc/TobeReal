import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const scale = (value = 0) => {
  const ratio = height / 852;
  return Math.round(value * ratio);
};

