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

export default memo(function BookTour({data}) {
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const {token} = useAuthentication();
  const params = useRoute().params;
  const {currency} = useCountry();
  const priceFinal = useMemo(() => {
    if (params?.tour_tickets) {
      let min = 0;
      params?.rooms?.map(element => {
        const result = element?.tour_tickets?.map(ticket => {
          return ticket?.price_final;
        });
        console.log(result);
        min = Math.min(...result);
      });
      return min;
    }
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
          {formatPrice(params?.priceFinal || priceFinal, {
            currency: currency?.currency_code,
          })}
        </CustomText>
      </View>
      <CustomButton
        onPress={() => {
          // !token ? navigate('NavigationAuth') : navigate('RoomScreen', data);
          !token ? navigate('NavigationAuth') : '';
        }}
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
