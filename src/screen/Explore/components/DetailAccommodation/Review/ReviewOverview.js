import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {formatNumber, formatPrice} from '../../../../../utils/format';
import ItemOverviewRating from './ItemOverviewRating';
import RangeSlider from '../../../../Video/components/RangeSlider';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function ReviewOverview({dataP}) {
  const {t} = useLanguage();

  return (
    <View style={styles.reviewOverview}>
      <View style={styles.overviewLeft}>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.xxLarge,
            color: COLORS.primary,
          }}>
          {formatPrice(dataP?.review_average, {
            showCurrency: false,
            decimalPlaces: 2,
          }) || 0}
          <CustomText>/5</CustomText>
        </CustomText>
        <CustomText textType="semiBold">
          {dataP?.review_average > 4
            ? t('very_good')
            : dataP?.review_average > 3 && dataP?.review_average <= 4
            ? t('good')
            : dataP?.review_average > 2 && dataP?.review_average <= 3
            ? t('average')
            : t('bad')}
        </CustomText>
        <CustomText>
          {formatNumber(dataP?.review_count)} {t('review')}
        </CustomText>
      </View>

      <View style={styles.overviewRight}>
        <ItemOverviewRating rating={1} textType={t('cleanliness')} />
        <ItemOverviewRating rating={3.8} textType={t('meal')} />
        <ItemOverviewRating rating={5} textType={t('service')} />
        <ItemOverviewRating rating={4.3} textType={t('location')} />
        <ItemOverviewRating rating={4} textType={t('convenient')} />
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
