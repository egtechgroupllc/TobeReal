/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {
  postCreateEstatSell,
  postUpdateEstate,
} from '../../../../../Model/api/apiEstate';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {IconGoBack} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import CustomText from '../../../../../components/CustomText';
import MainWrapper from '../../../../../components/MainWrapper';
import AutoPost from '../components/PostConfiguration/AutoPost';
import PostType from '../components/PostConfiguration/PostType';

export default function PostConfigurationScreen() {
  const params = useRoute().params;
  const queryClient = useQueryClient();

  const {goBack, navigate} = useNavigation();
  const {handleSubmit, control, setValue, unregister} = useForm();

  const [dateEnd, setDateEnd] = useState(new Date());

  const createEstateSellMu = useMutation({
    mutationFn: postCreateEstatSell,
  });
  const updateEstateMu = useMutation({
    mutationFn: postUpdateEstate,
  });

  const filterEmptyValues = object => {
    return Object.fromEntries(
      Object.entries(object).filter(
        ([key, value]) => value !== undefined && value !== null,
      ),
    );
  };
  const processImages = (images = [], formData, key) => {
    return images?.map(image => {
      formData.append(key, image);
      return {name: image.name, description: image.description};
    });
  };

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (
        ![
          'description_img',
          'kyc',
          'id',
          'image_update_description',
          'image_update_description_kyc',
          'image_delete',
        ].includes(key)
      ) {
        formData.append(key, object[key]);
      }

      return item;
    }, formData);

    if (object?.image_delete) {
      formData.append('image_delete', JSON.stringify(object?.image_delete));
    }

    const imageDescription = processImages(
      object?.description_img,
      formData,
      'description_img',
    );

    const imageKyc = processImages(object?.kyc, formData, 'kyc');

    if (object?.kyc || object?.description_img) {
      formData.append(
        'image_description',
        JSON.stringify([...imageDescription, ...imageKyc]),
      );
    }

    if (
      object?.image_update_description &&
      object?.image_update_description_kyc
    ) {
      const arrImage_descriptionUp = object?.image_update_description?.map(
        image => {
          return {
            id: image?.id,
            description: image?.description,
          };
        },
      );

      const arrImage_Kyc_Up = object?.image_update_description_kyc?.map(
        image => {
          return {
            id: image?.id,
            description: image?.description,
          };
        },
      );

      formData.append(
        'image_update_description',
        JSON.stringify([...arrImage_descriptionUp, ...arrImage_Kyc_Up]),
      );
    }

    return formData;
  };

  const handlePostLease = value => {
    delete params?.package_post_item_number_repost;
    delete params?.package_post_item_id_repost;
    delete params?.package_post_item;
    delete params?.date_start;

    const formData = getFormData({...filterEmptyValues(params), ...value});

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');
        if (dataInside?.status) {
          // navigate('NoBottomTab', {
          //   screen: 'SellManagementScreen',
          // });

          queryClient.invalidateQueries(['estate', 'my-list']);
        }
      },
      onError: err => {
        console.log({err});
      },
    };

    if (params?.package_post_item_id) {
      updateEstateMu.mutate(
        {data: formData, id_estate: params?.id},
        mutationConfig,
      );

      return;
    }
    createEstateSellMu.mutate(formData, mutationConfig);
  };

  return (
    <View style={{flex: 1}}>
      <MainWrapper
        refreshControl={false}
        styleContent={{
          rowGap: scale(16),
        }}>
        <View style={styles.content}>
          <CustomText
            textType="semiBold"
            style={{
              fontSize: SIZES.large,
              paddingHorizontal: scale(10),
            }}>
            Cấu hình tin đăng
          </CustomText>

          <PostType
            control={control}
            setValue={setValue}
            onChangeDateEnd={setDateEnd}
            params={params}
          />
        </View>

        <AutoPost
          setValue={setValue}
          date={dateEnd}
          params={params}
          unregister={unregister}
        />
      </MainWrapper>

      <View style={styles.footer}>
        <CustomButton
          styleWrapper={{
            alignSelf: 'center',
          }}
          style={{
            width: '35%',
            alignSelf: 'center',
          }}
          text="Quay lại"
          outline
          iconLeft={IconGoBack}
          styleIcon={{
            color: COLORS.primary,
          }}
          onPress={goBack}
        />

        <CustomButton
          styleWrapper={{
            alignSelf: 'center',
            flex: 1,
          }}
          style={{
            width: '80%',
            alignSelf: 'center',
          }}
          text="Xác nhận"
          onPress={handleSubmit(handlePostLease)}
          disabled={createEstateSellMu.isPending}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(20),
    backgroundColor: '#fff',
    padding: scale(10),
    ...SHADOW,
  },
  footer: {
    rowGap: scale(20),
    backgroundColor: '#fff',
    paddingVertical: scale(10),
    ...SHADOW,
    flexDirection: 'row',
    columnGap: scale(20),
    paddingHorizontal: scale(20),
  },
});
//
