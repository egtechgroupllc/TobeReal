import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import AppointmentHeader from '~/components/AppointmentHeader/AppointmentHeader';
import Input from '~/components/Input';
import {scale} from '~/utils/scale';
import {IconHome} from '~/assets/icon/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {
  getExaminationPrice,
  postCreatePriceExamination,
  postUpdatePriceExamination,
} from '~/api/doctor';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';
import {useForm} from 'react-hook-form';
import {requireField} from '~/utils/validate';

export default function AddPriceExamScreen() {
  const {navigate, reset} = useNavigation();
  const params = useRoute().params;
  const [dataSpecialty, setDataSpecialty] = useState();

  const queryClient = useQueryClient();
  const createPriceExaminationMutation = useMutation({
    mutationFn: postCreatePriceExamination,
  });
  const updatePriceExaminationMutation = useMutation({
    mutationFn: postUpdatePriceExamination,
  });
  const {handleSubmit, control} = useForm();
  const {t} = useLanguage();

  const handleCreatePriceExamination = value => {
    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          if (params?.update) {
            navigate('ManagePriceExamScreen');
            queryClient.invalidateQueries([...getExaminationPrice.queryKey]);
          } else {
            reset({
              index: 0,
              routes: [
                {name: 'AddServicePriceScreen', params: dataInside?.data},
              ],
            });
            queryClient.invalidateQueries([...getExaminationPrice.queryKey]);
          }
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    };
    if (params?.update) {
      updatePriceExaminationMutation.mutate(
        {data: value, id: params?.id},
        mutationConfig,
      );
      return;
    } else {
      createPriceExaminationMutation.mutate(
        {
          ...value,
          specialty_id: dataSpecialty,
        },
        mutationConfig,
      );
    }
  };

  return (
    <MainWrapper
      sourceImage={images.backgroundHome}
      headerTitle={
        params?.update
          ? t('update_price_examination')
          : t('create_new_price_examination')
      }
      scrollEnabled={false}
      optionsHeader={{
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
              onPress={() => navigate('BottomTab')}
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
        <CText
          style={{color: COLORS.White, fontSize: SIZES.medium}}
          textType="semiBold">
          {t('medical_specialty')}
        </CText>
        <Button
          title={
            dataSpecialty
              ? `${t('selected')} 1 ${t('specialty')}`
              : t('choose_specialty')
          }
          backgroundColor={dataSpecialty ? COLORS.bluecyan : COLORS.input}
          sizeButton="normal"
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'ListSpecialtyScreen',
              params: {
                onGoBack: value => {
                  setDataSpecialty(value);
                },
                dataSpecialty,
                isSelectOne: true,
              },
            });
          }}
        />
        <Input
          label={t('name_of_examination_price')}
          control={control}
          name="name"
          defaultValue={params?.name}
          styleTextLabel={{
            color: COLORS.White,
            fontSize: SIZES.medium,
            textType: 'semiBold',
          }}
          placeholder={t('enter_the_name_of_examination_price')}
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          rules={[requireField(t('this_field_required'))]}
        />
        <Input
          label={t('description')}
          control={control}
          name="description"
          defaultValue={params?.description}
          styleTextLabel={{
            color: COLORS.White,
            fontSize: SIZES.medium,
            textType: 'semiBold',
          }}
          placeholder={t('enter_the_description_of_examination_price')}
          multiline
          styleContent={{
            backgroundColor: COLORS.input,
            borderWidth: 0,
          }}
          rules={[requireField(t('this_field_required'))]}
        />
        <CText
          style={{color: COLORS.White, fontSize: SIZES.medium}}
          textType="semiBold">
          {t('price_examination')}
        </CText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: scale(20),
          }}>
          <Input
            styleWrapper={{flex: 1}}
            defaultValue={params?.price}
            control={control}
            name="price"
            styleContent={{
              backgroundColor: COLORS.input,
              borderWidth: 0,
            }}
            enableFormatNum
            rules={[requireField(t('this_field_required'))]}
          />
          {/* <Input
            placeholder="Enter max price"
            styleWrapper={{flex: 1}}
            styleContent={{
              backgroundColor: COLORS.input,
              borderWidth: 0,
            }}
          /> */}
        </View>
        {/* <CText style={{color: COLORS.whiteSemi}}>
          *Note: If the price type has only one value, just enter the minimum
          price
        </CText> */}
        <Button
          title={'confirm'}
          linearGradientProps={{colors: COLORS.linearButton}}
          style={{marginTop: scale(30)}}
          onPress={handleSubmit(handleCreatePriceExamination)}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
