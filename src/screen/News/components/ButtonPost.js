import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {IconRight} from '../../../assets/icon/Icon';
export default function ButtonPost({onPress, title, styleImage, image, style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Image source={image} style={styleImage} />
        <View style={{width: '80%'}}>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text2,
              marginLeft: scale(10),
              color: COLORS.white,
            }}>
            {title}
          </CustomText>
        </View>

        <IconRight fill={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(53),
    paddingHorizontal: scale(20),
    marginTop: scale(20),
    borderWidth: scale(1),
    borderColor: COLORS.green,
    flexDirection: 'row',
  },
  text2: {
    fontSize: SIZES.medium,
  },
});
