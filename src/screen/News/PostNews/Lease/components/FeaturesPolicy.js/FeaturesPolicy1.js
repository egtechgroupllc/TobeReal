import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../../../assets/constants';
import RadioButton from '../../../../../components/RadioButton';
import Collapsible from 'react-native-collapsible';
import {CustomInput} from '../../../../../../components';
import {requireField} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import CustomText from '../../../../../../components/CustomText';

const list = [
  {
    id: 1,
    title: 'Không được mang theo thú cưng.',
  },
  {
    id: 2,
    title: 'Được mang theo thú cưng.',
  },
  {
    id: 3,
    title: 'Khác',
  },
];

export default function FeaturesPolicy1({control}) {
  const [isSelect, setIsSelect] = useState();
  const {t} = useLanguage();
  return (
    <View
      style={{
        rowGap: scale(10),
      }}>
      {list.map((item, index) => {
        return (
          <RadioButton
            key={index}
            title={item?.title}
            isCheck={isSelect === index}
            onPress={evt => {
              setIsSelect(index);
            }}
          />
        );
      })}

      <Collapsible collapsed={isSelect !== 2}>
        <View style={styles.boxCheckMeal}>
          <CustomInput
            placeholder="Mô tả yêu cầu khác "
            style={styles.textInput}
            maxLength={2}
            styleText={{
              fontSize: SIZES.xMedium,
            }}
            control={control}
            name="min_number_day"
            rules={[requireField(t('this_field_required'))]}
          />
          <CustomText>Mô tả yêu cầu khác</CustomText>
        </View>
      </Collapsible>
    </View>
  );
}
const styles = StyleSheet.create({
  boxCheckMeal: {
    rowGap: scale(4),
    marginLeft: '7%',
  },
  textInput: {
    borderRadius: scale(6),
    width: '90%',
  },
});