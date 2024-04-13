/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {CustomButton} from '../../../../../../components';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useAuthentication} from '../../../../../../hooks/useAuthentication';
import {useNavigation} from '@react-navigation/native';
import Skeleton from '../../../../../../components/Skeleton';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../../utils/format';
import CustomText from '../../../../../../components/CustomText';

export default memo(function BookAccommodation({
  setBookHeight,
  isLoading,
  price,
  onPress,
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
      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(20),
          width: '70%',
        }}>
        <View style={styles.price}>
          <CustomText
            style={{
              fontSize: SIZES.xMedium,
              color: COLORS.white,
            }}>
            {t('for_sale')}
          </CustomText>
          <CustomText
            style={{
              fontSize: SIZES.medium,
              color: COLORS.white,
            }}
            textType="bold">
            {formatPrice(price, {
              locales: 'en',
            })}{' '}
          </CustomText>
        </View>
      </Skeleton>

      <Skeleton
        visible={!isLoading}
        shimmerStyle={{
          height: scale(48),
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(8),
            paddingVertical: scale(10),
          }}>
          <CustomButton
            onPress={onPress}
            buttonType="large"
            style={{flex: 1}}
            text={t('Buy ticket')}
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
    borderTopWidth: scale(1),
    borderColor: COLORS.grey,
    width: '100%',
    minHeight: scale(100),
    rowGap: scale(10),
    padding: scale(16),
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.theme,
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
