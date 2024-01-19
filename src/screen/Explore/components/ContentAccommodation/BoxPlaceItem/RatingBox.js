import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {SHADOW, scale} from '../../../../../assets/constants';

export default function RatingBox({rating, textRating}) {
  return (
    <View style={styles.ratingNumberBox}>
      <View
        style={{
          ...styles.boxIcon,
          borderRadius: 0,
          backgroundColor: '#de4e4e',
        }}>
        <CustomText textType="semiBold" style={{color: '#fff'}}>
          {rating}.0
        </CustomText>
      </View>
      {textRating && (
        <View style={{...styles.boxIcon, borderRadius: 0}}>
          <CustomText
            textType="semiBold"
            style={{color: '#de4e4e', textTransform: 'uppercase'}}>
            {textRating}
          </CustomText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumberBox: {
    flexDirection: 'row',
    borderRadius: scale(5),
    overflow: 'hidden',
    ...SHADOW,
  },
  boxIcon: {
    backgroundColor: '#fff',
    padding: scale(5),
    borderRadius: 6,
  },
});
