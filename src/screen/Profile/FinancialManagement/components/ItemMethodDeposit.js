import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {IconNext} from '../../../../assets/icon/Icon';
import Skeleton from '../../../../components/Skeleton';

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
          <CustomImage
            source={data?.logo_url}
            style={{width: scale(26), height: scale(26)}}
            resizeMode="contain"
          />
          <CustomText textType="medium" style={{fontSize: SIZES.xMedium}}>
            {data?.name}
          </CustomText>
          <IconNext
            width={scale(12)}
            height={scale(12)}
            fill={COLORS.textSub}
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
    backgroundColor: '#fff',
  },
});
