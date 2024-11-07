import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useCountry} from '~/hooks/useCountry';
import {useLanguage} from '~/hooks/useLanguage';
import {useAuthentication} from '~/hooks/useAuthentication';
import {IconWallet} from '~/assets/icon/Icon';
import {CImage, CText} from '~/components';
import {formatPrice} from '~/utils/format';
import {COLORS, images, SHADOW, SIZES} from '~/assets/constants';
import {scale} from '~/utils/scale';
import Input from '~/components/Input';
import {
  requireField,
  validateMaxAmount,
  validateMinAmount,
} from '~/utils/validate';

export default function TopContent({control}) {
  const {currency} = useCountry();
  const {t} = useLanguage();
  const minPrice = 1 * currency?.exchange_rate;
  const maxPrice = 1000 * currency?.exchange_rate;
  const {token} = useAuthentication();
  const queryClient = useQueryClient();
  // const {isLoading, data} = useQuery({
  //   queryKey: ['user', 'profile'],
  //   queryFn: () => getProfile(token),
  //   enabled: !!token,
  // });
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.wallet}>
        <IconWallet fill={COLORS.White} />
        {/* <CText
          textType="bold"
          numberOfLines={1}
          style={{color: COLORS.primary, fontSize: SIZES.xMedium}}>
          {formatPrice(data?.data?.balance * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })}
        </CText> */}
      </View>
      <CImage
        source={images.logoSplash}
        style={{height: scale(120)}}
        resizeMode="contain"
      />

      <Input
        maxLength={10}
        label={t('enter_amount_withdraw')}
        styleTextLabel={{fontSize: SIZES.medium}}
        style={{...styles.boxItem, borderWidth: 0}}
        styleWrapper={{paddingVertical: scale(10)}}
        control={control}
        name="amount"
        enableFormatNum
        placeholder={`${t('minimum_entry')} ${formatPrice(minPrice, {
          currency: currency?.currency_code,
        })} `}
        rules={[
          requireField(t('this_field_required')),
          validateMaxAmount(
            `${t('maximum_amount')} ${formatPrice(maxPrice, {
              currency: currency?.currency_code,
            })}`,
            maxPrice,
          ),
          validateMinAmount(
            `${t('minimum_amount')} ${formatPrice(minPrice, {
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
    backgroundColor: COLORS.input,
    minHeight: scale(40),
    minWidth: scale(90),
    borderRadius: scale(10),
    ...SHADOW,
  },
});
