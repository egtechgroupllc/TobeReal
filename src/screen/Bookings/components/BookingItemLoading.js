import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '../../../components/Skeleton';
import {SHADOW, scale} from '../../../assets/constants';

export default function BookingItemLoading() {
  return (
    <View style={styles.box}>
      <Skeleton height={scale(20)} />
      <Skeleton height={scale(26)} />

      <View style={{flexDirection: 'row', columnGap: scale(30)}}>
        <Skeleton height={scale(20)} shimmerStyle={{flex: 1}} />
        <Skeleton height={scale(20)} shimmerStyle={{flex: 1}} />
      </View>
      <Skeleton height={scale(20)} shimmerStyle={{width: '60%'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FDFDFD',
    minHeight: scale(100),
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    ...SHADOW,
    rowGap: scale(10),
  },
});
