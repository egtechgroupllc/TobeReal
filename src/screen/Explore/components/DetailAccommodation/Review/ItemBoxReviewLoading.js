import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from '../../../../../assets/constants';
import Skeleton from '../../../../../components/Skeleton';

export default function ItemBoxReviewLoading({style, isShadow = true}) {
  return (
    <View style={styles.content}>
      <View style={styles.infoCustomer}>
        <Skeleton style={styles.avatar} />
        <View
          style={{
            rowGap: scale(4),
          }}>
          <Skeleton
            height={scale(10)}
            width={scale(100)}
            shimmerStyle={{
              borderRadius: scale(2),
            }}
          />
          <Skeleton
            height={scale(10)}
            width={scale(70)}
            shimmerStyle={{
              borderRadius: scale(2),
            }}
          />
        </View>
      </View>
      <View
        style={{
          rowGap: scale(8),
        }}>
        <Skeleton height={scale(60)} />

        <View style={{flexDirection: 'row', columnGap: scale(10)}}>
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              height={scale(50)}
              shimmerStyle={{
                flex: 1,
              }}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Skeleton
          height={scale(14)}
          width={scale(120)}
          shimmerStyle={{
            borderRadius: scale(2),
          }}
        />

        <Skeleton
          height={scale(14)}
          width={scale(14)}
          shimmerStyle={{
            borderRadius: scale(2),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    // height: scale(100),
    rowGap: scale(8),
  },
  infoCustomer: {
    flexDirection: 'row',
    columnGap: scale(10),
  },
  avatar: {
    width: scale(30),
    aspectRatio: 1,
    borderRadius: 999,
  },
  boxOwn: {
    backgroundColor: '#f5f5f5',
    borderRadius: scale(6),
    padding: scale(12),
  },
  moreUser: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: scale(12),
  },
  moreOwn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: scale(12),
    backgroundColor: '#f5f5f5',
    paddingHorizontal: scale(12),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
