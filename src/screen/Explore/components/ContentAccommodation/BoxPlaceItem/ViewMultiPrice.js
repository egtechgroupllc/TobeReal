import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
const list = [
  {
    id: 1,
    price: 100000,
    rental: 'night',
  },
  {
    id: 2,
    price: 1000000,
    rental: 'month',
  },
  {
    id: 3,
    price: 1000000,
    rental: 'year',
  },
];
export default function ViewMultiPrice({
  isUnitAvailable,
  viewMultiPrice = 'default',
}) {
  const ComponentTextPrice =
    viewMultiPrice === 'viewMultiPrice2' ? TextPrice2 : TextPrice;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          {rowGap: scale(4), flex: 1},
          viewMultiPrice === 'viewMultiPrice2' && styles.viewMultiPrice2,
        ]}>
        {viewMultiPrice === 'default' && (
          <CustomText textType="regular" style={{fontSize: SIZES.xSmall}}>
            Price Starts From :
          </CustomText>
        )}

        {list.map((item, index) => {
          return (
            <ComponentTextPrice
              key={`key-${item.id}-${index}`}
              price={item?.price}
              rental={item?.rental}
              isBorder={viewMultiPrice === 'viewMultiPrice2' && index === 0}
            />
          );
        })}
      </View>

      {isUnitAvailable && (
        <View style={styles.unitAvailable}>
          <CustomText textType="semiBold" style={styles.textUnitAvailable}>
            86{'\n'}
            <CustomText textType="regular" style={{fontSize: scale(8)}}>
              Unit {'\n'} Available
            </CustomText>
          </CustomText>
        </View>
      )}
    </View>
  );
}

function TextPrice({price, rental}) {
  return (
    <CustomText textType="semiBold" style={[styles.buildingName]}>
      {formatPrice(price)}{' '}
      <CustomText
        textType="regular"
        style={{fontSize: SIZES.xSmall, color: COLORS.white}}>
        / {rental}
      </CustomText>
    </CustomText>
  );
}

function TextPrice2({price, rental, isBorder}) {
  return (
    <View
      style={[
        styles.boxTextPrice2,
        !isBorder && {
          borderTopWidth: rental === 'night' ? 0 : 1,
          borderTopColor: COLORS.grey,
        },
      ]}>
      <View>
        <CustomText textType="semiBold" style={{textTransform: 'capitalize'}}>
          {rental}
        </CustomText>
      </View>

      <View style={[styles.buildingName, {alignItems: 'flex-end'}]}>
        <CustomText textType="semiBold">{formatPrice(price)}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(6),
    alignItems: 'flex-start',
  },
  viewMultiPrice2: {
    backgroundColor: '#f8f8f8',
    borderRadius: scale(10),
    padding: scale(10),
  },
  buildingName: {
    flex: 1,
    color: COLORS.white,
  },
  unitAvailable: {
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    padding: scale(4),
    paddingHorizontal: scale(6),
  },
  textUnitAvailable: {
    color: COLORS.text,
    textAlign: 'center',
    fontSize: SIZES.xSmall,
  },
  boxTextPrice2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    columnGap: scale(6),
    paddingVertical: scale(4),
  },
});
