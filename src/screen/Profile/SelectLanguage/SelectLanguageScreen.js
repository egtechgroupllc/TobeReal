import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import MainAuth from '../../../components/MainAuth';
import ContentLanguage from './components/ContentLanguage';
import MainWrapper from '../../../components/MainWrapper';
import {useLanguage} from '../../../hooks/useLanguage';
import {useNavigation} from '@react-navigation/native';

export default function SelectLanguageScreen() {
  return (
    <MainWrapper scrollEnabled={false} noSafeArea>
      <ContentLanguage />
    </MainWrapper>
  );
}
