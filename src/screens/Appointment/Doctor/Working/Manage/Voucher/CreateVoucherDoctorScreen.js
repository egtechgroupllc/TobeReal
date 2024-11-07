import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, CText, MainWrapper} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
import {COLORS, images, SIZES} from '~/assets/constants';
import Input from '~/components/Input';
import {useForm} from 'react-hook-form';
import {requireField} from '~/utils/validate';
import {scale} from '~/utils/scale';
import ImageVoucher from './components/ImageVoucher';
import {formatDate} from '~/utils/format';
import DatePicker from 'react-native-date-picker';
import {
  getDetailVoucherDoctor,
  getListVoucherDoctor,
  postCreateVoucherDoctor,
  postUpdateVoucherDoctor,
} from '~/api/voucher';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {showMess} from '~/assets/constants/Helper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useCountry} from '~/hooks/useCountry';

export default function CreateVoucherDoctorScreen() {
  const {t} = useLanguage();
  const {control, setValue, watch, errors, handleSubmit, reset} = useForm();
  const {currency} = useCountry();
  const {goBack} = useNavigation();
  const params = useRoute().params;
  const queryClient = useQueryClient();
  const [openCheckStart, setOpenCheckStart] = useState(false);
  const [timeCheckStart, setTimeCheckStart] = useState(
    params?.date_start
      ? new Date(`${params?.date_start}T06:00:00`)
      : new Date(),
  );
  const [openCheckEnd, setOpenCheckEnd] = useState(false);
  const [timeCheckEnd, setTimeCheckEnd] = useState(() => {
    const endDate = params?.date_end
      ? new Date(`${params?.date_end}T06:00:00`)
      : new Date(new Date().setDate(new Date().getDate() + 1));
    return endDate;
  });

  useEffect(() => {
    setValue('date_start', formatDate(timeCheckStart));
    setValue('date_end', formatDate(timeCheckEnd));
  }, [timeCheckStart, timeCheckEnd]);

  const createVoucherDoctorMutation = useMutation({
    mutationFn: postCreateVoucherDoctor,
  });
  const updateVoucherDoctorMutation = useMutation({
    mutationFn: postUpdateVoucherDoctor,
  });
  const handleCreateVoucherDoctor = value => {
    const image = value?.images;
    delete value?.image;
    delete value?.images;

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.error ? 'error' : 'success',
        );
        if (!dataInside?.error) {
          queryClient.invalidateQueries([...getListVoucherDoctor.queryKey]);
          goBack();
        }
      },
      onError: err => {
        if (err.response) {
          showMess(err?.response?.data?.message, 'error');
        }
      },
    };
    if (params?.id) {
      updateVoucherDoctorMutation.mutate(
        {
          data: {
            ...value,
            currency_id: currency?.id,
          },
          id: params?.id,
        },
        mutationConfig,
      );
      return;
    } else {
      createVoucherDoctorMutation.mutate(
        {
          ...value,
          image,
          currency_id: currency?.id,
        },
        mutationConfig,
      );
    }
  };
  const {data, isLoading} = useQuery({
    queryKey: [...getDetailVoucherDoctor.queryKey, {id: params?.id}],
    queryFn: () => getDetailVoucherDoctor({id: params?.id}),
  });
  useEffect(() => {
    if (data?.data) {
      reset();

      const entries = Object.entries(data?.data);
      const arrKeyno = [
        'price_discount_real',
        'image',
        'id',
        'userid',
        'quantity_real',
        'store_id',
        'doctor_id',
        'currency_id',
        'info_doctor',
      ];

      entries.map(item => {
        if (!arrKeyno.includes(item[0])) {
          const checkNum = typeof item[1] === 'number';
          setValue(item[0], checkNum ? String(item[1]) : item[1]);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data]);

  return (
    <MainWrapper
      headerTitle={params?.id ? t('update_voucher') : t('create_voucher')}
      sourceImage={images.backgroundHome}>
      <View style={{paddingHorizontal: scale(16), rowGap: scale(12)}}>
        <Input
          label={t('quantity')}
          control={control}
          name="quantity"
          placeholder={t('enter_quantity')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          enableFormatNum
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(25),
          }}>
          <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
            {t('expiration_date')}:
          </CText>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setOpenCheckStart(true)}>
            <CText style={{color: COLORS.White}}>
              {formatDate(timeCheckStart)}
            </CText>
          </TouchableOpacity>
          <CText style={{color: COLORS.White, fontSize: SIZES.xMedium}}>
            {t('to')}
          </CText>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setOpenCheckEnd(true)}>
            <CText style={{color: COLORS.White}}>
              {formatDate(timeCheckEnd)}
            </CText>
          </TouchableOpacity>
        </View>

        <DatePicker
          mode="date"
          title={t('select_date')}
          modal
          open={openCheckStart}
          date={timeCheckStart}
          onConfirm={time => {
            setOpenCheckStart(false);
            setTimeCheckStart(time);
            if (timeCheckEnd <= time) {
              const newEndTime = new Date(time);
              newEndTime.setDate(newEndTime.getDate() + 1);
              setTimeCheckEnd(newEndTime);
            }
          }}
          onCancel={() => {
            setOpenCheckStart(false);
          }}
        />

        <DatePicker
          mode="date"
          title={t('select_date')}
          modal
          open={openCheckEnd}
          date={timeCheckEnd}
          onConfirm={time => {
            // Cho phép timeCheckEnd lớn hơn timeCheckStart hoặc bằng
            if (time >= timeCheckStart) {
              setTimeCheckEnd(time);
            } else {
              alert(t('the_end_date_must_be_greater'));
            }
            setOpenCheckEnd(false);
          }}
          onCancel={() => {
            setOpenCheckEnd(false);
          }}
        />
        <Input
          label={`${t('price')} (${t('TBH')})`}
          control={control}
          name="price"
          placeholder={t('enter_price')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
        />
        <CText style={{color: COLORS.grey}}>
          *{t('note')}: {t('this_is_the_virtual_currency_value')}
        </CText>
        <Input
          label={t('price_discount')}
          control={control}
          name="price_discount"
          placeholder={t('enter_price_discount')}
          rules={[requireField(t('this_field_required'))]}
          styleContent={{backgroundColor: COLORS.input, borderWidth: 0}}
          style={styles.textInput}
          sizeInput="medium"
          styleTextLabel={styles.styleLabel}
          styleText={{
            fontSize: SIZES.xMedium,
          }}
          enableFormatNum
        />
        <CText style={{color: COLORS.grey}}>
          *{t('note')}: {t('this_is_the_usable_value_of_this_voucher')}
        </CText>

        {!params?.id && (
          <ImageVoucher
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
        )}
        <Button
          title={t('confirm')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleSubmit(handleCreateVoucherDoctor)}
          style={{marginTop: scale(20)}}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    height: scale(30),
    backgroundColor: COLORS.input,
    paddingHorizontal: scale(10),
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: scale(10),
  },
});
