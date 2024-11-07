/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {Animated, Share, StyleSheet, View} from 'react-native';

import OptionHeader from './OptionHeader';
import {scale} from '~/utils/scale';
import {COLORS, SIZES, WIDTH} from '~/assets/constants';

const Header_Max_Height = WIDTH.heightScreen / 3;
const Header_Min_Height = scale(50);
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

export default React.memo(
  forwardRef(function DynamicHeader(
    {scrollOffsetY, onSelect, data, listNav},
    ref,
  ) {
    const {goBack} = useNavigation();
    const listInfo = useMemo(() => listNav, [listNav]);

    const animatedTranslateY = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [0, -Scroll_Distance],
      extrapolate: 'clamp',
    });
    const animatedOpacityImg = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const animatedOpacityText = scrollOffsetY.interpolate({
      inputRange: [Scroll_Distance / 2, Scroll_Distance],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const animatedBackgroundHeader = scrollOffsetY.interpolate({
      inputRange: [-1, 0, Scroll_Distance, Scroll_Distance + 1],
      outputRange: [
        'transparent',
        'transparent',
        COLORS.primary,
        COLORS.primary,
      ],
      extrapolate: 'clamp',
    });

    const [indexSelect, setIndexSelect] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        setSelect: value => {
          setIndexSelect(value);
        },
      }),
      [indexSelect],
    );

    return (
      <>
        {/* Header */}

        {/* Image */}

        <Animated.View
          style={
            [
              // {
              //   transform: [
              //     {
              //       translateY: animatedTranslateY,
              //     },
              //   ],
              //   zIndex: 1,
              //   width: '100%',
              // },
            ]
          }>
          <OptionHeader
            isShaDow
            styleContent={{
              columnGap: scale(8),
            }}
            selectIndex={indexSelect}
            styleWrapper={{
              flex: 0,
              height: scale(46),
            }}
            data={listInfo}
            onSelect={onSelect}
          />
        </Animated.View>
      </>
    );
  }),
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.primary,
    position: 'absolute',
    paddingHorizontal: scale(16),
    // paddingVertical: scale(10),
    zIndex: 999,
    columnGap: scale(10),
  },
  menu: {
    width: scale(30),
    height: scale(30),
    backgroundColor: '#fff',
  },
  textName: {
    fontSize: SIZES.medium,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
});
