/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useAuthentication} from '../../../../../../../hooks/useAuthentication';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button, CText} from '~/components';
import {scale} from '~/utils/scale';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import Counter from '~/components/Counter';
import {useLanguage} from '~/hooks/useLanguage';

export default function SelectVoucherFooter({
  count,
  data,
  onGoBack = () => {},
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
          <CText style={{color: COLORS.White}}>{t('selected')}:</CText>
          <CText
            textType="bold"
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.White,
            }}>
            {count} {t('voucher').toLowerCase()}
          </CText>
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
            borderColor: COLORS.overlay,
            flex: 1,
          }}>
          <CText style={{color: COLORS.White}}>{t('quantity')}:</CText>
          <Counter
            styleWrapper={{width: '70%'}}
            onChange={setQuantity}
            value={quantity}
            max={numQuantity}
          />
        </View>
      )}
      <Button
        onPress={() => {
          if (!buyVoucher) {
            onGoBack(data);
            goBack();
            // navigate('BuyVoucherScreen');
          } else {
            onBuy && onBuy(data);
          }
        }}
        linearGradientProps={{colors: COLORS.linearButton}}
        buttonType="small"
        style={{flex: 0.5}}
        title={!buyVoucher ? t('apply') : t('BUY')}
        styleText={{
          fontSize: SIZES.xMedium,
          color: COLORS.White,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.overlay,
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
