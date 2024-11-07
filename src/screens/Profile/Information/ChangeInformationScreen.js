import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, images, SIZES} from '~/assets/constants';
import {Button, CText, MainWrapper} from '~/components';
import SelectCountry from '~/components/Country/SelectCountry';
import Input from '~/components/Input';
import {useAuthentication} from '~/hooks/useAuthentication';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import {requireField} from '~/utils/validate';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '~/utils/format';
import {postUpdateProfile} from '~/api/user';
import {showMess} from '~/assets/constants/Helper';
import ChooseImgPicker from '~/components/ChoosePhoto/ChooseImgPicker';
import General from './components/General';
import AvatarImage from './components/AvatarImage';

export default function ChangeInformationScreen() {
  const {setOptions, navigate} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const dataPro = queryClient.getQueryData(['user', 'get-list-profile']);

  const {control, watch, handleSubmit, reset, setValue, errors} = useForm();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_information'),
    });
  }, []);

  const updateProfileMutation = useMutation({
    mutationFn: postUpdateProfile,
  });

  const handleUpdateProfile = value => {
    const file = value?.file;
    delete value?.files;
    delete value?.file;
    updateProfileMutation.mutate(
      {...value, file},
      {
        onSuccess: dataInside => {
          if (!dataInside?.error) {
            showMess(t(dataInside?.message), 'success');

            queryClient.invalidateQueries(['user', 'get-list-profile']);
            navigate('BottomTab');
          }
        },
        onError: err => {
          if (err.response) {
            showMess(err?.response?.data?.message, 'error');
          }
        },
      },
    );
  };

  useEffect(() => {
    if (dataPro?.data?.address) {
      reset();

      const entries = Object.entries(dataPro?.data);
      const arrKeyno = [
        'active',
        'array_specialty_id',
        'created_at',
        'id',
        'image',
        'mfa',
        'medical_facility_id',
        'medical_facility_name',
        'role',
        'status',
        'status_doctor',
        'type',
        'userid',
        'username',
        'email',
        'description',
        'awards',
        'experiences',
        'instructions',
      ];
      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }
  }, [dataPro]);

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      styleContent={{paddingTop: 0}}>
      <View style={styles.container}>
        <General
          setValue={setValue}
          control={control}
          watch={watch}
          data={dataPro?.data}
        />
        <AvatarImage
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        <Button
          title={t('ok')}
          onPress={handleSubmit(handleUpdateProfile)}
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
    rowGap: scale(14),
    marginTop: '5%',
    paddingHorizontal: scale(20),
    paddingBottom: scale(100),
  },
  button: {
    width: '100%',
    marginTop: scale(30),
  },
  input: {
    height: scale(30),
    backgroundColor: COLORS.input,
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: scale(10),
  },
  textInput: {
    backgroundColor: COLORS.grey50,
    borderWidth: 0,
  },
  styleLabel: {
    textType: 'medium',
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
