import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SIZES, scale} from '../../../../assets/constants';
import {
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {requireField} from '../../../../utils/validate';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {postLogin} from '../../../../api/auth';
import {showMess} from '../../../../assets/constants/Helper';

export default function Content() {
  const {t} = useLanguage();
  const {onSaveToken} = useAuthentication();
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginMutation = useMutation({
    mutationFn: postLogin,
  });

  const toggleView = () => {
    setPasswordVisible(!passwordVisible);
  };
  const gotoRegister = () => {
    navigation.navigate('RegisterScreen');
  };
  const gotoForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };
  const handleLogin = value => {
    setLoading(true);
    loginMutation.mutate(value, {
      onSuccess: dataInde => {
        if (dataInde?.status == true) {
          onSaveToken(dataInde?.data?.accessToken);
          setTimeout(() => {
            showMess(dataInde?.message, 'success');
            navigation.navigate('HomeExploreScreen');
          }, 2000);
        } else {
          showMess(dataInde?.message, 'error');
        }
        setLoading(false);
      },
      onError: errr => {
        console.log(errr);
        setLoading(false);
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <CustomInput
          control={control}
          label={t('username_or_email')}
          name="usernameOrEmail"
          sizeInput="medium"
          placeholder={t('enter_username_email')}
          rules={requireField(t('this_field_required'))}
        />

        <CustomInput
          control={control}
          label={t('password')}
          name="password"
          rules={requireField(t('this_field_required'))}
          sizeInput="medium"
          secureTextEntry={passwordVisible}
          placeholder={t('enter_password')}
          onPressIconRight={toggleView}
          iconRight={
            passwordVisible ? IconUnViewablePassword : IconViewablePassword
          }
        />
      {!loading && (
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
    position:'absolute',
    marginTop:scale(50),
    alignSelf:'center'
  },
});
