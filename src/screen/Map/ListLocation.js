import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';
import {WIDTH, scale} from '../../assets/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
            useNativeDriver: true,
          },
        )}
        renderItem={() => (
          <BoxPlaceItem
            seeViewNumber={1.4}
            styleWrapper={{
              height: scale(180),
            }}
          />
        )}
      />
    </View>
  );
});
