import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, images, scale} from '../../../../assets/constants';
import {IconClock, IconDown} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import DetailPriceRoom from './ContentStep1/DetailPriceRoom';
import PaymentMethods from './ContentStep2/PaymentMethods';
import {formatDate} from '../../../../utils/format';
import {postBookingRoom} from '../../../../Model/api/apiAccom';
import {showMess} from '../../../../assets/constants/Helper';
import {useNavigation} from '@react-navigation/native';
export default function ContentStep2({onPress, data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();

  const insets = useSafeAreaInsets();

  const queryClient = useQueryClient();
  const bookingRoomMu = useMutation({
    mutationFn: postBookingRoom,
  });

  const handleBookingRoom = value => {
    bookingRoomMu.mutate(
      {
        data: {
          check_in_date: data?.date?.selectedStartDate,
          check_out_date: data?.date?.selectedEndDate,
          number_room: data?.numRoomSelect,
        },
        id_room: data?.id,
      },
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );
          queryClient.invalidateQueries([
            'accommodation',
            'detail',
            'list-room',
            data?.idAccom,
          ]);
          queryClient.invalidateQueries(['user', 'profile']);

          navigate('Booking', {
            screen: 'HomeBookingsScreen',
          });
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          padding: scale(10),
          height: scale(100),
          borderBottomLeftRadius: scale(12),
          borderBottomRightRadius: scale(12),
        }}>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              columnGap: scale(10),
              width: '100%',
              backgroundColor: '#255c9f',
              padding: scale(12),
            }}>
            <CustomImage
              source={images.a3}
              style={{
                width: scale(30),
                height: scale(30),
                borderRadius: scale(6),
              }}
            />
            <View
              style={{
                alignItems: 'center',
                rowGap: scale(4),
              }}>
              <CustomText
                color={COLORS.white}
                textType="semiBold"
                style={{
                  textAlign: 'center',
                }}>
                {data?.nameAccom}
              </CustomText>
              <CustomText color={COLORS.white}>
                {formatDate(data?.date?.selectedStartDate, {
                  dateStyle: 'dd-MM-yyyy',
                })}
                , {data?.date?.numNight} đêm{' '}
              </CustomText>
            </View>
            <IconDown fill={COLORS.white} />
          </View>

          <ItemUtil
            Icon={IconClock}
            styleIcon={{
              width: scale(16),
              height: scale(16),
            }}
            value={`Mã phòng: ${data?.id}`}
            color={COLORS.blue}
            valueBold
            styleWrapper={{
              padding: scale(10),
              justifyContent: 'center',
              width: '100%',
              backgroundColor: '#edf8ff',
            }}
          />

          <PaymentMethods data={data} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 'auto',
          marginBottom: scale(20) + insets.bottom,
          padding: scale(20),
          marginHorizontal: scale(10),
          borderRadius: scale(6),
          rowGap: scale(20),
        }}>
        <DetailPriceRoom data={data} />
        <CustomText textType="semiBold">
          {data?.name} ({data?.room_bed_type?.name}),{data?.numRoomSelect}x
        </CustomText>
        <CustomButton text="Thanh Toán" onPress={handleBookingRoom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  search: {
    borderRadius: scale(6),
    backgroundColor: COLORS.white,
    // ...SHADOW,
    overflow: 'hidden',
    // minHeight: 200,
    zIndex: 99,
    alignItems: 'center',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    paddingVertical: scale(14),
    borderBottomColor: '#f1f1f1',
  },
});
