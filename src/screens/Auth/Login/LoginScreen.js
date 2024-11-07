import React from 'react';
import {useLanguage} from '../../../hooks/useLanguage';
import MainAuth from '../components/MainAuth';
import Content from './components/Content';
import {useRoute} from '@react-navigation/native';
import {MainWrapper} from '~/components';
import {images} from '~/assets/constants';

export default function LoginScreen() {
  const {t} = useLanguage();

  return (
    <MainWrapper
      sourceImage={images.background}
      noBackgroundColor
      scrollEnabled={false}>
      <Content />
    </MainWrapper>
  );
}
