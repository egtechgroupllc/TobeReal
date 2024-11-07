import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';

import {useNavigation} from '@react-navigation/native';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';
import {useLanguage} from '~/hooks/useLanguage';
import {postResetPassword} from '~/api/auth';
import {showMess} from '~/assets/constants/Helper';
import {requireField, validateEmail} from '~/utils/validate';
import {Button} from '~/components';

export default function VerificationCode({email}) {
  const {t} = useLanguage();
  const {goBack} = useNavigation();
  const {control, handleSubmit, reset} = useForm();

  const resetPasswordMu = useMutation({
    mutationFn: postResetPassword,
  });
  const submitResetPassword = data => {
    resetPasswordMu.mutate(
      {...data},
      {
        onSuccess: dataInside => {
          showMess(t(dataInside?.message), 'success');

          if (!dataInside?.error) {
            reset();
            goBack();
          }
        },
        onError: error => {
          if (error.response) {
            showMess(error?.response?.data?.message, 'error');
          }
        },
      },
    );
  };

  return (
    <>
      <Input
        sizeInput="large"
        placeholder={t('code')}
        control={control}
        name="code"
        styleContent={{...styles.input, borderWidth: scale(0)}}
        rules={[requireField(t('this_field_required'))]}
      />
      <Input
        sizeInput="large"
        placeholder={t('new_password')}
        control={control}
        name="password"
        password
        styleContent={{...styles.input, borderWidth: scale(0)}}
        rules={[requireField(t('this_field_required'))]}
      />
      <Input
        sizeInput="large"
        placeholder={t('new_password_confirm')}
        control={control}
        name="cpassword"
        password
        styleContent={{...styles.input, borderWidth: scale(0)}}
        rules={[requireField(t('this_field_required'))]}
      />
      <View
        style={{
          width: '70%',
          alignSelf: 'center',
        }}>
        <Button
          onPress={handleSubmit(submitResetPassword)}
          title={t('submit')}
          buttonType="large"
          style={{marginTop: scale(20)}}
          linearGradientProps={{
            colors: [COLORS.Blue, COLORS.cyan, COLORS.cyan],
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.input,
    borderRadius: scale(5),
    alignSelf: 'center',
  },
});
