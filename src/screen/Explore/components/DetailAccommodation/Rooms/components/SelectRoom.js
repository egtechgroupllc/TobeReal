import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import RealEstateType from '../../../../../News/PostNews/components/RealEstateType';
import {CustomButton} from '../../../../../../components';

export default function SelectRoom({onPress}) {
  return (
    <View
      style={{
        rowGap: scale(8),
        alignItems: 'flex-end',
      }}>
      <CustomText
        style={{
          color: COLORS.error,
        }}>
        Còn 3 phòng
      </CustomText>

      <View
        style={{
          ...styles.row,
          columnGap: scale(10),
        }}>
        <RealEstateType
          isDefaultValue
          styleWrapper={{width: '40%'}}
          data={[...Array(4)].map((_, index) => ({
            name: `${index + 1} phòng`,
            value: index,
          }))}
          buttonEstateTypes={{
            height: scale(32),
          }}
        />

        <CustomButton
          onPress={onPress}
          buttonType="normal"
          text="Đặt phòng"
          styleWrapper={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
