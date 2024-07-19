import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';
import {useForm} from 'react-hook-form';
import {useAuthentication} from '../../../hooks/useAuthentication';
import {getLinkData, postVideoShort} from '../../../Model/api/common';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  CustomButton,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../../components';
import {IconLogoSaveloka} from '../../../assets/icon/Icon';
import ChooseVideoPicker from '../../Bookings/Review/ChooseVideoPicker';
import FooterButton from '../PostNews/Lease/components/FooterButton';
import {SIZES, scale} from '../../../assets/constants';
import {requireField} from '../../../utils/validate';
import {showMess} from '../../../assets/constants/Helper';

export default function PostVideoShortScreen() {
  const {setOptions, navigate, goBack} = useNavigation();
  const {control, watch, setValue, handleSubmit} = useForm();
  const params = useRoute().params;
  const [pausedVideo, setPausedVideo] = useState(false);
  const queryClient = useQueryClient();

  const {t} = useLanguage();
  const {token} = useAuthentication();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('video_short_review'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['common', 'linked-data', params?.accomId || params?.estateId],
    queryFn: () =>
      getLinkData({
        token: token,
        table_name: params.Accom ? 'accommodation' : 'estate',
        table_id: params?.accomId || params?.estateId,
      }),
  });

  const txHashId = data?.data?.rows[0]?.id;

  const postVideoShortMu = useMutation({
    mutationFn: postVideoShort,
  });

  const getFormData = (object = {}) => {
    const formData = new FormData();

    Object.keys(object).reduce((item, key) => {
      if (key !== 'file') {
        item.append(key, object[key]);
      }

      return item;
    }, formData);

    const {uri, fileName, type} = object.file[0];
    formData.append('file', {
      uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
      name: fileName,
      type: type,
    });

    // formData.append('file', object?.file[0]);

    formData.append('txhash_wallet_id', txHashId);

    return formData;
  };

  const handlePostVideoShort = value => {
    const formData = getFormData(value);

    postVideoShortMu.mutate(
      {data: formData, token: token},
      {
        onSuccess: dataInside => {
          showMess(
            dataInside?.message ? dataInside?.message : 'Success!',
            dataInside?.status ? 'success' : 'error',
          );
          if (dataInside?.status) {
            queryClient.invalidateQueries([
              'common',
              'video-short',
              'my-list',
              params?.accomId || params?.estateId,
            ]);

            setPausedVideo(true);
            goBack();
          }
        },
        onError: err => {
          console.log({err});
        },
      },
    );
  };
  return (
    // <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
    <>
      <MainWrapper>
        <View
          style={{
            alignItems: 'center',
            rowGap: scale(15),
            marginTop: scale(50),
          }}>
          <IconLogoSaveloka width={scale(100)} height={scale(100)} />
          <CustomText
            style={{
              textAlign: 'center',
              fontSize: SIZES.xMedium,
              width: '70%',
            }}>
            {params.Accom
              ? t('share_detail_hotel_short_video')
              : t('share_detail_estate_short_video')}
          </CustomText>
        </View>
        <CustomInput
          control={control}
          name="caption"
          placeholder={`${t('description_video_short')}`}
          multiline
          maxLength={100}
          label={t('video_caption')}
          styleTextLabel={{
            textType: 'bold',
          }}
          styleWrapper={{
            width: '90%',
            alignSelf: 'center',
            marginTop: scale(20),
          }}
          rules={[requireField(t('this_field_required'))]}
          style={{
            minHeight: scale(120),
            maxHeight: scale(120),
          }}
        />

        <ChooseVideoPicker
          isDescriptionImg={false}
          maxFiles={1}
          name="file"
          control={control}
          onPausedVideo={pausedVideo}
        />
        <CustomButton
          text={t('confirm')}
          styleWrapper={{
            width: '50%',
            alignSelf: 'center',
            marginTop: scale(50),
          }}
          onPress={handleSubmit(handlePostVideoShort)}
        />
      </MainWrapper>
    </>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
