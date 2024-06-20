import React, {useMemo} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {scale} from '../assets/constants';

type CustomImgProps = {
  source: string;
  isAvatar: boolean;
  size: number;
} & FastImageProps;

export default function CustomImage({
  source,
  isAvatar,
  size,
  ...props
}: CustomImgProps) {
  const isImgAsset = useMemo(() => typeof source === 'string', [source]);

  return (
    <FastImage
      {...props}
      style={[
        isAvatar && {
          width: size || scale(40),
          aspectRatio: 1,
          borderRadius: 99,
          ...props.style,
        },
        !isAvatar && props.style,
      ]}
      source={
        !isImgAsset
          ? source || ''
          : {uri: source || '', priority: FastImage.priority.high}
      }
    />
  );
}
