import React from 'react';
import MainWrapper from '../../components/MainWrapper';
import Header from './components/Header';
import TabContent from './components/TabContent';

export default function NewsScreen() {
  return (
    <MainWrapper>
      <Header />
      <TabContent />
    </MainWrapper>
  );
}
