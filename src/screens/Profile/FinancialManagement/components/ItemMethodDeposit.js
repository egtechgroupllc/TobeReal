import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SHADOW, SIZES} from '~/assets/constants';
import {IconNext} from '~/assets/icon/Icon';
import {CImage, CText} from '~/components';
import Skeleton from '~/components/Skeleton';
import {scale} from '~/utils/scale';

export default function ItemMethodDeposit({data, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        ...styles.box,
      }}>
      {data?.id ? (
        <>
          <CImage
            source={{uri: data?.logo}}
            style={{width: scale(26), height: scale(26)}}
            resizeMode="contain"
          />
          <CText
            textType="medium"
            style={{fontSize: SIZES.xMedium, color: COLORS.White}}>
            {data?.name}
          </CText>
          <IconNext
            width={scale(12)}
            height={scale(12)}
            fill={COLORS.White}
            style={{
              marginLeft: 'auto',
            }}
          />
        </>
      ) : (
        <Skeleton height={'100%'} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    paddingVertical: scale(10),
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: COLORS.input,
  },
});
