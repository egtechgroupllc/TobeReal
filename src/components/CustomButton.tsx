import React, {memo, useMemo, useRef} from 'react';
import {
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
  isDelay?: boolean;
  styleIcon?: TextStyle;
  styleWrapper?: ViewStyle;
  styleText: Pick<CustomTextProps, 'textType'> & TextStyle;
  onPress: () => void;
  onDoublePress: () => void;
} & TouchableOpacityProps;
const funcFallBlack = () => {};

export default memo(function CustomButton({
  buttonType = 'medium',
  text,
  isShadow,
  iconLeft,
  iconRight,
  outline,
  styleText,
  styleIcon,
  styleWrapper,
  linearGradientProps,
  isDelay,
  onPress = funcFallBlack,
  onDoublePress = funcFallBlack,
  ...props
}: CustomButtonProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;

  const heightSize = useMemo(() => {
    return buttonType === 'large' ? 48 : buttonType === 'medium' ? 42 : 31;
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
  const ComponentWrapper: any = !linearGradientProps ? View : LinearGradient;

  const timer = useRef<any>(null);
  const TIMEOUT = 400;


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

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      style={[
        styles.wrapper,
        isShadow && SHADOW,
        propStyle?.flex
          ? {flex: propStyle?.flex}
          : propStyle.minWidth
          ? {minWidth: propStyle.minWidth}
          : {width: propStyle?.width || '100%'},
        styleWrapper,
      ]}
      onPress={_onPress}>
      <ComponentWrapper
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
          propStyle.minWidth ? {minWidth: propStyle.minWidth} : {width: '100%'},
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
            numberOfLines={6}
            style={[
              styles.text,
              {fontSize: scale(fontSize)},
              !linearGradientProps && {color: COLORS.white},
              outline && {color: COLORS.primary},
              styleText,
            ]}>
            {text.trim()}
          </CustomText>
        )}
        {iconRight && (
          <IconRight
            style={{...styles.icon, ...styleIcon}}
            fill={styleIcon?.color}
          />
        )}
      </ComponentWrapper>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: 'center',
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
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    backgroundColor: COLORS.primary,
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    width: scale(16),
    height: scale(16),
  },
});
