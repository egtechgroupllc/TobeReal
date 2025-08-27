import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from '../../../../components';

import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../components/CustomText';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import {IconRight} from '../../../assets/icon/Icon';
export default function ButtonPost({
  onPress,
  title,
  styleImage,
  image,
  style,
  icon,
  styleText,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(10),
          }}>
          {image ? (
            <Image source={image} style={styleImage} />
          ) : icon ? (
            <View>{icon}</View>
          ) : null}
          <View>
            <CustomText textType="semiBold" style={[styles.text2, styleText]}>
              {title}
            </CustomText>
          </View>
        </View>

        <IconRight />
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
    borderColor: COLORS.pioBox,
    backgroundColor: COLORS.white,
    ...SHADOW,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text2: {
    fontSize: SIZES.medium,
  },
});
