/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useCallback, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import InfoDetail from './DetailTour/InfoDetail';
import Map from './DetailTour/Map';
import Review from './DetailTour/Review';
import DetailAccommodationLoading from './DetailTour/DetailAccommodationLoading';
import MainWrapper from '../../../../components/MainWrapper';
import BookAccommodation from './DetailTour/BookAccommodation';
import DynamicHeader from './DetailTour/DynamicHeader';
import { scale,WIDTH } from '../../../../assets/constants';
import TourSchedule from './DetailTour/TourSchedule';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailTourScreen({route}) {
  const {jsondata, title, paramPrice} = route.params;
  const listView = useRef([
    <InfoDetail name={title} />,
    // <InfoUnitFacilities />,
    <Map />,
    <Review />,
    <TourSchedule/>
    // <InfoAdditional />,
    // <SimilarApartmentsNearby />,
  ]).current;

  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [isSelect, setIsSelect] = useState(true);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
  const dynamicHeaderRef = useRef();
  const timeoutRef = useRef(null);

  const ItemView = (item, key) => {
    return (
      <View
        key={key}
        onLayout={e => {
          const layout = e.nativeEvent.layout;
          const heightHearBar = Header_Max_Height - 50;
          dataSourceCords[key] = Math.round(layout.y + heightHearBar);
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

        if (isSelect) moveNavigateBar(offsetY);
      },
    },
  );

  const handleSelect = useCallback(value => {
    dynamicHeaderRef.current?.setSelect(value);
  }, []);

  const moveNavigateBar = offsetY => {
    switch (true) {
      case offsetY < dataSourceCords[1]:
        handleSelect(0);
        break;

      case dataSourceCords[1] <= offsetY && offsetY < dataSourceCords[2]:
        handleSelect(1);
        break;

      case dataSourceCords[2] <= offsetY && offsetY < dataSourceCords[3]:
        handleSelect(2);
        break;

      case dataSourceCords[3] <= offsetY && offsetY < dataSourceCords[4]:
        handleSelect(3);
        break;

      case dataSourceCords[4] <= offsetY:
        handleSelect(4);
        break;
    }
  };

  const selectScrollHandler = useCallback(value => {
    setIsSelect(false);

    scrollRef.current?.scrollTo({
      y: dataSourceCords[value?.index],
      animated: true,
    });

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSelect(true);
    }, 500);
  }, []);

  return (
    <MainWrapper scrollEnabled={false}>
      {true ? (
        <>
          <DynamicHeader
            ref={dynamicHeaderRef}
            scrollOffsetY={scrollOffsetY}
            onSelect={selectScrollHandler}
            image={jsondata}
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
        </>
      ) : (
        <DetailAccommodationLoading heightHeader={Header_Max_Height} />
      )}

      <BookAccommodation
        setBookHeight={setTabBarHeight}
        price={paramPrice}
        isLoading={false}
        onPress={() => {
          handleSelect(0);
          selectScrollHandler({index: 0});
        }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(10),
    marginTop: scale(-4),
    // alignItems: 'center',
  },
});
