import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import CustomText from '../../../components/CustomText';
import {IconNext} from '../../../assets/icon/Icon';

export default function BoxItemProfile({title, Icon, subTitle, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(10),
        columnGap: scale(14),
      }}>
      {Icon && <Icon width={scale(16)} height={scale(16)} />}

      <CustomText textType="semiBold" size={scale(13)}>
        {title}
      </CustomText>
      <IconNext
        width={scale(12)}
        height={scale(12)}
        style={{
          marginLeft: 'auto',
        }}
        fill={COLORS.textSub}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
