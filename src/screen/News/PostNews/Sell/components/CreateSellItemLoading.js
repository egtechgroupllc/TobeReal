import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SHADOW, scale} from '../../../../../assets/constants';
import Skeleton from '../../../../../components/Skeleton';

export default function CreateSellItemLoading() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <Skeleton style={styles.img} />
        <Skeleton style={{flex: 1}} height={scale(26)} />
      </View>

      <View style={{flexDirection: 'row', columnGap: scale(20)}}>
        <Skeleton height={scale(50)} width={scale(80)} />
        <Skeleton height={scale(50)} width={scale(80)} />
        <Skeleton height={scale(50)} width={scale(80)} />
      </View>

      <Skeleton style={{width: '80%'}} height={scale(20)} />

      <Skeleton style={{flex: 1}} height={scale(20)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    rowGap: scale(10),
    backgroundColor: '#fff',
    padding: scale(10),
    borderRadius: scale(6),
    ...SHADOW,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: scale(10),
  },
  img: {
    height: scale(90),
    width: scale(120),
  },
});
