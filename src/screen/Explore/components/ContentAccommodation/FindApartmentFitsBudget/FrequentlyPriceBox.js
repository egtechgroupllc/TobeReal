import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconApartment} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {formatNumber} from '../../../../../utils/format';
import BottomSheet from '../../../../../components/BottomSheet';

export default function FrequentlyPriceBox({
  icon,
  textType,
  priceMin,
  priceMax,
  onPress,
}) {
  const IConComponent = icon;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={onPress}>
      <View style={styles.top}>
        <View style={styles.boxIcon}>
          {icon && (
            <IConComponent
              fill={COLORS.primary}
              style={{
                width: scale(24),
                height: scale(24),
              }}
            />
          )}
        </View>

        <CustomText>{textType}</CustomText>
      </View>

      <View style={styles.line} />

      <CustomText textType="bold" style={{letterSpacing: 1}}>
        {priceMin <= 0
          ? `< $${formatNumber(priceMax)}`
          : priceMax < priceMin
          ? `> $${formatNumber(priceMin)}`
          : `$${formatNumber(priceMin)}-${formatNumber(priceMax)}`}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(12),
    borderRadius: scale(12),
    minWidth: '30%',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: scale(2),
  },
  boxIcon: {
    backgroundColor: '#F0B90B20',
    padding: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    aspectRatio: 1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.grey,
    marginVertical: scale(4),
  },
});
