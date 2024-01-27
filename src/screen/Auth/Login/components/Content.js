import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

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
export default function Content() {
  const {onSaveToken} = useAuthentication();
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    // console.log(value);
    onSaveToken('Login');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <CustomInput
          control={control}
          label="Email"
          name="username"
          sizeInput="medium"
          placeholder="example@gmail.com"
          rules={requireField('This field is required')}
        />

        <CustomInput
          control={control}
          label="Password"
          name="password"
          rules={requireField('This field is required')}
          sizeInput="medium"
          secureTextEntry={passwordVisible}
          placeholder="Enter Your Password"
          onPressIconRight={toggleView}
          iconRight={
            passwordVisible ? IconUnViewablePassword : IconViewablePassword
          }
        />

        <CustomText
          onPress={gotoForgotPassword}
          textType="semiBold"
          style={{...styles.text1, marginLeft: 'auto'}}>
          Forgot Password?
        </CustomText>

        <CustomButton
          onPress={handleSubmit(handleLogin)}
          buttonType="large"
          text="Login"
          linearGradientProps
        />
      </View>

      <View style={styles.footer}>
        <CustomText textType="semiBold" style={{...styles.text}}>
          Don't have an account?
        </CustomText>

        <CustomText
          onPress={gotoRegister}
          textType="semiBold"
          style={{...styles.text1, marginLeft: scale(10)}}>
          Sign Up
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(50),
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
});
