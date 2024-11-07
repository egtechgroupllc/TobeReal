import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CText from './CText';
import {COLORS, SIZES} from '~/assets/constants';
// import {scale} from '~/utils/scale';

export default function RadioButton({
  title,
  isCheck,
  textRight,
  onPress,
  textComponent,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress && onPress(true)}
      style={{
        flexDirection: !textRight ? 'row-reverse' : 'row',
        alignItems: 'center',
        columnGap: scale(7),
        paddingVertical: scale(8),
      }}>
      <View
        style={[
          styles.radio,
          isCheck && {
            borderWidth: scale(4.8),
            borderColor: COLORS.Blue,
          },
        ]}>
        {isCheck && <View style={styles.dot} />}
      </View>
      {textComponent || (
        <CText textType="medium" color={COLORS.text} style={{flex: 1}}>
          {title}
        </CText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  radio: {
    height: scale(17),
    aspectRatio: 1,
    borderRadius: 99,
    borderWidth: scale(1.5),
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: '65%',
    aspectRatio: 1,
    borderRadius: 99,
    backgroundColor: COLORS.White,
  },
});
