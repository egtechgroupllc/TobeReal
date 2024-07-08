import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {COLORS, SIZES, scale} from '../../../../../assets/constants';
import {IconDown} from '../../../../../assets/icon/Icon';
import CustomText from '../../../../../components/CustomText';
import {formatPrice} from '../../../../../utils/format';
import {useCountry} from '../../../../../hooks/useCountry';
import {useLanguage} from '../../../../../hooks/useLanguage';

export default function DetailPriceRoom({
  data,
  priceVoucher,
  onChangeTotalPrice,
}) {
  const {t} = useLanguage();
  const numRoom = data?.numRoomSelect;
  const numNight = data?.date?.numNight;
  const [isMorePrice, setIsMorePrice] = useState(false);
  const [checkPrice, setCheckPrice] = useState(false);
  const {currency} = useCountry();
  const priceAverage = useMemo(
    () => numRoom * data?.priceAverage * numNight,
    [numRoom, numNight, data?.priceAverage],
  );
  const calculatePrice = () => {
    // if (data?.percentDiscount && data?.percentDiscount === 1) {
    //   return priceAverage;
    // } else {
    //   return priceAverage - priceAverage * data?.percentDiscount;
    // }
    return priceAverage * data?.percentDiscount;
  };
  const feePrice = priceAverage * 0;
  const price_per_day = calculatePrice() * numRoom;
  const total_price_per_day = calculatePrice() * numRoom * numNight;
  const voucher_discount = priceVoucher;
  const totalPrice = calculatePrice() * numRoom * numNight + feePrice;

  useEffect(() => {
    if (voucher_discount > totalPrice) {
      setCheckPrice(true);
    } else {
      setCheckPrice(false);
    }
  }, [voucher_discount, totalPrice, checkPrice]);
  useEffect(() => {
    totalPrice && onChangeTotalPrice && onChangeTotalPrice(totalPrice);
  }, [onChangeTotalPrice, totalPrice]);
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
          priceVoucher={priceVoucher}
          valueSub={formatPrice(totalPrice, {
            currency: currency?.currency_code,
          })}
          textDesc={`${t(
            'The remaining balance will be added to the e-wallet:',
          )} `}
          valueDesc={`+${formatPrice(voucher_discount - totalPrice, {
            currency: currency?.currency_code,
          })}`}
          value={formatPrice(
            !checkPrice ? totalPrice - voucher_discount || totalPrice : 0,
            {
              currency: currency?.currency_code,
            },
          )}
          checkPrice={checkPrice}
          colorValue={COLORS.primary}
          textType="bold"
          Icon={
            <IconDown
              style={{
                transform: [
                  {
                    rotate: isMorePrice ? '0deg' : '180deg',
                  },
                ],
              }}
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
          value={formatPrice(price_per_day, {
            currency: currency?.currency_code,
          })}
          colorValue={COLORS.primary}
          textType="semiBold"
        />
        <Row
          title={`${t('total_price_for')} ${numNight} ${t('day')}`}
          value={formatPrice(total_price_per_day, {
            currency: currency?.currency_code,
          })}
        />
        {!!priceVoucher && (
          <Row
            title={t('voucher discount')}
            value={`-${formatPrice(voucher_discount, {
              currency: currency?.currency_code,
            })}`}
            textType="regular"
            colorValue={COLORS.text}
          />
        )}
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
  priceVoucher,
  valueSub,
  valueDesc,
  checkPrice,
  textDesc,
}) => {
  return (
    <View>
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
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            {!!priceVoucher && (
              <CustomText
                textType={'medium'}
                style={{
                  fontSize: SIZES.xMedium,
                  color: COLORS.textSub,
                  textDecorationLine: 'line-through',
                }}>
                {valueSub}
              </CustomText>
            )}
            <CustomText
              textType={textType || 'medium'}
              style={{
                fontSize: SIZES.xMedium,
                color: colorValue,
                ...styleValue,
              }}>
              {value}
            </CustomText>
          </View>

          {Icon}
        </View>
      </View>
      {!!priceVoucher && checkPrice && (
        <CustomText
          textType={'medium'}
          style={{
            fontSize: SIZES.xSmall,
            color: COLORS.black,
          }}>
          {textDesc}
          <CustomText
            textType={'medium'}
            style={{
              fontSize: SIZES.xSmall,
              color: 'green',
            }}>
            {valueDesc}
          </CustomText>
        </CustomText>
      )}
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
