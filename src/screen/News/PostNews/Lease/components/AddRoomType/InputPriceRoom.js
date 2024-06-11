import {useQuery} from '@tanstack/react-query';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {getListConstant} from '../../../../../../Model/api/common';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import {IconCheckBox} from '../../../../../../assets/icon/Icon';
import CustomText from '../../../../../../components/CustomText';
import {useLanguage} from '../../../../../../hooks/useLanguage';
import {formatPrice} from '../../../../../../utils/format';
import {requireField} from '../../../../../../utils/validate';
import ItemUtil from '../../../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import InputPrice from '../../../../../components/InputPrice';
import {useCountry} from '../../../../../../hooks/useCountry';
import {useForm} from 'react-hook-form';

export default memo(function InputPriceRoom({
  control,
  priceValue = 0,
  // currencyValue,
  setValue,
}) {
  const {t} = useLanguage();
  const {watch} = useForm();
  const {data, isLoading} = useQuery({
    queryKey: ['common', 'list-constant'],
    queryFn: getListConstant,
  });

  const [typeCurrency, setTypeCurrency] = useState();
  const {currency} = useCountry();

  return (
    <View
      style={{
        rowGap: scale(4),
      }}>
      <InputPrice
        name="price"
        control={control}
        setValue={setValue}
        label={t('amount_per_night')}
        rules={requireField(t('this_field_required'))}
        placeholder={t('enter_price')}
        style={styles.textInput}
        // onChangeCurrency={value => setTypeCurrency(currency?.currency_code)}
      />

      <View
        style={{
          rowGap: scale(10),
        }}>
        <CustomText color={COLORS.text}>{t('include_taxes')}</CustomText>

        <Collapsible
          collapsed={!priceValue}
          style={{
            marginLeft: scale(10),
            rowGap: scale(7),
            width: '90%',
          }}>
          <CustomText
            color={COLORS.primary}
            textType="semiBold"
            size={SIZES.xMedium}>
            {data?.data?.fee_commission_percent * 100}%{' '}
            <CustomText textType="medium" size={SIZES.xMedium}>
              {t('commission_for_saveloka')}
            </CustomText>
          </CustomText>

          <View
            style={{
              marginLeft: scale(10),
            }}>
            <ItemUtil Icon={IconCheckBox} value={t('help_in_language')} />
            <ItemUtil Icon={IconCheckBox} value={t('save_time_automatic')} />
            <ItemUtil Icon={IconCheckBox} value={t('we_will_promote')} />
          </View>

          <CustomText
            color={COLORS.primary}
            textType="semiBold"
            size={SIZES.xMedium}>
            {formatPrice(priceValue * data?.data?.fee_commission_percent, {
              currency: typeCurrency,
            })}{' '}
            <CustomText textType="medium" size={SIZES.xMedium}>
              {t('your_revenue')}
            </CustomText>
          </CustomText>
        </Collapsible>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderRadius: scale(6),
  },
});
