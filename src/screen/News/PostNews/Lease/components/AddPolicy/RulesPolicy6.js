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
    title: 'Rẻ hơn Loại giá cho khách đặt sớm (15+ ngày)',
  },
  {
    id: 2,
    title: 'Đắt hơn Loại giá cho khách đặt sớm (15+ ngày)',
  },
];

export default function RulesPolicy6() {
  const [isSelect, setIsSelect] = useState(list[0]);

  return (
    <View>
      <View
        style={{
          rowGap: scale(10),
        }}>
        {list.map((item, index) => {
          return (
            <RadioButton
              onPress={() => setIsSelect(item)}
              key={index}
              title={item?.title}
              isCheck={isSelect.id === item.id}
            />
          );
        })}
      </View>
      <View style={styles.boxCheckMeal}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: scale(10),
          }}>
          <View
            style={{
              width: scale(10),
              backgroundColor: '#000',
              height: scale(1.4),
            }}
          />
          <CustomInput
            defaultValue="10"
            placeholder="%"
            style={styles.textInput}
            maxLength={3}
            styleWrapper={{
              flex: 0.7,
            }}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            componentRight={
              <View style={styles.componentRight}>
                <CustomText textType="semiBold" size={SIZES.xMedium}>
                  %
                </CustomText>
              </View>
            }
          />
        </View>
        <CustomText
          textType="medium"
          style={{
            marginLeft: '7%',
          }}>
          {isSelect.title}
        </CustomText>
      </View>
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
  },
  componentRight: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.grey,
    paddingLeft: scale(10),
  },
});
