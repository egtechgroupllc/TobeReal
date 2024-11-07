import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import Skeleton from '~/components/Skeleton';
import {COLORS, SHADOW} from '~/assets/constants';

export default function ScheduleItemLoading({style}) {
  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={{
          flexDirection: 'row',
          padding: scale(10),
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: scale(10),
            rowGap: scale(10),
          }}>
          <Skeleton
            shimmerStyle={{
              height: scale(20),
            }}
          />
          <Skeleton
            shimmerStyle={{
              height: scale(20),
            }}
          />
          <Skeleton
            shimmerStyle={{
              height: scale(20),
            }}
          />
          <Skeleton
            shimmerStyle={{
              height: scale(20),
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: scale(150),
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS.White,
    borderRadius: scale(16),
    ...SHADOW,
  },
});
