import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import DynamicHeader from './DetailAccommodation/Detail/DynamicHeader';

import DetailAccommodationLoading from './DetailAccommodation/Detail/DetailAccommodationLoading';
import {WIDTH, scale} from '../../../assets/constants';
import BookAccommodation from './BookAccommodation';
const Header_Max_Height = WIDTH.heightScreen / 3;

export default function AnimateScrollWrapper({
  lisViewComponent = [],
  listNav = [{text: ''}],
  dataDetail,
  ContentBookComponent,
  isLoading,
}) {
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [isSelect, setIsSelect] = useState(true);
  const [tabBarHeight, setTabBarHeight] = useState(0);

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
    const navItemCount = listNav.length - 1;

    for (let i = 0; i < navItemCount; i++) {
      if (offsetY < dataSourceCords[i + 1]) {
        handleSelect(i);
        break;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <>
      {!isLoading ? (
        <>
          <DynamicHeader
            ref={dynamicHeaderRef}
            scrollOffsetY={scrollOffsetY}
            onSelect={selectScrollHandler}
            data={dataDetail}
            listNav={listNav}
          />

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: Header_Max_Height + scale(50),
              paddingBottom: tabBarHeight,
            }}
            onScroll={handleScroll}
            ref={scrollRef}>
            <View style={styles.content}>{lisViewComponent.map(ItemView)}</View>
          </Animated.ScrollView>
        </>
      ) : (
        <DetailAccommodationLoading heightHeader={Header_Max_Height} />
      )}
      <BookAccommodation
        setBookHeight={setTabBarHeight}
        isLoading={false}
        ContentComponent={ContentBookComponent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    rowGap: scale(8),
    marginTop: scale(-4),
    // alignItems: 'center',
  },
});
