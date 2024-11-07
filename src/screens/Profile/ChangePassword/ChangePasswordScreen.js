import React from 'react';
import MainWrapper from '../../../components/MainWrapper';
import Content from './components/Content';
import {images} from '~/assets/constants';

export default function ChangePasswordScreen() {
  return (
    <MainWrapper
      noImgColor
      sourceImage={images.backgroundHome}
      scrollEnabled={false}>
      <Content />
    </MainWrapper>
  );
}
