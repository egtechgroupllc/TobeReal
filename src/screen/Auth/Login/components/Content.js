import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {postLogin} from '../../../../api/auth';
import {SIZES, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {useLanguage} from '../../../../hooks/useLanguage';
import {
  requireField,
  validateMinLength,
  validateEmail,
} from '../../../../utils/validate';
import RNRestart from 'react-native-restart';

export default function Content() {
  const {t} = useLanguage();
  const {onSaveToken} = useAuthentication();
  const {control, handleSubmit} = useForm();

  const {navigate} = useNavigation();

  const loginMutation = useMutation({
    mutationFn: postLogin,
  });

  const gotoRegister = () => {
    navigate('RegisterScreen');
  };
  const gotoForgotPassword = () => {
    navigate('ForgotPasswordScreen');
  };

  const handleLogin = value => {
    loginMutation.mutate(value, {
      onSuccess: dataInside => {
        if (dataInside?.status) {
          onSaveToken(dataInside?.data?.token);

          showMess(dataInside?.message, 'success');
          navigate('HomeExploreScreen');

          setTimeout(() => {
            RNRestart.restart();
          }, 1000);
        } else {
          showMess(dataInside?.message, 'error');
        }
      },
      onError: err => {
        console.log(err);
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <CustomInput
          control={control}
          label={t('username_or_email')}
          name="email"
          sizeInput="medium"
          placeholder={t('enter_username_email')}
          rules={{
            ...requireField(t('this_field_required')),
            ...validateEmail(t('invalid_email')),
          }}
        />

        <CustomInput
          control={control}
          label={t('password')}
          name="password"
          rules={{
            ...requireField(t('this_field_required')),
            ...validateMinLength(t('use_6_characters'), 6),
          }}
          sizeInput="medium"
          placeholder={t('enter_password')}
          password
        />

        {loginMutation.isPending && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF8C00" />
          </View>
        )}

        <CustomText
          onPress={gotoForgotPassword}
          textType="semiBold"
          style={{...styles.text1, marginLeft: 'auto'}}>
          {t('forgot_password')}
        </CustomText>

        <CustomButton
          onPress={handleSubmit(handleLogin)}
          buttonType="large"
          text={t('login')}
          linearGradientProps
        />
      </View>

      <View style={styles.footer}>
        <CustomText textType="semiBold" style={{...styles.text}}>
          {t('dont_have_account')}
        </CustomText>

        <CustomText
          onPress={gotoRegister}
          textType="semiBold"
          style={{...styles.text1, marginLeft: scale(10)}}>
          {t('signup')}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(20),
    width: '100%',
  },
  content: {
    flex: 1,
    rowGap: scale(14),
  },
  text: {
    fontSize: SIZES.small,
  },
  text1: {
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
    marginTop: scale(10),
  },
  footer: {
    flexDirection: 'row',
    marginTop: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    marginTop: scale(50),
    alignSelf: 'center',
  },
});
