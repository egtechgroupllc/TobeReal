import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ChooseImgPicker from '~/components/ChoosePhoto/ChooseImgPicker';
import {useLanguage} from '~/hooks/useLanguage';
import ButtonTabValidate from '~/components/ChoosePhoto/ButtonTabValidate';
import {scale} from '~/utils/scale';
import {COLORS} from '~/assets/constants';
import Collapsible from 'react-native-collapsible';

export default function ImgShop({control}) {
  const {t} = useLanguage();
  const [isView, setView] = useState(false);
  const viewGeneral = () => {
    setView(prev => !prev);
  };
  return (
    <View>
      <ButtonTabValidate title={t('Shop images')} onPress={viewGeneral} />
      <Collapsible collapsed={!isView} style={styles.box}>
        <ChooseImgPicker
          title={t('Shop image')}
          subHeading={t('update_image_to_maximum')}
          control={control}
          maxFiles={1}
          name={'url'}
        />
        <ChooseImgPicker
          title={t('Shop banner')}
          subHeading={t('update_image_to_maximum')}
          control={control}
          maxFiles={1}
          name={'img_banner'}
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
  dot: {
    backgroundColor: COLORS.White,
    borderRadius: scale(99),
    height: scale(10),
    aspectRatio: 1,
  },
});
