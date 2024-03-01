import React, {useState} from 'react';
import {ImageProps} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import Skeleton from './Skeleton';
type CustomImgProps = {
  source: string;
} & FastImageProps;

export default function CustomImage({source, ...props}: CustomImgProps) {
  const isImgAsset = typeof source === 'number';
  const [visible, setVisible] = useState(false);

  return (
    <Skeleton visible={visible} shimmerStyle={props?.style}>
      <FastImage
        style={{
          backgroundColor: '#ccc',
        }}
        {...props}
        source={
          isImgAsset ? source : {uri: source, priority: FastImage.priority.high}
        }
        onLayout={() => {
          setVisible(true);
        }}
        onLoadEnd={() => {
          setVisible(true);
        }}
        // onLoadStart={() => {
        //   setVisible(false);
        // }}
      />
    </Skeleton>
  );
}
