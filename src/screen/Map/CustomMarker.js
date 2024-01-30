import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {IconMarker} from '../../assets/icon/Icon';
import {scale} from '../../assets/constants';

const CustomMarker = ({scaleValue}) => {
  const scaleStyle = {
    transform: [
      {
        scale: scaleValue,
      },
    ],
  };

  return (
    <Animated.View
      style={[
        {
          width: scale(90),
          height: scale(90),
        },
        scaleValue && scaleStyle,
      ]}>
      <IconMarker
        style={{
          width: '100%',
          height: '90%',
          transform: [
            {
              scale: 0.8,
            },
          ],
        }}
      />
    </Animated.View>
  );
};

export default CustomMarker;
