import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RadioButton from '../../../../../components/RadioButton';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CheckBox from '../../../../../../components/CheckBox';
import Collapsible from 'react-native-collapsible';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {
  requireField,
  validateMinMaxAmount,
} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';

const list = [
  {
    id: 1,
    title: 'Bất cứ lúc nào (loại giá này luôn hoạt động)',
  },
  {
    id: 2,
    title: 'Cài đặt số ngày trước khi nhận phòng',
  },
];

export default function RulesPolicy5({control, unregister}) {
  const {t} = useLanguage();

  const [isSelect, setIsSelect] = useState(0);

  useEffect(() => {
    if (isSelect === 0) {
      unregister('min_number_day_before');
    }
  }, [isSelect]);

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
            defaultValue={isSelect === 1 && '2'}
            style={styles.textInput}
            maxLength={2}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            control={isSelect === 1 && control}
            name="min_number_day_before"
            rules={[
              requireField(t('this_field_required')),
              validateMinMaxAmount(
                'Số ngày đặt trước phải hợp lệ (1 -> 28)',
                28,
              ),
            ]}
          />
          <CustomText>Ngày hoặc hơn trước khi nhận phòng</CustomText>
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
});
