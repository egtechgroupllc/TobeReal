
import React from 'react';
import MainAuth from '../../components/MainAuth';
import Header from './components/Header';
import TabContent from './components/TabContent';


export default function NewsScreen() {
  const goBack = () => {};
  const upgrade = () => {};
  return (
    <MainAuth>
      <Header/>
      <TabContent/>
    </MainAuth>
  );
}
