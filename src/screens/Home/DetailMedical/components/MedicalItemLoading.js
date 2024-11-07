import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '~/components/Skeleton';
import {scale} from '~/utils/scale';
import {COLORS, SHADOW} from '~/assets/constants';

export default function MedicalItemLoading({style}) {
  return (
    <View style={[styles.wrapper, style]}>
      <Skeleton
        shimmerStyle={styles.img}
        shimmerContainerProps={{
          backgroundColor: COLORS.whiteLight,
        }}
      />
      <View
        style={{
          marginTop: scale(5),
        }}>
        <View
          style={{
            rowGap: scale(8),
            alignItems: 'center',
          }}>
          <Skeleton
            shimmerContainerProps={{
              backgroundColor: COLORS.whiteLight,
            }}
            shimmerStyle={{
              height: scale(16),
              width: '40%',
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 12,
    ...SHADOW,
    alignItems: 'center',
  },
  img: {
    height: '60%',
    aspectRatio: 1,
    borderRadius: scale(99),
  },
});
