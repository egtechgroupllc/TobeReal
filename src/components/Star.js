import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import {IconStar} from '../assets/icon/Icon';
import {COLORS, scale} from '../assets/constants';

export default function Star({rating = 0}) {
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(
        <IconStar key={i} fill={i < Math.floor(rating) && COLORS.primary} />,
      );
    }
    return starArray;
  }, [rating]);

  return <View style={styles.star}>{stars}</View>;
}

const styles = StyleSheet.create({
  star: {
    flexDirection: 'row',
    columnGap: scale(2),
  },
});
