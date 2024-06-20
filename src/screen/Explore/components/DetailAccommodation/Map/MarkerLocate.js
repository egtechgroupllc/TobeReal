import React, {memo} from 'react';
import {Animated} from 'react-native';
import {scale} from '../../../../../assets/constants';
import CustomImage from '../../../../../components/CustomImage';
import {useCountry} from '../../../../../hooks/useCountry';

const MarkerLocate = ({scaleValue, data, markerFocus, checkFilter}) => {
  const {currency} = useCountry();
  const scaleStyle = {
    transform: [
      {
        scale: scaleValue?.scale,
      },
    ],
  };

  return (
    <Animated.View
      style={[
        {
          minWidth: scale(150),
          height: !checkFilter ? scale(150) : '',
          alignItems: 'center',
          // backgroundColor: '#000',
        },
        scaleValue && scaleStyle,
      ]}>
      <CustomImage
        source={{uri: data?.icon}}
        style={{
          width: '25%',
          height: '25%',
          transform: [
            {
              scale: 0.7,
            },
          ],
        }}
      />
    </Animated.View>
  );
};

export default memo(MarkerLocate);
