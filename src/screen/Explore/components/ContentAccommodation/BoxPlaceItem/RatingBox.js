import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SHADOW, scale} from '../../../../../assets/constants';
import {formatNumber} from '../../../../../utils/format';

export default function RatingBox({rating, textRating, style}) {
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

      <View style={{...styles.boxIcon, borderRadius: 0}}>
        <CustomText
          textType="semiBold"
          style={{color: '#013b96'}}
          numberOfLines={1}>
          {formatNumber(textRating)} {textRating > 1 ? 'reviews' : 'review'}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumberBox: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: scale(5),
    overflow: 'hidden',
    ...SHADOW,
  },
  boxIcon: {
    backgroundColor: '#f5f5f5',
    padding: scale(4),
    paddingHorizontal: scale(6),
    borderRadius: 6,
  },
});
