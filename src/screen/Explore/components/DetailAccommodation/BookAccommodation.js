/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {formatPrice} from '../../../../utils/format';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {useNavigation} from '@react-navigation/native';

export default memo(function BookAccommodation({setBookHeight, price}) {
  const insets = useSafeAreaInsets();
  const {t} = useLanguage();
  const {token} = useAuthentication();
  const {navigate} = useNavigation();

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
          {price < 1000000000 ? t('per_month_from') : t('for_sale')}
        </CustomText>
        <CustomText
          style={{
            fontSize: SIZES.medium,
          }}
          textType="bold">
          {formatPrice(price, {
            locales: 'vi',
          })}{' '}
        </CustomText>
      </View>

      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(8),
          paddingVertical: scale(10),
        }}>
        <CustomButton
          onPress={() => {
            !token ? navigate('NavigationAuth') : navigate('BookingScreen');
          }}
          outline
          buttonType="large"
          style={{flex: 0.7}}
          text={t('contact_host')}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        {/* <CustomButton
          onPress={() => {
            !token ? navigate('NavigationAuth') : navigate('BookingScreen');
          }}
          buttonType="large"
          style={{flex: 1}}
          text={price < 1000000000 ? t('book_now') : t('buy')}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        /> */}
        
        {/* ------------NO LOGIN----------- */}
          <CustomButton
          onPress={() => {
            token ? navigate('NavigationAuth') : navigate('BookingScreen');
          }}
          buttonType="large"
          style={{flex: 1}}
          text={price < 1000000000 ? t('book_now') : t('buy')}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
      </View>
    </View>
  );
});

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
