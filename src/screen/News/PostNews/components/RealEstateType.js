/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES, scale} from '../../../../assets/constants';
import CustomSelectDropdown from '../../../../components/CustomSelectDropdown';
import CustomText from '../../../../components/CustomText';

export default memo(function RealEstateType({
  onSelect,
  styleWrapper,
  label,
  name = '',
  control,
  getKeyValue = 'id',
  data = [],
  watch = () => {},
}) {
  return (
    <View
      style={{
        width: '100%',
        ...styleWrapper,
      }}>
      <CustomSelectDropdown
        label={label}
        data={data}
        name={name}
        getKeyValue={getKeyValue}
        control={control}
        buttonStyle={styles.buttonEstateTypes}
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
        renderCustomizedRowChild={item => {
          return (
            <CustomText
              style={{
                paddingHorizontal: SIZES.medium,
                fontSize: scale(13),
              }}>
              {item?.name}
            </CustomText>
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
