import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
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

export default function ConfirmDepositScreen({route}) {
  const {setOptions, navigate} = useNavigation();
  const data = route.params;
  const {control, handleSubmit} = useForm();
  const {bottom} = useSafeAreaInsets();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'Xác minh thanh toán',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryClient = useQueryClient();
  const confirmDepositMu = useMutation({
    mutationFn: postConfirmDeposit,
  });

  const handleConfirmOrder = value => {
    const formData = new FormData();

    value?.files?.map(image => {
      formData.append('files', image);
    });
    formData.append('code', data?.code);

    confirmDepositMu.mutate(formData, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');
        if (dataInside?.status) {
          queryClient.invalidateQueries(['deposit', 'my-order']);
          navigate('FinancialScreen', {screen: 'HistoryTransaction'});
        }
      },
    });
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
        <CustomButton
          onPress={handleSubmit(handleConfirmOrder)}
          text="Vâng, tôi đã thanh toán "
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
