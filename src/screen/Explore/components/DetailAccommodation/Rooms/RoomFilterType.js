import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../../components/CustomText';
import {Category} from '../../../../../components';

export default function RoomFilterType() {
  return (
    <View>
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
