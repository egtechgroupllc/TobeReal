import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SHADOW, scale} from '../../../../../assets/constants';
import {formatNumber} from '../../../../../utils/format';
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
          {rating}
        </CustomText>
      </View>

      <View style={{...styles.boxIcon, borderRadius: 0, maxWidth: scale(40)}}>
        <CustomText
          textType="semiBold"
          style={{color: '#013b96'}}
          numberOfLines={1}>
          {formatNumber(textRating)}
        </CustomText>
      </View>
      <View
        style={{
          ...styles.boxIcon,
          borderRadius: 0,
          paddingHorizontal: scale(0),
          marginRight: scale(5),
        }}>
        <CustomText
          textType="semiBold"
          style={{color: '#013b96'}}
          numberOfLines={1}>
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
    flex: 1,
    maxWidth: scale(135),
    flexDirection: 'row',
    borderRadius: scale(5),
    overflow: 'hidden',
    ...SHADOW,
    backgroundColor: '#f5f5f5',
  },
  boxIcon: {
    // backgroundColor: '#f5f5f5',
    padding: scale(4),
    paddingHorizontal: scale(6),
    borderRadius: 6,
  },
});
