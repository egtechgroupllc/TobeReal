import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {
  IconBookings,
  IconNews,
  IconPeople,
  IconRoom,
  IconWifi,
} from '../../../../../../assets/icon/Icon';
import {COLORS, SIZES, scale} from '../../../../../../assets/constants';
import CustomText from '../../../../../../components/CustomText';
import {formatPrice, formatDate} from '../../../../../../utils/format';
import ItemUtil from './ItemUtil';
import {useCountry} from '../../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../../hooks/useLanguage';

export default function RoomUntil({data, price, isFilterChildren}) {
  const dataPolicies = data?.item;
  const RefundCondition = dataPolicies?.refund_fee;
  const {t} = useLanguage();
  const {currency} = useCountry();
  const feeCancel = useMemo(() => {
    if (RefundCondition === 1) {
      return t('cancel_without_refund');
    } else {
      return `${t('free_cancel_before')} ${formatDate(new Date(), {
        addDays: -dataPolicies?.refund_number_day,
      })}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RefundCondition]);

  // const calculatePrice = () => {
  //   if (dataPolicies?.price_percent && dataPolicies?.price_percent === 1) {
  //     return price;
  //   } else {
  //     return price - price * dataPolicies?.price_percent;
  //   }
  // };
  return (
    <>
      <ItemUtil
        Icon={IconBookings}
        value={feeCancel}
        color={RefundCondition !== 1 ? '#00875a' : COLORS.grey}
        backgroundColor={RefundCondition !== 1 ? '#e8fef5' : COLORS.white}
        styleWrapper={{
          borderRadius: 99,
        }}
      />
      <View>
        <ItemUtil
          Icon={IconPeople}
          value={
            !isFilterChildren
              ? `${t('max')} ${data?.max_occupancy} ${t('adult').toLowerCase()}`
              : `${t('max')} ${data?.max_occupancy} ${t(
                  'children',
                ).toLowerCase()}, ${data?.max_child_occupancy} children`
          }
        />
        <ItemUtil Icon={IconRoom} value={data.room_bed_type.name} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <ItemUtil
            Icon={IconPeople}
            value={`${t('breakfast_not_included')}`}
          />
          <ItemUtil Icon={IconRoom} value={t('no_refund')} />
          <ItemUtil Icon={IconWifi} value={t('WIFI_FREE')} color={'#00875a'} />
        </View>

        <View
          style={{
            rowGap: scale(7),
            alignItems: 'flex-end',
          }}>
          <View>
            {/* {dataPolicies?.price_percent !== 1 && (
              <>
                <View style={styles.boxDiscount}>
                  <CustomText
                    textType="semiBold"
                    style={{
                      color: '#FF0000',
                      fontSize: SIZES.xSmall,
                    }}>
                    {' '}
                    -{dataPolicies?.price_percent * 100}%
                  </CustomText>
                </View>
                <CustomText style={styles.priceDiscount}>
                  {formatPrice(price, {
                    currency: currency?.currency_code,
                  })}
                </CustomText>
              </>
            )} */}
          </View>

          <View>
            <CustomText textType="bold" style={styles.price}>
              {formatPrice(price * dataPolicies?.price_percent, {
                currency: currency?.currency_code,
              })}
            </CustomText>
            <CustomText style={styles.night}>
              /{t('room')}/{t('night')}
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxDiscount: {
    position: 'absolute',
    right: 0,
    top: scale(-20),
    minWidth: scale(35),
    backgroundColor: '#FF000020',
    padding: scale(2),
    borderRadius: scale(4),
  },
  priceDiscount: {
    color: COLORS.text,
    textDecorationLine: 'line-through',
    fontSize: SIZES.xSmall,
  },
  price: {
    color: COLORS.primary,
    fontSize: SIZES.xMedium,
    textAlign: 'right',
  },
  night: {
    color: COLORS.text,
    fontSize: SIZES.xSmall,
  },
});
