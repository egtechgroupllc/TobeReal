import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
export default function ButtonBuy({onPress, title, style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#E80274', '#7D0D6A']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.button}>
        <CustomText textType="semiBold" style={[styles.text2, style]}>
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
    height: scale(32),
    width: '100%',
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  text2: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});
