import React, {useEffect, useLayoutEffect, useSyncExternalStore} from 'react';
import {useForm} from 'react-hook-form';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import RNRestart from 'react-native-restart';

import EncryptedStorage from 'react-native-encrypted-storage';
import {useLanguage} from '~/hooks/useLanguage';
import {useAuthentication} from '~/hooks/useAuthentication';
import {CText, CustomInput} from '~components';
import {
  requireField,
  validateEmail,
  validateMinLengthText,
} from '~/utils/validate';
import {scale} from '~/utils/scale';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {IconArrowLeft, IconGoBack, IconLogoTobeCare} from '~/assets/icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from '~/components';
import {IconChevronLeft} from '@tabler/icons-react-native';
import Input from '~/components/Input';
import {showMess} from '~/assets/constants/Helper';
import {postLogin} from '~/api/auth';

export default function Content() {
  const {t} = useLanguage();
  const {onSaveToken} = useAuthentication();
  const {control, handleSubmit} = useForm();
  const params = useRoute().params;
  const {navigate, setOptions, goBack} = useNavigation();

  const loginMutation = useMutation({
    mutationFn: postLogin,
  });
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('login'),
    });
  }, []);
  const gotoRegister = () => {
    navigate('RegisterScreen');
  };
  const gotoForgotPassword = () => {
    navigate('ForgotPasswordScreen');
  };

  const onSavedEmail = async data => {
    const result = await EncryptedStorage.getItem('@save_email');
    // const result = await EncryptedStorage.removeItem('@save_email');
    const arrsdf = result
      ? JSON.parse(result)?.filter(item => item.email !== data?.userData?.email)
      : [];

    await EncryptedStorage.setItem(
      '@save_email',
      JSON.stringify(
        result
          ? [
              {
                username: data?.userData?.username,
                email: data?.userData?.email,
              },
              ...arrsdf.slice(0, 5),
            ]
          : [
              {
                username: data?.userData?.username,
                email: data?.userData?.email,
              },
            ],
      ),
    );
  };
  const handleLogin = value => {
    loginMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          onSaveToken(dataInside?.data?.accessToken);
          onSavedEmail(dataInside?.data);

          // navigate('HomeExploreScreen');

          setTimeout(() => {
            RNRestart.restart();
          }, 500);
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    });
  };
  // useEffect(() => {
  //   handleLogin({
  //     email: 'choemodo@gmail.com',
  //     password: '123456',
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View
          style={{
            paddingTop: scale(10),
            alignItems: 'flex-start',
            zIndex: 1,
          }}>
          <Button.Icon
            Icon={IconArrowLeft}
            fill={COLORS.White}
            size={scale(25)}
            onPress={() => goBack()}
            styleItem={{
              paddingLeft: 0,
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: scale(-70),
          }}>
          <IconLogoTobeCare width={scale(160)} height={scale(160)} />
        </View>
        <View style={{rowGap: scale(20)}}>
          <Input
            control={control}
            name="usernameOrEmail"
            placeholder={t('enter_email_or_username')}
            rules={{
              ...requireField(t('this_field_required')),
            }}
            defaultValue={params?.email}
            styleContent={{...styles.input, borderWidth: scale(0)}}
            sizeInput="large"
          />
          <Input
            control={control}
            name="password"
            rules={{
              ...requireField(t('this_field_required')),
              ...validateMinLengthText(t('use_6_characters'), 6),
            }}
            placeholder={t('enter_password')}
            password
            styleContent={{...styles.input, borderWidth: scale(0)}}
            sizeInput="large"
          />
          <CText
            onPress={gotoForgotPassword}
            textType="semiBold"
            style={{...styles.text1, marginLeft: 'auto', color: COLORS.green}}>
            {t('forgot_password')}
          </CText>
        </View>
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
          }}>
          <Button
            onPress={handleSubmit(handleLogin)}
            title={t('sign_in')}
            buttonType="large"
            style={{marginTop: scale(50)}}
            linearGradientProps={{
              colors: [COLORS.Blue, COLORS.cyan, COLORS.cyan],
            }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <CText textType="semiBold" style={{color: COLORS.grey}}>
          {t('dont_have_account')}
        </CText>

        <CText
          onPress={gotoRegister}
          textType="semiBold"
          style={{color: COLORS.green, marginLeft: scale(10)}}>
          {t('signup')}
        </CText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginTop: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBG: {
    flex: 1,
    justifyContent: 'center',
  },
  borderHeader: {
    backgroundColor: COLORS.blue,
    height: scale(250),
    borderBottomLeftRadius: scale(30),
    borderBottomRightRadius: scale(30),
  },
  view: {
    backgroundColor: COLORS.input,
    borderRadius: scale(16),
    paddingBottom: scale(30),
    marginHorizontal: scale(20),
    marginTop: scale(50),
    paddingHorizontal: scale(15),
  },
  button: {
    borderRadius: scale(30),
    width: scale(210),
    justifyContent: 'center',
    backgroundColor: COLORS.GreenLight,
    height: scale(50),
    marginTop: scale(20),
    marginLeft: scale(45),
  },
  textField: {
    marginBottom: scale(30),
    width: '100%',
    height: scale(50),
    borderRadius: scale(5),
    // borderColor: COLORS.BLUEBORDER,
    // borderWidth: 2 * StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  viewLogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: scale(120),
  },
  txtForgotPW: {
    color: 'rgba(232, 2, 116, 1)',
    marginBottom: scale(10),
  },
  txtDontAccount: {
    color: COLORS.White,
  },
  txtSignup: {
    marginLeft: scale(5),
    color: 'rgba(232, 2, 116, 1)',
  },
  error: {
    color: 'red',
  },
  image: {
    width: scale(210),
    height: scale(100),
    marginBottom: scale(40),
  },
  imageBack: {
    width: scale(70),
    height: scale(70),
  },
  logo: {
    width: scale(40),
    height: scale(40),
    marginVertical: scale(10),
  },
  txtButtonREGISTER: {
    color: COLORS.White,
    marginTop: scale(2),
  },
  viewButtonRegister: {
    alignItems: 'center',
    height: scale(50),
    width: scale(203),
    borderRadius: scale(30),
    justifyContent: 'center',
    elevation: 10,
    shadowColor: 'rgba(232, 2, 116, 0.2)',
    alignSelf: 'center',
    marginTop: scale(-25),
  },
  input: {
    backgroundColor: COLORS.input,
    borderRadius: scale(5),
  },
});
