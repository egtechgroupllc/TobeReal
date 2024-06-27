/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  scale,
} from '../../../../../../../assets/constants';
import {CustomButton} from '../../../../../../../components';
import {CustomText} from '../../../../../../../components';
import {useAuthentication} from '../../../../../../../hooks/useAuthentication';
import {formatPrice} from '../../../../../../../utils/format';
import {useCountry} from '../../../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../../../hooks/useLanguage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function SelectVoucherFooter({count, data, onGoBack}) {
  const {t} = useLanguage();

  const {navigate, goBack} = useNavigation();

  const {bottom} = useSafeAreaInsets();

  return (
    <View style={{...styles.wrapper, paddingBottom: bottom + scale(10)}}>
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
      <CustomButton
        onPress={() => {
          onGoBack && onGoBack(data);
          goBack();
        }}
        buttonType="small"
        style={{flex: 0.5}}
        text={t('apply')}
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
