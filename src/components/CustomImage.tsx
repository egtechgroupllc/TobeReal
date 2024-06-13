import React, { useMemo } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

type CustomImgProps = {
  source: string;
} & FastImageProps;

export default function CustomImage({source, ...props}: CustomImgProps) {
  const isImgAsset = useMemo(() => typeof source === 'string', [source]);

  return (
    <FastImage
      {...props}
      source={
        !isImgAsset ? source : {uri: source, priority: FastImage.priority.high}
      }
    />
  );
}
