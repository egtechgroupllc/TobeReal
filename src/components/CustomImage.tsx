/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import Skeleton from './Skeleton';
type CustomImgProps = {
  source: string;
} & FastImageProps;

export default function CustomImage({source, ...props}: CustomImgProps) {
  const [visible, setVisible] = useState(true);


  const isImgAsset = useMemo(() => typeof source === 'string', [source]);

  return (
    <>
      <FastImage
        {...props}
        source={
          !isImgAsset
            ? source
            : {uri: source, priority: FastImage.priority.high}
        }
        onLoadEnd={() => {
          setVisible(true);
        }}
        onLoadStart={() => {
          !!isImgAsset && setVisible(false);
        }}
      />

      {!visible && (
        <Skeleton
          visible={visible}
          shimmerStyle={{
            ...props?.style,
            position: 'absolute',
          }}
        />
      )}
    </>
  );
}
