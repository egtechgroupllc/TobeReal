import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {Category} from '../../../../../components';
import {scale} from '../../../../../assets/constants';

export default function RoomFilterType() {
  return (
    <View style={{marginTop: scale(10)}}>
      <Category
        isShadow={false}
        data={[
          'Free cancellation',
          'Pay at the hotel',
          'Big bed',
          'Free breakfast',
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
