import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {COLORS, FONTS, scale} from '../assets/constants';
import {arrayToObject} from '../utils/arrayToObject';

export type CustomTextProps = {
  children: React.ReactNode;
  textType?: 'regular' | 'medium' | 'semiBold' | 'bold' | undefined;
} & TextProps;

export default function CustomText({
  children,
  textType,
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
  return (
    <Text {...props} style={[styles.text, propStyle, textWeight]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: scale(12),
    color: COLORS.text,
  },
});
