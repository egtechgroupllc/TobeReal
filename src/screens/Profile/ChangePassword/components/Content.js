import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {postChangePassword} from '~/api/auth';
import {COLORS, SIZES} from '~/assets/constants';
import {showMess} from '~/assets/constants/Helper';
import {Button} from '~/components';
import Input from '~/components/Input';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {
  confirmField,
  requireField,
  validateMinLengthText,
} from '~/utils/validate';
import {CText} from '~components';

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
        showMess(dataInside?.message, 'success');

        if (!dataInside?.error) {
          queryClient.invalidateQueries(['user', 'profile']);
          navigate('BottomTab');
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
      <Input
        label={t('old_password')}
        control={control}
        name="oldpassword"
        password
        placeholder={t('enter_password')}
        rules={validateMinLengthText(t('use_6_characters'), 6)}
        styleContent={{borderWidth: 0, backgroundColor: COLORS.input}}
        style={styles.textInput}
        sizeInput="medium"
        styleTextLabel={styles.styleLabel}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <Input
        label={t('new_password')}
        control={control}
        name="newpassword"
        password
        placeholder={t('enter_new_password')}
        rules={validateMinLengthText(t('use_6_characters'), 6)}
        styleContent={{borderWidth: 0, backgroundColor: COLORS.input}}
        style={styles.textInput}
        sizeInput="medium"
        styleTextLabel={styles.styleLabel}
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <Input
        label={t('new_password_confirm')}
        control={control}
        password
        name="retypepassword"
        placeholder={t('confirm_password')}
        styleContent={{borderWidth: 0, backgroundColor: COLORS.input}}
        rules={[
          requireField(t('this_field_required')),
          confirmField(t('password_not_match'), watch('newpassword')),
        ]}
        style={styles.textInput}
        styleTextLabel={styles.styleLabel}
        sizeInput="medium"
        styleText={{
          fontSize: SIZES.xMedium,
        }}
      />

      <Button
        title={t('ok')}
        onPress={handleSubmit(handleChangePass)}
        linearGradientProps={{colors: COLORS.linearButton}}
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
    marginTop: scale(50),
  },

  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    textType: 'medium',
  },
});
