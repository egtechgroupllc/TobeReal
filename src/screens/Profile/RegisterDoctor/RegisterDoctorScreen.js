import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {useForm} from 'react-hook-form';
import {requireField} from '~/utils/validate';
import {useLanguage} from '~/hooks/useLanguage';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import BottomSheet from '~/components/BottomSheet';
import {useNavigation, useRoute} from '@react-navigation/native';
import GeneralInformation from './components/GeneralInformation';
import Service from './components/Service';
import Experience from './components/Experience';
import Award from './components/Award';
import Instruction from './components/Instruction';
import ImageCertificate from './components/ImageCertificate';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postRegisterDoctor, postUpdateDoctor} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';
import {getProfile} from '~/api/user';
import {useAuthentication} from '~/hooks/useAuthentication';

export default function RegisterDoctorScreen() {
  const [workPlace, setWorkPlace] = useState();
  const {control, watch, handleSubmit, reset, setValue, errors} = useForm();
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const params = useRoute().params;
  const {token} = useAuthentication();
  const queryClient = useQueryClient();
  const [experiences, setExperiences] = useState('');
  const [awards, setAwards] = useState('');
  const [instructions, setInstructions] = useState('');

  const onGoBack = value => {
    if (value?.params?.experiences) {
      setExperiences(value?.editorContent);
    } else if (value?.params?.awards) {
      setAwards(value?.editorContent);
    } else if (value?.params?.instructions) {
      setInstructions(value?.editorContent);
    }
  };
  const registerDoctorMutation = useMutation({
    mutationFn: postRegisterDoctor,
  });
  const updateDoctorMutation = useMutation({
    mutationFn: postUpdateDoctor,
  });
  useEffect(() => {
    setValue('experiences', experiences);
    setValue('awards', awards);
    setValue('instructions', instructions);
  }, [experiences, awards, instructions]);
  const handleRegisterDoctor = value => {
    const image = value?.images;
    delete value?.service;
    delete value?.image;
    delete value?.images;
    if (!value?.array_specialty_id || value?.array_specialty_id?.length <= 0) {
      showMess(t('you_have_not_select_specialty'), 'error');
      return;
    }
    if (!value?.medical_facility_id) {
      showMess(t('you_have_not_select_facility'), 'error');
      return;
    }
    if (!value?.experiences) {
      showMess(t('please_enter_your_examination_experience'), 'error');
      return;
    }

    value?.medical_facility_id === 'other' && delete value?.medical_facility_id;

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );

        if (!dataInside?.error) {
          queryClient.invalidateQueries([...getProfile.queryKey]);
          navigate('BottomTab');
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    };
    if (params?.update) {
      updateDoctorMutation.mutate(
        {
          ...value,
        },
        mutationConfig,
      );
      return;
    } else {
      registerDoctorMutation.mutate(
        {
          ...value,
          image,
        },
        mutationConfig,
      );
    }
  };
  const dataPro = queryClient.getQueryData(['user', 'get-list-profile'])?.data;

  useEffect(() => {
    if (dataPro?.role === 3) {
      reset();

      const entries = Object.entries(dataPro);
      const arrKeyno = [
        'images',
        'image',
        'active',
        'array_specialty_id',
        'awards',
        'gender',
        'birthday',
        'medical_facility_id',
        'created_at',
        'id',
        'username',
        'status',
        'status_doctor',
        'role',
        'userid',
        'type',
        'mfa',
        'email',
        'experiences',
      ];

      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPro]);

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      styleContent={{marginTop: scale(20)}}
      headerTitle={
        params?.update
          ? t('update_doctor_account')
          : t('register_doctor_account')
      }>
      <View style={styles.contain}>
        <GeneralInformation
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          onSelect={value => {
            setWorkPlace(value);
          }}
        />

        {/* <Service
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={service}
          onGoBack={onGoBack}
        /> */}
        <Experience
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={experiences}
          onGoBack={onGoBack}
        />
        <Award
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={awards}
          onGoBack={onGoBack}
        />
        <Instruction
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={instructions}
          onGoBack={onGoBack}
        />
        {!params?.update && (
          <ImageCertificate
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
            arrImg={params?.images}
          />
        )}
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleSubmit(handleRegisterDoctor)}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingHorizontal: scale(20),
    rowGap: scale(20),
    paddingBottom: scale(50),
  },
  textInput: {
    backgroundColor: COLORS.grey,
    borderWidth: 0,
  },
  styleLabel: {
    fontSize: SIZES.xMedium,
  },
});
