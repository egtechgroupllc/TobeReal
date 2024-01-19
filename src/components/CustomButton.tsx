import React from 'react';
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

type CustomButtonProps = {
  buttonType?: 'normal' | 'medium' | 'large';
  text: string;
  isShadow?: boolean;
  outline?: boolean;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  isDelay?: boolean;
  styleIcon?: ViewStyle;
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
  onPress = funcFallBlack,
  onDoublePress = funcFallBlack,
  ...props
}: CustomButtonProps) {
  const IconRight: any = iconRight;
  const IconLeft: any = iconLeft;

  const heightSize =
    buttonType === 'large' ? 40 : buttonType === 'medium' ? 37 : 31;
  const fontSize =
    buttonType === 'large' ? 14 : buttonType === 'medium' ? 13 : 12;

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

  return (
    <View
      style={[
        styles.wrapper,
        propStyle?.flex ? {flex: propStyle?.flex} : {width: propStyle?.width},
      ]}>
      <TouchableOpacity
        {...props}
        activeOpacity={0.6}
        onPress={_onPress}
        style={[
          styles.button,
          !propStyle?.height && {
            minHeight: scale(heightSize),
          },
          isShadow && SHADOW,
          outline && styles.outline,
          propStyle,
          propStyle.minWidth ? propStyle.minWidth : {width: '100%'},
        ]}>
        {iconLeft && <IconLeft style={{...styles.icon, ...styleIcon}} />}
        {text && (
          <CustomText
            textType={styleText?.textType}
            style={[
              styles.text,
              {fontSize: scale(fontSize)},
              styleText,
              outline && {color: COLORS.primary},
            ]}>
            {text}
          </CustomText>
        )}
        {iconRight && <IconRight style={{...styles.icon, ...styleIcon}} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
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
    // flex: 1,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    columnGap: scale(10),
    borderRadius: scale(10),
    paddingHorizontal: scale(7),
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
  },
  icon: {
    width: scale(14),
    height: scale(14),
  },
});
