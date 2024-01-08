import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, images, scale} from '../../../assets/constants';
import {IconSearch} from '../../../assets/icon/Icon';
import {CustomInput} from '../../../components';

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <Image source={images.logo} style={styles.img} resizeMode="contain" />

      <CustomInput
        iconLeft={IconSearch}
        placeholder="Find Accommodation..."
        editable={false}
        styleWrapper={{
          flex: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '94%',
    alignSelf: 'center',
    height: scale(56),
    columnGap: scale(20),
  },

  img: {
    height: scale(31),
    width: '40%',
  },
});
