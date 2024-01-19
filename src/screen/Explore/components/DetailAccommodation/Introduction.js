import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../../../components/CustomText';
import {SIZES, WIDTH, scale} from '../../../../assets/constants';
import {TabSelect} from '../../../../components';
import WrapperContent from '../WrapperContent';

const listTab = ['Location', 'Info'];
export default function Introduction() {
  const [tabSelect, setTabSelect] = useState(listTab[0]);

  return (
    <WrapperContent
      isSeeAll
      onPressSeeAll={() => console.log(1)}
      heading="Introduction"
      styleContent={{
        paddingHorizontal: scale(16),
      }}>
      <TabSelect
        data={listTab}
        onChange={value => {
          setTabSelect(value);
        }}
        styleContent={{
          padding: scale(12),
        }}
        renderView={() =>
          tabSelect === listTab[0] ? (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              Lưu trú tại Cochin Sang Hotel là một lựa chọn đúng đắn khi quý
              khách đến thăm Phường Bến Thành. khách sạn sở hữu vị trí đắc địa
              cách sân bay Sân bay Tân Sơn Nhất 6,64 km. Lưu trú tại Cochin Sang
              Hotel là một lựa chọn đúng đắn khi quý khách đến thăm Phường Bến
              Thành. khách sạn sở hữu vị trí đắc địa cách sân bay Sân bay Tân
              Sơn Nhất 6,64 km.
            </CustomText>
          ) : (
            <CustomText
              style={{
                lineHeight: 18,
              }}>
              Hãy tận hưởng trải nghiệm lưu trú có một không hai tại toà nhà
              mang đậm dấu ấn lịch sử của Cochin Sang Hotel, điều quý khách khó
              có thể tìm thấy tại bất kỳ đâu. {'\n'}Nếu dự định có một kỳ nghỉ
              dài, thì Cochin Sang Hotel chính là lựa chọn dành cho quý khách.
              Với đầy đủ tiện nghi với chất lượng dịch vụ tuyệt vời, Cochin Sang
              Hotel sẽ khiến quý khách cảm thấy thoải mái như đang ở nhà vậy.
            </CustomText>
          )
        }
      />
    </WrapperContent>
  );
}

const styles = StyleSheet.create({
  introduction: {
    // backgroundColor: '#ccc',
    width: WIDTH.widthContain,
    rowGap: scale(10),
  },
  textIntroduction: {
    fontSize: SIZES.medium,
  },
  textSubIntroduction: {
    fontSize: SIZES.xMedium,
  },
});
