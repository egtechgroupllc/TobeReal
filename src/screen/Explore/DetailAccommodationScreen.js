/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useCallback, useRef, useState} from 'react';
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
import DetailAccommodationLoading from './components/DetailAccommodation/DetailAccommodationLoading';
import SimilarApartmentsNearby from './components/DetailAccommodation/SimilarApartmentsNearby';
import Room from './components/DetailAccommodation/Rooms/Room';
import {useRoute} from '@react-navigation/native';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailAccommodationScreen({route}) {
  const {jsondata, title, paramPrice} = route.params;
  const params = useRoute().params;

  const listView = useRef([
    <InfoDetail name={title} data={params} />,
    <InfoUnitFacilities data={params} />,
    <Map data={params} />,
    <Room name={title} data={params} />,
    <Review data={params} />,
    <InfoAdditional data={params} />,
    <SimilarApartmentsNearby data={params} />,
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

      case dataSourceCords[4] <= offsetY && offsetY < dataSourceCords[5]:
        handleSelect(4);
        break;

      case dataSourceCords[5] <= offsetY:
        handleSelect(5);
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
            images={jsondata}
            data={params}
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
          handleSelect(3);
          selectScrollHandler({index: 3});
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
