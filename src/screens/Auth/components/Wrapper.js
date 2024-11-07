import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '../../../components';
import CText from '../../../components/CText';
import {COLORS, SIZES, scale} from '../../../assets/constants';

export default function Wrapper({Heading1, subHeading, styleWrapper}) {
  return (
    <View style={[styles.styleWrapper, styleWrapper]}>
      {Heading1 && (
        <CText textType="bold" style={styles.text}>
          {Heading1}
        </CText>
      )}
      {subHeading && (
        <CText textType="semiBold" style={styles.textSub}>
          {subHeading}
        </CText>
      )}
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
