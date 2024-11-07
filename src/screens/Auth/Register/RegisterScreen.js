import React from 'react';
import MainAuth from '../components/MainAuth';
import {useLanguage} from '~/hooks/useLanguage';
import {scale} from '~/utils/scale';
import Content from './components/Content';
import {MainWrapper} from '~/components';
import {images} from '~/assets/constants';

export default function RegisterScreen() {
  return (
    <MainWrapper sourceImage={images.background} noBackgroundColor>
      <Content />
    </MainWrapper>
  );
}
