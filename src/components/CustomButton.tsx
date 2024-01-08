import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {COLORS, scale} from '../assets/constants';
import {SHADOW} from '../assets/constants/theme';
import {arrayToObject} from '../utils/arrayToObject';
import CustomText, {CustomTextProps} from './CustomText';

type CustomButtonProps = {
  buttonType?: 'normal' | 'medium' | 'large';
  text: string;
  isShadow: boolean;
  styleWrapper: ViewStyle;
  iconLeft: React.JSX.Element;
  iconRight: React.JSX.Element;
  styleIcon: ViewStyle;
  styleText: Pick<CustomTextProps, 'textType'> & TextStyle;
  onPress: () => void;
} & ViewProps;

export default function CustomButton({
  buttonType,
  text,
  isShadow,
  iconLeft,
  iconRight,
  styleWrapper,
  styleText,
  styleIcon,
  onPress,
}: CustomButtonProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;

  const heightSize =
    buttonType === 'large' ? 40 : buttonType === 'medium' ? 37 : 31;

  const propStyle = arrayToObject(styleWrapper);
  return (
    <View
      style={[
        styles.wrapper,
        {
          height: scale(heightSize),
        },
        propStyle,
        isShadow && SHADOW,
      ]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row',
          columnGap: scale(10),
        }}>
        {iconLeft && <IconLeft style={{...styles.icon, ...styleIcon}} />}
        <CustomText
          textType={styleText?.textType || 'medium'}
          style={[styles.text, styleText]}>
          {text}
        </CustomText>
        {iconRight && <IconRight style={{...styles.icon, ...styleIcon}} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: '100%',
  },
  text: {
    color: COLORS.textSub,
  },
  icon: {
    width: scale(14),
    height: scale(14),
  },
});
