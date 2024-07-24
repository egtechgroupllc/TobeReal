import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IconHome} from '../../../../../assets/icon/Icon';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {postCreateVoucher} from '../../../../../Model/api/apiAccom';
import {
  CustomButton,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../../../../components';
import DateStart from './components/DateTime';
import DateTime from './components/DateTime';
import {
  requireField,
  validateMinAmount,
  validateMinLength,
} from '../../../../../utils/validate';
import InputPrice from './components/InputPriceVoucher';
import InputPriceVoucher from './components/InputPriceVoucher';
import ChooseImgPicker from '../../../../components/ChooseImgPicker';
import {showMess} from '../../../../../assets/constants/Helper';
import {postCreateVoucherTour} from '../../../../../Model/api/apiTour';
import {formatPrice} from '../../../../../utils/format';

export default function AddVoucherScreen() {
  const params = useRoute().params;
  const {navigate, setOptions, goBack} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();

  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('add_voucher'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('PostNewsScreen')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  useEffect(() => {
    !params?.isTour
      ? setValue('accommodation_id', params?.id)
      : setValue('tour_id', params?.id);
  }, [params?.isTour, params?.id]);

  const createVoucherMu = useMutation({
    mutationFn: postCreateVoucher,
  });
  const createVoucherTourMu = useMutation({
    mutationFn: postCreateVoucherTour,
  });

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (key !== 'file') {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    formData.append('file', object?.file[0]);

    // if (params?.update) {
    //   formData.append('features', JSON.stringify(object?.features));
    // }

    return formData;
  };

  const handlePostVoucher = value => {
    // const policy = value?.policy;

    // if (!value?.policy || policy.length <= 0) {
    //   showMess('Ban chua chon chinh sach cho phong', 'error');
    //   return;
    // }

    // const features = params?.update
    //   ? value?.features
    //   : JSON.parse(value?.features);

    // if (!value?.features || features.length <= 0) {
    //   showMess('Ban chua chon tien ich cho phong', 'error');
    //   return;
    // }
    // navigate('NoBottomTab', {
    //   screen: 'AccommoManagementScreen',
    // });
    const formData = getFormData(value);

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          dataInside?.message ? dataInside?.message : 'Success!',
          dataInside?.status ? 'success' : 'error',
        );
        if (dataInside?.status) {
          !params?.isTour
            ? queryClient.invalidateQueries([
                'voucher',
                'list-voucer-selling',
                params?.id,
              ])
            : queryClient.invalidateQueries([
                'voucher',
                'list-voucer-selling-tour',
                params?.id,
              ]);
          goBack();
        }
      },
      onError: err => {
        console.log({err});
      },
    };
    if (params?.isTour) {
      createVoucherTourMu.mutate(formData, mutationConfig);

      return;
    }
    createVoucherMu.mutate(formData, mutationConfig);
  };
  const imgDes = useMemo(() => {
    if (watch('images')) {
      const description_img = watch('images');
      const image_descriptionFormat = formatImgEdit(description_img);

      return image_descriptionFormat;
    }
  }, [watch('images')]);
  return (
    <MainWrapper styleContent={styles.wrapper}>
      <View style={styles.button}>
        <Image
          source={images.voucher}
          style={{width: scale(30), height: scale(30)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('add_voucher')}
        </CustomText>
      </View>
      <View style={styles.box}>
        <CustomInput
          label={t('quantity')}
          styleTextLabel={{fontSize: SIZES.xMedium, marginTop: scale(10)}}
          placeholder={t('quantity')}
          name="quantity"
          control={control}
          rules={requireField(t('this_field_required'))}
          style={styles.textInput}
          styleText={styles.textInput}
          keyboardType="numeric"
        />
        <DateTime
          onChange={value => {
            setValue('date_start', value?.date_start);
            setValue('date_end', value?.date_end);
          }}
        />
        <InputPriceVoucher
          control={control}
          priceValue={watch('price')}
          setValue={setValue}
          priceType={t('list_price')}
          value={'price'}
          namePrice={'TBH'}
          enableFormatNum={false}
        />
        <InputPriceVoucher
          control={control}
          priceValue={watch('price_discount')}
          setValue={setValue}
          priceType={t('discount_price')}
          value={'price_discount'}
          priceDiscount
          enableFormatNum
        />

        <ChooseImgPicker
          title={t('voucher_images')}
          subHeading={t('minimum_one_photos')}
          isDescriptionImg={false}
          maxFiles={1}
          name="file"
          control={control}
          rules={!imgDes && [validateMinLength(t('minimum_one_photos'), 1)]}
        />
      </View>
      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={t('confirm')}
        onPress={handleSubmit(handlePostVoucher)}
        style={{
          marginTop: scale(20),
          width: '80%',
        }}
      />
      {/* <GeneralInformation
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        accomId={params?.accommodation_id || params?.id}
      />
      <EstateDetail
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <EstateFacilities
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        update={params?.update}
      />

      <EstatePhoto
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={params?.update ? t('update') : t('post')}
        disabled={createAccommodationRoomMu.isPending}
        onPress={handleSubmit(handlePostRoom)}
        // onPress={handlePostRoom}
        style={{
          marginTop: scale(20),
        }}
      /> */}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: WIDTH.widthContain,
    alignItems: 'center',
    marginVertical: scale(30),
    alignSelf: 'center',
  },
  button: {
    height: scale(63),
    width: '90%',
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: '#F0B90B40',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowColor: '#F0B90B40',
  },
  box: {
    marginTop: scale(10),
    minHeight: scale(100),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: '#F0B90B80',
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(10),
  },
  text2: {
    fontSize: SIZES.medium,
  },
  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
});
