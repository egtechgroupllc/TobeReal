/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, WIDTH, scale} from '../../../../../../assets/constants';

import Price from './Price';
import CustomSelectDropdown from '../../../../../../components/CustomSelectDropdown';
import CustomText from '../../../../../../components/CustomText';
import Acreage from './Acreage';

export default memo(function DropDown({
  onSelect,
  styleWrapper,
  label,
  name = '',
  control,
  getKeyValue = 'id',
  data = [],
  price,
  acreage,
  watch = () => {},
}) {
  return (
    <View
      style={{
        width: '100%',
        ...styleWrapper,
      }}>
      <CustomSelectDropdown
        styleTextLabel={{color: COLORS.black}}
        label={label}
        data={data}
        name={name}
        getKeyValue={getKeyValue}
        control={control}
        buttonStyle={styles.buttonEstateTypes}
        rowStyle={{
          height: 'auto',
          paddingVertical: scale(10),
        }}
        onSelect={(selectedItem, i) => {
          onSelect && onSelect(selectedItem);
        }}
        renderCustomizedButtonChild={item => {
          const value = !watch(name) ? {} : item;

          return (
            <CustomText
              style={{
                fontSize: scale(13),
              }}>
              {value?.name || 'Select'}
            </CustomText>
          );
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View>
              {index == 0 && price && <Price />}
              {index == 0 && acreage && <Acreage />}
              <View>
                <CustomText
                  style={{
                    paddingHorizontal: SIZES.medium,
                    fontSize: scale(13),
                  }}>
                  {item?.name}
                </CustomText>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  buttonEstateTypes: {
    borderWidth: scale(2),
    borderColor: '#EEEEEE',
    height: scale(40),
  },
});
