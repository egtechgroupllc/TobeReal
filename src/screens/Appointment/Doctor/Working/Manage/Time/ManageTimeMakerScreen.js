import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import {scale} from '~/utils/scale';
import TypeExamination from '~/components/AppointmentHeader/components/TypeExamination';
import Status from '~/components/AppointmentHeader/components/Status';
import {useNavigation, useRoute} from '@react-navigation/native';
import TimeMarker from '../components/TimeMarker';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getDateWorkingDoctor,
  postCreateDateWorking,
  postUpdateDateWorking,
} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';
import {useForm} from 'react-hook-form';
import {requireField} from '~/utils/validate';
import Input from '~/components/Input';

export default function ManageTimeMakerScreen() {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const params = useRoute().params;

  const {control, handleSubmit} = useForm();
  const {t} = useLanguage();
  const {goBack} = useNavigation();
  const [timeMarker, setTimeMarker] = useState([]);
  const queryClient = useQueryClient();
  const createDateWorkingMutation = useMutation({
    mutationFn: postCreateDateWorking,
  });
  const updateDateWorkingMutation = useMutation({
    mutationFn: postUpdateDateWorking,
  });
  const handleCreateDate = value => {
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          goBack();
          queryClient.invalidateQueries({
            queryKey: [...getDateWorkingDoctor.queryKey],
          });
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    };
    if (params?.update) {
      updateDateWorkingMutation.mutate(
        {
          id: params?.id,
          data: {
            ...value,
            type: type,
            status: status,
            date: params?.date,
            time_start: timeMarker?.timeCheckStart,
            time_end: timeMarker?.timeCheckEnd,
          },
        },
        mutationConfig,
      );
      return;
    } else {
      createDateWorkingMutation.mutate(
        {
          ...value,
          type: type,
          status: status,
          date: params?.date,
          time_start: timeMarker?.timeCheckStart,
          time_end: timeMarker?.timeCheckEnd,
        },
        mutationConfig,
      );
    }
  };
  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      optionsHeader={{
        headerStyle: {
          paddingHorizontal: 0,
        },
        headerComponent: () => {
          return (
            <AppointmentHeader
              title={`${
                params?.update
                  ? `${t('update_time_marker')} \n ${params?.date}`
                  : `${t('create_time_marker')} \n ${params?.date}`
              }`}
              backIcon
              rightComponent
              rightIcon
              styleWrapper={{paddingVertical: 0}}
            />
          );
        },
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(15),
          paddingTop: scale(30),
        }}>
        <View
          style={{
            borderWidth: scale(1),
            borderColor: COLORS.input,
            rowGap: scale(30),
            paddingVertical: scale(30),
            paddingHorizontal: scale(10),
            borderRadius: scale(10),
          }}>
          <TimeMarker
            onChange={value => setTimeMarker(value)}
            params={params}
          />
          <TypeExamination
            styleTitle={{color: COLORS.White, fontSize: SIZES.medium}}
            styleName={{color: COLORS.White}}
            onChange={value => setType(value)}
            params={params}
          />
          <Status
            styleTitle={{color: COLORS.White, fontSize: SIZES.medium}}
            styleName={{color: COLORS.White}}
            onChange={value => setStatus(value)}
            params={params}
          />
        </View>
        {/* <Input
          multiline
          label={'Note'}
          control={control}
          name="note"
          styleTextLabel={{fontSize: SIZES.medium, textType: 'bold'}}
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          placeholder={'Enter note for this time marker'}
        /> */}
      </View>
      <View style={{flex: 1, paddingHorizontal: scale(20)}}>
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleSubmit(handleCreateDate)}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
