/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LinearGradientProps} from 'react-native-svg';
import {COLORS, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import CText, {CTextProps} from './CText';
import Ripple from './Ripple';
import {IconProps, IconQuestionMark} from '@tabler/icons-react-native';

type TButtonProps = {
  Icon?: React.ReactElement;
  color: ColorValue;
  iconComponent: React.ReactElement;
  backgroundColor?: string;
  sizeButton?: 'normal' | 'medium' | 'large';
  title: string;
  isShadow?: boolean;
  outline?: boolean;
  iconRight?: boolean;
  noBackgroundColor?: boolean;
  linearGradientProps?: LinearGradientProps | boolean;
  iconProps?: IconProps;
  textProps?: CTextProps;
  styleText?: TextStyle;
  isDelay?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
  styleContent?: ViewStyle;
  onPress: () => void;
  onDoublePress: () => void;
} & TouchableWithoutFeedbackProps;
const funcFallBlack = () => {};

const Button = ({
  Icon,
  color,
  iconComponent,
  title,
  backgroundColor = COLORS.primary,
  noBackgroundColor,
  iconRight,
  style,
  styleContent,
  styleText,
  linearGradientProps = true,
  iconProps,
  textProps,
  outline,
  sizeButton = 'medium',
  isDelay,
  isLoading,
  onPress = funcFallBlack,
  onDoublePress = funcFallBlack,
  ...props
}: TButtonProps) => {
  const timer = useRef<any>(null);
  const TIMEOUT = 400;

  const _backgroundColor: (string | number)[] = useMemo(() => {
    const backgroundColorS = backgroundColor || style?.backgroundColor;

    if (props.disabled) {
      return COLORS.linearDisabled;
    }

    return outline || noBackgroundColor
      ? ['transparent', 'transparent']
      : backgroundColorS
      ? [backgroundColorS, backgroundColorS]
      : COLORS.linearGreen;
  }, [
    noBackgroundColor,
    backgroundColor,
    style?.backgroundColor,
    outline,
    linearGradientProps,
    props.disabled,
  ]);

  const ButtonContain = !linearGradientProps ? View : LinearGradient;

  const heightSize = useMemo(() => {
    return sizeButton === 'large' ? 48 : sizeButton === 'medium' ? 42 : 32;
  }, [sizeButton]);

  const debounce = (onSingle: () => void, onDouble: () => void) => {
    clearTimeout(timer.current);

    if (timer.current) {
      timer.current = null;

      onDouble();
    } else {
      if (!isDelay) {
        onSingle();
      }

      timer.current = setTimeout(() => {
        timer.current = null;
        isDelay && onSingle();
      }, TIMEOUT);
    }
  };
  const _onPress = () => {
    debounce(onPress, onDoublePress);
  };
  const widthBtn = useMemo(
    () =>
      !style?.minWidth
        ? {width: style?.width || '100%'}
        : {minWidth: style?.minWidth || scale(100)},
    [style?.width, style?.minWidth],
  );

  return (
    <Ripple
      onPress={_onPress}
      {...props}
      disabled={isLoading || props.disabled}
      style={style}
      rippleContainerBorderRadius={style?.borderRadius || 99}>
      <ButtonContain
        style={[
          styles.wrapper,
          {
            height: noBackgroundColor ? 'auto' : scale(heightSize),
            flexDirection: iconRight ? 'row-reverse' : 'row',
            backgroundColor: noBackgroundColor
              ? 'transparent'
              : backgroundColor,
          },
          outline && styles.outline,
          widthBtn,
          styleContent,
        ]}
        colors={_backgroundColor}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        {...linearGradientProps}>
        {iconComponent
          ? iconComponent
          : Icon && (
              <Icon
                fill={color || '#fff'}
                size={scale(16)}
                stroke={color || '#fff'}
                {...iconProps}
              />
            )}
        {isLoading && (
          <ActivityIndicator
            color={
              color ||
              textProps?.color ||
              (outline ? COLORS.Blue : COLORS.White)
            }
          />
        )}
        <CText
          size={SIZES.xMedium}
          color={color || (outline ? COLORS.primary : COLORS.White)}
          textType="semiBold"
          numberOfLines={1}
          textAlign="center"
          style={styleText}
          {...textProps}>
          {title}
        </CText>
      </ButtonContain>
    </Ripple>
  );
};

export type ButtonIconProps = {
  Icon: React.ReactElement;
  btnColor?: ColorValue;
  radius?: number;
  disabled?: boolean;
  noColor?: boolean;
  padding?: number;
  count?:number;
  isCount?:boolean;
  styleItem?: ViewStyle;
  styleCount?: ViewStyle;
  btnProps: TouchableWithoutFeedbackProps;
} & IconProps;

function ButtonIcon({
  Icon = IconQuestionMark,
  btnProps,
  radius = 99,
  btnColor = COLORS.greyLight + '40',
  noColor = true,
  padding = scale(8),
  disabled,
  styleItem,
  isCount,
  count,
  styleCount,
  onPress,
  ...iconProps
}: ButtonIconProps) {
  return (
    <Ripple
      rippleContainerBorderRadius={radius}
      disabled={disabled}
      onPress={onPress}
      {...btnProps}>
      <View
        style={{
          padding: padding,
          borderRadius: radius,
          backgroundColor: noColor ? 'transparent' : btnColor,
          ...styleItem,
        }}>
        {Icon && (
          <Icon
            color={disabled ? COLORS.greyLight : COLORS.text}
            size={scale(20)}
            {...iconProps}
          />
        )}
       {isCount &&<View style={[styles.noti, styleCount]}><CText style={{color:COLORS.White, fontSize:SIZES.small}}>{count}</CText></View>}

      </View>
    </Ripple>
  );
}

Button.Icon = ButtonIcon;

function ButtonText({
  title,
  btnColor,
  noColor = true,
  padding = scale(4),
  lineHeight,
  radius = scale(6),
  onPress,
  styleText,
  ...props
}: {
  btnColor?: ColorValue;
  title?: string;
  radius?: number;
  lineHeight?: number;
  noColor?: boolean;
  padding?: number;
  styleText?:string;

} & CTextProps) {
  return (
    <Ripple rippleContainerBorderRadius={radius} onPress={onPress}>
      <View
        style={{
          padding: padding,
          borderRadius: radius,
          backgroundColor: noColor
            ? 'transparent'
            : btnColor || COLORS.greyLight + '40',
        }}>
        <CText
          textType="semiBold"
          style={{
            paddingHorizontal: scale(6),
            paddingVertical: scale(2),
            lineHeight: lineHeight || scale(14.5),
            ...styleText,
          }}
          {...props}>
          {title}
        </CText>
      </View>
    </Ripple>
  );
}

Button.Text = ButtonText;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(6),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(99),
    justifyContent: 'center',
  },
  noti:
    {height:scale(15), aspectRatio:1, backgroundColor:'red', alignItems:'center', borderRadius:scale(99), position:'absolute', right:0, top:scale(3)}
  ,
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});

export default Button;
