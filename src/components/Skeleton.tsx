import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import ShimmerPlaceHolder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {scale} from '../assets/constants';

type SkeletonProps = {
  children?: React.ReactNode;
  shimmerStyle?: ViewStyle;
} & ShimmerPlaceholderProps;

export default function Skeleton({
  children,
  shimmerStyle,
  ...props
}: SkeletonProps) {
  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      {...props}
      shimmerColors={['#ebebeb', '#fafafa', '#ebebeb']}
      shimmerStyle={[
        styles.shimmerStyle,
        shimmerStyle,
        {height: props?.height || shimmerStyle?.height || '100%'},
        {width: props?.width || shimmerStyle?.width || '100%'},
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
