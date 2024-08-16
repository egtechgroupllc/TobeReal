import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {postChangePassword} from '../../../../Model/api/auth';
import {requireField, validateMinLengthText} from '../../../../utils/validate';
import {CustomButton, CustomInput} from '../../../../components';
import {showMess} from '../../../../assets/constants/Helper';

export default function ConfirmChangePassword() {
  const {t} = useLanguage();
  const {control, handleSubmit, reset} = useForm();

  const changePasswordMu = useMutation({
    mutationFn: postChangePassword,
  });

  const submitForgotPassword = data => {
    changePasswordMu.mutate(data, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );

        if (dataInside?.status) {
          reset();
        }
      },
    });
  };

  return (
    <>
      <CustomInput
        sizeInput="medium"
        placeholder={t('code')}
        control={control}
        name="from"
        rules={[
          requireField(t('this_field_required')),
          validateMinLengthText(t('use_6_characters'), 6),
        ]}
      />
      <CustomInput
        sizeInput="medium"
        placeholder={t('code')}
        control={control}
        name="to"
        rules={[
          requireField(t('this_field_required')),
          validateMinLengthText(t('use_6_characters'), 6),
        ]}
      />

      <CustomButton
        onPress={handleSubmit(submitForgotPassword)}
        linearGradientProps
        buttonType="large"
        text={t('submit')}
      />
    </>
  );
}
