import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import {Animated, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from '../../assets/constants';
import BoxPlaceItem from '../Explore/components/ContentAccommodation/BoxPlaceItem';

export default memo(
  forwardRef(function ListLocation(
    {data = [], CARD_WIDTH, scrollOffsetX},
    ref,
  ) {
    const flatListRef = useRef();

    useImperativeHandle(
      ref,
      () => ({
        scrollToOffset: (offset = 0, isClick = false) => {
          flatListRef.current?.scrollToOffset({
            offset: offset,
            animated: !isClick,
          });
        },
      }),
      [],
    );

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
              useNativeDriver: false,
            },
          )}
          renderItem={({item, index}) => (
            <BoxPlaceItem
              key={index}
              // seeViewNumber={1.4}
              // styleWrapper={{
              //   height: scale(190),
              // }}
              // data={item}
              // time={item.id < 6 ? true : false}
              isHeart
              isDiscount
              isStar
              isRating
              rating={3}
              data={item}
              seeViewNumber={1.4}
              isViewMap
            />
          )}
        />
      </View>
    );
  }),
);
