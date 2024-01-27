import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomButton} from '../../../components';
import CustomText from '../../../components/CustomText';
import {COLORS, SIZES, scale} from '../../../assets/constants';

export default function Wrapper({Heading1, subHeading, styleWrapper}) {
  return (
    <View style={[styles.styleWrapper, styleWrapper]}>
      <CustomText textType="bold" style={styles.text}>
        {Heading1}
      </CustomText>
      <CustomText textType="semiBold" style={styles.textSub}>
        {subHeading}
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  styleWrapper: {
    alignItems: 'center',
  },
  text: {
    fontSize: SIZES.xLarge,
  },
  textSub: {
    fontSize: SIZES.small,
  },
});
