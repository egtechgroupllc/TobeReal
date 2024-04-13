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
        width: '100%',
        minHeight: scale(50),
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(10),
        // ...SHADOW,
        borderRadius: scale(6),
        columnGap: scale(14),
      }}>
      {Icon && <Icon width={scale(16)} height={scale(16)} />}
      <View
        style={{
          rowGap: scale(5),
        }}>
        <CustomText textType="semiBold">{title}</CustomText>
        {subTitle && (
          <CustomText style={{color: COLORS.text}}>{subTitle}</CustomText>
        )}
      </View>
      <IconNext
        width={scale(14)}
        height={scale(14)}
        fill={COLORS.primary}
        style={{
          marginLeft: 'auto',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
