import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {postConfirmWithdraw} from '../../../Model/api/auth';
import {scale} from '../../../assets/constants';
import {showMess} from '../../../assets/constants/Helper';
import {CustomButton} from '../../../components';
import MainWrapper from '../../../components/MainWrapper';
import {useCountry} from '../../../hooks/useCountry';
import {useLanguage} from '../../../hooks/useLanguage';
import BotContent from './Withdraw/BotContent';
import TopContent from './Withdraw/TopContent';

export default function WithdrawScreen() {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const {navigate, setOptions} = useNavigation();

  const {control, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      currency_id: currency?.id,
    },
  });

  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: postConfirmWithdraw,
  });

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('withdraw'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWidraw = value => {
    if (!value?.bank_name) {
      showMess('Please choose bank!', 'error');
    }
    withdrawMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );
        if (dataInside?.status) {
          queryClient.invalidateQueries(['withdraw', 'my-order']);
          navigate('FinancialScreen', {
            screen: 'HistoryTransaction',
            params: {withdraw: true},
          });
        }
      },
    });
  };
  return (
    <MainWrapper
      noImgColor
      backgroundColor="#eee"
      styleContent={{
        paddingHorizontal: scale(10),
        paddingVertical: scale(20),
        rowGap: scale(20),
      }}>
      <View style={styles.box}>
        <TopContent control={control} />
        <BotContent control={control} setValue={setValue} />
        <CustomButton
          text={t('confirm')}
          disabled={withdrawMutation.isPending}
          style={{marginTop: scale(20)}}
          onPress={handleSubmit(handleWidraw)}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: scale(10),
    rowGap: scale(10),
  },
});
