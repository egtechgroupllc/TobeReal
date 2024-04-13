import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import MainWrapper from '../../../components/MainWrapper';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import {CustomInput} from '../../../components';
import {formatPrice} from '../../../utils/format';
import CustomText from '../../../components/CustomText';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getListMethod} from '../../../Model/api/auth';
import ItemMethodDeposit from './components/ItemMethodDeposit';
import ListMethodBank from './components/ListMethodBank';
import FooterDeposit from './components/FooterDeposit';
import ListPriceSelect from './components/ListPriceSelect';
import {useForm} from 'react-hook-form';

export default function DepositScreen({router}) {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: 'Nạp tiền vào tài khoản',
    });
  }, []);

  const {control, handleSubmit, setValue, watch} = useForm();

  return (
    <>
      <MainWrapper
        noImgColor
        backgroundColor="#eee"
        styleContent={{
          paddingHorizontal: scale(10),
          paddingVertical: scale(20),
        }}>
        <ListPriceSelect control={control} setValue={setValue} />

        <ListMethodBank setValue={setValue} />
      </MainWrapper>
      <FooterDeposit handleSubmit={handleSubmit} watch={watch} />
    </>
  );
}

const styles = StyleSheet.create({});
