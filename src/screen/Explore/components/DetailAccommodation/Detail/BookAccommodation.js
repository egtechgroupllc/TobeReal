/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import Skeleton from '../../../../../components/Skeleton';
import {useAuthentication} from '../../../../../hooks/useAuthentication';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../utils/format';

export default memo(function BookAccommodation({
  setBookHeight,
  isLoading,
  price,
  onPress,
  data,
}) {
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
      {/* <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(20),
          width: '70%',
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
      </Skeleton> */}

      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(48),
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(20),
            paddingVertical: scale(8),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              rowGap: scale(2),
            }}>
            <CustomText>Khởi điểm:</CustomText>
            <CustomText
              textType="bold"
              style={{
                fontSize: SIZES.xMedium,
                color: COLORS.primary,
              }}>
              {formatPrice(2313132)}
            </CustomText>
          </View>
          <CustomButton
            onPress={() => {
              !token
                ? navigate('NavigationAuth')
                : navigate('RoomScreen', data);
            }}
            buttonType="medium"
            style={{flex: 0.7}}
            text={'View Room'}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
        </View>
      </Skeleton>
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
  contact: {
    height: scale(260),
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: '#CDCDCD',
    width: '90%',
    alignSelf: 'center',
    top: scale(-300),
    ...SHADOW,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: scale(10),
  },
});
