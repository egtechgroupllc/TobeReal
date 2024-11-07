import React, {memo} from 'react';
import {ColorValue, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {COLORS, FONTS, SIZES} from '../assets/constants';

export type CTextProps = {
  children: React.ReactNode;
  isShadow?: boolean;
  isAnimated?: boolean;
  shaDowColor?: string;
  color?: ColorValue;
  size?: number;
  textType?: 'regular' | 'medium' | 'semiBold' | 'bold' | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
} & TextProps;

export default memo(function CText({
  children,
  textType = 'regular',
  isShadow,
  shaDowColor,
  size,
  color,
  textAlign,
  ...props
}: CTextProps) {
  const textWeight: TextStyle =
    textType === 'regular'
      ? {fontFamily: FONTS.regular, fontWeight: '400'}
      : textType === 'semiBold'
      ? {fontFamily: FONTS.semiBold, fontWeight: '600'}
      : textType === 'bold'
      ? {fontFamily: FONTS.bold, fontWeight: '700'}
      : {fontFamily: FONTS.medium, fontWeight: '500'};

  return (
    <Text
      {...props}
      style={[
        styles.text,
        isShadow && {...styles.shaDow, textShadowColor: shaDowColor},
        size && {fontSize: size},
        color && {color: color},
        textAlign && {textAlign},
        props.style,
        textWeight,
      ]}>
      {children}
    </Text>
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  shaDow: {
    textShadowOffset: {width: 0, height: 1.5},
    textShadowRadius: 2,
  },
});
