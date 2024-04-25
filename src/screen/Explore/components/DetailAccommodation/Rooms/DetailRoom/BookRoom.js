import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {CustomButton} from '../../../../../../components';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import CustomText from '../../../../../../components/CustomText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../../assets/constants';
import {formatPrice} from '../../../../../../utils/format';
import {IconCoinPoint, IconNext} from '../../../../../../assets/icon/Icon';
import BottomSheet from '../../../../../../components/BottomSheet';
import DetailPriceRoom from './DetailPriceRoom';
import {showMess} from '../../../../../../assets/constants/Helper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postBookingRoom} from '../../../../../../Model/api/apiAccom';
import {useNavigation} from '@react-navigation/native';
import RealEstateType from '../../../../../News/PostNews/components/RealEstateType';
import {useAuthentication} from '../../../../../../hooks/useAuthentication';

export default function BookRoom({data}) {
  const {t} = useLanguage();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const bookingRoomMu = useMutation({
    mutationFn: postBookingRoom,
  });
  const {goBack, navigate} = useNavigation();
  const {token} = useAuthentication();

  const Ok = () => {
    !token ? navigate('NavigationAuth') : navigate('BookingRoomScreen', data);
  };
  const [selectRoom, setSelectRoom] = useState(1);

  const roomsAverage = useMemo(() => {
    const result = data?.room_dates?.map(item => {
      return item?.number_room_real;
    });

    return Math.min(...result);
  }, [data?.room_dates]);

  const handleBookingRoom = value => {
    Ok();
    // bookingRoomMu.mutate(
    //   {
    //     data: {
    //       check_in_date: data?.date?.selectedStartDate,
    //       check_out_date: data?.date?.selectedEndDate,
    //       number_room: selectRoom,
    //     },
    //     id_room: data?.id,
    //   },
    //   {
    //     onSuccess: dataInside => {
    //       showMess(
    //         dataInside?.message,
    //         dataInside?.status ? 'success' : 'error',
    //       );
    //       if (dataInside?.status) {
    //         queryClient.invalidateQueries([
    //           'accommodation',
    //           'detail',
    //           'list-room',
    //           data?.id,
    //         ]);
    //         goBack();
    //       }
    //     },
    //     onError: err => {
    //       console.log({err});
    //     },
    //   },
    // );
  };

  const priceAverage = useMemo(
    () => selectRoom * data?.priceAverage * data?.date?.numNight,
    [selectRoom, data?.date?.numNight, data?.priceAverage],
  );
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
            Tổng gía phòng cho{' '}
            <CustomText textType="medium"> {selectRoom} phòng</CustomText>,
            <CustomText textType="medium">
              {data?.date?.numNight} đêm
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
            <CustomText
              style={{color: COLORS.text, textDecorationLine: 'line-through'}}>
              {formatPrice(data?.priceAverage)}
            </CustomText>
            <CustomText
              textType="semiBold"
              style={{
                color: COLORS.primary,
                fontSize: SIZES.xMedium,
              }}>
              {formatPrice(priceAverage)}
            </CustomText>
            <View>
              <CustomText
                style={{
                  fontSize: SIZES.xSmall,
                  color: COLORS.text,
                }}>
                Giá cuối cùng
              </CustomText>
              <View
                style={{
                  ...styles.row,
                  ...styles.point,
                }}>
                <IconCoinPoint />
                <CustomText>
                  Nhận{' '}
                  <CustomText textType="medium" style={{color: '#ff5e1f'}}>
                    {formatPrice(selectRoom * 12312231)} điểm
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
              name: `${index + 1} phòng`,
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
