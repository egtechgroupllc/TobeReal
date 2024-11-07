import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../../components/Wrapper';
import {useMutation} from '@tanstack/react-query';
import VerificationCode from './VerificationCode';
import ConfirmChangePassword from './ConfirmChangePassword';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {IconArrowLeft, IconLogoTobeCare} from '~/assets/icon/Icon';
import {requireField, validateEmail} from '~/utils/validate';
import {COLORS, images, SIZES} from '~/assets/constants';
import {Button, CImage, CText} from '~/components';
import Input from '~/components/Input';
import {postForgotPassword} from '~/api/auth';
import {showMess} from '~/assets/constants/Helper';
export default function Content() {
  const {t} = useLanguage();
  const {control, handleSubmit, reset, watch} = useForm();
  const [phase, setPhase] = useState(1);
  const {navigate, goBack} = useNavigation();

  const forgotPasswordMu = useMutation({
    mutationFn: postForgotPassword,
  });
  const gotoLogin = () => {
    navigate('LoginScreen');
  };

  const submitForgotPassword = data => {
    forgotPasswordMu.mutate(data, {
      onSuccess: dataInside => {
        showMess(t(dataInside?.message), 'success');

        if (!dataInside?.error) {
          // reset();
          setPhase(2);
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
          }}>
          <CImage
            source={images.logoSplash}
            style={{height: scale(100), width: scale(120), alignSelf: 'center'}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            rowGap: scale(20),
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <CText
              style={{
                fontSize: SIZES.xLarge,
                color: COLORS.White,
              }}>
              {t('forgot_password')}
            </CText>
          </View>

          {phase === 1 && (
            <>
              <Input
                placeholder={t('email')}
                control={control}
                name="email"
                rules={[
                  requireField(t('this_field_required')),
                  validateEmail(t('invalid_email')),
                ]}
                styleContent={{...styles.input, borderWidth: scale(0)}}
                sizeInput="large"
              />
              <View
                style={{
                  width: '70%',
                  alignSelf: 'center',
                }}>
                <Button
                  onPress={handleSubmit(submitForgotPassword)}
                  title={t('submit')}
                  buttonType="large"
                  style={{marginTop: scale(20)}}
                  linearGradientProps={{
                    colors: [COLORS.Blue, COLORS.cyan, COLORS.cyan],
                  }}
                />
              </View>
            </>
          )}

          {phase === 2 && <VerificationCode email={watch('email')} />}
        </View>
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
    rowGap: scale(15),
    paddingHorizontal: scale(20),
    marginTop: scale(50),
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
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
  radio: {
    height: scale(10),
    aspectRatio: 1,
    borderRadius: 99,
    alignItems: 'center',
    backgroundColor: COLORS.White,
    justifyContent: 'center',
  },
  dot: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.green,
  },
});
