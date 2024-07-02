import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import MainAuth from '../../../components/MainAuth';
import Content from './components/Content';
import MainWrapper from '../../../components/MainWrapper';
import {useNavigation} from '@react-navigation/native';
import {useLanguage} from '../../../hooks/useLanguage';

export default function ChangePasswordScreen() {
  return (
    <MainWrapper noImgColor>
      <Content />
    </MainWrapper>
  );
}
