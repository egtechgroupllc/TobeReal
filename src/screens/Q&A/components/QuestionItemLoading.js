import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '~/components/Skeleton';
import {scale} from '~/utils/scale';
import {COLORS, SHADOW} from '~/assets/constants';

export default function QuestionItemLoading({style}) {
  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={{
          flexDirection: 'row',
          padding: scale(10),
        }}>
        <Skeleton shimmerStyle={styles.img} />
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: scale(150),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.White,
    borderRadius: scale(16),
    ...SHADOW,
  },
  img: {
    height: scale(120),
    width: scale(100),
    borderRadius: scale(10),
  },
});
