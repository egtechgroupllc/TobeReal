import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {postCreateAccommoRoomLease} from '../../../../../Model/api/apiAccom';
import {images} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {
  SHADOW,
  SIZES,
  WIDTH,
  scale,
} from '../../../../../assets/constants/theme';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import MainWrapper from '../../../../../components/MainWrapper';
import {useLanguage} from '../../../../../hooks/useLanguage';
import EstateDetail from '../components/AddRoomType/EstateDetail';
import EstateFacilities from '../components/AddRoomType/EstateFacilities';
import EstatePhoto from '../components/AddRoomType/EstatePhoto';
import GeneralInformation from '../components/AddRoomType/GeneralInformation';

export default function AddRoomTypeScreen() {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const params = useRoute().params;

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm();

  const queryClient = useQueryClient();
  const createAccommodationRoomMu = useMutation({
    mutationFn: postCreateAccommoRoomLease,
  });

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (key !== 'files') {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    const arrImage_description = object?.files?.map(image => {
      formData.append('files', image);

      return {
        name: image?.name,
        description: image?.description,
      };
    });

    formData.append('image_description', JSON.stringify(arrImage_description));

    return formData;
  };
  const handlePostRoom = value => {
    navigate('AddPolicyScreen', {id: params?.id});

    delete value?.number_user;
    if (!value?.features || JSON.parse(value?.features).length <= 0) {
      showMess('Ban chua chon tien ich cho phong', 'error');
      return;
    }
    navigate('NoBottomTab', {
      screen: 'AccommoManagementScreen',
    });
    const formData = getFormData(value);

    createAccommodationRoomMu.mutate(
      {formData, id_accomo: params?.id},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message,
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            reset();
            queryClient.invalidateQueries(['accommodation', 'my-list']);
            navigate('NoBottomTab', {
              screen: 'AccommoManagementScreen',
            });
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
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
          {t('add_room')}
        </CustomText>
      </View>

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

      <EstatePhoto
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
      />

      <CustomButton
        linearGradientProps
        buttonType="medium"
        text={t('post')}
        disabled={createAccommodationRoomMu.isPending}
        // onPress={handleSubmit(handlePostRoom)}
        onPress={handlePostRoom}
        style={{
          marginTop: scale(20),
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
