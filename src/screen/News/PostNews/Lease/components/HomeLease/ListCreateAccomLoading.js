import React from 'react';
import {View} from 'react-native';
import {COLORS, SHADOW, scale} from '../../../../../../assets/constants';
import Skeleton from '../../../../../../components/Skeleton';

export default function ListCreateAccomLoading({data}) {
  return (
    <View
      style={{
        width: scale(400 / 1.4),
        height: scale(150),
        borderRadius: scale(10),
        overflow: 'hidden',
      }}>
      <Skeleton />
      <View
        style={{
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          padding: scale(8),
          marginTop: 'auto',
          columnGap: scale(10),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Skeleton height={scale(20)} style={{flex: 1}} />
        <Skeleton height={scale(16)} width={scale(80)} />
      </View>
    </View>
  );
}
