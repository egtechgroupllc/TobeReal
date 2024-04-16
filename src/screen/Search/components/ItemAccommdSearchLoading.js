import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../assets/constants';
import Skeleton from '../../../components/Skeleton';

export default function ItemAccommdSearchLoading() {
  return (
    <View style={styles.wrapper}>
      <Skeleton style={styles.img} />
      <View
        style={{
          marginTop: scale(10),
          padding: scale(10),
          rowGap: scale(10),
        }}>
        <Skeleton
          shimmerStyle={{
            height: scale(22),
            width: '80%',
          }}
        />
        <Skeleton
          shimmerStyle={{
            height: scale(16),
            width: '80%',
          }}
        />
        <Skeleton
          shimmerStyle={{
            height: scale(16),
          }}
        />

        <View
          style={{
            marginTop: scale(10),
            rowGap: scale(10),
            alignItems: 'flex-end',
          }}>
          <Skeleton
            shimmerStyle={{
              height: scale(16),
              width: '40%',
            }}
          />
          <Skeleton
            style={{
              height: scale(16),
              width: '50%',
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(380),
    borderRadius: scale(10),
    ...SHADOW,
  },
  img: {
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderRadius: scale(0),
    height: '55%',
  },
});
