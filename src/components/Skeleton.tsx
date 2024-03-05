import {StyleSheet} from 'react-native';
import React from 'react';
import ShimmerPlaceHolder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {scale} from '../assets/constants';

type SkeletonProps = {
  children: React.ReactNode;
} & ShimmerPlaceholderProps;

export default function Skeleton({children, ...props}: SkeletonProps) {
  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      {...props}
      shimmerColors={['#ebebeb', '#fafafa', '#ebebeb']}
      shimmerStyle={[
        styles.shimmerStyle,
        props?.shimmerStyle,
        {height: props?.height || props?.shimmerStyle?.height},
      ]}>
      {children}
    </ShimmerPlaceHolder>
  );
}

const styles = StyleSheet.create({
  shimmerStyle: {
    width: '100%',
    height: '100%',
    borderRadius: scale(6),
  },
});
