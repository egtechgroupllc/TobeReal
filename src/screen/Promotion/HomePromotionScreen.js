import React from 'react';

import {ImageBackground, StyleSheet, View} from 'react-native';
import {SIZES, images, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import MainWrapper from '../../components/MainWrapper';
import DailyPromotion from './DailyPromotion';
import MonthlyPromotion from './MonthlyPromotion';
import YearlyPromotion from './YearlyPromotion';
import { useLanguage } from '../../hooks/useLanguage';

export default function HomePromotionScreen() {
  const {t}= useLanguage()
  return (
    <MainWrapper>
      <ImageBackground
        source={images.promotion}
        resizeMode="stretch"
        style={styles.banner}>
        <CustomText
          isShadow
          shaDowColor="#F0B90B90"
          textType="bold"
          style={styles.textBanner}>
          {t('check_out_all')}
        </CustomText>
      </ImageBackground>

      <View style={{rowGap: scale(10)}}>
        <DailyPromotion />
        <MonthlyPromotion />
        <YearlyPromotion />
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: scale(180),
  },
  textBanner: {
    fontSize: SIZES.large,
    width: '50%',
    marginTop: scale(30),
    marginLeft: scale(20),
  },
});
