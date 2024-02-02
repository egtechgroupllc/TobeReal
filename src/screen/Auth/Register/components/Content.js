import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../assets/constants';
import {
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {
  confirmField,
  requireField,
  validateEmail,
  validateEqualLength,
} from '../../../../utils/validate';
import { useLanguage } from '../../../../hooks/useLanguage';

export default function Content() {
  const {t}= useLanguage()
  const {control, watch, handleSubmit} = useForm();
  const {goBack} = useNavigation();

  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordConfirm, setViewPasswordConfirm] = useState(false);

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const toggleViewPasswordConfirm = () => {
    setViewPasswordConfirm(!viewPasswordConfirm);
  };

  const navigation = useNavigation();
  const handleSignup = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <CustomInput
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField(t('this_field_required')),
        }}
        name="username"
        placeholder={t('enter_username')}
      />
      <CustomInput
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField(t('this_field_required')),
          ...validateEmail(
            t('invalid_email'),
          ),
        }}
        name="email"
        placeholder={t('enter_email')}
      />
      {/* <CustomInput
        placeholder="Enter Your Phone Number"
      /> */}
      <CustomInput
        secureTextEntry={!viewPassword}
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField(t('this_field_required')),
          ...validateEqualLength(
            6,
            t('use_6_characters'),
          ),
        }}
        name="password"
        placeholder={t('enter_password')}
        onPressIconRight={toggleViewPassword}
        iconRight={
          !viewPassword ? IconUnViewablePassword : IconViewablePassword
        }
      />
      <CustomInput
        secureTextEntry={!viewPasswordConfirm}
        control={control}
        sizeInput="medium"
        rules={{
          ...requireField(t('this_field_required')),
          ...confirmField(
            watch('password'),
            t('password_not_match'),
          ),
        }}
        name="passwordConfirm"
        placeholder={t('enter_password_confirm')}
        onPressIconRight={toggleViewPasswordConfirm}
        iconRight={
          !viewPasswordConfirm ? IconUnViewablePassword : IconViewablePassword
        }
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
          onPress={goBack}
          textType="semiBold"
          style={{...styles.text1, marginLeft: scale(5)}}>
          {t('login')}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(50),
    rowGap: scale(16),
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
