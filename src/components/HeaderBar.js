import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconGoBack, IconX} from '../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../assets/constants';
import {useNavigation} from '@react-navigation/native';
import {CustomButton} from '.';
import CustomText from './CustomText';

export default function HeaderBar() {
  const {goBack} = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <CustomButton
          isShadow
          iconRight={IconX}
          style={styles.active}
          onPress={goBack}
          styleIcon={{
            width: scale(20),
            height: scale(20),
          }}
        />
        <CustomText
          textType="semiBold"
          style={{
            fontSize: SIZES.large,
          }}>
          Search
        </CustomText>

        <View>{/* <IconGoBack /> */}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: scale(120),
    backgroundColor: COLORS.primary,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(4),
    columnGap: scale(10),
  },
  active: {
    minWidth: scale(30),
    backgroundColor: '#fff',
  },
});
