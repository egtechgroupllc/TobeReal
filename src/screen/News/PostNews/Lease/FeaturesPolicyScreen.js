import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/CustomText';
import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import FeaturesPolicy1 from './components/FeaturesPolicy.js/FeaturesPolicy1';
import CheckBox from '../../../../components/CheckBox';
import FeaturesPolicy2 from './components/FeaturesPolicy.js/FeaturesPolicy2';
import FeaturesPolicy3 from './components/FeaturesPolicy.js/FeaturesPolicy3';

export default function FeaturesPolicyScreen() {
  return (
    <View>
      <View
        style={{
          marginHorizontal: scale(10),
          backgroundColor: '#fff',
          borderRadius: scale(6),
          padding: scale(10),
          rowGap: scale(20),
          ...SHADOW,
        }}>
        <Box title={'Vật nuôi'}>
          <FeaturesPolicy1 />
        </Box>
        <Box title={'Hút Thuốc'}>
          <FeaturesPolicy2 />
        </Box>
        <Box title={'Bữa sáng bỗ sung'}>
          <FeaturesPolicy3 />
        </Box>
      </View>
    </View>
  );
}

const Box = ({Icon, title, children}) => {
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'center',
        }}>
        {Icon && <Icon />}
        <CustomText textType="bold" size={SIZES.xMedium} style={{flex: 1}}>
          {title}
        </CustomText>
      </View>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({});
