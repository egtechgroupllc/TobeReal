import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../../../../components/CustomImage';
import {COLORS, SIZES, images, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {useQueryClient} from '@tanstack/react-query';
import {formatPrice} from '../../../../../utils/format';

export default function PaymentMethods({data}) {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData(['user', 'profile'])?.data;

  return (
    <View
      style={{
        padding: scale(20),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingVertical: scale(10),
        }}>
        <CustomText
          textType="semiBold"
          color={COLORS.text}
          size={SIZES.xMedium}>
          Phuơng thức thanh toán
        </CustomText>
        <CustomText textType="bold" color={COLORS.blue}>
          Xem tất cả
        </CustomText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#f2f3f3',
          padding: scale(12),
          borderRadius: scale(8),
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(8),
          }}>
          <CustomImage
            source={images.logo1}
            style={{
              width: scale(35),
              height: scale(35),
              borderRadius: scale(6),
            }}
          />
          <View style={{rowGap: scale(4)}}>
            <CustomText textType="semiBold" size={scale(13)}>
              Wallet Saveloka
            </CustomText>
            <CustomText color={COLORS.text} textType="semiBold">
              Balance: {formatPrice(profile?.balance)}
            </CustomText>
          </View>
        </View>
        <View />
        <View style={styles.radio}>
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    height: scale(20),
    aspectRatio: 1,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: '70%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.primary,
  },
});
