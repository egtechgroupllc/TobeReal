import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Linking, StyleSheet, View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomButton} from '../../../../../../components';
import {
  postBookingRoom,
  postPaypal,
} from '../../../../../../Model/api/apiAccom';
import {COLORS, scale} from '../../../../../../assets/constants';
import {showMess} from '../../../../../../assets/constants/Helper';
import {IconCoinPoint} from '../../../../../../assets/icon/Icon';
import {CustomText} from '../../../../../../components';
import {useCountdown} from '../../../../../../hooks/useCountdown';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  formatDate,
  formatDateTime,
  formatPrice,
} from '../../../../../../utils/format';
import DetailPriceRoom from '../../../../../Bookings/components/BookingRoom/ContentStep1/DetailPriceRoom';
import ModalBookingSuccess from '../../../../../Bookings/components/BookingRoom/ContentStep2/ModalBookingSuccess';
import TopStep2 from '../../../../../Bookings/components/BookingRoom/ContentStep2/TopStep2';
import {postBookingTour} from '../../../../../../Model/api/apiTour';
export default function BookingTourConfirmScreen() {
  const data = useRoute().params;
  const {t} = useLanguage();
  const {navigate, setOptions} = useNavigation();
  const [contact, setContact] = useState([]);
  const [typePayment, setTypePayment] = useState();
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [openContact, setOpenContact] = useState(false);
  const [check, setCheck] = useState(false);
  const [dataVoucher, setDataVoucher] = useState();
  const [balance, setBalance] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const {start, countdown} = useCountdown(10);

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('pay_booking_tour'),
    });
  }, []);

  const bookingTourMu = useMutation({
    mutationFn: postBookingTour,
  });
  const paypalMutation = useMutation({
    mutationFn: postPaypal,
  });
  useEffect(() => {
    const loadInfoBookingTour = async () => {
      const result = await EncryptedStorage.getItem('@infoBookingTour');
      setContact(JSON.parse(result));
    };
    loadInfoBookingTour();
  }, []);
  const arrTourTicketItem = useMemo(
    () =>
      data?.listAddTicket?.map(item => {
        return {id: item?.id, quantity: item?.quantity};
      }),
    [data?.listAddTicket],
  );
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
  const handleBookingTour = value => {
    if (!typePayment) {
      showMess(t('please_select_payment'), 'error');
      return;
    }
    setOpenContact(true);
    setTimeout(() => {
      // setOpenContact(false);
      bookingTourMu.mutate(
        {
          date: formatDate(data?.date?.selectedStartDate),
          tour_ticket_id: data?.data?.id,
          tour_ticket_items: arrTourTicketItem,
          time: data?.data?.time_options[0],
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
            // showMess(
            //   dataInside?.message,
            //   dataInside?.status ? 'success' : 'error',
            // );
            start();

            setTimeout(
              () => {
                if (dataInside?.status) {
                  setOpenContact(false);
                  // queryClient.invalidateQueries([
                  //   'accommodation',
                  //   'detail',
                  //   'list-room',
                  //   data?.idAccom,
                  // ]);
                  // queryClient.invalidateQueries(['user', 'profile']);
                  // if (dataInside?.data?.payment === 'PAYPAL') {
                  //   handlePaypal(dataInside?.data?.id);
                  //   return;
                  // }
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
        isTour
        data={data?.data}
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
            isTour
            data={data}
            priceVoucher={priceVoucher}
            onChangeTotalPrice={value => setTotalPrice(value)}
            dataPriceTicket={data?.dataPriceTicketEx}
          />

          <CustomButton
            text={t('pay')}
            onPress={handleBookingTour}
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
