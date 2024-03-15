import React from 'react';
import MainWrapper from '../../../components/MainWrapper';
import ContentLanguage from './components/ContentLanguage';

export default function SelectLanguageScreen() {
  return (
    <MainWrapper scrollEnabled={false} noSafeArea>
      <ContentLanguage />
    </MainWrapper>
  );
}
