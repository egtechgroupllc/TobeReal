import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, images, scale} from '../../../assets/constants';
import Content from '../Register/components/Content';
import Wrapper from './Wrapper';
import {IconHi} from '../../../assets/icon/Icon';
import MainAuth from '../../../components/MainAuth';
import MainWrapper from '../../../components/MainWrapper';

export default function Auth({children, heading, subHeading, style}) {
  return (
    <MainWrapper>
      <View style={styles.container}>
        <View style={[styles.config, style]}>
          <Wrapper Heading1={heading} subHeading={subHeading} />
        </View>
        {children}
      </View>
    </MainWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
  },
  config: {
    flexDirection: 'row',
    marginTop: scale(90),
    alignItems: 'center',
    flex: 1,
  },
});
