import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMess} from '~/assets/constants/Helper';
import {useLanguage} from '~/hooks/useLanguage';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {validateEmail} from '~/utils/validate';

export default function ContentInfo({data, dataRelative, onPressDelete}) {
  const [selectedImage, setSelectedImage] = useState();
  const [imageFormData, setImageFormData] = useState(null);
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const queryClient = useQueryClient();

  // const editProfileMutation = useMutation({
  //   mutationFn: postEditProfile,
  // });
  const pickImages = () => {
    launchImageLibrary({selectionLimit: 1, mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        const selectedImg = response.assets[0];
        setSelectedImage({uri: selectedImg.uri});

        // Prepare formData to upload the image
        const formData = new FormData();
        formData.append('image_avatar', {
          uri: selectedImg.uri,
          type: selectedImg.type,
          name: selectedImg.fileName || `image.jpg`,
        });

        // Automatically call the API after selecting the image
        // handleEditProfile(formData);
      }
    });
  };

  // const handleEditProfile = (formData) => {
  //   if (formData) {
  //     editProfileMutation.mutate(formData, {
  //       onSuccess: dataInside => {
  //         showMess(
  //           t(dataInside?.message),
  //           dataInside?.status ? 'success' : 'error'
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

  const TextRow = ({textLeft, textRight}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: scale(3),
        }}>
        <CText
          style={{color: COLORS.White, fontSize: SIZES.medium}}
          textType="regular">
          {textLeft}
        </CText>
        <CText
          style={{
            color: COLORS.White,
            fontSize: SIZES.medium,
            maxWidth: scale(200),
          }}
          textType="bold">
          {textRight}
        </CText>
      </View>
    );
  };
  const handleNavigate = () => {
    if (!dataRelative) {
      navigate('ChangeInformationScreen');
    } else {
      navigate('AddRelativeProfileScreen', dataRelative);
    }
  };
  return (
    <View style={{flex: 1, paddingHorizontal: scale(10), rowGap: scale(15)}}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
        }}>
        <CImage.Avatar
          source={
            dataRelative?.image_avatar || data?.image
              ? {uri: dataRelative?.image_avatar || data?.image}
              : images.iconProfile
          }
          style={{height: scale(70), width: scale(70)}}
          resizeMode="cover"
        />
        <View style={{rowGap: scale(3), flex: 1}}>
          <CText
            style={{fontSize: SIZES.medium, color: COLORS.White}}
            textType="bold">
            {dataRelative?.name || data?.fullname}
          </CText>
          {dataRelative?.relationship && (
            <CText
              style={{fontSize: SIZES.medium, color: COLORS.White}}
              textType="bold">
              ({t(dataRelative?.relationship)})
            </CText>
          )}
          {/* <Button.Text
            title="Change_avatar"
            style={{color: COLORS.blue}}
            padding={0}
            onPress={pickImages}
          /> */}
        </View>
      </View>
      <CText
        style={{fontSize: SIZES.medium, color: COLORS.White}}
        textType="bold">
        {t('basic_information')}
      </CText>
      <View style={styles.content}>
        <TextRow
          textLeft={t('full_name')}
          textRight={dataRelative?.name || data?.fullname}
        />
        <TextRow
          textLeft={t('phone')}
          textRight={dataRelative?.phone || data?.phone}
        />
        <TextRow
          textLeft={t('email')}
          textRight={dataRelative?.email || data?.email}
        />
        <TextRow
          textLeft={t('gender')}
          textRight={dataRelative?.gender || data?.gender}
        />
        <TextRow
          textLeft={t('birth_of_date')}
          textRight={dataRelative?.birthday || data?.birthday}
        />
        <TextRow
          textLeft={t('address')}
          textRight={dataRelative?.address || data?.address}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
        }}>
        <Button
          title={t('change_information')}
          linearGradientProps={{colors: COLORS.linearButton}}
          onPress={handleNavigate}
          style={{
            marginTop: scale(100),
            flex: 1,
          }}
        />
        {dataRelative?.name !== data?.name && (
          <Button
            title={t('remove_profile')}
            backgroundColor={COLORS.grey}
            style={{
              marginTop: scale(100),
              flex: 1,
            }}
            onPress={onPressDelete}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    minHeight: scale(200),
    width: '100%',
    alignSelf: 'center',
    padding: scale(15),
    borderRadius: scale(10),
    backgroundColor: COLORS.overlay,
    rowGap: scale(15),
  },
});
