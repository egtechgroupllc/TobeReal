import React, {Suspense} from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import FindAccommodation from './components/FindAccommodation/FindAccommodation';
import Header from './components/Header';
import ContentTour from './components/ContentTour/ContentTour';

export default function HomeExploreScreen() {
  return (
    <MainWrapper>
      <Header />
      <FindAccommodation />
      <Suspense
        fallback={
          <ActivityIndicator
            size={'large'}
            color={COLORS.primary}
            style={{marginTop: scale(20)}}
          />
        }>
        {/* <ContentAccommodation /> */}
        <ContentTour />
      </Suspense>
    </MainWrapper>
  );
}
