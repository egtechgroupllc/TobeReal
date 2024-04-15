/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

import {useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {scale, WIDTH} from '../../../../assets/constants';
import MainWrapper from '../../../../components/MainWrapper';
import {useLanguage} from '../../../../hooks/useLanguage';
import DetailAccommoMap from '../DetailAccommodation/DetailAccommoMap';
import DynamicHeader from '../DetailAccommodation/DynamicHeader';
import ConfigDetail from './ConfigDetail';
import BookAccommodation from './DetailBuy/BookAccommodation';
import ContactInfo from './DetailBuy/ContactInfo';
import DetailAccommodationLoading from './DetailBuy/DetailAccommodationLoading';
import InfoDetail from './DetailBuy/InfoDetail';

import SimilarApartmentsNearby from './DetailBuy/SimilarApartmentsNearby';
import Review from '../ContentTour/DetailTour/Review';

const Header_Max_Height = WIDTH.heightScreen / 3;

export default function DetailBuyScreen({route}) {
  const {jsondata, title, paramPrice} = {jsondata, title, paramPrice};
  const params = useRoute().params;
  const {t} = useLanguage();

  const listView = useRef([
    <InfoDetail data={params} />,
    <DetailAccommoMap data={params} />,
    <Review />,
    <View>
      <ContactInfo data={params} />
      <ConfigDetail data={params} />
    </View>,
    <SimilarApartmentsNearby
      name={title}
      image={jsondata || []}
      price={paramPrice}
    />,
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
            data={params}
            listNav={[
              {
                text: t('detail'),
              },
              {
                text: t('location'),
              },
              {
                text: t('reviews'),
              },
              {
                text: t('info'),
              },
              {
                text: t('others'),
              },
            ]}
          />

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: Header_Max_Height + scale(50),
              paddingBottom: tabBarHeight,
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
