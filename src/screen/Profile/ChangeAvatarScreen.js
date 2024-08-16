import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  IconAdd,
  IconExportFile,
  IconHome,
  IconImportFile,
} from '../../assets/icon/Icon';
import {COLORS, SHADOW, SIZES, images, scale} from '../../assets/constants';
import {useLanguage} from '../../hooks/useLanguage';
import {
  CustomButton,
  CustomImage,
  CustomText,
  MainWrapper,
} from '../../components';
import {launchImageLibrary} from 'react-native-image-picker';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postEditProfile} from '../../Model/api/auth';
import {showMess} from '../../assets/constants/Helper';

export default function ChangeAvatarScreen() {
  const params = useRoute().params;
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(
    !params?.image_avatar ? images.avatar : params?.url_image_avatar,
  );
  const [imageFormData, setImageFormData] = useState(null);
  useLayoutEffect(() => {
    return setOptions({
      headerTitle: t('change_avatar'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('BottomTab')}>
          <IconHome style={{width: scale(20)}} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const editProfileMutation = useMutation({
    mutationFn: postEditProfile,
  });
  const pickImages = () => {
    launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        const selectedImg = response.assets[0];
        setSelectedImage({uri: selectedImg.uri});
        // Prepare formData to upload image if needed
        const formData = new FormData();
        formData.append('image_avatar', {
          uri: selectedImg.uri,
          type: selectedImg.type,
          name: selectedImg.fileName || `image.jpg`,
        });
        setImageFormData(formData);
      }
    });
  };
  const handleEditProfile = () => {
    if (imageFormData) {
      editProfileMutation.mutate(imageFormData, {
        onSuccess: dataInside => {
          showMess(
            t(dataInside?.message),
            dataInside?.status ? 'success' : 'error',
          );

          if (dataInside?.status) {
            queryClient.invalidateQueries(['user', 'profile']);
            navigate('BottomTab');
          }
        },
        onError: err => console.log(err),
      });
    } else {
      showMess(t('please_select_image'), 'error');
    }
  };
  return (
    <MainWrapper
      scrollEnabled={false}
      styleContent={{alignItems: 'center', marginTop: scale(50)}}>
      <CustomImage
        source={selectedImage}
        style={{width: scale(100), height: scale(100), borderRadius: scale(99)}}
      />
      <CustomText
        style={{fontSize: SIZES.large, marginTop: scale(10)}}
        textType="semiBold">
        {params?.username}
      </CustomText>
      <CustomText style={{fontSize: SIZES.medium}} textType="regular">
        {params?.phone}
      </CustomText>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(20),
          marginTop: scale(50),
          paddingHorizontal: scale(30),
        }}>
        <CustomButton
          text={t('upload_image')}
          onPress={pickImages}
          styleWrapper={{flex: 1}}
          style={{
            backgroundColor: COLORS.white,
            ...SHADOW,
          }}
          styleText={{color: COLORS.black}}
          iconRight={IconImportFile}
        />
        <CustomButton
          text={t('confirm')}
          disabled={editProfileMutation.isPending}
          onPress={handleEditProfile}
          styleWrapper={{flex: 1}}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
