import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {CustomButton, CustomInput, CustomText} from '../../../../components';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField, validateEqualLength} from '../../../../utils/validate';
import {IconLogoPione} from '../../../../assets/icon/Icon';
import {
  postResendMail,
  postVerifyEmail,
} from '../../../../Model/api_new/user/auth';

export default function Content() {
  const {t} = useLanguage();
  const {params} = useRoute();
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const [cooldown, setCooldown] = useState(600);
  const timerRef = useRef(null);

  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [cooldown]);
  const VerifyEmailMutation = useMutation({
    mutationFn: postVerifyEmail,
  });
  const ResendMailMutation = useMutation({
    mutationFn: postResendMail,
  });
  const handleResendMail = async value => {
    if (cooldown > 0) {
      // đang trong cooldown, không gọi API
      return;
    }

    try {
      ResendMailMutation.mutate(
        {email: params?.email},
        {
          onSuccess: dataInde => {
            // console.log(dataInde,'onSuccess');
            if (dataInde?.status) {
              showMess(dataInde?.message, 'success');

              setCooldown(600);
            }
          },
          onError: error => {
            console.log(error);

            if (error.response) {
              showMess(error?.response?.data?.message, 'error');
            }
          },
        },
      );
    } catch (error) {
      console.error('Resend mail failed', error);
    }
  };

  const handleVerify = value => {
    VerifyEmailMutation.mutate(
      {email: params?.email, code: value?.code},
      {
        onSuccess: dataInde => {
          // console.log(dataInde,'onSuccess');
          if (dataInde?.status) {
            showMess(dataInde?.message, 'success');
            navigation.navigate('LoginScreen');
          } else {
            showMess(dataInde?.message, 'error');
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
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <IconLogoPione width={scale(100)} height={scale(100)} />
        </View>
        <CustomInput
          control={control}
          label={t('code')}
          name="code"
          sizeInput="medium"
          placeholder={t('enter_code')}
          rules={{
            ...requireField(t('this_field_required')),
            ...validateEqualLength(6, t('code_must_exactly', {unit: 6})),
          }}
        />
        {cooldown > 0 && (
          <CustomText
            textType="semiBold"
            style={{
              ...styles.text,
            }}>
            {t('resend_code_in', {unit: cooldown})} {t('second')}
          </CustomText>
        )}

        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(20),
          }}>
          <CustomButton
            // onPress={handleSubmit(handleSignup)}
            onPress={handleResendMail}
            disabled={cooldown > 0 || ResendMailMutation.isLoading}
            buttonType="large"
            text={t('resend_code')}
            style={{
              marginTop: scale(30),
              backgroundColor: cooldown > 0 ? COLORS.grey : COLORS.green,
              flex: 1,
            }}
          />
          <CustomButton
            onPress={handleSubmit(handleVerify)}
            buttonType="large"
            text={t('ok')}
            style={{marginTop: scale(30), flex: 1}}
          />
        </View>
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
});
