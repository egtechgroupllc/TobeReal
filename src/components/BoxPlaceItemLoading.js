import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';
import {scale} from '~/utils/scale';
import {SHADOW} from '~/assets/constants';

export default function BoxPlaceItemLoading({style}) {
  return (
    <View style={[styles.wrapper, style]}>
      <Skeleton shimmerStyle={styles.img} />
      <View
        style={{
          marginTop: scale(14),
          paddingHorizontal: scale(10),
        }}>
        <View
          style={{
            marginTop: scale(16),
          }}>
          <View
            style={{
              rowGap: scale(8),
              alignItems: 'center',
            }}>
            <Skeleton
              shimmerStyle={{
                height: scale(16),
                width: scale(130),
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
    width: '100%',
    height: scale(270),
    backgroundColor: '#fff',
    borderRadius: 12,
    ...SHADOW,
  },
  img: {
    height: '50%',
    borderRadius: 0,
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
});
