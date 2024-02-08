import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import {WIDTH, images, scale} from '../../assets/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const dataFa = [
  {
    id: 1,
    src: images.c15,
    name: 'C15_05_BlockC Emerald',
    price: 25000000,
    imgdetail: [
      images.c15_1,
      images.c15_2,
      images.c15_3,
      images.c15_4,
      images.c15_5,
      images.c15_6,
    ],
  },
  {
    id: 2,
    src: images.c16,
    name: 'D11.06 Emerald',
    price: 16000000,
    imgdetail: [
      images.c16_1,
      images.c16_2,
      images.c16_3,
      images.c16_4,
      images.c16_5,
      images.c16_6,
      images.c16_7,
      images.c16_8,
      images.c16_9,
    ],
  },
  {
    id: 3,
    src: images.p14,
    name: 'P14.07 Diamond',
    price: 28000000,
    imgdetail: [
      images.p14_1,
      images.p14_2,
      images.p14_3,
      images.p14_4,
      images.p14_5,
      images.p14_6,
      images.p14_7,
      images.p14_8,
    ],
  },
  {
    id: 4,
    src: images.q10,
    name: 'Centrosa Garden Q.10',
    price: 26000000,
    imgdetail: [
      images.q10_1,
      images.q10_2,
      images.q10_3,
      images.q10_4,
      images.q10_5,
      images.q10_6,
    ],
  },
  {
    id: 5,
    src: images.a6,
    name: 'A6.7.08 Diamod Alanta Plus',
    price: 18000000,
    imgdetail: [
      images.a6_1,
      images.a6_2,
      images.a6_3,
      images.a6_4,
      images.a6_5,
      images.a6_6,
    ],
  },
];
export default forwardRef(function ListLocation(
  {data = [], CARD_WIDTH, scrollOffsetX},
  ref,
) {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef();

  useImperativeHandle(ref, () => ({
    scrollToOffset: (offset = 0) => {
      flatListRef.current?.scrollToOffset({offset: offset, animated: true});
    },
  }));

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
        data={dataFa}
        scrollEnabled={!!dataFa[1]}
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
            useNativeDriver: true,
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
          />
        )}
      />
    </View>
  );
});
