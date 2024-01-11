import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import {IconHi, IconSearch} from '../../../../assets/icon/Icon';
import {CustomInput} from '../../../../components';
import CustomText from '../../../../components/CustomText';
import Content from './Content';
import Wrapper from '../../components/Wrapper';

export default function Main() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(80),
          alignItems: 'center',
        }}>
        <Wrapper
          Heading1="Hi, Welcome Back! 👋"
          styleWrapper={{flexDirection: 'row', marginRight: scale(5)}}
        />
      </View>
      <Content />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
