import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton, CustomInput} from '../../../../components';
import {useMutation} from '@tanstack/react-query';
import {showMess} from '../../../../assets/constants/Helper';
import {useForm} from 'react-hook-form';
import {
  requireField,
  validateEmail,
  validateEqualLength,
} from '../../../../utils/validate';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';
import {postResetPassword} from '../../../../Model/api_new/user/auth';

export default function VerificationCode({email}) {
  const {t} = useLanguage();
  const {goBack, reset: resetNavigation} = useNavigation();
  const {control, handleSubmit, reset} = useForm();

  const forgotPasswordMu = useMutation({
    mutationFn: postResetPassword,
  });
  const submitForgotPassword = data => {
    forgotPasswordMu.mutate(
      {email: email, ...data},
      {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            reset();
            resetNavigation({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          }
        },
        onError: err => {
          showMess(
            err.response?.data?.message || t('an_error_occured'),
            'error',
          );
        },
      },
    );
  };

  return (
    <>
      <CustomInput
        sizeInput="medium"
        placeholder={t('enter_new_password')}
        control={control}
        label={t('new_password')}
        name="password"
        password
        rules={[requireField(t('this_field_required'))]}
      />
      <CustomInput
        sizeInput="medium"
        placeholder={t('enter_code')}
        control={control}
        label={t('code')}
        name="code"
        rules={[requireField(t('this_field_required'))]}
      />

      <CustomButton
        onPress={handleSubmit(submitForgotPassword)}
        // linearGradientProps
        buttonType="large"
        text={t('submit')}
      />
    </>
  );
}

const styles = StyleSheet.create({});
