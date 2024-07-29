import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {postChangePassword} from '../../../../Model/api/auth';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {CustomButton, CustomInput, CustomText} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';
import {
  confirmField,
  requireField,
  validateMinLengthText,
} from '../../../../utils/validate';
export default function Content() {
  const {t} = useLanguage();
  const {control, handleSubmit, watch} = useForm();
  const {setOptions, navigate} = useNavigation();
  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_password'),
    });
  }, []);
  const {goBack, reset} = useNavigation();

  const changPassMutation = useMutation({
    mutationFn: postChangePassword,
  });

  const handleChangePass = value => {
    delete value?.passwordConfirm;

    changPassMutation.mutate(value, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');

        if (dataInside?.status) {
          queryClient.invalidateQueries(['user', 'profile']);
          navigate('BottomTab');
          reset();
        }
      },
      onError: err => console.log(err),
    });
  };

  return (
    <View style={styles.container}>
      <CustomText textType="bold" size={SIZES.large}>
        {t('change_password')}
      </CustomText>
      <CustomInput
        label={t('old_password')}
        control={control}
        name="from"
        password
        placeholder={t('enter_password')}
        rules={validateMinLengthText(t('use_6_characters'), 6)}
        style={styles.textInput}
        sizeInput="medium"
        styleTextLabel={styles.styleLabel}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <CustomInput
        label={t('new_password')}
        control={control}
        name="to"
        password
        placeholder={t('enter_new_password')}
        rules={validateMinLengthText(t('use_6_characters'), 6)}
        style={styles.textInput}
        sizeInput="medium"
        styleTextLabel={styles.styleLabel}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <CustomInput
        label={t('confirm_password')}
        control={control}
        password
        name="passwordConfirm"
        placeholder={t('confirm_password')}
        rules={[
          requireField(t('this_field_required')),
          confirmField(t('password_not_match'), watch('to')),
        ]}
        style={styles.textInput}
        styleTextLabel={styles.styleLabel}
        sizeInput="medium"
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <CustomButton
        text={t('ok')}
        onPress={handleSubmit(handleChangePass)}
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
    marginTop: '20%',
    paddingHorizontal: scale(12),
  },
  button: {
    width: '100%',
    marginTop: scale(50),
  },

  textInput: {
    backgroundColor: COLORS.grey50,
    borderWidth: 0,
  },
  styleLabel: {
    textType: 'medium',
  },
});
