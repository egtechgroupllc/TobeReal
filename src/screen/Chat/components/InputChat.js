import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomInput} from '../../../components';
import {COLORS, scale} from '../../../assets/constants';

export default function InputChat() {
  return (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: scale(20),
        flex: 1,
      }}>
      <CustomInput style={{borderWidth: 0}} placeholder="Nhập tin nhắn" />
    </View>
  );
}

const styles = StyleSheet.create({});
