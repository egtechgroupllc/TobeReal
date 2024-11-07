import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, CustomInput} from '../../../../components';
import {useLanguage} from '../../../../hooks/useLanguage';
import {requireField, validateMinLengthText} from '../../../../utils/validate';

export default function ConfirmChangePassword() {
  const {t} = useLanguage();
  const {control, handleSubmit, reset} = useForm();

  // const changePasswordMu = useMutation({
  //   mutationFn: postChangePassword,
  // });

  // const submitForgotPassword = data => {
  //   changePasswordMu.mutate(data, {
  //     onSuccess: dataInside => {
  //       showMess(
  //         t(dataInside?.message),
  //         dataInside?.status ? 'success' : 'error',
  //       );

  //       if (dataInside?.status) {
  //         reset();
  //       }
  //     },
  //   });
  // };

  return (
    <>
      <CustomInput
        sizeInput="medium"
        placeholder={t('code')}
        control={control}
        name="from"
        rules={[
          requireField(t('this_field_required')),
          validateMinLengthText(t('use_6_characters'), 6),
        ]}
      />
      <CustomInput
        sizeInput="medium"
        placeholder={t('code')}
        control={control}
        name="to"
        rules={[
          requireField(t('this_field_required')),
          validateMinLengthText(t('use_6_characters'), 6),
        ]}
      />

      <Button
        onPress={handleSubmit()}
        linearGradientProps
        buttonType="large"
        text={t('submit')}
      />
    </>
  );
}
