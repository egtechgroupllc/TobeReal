import React, {useMemo, useState} from 'react';
import {
  ColorValue,
  Image,
  ImageProps,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {scale} from '~/utils/scale';
import CText, {CTextProps} from './CText';
import {COLORS, SIZES} from '~/assets/constants';
import {SvgUri} from 'react-native-svg';

export default function CImage(props: ImageProps) {
  const type = typeof props.source !== 'number';
  const checkSVG = useMemo(
    () =>
      (type || props.src) && (props.source?.uri || props.src)?.endsWith('.svg'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type, props.src],
  );

  return !checkSVG ? (
    <Image {...props} />
  ) : (
    <View
      style={[
        {
          borderRadius: props.borderRadius || 99,
          overflow: 'hidden',
        },
        props.style,
      ]}>
      <SvgUri uri={props.src || props.source?.uri} width="100%" height="100%" />
    </View>
  );
}

function CImageAvatar({
  size,
  borderWidth = 0,
  ...props
}: {borderWidth: number; size: number} & ImageProps) {
  const [isFinish, setIsFinish] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <CImage
      borderRadius={99}
      onLoadEnd={() => setIsFinish(true)}
      // onError={() => setIsFinish(true)}
      {...props}
      style={[
        styles.avatar,
        {
          height: size || scale(40),

          backgroundColor: isFinish ? 'transparent' : '#ccc',
          borderWidth: borderWidth,
        },
        props.style,
      ]}
    />
  );
}

CImage.Avatar = CImageAvatar;

function CImageText({
  size,
  text = '',
  backgroundColor,
  propsText,
  sizeText,
  ...props
}: {
  size?: number;
  sizeText?: number;
  text?: string;
  backgroundColor: ColorValue;
  propsText?: CTextProps;
} & ViewProps) {
  return (
    <View
      style={{
        width: size || scale(36),
        aspectRatio: 1,
        backgroundColor: backgroundColor || COLORS.GreenBlue + '20',
        overflow: 'hidden',
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}>
      <CText
        textType="medium"
        size={sizeText || (size ? size / 2 : SIZES.medium)}
        {...propsText}>
        {text.charAt(0)}
      </CText>
    </View>
  );
}

CImage.Text = CImageText;
const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    overflow: 'hidden',
    borderColor: COLORS.text + '30',
    borderRadius: 99,
  },
});
