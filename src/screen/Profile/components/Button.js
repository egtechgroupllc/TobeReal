import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../components/CustomText';
import { SIZES, scale } from '../../../assets/constants';
export default function Button({onPress, title, style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#F7E75A', '#FFC702']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.button}>
        <CustomText
          textType="semiBold"
          style={[styles.text2, style]}>
          {title}
        </CustomText>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: scale(10),
    height: scale(40),
    width: '80%',
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  text2: {
    fontSize: SIZES.medium,
  },
});
