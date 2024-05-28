import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import Star from '../../../components/StarRating';

export default function TopReview({data}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(10),
      }}>
      <CustomImage
        source={data?.accommodation?.images[0]?.url}
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
          color={COLORS.white}>
          Please review your experience at {data?.accommodation?.name}
        </CustomText>
        <CustomText color={COLORS.white}>
          Rate to get better service improvement!
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
