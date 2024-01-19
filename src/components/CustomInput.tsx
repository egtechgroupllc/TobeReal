/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import {arrayToObject} from '../utils/arrayToObject';

type CustomInputProps = {
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  componentRight?: React.ReactNode;
  componentLeft?: React.ReactNode;
  styleWrapper?: ViewStyle;
  styleIcon?: ViewStyle;
  onPress?: () => void;
} & TextInputProps;

export default function CustomInput({
  iconLeft,
  iconRight,
  componentRight,
  componentLeft,
  styleWrapper,
  styleIcon,
  onPress,
  ...props
}: CustomInputProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;
  const propStyle = arrayToObject(styleWrapper);

  return (
    <TouchableOpacity
      style={[styles.wrapper, propStyle]}
      activeOpacity={!!onPress ? 0.8 : 1}
      onPress={onPress}>
      {(iconLeft || componentLeft) && (
        <View style={styles.iconBox}>
          {componentLeft ? (
            componentLeft
          ) : (
            <IconLeft style={{...styles.icon, ...styleIcon}} />
          )}
        </View>
      )}

      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor={COLORS.textSub}
        pointerEvents={!!onPress ? 'none' : 'auto'}
      />
      {(iconRight || componentRight) && (
        <View style={styles.iconBox}>
          {componentRight ? (
            componentRight
          ) : (
            <IconRight style={{...styles.icon, ...styleIcon}} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: '100%',
    columnGap: scale(10),
    justifyContent: 'center',
    // flex: 1,
  },
  input: {
    flex: 1,
    height: scale(37),
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  iconBox: {
    minWidth: scale(24),
    alignItems: 'center',
  },
  icon: {
    width: scale(14),
    height: scale(14),
  },
});
