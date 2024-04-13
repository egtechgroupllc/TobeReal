import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import {IconNext} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';

export default function ItemMethodDeposit({data, onPress, noLine, isSelect}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: isSelect ? '#eee' : '#fff',
        borderTopWidth: noLine ? 0 : 1,
        ...styles.box,
      }}>
      <CustomImage
        source={
          'https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png?20201011055544'
        }
        style={{width: scale(24), height: scale(24)}}
        resizeMode="contain"
      />
      <CustomText textType="medium" style={{fontSize: SIZES.xMedium}}>
        {data?.name}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    // ...SHADOW,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    borderRadius: scale(6),
    columnGap: scale(14),
    borderColor: '#ddd',
  },
});
