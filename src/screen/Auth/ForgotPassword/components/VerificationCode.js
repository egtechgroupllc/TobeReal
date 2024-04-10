import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton, CustomInput} from '../../../../components';
import {useMutation} from '@tanstack/react-query';
import {showMess} from '../../../../assets/constants/Helper';
import {postResetPassword} from '../../../../Model/api/auth';
import {useForm} from 'react-hook-form';
import {requireField, validateEqualLength} from '../../../../utils/validate';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';

export default function VerificationCode({email}) {
  const {t} = useLanguage();
  const {goBack} = useNavigation();
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
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            reset();
            goBack();
          }
        },
      },
    );
  };

  return (
    <>
      <CustomInput
        sizeInput="medium"
        placeholder={t('code')}
        control={control}
        name="code"
        rules={[
          requireField(t('this_field_required')),
          validateEqualLength(t('invalid_email'), 6),
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

const styles = StyleSheet.create({});
