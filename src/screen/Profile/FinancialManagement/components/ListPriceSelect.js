import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SHADOW, SIZES, scale} from '../../../../assets/constants';
import {formatPrice} from '../../../../utils/format';
import CustomText from '../../../../components/CustomText';
import {CustomInput} from '../../../../components';
import {requireField} from '../../../../utils/validate';
import {useLanguage} from '../../../../hooks/useLanguage';
const listPrice = [
  {
    value: 500000,
  },
  {
    value: 1000000,
  },
  {
    value: 2000000,
  },
  {
    value: 3000000,
  },
  {
    value: 5000000,
  },
  {
    value: 10000000,
  },
];
export default function ListPriceSelect({control, setValue}) {
  const {t} = useLanguage();
  const [select, setSelect] = useState(listPrice[0]);

  useEffect(() => {
    setValue('amount', select.value);
  }, [select.value]);

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          //   height: scale(100),
          borderRadius: scale(10),
          padding: scale(10),
        }}>
        <CustomInput
          label="Nhập số tiền bạn muốn nạp"
          styleTextLabel={{
            textType: 'medium',
            fontSize: SIZES.xMedium,
          }}
          control={control}
          value={String(select.value)}
          placeholder={`Nhâp tối thiểu ${formatPrice(100)} `}
          rules={[requireField(t('this_field_required'))]}
        />
      </View>
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
                {formatPrice(item.value)}
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
    gap: scale(10),
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    borderRadius: scale(5),
    padding: scale(10),
    justifyContent: 'center',
    width: '31%',
    aspectRatio: 1.8,
    backgroundColor: COLORS.white,
    ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
});
