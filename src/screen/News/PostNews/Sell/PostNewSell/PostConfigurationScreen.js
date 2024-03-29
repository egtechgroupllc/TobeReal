import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {postCreateEstatSell} from '../../../../../Model/api/apiEstate';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {showMess} from '../../../../../assets/constants/Helper';
import {IconGoBack} from '../../../../../assets/icon/Icon';
import {CustomButton} from '../../../../../components';
import MainWrapper from '../../../../../components/MainWrapper';
import ChoosePostTime from '../components/PostConfiguration/ChoosePostTime';
import PostType from '../components/PostConfiguration/PostType';
import CustomText from '../../../../../components/CustomText';

export default function PostConfigurationScreen() {
  const {goBack, navigate} = useNavigation();
  const params = useRoute().params;

  const {handleSubmit, control, setValue, reset} = useForm();

  const queryClient = useQueryClient();
  const createEstateSellMu = useMutation({
    mutationFn: postCreateEstatSell,
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

  const handlePostLease = value => {
    const formData = getFormData({...params, ...value});

    createEstateSellMu.mutate(formData, {
      onSuccess: dataInside => {
        showMess(dataInside?.message, dataInside?.status ? 'success' : 'error');
        if (dataInside?.status) {
          navigate('SellScreen', {status: true});
          queryClient.invalidateQueries(['estate', 'my-list']);
        }
      },
      onError: err => {
        console.log({err});
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <MainWrapper
        refreshControl={false}
        styleWrapper={{
          paddingHorizontal: scale(10),
        }}
        styleContent={styles.content}>
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.large,
            paddingHorizontal: scale(10),
          }}>
          Cấu hình tin đăng
        </CustomText>
        <PostType control={control} setValue={setValue} />
        <ChoosePostTime control={control} setValue={setValue} />
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
    borderRadius: scale(6),
    paddingVertical: scale(10),
    marginVertical: scale(20),
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
