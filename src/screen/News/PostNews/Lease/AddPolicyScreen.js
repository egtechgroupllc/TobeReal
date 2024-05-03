import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainWrapper from '../../../../components/MainWrapper';
import {SHADOW, SIZES, scale} from '../../../../assets/constants';
import CustomText from '../../../../components/CustomText';
import RulesPolicy1 from './components/AddPolicy/RulesPolicy1';
import RulesPolicy2 from './components/AddPolicy/RulesPolicy2';
import RulesPolicy4 from './components/AddPolicy/RulesPolicy4';
import RulesPolicy5 from './components/AddPolicy/RulesPolicy5';
import SetNamePolicy from './components/AddPolicy/SetNamePolicy';
import RulesPolicy6 from './components/AddPolicy/RulesPolicy6';
import RulesPolicy3 from './components/AddPolicy/RulesPolicy3';

export default function AddPolicyScreen() {
  return (
    <MainWrapper
      noImgColor
      styleContent={{
        paddingHorizontal: scale(10),
      }}>
      <View style={styles.content}>
        <Box
          title="Quý vị muốn sử dụng chính sách hủy phòng nào cho loại giá này?"
          num="1">
          <RulesPolicy1 />
        </Box>

        <Box num="2" title="Quý vị có muốn bao gồm bữa ăn trong loại giá này?">
          <RulesPolicy2 />
        </Box>

        <Box
          num="3"
          title="Quý vị muốn thêm dịch vụ giá trị gia tăng vào loại giá này?">
          <RulesPolicy3 />
        </Box>

        <Box
          num="4"
          title="Quý vị có muốn thiết lập thời gian lưu trú tối thiểu cho loại giá này không?">
          <RulesPolicy4 />
        </Box>

        <Box
          num="5"
          title="Khách có thể đặt với loại giá này bao nhiêu ngày trước khi nhận phòng?">
          <RulesPolicy5 />
        </Box>

        <Box
          num="6"
          title="Quý vị muốn loại giá mới này rẻ hơn hay đắt hơn Loại giá cho khách đặt sớm (15+ ngày)?">
          <RulesPolicy6 />
        </Box>

        <Box num="7" title="Quý vị có muốn đặt tên cho loại giá này là gì?">
          <SetNamePolicy />
        </Box>
      </View>
    </MainWrapper>
  );
}
const Box = ({title, num, children}) => {
  return (
    <View
      style={{
        rowGap: scale(12),
      }}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: scale(10),
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            padding: scale(6),
            backgroundColor: '#ddd',
            borderRadius: scale(6),
          }}>
          <CustomText textType="bold">{num}</CustomText>
        </View>

        <CustomText textType="bold" size={SIZES.xMedium} style={{flex: 1}}>
          {title}
        </CustomText>
      </View>

      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    flex: 1,
    minHeight: scale(300),
    padding: scale(12),
    borderRadius: scale(9),
    ...SHADOW,
    rowGap: scale(30),
  },
});
