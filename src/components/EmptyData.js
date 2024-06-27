import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {COLORS, SIZES, WIDTH, images, scale} from '../assets/constants';
import {CustomButton} from '.';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../hooks/useLanguage';

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
        <CustomImage
          source={image || images.emptyData}
          resizeMode="contain"
          style={styles.img}
        />
      )}
      <CustomText
        textType="bold"
        style={{
          color: COLORS.primary,
          fontSize: SIZES.medium,
        }}>
        {desc || t('Empty Data')}
      </CustomText>

      {textBtn && (
        <CustomButton
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
    width: scale(220),
    height: scale(220),
  },
});
