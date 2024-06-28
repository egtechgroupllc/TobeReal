/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  scale,
} from '../../../../../../../assets/constants';
import {Counter, CustomButton} from '../../../../../../../components';
import {CustomText} from '../../../../../../../components';
import {useAuthentication} from '../../../../../../../hooks/useAuthentication';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function SelectVoucherFooter({
  count,
  data,
  onGoBack,
  buyVoucher,
  quantity,
  setQuantity,
  numQuantity,
  onBuy,
}) {
  const {t} = useLanguage();

  const {navigate, goBack} = useNavigation();
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={{...styles.wrapper, paddingBottom: bottom + scale(10)}}>
      {!buyVoucher && (
        <View
          style={{
            rowGap: scale(2),
          }}>
          <CustomText>{t('selected')}:</CustomText>
          <CustomText
            textType="bold"
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.primary,
            }}>
            {count} {t('voucher')}
          </CustomText>
        </View>
      )}
      {buyVoucher && (
        <View
          style={{
            padding: scale(5),
            columnGap: scale(10),
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(10),
            borderWidth: 1,
            borderColor: COLORS.primary,
          }}>
          <CustomText>{t('quantity')}:</CustomText>
          <Counter
            heading={t('adult')}
            styleWrapper={{width: '30%'}}
            onChange={setQuantity}
            value={quantity}
            max={numQuantity}
          />
        </View>
      )}
      <CustomButton
        onPress={() => {
          if (!buyVoucher) {
            onGoBack && onGoBack(data);
            goBack();
          } else {
            onBuy && onBuy();
          }
        }}
        buttonType="small"
        style={{flex: 0.5}}
        text={!buyVoucher ? t('apply') : t('BUY')}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    columnGap: scale(20),
    paddingVertical: scale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scale(100),
    padding: scale(20),
    position: 'absolute',
    width: '100%',
    bottom: 0,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});
