/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default memo(function BookAccommodation({data}) {
  const {t} = useLanguage();

  const {navigate} = useNavigation();
  const {token} = useAuthentication();
  const params = useRoute().params;
  const {currency} = useCountry();
  const priceFinal = useMemo(() => {
    if (params?.rooms) {
      let min = 0;
      params?.rooms?.map(element => {
        const result = element?.room_dates?.map(room => {
          return room?.price_final;
        });
        console.log(result);
        min = Math.min(...result);
      });
      return min;
    }
  }, [params?.rooms]);

  return (
    <View style={styles.wrapper}>
      <View
        style={{
          rowGap: scale(2),
        }}>
        <CustomText style={{color: COLORS.white}}>
          {t('price_only_from')}:
        </CustomText>
        <CustomText
          textType="bold"
          style={{
            fontSize: SIZES.xMedium,
            color: COLORS.white,
          }}>
          {formatPrice(params?.priceFinal || priceFinal, {
            currency: currency?.currency_code,
          })}
        </CustomText>
      </View>
      <CustomButton
        onPress={() => {
          !token ? navigate('NavigationAuth') : navigate('RoomScreen', data);
        }}
        buttonType="medium"
        style={{flex: 0.7}}
        text={t('view_room')}
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
