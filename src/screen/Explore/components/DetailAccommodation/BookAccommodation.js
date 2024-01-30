/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function BookAccommodation({setBookHeight}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{...styles.wrapper, paddingBottom: insets.bottom - 5}}
      onLayout={e => {
        const {height} = e.nativeEvent.layout;
        setBookHeight(height);
      }}>
      <View style={styles.price}>
        <CustomText
          style={{
            fontSize: SIZES.xMedium,
          }}>
          Per month from:
        </CustomText>
        <CustomText
          style={{
            fontSize: SIZES.medium,
          }}
          textType="bold">
          {formatPrice(20000)}
        </CustomText>
      </View>

      <View style={{flexDirection: 'row', columnGap: scale(8)}}>
        <CustomButton
          outline
          buttonType="large"
          style={{flex: 0.7}}
          text="Contact Host"
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <CustomButton
          buttonType="large"
          style={{flex: 1}}
          text="Book Now"
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: scale(100),
    rowGap: scale(10),
    padding: scale(16),
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
});
