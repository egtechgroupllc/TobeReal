import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';

import {
  postCreateAccommoLease,
  postUpdateAccom,
} from '../../../../../Model/api/apiAccom';
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
import ModalBookingSuccess from '../../../../Bookings/components/BookingRoom/ContentStep2/ModalBookingSuccess';
import {useCountdown} from '../../../../../hooks/useCountdown';
import {useLoading} from '../../../../../hooks/useLoading';

export default function PostNewLeaseScreen() {
  const {t} = useLanguage();
  const params = useRoute().params;
  const [openContact, setOpenContact] = useState(false);
  const isPending = useRef(false);

  const [check, setCheck] = useState(false);
  const {start, countdown} = useCountdown(5);
  const {stopLoading, setLoading} = useLoading();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();

  const {navigate, setOptions} = useNavigation();
  useEffect(() => {
    stopLoading();
    return () => {
      return setLoading(true);
    };
  }, []);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: !params?.name ? t('create_new_accom') : t('edit'),
    });
  }, []);

  const queryClient = useQueryClient();
  const createAccommodationMu = useMutation({
    mutationFn: postCreateAccommoLease,
  });
  const updateAccommodationMu = useMutation({
    mutationFn: postUpdateAccom,
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
    if (object?.kyc || object?.description_img) {
      formData.append(
        'image_description',
        JSON.stringify([...arrImage_description, ...arrImage_Kyc]),
      );
    }

    return formData;
  };

  const checkIsValid = () => {
    // dispatch(
    //   StackActions.replace('NoBottomTab', {
    //     screen: 'AddRoomTypeScreen',
    //     params: {},
    //   }),
    // );
    if (`${errors}` !== '{}') {
      showMess(t('please_enter_correct'), 'error');
      // return;
    }

    handleSubmit(handlePostLease)();
  };

  const handlePostLease = value => {
    if (!value?.video_link) {
      delete value?.video_link;
    }
    delete value?.check;

    if (value?.rating === 0) {
      delete value?.rating;
    }
    if (!params?.name && !value?.latitude) {
      showMess(t('please_choose_coordinates'), 'error');
      return;
    }

    if (!value?.features || JSON.parse(value?.features).length <= 0) {
      showMess(t('you_have_not_select_facility'), 'error');
      return;
    }
    if (!params?.address) {
      setOpenContact(true);
    }

    const formData = getFormData(value);
    // console.log(formData);
    const mutationConfig = {
      onSuccess: dataInside => {
        if (dataInside?.status) {
          if (!params?.address) {
            isPending.current = true;
            setCheck({
              status: dataInside?.status,
              mess: t(dataInside?.message),
            });
            start();
            setTimeout(
              () => {
                setOpenContact(false);
                reset();
                queryClient.invalidateQueries(['accommodation', 'my-list', 0]);
                navigate('AddRoomTypeScreen', dataInside?.data);
                return;
              },
              dataInside?.status === false ? 3000 : 5000,
            );
          } else {
            navigate('NoBottomTab', {
              screen: 'AccommoManagementScreen',
            });
            queryClient.invalidateQueries(['accommodation', 'my-list', 1]);
          }
        } else {
          showMess(t(dataInside?.message), 'error');
          setOpenContact(false);
        }
      },
      onError: err => {
        console.log({err});
        showMess(t('an_error_occured'), 'error');
      },
    };
    if (params?.address) {
      updateAccommodationMu.mutate(
        {data: formData, id_accom: params?.id},
        mutationConfig,
      );
      return;
    }
    setTimeout(() => {
      createAccommodationMu.mutate(formData, mutationConfig);
    }, 1000);
  };
  useEffect(() => {
    if (params?.address) {
      reset();

      const entries = Object.entries(params);
      const arrKeyno = ['address', 'latitude', 'longitude'];

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
          params={params}
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
          params={params}
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
          arrImg={params?.images}
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
      <ModalBookingSuccess
        openContact={openContact}
        isPending={isPending}
        check={check}
        countdown={countdown}
      />
      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={!params?.name ? t('post') : t('update')}
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
