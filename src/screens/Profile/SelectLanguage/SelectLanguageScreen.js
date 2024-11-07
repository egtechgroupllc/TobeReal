import React from 'react';
import {MainWrapper} from '~/components';
import ContentLanguage from './components/ContentLanguage';
import {COLORS} from '~/assets/constants';

export default function SelectLanguageScreen() {
  return (
    <MainWrapper
      scrollEnabled={false}
      noSafeArea
      backgroundColor={COLORS.input}>
      <ContentLanguage />
    </MainWrapper>
  );
}
