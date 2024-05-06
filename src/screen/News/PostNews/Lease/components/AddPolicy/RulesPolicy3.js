import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';

export default function RulesPolicy3({setValue, unregister}) {
  const {navigate} = useNavigation();

  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      <CustomText>
        Mỗi loại giá có thể có tôi đa 5 dịch vụ giá trị gia tăng, chảng hạn như
        chỗ đô xe, mát-xa và tin dụng.
      </CustomText>
      <CustomText
        color={COLORS.blue}
        textType="medium"
        onPress={() => navigate('FeaturesPolicyScreen')}>
        Thêm dịch vụ giá trị gia tăng mới
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
