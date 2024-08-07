import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {postConfirmDeposit} from '../../../Model/api/auth';
import {COLORS, SHADOW, scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {CustomButton} from '../../../components';
import MainWrapper from '../../../components/MainWrapper';
import ImgConfirmDeposit from './components/ConfirmDeposit/ImgConfirmDeposit';
import InfoBank from './components/ConfirmDeposit/InfoBank';
import SyntaxDeposit from './components/ConfirmDeposit/SyntaxDeposit';
import {useLanguage} from '../../../hooks/useLanguage';
import ModalBookingSuccess from '../../Bookings/components/BookingRoom/ContentStep2/ModalBookingSuccess';
import {useCountdown} from '../../../hooks/useCountdown';

export default function ConfirmDepositScreen({route}) {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  const data = route.params;
  const {control, handleSubmit} = useForm();
  const {bottom} = useSafeAreaInsets();
  const [openContact, setOpenContact] = useState(false);

  const [check, setCheck] = useState(false);
  const {start, countdown} = useCountdown(5);
  const isPending = useRef(false);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('payment_verification'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();
  const confirmDepositMu = useMutation({
    mutationFn: postConfirmDeposit,
  });

  const handleConfirmOrder = value => {
    setOpenContact(true);
    const formData = new FormData();

    value?.files?.map(image => {
      formData.append('files', image);
    });
    formData.append('code', data?.code);
    setTimeout(() => {
      confirmDepositMu.mutate(formData, {
        onSuccess: dataInside => {
          isPending.current = true;
          setCheck({
            status: dataInside?.status,
            mess: dataInside?.message,
          });
          start();
          setTimeout(
            () => {
              setOpenContact(false);

              if (dataInside?.status) {
                queryClient.invalidateQueries(['deposit', 'my-order']);
                navigate('FinancialScreen', {screen: 'HistoryTransaction'});
              }
            },
            dataInside?.status === false ? 3000 : 5000,
          );
        },
      });
    }, 2000);
  };

  return (
    <>
      <MainWrapper noImgColor styleContent={styles.content}>
        <InfoBank data={data} />
        <SyntaxDeposit data={data} />
        <ImgConfirmDeposit control={control} />
      </MainWrapper>
      <View
        style={{
          paddingBottom: bottom + scale(10),
          ...styles.footer,
        }}>
        <ModalBookingSuccess
          openContact={openContact}
          isPending={isPending}
          check={check}
          countdown={countdown}
        />
        <CustomButton
          onPress={handleSubmit(handleConfirmOrder)}
          text={t('confirm_paid')}
          style={{
            width: '70%',
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(20),
    backgroundColor: '#fff',
    rowGap: scale(20),
  },
  footer: {
    paddingTop: scale(10),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});
