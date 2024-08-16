import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React, {useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {postSignUp} from '../../../../Model/api/auth';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {
  confirmField,
  requireField,
  validateEmail,
  validateMinLengthText,
  validateUserName,
} from '../../../../utils/validate';
import InputPhone from '../../../components/InputPhone';

export default function Content() {
  const {t} = useLanguage();
  const {control, watch, handleSubmit, reset} = useForm();
  const {goBack, navigate, setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('signup'),
    });
  }, []);
  const signupMutation = useMutation({
    mutationFn: postSignUp,
  });

  const handleSignup = value => {
    delete value?.passwordConfirm;

    signupMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );

        if (dataInside?.status) {
          navigate('LoginScreen');

          reset();
        }
      },

      onError: error => {
        if (error.response) {
          showMess(error?.response?.data?.message, 'error');
        }
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <CustomInput
          control={control}
          maxLength={30}
          sizeInput="medium"
          rules={[requireField(t('this_field_required'))]}
          name="username"
          placeholder={t('enter_username')}
        />

        <CustomInput
          control={control}
          sizeInput="medium"
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          name="email"
          placeholder={t('enter_email')}
        />
        <InputPhone
          name={'phone'}
          placeholder={t('phone')}
          control={control}
          rules={[requireField(t('this_field_required'))]}
          style={{height: scale(45)}}
        />
        <CustomInput
          control={control}
          sizeInput="medium"
          rules={validateMinLengthText(t('use_6_characters'), 6)}
          name="password"
          placeholder={t('enter_password')}
          password
        />

        <CustomInput
          control={control}
          sizeInput="medium"
          rules={[
            requireField(t('this_field_required')),
            confirmField(t('password_not_match'), watch('password')),
          ]}
          name="passwordConfirm"
          placeholder={t('enter_password_confirm')}
          password
        />

        <CustomInput
          control={control}
          sizeInput="medium"
          // name="refid"
          placeholder={t('enter_referral')}
        />

        <CustomButton
          onPress={handleSubmit(handleSignup)}
          buttonType="large"
          text={t('signup')}
          linearGradientProps
          style={{
            marginTop: scale(20),
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
            justifyContent: 'center',
          }}>
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text,
              textDecorationLine: 'underline',
            }}>
            {t('already_have_account')}
          </CustomText>

          <CustomText
            onPress={() => navigate('LoginScreen')}
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(5)}}>
            {t('login')}
          </CustomText>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText
            onPress={() => navigate('RegisterPartnerScreen')}
            textType="semiBold"
            style={{...styles.text2, color: COLORS.primary}}>
            {t('become_shome_partner')}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
    rowGap: scale(16),
  },
  wrapper: {
    marginTop: scale(20),
    width: '100%',
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
    fontSize: SIZES.small,
    color: '#F0B90B',
  },
  text2: {
    fontSize: SIZES.medium,
  },
  button: {
    alignItems: 'center',
    borderRadius: scale(5),
    height: scale(48),
    justifyContent: 'center',
    marginTop: scale(20),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});
