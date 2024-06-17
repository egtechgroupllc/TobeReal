import React, {memo, useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {IconMarker, IconMarkerRent} from '../../assets/icon/Icon';
import {COLORS, FONTS, SIZES, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import {formatPrice} from '../../utils/format';
import {useCountry} from '../../hooks/useCountry';
import CustomImage from '../../components/CustomImage';

const MarkerLocate = ({scaleValue, data, markerFocus, checkFilter}) => {
  const {currency} = useCountry();
  const scaleStyle = {
    transform: [
      {
        scale: scaleValue?.scale,
      },
    ],
  };

  return (
    <Animated.View
      style={[
        {
          minWidth: scale(150),
          height: !checkFilter ? scale(150) : '',
          alignItems: 'center',
          // backgroundColor: '#000',
        },
        scaleValue && scaleStyle,
      ]}>
      <CustomImage
        source={{uri: data?.icon}}
        style={{
          width: '25%',
          height: '25%',
          transform: [
            {
              scale: 0.7,
            },
          ],
        }}
      />
    </Animated.View>
  );
};

export default memo(MarkerLocate);
