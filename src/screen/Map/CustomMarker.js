import React, {memo} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {IconMarker} from '../../assets/icon/Icon';
import {COLORS, FONTS, SIZES, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import {formatPrice} from '../../utils/format';

const CustomMarker = ({scaleValue, data}) => {
  const scaleStyle = {
    transform: [
      {
        scale: scaleValue?.scale,
      },
    ],
  };

  const price = data?.rooms?.[0]?.room_dates?.[0]?.price;
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
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(5),
          width: '100%',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            backgroundColor: scaleValue?.backgroundColor,
            paddingHorizontal: scale(6),
            paddingVertical: scale(4),
            borderRadius: 10,
            marginBottom: scale(-12),
            maxWidth: scale(140),
            borderWidth: 1,
            borderColor: COLORS.primary,
            justifyContent: 'center',
          }}>
          <Animated.Text
            numberOfLines={1}
            textType="bold"
            style={{
              fontSize: SIZES.xMedium,
              color: scaleValue?.color,
              fontFamily: FONTS.semiBold,
            }}>
            {data?.accommodation_type?.name}
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            backgroundColor: scaleValue?.backgroundColor,
            paddingHorizontal: scale(6),
            paddingVertical: scale(4),
            borderRadius: 10,
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
            {formatPrice(price)}
          </Animated.Text>
        </Animated.View>
      </View>

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

export default memo(CustomMarker);
