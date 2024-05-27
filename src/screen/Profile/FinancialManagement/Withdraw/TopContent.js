import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  COLORS,
  SHADOW,
  SIZES,
  images,
  scale,
} from '../../../../assets/constants';
import {IconWallet} from '../../../../assets/icon/Icon';
import CustomImage from '../../../../components/CustomImage';
import CustomText from '../../../../components/CustomText';
import {useCountry} from '../../../../hooks/useCountry';
import {useLanguage} from '../../../../hooks/useLanguage';
import {formatPrice} from '../../../../utils/format';
import {CustomInput} from '../../../../components';
import {
  requireField,
  validateMaxAmount,
  validateMinAmount,
} from '../../../../utils/validate';
import {useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getProfile} from '../../../../Model/api/common';
import {useAuthentication} from '../../../../hooks/useAuthentication';

export default function TopContent({control}) {
  const {currency} = useCountry();
  const {t} = useLanguage();
  const minPrice = 1 * currency?.exchange_rate;
  const maxPrice = 1000 * currency?.exchange_rate;
  const {token} = useAuthentication();
  const queryClient = useQueryClient();
  const {isLoading, data} = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => getProfile(token),
    enabled: !!token,
  });
  return (
    <View>
      <View style={styles.wallet}>
        <IconWallet />
        <CustomText
          textType="bold"
          numberOfLines={1}
          style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
          {formatPrice(data?.data?.balance * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })}
        </CustomText>
      </View>
      <CustomImage
        source={images.logo1}
        style={{height: scale(120)}}
        resizeMode="contain"
      />

      <CustomInput
        label="Enter the amount you want to withdraw"
        styleTextLabel={{fontSize: SIZES.medium}}
        style={{...styles.boxItem, borderWidth: 0}}
        styleWrapper={{paddingVertical: scale(10)}}
        control={control}
        name="amount"
        enableFormatNum
        placeholder={`Nhập tối thiểu ${formatPrice(minPrice, {
          currency: currency?.currency_code,
        })} `}
        rules={[
          requireField(t('this_field_required')),
          validateMaxAmount(
            `Số tiền tối đa là ${formatPrice(maxPrice, {
              currency: currency?.currency_code,
            })}`,
            maxPrice,
          ),
          validateMinAmount(
            `Số tiền tối thiểu là ${formatPrice(minPrice, {
              currency: currency?.currency_code,
            })}`,
            minPrice,
          ),
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    width: '100%',
    minHeight: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    paddingVertical: scale(10),
    // ...SHADOW,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: scale(6),
    columnGap: scale(14),
    backgroundColor: '#fff',
  },
  wallet: {
    marginBottom: scale(20),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    columnGap: scale(5),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    flexDirection: 'row',
    right: scale(10),
    backgroundColor: COLORS.white,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});
