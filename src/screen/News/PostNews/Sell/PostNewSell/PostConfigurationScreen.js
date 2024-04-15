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
  const {goBack, navigate} = useNavigation();
  const params = useRoute().params;

  const {handleSubmit, control, setValue, unregister} = useForm();
  const [dateEnd, setDateEnd] = useState(new Date());
  const queryClient = useQueryClient();
  const createEstateSellMu = useMutation({
    mutationFn: postCreateEstatSell,
  });
  const updateEstateMu = useMutation({
    mutationFn: postUpdateEstate,
  });

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (key !== 'description_img' && key !== 'kyc' && key !== 'id') {
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

  const handlePostLease = value => {
    delete params?.package_post_item_number_repost;
    delete params?.package_post_item_id_repost;
    delete params?.package_post_item;
    // delete params?.date_start;
    // delete value?.date_start;

    const formData = getFormData({...params, ...value});

    const mutationConfig = {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');
        if (dataInside?.status) {
          params?.package_post_item_id
            ? navigate('NoBottomTab', {
                screen: 'SellManagementScreen',
              })
            : navigate('PostNewSellScreen', {success: true});

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
              color: COLORS.white,
            }}>
            Post configuration
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
          text="Back"
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
          text="Confirm"
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
    // backgroundColor: COLORS.transparentGrey,
    padding: scale(10),
    ...SHADOW,
  },
  footer: {
    rowGap: scale(20),
    backgroundColor: COLORS.theme,
    paddingVertical: scale(10),
    ...SHADOW,
    flexDirection: 'row',
    columnGap: scale(20),
    paddingHorizontal: scale(20),
  },
});
