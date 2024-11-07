import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import Skeleton from '~/components/Skeleton';
import {COLORS, SHADOW} from '~/assets/constants';

export default function ItemLoading({style}) {
  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: scale(20),
        }}>
        <View
          style={{
            rowGap: scale(5),
            flexDirection: 'row',
            columnGap: scale(10),
          }}>
          <Skeleton
            shimmerStyle={{
              height: scale(100),
              width: scale(100),
              borderRadius: scale(99),
            }}
          />
          <View
            style={{
              rowGap: scale(10),
            }}>
            <Skeleton
              shimmerStyle={{
                height: scale(15),
                width: scale(120),
              }}
            />
            <Skeleton
              shimmerStyle={{
                height: scale(15),
                width: scale(120),
              }}
            />
            <Skeleton
              shimmerStyle={{
                height: scale(15),
                width: scale(120),
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: scale(10),
    width: '100%',
    height: scale(140),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
    borderRadius: scale(10),
    ...SHADOW,
  },
});
