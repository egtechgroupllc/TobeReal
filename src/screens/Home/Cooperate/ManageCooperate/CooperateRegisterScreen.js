import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import Input from '~/components/Input';
import {useForm} from 'react-hook-form';
import {useLanguage} from '~/hooks/useLanguage';
import {requireField, validateEmail} from '~/utils/validate';
import {scale} from '~/utils/scale';
import SelectCountry from '~/components/Country/SelectCountry';
import {IconHome} from '~/assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {getListContactCooperate, postContactRegister} from '~/api/common';
import {showMess} from '~/assets/constants/Helper';

export default function CooperateRegisterScreen() {
  const {control, watch, handleSubmit, reset, setValue} = useForm();
  const {t} = useLanguage();
  const {navigate, goBack} = useNavigation();
  const registerContactMutation = useMutation({
    mutationFn: postContactRegister,
  });
  const queryClient = useQueryClient();
  const handleRegisterContact = value => {
    registerContactMutation.mutate(value, {
      onSuccess: dataInside => {
        if (!dataInside?.error) {
          showMess(
            t(dataInside?.message),
            dataInside?.error ? 'error' : 'success',
          );
          queryClient.invalidateQueries([...getListContactCooperate.queryKey]);

          goBack();
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    });
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      styleContent={{paddingTop: 0}}
      optionsHeader={{
        headerStyle: {
          paddingBottom: 0,
        },
        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconHome}
              onPress={() => {
                navigate('BottomTab');
              }}
            />
          );
        },
      }}
      headerTitle={t('cooperate_register')}>
      <View style={styles.container}>
        <Input
          label={t('full_name')}
          control={control}
          name="name"
          placeholder={t('enter_fullname')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />

        <Input
          label={t('phone')}
          control={control}
          name="phone"
          placeholder={t('enter_phone')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          keyboardType="numeric"
        />
        <Input
          label={t('email')}
          control={control}
          sizeInput="medium"
          style={styles.textInput}
          styleTextLabel={styles.styleLabel}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          rules={[
            requireField(t('this_field_required')),
            validateEmail(t('invalid_email')),
          ]}
          name="email"
          placeholder={t('enter_email')}
        />
        <Input
          label={t('medical_facility_name')}
          control={control}
          sizeInput="medium"
          style={styles.textInput}
          styleTextLabel={styles.styleLabel}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          rules={[requireField(t('this_field_required'))]}
          name="medical_facility_name"
          placeholder={t('enter_medical_facility_name')}
        />
        <SelectCountry setValue={setValue} control={control} />

        <Input
          label={t('address')}
          control={control}
          name="address"
          placeholder={t('enter_address')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <Input
          label={t('content')}
          control={control}
          name="content"
          multiline
          rules={[requireField(t('this_field_required'))]}
          style={styles.textInput}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <Button
          title={t('ok')}
          onPress={handleSubmit(handleRegisterContact)}
          linearGradientProps={{colors: COLORS.linearButton}}
          buttonType="medium"
          style={styles.button}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    rowGap: scale(10),
    marginTop: '5%',
    paddingHorizontal: scale(15),
  },
  button: {
    width: '100%',
    marginTop: scale(10),
  },

  textInput: {
    backgroundColor: COLORS.greyLight,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
});
