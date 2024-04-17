import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SIZES, images, scale} from '../../../../assets/constants';
import {CustomButton, CustomInput} from '../../../../components';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField, validateEmail} from '../../../../utils/validate';
import Wrapper from '../../components/Wrapper';
import {useMutation} from '@tanstack/react-query';
import {postForgotPassword} from '../../../../Model/api/auth';
import {showMess} from '../../../../assets/constants/Helper';
import VerificationCode from './VerificationCode';
import ConfirmChangePassword from './ConfirmChangePassword';
export default function Content() {
  const {t} = useLanguage();
  const {control, handleSubmit, reset, watch} = useForm();
  const [phase, setPhase] = useState(1);
  const {navigate} = useNavigation();

  const forgotPasswordMu = useMutation({
    mutationFn: postForgotPassword,
  });
  const gotoLogin = () => {
    navigate('LoginScreen');
  };

  const submitForgotPassword = data => {
    forgotPasswordMu.mutate(data, {
      onSuccess: dataInside => {
        console.log(dataInside);
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');

        if (dataInside?.status) {
          // reset();
          setPhase(2);
        }
      },
    });
  };

  //   try {
  //     const response = await fetch(
  //       'https://your-api-endpoint.com/api/v1/user/auth/confirm-forgot-password',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           email: data.email,
  //           code: data.code,
  //           password: data.password,
  //         }),
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error('Login failed');
  //     } else {
  //       setPhase(2);
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     Alert.alert('Wrong email', 'Invalid email. Please try again.');
  //   }
  // };
  return (
    <View style={styles.container}>
      <View
        style={{
          rowGap: scale(20),
        }}>
        <View
          style={{
            alignItems: 'center',
            rowGap: scale(30),
          }}>
          <CustomImage
            source={images.logo1}
            style={{
              width: '35%',
              height: scale(109),
            }}
          />
          <Wrapper
            Heading1={t('forgot_password')}
            styleWrapper={{marginBottom: scale(10)}}
          />
        </View>

        {phase === 1 && (
          <>
            <CustomInput
              sizeInput="medium"
              placeholder={t('email')}
              control={control}
              name="email"
              rules={[
                requireField(t('this_field_required')),
                validateEmail(t('invalid_email')),
              ]}
            />

            <CustomButton
              onPress={handleSubmit(submitForgotPassword)}
              linearGradientProps
              buttonType="large"
              text={t('submit')}
            />
          </>
        )}

        {phase === 2 && <VerificationCode email={watch('email')} />}
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          justifyContent: 'center',
        }}>
        <CustomText textType="semiBold" style={styles.text}>
          {t('already_have_account')}
        </CustomText>
        <TouchableOpacity onPress={gotoLogin}>
          <CustomText
            textType="semiBold"
            style={{...styles.text1, marginLeft: scale(5)}}>
            {t('login')}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontSize: SIZES.small,
    textDecorationLine: 'underline',
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
    marginTop: scale(10),
  },
  line: {
    height: scale(1),
    backgroundColor: 'black',
  },
});
