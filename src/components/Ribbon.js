import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../assets/constants';
import CustomText from './CustomText';
import {IconRoom} from '../assets/icon/Icon';

export default function Ribbon({text, iconRight, iconLeft, numberRoom}) {
  const IconRight = iconRight;
  const IconLeft = iconLeft;

  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        {iconLeft && <IconLeft style={styles.icon} />}
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xSmall,
          }}>
          {text}
        </CustomText>
        {iconRight && <IconRight style={styles.icon} />}
      </View>

      <View style={{...styles.left, ...styles.right, ...SHADOW}}>
        {/* <IconRoom style={styles.icon} /> */}
        <CustomText
          textType="medium"
          style={{
            fontSize: SIZES.xSmall,
          }}>
          🛌 {numberRoom}
        </CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: scale(-10),
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(4),
  },
  left: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: scale(6),
    paddingVertical: scale(4),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
    borderRadius: 6,
    marginLeft: scale(-4),
  },
  right: {
    backgroundColor: COLORS.white,
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
});
