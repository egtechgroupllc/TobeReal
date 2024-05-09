/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../assets/constants';
import {CustomInput} from '../../components';
import CustomText from '../../components/CustomText';

export default function InputPrice({
  name,
  nameCurrency = 'currency_id',
  control,
  rules,
  setValue,
  watch,
  valueCurrency,
  valuePrice,
  label,
  placeholder,
  style,
  onChangeCurrency,
}) {
  const {navigate} = useNavigation();
  const [dataFromScreen, setDataFromScreen] = useState({
    currency_code: 'USD',
    id: 1,
  });

  const onGoBack = (value, onChange) => {
    if (value) {
      setDataFromScreen(value);
      setValue && setValue(nameCurrency, value?.id);
    }
  };

  useEffect(() => {
    if (onChangeCurrency) {
      onChangeCurrency(dataFromScreen);
    }
  }, [dataFromScreen?.currency_code]);

  useEffect(() => {
    setValue(nameCurrency, 1);
  }, []);

  return (
    <CustomInput
      label={label}
      styleTextLabel={styles.label}
      name={name || 'price'}
      control={control}
      rules={rules}
      placeholder={placeholder}
      style={style}
      keyboardType="number-pad"
      enableFormatNum
      maxLength={14}
      inputMode="numeric"
      componentLeft={
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'CurrencyScreen',
              params: {
                onGoBack: data => {
                  onGoBack(data);
                },

                currency: dataFromScreen,
              },
            });
          }}
          style={styles.boxCurrency}>
          <CustomText
            textType="medium"
            style={{
              minWidth: scale(26),
              textAlign: 'center',
            }}>
            {dataFromScreen?.currency_code}
          </CustomText>
          <View style={styles.border} />
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  boxCurrency: {
    columnGap: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  border: {
    width: 1,
    height: '50%',
    backgroundColor: COLORS.textSub,
  },
  label: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
});