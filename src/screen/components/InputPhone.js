/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZES, scale} from '../../assets/constants';
import {CustomInput} from '../../components';
import CustomText from '../../components/CustomText';
import {useLanguage} from '../../hooks/useLanguage';
import {validatePhone} from '../../utils/validate';

export default (function InputPhone({
  name = 'contact_phone',
  control,
  rules,
  setValue,
  valuePhone,
  label,
  placeholder,
  style,
  onChangeCountry,
  onChange,
}) {
  const {t} = useLanguage();
  const {navigate} = useNavigation();
  const [numPhone, setNumPhone] = useState('');

  const [dataFromScreen, setDataFromScreen] = useState({
    currency_code: 'USD',
    id: 233,
    phone_code: '+1',
    iso2: 'VN',
  });

  const onGoBack = value => {
    if (value) {
      setDataFromScreen(value);
    }
  };

  useEffect(() => {
    if (onChangeCountry) {
      onChangeCountry(dataFromScreen);
    }
  }, [dataFromScreen?.phone_code]);

  useEffect(() => {
    if (onChange) {
      onChange(dataFromScreen?.phone_code + numPhone);
    }

    // if (setValue) {
    //   setValue(name, dataFromScreen?.phone_code + numPhone);
    // }
  }, [dataFromScreen?.phone_code, numPhone]);

  return (
    <CustomInput
      label={label}
      styleTextLabel={styles.label}
      name={name}
      control={control}
      rules={[rules, validatePhone(t('invalidPhone'), dataFromScreen?.iso2)]}
      placeholder={placeholder}
      style={style}
      keyboardType="number-pad"
      maxLength={17}
      inputMode="numeric"
      onChange={valueText => {
        const {text} = valueText.nativeEvent;

        setNumPhone(text);
      }}
      componentLeft={
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigate('NoBottomTab', {
              screen: 'CountryScreen',
              params: {
                onGoBack: data => {
                  onGoBack(data);
                },

                country: dataFromScreen,
                isPhone: true,
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
            {dataFromScreen?.phone_code}
          </CustomText>
          <View style={styles.border} />
        </TouchableOpacity>
      }
    />
  );
});

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
