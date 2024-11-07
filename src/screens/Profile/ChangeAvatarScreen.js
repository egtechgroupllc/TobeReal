import {useNavigation, useRoute} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {IconHome, IconImportFile} from '~/assets/icon/Icon';
import {Button, CImage, CText, MainWrapper} from '~/components';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';

export default function ChangeAvatarScreen() {
  const params = useRoute().params;
  const {navigate, setOptions} = useNavigation();
  const {t} = useLanguage();
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState(
    !params?.image_avatar ? images.iconProfile : params?.url_image_avatar,
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
  // const editProfileMutation = useMutation({
  //   mutationFn: postEditProfile,
  // });
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
  // const handleEditProfile = () => {
  //   if (imageFormData) {
  //     editProfileMutation.mutate(imageFormData, {
  //       onSuccess: dataInside => {
  //         showMess(
  //           t(dataInside?.message),
  //           dataInside?.status ? 'success' : 'error',
  //         );

  //         if (dataInside?.status) {
  //           queryClient.invalidateQueries(['user', 'profile']);
  //           navigate('BottomTab');
  //         }
  //       },
  //       onError: err => console.log(err),
  //     });
  //   } else {
  //     showMess(t('please_select_image'), 'error');
  //   }
  // };
  return (
    <MainWrapper
      scrollEnabled={false}
      sourceImage={images.backgroundHome}
      styleContent={{alignItems: 'center', paddingTop: scale(50)}}>
      <CImage
        source={selectedImage}
        style={{width: scale(100), height: scale(100), borderRadius: scale(99)}}
      />
      <CText
        style={{
          fontSize: SIZES.large,
          marginTop: scale(10),
          color: COLORS.White,
        }}
        textType="semiBold">
        {params?.username}dasdsa
      </CText>
      <CText
        style={{fontSize: SIZES.medium, color: COLORS.White}}
        textType="regular">
        {params?.phone}dsadsa
      </CText>

      <View
        style={{
          marginTop: scale(50),
          flexDirection: 'row',
          columnGap: scale(10),
          paddingHorizontal: scale(15),
        }}>
        <Button
          title={t('upload_image')}
          onPress={pickImages}
          style={{
            flex: 1,
          }}
          backgroundColor={COLORS.White}
          styleText={{color: COLORS.black}}
          iconRight={IconImportFile}
        />

        <Button
          style={{
            flex: 1,
          }}
          title={t('confirm')}
          backgroundColor={COLORS.cyan}
          // disabled={editProfileMutation.isPending}
          // onPress={handleEditProfile}
        />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({});
