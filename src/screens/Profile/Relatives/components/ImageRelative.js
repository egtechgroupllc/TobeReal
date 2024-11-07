import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {useLanguage} from '~/hooks/useLanguage';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import ChooseImgPicker from '~/components/ChoosePhoto/ChooseImgPicker';
import {validateMinLength} from '~/utils/validate';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';

export default function ImageRelative({
  errors,
  watch,
  control,
  arrImg,
  isKyc,
  setValue,
}) {
  const {t} = useLanguage();
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  const arrKeywords = useRef(['image_avatar']).current;

  const formatImgEdit = images => {
    const result = images.map((item, index) => {
      var filename = item.file_name;

      var parts = filename.split('.');

      var extension = parts[parts.length - 1];

      return {
        name: filename,
        type: `image/${extension}`,
        id: item.id,
        description: item?.description,
        uri: item.url,
      };
    });

    return result;
  };

  const [isView, setView] = useState(false);

  const imgDes = useMemo(() => {
    if (arrImg && isKyc) {
      const description_img = arrImg.filter(item => !item?.is_kyc);
      const image_descriptionFormat = formatImgEdit(description_img);

      return image_descriptionFormat;
    }
  }, [arrImg, isKyc]);

  return (
    <View>
      <ButtonTabValidate
        title={t(`${t('image_avatar')}`)}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <ChooseImgPicker
          control={control}
          name={'image_avatar'}
          maxFiles={1}
          // pickImageOption={pickImages}
          onSelect={data => {
            console.log(data?.[0]?.url);
            setValue('image_avatars', data?.[0]?.url);
          }}
          rules={
            !imgDes && [
              validateMinLength(t('Minimum 1 photos and maximum 24 photos'), 1),
            ]
          }
          // selectedImage={selectedImage}
        />
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingTop: scale(20),
    minHeight: scale(100),
    borderRadius: scale(6),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderColor: COLORS.input,
    borderWidth: scale(1),
    width: '100%',
    paddingBottom: scale(20),
    rowGap: scale(16),
  },
});
