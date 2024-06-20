import React, {memo, useEffect, useMemo, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {IconMarker, IconMarkerRent} from '../../assets/icon/Icon';
import {COLORS, FONTS, SIZES, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';
import {formatPrice} from '../../utils/format';
import {useCountry} from '../../hooks/useCountry';

const CustomMarker = ({scaleValue, data, markerFocus, checkFilter}) => {
  const {currency} = useCountry();
  const scaleStyle = {
    transform: [
      {
        scale: scaleValue?.scale,
      },
    ],
  };

  const priceFinal = useMemo(() => {
    const resultPri = data?.rooms?.map(element => {
      const result = element?.room_dates.map(room => {
        return room?.price_final;
      });

      return Math.min(...result);
    });
    return Math.min(...resultPri);
  }, [data?.rooms]);

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
      <View
        style={{
          flexDirection: 'row',
          // columnGap: scale(5),
          paddingBottom: checkFilter && scale(40),
          width: '100%',
          justifyContent: 'center',
        }}>
        {checkFilter && (
          <View
            style={{
              borderWidth: 10,
              borderColor: '#00000000',
              position: 'absolute',
              bottom: 8,
              zIndex: 99,
              borderTopColor: markerFocus ? COLORS.primary : COLORS.white,
            }}
          />
        )}
        {!checkFilter && (
          <Animated.View
            style={{
              backgroundColor: markerFocus ? COLORS.primary : COLORS.white,
              paddingHorizontal: scale(6),
              paddingVertical: scale(4),
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              marginBottom: scale(-12),
              maxWidth: scale(140),
              borderWidth: 1,
              borderColor: markerFocus ? COLORS.white : COLORS.primary,
              justifyContent: 'center',
            }}>
            <Animated.Text
              numberOfLines={1}
              textType="bold"
              style={{
                fontSize: SIZES.large,
                color: markerFocus ? COLORS.white : COLORS.primary,
                fontFamily: FONTS.semiBold,
              }}>
              {data?.accommodation_type?.name || data?.estate_type?.name}
            </Animated.Text>
          </Animated.View>
        )}

        <Animated.View
          style={{
            backgroundColor: markerFocus ? COLORS.primary : COLORS.white,
            paddingHorizontal: scale(6),
            paddingVertical: scale(4),
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: checkFilter ? 10 : 0,
            borderBottomLeftRadius: checkFilter ? 10 : 0,
            marginBottom: scale(-12),
            maxWidth: scale(140),
            borderWidth: 1,
            borderColor: markerFocus ? COLORS.white : COLORS.primary,
          }}>
          <Animated.Text
            numberOfLines={1}
            textType="bold"
            style={{
              fontSize: SIZES.large,
              color: markerFocus ? COLORS.white : COLORS.primary,
              fontFamily: FONTS.semiBold,
            }}>
            {formatPrice(priceFinal || data?.price, {
              currency: currency?.currency_code,
            })}
          </Animated.Text>
        </Animated.View>
      </View>
      {!checkFilter && (
        <IconMarkerRent
          style={{
            width: '100%',
            height: '82%',
            transform: [
              {
                scale: 0.7,
              },
            ],
          }}
        />
      )}
    </Animated.View>
  );
};

export default memo(CustomMarker);
