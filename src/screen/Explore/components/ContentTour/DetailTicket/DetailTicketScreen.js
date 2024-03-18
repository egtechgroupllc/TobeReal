/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useCallback, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';


import DetailAccommodationLoading from '../DetailTour/DetailAccommodationLoading';
import MainWrapper from '../../../../../components/MainWrapper';


import { scale,WIDTH } from '../../../../../assets/constants';
import InfoDetail from './components/InfoDetail';
import GeneralInformation from './components/GeneralInformation';
import BookAccommodation from './components/BookAccommodation';
import DynamicHeader from './components/DynamicHeader';
import { StackActions, useNavigation } from '@react-navigation/native';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailTicketScreen({route}) {
  const { isFocused, dispatch} = useNavigation();
  const {jsondata, title, paramPrice} = route.params;
  const booktour = () => {
    if (isFocused()) {
      dispatch(
        StackActions.push('NoBottomTab', {
          screen: 'BookTourScreen',
          params: {
            jsondata: jsondata || [],
            title: title || '',
            paramPrice: paramPrice || '',
          },
        }),
      );
    }
  };
  const listView = useRef([
    <InfoDetail name={title} />,
    <GeneralInformation/>
    // <InfoUnitFacilities />,
    // <Map />,
    // <Review />,
    // <TourSchedule/>
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
      y: dataSourceCords[value],
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
        onPress = {booktour}
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
