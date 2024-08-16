import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {
  getListPriceRoomDate,
  postCreateAccommoRoomLease,
  postPolicyToRoom,
  postUpdateAccom,
  postUpdateRoomAccom,
} from '../../../../../Model/api/apiAccom';
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
import {IconHome} from '../../../../../assets/icon/Icon';

export default function AddRoomTypeScreen() {
  const {t} = useLanguage();
  const {navigate, goBack, setOptions, addListener} = useNavigation();
  const params = useRoute().params;
  useLayoutEffect(() => {
    return setOptions({
      // gestureEnabled: false,
      headerTitle: !params?.update ? t('create_room') : t('edit_room'),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigate('POST', {screen: 'PostNewsScreen'})}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
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
  const updateAccommodationRoomMu = useMutation({
    mutationFn: postUpdateRoomAccom,
  });

  // const createAddPolicyToRoom = useMutation({
  //   mutationFn: postPolicyToRoom,
  // });
  const getFormData = (object = {}) => {
    const formData = new FormData();
    const arrKeyno = [
      'files',
      'policy',
      'image_update_description',
      // params?.update && 'features',
    ];

    Object.keys(object).reduce((item, key) => {
      if (!arrKeyno.includes(key)) {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    // if (params?.update) {
    //   formData.append('features', JSON.stringify(object?.features));
    // }

    if (object?.files) {
      const arrImage_description = object?.files?.map(image => {
        formData.append('files', image);

        return {
          name: image?.name,
          description: image?.description,
        };
      });

      formData.append(
        'image_description',
        JSON.stringify(arrImage_description),
      );
    }

    if (object?.image_update_description) {
      const arrImage_descriptionUp = object?.image_update_description?.map(
        image => {
          return {
            id: image?.id,
            description: image?.description,
          };
        },
      );

      formData.append(
        'image_update_description',
        JSON.stringify(arrImage_descriptionUp),
      );
    }

    return formData;
  };
  // const linkPolicy = value => {
  //   createAddPolicyToRoom.mutate(
  //     {
  //       array_policy_id: value?.policy,
  //       room_id: value?.id,
  //       is_add: 1,
  //     },
  //     {
  //       onSuccess: dataInside => {
  //         console.log({dataInside}, 132);
  //       },
  //       onError: err => {
  //         console.log({err});
  //       },
  //     },
  //   );
  // };

  const handlePostRoom = value => {
    // navigate('AddPolicyScreen', {id: params?.id});
    delete value?.number_user;
    delete value?.images;

    params?.update && delete value?.number_room;
    params?.update && delete value?.price;
    params?.update && delete value?.currency_id;
    // const policy = value?.policy;

    // if (!value?.policy || policy.length <= 0) {
    //   showMess('Ban chua chon chinh sach cho phong', 'error');
    //   return;
    // }

    const features = params?.update
      ? value?.features
      : JSON.parse(value?.features);

    if (!value?.features || features.length <= 0) {
      showMess('Ban chua chon tien ich cho phong', 'error');
      return;
    }
    // navigate('NoBottomTab', {
    //   screen: 'AccommoManagementScreen',
    // });
    const formData = getFormData(value);

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(
          t(dataInside?.message),
          dataInside?.status ? 'success' : 'error',
        );
        if (dataInside?.status) {
          // reset();
          queryClient.invalidateQueries(['accommodation', 'my-list']);
          // navigate('NoBottomTab', {
          //   screen: 'AccommoManagementScreen',
          // });
          // linkPolicy({
          //   id: dataInside?.data?.id,
          //   policy: value?.policy,
          // });
          if (params?.update) {
            goBack();
            return;
          }
          params?.admin
            ? navigate('RoomManageScreen', params)
            : // navigate('NoBottomTab', {
              //     screen: 'AccommoManagementScreen',
              //     params: params?.id,
              //   });
              navigate('AddPolicyScreen', {
                accommodation_id: params?.id,
                dataRoom: dataInside?.data,
                price: watch('price'),
              });
        }
      },
      onError: err => {
        console.log({err});
      },
    };
    if (params?.update) {
      updateAccommodationRoomMu.mutate(
        {formData, id_room: params?.id},
        mutationConfig,
      );
      return;
    }
    createAccommodationRoomMu.mutate(
      {formData, id_accomo: params?.id || params?.accomId},
      mutationConfig,
    );
  };
  useEffect(() => {
    if (params?.accommodation_id) {
      reset();

      const entries = Object.entries(params);
      const arrKeyno = [
        'status',
        'id',
        'createdAt',
        'updatedAt',
        'note',
        'active',
        'accommodation_id',
        'wallet_address',
        'update',
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

  useEffect(() => {
    addListener('beforeRemove', e => {
      // Prevent default behavior of leaving the screen
      !params?.update && e.preventDefault();
      // Prompt the user before leaving the screen
    });
  }, [params?.update]);
  return (
    <MainWrapper
      styleContent={styles.wrapper}
      optionsHeader={{
        gestureEnabled: false,
        headerLeft: () => {},
        headerTitle: !params?.update ? t('create_room') : t('edit_room'),
      }}>
      <View style={styles.button}>
        <Image
          source={images.lease}
          style={{width: scale(38), height: scale(38)}}
        />
        <CustomText
          textType="medium"
          style={{...styles.text2, marginLeft: scale(20)}}>
          {!params?.update ? t('add_room') : t('edit_room')}
        </CustomText>
      </View>

      <GeneralInformation
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
