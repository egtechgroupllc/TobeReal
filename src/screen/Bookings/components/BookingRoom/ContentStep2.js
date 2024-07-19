import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Linking, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {postBookingRoom, postPaypal} from '../../../../Model/api/apiAccom';
import {COLORS, SIZES, animations, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {IconCoinPoint, IconSupporterYellow} from '../../../../assets/icon/Icon';
import {CustomButton} from '../../../../components';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {useCountdown} from '../../../../hooks/useCountdown';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatPrice} from '../../../../utils/format';
import DetailPriceRoom from './ContentStep1/DetailPriceRoom';
import TopStep2 from './ContentStep2/TopStep2';
import ModalBookingSuccess from './ContentStep2/ModalBookingSuccess';
export default function ContentStep2({data}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [contact, setContact] = useState([]);
  const [typePayment, setTypePayment] = useState();
  const insets = useSafeAreaInsets();
  const policyId = data?.accommodation_policies[0]?.id;
  const queryClient = useQueryClient();
  const [openContact, setOpenContact] = useState(false);
  const [check, setCheck] = useState(false);
  const [dataVoucher, setDataVoucher] = useState();
  const [balance, setBalance] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const bookingRoomMu = useMutation({
    mutationFn: postBookingRoom,
  });
  const {start, countdown} = useCountdown(10);

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
  const isPending = useRef(false);
  const handleBookingRoom = value => {
    if (!typePayment) {
      showMess(t('please_select_payment'), 'error');
      return;
    }
    setOpenContact(true);
    setTimeout(() => {
      // setOpenContact(false);
      bookingRoomMu.mutate(
        {
          check_in_date: data?.date?.selectedStartDate,
          check_out_date: data?.date?.selectedEndDate,
          number_room: data?.numRoomSelect,
          accommodation_policy_id: policyId, //id của chính sách liên kết với phòng đó
          room_id: data?.id, //id của phòng
          contact_name: contact?.username,
          contact_email: contact?.email,
          contact_phone: contact?.phone,
          type_payment: typePayment,
          array_voucher_id: dataVoucher?.map(item => item?.id),
        },
        {
          onSuccess: dataInside => {
            isPending.current = true;
            setCheck({
              status: dataInside?.status,
              mess: dataInside?.message,
            });
            start();
            // showMess(
            //   dataInside?.message,
            //   dataInside?.status ? 'success' : 'error',
            // );

            setTimeout(
              () => {
                setOpenContact(false);

                if (dataInside?.status) {
                  queryClient.invalidateQueries([
                    'accommodation',
                    'detail',
                    'list-room',
                    data?.idAccom,
                  ]);
                  queryClient.invalidateQueries(['user', 'profile']);
                  if (dataInside?.data?.payment === 'PAYPAL') {
                    handlePaypal(dataInside?.data?.id);
                    return;
                  }
                  navigate('Booking', {
                    screen: 'HomeBookingsScreen',
                  });
                }
              },
              dataInside?.status === false ? 3000 : 10000,
            );
          },
          onError: err => {
            console.log({err});
          },
        },
      );
    }, 2000);
  };

  const priceVoucher = useMemo(() => {
    if (dataVoucher && typePayment === 'VOUCHER') {
      const countDis = dataVoucher.reduce((acc, item) => {
        return acc + item?.price_discount;
      }, 0);

      return countDis;
    } else {
      return 0;
    }
  }, [dataVoucher, typePayment]);
  const checkBalance = useMemo(() => {
    if (typePayment === 'FIAT') {
      return balance < totalPrice;
    } else if (typePayment === 'VOUCHER') {
      return priceVoucher < totalPrice;
    }
    return false; // Default return value
  }, [priceVoucher, totalPrice, balance, typePayment]);

  return (
    <View style={styles.container}>
      <TopStep2
        data={data}
        onChange={value => setTypePayment(value?.type)}
        typePayment={typePayment}
        onCheckVoucher={value => {
          setDataVoucher(value);
        }}
        dataVoucher={dataVoucher}
        onChangeBalance={value => setBalance(value)}
      />
      <ModalBookingSuccess
        openContact={openContact}
        isPending={isPending}
        check={check}
        countdown={countdown}
      />
      <View style={{...styles.footer, marginBottom: scale(10) + insets.bottom}}>
        <View style={styles.boxDetailPrice}>
          <DetailPriceRoom
            data={data}
            priceVoucher={priceVoucher}
            onChangeTotalPrice={value => setTotalPrice(value)}
          />
          <CustomText textType="semiBold">
            {data?.name} ({data?.room_bed_type?.name}),{data?.numRoomSelect}x
          </CustomText>
          <CustomButton
            text={t('pay')}
            onPress={handleBookingRoom}
            disabled={checkBalance}
            style={{
              backgroundColor: !checkBalance ? COLORS.primary : COLORS.grey,
            }}
          />
        </View>

        <View style={styles.boxEarnPoint}>
          <IconCoinPoint />
          <CustomText color={COLORS.black} textType="semiBold">
            {formatPrice(0, {showCurrency: false})} {t('point')}
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
    backgroundColor: COLORS.subPrimary,
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
