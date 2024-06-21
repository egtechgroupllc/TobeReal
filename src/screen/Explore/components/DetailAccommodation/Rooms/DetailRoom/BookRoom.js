import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {IconCoinPoint, IconNext} from '../../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {useAuthentication} from '../../../../../../hooks/useAuthentication';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../../utils/format';
import RealEstateType from '../../../../../News/PostNews/components/RealEstateType';
import DetailPriceRoom from './DetailPriceRoom';

export default function BookRoom({data}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  const {token} = useAuthentication();

  const [selectRoom, setSelectRoom] = useState(1);

  const roomsAverage = useMemo(() => {
    const result = data?.room_dates?.map(item => {
      return item?.number_room_real;
    });

    return Math.min(...result);
  }, [data?.room_dates]);

  const priceAverage = useMemo(
    () => selectRoom * data?.priceAverage * data?.date?.numNight,
    [selectRoom, data?.date?.numNight, data?.priceAverage],
  );
  const feePrice = priceAverage * (11.8165 / 100);
  const handleBookingRoom = value => {
    !token
      ? navigate('NavigationAuth')
      : navigate('BookingRoomScreen', {
          ...data,
          numRoomSelect: selectRoom,
          total: priceAverage,
          percentDiscount: data?.percentDiscount,
        });
  };
  const calculatePrice = () => {
    if (data?.percentDiscount && data?.percentDiscount === 1) {
      return priceAverage;
    } else {
      return priceAverage - priceAverage * data?.percentDiscount;
    }
  };
  return (
    <View
      style={[styles.wrapper, {paddingBottom: insets.bottom + scale(6)}]}
      activeOpacity={0.7}
      onPress={() => {
        setIsOpen(!isOpen);
      }}>
      <TouchableNativeFeedback onPress={() => setIsOpen(true)}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(6),
            alignItems: 'center',
          }}>
          <IconNext
            width={scale(12)}
            height={scale(12)}
            fill={COLORS.primary}
            style={{
              transform: [
                {
                  rotate: isOpen ? '90deg' : '-90deg',
                },
              ],
            }}
          />
          <CustomText style={{color: COLORS.text}}>
            {t('total_price_room')}{' '}
            <CustomText textType="medium">
              {' '}
              {selectRoom} {t('room')}
            </CustomText>
            ,
            <CustomText textType="medium">
              {data?.date?.numNight} {t('night')}
            </CustomText>
          </CustomText>
        </View>
      </TouchableNativeFeedback>

      <DetailPriceRoom
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        data={data}
        numRoom={selectRoom}
      />

      <View style={styles.content}>
        <TouchableNativeFeedback onPress={() => setIsOpen(true)}>
          <View
            style={{
              rowGap: scale(2),
            }}>
            {data?.percentDiscount != 1 && (
              <CustomText
                style={{
                  color: COLORS.text,
                  textDecorationLine: 'line-through',
                }}>
                {formatPrice(priceAverage)}
              </CustomText>
            )}
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.primary,
                fontSize: SIZES.xMedium,
              }}>
              {formatPrice(calculatePrice())}
            </CustomText>
            <View>
              <CustomText
                style={{
                  fontSize: SIZES.xSmall,
                  color: COLORS.text,
                }}>
                {t('last_price')}
              </CustomText>
              <View
                style={{
                  ...styles.row,
                  ...styles.point,
                }}>
                <IconCoinPoint />
                <CustomText>
                  {t('receive')}{' '}
                  <CustomText textType="medium" style={{color: '#ff5e1f'}}>
                    {formatPrice(selectRoom * 12312231)} {t('points')}
                  </CustomText>
                </CustomText>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>

        <View style={{width: '40%', rowGap: scale(10)}}>
          <RealEstateType
            getKeyValue="value"
            isDefaultValue
            styleWrapper={{width: '100%'}}
            data={[...Array(roomsAverage)].map((_, index) => ({
              name: `${index + 1} ${t('room')}`,
              value: index + 1,
            }))}
            buttonEstateTypes={{
              height: scale(32),
            }}
            onSelect={setSelectRoom}
          />

          <CustomButton
            buttonType="normal"
            text={t('booking')}
            linearGradientProps
            style={{minWidth: scale(100)}}
            onPress={handleBookingRoom}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingTop: scale(8),
    paddingHorizontal: scale(20),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    rowGap: scale(5),
  },
  content: {
    flexDirection: 'row',
    columnGap: scale(20),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(8),
  },
  point: {
    paddingVertical: scale(10),
  },
});
