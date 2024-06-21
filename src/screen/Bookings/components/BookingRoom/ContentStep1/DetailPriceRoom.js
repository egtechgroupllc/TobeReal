import React, {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconDown} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function DetailPriceRoom({data}) {
  const numRoom = data?.numRoomSelect;
  const numNight = data?.date?.numNight;
  const [isMorePrice, setIsMorePrice] = useState(false);
  const {currency} = useCountry();
  const priceAverage = useMemo(
    () => numRoom * data?.priceAverage * numNight,
    [numRoom, numNight, data?.priceAverage],
  );
  const calculatePrice = () => {
    if (data?.percentDiscount && data?.percentDiscount === 1) {
      return priceAverage;
    } else {
      return priceAverage - priceAverage * data?.percentDiscount;
    }
  };
  const feePrice = priceAverage * (11.8165 / 100);
  const {t} = useLanguage();
  return (
    <View style={{rowGap: scale(5)}}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setIsMorePrice(!isMorePrice);
        }}
        style={{
          paddingVertical: scale(10),
        }}>
        <Row
          textTypeTitle={'bold'}
          title={t('total_price')}
          styleTitle={{
            fontSize: SIZES.medium,
          }}
          styleValue={{
            fontSize: SIZES.medium,
          }}
          value={formatPrice(calculatePrice() * numRoom * numNight + feePrice, {
            currency: currency?.currency_code,
          })}
          colorValue={COLORS.primary}
          textType="bold"
          Icon={
            <IconDown
              style={
                isMorePrice && {
                  transform: [
                    {
                      rotate: '180deg',
                    },
                  ],
                }
              }
            />
          }
        />
      </TouchableOpacity>

      <Collapsible
        collapsed={!isMorePrice}
        style={{
          rowGap: scale(10),
        }}>
        <View style={styles.line} />

        <Row title={t('room_number')} value={numRoom} />

        <Row
          title={t('price_per_day')}
          value={formatPrice(calculatePrice() * numRoom, {
            currency: currency?.currency_code,
          })}
          colorValue={COLORS.primary}
          textType="semiBold"
        />
        <Row
          title={`${t('total_price_for')} ${numNight} ${t('day')}`}
          value={formatPrice(calculatePrice() * numRoom * numNight, {
            currency: currency?.currency_code,
          })}
        />
        <Row
          title={t('taxes_and_fees')}
          value={formatPrice(feePrice, {
            currency: currency?.currency_code,
          })}
          textType="regular"
          colorValue={COLORS.text}
        />
      </Collapsible>
    </View>
  );
}
const Row = ({
  title,
  styleTitle,
  styleValue,
  value,
  colorValue,
  textType,
  textTypeTitle,
  Icon,
}) => {
  return (
    <View
      style={{
        ...styles.row,
        justifyContent: 'space-between',
      }}>
      <CustomText
        textType={textTypeTitle}
        style={{fontSize: SIZES.xMedium, ...styleTitle}}>
        {title}
      </CustomText>
      <View
        style={{
          ...styles.row,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <CustomText
          textType={textType || 'medium'}
          style={{fontSize: SIZES.xMedium, color: colorValue, ...styleValue}}>
          {value}
        </CustomText>
        {Icon}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: scale(8),
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: -1,
    marginBottom: 0,
    overflow: 'hidden',
  },
});
