import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SIZES, images, scale} from '../../../../assets/constants';
import {
  IconUnViewablePassword,
  IconViewablePassword,
} from '../../../../assets/icon/Icon';
import {CustomButton, CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import {useAuthentication} from '../../../../hooks/useAuthentication';
import {requireField,validateEqualLength} from '../../../../utils/validate';
import {useLanguage} from '../../../../hooks/useLanguage';
import {useMutation, useQuery} from '@tanstack/react-query';
import { postLogin, postVerifyEmail } from '../../../../api/auth';
import { showMess } from '../../../../assets/constants/Helper';

export default function Content() {
  const {t} = useLanguage();
  const {onSaveToken} = useAuthentication();
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginMutation = useMutation({
    mutationFn:postVerifyEmail
  });
  // const {data,isLoading,isError} = useQuery({
  //   queryKey:['post'],
  //   queryFn: getPost()
  // })

  const handleVerify = value => {
    loginMutation.mutate(
     value
    , {
      onSuccess: dataInde => {
        // console.log(dataInde,'onSuccess');
        if(dataInde?.status){
          showMess(dataInde?.message, 'success');
            navigation.navigate('LoginScreen');
        }else{
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
  // const handleLogin = async (value) => {
  //   try {
  //     const response = await loginMution.mutate({ title: 'foo', body: 'bar', userId: 1 });
  //     console.log('Response:', response); // Make sure to log the actual response
  //     // onSaveToken(response);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
      <Image
              source={images.logo1}
              style={{
                width: '30%',
                height: scale(165),
                marginBottom: scale(30),
                alignSelf:'center'
              }}></Image>
        <CustomInput
          control={control}
          label={t('code')}
          name="code"
          sizeInput="medium"
          placeholder="CODE"
          rules={{
            ...requireField(t('this_field_required')),
            ...validateEqualLength(6,'Code must be exactly 6 digits long')
          }}
        />
       
        <CustomButton
          onPress={handleSubmit(handleVerify)}
          buttonType="large"
          text={t('ok')}
          linearGradientProps
          style={{marginTop:scale(30)}}
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
