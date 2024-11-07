import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import Input from '~/components/Input';
import {requireField, validateEmail} from '~/utils/validate';
import {useForm} from 'react-hook-form';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import ChooseImgPicker from '~/components/ChoosePhoto/ChooseImgPicker';
import General from './components/General';
import ImgShop from './components/ImgShop';
import Address from './components/Address';

export default function ShopRegisterScreen() {
  const {control} = useForm();
  const {t} = useLanguage();
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={'Shop Register'}>
      <View style={{flex: 1, paddingHorizontal: scale(15), rowGap: scale(10)}}>
        <General />
        <Address />
        <ImgShop />
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          style={{marginTop: scale(20)}}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
