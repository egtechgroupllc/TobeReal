import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../components';
import {useLanguage} from '../../hooks/useLanguage';
import {IconLogoPione} from '../../assets/icon/Icon';
import {COLORS, scale} from '../../assets/constants';
import {useForm} from 'react-hook-form';
import {requireField} from '../../utils/validate';

export default function DeleteAccountScreen() {
  const {t} = useLanguage();
  const {control, handleSubmit} = useForm();
  return (
    <MainWrapper headerTitle={t('delete_account')} scrollEnabled={false}>
      <View
        style={{
          alignItems: 'center',
          marginTop: '40%',
          paddingHorizontal: scale(20),
          rowGap: scale(20),
        }}>
        <IconLogoPione width={scale(100)} height={scale(100)} />
        <CustomInput
          control={control}
          style={{
            backgroundColor: COLORS.grey50,
            borderRadius: scale(10),
            borderWidth: 0,
          }}
          name="password"
          sizeInput="medium"
          placeholder={t('enter_password')}
          rules={{
            ...requireField(t('this_field_required')),
          }}
        />
        <CustomButton
          //   onPress={handleSubmit(submitForgotPassword)}
          // linearGradientProps
          styleWrapper={{width: '70%', marginTop: scale(250)}}
          buttonType="large"
          text={t('confirm')}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
