import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import {postConfirmDeposit} from '../../../Model/api/auth';
import {showMess} from '../../../assets/constants/Helper';
import ImgConfirmDeposit from './components/ConfirmDeposit/ImgConfirmDeposit';
import InfoBank from './components/ConfirmDeposit/InfoBank';
import SyntaxDeposit from './components/ConfirmDeposit/SyntaxDeposit';
import {useLanguage} from '~/hooks/useLanguage';
import {useCountdown} from '~/hooks/useCountdown';
import {Button, MainWrapper} from '~/components';
import ModalBookingSuccess from '~/screens/Products/PaymentProduct/components/ContentStep2/ModalBookingSuccess';
import {scale} from '~/utils/scale';
import {COLORS, images, SHADOW} from '~/assets/constants';
import {
  getDepositHistory,
  postCreateDeposit,
  postInitOrderDeposit,
} from '~/api/deposit';
import PhotoProof from './components/ConfirmDeposit/PhotoProof';

export default function ConfirmDepositScreen({route}) {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();

  const data = route.params;
  const {control, handleSubmit, watch, setValue, errors} = useForm();
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
  const createDepositMu = useMutation({
    mutationFn: postCreateDeposit,
  });

  const handleConfirmOrder = value => {
    const img = value?.imgs;

    delete value?.img;
    delete value?.imgs;
    // setOpenContact(true);
    // const formData = new FormData();

    // value?.files?.map(image => {
    //   formData.append('files', image);
    // });
    // formData.append('code', data?.code);
    createDepositMu.mutate(
      {code: data?.code, img},
      {
        onSuccess: dataInside => {
          showMess(t(dataInside?.message), 'success');
          if (!dataInside?.error) {
            queryClient.invalidateQueries([...getDepositHistory.queryKey]);
            navigate('FinancialScreen', {screen: 'HistoryTransaction'});
          }
          // isPending.current = true;
          // setCheck({
          //   error: dataInside?.error,
          //   mess: t(dataInside?.message),
          // });
          // start();
          // setTimeout(
          //   () => {
          //     setOpenContact(false);
          //     if (!dataInside?.error) {
          //       // queryClient.invalidateQueries(['deposit', 'my-order']);
          //       // navigate('FinancialScreen', {screen: 'HistoryTransaction'});
          //     }
          //   },
          //   dataInside?.error ? 3000 : 5000,
          // );
        },
        onError: err => {
          console.log(err);
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
    // setTimeout(() => {

    // }, 2000);
  };

  return (
    <>
      <MainWrapper
        scrollEnabled={false}
        sourceImage={images.backgroundHome}
        styleContent={{
          paddingHorizontal: scale(10),
          paddingVertical: scale(20),
          rowGap: scale(10),
        }}>
        <InfoBank data={data} />
        <SyntaxDeposit data={data} />
        <PhotoProof
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
        <Button
          onPress={handleSubmit(handleConfirmOrder)}
          linearGradientProps={{colors: COLORS.linearButton}}
          title={t('confirm_paid')}
          style={{paddingTop: scale(10)}}
        />
      </MainWrapper>

      {/* <ModalBookingSuccess
        openContact={openContact}
        isPending={isPending}
        check={check}
        countdown={countdown}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(20),
    backgroundColor: COLORS.input,
    rowGap: scale(20),
  },
  footer: {
    paddingTop: scale(10),
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});
