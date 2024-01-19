import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale} from '../../assets/constants';
import CustomText from '../CustomText';

export default function BubbleProgress({moveProgress}) {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <View style={styles.content}>
        <CustomText
          style={{
            alignItems: 'center',
            color: '#fff',
          }}>
          {moveProgress}
        </CustomText>
      </View>
      <View style={styles.triangle} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingVertical: scale(2),
    borderRadius: scale(6),
    paddingHorizontal: scale(6),
  },
  triangle: {
    borderWidth: scale(4),
    borderColor: 'transparent',
    borderTopColor: COLORS.primary,
  },
});
