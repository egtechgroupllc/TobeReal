import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, images, scale} from '../../../../assets/constants';
import {IconClock, IconCoinPoint, IconDown} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import DetailPriceRoom from './ContentStep1/DetailPriceRoom';
import PaymentMethods from './ContentStep2/PaymentMethods';
import {formatDate, formatPrice} from '../../../../utils/format';
import {postBookingRoom} from '../../../../Model/api/apiAccom';
import {showMess} from '../../../../assets/constants/Helper';
import {useNavigation} from '@react-navigation/native';
import TopStep2 from './ContentStep2/TopStep2';
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
      <TopStep2 data={data} />
      <View style={{...styles.footer, marginBottom: scale(10) + insets.bottom}}>
        <View style={styles.boxDetailPrice}>
          <DetailPriceRoom data={data} />
          <CustomText textType="semiBold">
            {data?.name} ({data?.room_bed_type?.name}),{data?.numRoomSelect}x
          </CustomText>
          <CustomButton text="Thanh Toán" onPress={handleBookingRoom} />
        </View>

        <View style={styles.boxEarnPoint}>
          <IconCoinPoint />
          <CustomText color={COLORS.blue} textType="semiBold">
            {formatPrice(12312, {showCurrency: false})} Point
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  footer: {
    backgroundColor: '#edf8ff',
    marginTop: 'auto',
    marginHorizontal: scale(10),
    borderRadius: scale(6),
  },
  boxDetailPrice: {
    backgroundColor: '#fff',
    borderRadius: scale(6),
    rowGap: scale(16),
    padding: scale(20),
  },
  boxEarnPoint: {
    padding: scale(12),
    flexDirection: 'row',
    columnGap: scale(6),
    alignItems: 'center',
  },
});
