import React, {useMemo} from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {COLORS, scale} from '../assets/constants';
import {SHADOW} from '../assets/constants/theme';
import {arrayToObject} from '../utils/arrayToObject';
import CustomText, {CustomTextProps} from './CustomText';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

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
  styleText: Pick<CustomTextProps, 'textType'> & TextStyle;
  onPress: () => void;
  onDoublePress: () => void;
} & TouchableOpacityProps;
const funcFallBlack = () => {};

let delayTime = 300;
let firstPress = true;
let lastTime: number = new Date().getTime();
let timer: any = 0;

export default function CustomButton({
  buttonType,
  text,
  isShadow,
  iconLeft,
  iconRight,
  isDelay,
  outline,
  styleText,
  styleIcon,
  linearGradientProps,
  onPress = funcFallBlack,
  onDoublePress = funcFallBlack,
  ...props
}: CustomButtonProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;

  const heightSize =
    buttonType === 'large' ? 48 : buttonType === 'medium' ? 38 : 31;
  const fontSize =
    buttonType === 'large' ? 16 : buttonType === 'medium' ? 14 : 12;

  const propStyle = arrayToObject(props.style);

  const singlePress = (now: number) => {
    if (!isDelay) {
      onPress();
      return;
    }
    firstPress = false;
    timer = setTimeout(() => {
      onPress();
      firstPress = true;
    }, delayTime);
    lastTime = now;
  };

  const doublePress = (now: number) => {
    if (now - lastTime < delayTime) {
      onDoublePress();
      timer && clearTimeout(timer);
      firstPress = true;
    }
  };

  const _onPress = () => {
    let now = new Date().getTime();
    firstPress ? singlePress(now) : doublePress(now);
  };
  // useEffect(() => {
  //   return () => {
  //     timer && clearTimeout(timer);
  //   };
  // }, [timer]);

  const _backgroundColor: (string | number)[] = useMemo(() => {
    const backgroundColor = propStyle?.backgroundColor || COLORS.primary;

    return outline
      ? ['transparent', 'transparent']
      : linearGradientProps
      ? ['#F7E75A', '#FFC702']
      : [backgroundColor, backgroundColor];
  }, [propStyle?.backgroundColor, outline, linearGradientProps]);

  return (
    <View
      style={[
        styles.wrapper,
        outline && styles.outline,
        propStyle?.flex ? {flex: propStyle?.flex} : {width: propStyle?.width},
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
            isShadow && SHADOW,
            propStyle,
            propStyle.minWidth ? propStyle.minWidth : {width: '100%'},
          ]}>
          {iconLeft && (
            <IconLeft
              style={{...styles.icon, ...styleIcon}}
              fill={styleIcon?.color}
            />
          )}
          {text && (
            <CustomText
              textType={styleText?.textType || 'semiBold'}
              style={[
                styles.text,
                {fontSize: scale(fontSize)},
                !linearGradientProps && {color: COLORS.white},
                styleText,

                outline && {color: COLORS.primary},
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
}

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: 'center',
    width: '100%',
    backgroundColor: '#000',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: scale(10),
    paddingHorizontal: scale(7),
    borderRadius: scale(10),
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    width: scale(14),
    height: scale(14),
  },
});
