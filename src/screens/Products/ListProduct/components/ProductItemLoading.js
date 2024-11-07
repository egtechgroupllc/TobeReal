import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOW} from '~/assets/constants';
import {scale} from '~/utils/scale';
import Skeleton from '~/components/Skeleton';

export default function ProductItemLoading({style, otherSke}) {
  return (
    <View style={[styles.wrapper, style]}>
      <Skeleton shimmerStyle={styles.img} />
      <View
        style={{
          marginTop: scale(14),
          paddingHorizontal: scale(10),
          rowGap: scale(20),
        }}>
        <Skeleton
          shimmerStyle={{
            height: scale(20),
          }}
        />
        {otherSke && (
          <>
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
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: scale(140),
    backgroundColor: COLORS.White,
    width: scale(140),
    borderRadius: scale(16),
    ...SHADOW,
  },
  img: {
    height: '50%',
    borderRadius: 0,
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
});
