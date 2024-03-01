import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {postVerifyEmail} from '../../../../api/auth';
import {SIZES, images, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {CustomButton, CustomInput} from '../../../../components';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField, validateEqualLength} from '../../../../utils/validate';

export default function Content() {
  const {t} = useLanguage();

  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginMutation = useMutation({
    mutationFn: postVerifyEmail,
  });

  const handleVerify = value => {
    loginMutation.mutate(value, {
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
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Image
          source={images.logo1}
          style={{
            width: '30%',
            height: scale(165),
            marginBottom: scale(30),
            alignSelf: 'center',
          }}></Image>
        <CustomInput
          control={control}
          label={t('code')}
          name="code"
          sizeInput="medium"
          placeholder="CODE"
          rules={{
            ...requireField(t('this_field_required')),
            ...validateEqualLength(6, 'Code must be exactly 6 digits long'),
          }}
        />

        <CustomButton
          onPress={handleSubmit(handleVerify)}
          buttonType="large"
          text={t('ok')}
          linearGradientProps
          style={{marginTop: scale(30)}}
        />
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
