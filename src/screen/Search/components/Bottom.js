import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../components/CustomText';
import {formatPrice} from '../../../utils/format';
import {COLORS, SIZES, scale} from '../../../assets/constants';

export default function Bottom({data}) {
  return (
    <View style={styles.bottom}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: scale(10),
        }}>
        <CustomText
          textType="medium"
          style={[styles.price, styles.priceOld]}
          numberOfLines={1}>
          {formatPrice(data?.price_discounted)}{' '}
          <CustomText textType="medium" style={styles.address}>
            / night
          </CustomText>
        </CustomText>
        <View
          style={{
            backgroundColor: '#ff4a6e20',
            borderRadius: scale(3),
          }}>
          <CustomText textType="medium" style={styles.discountText}>
            18%
          </CustomText>
        </View>
      </View>

      <CustomText textType="semiBold" style={styles.price} numberOfLines={1}>
        {formatPrice(1000000)}{' '}
        <CustomText textType="medium" style={styles.address}>
          / night
        </CustomText>
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  discountText: {
    fontSize: SIZES.xSmall,
    color: 'red',
    paddingHorizontal: scale(4),
    paddingVertical: scale(2),
  },
  priceOld: {
    textDecorationLine: 'line-through',
    color: COLORS.textSub,
    fontSize: SIZES.xMedium,
    marginBottom: scale(4),
  },
  bottom: {
    marginTop: scale(10),
  },
});
