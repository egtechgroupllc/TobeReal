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

export default function RoomUntil({data, price, isFilterChildren}) {
  const dataPolicies = data?.accommodation_policies;
  const RefundCondition = dataPolicies[0]?.refund_fee;
  const {currency} = useCountry();
  const feeCancel = useMemo(() => {
    if (RefundCondition === 1) {
      return 'Cancellation without refund';
    } else {
      return `Free cancelation before ${formatDate(new Date(), {
        addDays: -dataPolicies[0]?.refund_number_day,
      })}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RefundCondition]);

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
              ? `Max ${data?.max_occupancy} adult(s)`
              : `Max ${data?.max_occupancy} adult(s), ${data?.max_child_occupancy} children`
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
          <ItemUtil Icon={IconPeople} value={`Breakfast not included`} />
          <ItemUtil Icon={IconRoom} value={'No refunds'} />
          <ItemUtil Icon={IconWifi} value={'Wifi free'} color={'#00875a'} />
        </View>

        <View
          style={{
            rowGap: scale(7),
            alignItems: 'flex-end',
          }}>
          <View>
            <View style={styles.boxDiscount}>
              <CustomText
                textType="semiBold"
                style={{
                  color: '#FF0000',
                  fontSize: SIZES.xSmall,
                }}>
                {' '}
                -20%
              </CustomText>
            </View>
            <CustomText style={styles.priceDiscount}>
              {formatPrice(23)}
            </CustomText>
          </View>

          <View>
            <CustomText textType="bold" style={styles.price}>
              {formatPrice(price, {
                currency: currency?.currency_code,
              })}
            </CustomText>
            <CustomText style={styles.night}>/Room/night</CustomText>
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
