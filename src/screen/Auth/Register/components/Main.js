import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, images, scale} from '../../../../assets/constants';
import Content from './Content';
import Wrapper from '../../components/Wrapper';
import { IconHi } from '../../../../assets/icon/Icon';


export default function Main() {
  return (
    <View style={styles.container}>
       <View style={{flexDirection:'row',marginTop: scale(50),alignItems: 'center'}}>
        <Wrapper Heading1="Create an account" subHeading="Connect with your friends today!" />
      </View>
      <Content/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
  },
});
