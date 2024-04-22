/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {getDetailAccmo} from '../../Model/api/apiAccom';
import {WIDTH, scale} from '../../assets/constants';
import MainWrapper from '../../components/MainWrapper';
import AccommoPolicy from './components/DetailAccommodation/Detail/AccommoPolicy';
import BookAccommodation from './components/DetailAccommodation/Detail/BookAccommodation';
import DetailAccommoMap from './components/DetailAccommodation/Detail/DetailAccommoMap';
import DetailAccommodationLoading from './components/DetailAccommodation/Detail/DetailAccommodationLoading';
import DynamicHeader from './components/DetailAccommodation/Detail/DynamicHeader';
import InfoDetail from './components/DetailAccommodation/Detail/InfoDetail';
import InfoUnitFacilities from './components/DetailAccommodation/Detail/InfoUnitFacilities';
import Review from './components/DetailAccommodation/Detail/Review';
import SimilarApartmentsNearby from './components/DetailAccommodation/Detail/SimilarApartmentsNearby';
import TimeCheckInOut from './components/DetailAccommodation/Detail/TimeCheckInOut';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailAccommodationScreen({route}) {
  const params = useRoute().params;

  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [isSelect, setIsSelect] = useState(true);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();
  const dynamicHeaderRef = useRef();
  const timeoutRef = useRef(null);

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

  const {data, isLoading} = useQuery({
    queryKey: ['accommodation', 'detail', params?.id],
    queryFn: () => getDetailAccmo(params?.id),
  });
  const listView = useMemo(() => {
    const dataDetail = data?.data;

    return !dataDetail
      ? []
      : [
          <InfoDetail data={dataDetail} />,
          <InfoUnitFacilities data={dataDetail} />,
          <View style={{rowGap: scale(8)}}>
            <DetailAccommoMap data={dataDetail} />
            <TimeCheckInOut data={dataDetail} />
          </View>,
          <Review dataP={dataDetail} />,
          <AccommoPolicy data={dataDetail} />,
          <SimilarApartmentsNearby data={dataDetail} />,
        ];
  }, [data?.data]);

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

  return (
    <MainWrapper scrollEnabled={false}>
      {!isLoading ? (
        <>
          <DynamicHeader
            ref={dynamicHeaderRef}
            scrollOffsetY={scrollOffsetY}
            onSelect={selectScrollHandler}
            data={data?.data}
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
        isLoading={false}
        data={data?.data}
        // onPress={() => {
        //   handleSelect(3);
        //   selectScrollHandler({index: 3});
        // }}
      />
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(8),
    marginTop: scale(-4),
    // alignItems: 'center',
  },
});
