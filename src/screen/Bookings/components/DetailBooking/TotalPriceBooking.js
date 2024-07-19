import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {COLORS, SIZES, scale} from '../../../../assets/constants';
import ItemUtil from '../../../Explore/components/DetailAccommodation/Rooms/components/ItemUtil';
import {IconInvoice} from '../../../../assets/icon/Icon';
import CustomText from '../../../../components/CustomText';
import {formatPrice, formatDate} from '../../../../utils/format';
import {useCountry} from '../../../../hooks/useCountry';
import {useLanguage} from '../../../../hooks/useLanguage';
import {differenceInDays} from 'date-fns';

export default function TotalPriceBooking({data, isTour}) {
  const {currency} = useCountry();
  const {t} = useLanguage();

  const difference = useMemo(
    () => differenceInDays(data?.check_out_date, data?.check_in_date),
    [data],
  );
  return (
    <View style={styles.wrapper}>
      {!isTour ? (
        <ItemUtil
          Icon={IconInvoice}
          title={`${t('total_room')}`}
          value={`${data?.number_room} ${t('room')}, ${difference} ${t(
            'night',
          )}`}
          styleTextValue={styles.textValueUntil}
          styleIcon={styles.iconUntil}
        />
      ) : (
        <ItemUtil
          Icon={IconInvoice}
          title={`${t('total_price')}`}
          styleTextValue={styles.textValueUntil}
          styleIcon={styles.iconUntil}
        />
      )}
      <View
        style={{
          alignItems: 'flex-end',
          rowGap: scale(3),
        }}>
        {/* <CustomText
          textType="medium"
          style={{
            textDecorationLine: 'line-through',
          }}>
          {formatPrice(data?.price * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })}
        </CustomText> */}
        <CustomText textType="bold" size={SIZES.medium} color="#ff5e1f">
          {formatPrice(data?.price * currency?.exchange_rate, {
            currency: currency?.currency_code,
          })}
        </CustomText>
        <CustomText color={'#42b00b'}>{t('best_price')}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    columnGap: scale(10),
    borderTopWidth: 1,
    paddingTop: scale(10),
    borderColor: COLORS.grey,
  },
  textValueUntil: {
    fontSize: SIZES.xMedium,
    color: COLORS.text,
    textTransform: 'lowercase',
  },
  iconUntil: {
    width: scale(18),
    height: scale(18),
  },
});
