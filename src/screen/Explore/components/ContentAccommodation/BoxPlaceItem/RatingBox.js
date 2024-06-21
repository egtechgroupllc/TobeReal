import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SHADOW, scale} from '../../../../../assets/constants';
import {formatNumber, formatPrice} from '../../../../../utils/format';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function RatingBox({rating, textRating, style}) {
  const {t} = useLanguage();
  return (
    <View style={[styles.ratingNumberBox, style]}>
      <View
        style={{
          ...styles.boxIcon,
          borderRadius: 0,
          backgroundColor: '#013b96',
        }}>
        <CustomText textType="semiBold" style={{color: '#fff'}}>
          {formatPrice(rating, {showCurrency: false, decimalPlaces: 2})}
        </CustomText>
      </View>

      <View
        style={{
          padding: scale(4),
          paddingHorizontal: scale(10),
          borderRadius: 6,
        }}>
        <CustomText
          textType="semiBold"
          style={{color: '#013b96'}}
          numberOfLines={1}>
          {formatNumber(textRating)}{' '}
          {textRating > 1
            ? t('reviews').toLowerCase()
            : t('review').toLowerCase()}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumberBox: {
    flexDirection: 'row',
    borderRadius: scale(5),
    overflow: 'hidden',
    ...SHADOW,
    backgroundColor: '#f5f5f5',
  },
  boxIcon: {
    // backgroundColor: '#f5f5f5',
    padding: scale(4),
    paddingHorizontal: scale(10),
    borderRadius: 6,
  },
});
