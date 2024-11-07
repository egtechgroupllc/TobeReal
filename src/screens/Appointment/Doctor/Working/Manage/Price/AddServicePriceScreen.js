import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {Button, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {IconHome} from '~/assets/icon/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from '~/utils/scale';
import Input from '~/components/Input';
import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';
import {
  getExaminationPrice,
  postCreateServicePrice,
  postUpdateServicePrice,
} from '~/api/doctor';
import {useLanguage} from '~/hooks/useLanguage';
import {requireField} from '~/utils/validate';

export default function AddServicePriceScreen() {
  const {navigate, goBack, addListener, setOptions, reset} = useNavigation();
  const {control, handleSubmit} = useForm();
  const params = useRoute().params;

  const queryClient = useQueryClient();
  const {t} = useLanguage();
  const createServicePriceMutation = useMutation({
    mutationFn: postCreateServicePrice,
  });
  const updateServicePriceMutation = useMutation({
    mutationFn: postUpdateServicePrice,
  });
  const handleCreatePriceExamination = value => {
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          reset({
            index: 0,
            routes: [{name: 'ManagePriceExamScreen'}],
          });
          queryClient.invalidateQueries([...getExaminationPrice.queryKey]);
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    };

    if (params?.update) {
      updateServicePriceMutation.mutate(
        {data: {...value, parent_id: params?.parent_id}, id: params?.id},
        mutationConfig,
      );
      return;
    } else {
      createServicePriceMutation.mutate(
        {...value, parent_id: params?.parent_id || params?.id},
        mutationConfig,
      );
    }
  };

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      scrollEnabled={false}
      headerTitle={
        params?.update ? t('update_service_price') : t('add_service_price')
      }
      optionsHeader={{
        headerLeft: () => {},
        headerTitleStyle: {
          textAlign: 'left',
        },
        headerStyle: {
          paddingBottom: 0,
        },

        headerRight: () => {
          return (
            <Button.Icon
              Icon={IconHome}
              color={COLORS.White}
              onPress={() => navigate('AppointmentDoctor')}
            />
          );
        },
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(20),
          rowGap: scale(20),
          paddingTop: scale(30),
        }}>
        <Input
          label={t('name_of_service_price')}
          control={control}
          name="name"
          defaultValue={params?.name}
          styleTextLabel={{
            color: COLORS.White,
            fontSize: SIZES.medium,
            textType: 'semiBold',
          }}
          placeholder={t('enter_the_name_of_service_price')}
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          rules={[requireField(t('this_field_required'))]}
        />
        <Input
          label={t('description')}
          control={control}
          defaultValue={params?.description}
          name="description"
          styleTextLabel={{
            color: COLORS.White,
            fontSize: SIZES.medium,
            textType: 'semiBold',
          }}
          placeholder={t('enter_the_description_of_service_price')}
          multiline
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          rules={[requireField(t('this_field_required'))]}
        />
        <Input
          label={t('service_price')}
          placeholder={t('enter_service_price')}
          control={control}
          name="price"
          defaultValue={params?.price}
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          rules={[requireField(t('this_field_required'))]}
          enableFormatNum
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: scale(20),
            marginTop: scale(30),
          }}>
          <Button
            title={t('skip')}
            backgroundColor={COLORS.grey}
            style={{flex: 1}}
            onPress={() => navigate('AppointmentDoctor')}
          />
          <Button
            title={t('confirm')}
            linearGradientProps={{colors: COLORS.linearButton}}
            style={{flex: 1}}
            onPress={handleSubmit(handleCreatePriceExamination)}
          />
        </View>
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
