/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import Skeleton from './Skeleton';
type CustomImgProps = {
  source: string;
} & FastImageProps;

export default function CustomImage({source, ...props}: CustomImgProps) {
  const [visible, setVisible] = useState(true);

  const sourceNew = useMemo(
    () => (Array.isArray(source) ? source[0] : source),
    [source],
  );
  const isImgAsset = useMemo(() => typeof sourceNew === 'string', [sourceNew]);

  return (
    <>
      <FastImage
        {...props}
        source={
          !isImgAsset
            ? sourceNew
            : {uri: sourceNew, priority: FastImage.priority.high}
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
