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
          'Huỷ miễn phí',
          'Thanh toán tại khách sạn',
          'Giường lớn',
          'Miễn phí bữa sáng',
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
