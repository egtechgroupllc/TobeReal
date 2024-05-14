import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconStar} from '../../../../../../../assets/icon/Icon';
import {scale} from '../../../../../../../assets/constants';

export default (function StarAccomo({rating = 1, size, onChange, style}) {
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < rating; i++) {
      starArray.push(
        <IconStar
          key={i}
          fill={'#FFB700'}
          width={size || scale(14)}
          height={size || scale(14)}
        />,
      );
    }
    return starArray;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, rating]);

  return <View style={[styles.star, style]}>{stars}</View>;
});

const styles = StyleSheet.create({
  star: {
    flexDirection: 'row',
    columnGap: scale(4),
  },
});
