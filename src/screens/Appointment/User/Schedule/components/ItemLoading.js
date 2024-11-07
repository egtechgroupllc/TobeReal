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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            rowGap: scale(10),
          }}>
          <Skeleton
            shimmerStyle={{
              height: scale(80),
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
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: scale(170),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
    borderRadius: scale(10),
    ...SHADOW,
  },
});
