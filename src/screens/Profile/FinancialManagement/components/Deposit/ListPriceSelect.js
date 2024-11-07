import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../../../assets/constants';
import {formatPrice} from '../../../../../utils/format';
import CustomText from '../../../../../components/CustomText';
import {CustomInput} from '../../../../../components';
import {
  requireField,
  validateMaxAmount,
  validateMaxLengthText,
  validateMinAmount,
} from '../../../../../utils/validate';
import {useLanguage} from '../../../../../hooks/useLanguage';
import CustomImage from '../../../../../components/CustomImage';
import {useCountry} from '../../../../../hooks/useCountry';
const listPrice = [
  {
    value: 5,
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 50,
  },
  {
    value: 100,
  },
  {
    value: 200,
  },
  {
    value: 300,
  },
  {
    value: 500,
  },
  {
    value: 1000,
  },
];
export default function ListPriceSelect({control, setValue, typeAccountBank}) {
  const [select, setSelect] = useState(listPrice[0]);

  useEffect(() => {
    setValue('amount', select.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.value]);
  const {currency} = useCountry();

  return (
    <>
      <View style={styles.wrapper}>
        {listPrice.map((item, index) => {
          const isSelect = select?.value === item.value;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelect(item)}
              key={index}
              style={[
                styles.box,
                isSelect && {
                  borderWidth: 1.6,
                  borderColor: COLORS.primary,
                },
              ]}>
              <CustomText
                textType="bold"
                style={{
                  fontSize: SIZES.xMedium,
                  textAlign: 'center',
                  color: isSelect ? COLORS.primary : COLORS.black,
                }}>
                {formatPrice(item?.value)}
                {/* {formatPrice(item?.value * currency?.exchange_rate, {
                  currency: currency?.currency_code,
                })} */}
              </CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: scale(5),
    paddingVertical: scale(20),
    flexDirection: 'row',
    gap: scale(5),
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    borderRadius: scale(5),
    padding: scale(7),
    justifyContent: 'center',
    width: '31%',
    aspectRatio: 2,
    backgroundColor: COLORS.white,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
