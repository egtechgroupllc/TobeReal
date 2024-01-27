import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './components/Header';
import FindAccommodation from './components/FindAccommodation/FindAccommodation';
import {WIDTH, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import ContentAccommodation from './components/ContentAccommodation/ContentAccommodation';

export default function HomeExploreScreen() {
  return (
    <MainWrapper>
      <Header />
      <FindAccommodation />
      {/* <ContentAccommodation /> */}
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: WIDTH.widthContain,
    alignSelf: 'center',
    flex: 1,
    maxWidth: scale(400),
  },
});
