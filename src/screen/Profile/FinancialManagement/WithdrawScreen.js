import {useNavigation, useRoute} from '@react-navigation/native';
import {QueryClient, useMutation, useQuery} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  getListMethod,
  postConfirmWithdraw,
  postLogin,
} from '../../../Model/api/auth';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import {IconNext} from '../../../assets/icon/Icon';
import CustomText from '../../../components/CustomText';
import TopContent from './Withdraw/TopContent';
import {CustomButton, CustomInput} from '../../../components';
import BotContent from './Withdraw/BotContent';
import {showMess} from '../../../assets/constants/Helper';
import MainWrapper from '../../../components/MainWrapper';
import {useCountry} from '../../../hooks/useCountry';

export default function WithdrawScreen() {
  const {control, handleSubmit, setValue, watch} = useForm();
  const {navigate} = useNavigation();
  const withdrawMutation = useMutation({
    mutationFn: postConfirmWithdraw,
  });
  const {currency} = useCountry();
  useEffect(() => {
    setValue('currency_id', currency?.id);
  }, []);

  const handleWidraw = value => {
    if (!value?.bank_name) {
      showMess('Please choose bank!', 'error');
    }
    withdrawMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');
        if (dataInside?.status) {
          //   QueryClient.invalidateQueries(['withdraw', 'my-order']);
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
          text="Confirm"
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
