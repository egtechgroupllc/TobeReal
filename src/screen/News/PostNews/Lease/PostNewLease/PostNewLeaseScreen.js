import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {postCreateAccommoLease} from '../../../../../Model/api/apiAccom';
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

import EstateContact from '../components/PostNewLease/EstateContact';
import EstateDetail from '../components/PostNewLease/EstateDetail';
import EstateFacilities from '../components/PostNewLease/EstateFacilities';
import EstatePhoto from '../components/PostNewLease/EstatePhoto';
import GeneralInformation from '../components/PostNewLease/GeneralInformation';
import MainWrapper from '../../../../../components/MainWrapper';

export default function PostNewLeaseScreen() {
  const {t} = useLanguage();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();
  const {navigate, setOptions} = useNavigation();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('create_new_accom'),
    });
  }, []);
  const queryClient = useQueryClient();

  const createAccommodationMu = useMutation({
    mutationFn: postCreateAccommoLease,
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
  const checkIsValid = () => {
    if (`${errors}` !== '{}') {
      showMess('Vui lòng nhập chính xác thông tin', 'error');
      // return;
    }

    handleSubmit(handlePostLease)();
  };

  const handlePostLease = value => {
    delete value?.check;
    if (value?.rating === 0) {
      delete value?.rating;
    }
    if (!value?.latitude) {
      showMess('Please choose coordinates of your estate in Map', 'error');
      return;
    }

    if (!value?.features || JSON.parse(value?.features).length <= 0) {
      showMess('You have not selected a facility yet', 'error');
      return;
    }

    const formData = getFormData(value);

    createAccommodationMu.mutate(formData, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');

        if (dataInside?.status) {
          reset();
          queryClient.invalidateQueries(['accommodation', 'my-list', 0]);
          navigate('NoBottomTab', {
            screen: 'AddPolicyScreen',
            params: dataInside?.data,
          });
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
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {t('lease')}
        </CustomText>
      </View>

      <View>
        <GeneralInformation
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
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
        />

        <EstateContact
          control={control}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />

        {/* <EstateRooms /> */}

        <EstatePhoto
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        {/* <PaymentInfo
            control={control}
            setValue={setValue}
            watch={watch}
            errors={errors}
          /> */}
      </View>

      {/* <CheckBox
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
      /> */}

      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={t('post')}
        disabled={createAccommodationMu.isPending}
        // onPress={handleSubmit(handlePostLease)}
        onPress={checkIsValid}
        style={{
          marginTop: scale(20),
          width: '80%',
        }}
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
