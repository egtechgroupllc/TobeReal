import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {useLanguage} from '~/hooks/useLanguage';
import {Button, CustomInput} from '~components';
import {
  confirmField,
  requireField,
  validateEmail,
  validateMinLengthText,
} from '~/utils/validate';
import {scale} from '~/utils/scale';
import {COLORS, SIZES} from '~/assets/constants';
import {IconChevronLeft} from '@tabler/icons-react-native';
import {CText} from '~/components';
import Input from '~/components/Input';
import {IconArrowLeft} from '~/assets/icon/Icon';
import SelectCountry from '~/components/Country/SelectCountry';
import {showMess} from '~/assets/constants/Helper';
import {postRegister} from '~/api/auth';
import {useMutation} from '@tanstack/react-query';

export default function Content() {
  const {t} = useLanguage();
  const {control, watch, handleSubmit, reset, setValue} = useForm();
  const {goBack, navigate, setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('sign_up'),
    });
  }, []);
  const listSort = [
    {id: 'MALE', name: t('Male')},
    {id: 'FEMALE', name: t('Female')},
  ];
  const [checked, setChecked] = useState(listSort?.[0]?.id);

  const signupMutation = useMutation({
    mutationFn: postRegister,
  });

  const handleSignup = value => {
    delete value?.passwordConfirm;

    signupMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(t(dataInside?.message), 'success');

        if (!dataInside?.error) {
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
            marginTop: scale(-25),
            paddingBottom: scale(20),
          }}>
          <CText style={{fontSize: SIZES.xLarge, color: COLORS.White}}>
            {t('register_now')} !
          </CText>
        </View>
        <Input
          control={control}
          maxLength={30}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
          rules={[requireField(t('this_field_required'))]}
          name="fullname"
          placeholder={t('enter_fullname')}
        />
        <Input
          control={control}
          maxLength={30}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
          rules={[requireField(t('this_field_required'))]}
          name="username"
          placeholder={t('enter_username')}
        />
        <Input
          control={control}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          name="email"
          placeholder={t('enter_email')}
        />

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: scale(130),
            columnGap: scale(20),
          }}>
          <CText style={{color: COLORS.White}}>Gender:</CText>
          {listSort.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              activeOpacity={0.7}
              onPress={() => {
                setChecked(item?.id);
              }}>
              <View style={styles.radio}>
                {checked === item?.id ? <View style={styles.dot} /> : null}
              </View>
              <CText style={{color: COLORS.White}}>{item?.name}</CText>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* <Input
          // name={'phone'}
          placeholder={t('phone')}
          control={control}
          // rules={[requireField(t('this_field_required'))]}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
        /> */}

        <Input
          control={control}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
          rules={validateMinLengthText(t('use_6_characters'), 6)}
          name="password"
          placeholder={t('enter_password')}
          password
        />

        <Input
          control={control}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
          rules={[
            requireField(t('this_field_required')),
            confirmField(t('password_not_match'), watch('password')),
          ]}
          name="passwordConfirm"
          placeholder={t('enter_password_confirm')}
          password
        />
        {/* <SelectCountry setValue={setValue} control={control} /> */}

        <Input
          control={control}
          styleContent={{...styles.input, borderWidth: scale(0)}}
          sizeInput="large"
          name="refid"
          placeholder={t('enter_referral')}
        />
        <View
          style={{
            width: '70%',
            alignSelf: 'center',
          }}>
          <Button
            onPress={handleSubmit(handleSignup)}
            title={t('sign_up')}
            buttonType="large"
            style={{marginTop: scale(20)}}
            linearGradientProps={{
              colors: [COLORS.Blue, COLORS.cyan, COLORS.cyan],
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(20),
          justifyContent: 'center',
        }}>
        <CText
          textType="semiBold"
          style={{
            textDecorationLine: 'underline',
            color: COLORS.grey,
          }}>
          {t('already_have_account')}
        </CText>

        <CText
          onPress={() => navigate('LoginScreen')}
          textType="semiBold"
          style={{color: COLORS.green, marginLeft: scale(5)}}>
          {t('login').toUpperCase()}
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
    marginHorizontal: scale(15),
    rowGap: scale(15),
    marginTop: scale(30),
    paddingHorizontal: scale(20),
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
