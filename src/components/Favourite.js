import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IconHeart} from '../assets/icon/Icon';
import {COLORS, SHADOW, scale} from '../assets/constants';
import {CustomButton} from '.';

export default function Favourite({styleWrapper}) {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <CustomButton
      isShadow
      iconRight={IconHeart}
      style={{...styles.active, ...styleWrapper}}
      onPress={() => setIsFavourite(!isFavourite)}
      styleIcon={{
        color: isFavourite && COLORS.primary,
        width: scale(18),
        height: scale(18),
      }}
    />
  );
}

const styles = StyleSheet.create({
  active: {
    minWidth: scale(42),
    height: scale(42),
    backgroundColor: '#fff',
  },
});
