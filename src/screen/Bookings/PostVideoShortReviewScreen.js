import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLanguage} from '../../hooks/useLanguage';
import {
  CustomImage,
  CustomInput,
  CustomText,
  MainWrapper,
} from '../../components';
import {COLORS, SIZES, images, scale} from '../../assets/constants';
import {IconLogoSaveloka} from '../../assets/icon/Icon';
import {useForm} from 'react-hook-form';
import {requireField} from '../../utils/validate';
import ChooseVideoPicker from './Review/ChooseVideoPicker';
import FooterButton from '../News/PostNews/Lease/components/FooterButton';
import {useMutation} from '@tanstack/react-query';
import {showMess} from '../../assets/constants/Helper';
import {useAuthentication} from '../../hooks/useAuthentication';
import {postVideoShort} from '../../Model/api/common';

export default function PostVideoShortReviewScreen() {
  const {setOptions, navigate} = useNavigation();
  const {control, watch, setValue, handleSubmit} = useForm();
  const params = useRoute().params;
  const [pausedVideo, setPausedVideo] = useState(false);

  const {t} = useLanguage();
  const {token} = useAuthentication();
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('video_short_review'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    formData.append('txhash_wallet_id', params?.txhashId);

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
            setPausedVideo(true);
            navigate('Explore');
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
              width: '85%',
            }}>
            {!params?.isTour
              ? t('would_you_like_share_short_video')
              : t('would_you_like_share_short_video_tour')}
          </CustomText>
        </View>
        <CustomInput
          control={control}
          name="caption"
          placeholder={`${t('like_or_dislike')}?`}
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
      </MainWrapper>
      <FooterButton
        onPressConfirm={handleSubmit(handlePostVideoShort)}
        onPressCancel={() => navigate('Explore')}
      />
    </>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
