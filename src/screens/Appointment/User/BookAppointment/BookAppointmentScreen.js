import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images} from '~/assets/constants';
import {scale} from '~/utils/scale';
import BookInfo from './components/BookInfo';
import {useNavigation, useRoute} from '@react-navigation/native';
import BookInput from './components/BookInput';
import Payment from './components/Payment';
import Note from './components/Note';
import {IconHome} from '~/assets/icon/Icon';
import {useLanguage} from '~/hooks/useLanguage';
import {useMutation} from '@tanstack/react-query';
import {postCreateBooking} from '~/api/appointment';
import {showMess} from '~/assets/constants/Helper';
import {useForm} from 'react-hook-form';
import ModalSuccess from '~/components/ModalSuccess';

export default function BookAppointmentScreen() {
  const params = useRoute().params;
  const {handleSubmit, setValue, watch, control, reset} = useForm();
  const {t} = useLanguage();
  const {navigate, reset: resetNavigation} = useNavigation();
  const [typePayment, setTypePayment] = useState();
  const [dataVoucher, setDataVoucher] = useState();
  const [balance, setBalance] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [openContact, setOpenContact] = useState(false);

  const createBookingMutation = useMutation({
    mutationFn: postCreateBooking,
  });

  const handleCreateBooking = value => {
    createBookingMutation.mutate(
      {
        ...value,
        working_price_id: params?.examination_price?.[0]?.id,
        working_time_id: params?.workingDoctor?.[0]?.id,
        date: params?.date,
        type: typePayment,
        doctor_id: params?.doctor_id,
        voucher_id: dataVoucher ? dataVoucher?.map(item => item?.id) : null,
      },

      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          if (!dataInside?.error) {
            setOpenContact(true);
            resetNavigation({
              index: 0,
              routes: [{name: 'ScheduleAppointmentScreen'}],
            });
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };

  const priceVoucher = useMemo(() => {
    if (dataVoucher && typePayment === 'VOUCHER') {
      const countDis = dataVoucher?.reduce((acc, item) => {
        return acc + item?.remaining_discount_price;
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
    return false;
  }, [priceVoucher, totalPrice, balance, typePayment]);
  const handleAlert = () => {
    if (typePayment === 'FIAT') {
      Alert.alert(t('notification'), t('do_you_want_create_wallet'), [
        {
          text: t('create_wallet'),
          onPress: () =>
            navigate('NoBottomTab', {screen: 'AddressWalletScreen'}),
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('no_still_pay'),
          onPress: () => handleSubmit(handleCreateBooking)(),
        },
      ]);
      return;
    } else {
      handleSubmit(handleCreateBooking)();
    }
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      styleContent={{padding: scale(20)}}
      optionsHeader={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigate('BottomTab')}>
            <IconHome style={{width: scale(20)}} />
          </TouchableOpacity>
        ),
      }}
      headerTitle={t('book_appointment')}>
      <View style={styles.contain}>
        <BookInfo data={params} />
        <View style={styles.line} />

        <BookInput
          setValue={setValue}
          control={control}
          reset={reset}
          watch={watch}
        />
        <Payment
          data={params}
          onChange={value => setTypePayment(value?.type)}
          typePayment={typePayment}
          onCheckVoucher={value => {
            setDataVoucher(value);
          }}
          dataVoucher={dataVoucher}
          priceVoucher={priceVoucher}
          onPriceExamination={value => {
            setTotalPrice(value);
          }}
        />
        <Note />
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
          }}>
          <Button
            // onPress={handleSubmit(handleCreateBooking)}
            onPress={handleAlert}
            // onPress={() => setOpenContact(true)}
            title={t('confirm')}
            buttonType="large"
            disabled={checkBalance}
            style={{
              marginTop: scale(20),
            }}
            linearGradientProps={{
              colors: !checkBalance
                ? [COLORS.Blue, COLORS.cyan, COLORS.cyan]
                : [COLORS.grey, COLORS.grey, COLORS.grey],
            }}
          />
        </View>
        <ModalSuccess
          openContact={openContact}
          onPress={() => setOpenContact(false)}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    rowGap: scale(10),
  },
  line: {
    height: scale(0.5),
    width: 'auto',
    backgroundColor: COLORS.White + '60',
  },
});
