import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '../../../../../components/Skeleton';
import {scale} from '../../../../../assets/constants';

export default function ItemHistoryTransLoading({isBackground}) {
  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isBackground ? '#fff' : '#f6fdff',
      }}>
      <Skeleton shimmerStyle={styles.boxImg} resizeMode="contain" />

      <View
        style={{
          rowGap: scale(4),
          flex: 1,
        }}>
        <Skeleton height={scale(20)} />
        <Skeleton
          height={scale(8)}
          shimmerStyle={{
            width: '40%',
          }}
        />

        <Skeleton
          height={scale(8)}
          shimmerStyle={{
            width: '60%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(10),
    padding: scale(10),
  },
  boxImg: {
    width: scale(40),
    aspectRatio: 1,
  },
});
