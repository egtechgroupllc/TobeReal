import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, WIDTH, images, scale} from '../../../assets/constants';
import {IconSearch} from '../../../assets/icon/Icon';
import {CustomInput} from '../../../components';
import CustomImage from '../../../components/CustomImage';
import {useAuthentication} from '../../../hooks/useAuthentication';

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <CustomImage
        source={images.logo}
        style={styles.img}
        resizeMode="contain"
      />

      {/* <CustomInput
        iconLeft={IconSearch}
        placeholder="Find Accommodation..."
        editable={false}
        style={{
          flex: 1,
        }}
        onPress={() => console.log(312)}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH.widthContain,
    alignSelf: 'center',
    height: scale(56),
    columnGap: scale(20),
  },

  img: {
    height: scale(43),
    width: '40%',
  },
});
