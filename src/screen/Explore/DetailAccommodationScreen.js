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
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailAccommodationScreen({route}) {
  const {jsondata, title} = route.params;

  const listView = [
    <InfoDetail name={title} />,
    <InfoUnitFacilities />,
    <Map />,
    <Review />,
    <InfoAdditional />,
    // <SimilarApartmentsNearby />,
  ];

  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [indexSelect, setIndexSelect] = useState(0);
  const [isSelect, setIsSelect] = useState(true);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
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

  const moveNavigateBar = offsetY => {
    console.log(indexSelect);
    switch (true) {
      case offsetY < dataSourceCords[1]:
        setIndexSelect(0);
        break;
      case dataSourceCords[1] <= offsetY && offsetY < dataSourceCords[2]:
        setIndexSelect(1);
        break;
      case dataSourceCords[2] <= offsetY && offsetY < dataSourceCords[3]:
        setIndexSelect(2);
        break;
      case dataSourceCords[3] <= offsetY && offsetY < dataSourceCords[4]:
        setIndexSelect(3);
        break;
      case dataSourceCords[4] <= offsetY:
        setIndexSelect(4);
        break;
    }
  };

  const selectScrollHandler = value => {
    setIsSelect(false);

    scrollRef.current?.scrollTo({
      y: dataSourceCords[value],
      animated: true,
    });

    setTimeout(() => {
      setIsSelect(true);
    }, 500);
  };

  return (
    <MainWrapper scrollEnabled={false}>
      <DynamicHeader
        scrollOffsetY={scrollOffsetY}
        onSelect={selectScrollHandler}
        indexSelect={indexSelect}
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
});
