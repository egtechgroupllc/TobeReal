import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {IconMarker} from '../../assets/icon/Icon';
import {COLORS, FONTS, SIZES, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import {formatPrice} from '../../utils/format';

const CustomMarker = ({scaleValue, data}) => {
  console.log(scaleValue === 0.7, scaleValue);
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
          height: scale(150),
          alignItems: 'center',
        },
        scaleValue && scaleStyle,
      ]}>
      <Animated.View
        style={{
          backgroundColor: scaleValue?.backgroundColor,
          paddingHorizontal: scale(6),
          paddingVertical: scale(4),
          borderRadius: 99,
          marginBottom: scale(-12),
          maxWidth: scale(140),
          borderWidth: 1,
          borderColor: scaleValue?.color,
        }}>
        <Animated.Text
          numberOfLines={1}
          textType="bold"
          style={{
            fontSize: SIZES.medium,
            color: scaleValue?.color,
            fontFamily: FONTS.semiBold,
          }}>
          {formatPrice(data?.price)}
        </Animated.Text>
      </Animated.View>
      <IconMarker
        style={{
          width: '100%',
          height: '90%',
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

export default CustomMarker;
