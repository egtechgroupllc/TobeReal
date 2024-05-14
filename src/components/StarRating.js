import React, {memo, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, scale} from '../assets/constants';
import {IconStar} from '../assets/icon/Icon';

export default (function StarRating({
  rating = 0,
  size,
  onChange,
  isSetRating,
  style,
}) {
  const [point, setPoint] = useState(rating);

  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <ComponentContent
          key={i}
          isSetRating={isSetRating}
          onChange={() => {
            setPoint(i + 1);
            onChange && onChange(i + 1);
          }}>
          <IconStar
            fill={i < Math.floor(point) && '#FFB700'}
            width={size || scale(12)}
            height={size || scale(12)}
          />
        </ComponentContent>,
      );
    }
    return starArray;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point, size, rating]);

  return <View style={[styles.star, style]}>{stars}</View>;
});

const ComponentContent = ({children, onChange, isSetRating}) => {
  return isSetRating ? (
    <TouchableOpacity activeOpacity={0.7} onPress={onChange}>
      {children}
    </TouchableOpacity>
  ) : (
    children
  );
};

const styles = StyleSheet.create({
  star: {
    flexDirection: 'row',
    columnGap: scale(2),
  },
});
