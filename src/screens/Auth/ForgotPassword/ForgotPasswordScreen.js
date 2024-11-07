import React from 'react';
import MainAuth from '../components/MainAuth';
import Content from './components/Content';
import {MainWrapper} from '~/components';
import {images} from '~/assets/constants';

export default function ForgotPasswordScreen() {
  return (
    <MainWrapper sourceImage={images.background} noBackgroundColor>
      <Content />
    </MainWrapper>
  );
}
