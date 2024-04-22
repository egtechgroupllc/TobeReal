import React from 'react';

import {ImageBackground, StyleSheet, View} from 'react-native';
import {SIZES, images, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import {useLanguage} from '../../hooks/useLanguage';
import {ListVideoInfluencerScreen} from '.';

export default function HomeVideoScreen() {
  const {t} = useLanguage();
  return (
    // <MainWrapper>
    <ListVideoInfluencerScreen />
    // </MainWrapper>
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