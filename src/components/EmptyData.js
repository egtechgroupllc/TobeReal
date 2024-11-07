import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CImage from './CImage';
import CText from './CText';
import {COLORS, images, SIZES} from '~/assets/constants';
import Button from './Button';
import {scale} from '~/utils/scale';
import {useLanguage} from '~/hooks/useLanguage';
import {IconNodata} from '~/assets/icon/Icon';

export default function EmptyData({
  navigation,
  desc,
  textBtn,
  image,
  iconEmpty,
  styleWrapper,
}) {
  const {navigate} = useNavigation();
  const {t} = useLanguage();
  return (
    <View style={[styles.wrapper, styleWrapper]}>
      {iconEmpty || (
        // <CImage
        //   source={image || images.no_data}
        //   resizeMode="contain"
        //   style={styles.img}
        // />
        <IconNodata fill={COLORS.grey} />
      )}

      <CText
        textType="bold"
        style={{
          color: COLORS.grey,
          fontSize: SIZES.medium,
        }}>
        {desc || t('no_data')}
      </CText>
      {textBtn && (
        <Button
          buttonType="medium"
          text={textBtn}
          styleText={{
            textType: 'semiBold',
          }}
          style={{
            minWidth: '40%',
          }}
          onPress={() => navigate(navigation || t('explore'))}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: WIDTH.heightScreen / 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    rowGap: scale(10),
    flex: 1,
  },
  img: {
    width: scale(100),
    height: scale(100),
  },
});
