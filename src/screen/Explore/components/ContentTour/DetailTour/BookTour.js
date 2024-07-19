/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {useNavigation, useRoute} from '@react-navigation/native';
import Skeleton from '../../../../../components/Skeleton';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../utils/format';
import LinearGradient from 'react-native-linear-gradient';
import {
  IconEmail,
  IconPhone,
  IconSupporterYellow,
  IconX,
  LogoLine,
  LogoMessageFB,
  LogoWhatApp,
  LogoZalo,
} from '../../../../../assets/icon/Icon';
import {useCountry} from '../../../../../hooks/useCountry';
import {showMess} from '../../../../../assets/constants/Helper';

export default memo(function BookTour({data, onPress}) {
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const {token} = useAuthentication();
  const params = useRoute().params;
  const {currency} = useCountry();

  const priceFinal = useMemo(() => {
    const resultPri = params?.tour_tickets?.map(element => {
      const result = element?.tour_ticket_items?.map(percent => {
        const resultPolicy = element?.tour_ticket_dates.reduce((acc, price) => {
          return percent?.price_percent * price?.price_final;
        }, 0);

        return resultPolicy;
      });

      return Math.min(...result);
    });
    return Math.min(...resultPri);
  }, [params?.tour_tickets]);
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          rowGap: scale(2),
        }}>
        <CustomText>{t('price_only_from')}:</CustomText>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.primary,
          }}>
          {formatPrice(priceFinal, {
            currency: currency?.currency_code,
          })}
        </CustomText>
      </View>
      <CustomButton
        onPress={onPress}
        buttonType="medium"
        style={{flex: 0.7}}
        text={t('view_ticket')}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: scale(20),
    paddingVertical: scale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
