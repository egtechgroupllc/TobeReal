import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {SIZES, scale} from '../../../../../../assets/constants';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import RadioButton from '../../../../../components/RadioButton';
import {
  requireField,
  validateMinAmount,
  validateMinMaxAmount,
} from '../../../../../../utils/validate';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RulesPolicy4({control, unregister}) {
  const {t} = useLanguage();
  const [isSelect, setIsSelect] = useState(0);
  const list = [
    {
      id: 1,
      title: t('no_all_stay'),
    },
    {
      id: 2,
      title: t('yes'),
    },
  ];
  useEffect(() => {
    if (isSelect === 0) {
      unregister('min_number_day');
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
            name="min_number_day"
            rules={[
              requireField(t('this_field_required')),
              validateMinMaxAmount('Invalid minimum night stay (1 -> 28)', 28),
            ]}
          />
          <CustomText>Minimum night stay</CustomText>

          <View style={styles.note}>
            <View style={styles.arrowTop} />
            <CustomText>
              This will not affect any length of stay limits which is set in
              your calendar.
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
