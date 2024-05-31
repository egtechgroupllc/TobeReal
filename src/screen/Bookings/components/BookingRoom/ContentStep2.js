import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postBookingRoom, postPaypal} from '../../../../Model/api/apiAccom';
import {COLORS, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {IconCoinPoint} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatPrice} from '../../../../utils/format';
import DetailPriceRoom from './ContentStep1/DetailPriceRoom';
import TopStep2 from './ContentStep2/TopStep2';
export default function ContentStep2({onPress, data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [contact, setContact] = useState([]);
  const [typePayment, setTypePayment] = useState();
  const insets = useSafeAreaInsets();
  const policyId = data?.accommodation_policies[0]?.id;
  const queryClient = useQueryClient();
  const bookingRoomMu = useMutation({
    mutationFn: postBookingRoom,
  });

  useEffect(() => {
    const loadInfoBooking = async () => {
      const result = await EncryptedStorage.getItem('@infoBooking');
      setContact(JSON.parse(result));
    };
    loadInfoBooking();
  }, []);
  const paypalMutation = useMutation({
    mutationFn: postPaypal,
  });
  const handlePaypal = value => {
    paypalMutation.mutate(
      {
        id: value,
        type: 'ROOM',
      },
      {
        onSuccess: dataInside => {
          Linking.openURL(dataInside?.data?.links[1].href);
          navigate('Booking', {
            screen: 'HomeBookingsScreen',
          });
        },
        onError: err => {
          console.log(err);
        },
      },
    );
  };
  const handleBookingRoom = value => {
    typePayment
      ? bookingRoomMu.mutate(
          {
            check_in_date: data?.date?.selectedStartDate,
            check_out_date: data?.date?.selectedEndDate,
            number_room: data?.numRoomSelect,
            accommodation_policy_id: policyId, //id của chính sách liên kết với phòng đó
            room_id: data?.id, //id của phòng
            contact_name: contact?.username,
            contact_email: contact?.email,
            contact_phone: contact?.phone,
            // payment: typePayment,
          },
          {
            onSuccess: dataInside => {
              showMess(
                dataInside?.message,
                dataInside?.status ? 'success' : 'error',
              );

              if (dataInside?.status) {
                queryClient.invalidateQueries([
                  'accommodation',
                  'detail',
                  'list-room',
                  data?.idAccom,
                ]);
                queryClient.invalidateQueries(['user', 'profile']);
                // if (dataInside?.data?.payment === 'PAYPAL') {
                //   handlePaypal(dataInside?.data?.id);
                //   return;
                // }
                navigate('Booking', {
                  screen: 'HomeBookingsScreen',
                });
              }
            },
            onError: err => {
              console.log({err});
            },
          },
        )
      : showMess('Please select payment method', 'error');
  };

  return (
    <View style={styles.container}>
      <TopStep2 data={data} onChange={value => setTypePayment(value?.type)} />

      <View style={{...styles.footer, marginBottom: scale(10) + insets.bottom}}>
        <View style={styles.boxDetailPrice}>
          <DetailPriceRoom data={data} />
          <CustomText textType="semiBold">
            {data?.name} ({data?.room_bed_type?.name}),{data?.numRoomSelect}x
          </CustomText>
          <CustomButton text="Pay" onPress={handleBookingRoom} />
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
