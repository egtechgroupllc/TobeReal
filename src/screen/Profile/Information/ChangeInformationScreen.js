import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {showMess} from '../../../assets/constants/Helper';
import {postEditProfile} from '../../../Model/api/auth';
import {COLORS, SIZES, scale} from '../../../assets/constants';
import {requireField, validateMinLengthText} from '../../../utils/validate';
import {CustomButton, CustomInput, CustomText} from '../../../components';
import {useForm} from 'react-hook-form';
import {formatNumber} from '../../../utils/format';
import {useAuthentication} from '../../../hooks/useAuthentication';

export default function ChangeInformationScreen() {
  const {setOptions, navigate, reset} = useNavigation();
  const {t} = useLanguage();
  const {control, handleSubmit, watch} = useForm();
  const queryClient = useQueryClient();
  const {token} = useAuthentication();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_information'),
    });
  }, []);
  const editProfileMutation = useMutation({
    mutationFn: postEditProfile,
  });

  const handleEditProfile = value => {
    editProfileMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );

        if (dataInside?.status) {
          queryClient.invalidateQueries(['user', 'profile']);
          navigate('BottomTab');
        }
      },
      onError: err => console.log(err),
    });
  };
  return (
    <View style={styles.container}>
      <CustomInput
        label={t('user_name')}
        control={control}
        name="username"
        placeholder={t('enter_username')}
        rules={[requireField(t('this_field_required'))]}
        style={styles.textInput}
        sizeInput="medium"
        styleTextLabel={styles.styleLabel}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <CustomInput
        label={t('phone')}
        control={control}
        name="phone"
        placeholder={t('enter_phone')}
        rules={[requireField(t('this_field_required'))]}
        style={styles.textInput}
        sizeInput="medium"
        styleTextLabel={styles.styleLabel}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
        keyboardType="numeric"
      />

      <CustomButton
        text={t('ok')}
        onPress={handleSubmit(handleEditProfile)}
        buttonType="medium"
        style={styles.button}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    rowGap: scale(14),
    marginTop: '10%',
    paddingHorizontal: scale(12),
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },

  textInput: {
    backgroundColor: COLORS.grey50,
    borderWidth: 0,
  },
  styleLabel: {
    textType: 'medium',
  },
});
