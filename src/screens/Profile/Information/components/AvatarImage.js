import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import ChooseImgPicker from '~/components/ChoosePhoto/ChooseImgPicker';
import {useLanguage} from '~/hooks/useLanguage';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import Collapsible from 'react-native-collapsible';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';

export default function AvatarImage({control, setValue, errors, watch}) {
  const {t} = useLanguage();
  const arrKeywords = useRef(['image']).current;
  const [isView, setView] = useState(false);

  const viewGeneral = () => {
    setView(prev => !prev);
  };
  return (
    <View>
      <ButtonTabValidate
        title={t(`upload_avatar`)}
        onPress={viewGeneral}
        errors={errors}
        watch={watch}
        arrKeywords={arrKeywords}
      />
      <Collapsible collapsed={!isView} style={styles.box}>
        <ChooseImgPicker
          title={t('upload_avatar')}
          control={control}
          name={'files'}
          maxFiles={1}
          // pickImageOption={pickImages}
          onSelect={data => {
            setValue('file', data?.[0]?.url);
          }}

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
