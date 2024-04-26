import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {
  COLORS,
  SHADOW,
  SIZES,
  WIDTH,
  images,
  scale,
} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {CustomButton} from '../../../../../components';
import CheckBox from '../../../../../components/CheckBox';
import CustomText from '../../../../../components/CustomText';
import {useLanguage} from '../../../../../hooks/useLanguage';
import {requireField} from '../../../../../utils/validate';

import MainWrapper from '../../../../../components/MainWrapper';

import {postCreateTour} from '../../../../../Model/api/apiTour';

import EstatePhoto from '../../Lease/components/PostNewLease/EstatePhoto';
import GeneralInformation from '../components/PostNewTour/GeneralInformation';
import TourSchedule from '../components/PostNewTour/TourSchedule';
import EstateContact from '../components/PostNewTour/EstateContact';

export default function PostNewTourScreen() {
  const {t} = useLanguage();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    unregister,
    formState: {errors},
  } = useForm();

  const queryClient = useQueryClient();
  const createTourMu = useMutation({
    mutationFn: postCreateTour,
  });

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (key !== 'description_img' && key !== 'kyc') {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    const arrImage_description = object?.description_img?.map(image => {
      formData.append('description_img', image);

      return {
        name: image?.name,
        description: image?.description,
      };
    });

    const arrImage_Kyc = object?.kyc?.map(image => {
      formData.append('kyc', image);
      return {
        name: image?.name,
        description: image?.description,
      };
    });

    formData.append(
      'image_description',
      JSON.stringify([...arrImage_description, ...arrImage_Kyc]),
    );

    return formData;
  };

  const handlePostTour = value => {
    delete value?.check;
    // delete value?.description_0;
    const formData = getFormData(value);
    createTourMu.mutate(formData, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');

        if (dataInside?.status) {
          reset();
          queryClient.invalidateQueries(['tour', 'create']);
        }
      },
      onError: err => {
        console.log({err});
      },
    });
  };

  return (
    <MainWrapper styleContent={styles.wrapper}>
      <View style={styles.button}>
        <Image
          source={images.rentbuy}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('TOUR')}
        </CustomText>
      </View>

      <View>
        <GeneralInformation
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
        {/* <EstateDetail
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        /> */}
        <TourSchedule
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
          unregister={unregister}
        />
        <EstateContact control={control} watch={watch} errors={errors} />

        <EstatePhoto
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </View>

      <CheckBox
        name="check"
        control={control}
        rules={requireField(t('this_field_required'))}
        text={t('do_you_agree')}
        textStyle={{
          color: COLORS.black,
          fontSize: SIZES.xSmall,
          flex: 0,
        }}
        styleWrapper={{
          alignItems: 'center',
        }}
      />

      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={t('Next')}
        onPress={handleSubmit(handlePostTour)}
        style={{
          marginTop: scale(20),
          width: '100%',
        }}
        // disabled={createTourMu.isPending}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: WIDTH.widthContain,
    alignItems: 'center',
    marginVertical: scale(30),
    rowGap: scale(20),
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

  text2: {
    fontSize: SIZES.medium,
  },
});
