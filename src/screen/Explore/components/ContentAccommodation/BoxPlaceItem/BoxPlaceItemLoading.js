import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '../../../../../components/Skeleton';
import {SHADOW, scale} from '../../../../../assets/constants';

export default function BoxPlaceItemLoading({
  style,
  multiPrice,
  isUnitAvailable,
}) {
  return (
    <View style={[styles.wrapper, multiPrice && {height: scale(290)}, style]}>
      <Skeleton shimmerStyle={styles.img} />
      <View
        style={{
          marginTop: scale(14),
          paddingHorizontal: scale(10),
        }}>
        <Skeleton
          shimmerStyle={{
            height: scale(20),
          }}
        />
        <View
          style={{
            marginTop: scale(14),
            flexDirection: !multiPrice ? 'column' : 'row',
          }}>
          <View
            style={{
              rowGap: scale(8),
            }}>
            <Skeleton
              shimmerStyle={{
                height: scale(12),
                width: multiPrice ? '60%' : '100%',
              }}
            />
            <Skeleton
              shimmerStyle={{
                height: scale(12),
                width: '60%',
              }}
            />
            {multiPrice && (
              <Skeleton
                shimmerStyle={{
                  height: scale(12),
                  width: '60%',
                }}
              />
            )}
          </View>

          {isUnitAvailable && (
            <View>
              <Skeleton
                shimmerStyle={{
                  height: scale(40),
                  aspectRatio: 1,
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: scale(236),
    backgroundColor: '#fff',
    borderRadius: 12,
    ...SHADOW,
  },
  img: {
    height: '60%',
    borderRadius: 0,
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
  },
});
