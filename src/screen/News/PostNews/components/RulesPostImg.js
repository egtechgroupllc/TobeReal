import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {scale} from '../../../../assets/constants';

export default function RulesPostImg() {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <CustomText textType="semiBold" style={{marginBottom: scale(6)}}>
        - Rules for posting pictures:
      </CustomText>
      <CustomText>• Post a minimum of 4 photos</CustomText>
      <CustomText>• Post up to 24 photos with all types of stories</CustomText>
      <CustomText>• Please use real photos, not duplicates</CustomText>
      <CustomText>• Each photo has a minimum size of 100x100 px</CustomText>
      <CustomText>• Describe photo in maximum 45 characters.</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
