import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {postConfirmWithdraw} from '../../../Model/api/auth';
import {showMess} from '../../../assets/constants/Helper';
import BotContent from './Withdraw/BotContent';
import TopContent from './Withdraw/TopContent';
import {Button, MainWrapper} from '~/components';
import {scale} from '~/utils/scale';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, images} from '~/assets/constants';
import {colors} from '@styles';
import {postCreateWithdraw} from '~/api/withdraw';

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
    mutationFn: postCreateWithdraw,
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
          !dataInside?.error ? 'success' : 'error',
        );
        if (!dataInside?.error) {
          queryClient.invalidateQueries(['withdraw', 'my-order']);
          navigate('FinancialScreen', {
            screen: 'HistoryTransaction',
            params: {withdraw: true},
          });
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    });
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      backgroundColor={COLORS.primary}
      scrollEnabled={false}
      styleContent={{
        paddingHorizontal: scale(10),
        paddingVertical: scale(20),
        rowGap: scale(20),
      }}>
      <View style={styles.box}>
        <TopContent control={control} />
        <BotContent control={control} setValue={setValue} />
        <Button
          linearGradientProps={{colors: COLORS.linearButton}}
          title={t('confirm')}
          // disabled={withdrawMutation.isPending}
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
