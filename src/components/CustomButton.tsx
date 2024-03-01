import React, {useEffect, useMemo, memo, useRef} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import {COLORS, scale} from '../assets/constants';
import {SHADOW} from '../assets/constants/theme';
import {arrayToObject} from '../utils/arrayToObject';
import CustomText, {CustomTextProps} from './CustomText';

type CustomButtonProps = {
  buttonType?: 'normal' | 'medium' | 'large';
  text: string;
  isShadow?: boolean;
  outline?: boolean;
  linearGradientProps?: LinearGradientProps;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  isDouble?: boolean;
  styleIcon?: TextStyle;
  styleWrapper?: ViewStyle;
  styleText: Pick<CustomTextProps, 'textType'> & TextStyle;
  onPress: () => void;
  onDoublePress: () => void;
} & TouchableOpacityProps;
const funcFallBlack = () => {};

export default memo(function CustomButton({
  buttonType,
  text,
  isShadow,
  iconLeft,
  iconRight,
  outline,
  styleText,
  styleIcon,
  styleWrapper,
  linearGradientProps,
  onPress = funcFallBlack,
  onDoublePress = funcFallBlack,
  ...props
}: CustomButtonProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;

  const heightSize = useMemo(() => {
    return buttonType === 'large' ? 48 : buttonType === 'medium' ? 38 : 31;
  }, [buttonType]);

  const fontSize = useMemo(() => {
    return buttonType === 'large' ? 16 : buttonType === 'medium' ? 14 : 12;
  }, [buttonType]);

  const propStyle = useMemo(() => arrayToObject(props.style), [props.style]);

  const _backgroundColor: (string | number)[] = useMemo(() => {
    const backgroundColor = propStyle?.backgroundColor || COLORS.primary;

    return outline
      ? ['transparent', 'transparent']
      : linearGradientProps
      ? ['#F7E75A', '#FFC702']
      : [backgroundColor, backgroundColor];
  }, [propStyle?.backgroundColor, outline, linearGradientProps]);

  const timer = useRef<any>(null);
  const TIMEOUT = 400;

  const debounce = (onSingle: () => void, onDouble: () => void) => {
    clearTimeout(timer.current);

    if (timer.current) {
      timer.current = null;
      onDouble();
    } else {
      timer.current = setTimeout(() => {
        timer.current = null;
        onSingle();
      }, TIMEOUT);
    }
  };
  const _onPress = () => {
    debounce(onPress, onDoublePress);
  };

  return (
    <View
      style={[
        styles.wrapper,
        isShadow && SHADOW,
        propStyle?.flex
          ? {flex: propStyle?.flex}
          : propStyle.minWidth
          ? {minWidth: propStyle.minWidth, width: 'auto'}
          : {width: propStyle?.width || '100%'},
        propStyle?.borderTopWidth && {
          borderTopWidth: propStyle?.borderTopWidth,
          borderTopColor: propStyle?.borderTopColor,
        },
        styleWrapper,
      ]}>
      <TouchableOpacity
        activeOpacity={0.6}
        {...props}
        style={{}}
        onPress={_onPress}>
        <LinearGradient
          colors={_backgroundColor}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          {...linearGradientProps}
          style={[
            styles.button,
            !propStyle?.height && {
              minHeight: scale(heightSize),
            },
            outline && styles.outline,
            (iconLeft || iconRight) && text && {flexDirection: 'row'},

            propStyle,
            propStyle.minWidth
              ? {minWidth: propStyle.minWidth}
              : {width: '100%'},
          ]}>
          {iconLeft && (
            <View>
              <IconLeft
                style={{...styles.icon, ...styleIcon}}
                fill={styleIcon?.color}
              />
            </View>
          )}
          {text && (
            <CustomText
              textType={styleText?.textType || (buttonType && 'semiBold')}
              style={[
                styles.text,
                {fontSize: scale(fontSize)},
                !linearGradientProps && {color: COLORS.white},
                outline && {color: COLORS.primary},
                styleText,
              ]}>
              {text}
            </CustomText>
          )}
          {iconRight && (
            <IconRight
              style={{...styles.icon, ...styleIcon}}
              fill={styleIcon?.color}
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: 'center',
    width: '100%',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(10),
    paddingHorizontal: scale(7),
    borderRadius: scale(10),
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
});
