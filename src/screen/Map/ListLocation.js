import {
  Animated,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import {WIDTH, images, scale} from '../../assets/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {getListRent} from '../../Model/api/apiAccom';
import {formatDate} from '../../utils/format';

export default memo(
  forwardRef(function ListLocation(
    {data = [], CARD_WIDTH, scrollOffsetX},
    ref,
  ) {
    const insets = useSafeAreaInsets();
    const flatListRef = useRef();

    useImperativeHandle(
      ref,
      () => ({
        scrollToOffset: (offset = 0) => {
          flatListRef.current?.scrollToOffset({offset: offset, animated: true});
        },
      }),
      [],
    );
    console.log();

    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          // bottom: insets.bottom,
          width: '100%',
          alignItems: 'center',
        }}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          scrollEnabled={!!data[1]}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={CARD_WIDTH + scale(18)}
          horizontal
          decelerationRate={0}
          bounces={false}
          contentContainerStyle={{
            columnGap: scale(10),
            padding: scale(20),
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollOffsetX}}}],
            {
              useNativeDriver: Platform.OS === 'android' ? true : false,
            },
          )}
          renderItem={({item, index}) => (
            <BoxPlaceItem
              key={index}
              seeViewNumber={1.4}
              styleWrapper={{
                height: scale(190),
              }}
              data={item}
              time={item.id < 6 ? true : false}
              jsonImage={item.imgdetail}
              name={item?.name}
              price={item?.price}
              type={item?.type}
            />
          )}
        />
      </View>
    );
  }),
);
