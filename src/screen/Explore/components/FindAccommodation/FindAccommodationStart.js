import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '../../../../components/Skeleton';
import {scale} from '../../../../assets/constants';

export default function FindAccommodationStart() {
  return (
    <View
      style={{
        paddingHorizontal: scale(12),
        rowGap: scale(12),
        backgroundColor: '#fff',
        paddingVertical: scale(12),
        borderRadius: scale(6),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          paddingHorizontal: scale(20),
        }}>
        {[...Array(3)].map((item, index) => (
          <Skeleton
            key={index}
            shimmerStyle={{
              height: scale(36),
              flex: 1,
            }}
          />
        ))}
      </View>

      <Skeleton height={scale(36)} />
      <Skeleton height={scale(36)} />
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
        }}>
        <Skeleton
          shimmerStyle={{
            height: scale(36),
            width: scale(140),
          }}
        />
        {[...Array(3)].map((item, index) => (
          <Skeleton
            key={index}
            shimmerStyle={{
              height: scale(36),
              flex: 1,
            }}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
        }}>
        {[...Array(3)].map((item, index) => (
          <Skeleton
            key={index}
            shimmerStyle={{
              height: scale(36),
              flex: 1,
            }}
          />
        ))}
      </View>
      <Skeleton height={scale(40)} />
    </View>
  );
}

const styles = StyleSheet.create({});
