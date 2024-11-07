import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import Skeleton from '~/components/Skeleton';
import {COLORS, SHADOW} from '~/assets/constants';

export default function TimeItemLoading({style}) {
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
            rowGap: scale(5),
          }}>
          <Skeleton
            shimmerStyle={{
              height: scale(15),
              width: scale(80),
            }}
          />
          <Skeleton
            shimmerStyle={{
              height: scale(15),
              width: scale(80),
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: scale(10),
    width: scale(105),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
    borderRadius: scale(10),
    ...SHADOW,
  },
});
