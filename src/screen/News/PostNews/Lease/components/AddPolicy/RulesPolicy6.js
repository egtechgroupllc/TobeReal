import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RadioButton from '../../../../../components/RadioButton';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CheckBox from '../../../../../../components/CheckBox';
import Collapsible from 'react-native-collapsible';
import {CustomInput} from '../../../../../../components';
import CustomText from '../../../../../../components/CustomText';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {
  requireField,
  validateMinMaxAmount,
} from '../../../../../../utils/validate';
import {IconAdd} from '../../../../../../assets/icon/Icon';
import {formatPrice} from '../../../../../../utils/format';
import {useCountry} from '../../../../../../hooks/useCountry';

export default function RulesPolicy6({
  control,
  unregister,
  setValue,
  data,
  watch,
}) {
  const {t} = useLanguage();
  const {currency} = useCountry();
  const list = [
    {
      id: 1,
      title: t('Không giảm giá niêm yết'),
    },
    {
      id: 2,
      title: t('Giảm giá niêm yết'),
    },
  ];
  const [isSelect, setIsSelect] = useState(list[0]);

  useEffect(() => {
    setValue('isDiscount', isSelect.id === 1);
  }, [isSelect.id]);
  console.log(watch('price_percent'));
  return (
    <View>
      <View
        style={{
          rowGap: scale(10),
        }}>
        {list.map((item, index) => {
          return (
            <RadioButton
              onPress={() => setIsSelect(item)}
              key={index}
              title={item?.title}
              isCheck={isSelect.id === item.id}
            />
          );
        })}
      </View>

      {isSelect.id === 2 && (
        <Collapsible collapsed={false}>
          <View style={styles.boxCheckMeal}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: scale(10),
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <CustomInput
                  control={control}
                  defaultValue="10"
                  placeholder="%"
                  style={styles.textInput}
                  maxLength={2}
                  styleWrapper={{
                    flex: 0.7,
                  }}
                  styleText={{
                    fontSize: SIZES.xMedium,
                  }}
                  name="price_percent"
                  rules={[
                    requireField(t('this_field_required')),
                    validateMinMaxAmount(t('invalid_ratio'), 100),
                  ]}
                  componentRight={
                    <View style={styles.componentRight}>
                      <CustomText textType="semiBold" size={SIZES.xMedium}>
                        %
                      </CustomText>
                    </View>
                  }
                />
              </View>
            </View>
          </View>
        </Collapsible>
      )}
      <CustomText
        textType="regular"
        size={SIZES.small}
        style={{paddingTop: scale(15), paddingHorizontal: scale(5)}}>
        Giá niêm yết của phòng này:{' '}
        {formatPrice(data?.price, {
          currency: currency?.currency_code,
        })}
      </CustomText>
      {isSelect.id === 2 && (
        <CustomText
          textType="semiBold"
          size={SIZES.small}
          style={{paddingTop: scale(15), paddingHorizontal: scale(5)}}>
          Giá sau khi áp dụng chính sách giảm:{' '}
          {formatPrice(
            data?.price - data?.price * (watch('price_percent') / 100),
            {
              currency: currency?.currency_code,
            },
          )}
        </CustomText>
      )}
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
  },
  componentRight: {
    borderLeftWidth: 1,
    borderLeftColor: COLORS.grey,
    paddingLeft: scale(10),
  },
});
