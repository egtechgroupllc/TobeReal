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

export default memo(function InputPriceRoom({
  control,
  priceValue = 0,
  currencyValue = 'USD',
  setValue,
}) {
  const {t} = useLanguage();

  const {data, isLoading} = useQuery({
    queryKey: ['common', 'list-constant'],
    queryFn: getListConstant,
  });

  const [typeCurrency, setTypeCurrency] = useState(currencyValue);
  return (
    <View
      style={{
        rowGap: scale(4),
      }}>
      <InputPrice
        name="price"
        control={control}
        setValue={setValue}
        label={t('Amount per night?')}
        rules={requireField(t('this_field_required'))}
        placeholder={t('enter_price')}
        style={styles.textInput}
        onChangeCurrency={value => setTypeCurrency(value?.currency_code)}
      />

      <View
        style={{
          rowGap: scale(10),
        }}>
        <CustomText color={COLORS.text}>
          Bao gồm các loại thuế, phí và hoa hồng
        </CustomText>

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
              Hoa hồng cho Saveloka
            </CustomText>
          </CustomText>

          <View
            style={{
              marginLeft: scale(10),
            }}>
            <ItemUtil
              Icon={IconCheckBox}
              value={'Trợ giúp 24/7 bằng ngôn ngữ của bạn'}
            />
            <ItemUtil
              Icon={IconCheckBox}
              value={'Tiết kiệm thời gian với đặt phòng được xác nhận tự động'}
            />
            <ItemUtil
              Icon={IconCheckBox}
              value={'Chúng tôi sẽ quảng bá chỗ ở của bạn trên Google'}
            />
          </View>

          <CustomText
            color={COLORS.primary}
            textType="semiBold"
            size={SIZES.xMedium}>
            {formatPrice(priceValue * data?.data?.fee_commission_percent, {
              currency: typeCurrency,
            })}{' '}
            <CustomText textType="medium" size={SIZES.xMedium}>
              Doanh thu của bạn (bao gồm thuế)
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
