/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {WIDTH, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import BookAccommodation from './components/DetailAccommodation/BookAccommodation';
import DynamicHeader from './components/DetailAccommodation/DynamicHeader';
import InfoAdditional from './components/DetailAccommodation/InfoAdditional';
import InfoDetail from './components/DetailAccommodation/InfoDetail';
import InfoUnitFacilities from './components/DetailAccommodation/InfoUnitFacilities';
import Map from './components/DetailAccommodation/Map';
import Review from './components/DetailAccommodation/Review';
import SimilarApartmentsNearby from './components/DetailAccommodation/SimilarApartmentsNearby';
const Header_Max_Height = WIDTH.heightScreen / 3.2;

const listView = [
  <InfoDetail />,
  <InfoUnitFacilities />,
  <Map />,
  <Review />,
  <InfoAdditional />,
  <SimilarApartmentsNearby />,
];

export default function DetailAccommodationScreen() {
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [indexSelect, setIndexSelect] = useState(0);
  const [isSelect, setIsSelect] = useState(false);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();

  const ItemView = (item, key) => {
    return (
      <View
        key={key}
        onLayout={e => {
          const layout = e.nativeEvent.layout;
          const heightHearBar = Header_Max_Height - scale(50);
          dataSourceCords[key] = layout.y + heightHearBar;
          setDataSourceCords(dataSourceCords);
        }}>
        {item}
      </View>
    );
  };
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
    {
      useNativeDriver: true,
      listener: event => {
        const offsetY = Math.floor(event.nativeEvent.contentOffset.y);
        if (offsetY <= dataSourceCords[0]) {
          setIndexSelect(0);
        } else if (
          dataSourceCords[0] < offsetY &&
          offsetY <= dataSourceCords[1]
        ) {
          setIndexSelect(1);
        } else if (
          dataSourceCords[1] < offsetY &&
          offsetY <= dataSourceCords[2]
        ) {
          setIndexSelect(2);
        } else if (
          dataSourceCords[2] < offsetY &&
          offsetY <= dataSourceCords[3]
        ) {
          setIndexSelect(3);
        } else if (
          dataSourceCords[3] < offsetY &&
          offsetY <= dataSourceCords[4]
        ) {
          setIndexSelect(4);
        }
      },
    },
  );
  const selectScrollHandler = async value => {
    setIsSelect(true);

    await scrollRef.current?.scrollTo({
      y: dataSourceCords[value],
      animated: true,
    });
  };

  return (
    <MainWrapper scrollEnabled={false}>
      <DynamicHeader
        scrollOffsetY={scrollOffsetY}
        onSelect={selectScrollHandler}
        indexSelect={indexSelect}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Header_Max_Height + scale(50),
          paddingBottom: tabBarHeight,
          backgroundColor: '#f1f1f1',
        }}
        onScroll={handleScroll}
        ref={scrollRef}>
        <View style={styles.content}>{listView.map(ItemView)}</View>
      </Animated.ScrollView>
      <BookAccommodation setBookHeight={setTabBarHeight} />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(10),
    marginTop: scale(-4),
    // alignItems: 'center',
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
