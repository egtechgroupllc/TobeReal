/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';

import {WIDTH, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import RecommendedApartments from './components/ContentAccommodation/RecommendedApartments';
import BookAccommodation from './components/DetailAccommodation/BookAccommodation';
import DynamicHeader from './components/DetailAccommodation/DynamicHeader';
import InfoAdditional from './components/DetailAccommodation/InfoAdditional';
import InfoDetail from './components/DetailAccommodation/InfoDetail';
import InfoUnitFacilities from './components/DetailAccommodation/InfoUnitFacilities';
import Introduction from './components/DetailAccommodation/Introduction';
import Map from './components/DetailAccommodation/Map';
import Review from './components/DetailAccommodation/Review';
import {useNavigation} from '@react-navigation/native';
import SimilarApartmentsNearby from './components/DetailAccommodation/SimilarApartmentsNearby';
const Header_Max_Height = WIDTH.heightScreen / 3.2;
export default function DetailAccommodationScreen() {
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <MainWrapper scrollEnabled={false}>
      <DynamicHeader scrollOffsetY={scrollOffsetY} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Header_Max_Height + scale(50),
          paddingBottom: tabBarHeight,
          backgroundColor: '#fff',
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {
            useNativeDriver: true,
          },
        )}>
        <View style={styles.content}>
          <InfoDetail />

          <Introduction />

          <InfoUnitFacilities />

          <InfoAdditional />

          <Map />

          <Review />
          <SimilarApartmentsNearby />
        </View>
      </Animated.ScrollView>
      <BookAccommodation setBookHeight={setTabBarHeight} />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(10),
    marginTop: scale(15),
    // alignItems: 'center',
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
