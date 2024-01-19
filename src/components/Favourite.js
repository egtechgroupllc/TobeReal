import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IconHeart} from '../assets/icon/Icon';
import {COLORS, SHADOW, scale} from '../assets/constants';

export default function Favourite() {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.boxIcon}
      onPress={() => setIsFavourite(!isFavourite)}>
      <IconHeart
        style={{
          width: scale(18),
          height: scale(18),
        }}
        fill={isFavourite && COLORS.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxIcon: {
    backgroundColor: '#fff',
    padding: scale(5),
    borderRadius: scale(6),
    ...SHADOW,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
