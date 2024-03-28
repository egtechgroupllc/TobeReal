import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {postChangePassword} from '../../../../Model/api/auth';
import {scale} from '../../../../assets/constants';
import {showMess} from '../../../../assets/constants/Helper';
import {CustomButton, CustomInput} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';
import {
  confirmField,
  requireField,
  validateMinLengthText,
} from '../../../../utils/validate';
export default function Content() {
  const {t} = useLanguage();
  const {control, handleSubmit, watch} = useForm();
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
          goBack();
          reset();
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label={t('old_password')}
        control={control}
        name="from"
        placeholder={t('enter_password')}
        rules={validateMinLengthText(t('use_6_characters'), 6)}
        style={styles.textInput}
      />

      <CustomInput
        label={t('new_password')}
        control={control}
        name="to"
        placeholder={t('enter_new_password')}
        rules={validateMinLengthText(t('use_6_characters'), 6)}
        style={styles.textInput}
      />

      <CustomInput
        label={t('confirm_password')}
        control={control}
        name="passwordConfirm"
        placeholder={t('confirm_password')}
        rules={[
          requireField(t('this_field_required')),
          confirmField(t('password_not_match'), watch('to')),
        ]}
        style={styles.textInput}
      />

      <CustomButton
        linearGradientProps
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
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    rowGap: scale(14),
    marginTop: '20%',
  },
  button: {
    width: '80%',
    marginTop: scale(50),
  },

  textInput: {
    backgroundColor: '#f1f1f2',
    borderRadius: scale(8),
    borderColor: '#1618230f',
  },
});
