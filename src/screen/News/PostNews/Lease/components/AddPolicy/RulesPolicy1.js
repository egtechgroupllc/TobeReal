import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '../../../../../../components/CheckBox';
import RadioButton from '../../../../../components/RadioButton';
import {scale} from '../../../../../../assets/constants';

const list = [
  {
    id: 1,
    title: 'Linh động - 18:00 vào ngày nhận phòng',
  },
  {
    id: 2,
    title: 'Linh động - trước 1 ngày',
  },
  {
    id: 3,
    title: 'Không hoàn tiền',
  },
];

export default function RulesPolicy1() {
  const [isSelect, setIsSelect] = useState(2);

  return (
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
  );
}

const styles = StyleSheet.create({});
