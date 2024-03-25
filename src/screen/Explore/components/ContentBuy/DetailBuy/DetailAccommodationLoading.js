import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Skeleton from '../../../../../components/Skeleton';
import {IconHome} from '../../../../../assets/icon/Icon';
import {scale} from '../../../../../assets/constants';

export default function DetailAccommodationLoading({heightHeader = 100}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Skeleton
          shimmerStyle={{
            height: heightHeader,
          }}
        />
        <IconHome
          style={{
            position: 'absolute',
            width: scale(70),
            height: scale(70),
          }}
          fill={'#ddd'}
        />
      </View>

      <View
        style={{
          marginTop: scale(30),
          paddingHorizontal: scale(16),
          rowGap: scale(20),
        }}>
        <Skeleton
          shimmerStyle={{
            height: scale(30),
            width: '70%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            columnGap: scale(10),
          }}>
          <Skeleton
            shimmerStyle={{
              height: scale(16),
              width: scale(140),
            }}
          />
          {[...Array(3)].map((item, index) => (
            <Skeleton
              key={index}
              shimmerStyle={{
                height: scale(16),
                width: scale(40),
              }}
            />
          ))}
        </View>
        <Skeleton
          shimmerStyle={{
            height: scale(30),
            width: '70%',
          }}
        />
        <Skeleton
          shimmerStyle={{
            height: scale(140),
            width: '100%',
          }}
        />
        <Skeleton
          shimmerStyle={{
            height: scale(40),
            width: '100%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
