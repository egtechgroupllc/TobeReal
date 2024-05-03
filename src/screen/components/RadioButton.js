import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, scale} from '../../assets/constants';
import CustomText from '../../components/CustomText';

export default function RadioButton({title, isCheck, onPress}) {
  console.log({isCheck});
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress && onPress(true)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: scale(7),
      }}>
      <View style={styles.radio}>{isCheck && <View style={styles.dot} />}</View>
      <CustomText textType="medium" color={COLORS.text} style={{flex: 1}}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radio: {
    height: scale(18),
    aspectRatio: 1,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: '65%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.primary,
  },
});
