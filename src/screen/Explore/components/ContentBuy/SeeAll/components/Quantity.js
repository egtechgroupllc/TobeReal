import React,{useState} from 'react';
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import Box from './Box';

export default function Quantity({title}) {
  return (
    <View
      style={{
        rowGap: scale(10),
        paddingVertical: scale(5),
      }}>
      <CustomText
        textType="bold"
        style={{
          fontSize: SIZES.xMedium,
          color: COLORS.black,
        }}>
        {title}
      </CustomText>
      <View
        style={{
          flexDirection: 'row', width:'35%'
        }}>
        <Box title={'Room'}/>
        <Box title={'Adult'}/>
        <Box title={'Children'}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFEFEF',
    height: scale(25),
    minWidth: scale(46),
    paddingHorizontal: scale(10),
    borderRadius: scale(20),
    // borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
});
