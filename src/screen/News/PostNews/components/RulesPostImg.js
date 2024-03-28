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
        - Quy định đăng hình:
      </CustomText>
      <CustomText>• Đăng tối thiểu 4 ảnh</CustomText>
      <CustomText>• Đăng tối đa 24 ảnh với tất cả các loại tin</CustomText>
      <CustomText>• Hãy dùng ảnh thật, không trùng</CustomText>
      <CustomText>• Mỗi ảnh kích thước tối thiểu 100x100 px</CustomText>
      <CustomText>• Mô tả ảnh tối đa 45 kí tự.</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
