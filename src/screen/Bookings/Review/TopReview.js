import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import Star from '../../../components/Star';

export default function TopReview() {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(10),
      }}>
      <CustomImage
        source={images.a3}
        style={{
          width: scale(80),
          height: scale(80),
          borderRadius: scale(6),
        }}
      />
      <View
        style={{
          flex: 1,
          rowGap: scale(4),
        }}>
        <CustomText
          numberOfLines={2}
          textType="semiBold"
          size={SIZES.xMedium}
          color={COLORS.text}>
          danh gia san pham tiktokdanh gia san pham tiktokdanh gia san pham
          tiktok
        </CustomText>
        <CustomText color={COLORS.textSub}>danh gia san pham tiktok</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
