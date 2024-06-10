/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import CustomSelectDropdown from '../../../../components/CustomSelectDropdown';
import CustomText from '../../../../components/CustomText';
import {useLanguage} from '../../../../hooks/useLanguage';

export default memo(function RealEstateType({
  onSelect,
  styleWrapper,
  buttonEstateTypes,
  label,
  name = '',
  control,
  getKeyValue = 'id',
  data = [],
  watch = () => {},
  value,
  isDefaultValue,
  valueFind = '',
}) {
  // const [dataFind, setDataFind] = useState([]);
  // const Finding = () => {
  //   const result = data?.find(
  //     item => {
  //       item?.[valueFind] === Number(watch(name));
  //       console.log(item);
  //       return result;
  //     },

  //     console.log(result, 1111),
  //     // setDataFind(result),
  //   );
  // };
  // useEffect(() => {
  //   Finding();
  // }, []);
  const {t} = useLanguage();

  const dataFind = useMemo(
    () =>
      valueFind &&
      data?.find(item => {
        return item?.[valueFind] === Number(watch(name));
      }),
    [valueFind, watch(name), data],
  );
  // console.log(watch(name), dataFind?.name, valueFind, 1232123213);
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
        defaultValue={isDefaultValue && data?.[0]}
        defaultValueByIndex={isDefaultValue && 0}
        buttonStyle={(styles.buttonEstateTypes, {...buttonEstateTypes})}
        onSelect={(selectedItem, i) => {
          onSelect && onSelect(selectedItem);
        }}
        renderCustomizedButtonChild={item => {
          const valueConvert = !control
            ? item
            : (!watch(name) ? {} : item) || value;
          return (
            <CustomText
              style={{
                fontSize: scale(13),
                color: COLORS.black,
              }}>
              {dataFind?.name || valueConvert?.name || t('select')}
            </CustomText>
          );
        }}
        renderCustomizedRowChild={item => {
          return (
            <View>
              <CustomText
                style={{
                  paddingHorizontal: SIZES.medium,
                  fontSize: scale(13),
                  color: COLORS.black,
                }}>
                {item?.name}
              </CustomText>
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
