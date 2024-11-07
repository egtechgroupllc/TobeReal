import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from '~/utils/scale';
import {CImage, CText} from '~/components';
import {COLORS, images, SIZES} from '~/assets/constants';
import {formatPrice} from '../../../../../utils/format';

export default function BookInfo({data}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        columnGap: scale(10),
      }}>
      <CImage.Avatar
        source={
          data?.user?.image ? {uri: data?.user?.image} : images.iconProfile
        }
        style={{width: scale(80), height: scale(80)}}
      />
      <View style={{flex: 1, rowGap: scale(5)}}>
        {data?.user?.fullname ? (
          <CText
            style={{color: COLORS.White, fontSize: SIZES.large}}
            textType="bold">
            {data?.user?.fullname}
          </CText>
        ) : (
          <CText style={{color: COLORS.White, fontSize: SIZES.large}}>
            Doctor
          </CText>
        )}
        <CText
          style={{
            color: COLORS.blue,
            fontSize: SIZES.small,
          }}
          numberOfLines={3}
          textType="regular">
          [{data?.type}]
        </CText>
        <CText
          style={{color: COLORS.White, fontSize: SIZES.small}}
          numberOfLines={3}
          textType="regular">
          {data?.date} ({data?.time_start} - {data?.time_end})
        </CText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
