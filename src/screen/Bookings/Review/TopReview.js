import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import CustomImage from '../../../components/CustomImage';
import CustomText from '../../../components/CustomText';
import Star from '../../../components/StarRating';
import {useLanguage} from '../../../hooks/useLanguage';

export default function TopReview({data}) {
  const {t} = useLanguage();

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
          color={COLORS.text}>
          {t('please_review')} {data?.accommodation?.name}
        </CustomText>
        <CustomText color={COLORS.textSub}>
          {t('review_for_improve')}!
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
