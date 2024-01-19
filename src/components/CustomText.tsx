import React from 'react';
import {Animated, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {COLORS, FONTS, SIZES} from '../assets/constants';
import {arrayToObject} from '../utils/arrayToObject';

export type CustomTextProps = {
  children: React.ReactNode;
  isShadow?: boolean;
  isAnimated?: boolean;
  shaDowColor?: string;
  textType?: 'regular' | 'medium' | 'semiBold' | 'bold' | undefined;
} & TextProps;

export default function CustomText({
  children,
  textType,
  isShadow,
  isAnimated,
  shaDowColor,
  ...props
}: CustomTextProps) {
  const textWeight: TextStyle =
    textType === 'regular'
      ? {fontFamily: FONTS.regular, fontWeight: '400'}
      : textType === 'semiBold'
      ? {fontFamily: FONTS.semiBold, fontWeight: '600'}
      : textType === 'bold'
      ? {fontFamily: FONTS.bold, fontWeight: '700'}
      : {fontFamily: FONTS.medium, fontWeight: '500'};

  const propStyle = arrayToObject(props.style);
  delete propStyle.textType;
  const Component = isAnimated ? Animated.Text : Text;
  return (
    <Component
      {...props}
      style={[
        styles.text,
        isShadow && {...styles.shaDow, textShadowColor: shaDowColor},
        propStyle,
        textWeight,
      ]}>
      {children}
    </Component>
  );
}

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
