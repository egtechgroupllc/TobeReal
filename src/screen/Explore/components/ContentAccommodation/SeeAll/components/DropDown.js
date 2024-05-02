/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect, useRef, useState} from 'react';
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
  status,
  getKeyValue = 'value',
  data = [],
  price,
  acreage,
  watch = () => {},
}) {
  const [filterPrice, setFilterPrice] = useState(null);
  const [filterAcreage, setFilterAcreage] = useState(null);
  const refDrop = useRef();

  return (
    <View
      style={{
        width: '100%',
        ...styleWrapper,
      }}>
      <CustomSelectDropdown
        ref={refDrop}
        label={label}
        data={data}
        name={name}
        rules={[]}
        getKeyValue={getKeyValue}
        control={control}
        buttonStyle={styles.buttonEstateTypes}
        rowStyle={{
          height: 'auto',
          paddingVertical: scale(10),
        }}
        onSelect={(selectedItem, i) => {
          onSelect && onSelect(selectedItem);

          setFilterPrice(null);
          setFilterAcreage(null);
        }}
        renderCustomizedButtonChild={item => {
          const value = !control ? item : !watch(name) ? {} : item;

          return (
            <CustomText
              style={{
                fontSize: scale(13),
              }}>
              {filterPrice
                ? `${filterPrice[0]}$ - ${filterPrice[1]}$`
                : filterAcreage
                ? `${filterAcreage[0]}m² - ${filterAcreage[1]}m²`
                : value?.name || 'Select' || status}
            </CustomText>
          );
        }}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View>
              {index === 0 && price && (
                <Price
                  onPress={value => {
                    setFilterPrice(value);
                    onSelect(value);
                    refDrop.current?.closeDropdown();
                  }}
                />
              )}
              {index === 0 && acreage && (
                <Acreage
                  onPress={value => {
                    setFilterAcreage(value);
                    onSelect(value);
                    refDrop.current?.closeDropdown();
                  }}
                />
              )}
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
