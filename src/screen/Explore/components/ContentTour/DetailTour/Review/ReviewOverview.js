import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {formatNumber} from '../../../../../../utils/format';
import ItemOverviewRating from './ItemOverviewRating';
import CustomText from '../../../../../../components/CustomText';

export default function ReviewOverview() {
  return (
    <View style={styles.reviewOverview}>
      <View style={styles.overviewLeft}>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.xxLarge,
            color: COLORS.primary,
          }}>
          4.5
          <CustomText>/5</CustomText>
        </CustomText>
        <CustomText textType="semiBold">Very good</CustomText>
        <CustomText>{formatNumber(146)} reviews</CustomText>
      </View>

      <View style={styles.overviewRight}>
        <ItemOverviewRating rating={1} textType="Cleanliness" />
        <ItemOverviewRating rating={3.8} textType="Meal" />
        <ItemOverviewRating rating={5} textType="Service" />
        <ItemOverviewRating rating={4.3} textType="Location" />
        <ItemOverviewRating rating={4} textType="Convenient" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewOverview: {
    flexDirection: 'row',
    columnGap: scale(10),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overviewLeft: {
    minWidth: '30%',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewRight: {
    // flex: 1,
    minWidth: '50%',
    rowGap: scale(6),
  },
});
