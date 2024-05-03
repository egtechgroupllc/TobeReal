import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RadioButton from '../../../../../components/RadioButton';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CheckBox from '../../../../../../components/CheckBox';
import Collapsible from 'react-native-collapsible';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';

const list = [
  {
    id: 1,
    title: 'Không (loại giá này dùng được cho tất cả các độ dài lưu trú)',
  },
  {
    id: 2,
    title: 'Có',
  },
];

export default function RulesPolicy4() {
  const [isSelect, setIsSelect] = useState(1);

  return (
    <View>
      <View
        style={{
          rowGap: scale(10),
        }}>
        {list.map((item, index) => {
          return (
            <RadioButton
              onPress={() => setIsSelect(index)}
              key={index}
              title={item?.title}
              isCheck={isSelect === index}
            />
          );
        })}
      </View>
      <Collapsible collapsed={isSelect === 0}>
        <View style={styles.boxCheckMeal}>
          <CustomInput
            defaultValue="2"
            style={styles.textInput}
            maxLength={2}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
          />
          <CustomText>Đêm lưu trú tối thiểu</CustomText>

          <View style={styles.note}>
            <View style={styles.arrowTop} />
            <CustomText>
              Điều này sẽ không ảnh hưởng đến bất kỳ giới hạn thời gian lưu trú
              nào đã cài trong lịch của Quý vị.
            </CustomText>
          </View>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  boxCheckMeal: {
    rowGap: scale(4),
    marginLeft: '7%',
    marginTop: scale(12),
  },
  textInput: {
    borderRadius: scale(6),
    width: '90%',
  },
  note: {
    marginTop: scale(4),
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    padding: scale(10),
    borderRadius: scale(6),
    alignItems: 'flex-start',
  },
  arrowTop: {
    borderWidth: scale(7),
    borderColor: '#00000000',
    borderBottomColor: '#E3E3E3',
    position: 'absolute',
    top: scale(-12),
    left: scale(10),
  },
});
