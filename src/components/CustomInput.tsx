import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
} from 'react-native';

import {COLORS, FONTS, SIZES, scale} from '../assets/constants';
import {arrayToObject} from '../utils/arrayToObject';

type CustomInputProps = {
  iconLeft: React.JSX.Element;
  iconRight: React.JSX.Element;
  styleWrapper: ViewStyle;
  styleIcon: ViewStyle;
} & TextInputProps;

export default function CustomInput({
  iconLeft,
  iconRight,
  styleWrapper,
  styleIcon,

  ...props
}: CustomInputProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;
  const propStyle = arrayToObject(styleWrapper);

  return (
    <View style={[styles.wrapper, propStyle]}>
      {iconLeft && (
        <View style={styles.iconBox}>
          <IconLeft style={{...styles.icon, ...styleIcon}} />
        </View>
      )}
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor={COLORS.textSub}
      />
      {iconRight && (
        <View style={styles.iconBox}>
          <IconRight style={{...styles.icon, ...styleIcon}} />
        </View>
      )}
    </View>
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
