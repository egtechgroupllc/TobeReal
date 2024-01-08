import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, scale} from '../assets/constants';
import CustomText from './CustomText';

export default function Ribbon({text, iconRight, iconLeft}) {
  const IconRight = iconRight;
  const IconLeft = iconLeft;

  return (
    <View style={styles.wrapper}>
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
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: scale(-10),
    left: scale(2),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    zIndex: 9999,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
});
