import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import {requireField} from '~/utils/validate';
import {useLanguage} from '~/hooks/useLanguage';
import {useForm} from 'react-hook-form';
import General from './components/General';
import WorkingTime from './components/WorkingTime';
import Service from './components/Service';
import Infrastructure from './components/Infrastructure';
import ChoosePhoto from '~/components/ChoosePhoto/ChoosePhoto';
import {IconHome} from '~/assets/icon/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {showMess} from '~/assets/constants/Helper';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getListMedicalFacilityUser,
  postCreateMedicalFacility,
  postUpdateMedicalFacility,
} from '~/api/common';

export default function CreateMedicalFacilityScreen() {
  const {t} = useLanguage();
  const {navigate, goBack} = useNavigation();
  const {control, watch, handleSubmit, reset, setValue, errors} = useForm();
  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const params = useRoute().params;

  const queryClient = useQueryClient();
  const [infrastructure, setInfrastructure] = useState('');
  const onGoBack = value => {
    if (value?.params?.service) {
      setService(value?.editorContent);
    } else if (value?.params?.infrastructure) {
      setInfrastructure(value?.editorContent);
    } else if (value?.params?.description) {
      setDescription(value?.editorContent);
    }
  };
  useEffect(() => {
    setValue('description', description);
    setValue('services', service);
    setValue('infrastructure', infrastructure);
  }, [infrastructure, service, description]);
  const createMedicalFacilityMutation = useMutation({
    mutationFn: postCreateMedicalFacility,
  });
  const updateMedicalFacilityMutation = useMutation({
    mutationFn: postUpdateMedicalFacility,
  });
  const handleCreateMedicalFacility = value => {
    const files = value?.files;
    delete value?.file;
    delete value?.files;
    params?.update && delete value?.files;

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );

        if (!dataInside?.error) {
          queryClient.invalidateQueries([
            ...getListMedicalFacilityUser.queryKey,
          ]);
          goBack();
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    };
    if (params?.update) {
      updateMedicalFacilityMutation.mutate(
        {
          data: {
            ...value,
            working_plan: [value?.working_plan],
          },
          id: params?.id,
        },
        mutationConfig,
      );
      return;
    } else {
      createMedicalFacilityMutation.mutate(
        {
          ...value,
          files,
          working_plan: [value?.working_plan],
        },
        mutationConfig,
      );
    }
  };
  useEffect(() => {
    if (params?.update) {
      reset();

      const entries = Object.entries(params);
      const arrKeyno = [
        'working_plan',
        'array_specialty_id',
        'created_at',
        'detail_medical_facility',
        'status',
        'update',
        'userid',
        'files',
        'id',
        'active',
      ];

      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={
        params?.update
          ? t('update_medical_facility')
          : t('create_medical_facility')
      }
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
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(15),
          rowGap: scale(10),
          paddingBottom: scale(80),
        }}>
        <General
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={description}
          onGoBack={onGoBack}
        />
        <WorkingTime setValue={setValue} />
        <Service
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={service}
          onGoBack={onGoBack}
        />
        <Infrastructure
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          data={infrastructure}
          onGoBack={onGoBack}
        />
        {!params?.update && (
          <ChoosePhoto
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
            arrImg={params?.images}
          />
        )}

        <View style={{marginTop: scale(20)}}>
          <Button
            onPress={handleSubmit(handleCreateMedicalFacility)}
            title={t('create')}
            linearGradientProps={{colors: COLORS.linearButton}}
          />
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
